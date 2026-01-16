/**
 * The Weight of Ruin - Armor Field Rename Migration
 * Migrates armor data to use unified naming with weapons:
 *
 * Field changes:
 * - Old: system.armorType = "underlayer" | "outer" | "reinforcement" | "shield"
 * - Old: system.armorCategory = "quilted" | "mail" | "composite" | "scale" | "plate" | "shield"
 *
 * - New: system.armorCategory = "underlayer" | "outerlayer" | "reinforcement" | "shield"
 * - New: system.armorGroup = "quilted" | "mail" | "composite" | "scale" | "plate" | "hide" | "wood" | "metal"
 */

/**
 * Migrate armor field names for all items.
 */
export async function migrateArmorFieldRename() {
  console.log('The Weight of Ruin | Migrating armor field names...');

  // Migrate all world items
  const worldArmor = game.items.filter(i => i.type === 'armor');
  console.log(`The Weight of Ruin | Found ${worldArmor.length} world armor items to check`);

  for (const armor of worldArmor) {
    await migrateArmorItem(armor);
  }

  // Migrate actor-owned items
  for (const actor of game.actors) {
    const actorArmor = actor.items.filter(i => i.type === 'armor');
    for (const armor of actorArmor) {
      await migrateArmorItem(armor);
    }
  }

  // Migrate items in compendiums
  for (const pack of game.packs) {
    if (pack.documentName !== 'Item') continue;
    if (pack.locked) {
      console.log(`The Weight of Ruin | Skipping locked compendium: ${pack.collection}`);
      continue;
    }

    const documents = await pack.getDocuments();
    const armor = documents.filter(i => i.type === 'armor');
    console.log(`The Weight of Ruin | Found ${armor.length} armor items in compendium ${pack.collection}`);

    for (const item of armor) {
      await migrateArmorItem(item);
    }
  }

  // Migrate token actor items
  for (const scene of game.scenes) {
    for (const token of scene.tokens) {
      if (token.actorLink) continue;
      if (!token.actor) continue;

      const tokenArmor = token.actor.items.filter(i => i.type === 'armor');
      for (const armor of tokenArmor) {
        await migrateArmorItem(armor);
      }
    }
  }

  console.log('The Weight of Ruin | Armor field rename migration complete');
}

/**
 * Migrate a single armor item.
 * @param {Item} armor - The armor to migrate
 */
async function migrateArmorItem(armor) {
  const system = armor.system;
  const updateData = {};

  // Valid values for new schema
  const validCategories = ['underlayer', 'outerlayer', 'reinforcement', 'shield'];
  const validArmorGroups = ['quilted', 'mail', 'composite', 'scale', 'plate'];
  const validShieldGroups = ['hide', 'wood', 'composite', 'metal'];
  const validGroups = [...validArmorGroups, ...validShieldGroups];

  // Check if armorGroup exists and is valid - if so, likely already migrated
  if (system.armorGroup && validGroups.includes(system.armorGroup)) {
    // Verify armorCategory is also valid
    if (validCategories.includes(system.armorCategory)) {
      console.log(`The Weight of Ruin | Armor ${armor.name} already migrated, skipping`);
      return;
    }
  }

  // Determine the new armorGroup (material type)
  // This was previously stored in armorCategory (quilted, mail, etc.)
  let newArmorGroup = null;

  // Check if current armorCategory has a material value (old schema)
  if (system.armorCategory && validArmorGroups.includes(system.armorCategory)) {
    newArmorGroup = system.armorCategory;
  } else if (system.armorCategory === 'shield') {
    // For shields, determine group from name/description
    newArmorGroup = determineShieldGroup(armor);
  } else if (system.armorCategory === 'none') {
    // Default based on name
    newArmorGroup = determineArmorGroup(armor);
  }

  // Determine the new armorCategory (layer type)
  // This was previously stored in armorType
  let newArmorCategory = null;

  // Check if we have the old armorType field
  if (system.armorType) {
    if (system.armorType === 'outer') {
      newArmorCategory = 'outerlayer';
    } else if (validCategories.includes(system.armorType)) {
      newArmorCategory = system.armorType;
    }
  }

  // If no armorType, try to determine from current armorCategory or name
  if (!newArmorCategory) {
    // If current armorCategory is a layer type (from new schema), keep it
    if (validCategories.includes(system.armorCategory)) {
      newArmorCategory = system.armorCategory;
    } else {
      // Infer from armor name
      newArmorCategory = determineArmorCategory(armor);
    }
  }

  // Build update data
  if (newArmorCategory && newArmorCategory !== system.armorCategory) {
    updateData['system.armorCategory'] = newArmorCategory;
  }

  if (newArmorGroup && newArmorGroup !== system.armorGroup) {
    updateData['system.armorGroup'] = newArmorGroup;
  }

  // Remove old armorType field if it exists
  if (system.armorType !== undefined) {
    updateData['system.-=armorType'] = null;
  }

  // Only update if there are changes
  if (Object.keys(updateData).length === 0) {
    return;
  }

  try {
    await armor.update(updateData);
    console.log(`The Weight of Ruin | Migrated armor ${armor.name}: category=${newArmorCategory}, group=${newArmorGroup}`);
  } catch (error) {
    console.error(`The Weight of Ruin | Failed to migrate armor ${armor.name}:`, error);
    throw error;
  }
}

/**
 * Determine armor category (layer type) from armor data.
 * @param {Item} armor - The armor item
 * @returns {string} The armor category
 */
function determineArmorCategory(armor) {
  const name = armor.name?.toLowerCase() ?? '';

  // Check for shield
  if (name.includes('shield') || name.includes('buckler') || name.includes('pavise')) {
    return 'shield';
  }

  // Check for reinforcement pieces
  if (name.includes('gorget') || name.includes('coif') || name.includes('spaulder') ||
      name.includes('pauldron') || name.includes('couter') || name.includes('vambrace') ||
      name.includes('gauntlet') || name.includes('tasset') || name.includes('greave') ||
      name.includes('sabaton') || name.includes('aventail') || name.includes('bevor') ||
      name.includes('plackart') || name.includes('fauld') || name.includes('culet') ||
      name.includes('besagew') || name.includes('gusset') || name.includes('grandguard') ||
      name.includes('pasguard') || name.includes('mirror plate') || name.includes('jack chain')) {
    return 'reinforcement';
  }

  // Check for underlayer
  if (name.includes('gambeson') || name.includes('aketon') || name.includes('padded') ||
      name.includes('quilted hauberk') || name.includes('pourpoint') || name.includes('tegilay') ||
      name.includes('subarmalis') || name.includes('lifidi') || name.includes('arming doublet')) {
    return 'underlayer';
  }

  // Default to outerlayer
  return 'outerlayer';
}

/**
 * Determine armor group (material) from armor data.
 * @param {Item} armor - The armor item
 * @returns {string} The armor group
 */
function determineArmorGroup(armor) {
  const name = armor.name?.toLowerCase() ?? '';

  // Check for plate
  if (name.includes('plate') || name.includes('cuirass') || name.includes('breastplate') ||
      name.includes('harness') || name.includes('gorget') || name.includes('spaulder') ||
      name.includes('pauldron') || name.includes('couter') || name.includes('vambrace') ||
      name.includes('gauntlet') || name.includes('tasset') || name.includes('greave') ||
      name.includes('sabaton') || name.includes('plackart') || name.includes('fauld') ||
      name.includes('culet') || name.includes('besagew') || name.includes('grandguard') ||
      name.includes('pasguard') || name.includes('mirror plate') || name.includes('bevor')) {
    return 'plate';
  }

  // Check for mail
  if (name.includes('mail') || name.includes('chain') || name.includes('byrnie') ||
      name.includes('hauberk') || name.includes('coif') || name.includes('aventail') ||
      name.includes('baidana') || name.includes('jazerant') || name.includes('lorica hamata') ||
      name.includes('zereh') || name.includes('gusset')) {
    return 'mail';
  }

  // Check for scale/lamellar
  if (name.includes('scale') || name.includes('lamellar') || name.includes('splint') ||
      name.includes('lorica squamata') || name.includes('klibanion') || name.includes('kozane')) {
    return 'scale';
  }

  // Check for composite
  if (name.includes('brigandine') || name.includes('jack of plates') || name.includes('coat of plates') ||
      name.includes('chahar-aina') || name.includes('kuyak') || name.includes('karacena') ||
      name.includes('corrazina') || name.includes('kikko') || name.includes('jack chain')) {
    return 'composite';
  }

  // Check for quilted
  if (name.includes('gambeson') || name.includes('aketon') || name.includes('padded') ||
      name.includes('quilted') || name.includes('pourpoint') || name.includes('tegilay') ||
      name.includes('subarmalis') || name.includes('lifidi')) {
    return 'quilted';
  }

  // Default
  return 'mail';
}

/**
 * Determine shield group (material) from shield data.
 * @param {Item} armor - The shield item
 * @returns {string} The shield group
 */
function determineShieldGroup(armor) {
  const name = armor.name?.toLowerCase() ?? '';
  const img = armor.img?.toLowerCase() ?? '';

  // Check for metal shields
  if (name.includes('steel') || name.includes('iron') || name.includes('metal') ||
      name.includes('heater') || img.includes('steel') || img.includes('metal')) {
    return 'metal';
  }

  // Check for hide shields
  if (name.includes('hide') || name.includes('leather') || name.includes('rawhide')) {
    return 'hide';
  }

  // Default to wood for most shields
  return 'wood';
}
