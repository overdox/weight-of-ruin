/**
 * Compendium Setup Helper
 * Populates empty compendiums with default data on first run
 */

import { SKILLS_DATA } from '../data/skills-data.mjs';
import { TALENTS_DATA } from '../data/talents-data.mjs';
import { LINEAGES_DATA } from '../data/lineages-data.mjs';
import { BACKGROUNDS_DATA } from '../data/backgrounds-data.mjs';
import { ARCHETYPES_DATA } from '../data/archetypes-data.mjs';
import { PATHWAYS_DATA } from '../data/pathways-data.mjs';
import { LIFE_EVENTS_DATA } from '../data/life-events-data.mjs';
import { WEAPONS_DATA } from '../data/weapons-data.mjs';
import { ARMOR_DATA } from '../data/armor-data.mjs';
import { GEAR_DATA } from '../data/gear-data.mjs';

/**
 * Configuration for compendium population
 */
const COMPENDIUM_CONFIG = {
  skills: { data: SKILLS_DATA, label: 'Skills' },
  talents: { data: TALENTS_DATA, label: 'Talents' },
  lineages: { data: LINEAGES_DATA, label: 'Lineages' },
  backgrounds: { data: BACKGROUNDS_DATA, label: 'Backgrounds' },
  archetypes: { data: ARCHETYPES_DATA, label: 'Archetypes' },
  pathways: { data: PATHWAYS_DATA, label: 'Pathways' },
  'life-events': { data: LIFE_EVENTS_DATA, label: 'Life Events' },
  weapons: { data: WEAPONS_DATA, label: 'Weapons' },
  armor: { data: ARMOR_DATA, label: 'Armor' },
  gear: { data: GEAR_DATA, label: 'Gear' }
};

/**
 * Check if compendiums need population and populate if empty
 * @returns {Promise<void>}
 */
export async function setupCompendiums() {
  // Only run for GMs
  if (!game.user.isGM) return;

  // Check if we've already run setup
  const setupComplete = game.settings.get('weight-of-ruin', 'compendiumsPopulated');
  if (setupComplete) return;

  console.log('The Weight of Ruin | Checking compendiums...');

  let populatedAny = false;

  for (const [packName, config] of Object.entries(COMPENDIUM_CONFIG)) {
    const packId = `weight-of-ruin.${packName}`;
    const pack = game.packs.get(packId);

    if (!pack) {
      console.warn(`The Weight of Ruin | Compendium ${packId} not found`);
      continue;
    }

    // Check if pack is empty
    const index = await pack.getIndex();
    if (index.size > 0) {
      console.log(`The Weight of Ruin | ${config.label} compendium already has ${index.size} entries`);
      continue;
    }

    // Populate the pack
    console.log(`The Weight of Ruin | Populating ${config.label} compendium with ${config.data.length} entries...`);

    try {
      await populateCompendium(pack, config.data);
      populatedAny = true;
      console.log(`The Weight of Ruin | ${config.label} compendium populated successfully`);
    } catch (error) {
      console.error(`The Weight of Ruin | Error populating ${config.label} compendium:`, error);
    }
  }

  // Mark setup as complete
  if (populatedAny) {
    await game.settings.set('weight-of-ruin', 'compendiumsPopulated', true);
    ui.notifications.info('The Weight of Ruin compendiums have been populated with default data.');
  }
}

/**
 * Populate a compendium pack with item data
 * @param {CompendiumCollection} pack - The compendium pack
 * @param {Array} data - Array of item data objects
 * @returns {Promise<void>}
 */
async function populateCompendium(pack, data) {
  // Unlock the pack for editing
  const wasLocked = pack.locked;
  if (wasLocked) {
    await pack.configure({ locked: false });
  }

  try {
    // Create items in batches to avoid overwhelming the system
    const batchSize = 20;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const itemData = batch.map(item => {
        let img = item.img || 'icons/svg/item-bag.svg';

        // Apply custom weapon icons based on weapon group
        if (item.type === 'weapon' && item.system?.group) {
          const WeaponData = CONFIG.Item.dataModels?.weapon;
          if (WeaponData?.getGroupIcon) {
            img = WeaponData.getGroupIcon(item.system.group);
          }
        }

        return {
          name: item.name,
          type: item.type,
          img: img,
          system: item.system || {}
        };
      });

      await Item.createDocuments(itemData, { pack: pack.collection });
    }
  } finally {
    // Re-lock if it was locked before
    if (wasLocked) {
      await pack.configure({ locked: true });
    }
  }
}

/**
 * Register compendium settings
 */
export function registerCompendiumSettings() {
  game.settings.register('weight-of-ruin', 'compendiumsPopulated', {
    name: 'Compendiums Populated',
    hint: 'Whether the default compendium data has been loaded.',
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register('weight-of-ruin', 'resetCompendiums', {
    name: 'Reset Compendiums',
    hint: 'Check this to repopulate empty compendiums on next reload.',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
    onChange: async (value) => {
      if (value) {
        await game.settings.set('weight-of-ruin', 'compendiumsPopulated', false);
        await game.settings.set('weight-of-ruin', 'resetCompendiums', false);
        ui.notifications.info('Compendium reset flag set. Reload to repopulate empty compendiums.');
      }
    }
  });

  // Register the Rebuild Compendiums menu button
  game.settings.registerMenu('weight-of-ruin', 'rebuildCompendiumsMenu', {
    name: 'WOR.Settings.RebuildCompendiums.Name',
    label: 'WOR.Settings.RebuildCompendiums.Label',
    hint: 'WOR.Settings.RebuildCompendiums.Hint',
    icon: 'fas fa-database',
    type: RebuildCompendiumsDialog,
    restricted: true
  });
}

/**
 * Dialog for rebuilding compendiums (V2 Application)
 */
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

class RebuildCompendiumsDialog extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: 'rebuild-compendiums-dialog',
    window: {
      title: 'WOR.Settings.RebuildCompendiums.Title',
      icon: 'fas fa-database'
    },
    position: {
      width: 400,
      height: 'auto'
    },
    actions: {
      rebuild: RebuildCompendiumsDialog._onRebuild,
      cancel: RebuildCompendiumsDialog._onCancel
    }
  };

  static PARTS = {
    content: {
      template: 'systems/weight-of-ruin/templates/apps/rebuild-compendiums.hbs'
    }
  };

  async _prepareContext() {
    return {
      warning: game.i18n.localize('WOR.Settings.RebuildCompendiums.Warning')
    };
  }

  static async _onRebuild(event, target) {
    // Confirm action
    const confirmed = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize('WOR.Settings.RebuildCompendiums.ConfirmTitle') },
      content: `<p>${game.i18n.localize('WOR.Settings.RebuildCompendiums.ConfirmMessage')}</p>`,
      yes: { default: false },
      no: { default: true }
    });

    if (!confirmed) return;

    // Close dialog and run rebuild
    this.close();

    // Import and run rebuild
    const { rebuildCompendiums } = await import('../migrations/rebuild-compendiums.mjs');
    await rebuildCompendiums();
  }

  static _onCancel(event, target) {
    this.close();
  }
}

/**
 * Get items from a specific compendium
 * @param {string} packName - The pack name (without system prefix)
 * @returns {Promise<Array>} Array of items from the compendium
 */
export async function getCompendiumItems(packName) {
  const packId = `weight-of-ruin.${packName}`;
  const pack = game.packs.get(packId);

  if (!pack) {
    console.warn(`The Weight of Ruin | Compendium ${packId} not found`);
    return [];
  }

  const documents = await pack.getDocuments();
  return documents;
}

/**
 * Get a specific item from a compendium by name
 * @param {string} packName - The pack name (without system prefix)
 * @param {string} itemName - The item name to find
 * @returns {Promise<Item|null>} The found item or null
 */
export async function getCompendiumItemByName(packName, itemName) {
  const items = await getCompendiumItems(packName);
  return items.find(i => i.name === itemName) || null;
}

/**
 * Get items from a compendium filtered by a property
 * @param {string} packName - The pack name
 * @param {string} property - The system property to filter on
 * @param {*} value - The value to match
 * @returns {Promise<Array>} Filtered array of items
 */
export async function getCompendiumItemsByProperty(packName, property, value) {
  const items = await getCompendiumItems(packName);
  return items.filter(i => foundry.utils.getProperty(i.system, property) === value);
}
