import { WoRBaseActorSheet } from './base-actor-sheet.mjs';
import { rollPool, DIFFICULTY_TIERS } from '../../helpers/dice.mjs';
import { NPCCreationWizard } from '../../apps/npc-creation-wizard.mjs';
import { getTierOptions, getTierData } from '../../helpers/npc-config.mjs';

/**
 * NPC Sheet using ApplicationV2 for The Weight of Ruin.
 * Simplified sheet for non-player characters with quick-roll functionality.
 * @extends {WoRBaseActorSheet}
 */
export class WoRNPCSheet extends WoRBaseActorSheet {

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['wor', 'weight-of-ruin', 'actor-sheet', 'npc-sheet'],
    position: {
      width: 800,
      height: 900
    },
    actions: {
      ...WoRBaseActorSheet.DEFAULT_OPTIONS.actions,
      quickAttack: WoRNPCSheet.#onQuickAttack,
      quickAbility: WoRNPCSheet.#onQuickAbility,
      addAttack: WoRNPCSheet.#onAddAttack,
      removeAttack: WoRNPCSheet.#onRemoveAttack,
      editAttack: WoRNPCSheet.#onEditAttack,
      addAbility: WoRNPCSheet.#onAddAbility,
      removeAbility: WoRNPCSheet.#onRemoveAbility,
      editAbility: WoRNPCSheet.#onEditAbility,
      toggleNotesEditor: WoRNPCSheet.#onToggleNotesEditor,
      launchCreationWizard: WoRNPCSheet.#onLaunchCreationWizard,
      rollTrait: WoRNPCSheet.#onRollTrait
    }
  };

  /** @override */
  static PARTS = {
    header: {
      template: 'systems/weight-of-ruin/templates/actor/npc/npc-header.hbs'
    },
    main: {
      template: 'systems/weight-of-ruin/templates/actor/npc/npc-body.hbs',
      scrollable: ['.npc-content']
    }
  };

  /**
   * NPC sheets use the same tabs as player characters, with Traits instead of Talents
   */
  static TABS = {
    core: { id: 'core', group: 'primary', label: 'WOR.Tabs.Core' },
    skills: { id: 'skills', group: 'primary', label: 'WOR.Tabs.Skills' },
    traits: { id: 'traits', group: 'primary', label: 'WOR.Tabs.Traits' },
    combat: { id: 'combat', group: 'primary', label: 'WOR.Tabs.Combat' },
    inventory: { id: 'inventory', group: 'primary', label: 'WOR.Tabs.Inventory' },
    thaumaturgy: { id: 'thaumaturgy', group: 'primary', label: 'WOR.Tabs.Thaumaturgy' },
    profile: { id: 'profile', group: 'primary', label: 'WOR.Tabs.Profile' }
  };

  tabGroups = {
    primary: 'core'
  };

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // NPC-specific data
    context.threat = this.document.system.threat;
    context.npcType = this.document.system.npcType;
    context.role = this.document.system.role;
    context.morale = this.document.system.morale;
    context.loot = this.document.system.loot;

    // Quick attacks
    context.attacks = this.document.system.attacks || [];

    // Notable abilities
    context.abilities = this.document.system.abilities || [];

    // Tactics and GM notes (raw values for editing)
    context.tactics = this.document.system.tactics;
    context.gmNotes = this.document.system.gmNotes;

    // Enriched HTML for rich text fields
    const enrichOptions = { secrets: this.document.isOwner, rollData: context.rollData, relativeTo: this.document };
    context.enrichedTactics = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      this.document.system.tactics ?? '', enrichOptions
    );
    context.enrichedGmNotes = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      this.document.system.gmNotes ?? '', enrichOptions
    );
    context.enrichedBiography = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      this.document.system.biography ?? '', enrichOptions
    );
    context.enrichedNotes = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      this.document.system.notes ?? '', enrichOptions
    );

    // Tier options for dropdown
    context.tierOptions = getTierOptions().map(tier => ({
      value: tier.value,
      label: game.i18n.localize(tier.label)
    }));

    // Tier label for display
    const currentTier = this.document.system.tier ?? 1;
    const tierData = getTierData(currentTier);
    context.tierLabel = game.i18n.localize(tierData.label);

    // Difficulty options for abilities
    context.difficultyOptions = Object.entries(DIFFICULTY_TIERS).map(([key, data]) => ({
      value: key,
      label: game.i18n.localize(data.label)
    }));

    // Is this a significant threat?
    context.isSignificantThreat = this.document.system.isSignificantThreat;

    // NPC Traits - get from embedded items
    context.traits = this.document.items
      .filter(item => item.type === 'npcTrait')
      .map(trait => ({
        id: trait.id,
        name: trait.name,
        img: trait.img,
        category: trait.system.category,
        cost: trait.system.cost,
        passive: trait.system.mechanics?.passive ?? true,
        trigger: trait.system.mechanics?.trigger || '',
        hasRoll: trait.system.roll?.hasRoll ?? false,
        pool: trait.system.roll?.pool,
        difficulty: trait.system.roll?.difficulty || 'standard',
        description: trait.system.description,
        cooldown: trait.system.mechanics?.cooldown || ''
      }));

    // Group traits by category for display
    context.traitsByCategory = {};
    for (const trait of context.traits) {
      const cat = trait.category || 'offense';
      if (!context.traitsByCategory[cat]) {
        context.traitsByCategory[cat] = [];
      }
      context.traitsByCategory[cat].push(trait);
    }

    // Trait point tracking
    context.traitPointsSpent = context.traits.reduce((sum, t) => sum + (t.cost || 1), 0);
    context.traitPointsMax = this.document.system.traitPoints?.max || 0;

    return context;
  }

  /* -------------------------------------------- */
  /*  Quick Roll Action Handlers                  */
  /* -------------------------------------------- */

  /**
   * Handle quick attack roll.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onQuickAttack(event, target) {
    const attackId = target.dataset.attackId;
    const attacks = this.document.system.attacks || [];
    const attack = attacks.find(a => a.id === attackId);

    if (!attack) return;

    // Perform the roll
    const result = await rollPool({
      actor: this.document,
      pool: attack.pool,
      title: `${attack.name} (${game.i18n.localize('WOR.Common.Attack')})`,
      difficulty: 'standard',
      skipDialog: event.shiftKey
    });

    // If hit and we have damage, display it
    if (result && attack.damage > 0) {
      // Damage info is shown in the roll result
    }
  }

  /**
   * Handle quick ability roll.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onQuickAbility(event, target) {
    const abilityId = target.dataset.abilityId;
    const abilities = this.document.system.abilities || [];
    const ability = abilities.find(a => a.id === abilityId);

    if (!ability || !ability.pool) {
      // No roll needed, just display the ability
      await this.#displayAbility(ability);
      return;
    }

    // Perform the roll
    await rollPool({
      actor: this.document,
      pool: ability.pool,
      title: ability.name,
      difficulty: ability.difficulty || 'standard',
      skipDialog: event.shiftKey
    });
  }

  /**
   * Display an ability in chat without rolling.
   * @param {Object} ability
   */
  static async #displayAbility(ability) {
    if (!ability) return;

    const speaker = ChatMessage.getSpeaker({ actor: this.document });
    const content = `
      <div class="wor ability-card">
        <h4>${ability.name}</h4>
        ${ability.description ? `<p>${ability.description}</p>` : ''}
      </div>
    `;

    await ChatMessage.create({
      speaker,
      content,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER
    });
  }

  /* -------------------------------------------- */
  /*  Attack Management                           */
  /* -------------------------------------------- */

  /**
   * Add a new quick attack.
   */
  static async #onAddAttack(event, target) {
    const attacks = foundry.utils.deepClone(this.document.system.attacks || []);
    attacks.push({
      id: foundry.utils.randomID(),
      name: game.i18n.localize('WOR.NPC.NewAttack'),
      pool: 5,
      damage: 2,
      properties: ''
    });

    await this.document.update({ 'system.attacks': attacks });
  }

  /**
   * Remove a quick attack.
   */
  static async #onRemoveAttack(event, target) {
    const attackId = target.dataset.attackId;
    const attacks = this.document.system.attacks.filter(a => a.id !== attackId);
    await this.document.update({ 'system.attacks': attacks });
  }

  /**
   * Edit a quick attack inline.
   */
  static async #onEditAttack(event, target) {
    const attackId = target.closest('[data-attack-id]')?.dataset.attackId;
    const field = target.name;
    let value = target.value;

    // Convert numeric fields
    if (['pool', 'damage'].includes(field.split('.').pop())) {
      value = parseInt(value) || 0;
    }

    const attacks = foundry.utils.deepClone(this.document.system.attacks || []);
    const attack = attacks.find(a => a.id === attackId);
    if (!attack) return;

    // Update the specific field
    const fieldName = field.split('.').pop();
    attack[fieldName] = value;

    await this.document.update({ 'system.attacks': attacks });
  }

  /* -------------------------------------------- */
  /*  Ability Management                          */
  /* -------------------------------------------- */

  /**
   * Add a new ability.
   */
  static async #onAddAbility(event, target) {
    const abilities = foundry.utils.deepClone(this.document.system.abilities || []);
    abilities.push({
      id: foundry.utils.randomID(),
      name: game.i18n.localize('WOR.NPC.NewAbility'),
      description: '',
      pool: null,
      difficulty: 'standard'
    });

    await this.document.update({ 'system.abilities': abilities });
  }

  /**
   * Remove an ability.
   */
  static async #onRemoveAbility(event, target) {
    const abilityId = target.dataset.abilityId;
    const abilities = this.document.system.abilities.filter(a => a.id !== abilityId);
    await this.document.update({ 'system.abilities': abilities });
  }

  /**
   * Edit an ability inline.
   */
  static async #onEditAbility(event, target) {
    const abilityId = target.closest('[data-ability-id]')?.dataset.abilityId;
    const field = target.name;
    let value = target.value;

    // Convert numeric fields
    if (field.split('.').pop() === 'pool') {
      value = value ? parseInt(value) : null;
    }

    const abilities = foundry.utils.deepClone(this.document.system.abilities || []);
    const ability = abilities.find(a => a.id === abilityId);
    if (!ability) return;

    const fieldName = field.split('.').pop();
    ability[fieldName] = value;

    await this.document.update({ 'system.abilities': abilities });
  }

  /* -------------------------------------------- */
  /*  Notes Editor                                */
  /* -------------------------------------------- */

  /**
   * Track if the notes editor is currently open.
   * @type {boolean}
   */
  _notesEditorOpen = false;

  /**
   * Toggle the notes editor between view and edit mode.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onToggleNotesEditor(event, target) {
    event.preventDefault();
    const section = target.closest('.notes-section');
    if (!section) return;

    const viewDiv = section.querySelector('.notes-view');
    const editDiv = section.querySelector('.notes-edit');
    if (!viewDiv || !editDiv) return;

    // Toggle visibility
    viewDiv.classList.add('hidden');
    editDiv.classList.remove('hidden');

    // Hide the edit button while editing
    target.style.display = 'none';
  }

  /* -------------------------------------------- */
  /*  NPC Creation Wizard                         */
  /* -------------------------------------------- */

  /**
   * Launch the NPC Creation Wizard.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onLaunchCreationWizard(event, target) {
    NPCCreationWizard.launch();
  }

  /* -------------------------------------------- */
  /*  Trait Roll Handler                          */
  /* -------------------------------------------- */

  /**
   * Roll a trait's associated dice pool.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onRollTrait(event, target) {
    const traitId = target.dataset.traitId;
    const trait = this.document.items.get(traitId);

    if (!trait || !trait.system.roll?.hasRoll) return;

    // Parse pool - could be a number or a formula
    let pool = trait.system.roll.pool;
    if (typeof pool === 'string' && pool.includes('@')) {
      // Evaluate any formula references
      const rollData = this.document.getRollData();
      pool = Roll.replaceFormulaData(pool, rollData);
      pool = parseInt(Roll.safeEval(pool)) || 0;
    } else {
      pool = parseInt(pool) || 0;
    }

    if (pool <= 0) {
      ui.notifications.warn(game.i18n.localize('WOR.Roll.InvalidPool'));
      return;
    }

    // Perform the roll
    await rollPool({
      actor: this.document,
      pool: pool,
      title: trait.name,
      difficulty: trait.system.roll.difficulty || 'standard',
      skipDialog: event.shiftKey
    });
  }
}
