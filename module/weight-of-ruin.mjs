// Import document classes.
import { WoRActor } from './documents/actor.mjs';
import { WoRItem } from './documents/item.mjs';
import { WoRCombat, WoRCombatant } from './documents/combat.mjs';
// Import ApplicationV2 sheet classes
import { WoRBaseActorSheet } from './sheets/actor/base-actor-sheet.mjs';
import { WoRNPCSheet } from './sheets/actor/npc-sheet.mjs';
import { WoRLootSheet } from './sheets/actor/loot-sheet.mjs';
import { WoRBaseItemSheet } from './sheets/item/base-item-sheet.mjs';
// Import application classes
import { CharacterCreationWizard } from './apps/character-creation.mjs';
import { NPCCreationWizard } from './apps/npc-creation-wizard.mjs';
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from './helpers/templates.mjs';
import { WOR } from './helpers/config.mjs';
import { registerDiceFunctions } from './helpers/dice.mjs';
import { registerConditions, registerStatusEffects } from './helpers/conditions.mjs';
import { registerCombatFunctions } from './helpers/combat.mjs';
import { registerCompendiumSettings, setupCompendiums } from './helpers/compendium-setup.mjs';
import { initializeChatCardListeners, registerChatFunctions } from './helpers/chat.mjs';
import { registerMigrationSettings, checkAndRunMigrations } from './migrations/_module.mjs';
import { rebuildCompendiums, wipeCompendiums } from './migrations/rebuild-compendiums.mjs';
import { registerUISettings, applyTheme } from './helpers/ui-settings.mjs';

// Import DataModel classes
import {
  // Actor DataModels
  CharacterData,
  NPCData,
  LootData,
  // Item DataModels
  SkillData,
  TalentData,
  WeaponData,
  ArmorData,
  GearData,
  SpellData,
  RitualData,
  LineageData,
  BackgroundData,
  ArchetypeData,
  CallingData,
  PathwayData,
  LifeEventData,
  NPCTraitData
} from './data-models/_module.mjs';

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  console.log('The Weight of Ruin | Initializing The Weight of Ruin System');

  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.wor = {
    WoRActor,
    WoRItem,
    rollItemMacro,
    CharacterCreationWizard,
    rebuildCompendiums,
    wipeCompendiums,
    /**
     * Opens the Character Creation Wizard
     * @param {Actor|null} actor - Optional actor to edit. If not provided:
     *   - GM: Creates new actor
     *   - Player: Finds their incomplete actor or shows error
     * @returns {CharacterCreationWizard|null} The wizard instance or null if player has no incomplete actor
     */
    openCharacterCreation(actor = null) {
      // If actor provided, use it
      if (actor) {
        return new CharacterCreationWizard(actor).render(true);
      }

      // For GM, can always create new
      if (game.user.isGM) {
        return new CharacterCreationWizard().render(true);
      }

      // For players, find their incomplete character
      const incompleteActor = game.wor.getIncompleteCharacter();
      if (!incompleteActor) {
        ui.notifications.warn(game.i18n.localize('WOR.CharacterCreation.NoIncompleteCharacter'));
        return null;
      }

      return new CharacterCreationWizard(incompleteActor).render(true);
    },

    /**
     * Find an incomplete character actor owned by the current user
     * @returns {Actor|null} The incomplete actor or null
     */
    getIncompleteCharacter() {
      return game.actors.find(a =>
        a.type === 'character' &&
        a.isOwner &&
        a.system.creation?.complete === false
      ) || null;
    },

    /**
     * Check if the current user can access the character creation wizard
     * @returns {boolean} True if user is GM or has an incomplete character
     */
    canAccessCharacterCreation() {
      if (game.user.isGM) return true;
      return !!game.wor.getIncompleteCharacter();
    },

    // NPC Creation Wizard (GM-only)
    NPCCreationWizard,

    /**
     * Opens the NPC Creation Wizard (GM-only)
     * @returns {NPCCreationWizard|null} The wizard instance or null if not GM
     */
    openNPCCreation() {
      if (!game.user.isGM) {
        ui.notifications.warn(game.i18n.localize('WOR.NPCCreation.GMOnly'));
        return null;
      }
      return NPCCreationWizard.launch();
    }
  };

  // Add custom constants for configuration.
  CONFIG.WOR = WOR;

  /**
   * Set an initiative formula for the system
   * Initiative uses Reflex (Agility + Awareness)
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '@derived.reflex',
    decimals: 0,
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = WoRActor;
  CONFIG.Item.documentClass = WoRItem;
  CONFIG.Combat.documentClass = WoRCombat;
  CONFIG.Combatant.documentClass = WoRCombatant;

  // Register DataModel classes for Actor types
  CONFIG.Actor.dataModels = {
    character: CharacterData,
    npc: NPCData,
    loot: LootData
  };

  // Set default artwork for new actors
  const defaultActorArt = 'systems/weight-of-ruin/assets/tokens/default_artwork.webp';
  CONFIG.Actor.typeImages = {
    character: defaultActorArt,
    npc: defaultActorArt,
    loot: defaultActorArt
  };

  // Register DataModel classes for Item types
  CONFIG.Item.dataModels = {
    skill: SkillData,
    talent: TalentData,
    weapon: WeaponData,
    armor: ArmorData,
    gear: GearData,
    spell: SpellData,
    ritual: RitualData,
    lineage: LineageData,
    background: BackgroundData,
    archetype: ArchetypeData,
    calling: CallingData,
    pathway: PathwayData,
    lifeEvent: LifeEventData,
    npcTrait: NPCTraitData
  };

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register ApplicationV2 sheet classes
  const { Actors, Items } = foundry.documents.collections;
  const { ActorSheet, ItemSheet } = foundry.appv1.sheets;

  // Register Actor sheets (ApplicationV2)
  Actors.unregisterSheet('core', ActorSheet);

  // Character sheet (default for characters)
  Actors.registerSheet('weight-of-ruin', WoRBaseActorSheet, {
    types: ['character'],
    makeDefault: true,
    label: 'WOR.SheetLabels.Character',
  });

  // NPC sheet (default for NPCs)
  Actors.registerSheet('weight-of-ruin', WoRNPCSheet, {
    types: ['npc'],
    makeDefault: true,
    label: 'WOR.SheetLabels.NPC',
  });

  // Loot sheet (default for loot/merchants)
  Actors.registerSheet('weight-of-ruin', WoRLootSheet, {
    types: ['loot'],
    makeDefault: true,
    label: 'WOR.SheetLabels.Loot',
  });

  // Register Item sheet (ApplicationV2)
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('weight-of-ruin', WoRBaseItemSheet, {
    makeDefault: true,
    label: 'WOR.SheetLabels.Item',
  });

  // Register UI settings (theme, etc.)
  registerUISettings();

  // Register compendium settings
  registerCompendiumSettings();

  // Register migration settings
  registerMigrationSettings();

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// Helper to convert string to lowercase
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

// Helper to display signed numbers (e.g., +2 or -1)
Handlebars.registerHelper('signedNumber', function (num) {
  if (num >= 0) return `+${num}`;
  return `${num}`;
});

// Helper to repeat a block n times
Handlebars.registerHelper('times', function (n, block) {
  let result = '';
  for (let i = 0; i < n; i++) {
    result += block.fn(i);
  }
  return result;
});

// Helper for comparing values
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

Handlebars.registerHelper('gt', function (a, b) {
  return a > b;
});

Handlebars.registerHelper('gte', function (a, b) {
  return a >= b;
});

Handlebars.registerHelper('lt', function (a, b) {
  return a < b;
});

Handlebars.registerHelper('lte', function (a, b) {
  return a <= b;
});

Handlebars.registerHelper('ne', function (a, b) {
  return a !== b;
});

// Helper to concatenate strings
Handlebars.registerHelper('concat', function (...args) {
  // Remove the last argument (Handlebars options object)
  args.pop();
  return args.join('');
});

// Helper for title case (e.g., "offense" -> "Offense")
Handlebars.registerHelper('titleCase', function (str) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
});

// Helper for logical AND
Handlebars.registerHelper('and', function (...args) {
  // Remove the last argument (Handlebars options object)
  args.pop();
  return args.every(Boolean);
});

// Helper for logical OR
Handlebars.registerHelper('or', function (...args) {
  // Remove the last argument (Handlebars options object)
  args.pop();
  return args.some(Boolean);
});

// Helper for logical NOT
Handlebars.registerHelper('not', function (value) {
  return !value;
});

// Helper to add numbers
Handlebars.registerHelper('add', function (a, b) {
  return Number(a) + Number(b);
});

// Helper to subtract numbers
Handlebars.registerHelper('subtract', function (a, b) {
  return Number(a) - Number(b);
});

// Helper to multiply numbers
Handlebars.registerHelper('multiply', function (a, b) {
  return Number(a) * Number(b);
});

// Helper to divide numbers
Handlebars.registerHelper('divide', function (a, b) {
  if (!b || b === 0) return 0;
  return Number(a) / Number(b);
});

// Helper to get minimum of values
Handlebars.registerHelper('min', function (...args) {
  // Remove options object (last argument from Handlebars)
  const values = args.slice(0, -1).map(Number);
  return Math.min(...values);
});

// Helper to get maximum of values
Handlebars.registerHelper('max', function (...args) {
  // Remove options object (last argument from Handlebars)
  const values = args.slice(0, -1).map(Number);
  return Math.max(...values);
});

// Helper for absolute value
Handlebars.registerHelper('abs', function (num) {
  return Math.abs(Number(num));
});

// Helper to calculate percentage
Handlebars.registerHelper('percentage', function (value, max) {
  if (!max || max === 0) return 0;
  return Math.min(100, Math.max(0, (value / max) * 100));
});

// Helper to capitalize first letter
Handlebars.registerHelper('capitalize', function (str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
});

// Helper to strip HTML tags from a string (for plain text previews)
Handlebars.registerHelper('stripTags', function (str) {
  if (!str) return '';
  // Create a temporary div to leverage browser's HTML parsing
  const tmp = document.createElement('div');
  tmp.innerHTML = str;
  return tmp.textContent || tmp.innerText || '';
});

// Helper to lookup a value in an object
Handlebars.registerHelper('lookup', function (obj, key) {
  return obj?.[key];
});

// Helper to join array elements with a separator
Handlebars.registerHelper('join', function (arr, separator) {
  if (!Array.isArray(arr)) return '';
  return arr.join(typeof separator === 'string' ? separator : ', ');
});

// Helper to check if an array includes a value
Handlebars.registerHelper('includes', function (arr, value) {
  if (!Array.isArray(arr)) return false;
  return arr.includes(value);
});

// Helper to compute derived attributes from a given attribute object
// Used in character creation wizard for preview
// Optional second parameter: baseSpeed (from lineage, defaults to 2)
Handlebars.registerHelper('computeDerivedFromAttrs', function (attrs, baseSpeedOrOptions) {
  if (!attrs) return {};
  // Handle optional baseSpeed parameter (Handlebars passes options as last arg)
  const baseSpeed = (typeof baseSpeedOrOptions === 'number') ? baseSpeedOrOptions : 2;
  const toughness = (attrs.resolve || 0) + (attrs.fortitude || 0);
  const reflex = (attrs.agility || 0) + (attrs.awareness || 0);
  return {
    toughness: toughness,
    reflex: reflex,
    defense: Math.floor((3 + reflex) / 2),
    baseSpeed: baseSpeed,
    movement: baseSpeed + (attrs.agility || 0),
    lifeblood: Math.ceil(toughness / 2)
  };
});

/* -------------------------------------------- */
/*  Loot Query Handling (v13 CONFIG.queries)    */
/* -------------------------------------------- */

/**
 * Setup query handlers for loot transfers using v13's CONFIG.queries.
 * This allows players to request item transfers from GM clients.
 */
function setupLootQueries() {
  console.log('The Weight of Ruin | Setting up loot query handlers');

  // Register query handler for taking items from loot piles
  CONFIG.queries['weight-of-ruin.takeItem'] = async (queryData, options) => {
    console.log('The Weight of Ruin | takeItem query received:', queryData);
    return await handleTakeItem(queryData);
  };

  // Register query handler for purchasing items from merchants
  CONFIG.queries['weight-of-ruin.purchaseItem'] = async (queryData, options) => {
    console.log('The Weight of Ruin | purchaseItem query received:', queryData);
    return await handlePurchaseItem(queryData);
  };

  console.log('The Weight of Ruin | Loot query handlers registered');
}

/**
 * Handle a player taking an item from a loot pile.
 * @param {Object} data - Query data
 * @param {string} data.lootActorId - The loot actor's ID
 * @param {string} data.itemId - The item's ID
 * @param {string} data.targetActorId - The target actor's ID
 * @returns {Object} Result of the transfer operation
 */
async function handleTakeItem(data) {
  console.log('The Weight of Ruin | handleTakeItem called with:', data);
  const { lootActorId, itemId, targetActorId } = data;

  const lootActor = game.actors.get(lootActorId);
  const targetActor = game.actors.get(targetActorId);
  const item = lootActor?.items.get(itemId);

  console.log('The Weight of Ruin | lootActor:', lootActor?.name, '| targetActor:', targetActor?.name, '| item:', item?.name);

  if (!lootActor || !targetActor || !item) {
    console.warn('The Weight of Ruin | Invalid loot transfer request', data);
    return { success: false, error: 'Invalid transfer request' };
  }

  // Store item info before transfer
  const itemName = item.name;
  const targetName = targetActor.name;
  const lootName = lootActor.name;

  // Transfer the item
  const itemData = item.toObject();
  delete itemData._id;
  itemData.system.equipped = false;

  // Handle quantity
  if (item.system.quantity > 1) {
    await item.update({ 'system.quantity': item.system.quantity - 1 });
    itemData.system.quantity = 1;
  } else {
    await item.delete();
  }

  await Item.create(itemData, { parent: targetActor });

  // Post chat message
  const chatContent = `
    <div class="wor loot-take">
      <p><strong>${targetName}</strong> grabbed <strong>${itemName}</strong> from <strong>${lootName}</strong>.</p>
    </div>
  `;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: targetActor }),
    content: chatContent
  });

  console.log('The Weight of Ruin | Item transfer complete:', itemName, '->', targetName);
  return {
    success: true,
    itemName: itemName,
    targetName: targetName,
    lootName: lootName
  };
}

/**
 * Handle a player purchasing an item from a merchant.
 * @param {Object} data - Query data
 * @returns {Object} Result of the purchase operation
 */
async function handlePurchaseItem(data) {
  const { lootActorId, itemId, targetActorId, price } = data;

  const lootActor = game.actors.get(lootActorId);
  const targetActor = game.actors.get(targetActorId);
  const item = lootActor?.items.get(itemId);

  if (!lootActor || !targetActor || !item) {
    console.warn('The Weight of Ruin | Invalid purchase request', data);
    return { success: false, error: 'Invalid purchase request' };
  }

  // Verify buyer can afford it
  const buyerWealth = targetActor.system.totalWealthInOrin;
  if (buyerWealth < price) {
    return { success: false, error: 'cannot_afford' };
  }

  // Store item info before transfer
  const itemName = item.name;
  const targetName = targetActor.name;

  // Deduct wealth from buyer
  await deductWealthFromActor(targetActor, price);

  // Add wealth to merchant
  await addWealthToActor(lootActor, price);

  // Transfer the item
  const itemData = item.toObject();
  delete itemData._id;
  itemData.system.equipped = false;

  // Handle quantity
  if (item.system.quantity > 1) {
    await item.update({ 'system.quantity': item.system.quantity - 1 });
    itemData.system.quantity = 1;
  } else {
    await item.delete();
  }

  await Item.create(itemData, { parent: targetActor });

  return {
    success: true,
    itemName: itemName,
    targetName: targetName
  };
}

/**
 * Deduct wealth from an actor (helper for socket handler).
 */
async function deductWealthFromActor(actor, amount) {
  let remaining = amount;
  let { sovereigns, crowns, orin } = actor.system.wealth;

  // Deduct from Orin first
  if (orin >= remaining) {
    orin -= remaining;
    remaining = 0;
  } else {
    remaining -= orin;
    orin = 0;
  }

  // Then from Crowns (1 Crown = 10 Orin)
  if (remaining > 0) {
    const crownsNeeded = Math.ceil(remaining / 10);
    if (crowns >= crownsNeeded) {
      crowns -= crownsNeeded;
      const change = (crownsNeeded * 10) - remaining;
      orin += change;
      remaining = 0;
    } else {
      remaining -= crowns * 10;
      crowns = 0;
    }
  }

  // Finally from Sovereigns (1 Sovereign = 100 Orin)
  if (remaining > 0) {
    const sovereignsNeeded = Math.ceil(remaining / 100);
    sovereigns -= sovereignsNeeded;
    const change = (sovereignsNeeded * 100) - remaining;
    crowns += Math.floor(change / 10);
    orin += change % 10;
  }

  await actor.update({
    'system.wealth': { sovereigns, crowns, orin }
  });
}

/**
 * Add wealth to an actor (helper for socket handler).
 */
async function addWealthToActor(actor, amount) {
  const sovereigns = Math.floor(amount / 100);
  const crowns = Math.floor((amount % 100) / 10);
  const orin = amount % 10;

  await actor.update({
    'system.wealth.sovereigns': actor.system.wealth.sovereigns + sovereigns,
    'system.wealth.crowns': actor.system.wealth.crowns + crowns,
    'system.wealth.orin': actor.system.wealth.orin + orin
  });
}

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', async function () {
  console.log('The Weight of Ruin | System Ready');

  // Apply saved theme setting
  applyTheme();

  // Setup query handlers for loot transfers (v13 CONFIG.queries)
  setupLootQueries();

  // Check and run any needed data migrations
  await checkAndRunMigrations();

  // Register dice functions on game.wor.dice
  registerDiceFunctions();

  // Register combat functions on game.wor.combat
  registerCombatFunctions();

  // Register conditions system
  registerConditions();

  // Register status effects for token HUD (must be after i18n is ready)
  registerStatusEffects();

  // Register chat card functions
  registerChatFunctions();

  // Setup compendiums (populate if empty)
  await setupCompendiums();

  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));

  // Auto-hide loot tokens when inventory becomes empty
  Hooks.on('updateActor', (actor, changes, options, userId) => {
    if (actor.type !== 'loot') return;
    if (!actor.system.hiddenWhenEmpty) return;

    // Check if inventory became empty
    if (actor.system.isEmpty) {
      for (const token of actor.getActiveTokens()) {
        token.document.update({ hidden: true });
      }
    }
  });

  // Also check when items are deleted from loot actors
  Hooks.on('deleteItem', (item, options, userId) => {
    const actor = item.parent;
    if (!actor || actor.type !== 'loot') return;
    if (!actor.system.hiddenWhenEmpty) return;

    // Use setTimeout to allow the deletion to complete first
    setTimeout(() => {
      if (actor.system.isEmpty) {
        for (const token of actor.getActiveTokens()) {
          token.document.update({ hidden: true });
        }
      }
    }, 100);
  });
});

/* -------------------------------------------- */
/*  Pre-Create Actor Hook                       */
/* -------------------------------------------- */

/**
 * Set default ownership for loot actors to "All Players: Limited"
 * This allows players to view and interact with loot sheets.
 */
Hooks.on('preCreateActor', (actor, data, options, userId) => {
  if (actor.type !== 'loot') return;

  // Set default ownership to LIMITED (1) for all players
  // Permission levels: NONE=0, LIMITED=1, OBSERVER=2, OWNER=3
  actor.updateSource({
    'ownership.default': CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED
  });
});

/* -------------------------------------------- */
/*  Render Actor Directory Hook                 */
/* -------------------------------------------- */

/**
 * Add a "Create Character" button to the Actor Directory header
 * Uses v13's ApplicationV2 hook naming convention: render${ClassName}
 * - GM: Always shows button (can create new characters)
 * - Player: Only shows if they have an incomplete character assigned to them
 */
Hooks.on('renderActorDirectory', (app, element) => {
  // Find the header actions area
  const headerActions = element.querySelector('.header-actions');
  if (!headerActions) return;

  // Remove existing button if present (will re-add if needed)
  const existingButton = headerActions.querySelector('.create-character-wizard');
  if (existingButton) existingButton.remove();

  // Check if user can access character creation
  if (!game.wor.canAccessCharacterCreation()) return;

  // Create the button
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('create-character-wizard');

  // Different label for GM vs Player
  if (game.user.isGM) {
    button.innerHTML = '<i class="fas fa-magic"></i> Character Creation';
    button.title = 'Open the Character Creation Wizard';
  } else {
    const incompleteActor = game.wor.getIncompleteCharacter();
    button.innerHTML = `<i class="fas fa-magic"></i> Continue: ${incompleteActor?.name || 'Character'}`;
    button.title = 'Continue character creation';
  }

  // Add click handler
  button.addEventListener('click', (event) => {
    event.preventDefault();
    game.wor.openCharacterCreation();
  });

  // Insert before the create folder button or at the end
  const createFolderBtn = headerActions.querySelector('[data-action="createFolder"]');
  if (createFolderBtn) {
    headerActions.insertBefore(button, createFolderBtn);
  } else {
    headerActions.appendChild(button);
  }

  // === NPC Creation Wizard Button (GM-only) ===
  // Remove existing NPC button if present (will re-add if needed)
  const existingNpcButton = headerActions.querySelector('.create-npc-wizard');
  if (existingNpcButton) existingNpcButton.remove();

  // Only GMs can create NPCs
  if (!game.user.isGM) return;

  // Create the NPC button
  const npcButton = document.createElement('button');
  npcButton.type = 'button';
  npcButton.classList.add('create-npc-wizard');
  npcButton.innerHTML = '<i class="fas fa-skull"></i> NPC Creation';
  npcButton.title = 'Open the NPC Creation Wizard';

  // Add click handler
  npcButton.addEventListener('click', (event) => {
    event.preventDefault();
    game.wor.openNPCCreation();
  });

  // Insert after character creation button or before create folder
  const charButton = headerActions.querySelector('.create-character-wizard');
  if (charButton && charButton.nextSibling) {
    headerActions.insertBefore(npcButton, charButton.nextSibling);
  } else if (createFolderBtn) {
    headerActions.insertBefore(npcButton, createFolderBtn);
  } else {
    headerActions.appendChild(npcButton);
  }
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.wor.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'weight-of-ruin.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Execute a macro for an item.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}

/* -------------------------------------------- */
/*  Chat Message Hooks                          */
/* -------------------------------------------- */

/**
 * Initialize chat card interactivity when a chat message is rendered
 * Using renderChatMessageHTML (v13+) instead of deprecated renderChatMessage
 */
Hooks.on('renderChatMessageHTML', (message, html) => {
  // html is an HTMLElement in v13+
  if (!html) return;

  // Initialize chat card listeners for WoR cards
  const card = html.querySelector('.wor');
  if (card) {
    initializeChatCardListeners(message, html);
  }
});
