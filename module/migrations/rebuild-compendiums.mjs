/**
 * The Weight of Ruin - Compendium Rebuild Script
 * Wipes and regenerates compendium data from static data files.
 *
 * Usage: Call rebuildCompendiums() from console or on system ready.
 * Example: game.wor.rebuildCompendiums()
 */

import { WEAPONS_DATA } from '../data/weapons-data.mjs';
import { ARMOR_DATA } from '../data/armor-data.mjs';
import { SKILLS_DATA } from '../data/skills-data.mjs';
import { TALENTS_DATA } from '../data/talents-data.mjs';
import { LINEAGES_DATA } from '../data/lineages-data.mjs';
import { BACKGROUNDS_DATA } from '../data/backgrounds-data.mjs';
import { ARCHETYPES_DATA } from '../data/archetypes-data.mjs';
import { CALLINGS_DATA } from '../data/callings-data.mjs';
import { PATHWAYS_DATA } from '../data/pathways-data.mjs';
import { LIFE_EVENTS_DATA } from '../data/life-events-data.mjs';
import { GEAR_DATA } from '../data/gear-data.mjs';
import { NPC_TRAITS_DATA } from '../data/npc-traits-data.mjs';

/**
 * Transform weapon data to ensure schema compatibility.
 * Now primarily a pass-through since static data is in correct format.
 * Handles legacy data migration if needed.
 * @param {Object} oldData - Weapon data
 * @returns {Object} - Transformed weapon data
 */
function transformWeaponData(oldData) {
  const data = foundry.utils.deepClone(oldData);

  // Only transform if using legacy 'damage' field instead of 'baseDamage'
  if (data.system.damage !== undefined && data.system.baseDamage === undefined) {
    data.system.baseDamage = data.system.damage;
    const isMelee = !data.system.range?.type ||
                    data.system.range?.type === 'melee' ||
                    data.system.range?.type === 'reach' ||
                    data.system.range?.type === 'thrown';
    data.system.useStrengthBonus = isMelee;
    delete data.system.damage;
  }

  // Transform legacy skill names only if they match old names
  const skillMap = {
    'swordplay': 'weaponSkill',
    'axecraft': 'weaponSkill',
    'polearms': 'weaponSkill',
    'brawling': 'unarmedSkill',
    'archery': 'marksmanship',
    'crossbows': 'marksmanship',
    'throwing': 'marksmanship'
  };
  if (data.system.skill && skillMap[data.system.skill]) {
    data.system.skill = skillMap[data.system.skill];
  }

  // Add defaults only for missing fields (won't override existing correct values)
  if (data.system.reliability === undefined) {
    data.system.reliability = 6;
  }
  if (data.system.armorPiercing === undefined) {
    data.system.armorPiercing = 0;
  }
  if (data.system.rarity === undefined) {
    data.system.rarity = 'common';
  }
  if (data.system.group === undefined) {
    data.system.group = determineWeaponGroup(data);
  }
  if (data.system.useStrengthBonus === undefined) {
    data.system.useStrengthBonus = true;
  }

  // Ensure quality structure exists
  if (!data.system.quality) {
    data.system.quality = { level: 'standard', attackModifier: 0 };
  }

  // Only transform range if it's missing the 'value' field (legacy format used 'short')
  if (data.system.range && data.system.range.short !== undefined && data.system.range.value === undefined) {
    data.system.range.value = data.system.range.short;
    delete data.system.range.short;
  }

  return data;
}

/**
 * Determine weapon group from weapon data.
 */
function determineWeaponGroup(weapon) {
  const name = weapon.name?.toLowerCase() ?? '';
  const skill = weapon.system?.skill?.toLowerCase() ?? '';

  if (name.includes('dagger') || name.includes('stiletto') || name.includes('knife')) {
    return 'dagger';
  }
  if (name.includes('sword') || name.includes('rapier') || name.includes('sabre') || name.includes('falchion')) {
    return 'sword';
  }
  if (name.includes('axe') || name.includes('hatchet')) {
    return 'axe';
  }
  if (name.includes('mace') || name.includes('hammer') || name.includes('club') || name.includes('maul') || name.includes('flail') || name.includes('morningstar')) {
    return 'blunt';
  }
  if (name.includes('spear') || name.includes('pike') || name.includes('halberd') || name.includes('glaive') || name.includes('staff') || name.includes('javelin')) {
    return 'polearm';
  }
  if (name.includes('bow') && !name.includes('crossbow')) {
    return 'bow';
  }
  if (name.includes('crossbow')) {
    return 'crossbow';
  }
  if (name.includes('sling') || skill === 'throwing') {
    return 'thrown';
  }
  if (name.includes('brass') || name.includes('cestus') || name.includes('knuckle') || skill === 'brawling') {
    return 'unarmed';
  }

  return 'sword'; // Default
}

/**
 * Transform armor data to ensure schema compatibility.
 * Now primarily a pass-through since static data is in correct format.
 * Handles legacy data migration if needed.
 * @param {Object} oldData - Armor data
 * @returns {Object} - Transformed armor data
 */
function transformArmorData(oldData) {
  const data = foundry.utils.deepClone(oldData);

  // Add defaults only for missing fields (won't override existing correct values)
  if (data.system.encumbering === undefined) {
    data.system.encumbering = 0;
  }
  if (data.system.noisy === undefined) {
    data.system.noisy = false;
  }
  if (data.system.bulky === undefined) {
    data.system.bulky = false;
  }
  if (data.system.cumbersome === undefined) {
    data.system.cumbersome = false;
  }
  if (data.system.flexible === undefined) {
    data.system.flexible = false;
  }
  if (data.system.insulating === undefined) {
    data.system.insulating = false;
  }
  if (data.system.armorCategory === undefined) {
    data.system.armorCategory = determineArmorCategory(data);
  }
  if (data.system.rarity === undefined) {
    data.system.rarity = 'common';
  }

  // Ensure quality structure exists with correct fields
  if (!data.system.quality) {
    data.system.quality = {
      level: 'standard',
      drModifier: 0,
      encumberingReduction: 0
    };
  } else {
    // Ensure all quality subfields exist
    if (data.system.quality.drModifier === undefined) {
      data.system.quality.drModifier = 0;
    }
    if (data.system.quality.encumberingReduction === undefined) {
      data.system.quality.encumberingReduction = 0;
    }
  }

  // Ensure shield structure exists
  if (!data.system.shield) {
    data.system.shield = {
      isShield: data.system.armorCategory === 'shield',
      defenseBonus: 0,
      blockDR: 0
    };
  }

  return data;
}

/**
 * Determine armor category from armor data.
 */
function determineArmorCategory(armor) {
  const name = armor.name?.toLowerCase() ?? '';
  const type = armor.system?.type?.toLowerCase() ?? '';

  if (name.includes('shield') || name.includes('buckler') || type.includes('shield')) {
    return 'shield';
  }
  if (name.includes('plate') || name.includes('cuirass') || name.includes('breastplate')) {
    return 'plate';
  }
  if (name.includes('mail') || name.includes('chain')) {
    return 'mail';
  }
  if (name.includes('scale') || name.includes('lamellar')) {
    return 'scale';
  }
  if (name.includes('brigandine') || name.includes('jack') || name.includes('coat of plates')) {
    return 'composite';
  }
  if (name.includes('padded') || name.includes('gambeson') || name.includes('quilted') || name.includes('aketon')) {
    return 'quilted';
  }

  return 'none';
}

/**
 * Rebuild a single compendium pack.
 * @param {string} packName - The pack name (e.g., 'weapons')
 * @param {Array} sourceData - The source data array
 * @param {Function} [transformFn] - Optional transform function
 */
async function rebuildPack(packName, sourceData, transformFn = null) {
  const packId = `weight-of-ruin.${packName}`;
  const pack = game.packs.get(packId);

  if (!pack) {
    console.warn(`The Weight of Ruin | Pack ${packId} not found`);
    return { success: false, error: 'Pack not found' };
  }

  // Unlock pack if needed
  const wasLocked = pack.locked;
  if (wasLocked) {
    await pack.configure({ locked: false });
  }

  try {
    console.log(`The Weight of Ruin | Wiping pack ${packName}...`);

    // Get all existing document IDs from the index (doesn't validate/load full docs)
    const index = await pack.getIndex();
    const existingIds = index.map(entry => entry._id);

    // Delete documents by ID without loading them (avoids validation errors)
    if (existingIds.length > 0) {
      const docClass = pack.documentClass;
      await docClass.deleteDocuments(existingIds, { pack: packId });
    }
    console.log(`The Weight of Ruin | Deleted ${existingIds.length} documents from ${packName}`);

    // Create new documents from source data
    console.log(`The Weight of Ruin | Creating ${sourceData.length} new documents in ${packName}...`);

    for (const itemData of sourceData) {
      // Apply transformation if provided
      const data = transformFn ? transformFn(itemData) : itemData;

      // Create the item in the pack
      await Item.create(data, { pack: packId });
    }

    console.log(`The Weight of Ruin | Successfully rebuilt ${packName} with ${sourceData.length} items`);
    return { success: true, count: sourceData.length };

  } catch (error) {
    console.error(`The Weight of Ruin | Error rebuilding ${packName}:`, error);
    return { success: false, error: error.message };

  } finally {
    // Re-lock if it was locked
    if (wasLocked) {
      await pack.configure({ locked: true });
    }
  }
}

/**
 * Rebuild all compendium packs from static data.
 * @returns {Promise<Object>} Results of the rebuild
 */
export async function rebuildCompendiums() {
  if (!game.user.isGM) {
    ui.notifications.error('Only GMs can rebuild compendiums');
    return { success: false, error: 'Not a GM' };
  }

  console.log('The Weight of Ruin | Starting compendium rebuild...');
  ui.notifications.info('Rebuilding compendiums... This may take a moment.');

  const results = {};

  // Rebuild each pack
  results.weapons = await rebuildPack('weapons', WEAPONS_DATA, transformWeaponData);
  results.armor = await rebuildPack('armor', ARMOR_DATA, transformArmorData);
  results.skills = await rebuildPack('skills', SKILLS_DATA);
  results.talents = await rebuildPack('talents', TALENTS_DATA);
  results.lineages = await rebuildPack('lineages', LINEAGES_DATA);
  results.backgrounds = await rebuildPack('backgrounds', BACKGROUNDS_DATA);
  results.archetypes = await rebuildPack('archetypes', ARCHETYPES_DATA);
  results.callings = await rebuildPack('callings', CALLINGS_DATA);
  results.pathways = await rebuildPack('pathways', PATHWAYS_DATA);
  results['life-events'] = await rebuildPack('life-events', LIFE_EVENTS_DATA);
  results.gear = await rebuildPack('gear', GEAR_DATA);
  results['npc-traits'] = await rebuildPack('npc-traits', NPC_TRAITS_DATA);

  // Summary
  const successful = Object.values(results).filter(r => r.success).length;
  const failed = Object.values(results).filter(r => !r.success).length;

  console.log('The Weight of Ruin | Compendium rebuild complete:', results);

  if (failed === 0) {
    ui.notifications.info(`Compendium rebuild complete! ${successful} packs rebuilt successfully.`);
  } else {
    ui.notifications.warn(`Compendium rebuild complete. ${successful} succeeded, ${failed} failed. Check console for details.`);
  }

  return results;
}

/**
 * Wipe all compendium packs (destructive operation).
 * @returns {Promise<Object>} Results of the wipe
 */
export async function wipeCompendiums() {
  if (!game.user.isGM) {
    ui.notifications.error('Only GMs can wipe compendiums');
    return { success: false, error: 'Not a GM' };
  }

  // Use V2 Dialog API
  const confirmed = await foundry.applications.api.DialogV2.confirm({
    window: { title: 'Wipe All Compendiums' },
    content: '<p><strong>Warning:</strong> This will permanently delete all items from all system compendiums. This cannot be undone.</p><p>Are you sure you want to continue?</p>',
    yes: { default: false },
    no: { default: true }
  });

  if (!confirmed) {
    ui.notifications.info('Compendium wipe cancelled.');
    return { success: false, error: 'Cancelled by user' };
  }

  console.log('The Weight of Ruin | Wiping all compendiums...');

  const packNames = ['weapons', 'armor', 'skills', 'talents', 'lineages', 'backgrounds', 'archetypes', 'callings', 'pathways', 'life-events', 'gear', 'npc-traits'];
  const results = {};

  for (const packName of packNames) {
    const packId = `weight-of-ruin.${packName}`;
    const pack = game.packs.get(packId);

    if (!pack) {
      results[packName] = { success: false, error: 'Pack not found' };
      continue;
    }

    const wasLocked = pack.locked;
    if (wasLocked) {
      await pack.configure({ locked: false });
    }

    try {
      const docs = await pack.getDocuments();
      for (const doc of docs) {
        await doc.delete();
      }
      results[packName] = { success: true, deleted: docs.length };
      console.log(`The Weight of Ruin | Wiped ${docs.length} items from ${packName}`);
    } catch (error) {
      results[packName] = { success: false, error: error.message };
    } finally {
      if (wasLocked) {
        await pack.configure({ locked: true });
      }
    }
  }

  ui.notifications.info('Compendiums wiped. Use rebuildCompendiums() to regenerate from static data.');
  return results;
}
