/**
 * The Weight of Ruin - Weapons & Armor Migration
 * Migrates item data from the old format to the new format:
 *
 * Weapons:
 * - Old: system.damage (flat number)
 * - New: system.baseDamage (number), system.useStrengthBonus (boolean)
 * - Old: system.skill = "swordplay"
 * - New: system.skill = "weaponSkill"
 * - Add: system.reliability, system.armorPiercing, system.rarity, system.group
 *
 * Armor:
 * - Add: system.encumbering, system.noisy, system.bulky, system.cumbersome
 * - Add: system.flexible, system.insulating, system.armorCategory, system.rarity
 * - Update: system.quality structure
 */

/**
 * Migrate weapons and armor data for all items.
 */
export async function migrateWeaponsArmor() {
  console.log('The Weight of Ruin | Migrating weapons and armor data...');

  // Migrate all world items
  const worldWeapons = game.items.filter(i => i.type === 'weapon');
  const worldArmor = game.items.filter(i => i.type === 'armor');

  console.log(`The Weight of Ruin | Found ${worldWeapons.length} world weapons and ${worldArmor.length} world armor to migrate`);

  for (const weapon of worldWeapons) {
    await migrateWeapon(weapon);
  }
  for (const armor of worldArmor) {
    await migrateArmor(armor);
  }

  // Migrate actor-owned items
  for (const actor of game.actors) {
    const actorWeapons = actor.items.filter(i => i.type === 'weapon');
    const actorArmor = actor.items.filter(i => i.type === 'armor');

    for (const weapon of actorWeapons) {
      await migrateWeapon(weapon);
    }
    for (const armor of actorArmor) {
      await migrateArmor(armor);
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
    const weapons = documents.filter(i => i.type === 'weapon');
    const armor = documents.filter(i => i.type === 'armor');

    console.log(`The Weight of Ruin | Found ${weapons.length} weapons and ${armor.length} armor in compendium ${pack.collection}`);

    for (const weapon of weapons) {
      await migrateWeapon(weapon);
    }
    for (const item of armor) {
      await migrateArmor(item);
    }
  }

  // Migrate token actor items
  for (const scene of game.scenes) {
    for (const token of scene.tokens) {
      if (token.actorLink) continue;
      if (!token.actor) continue;

      const tokenWeapons = token.actor.items.filter(i => i.type === 'weapon');
      const tokenArmor = token.actor.items.filter(i => i.type === 'armor');

      for (const weapon of tokenWeapons) {
        await migrateWeapon(weapon);
      }
      for (const armor of tokenArmor) {
        await migrateArmor(armor);
      }
    }
  }

  console.log('The Weight of Ruin | Weapons and armor migration complete');
}

/**
 * Migrate a single weapon item.
 * @param {Item} weapon - The weapon to migrate
 */
async function migrateWeapon(weapon) {
  const system = weapon.system;

  // Check if already migrated (has baseDamage field with meaningful data)
  if (system.baseDamage !== undefined && system.useStrengthBonus !== undefined) {
    console.log(`The Weight of Ruin | Weapon ${weapon.name} already migrated, skipping`);
    return;
  }

  // Build update data
  const updateData = {};

  // Migrate damage: old 'damage' field to 'baseDamage' + 'useStrengthBonus'
  if (system.damage !== undefined && system.baseDamage === undefined) {
    updateData['system.baseDamage'] = system.damage;
    // Determine if melee weapon (should add SB)
    const isMelee = !system.range?.type || system.range?.type === 'melee' ||
                    system.range?.type === 'reach' || system.range?.type === 'thrown';
    updateData['system.useStrengthBonus'] = isMelee;
    // Remove old damage field
    updateData['system.damage'] = null;
    updateData['system.-=damage'] = null;
  }

  // Migrate skill name
  if (system.skill === 'swordplay') {
    updateData['system.skill'] = 'weaponSkill';
  }

  // Add new fields if missing
  if (system.reliability === undefined) {
    updateData['system.reliability'] = 6; // Default REL
  }
  if (system.armorPiercing === undefined) {
    updateData['system.armorPiercing'] = 0; // Default AP
  }
  if (system.rarity === undefined) {
    updateData['system.rarity'] = 'common';
  }
  if (system.group === undefined) {
    // Try to determine group from existing data
    updateData['system.group'] = determineWeaponGroup(weapon);
  }

  // Only update if there are changes
  if (Object.keys(updateData).length === 0) {
    return;
  }

  try {
    await weapon.update(updateData);
    console.log(`The Weight of Ruin | Migrated weapon ${weapon.name}`);
  } catch (error) {
    console.error(`The Weight of Ruin | Failed to migrate weapon ${weapon.name}:`, error);
    throw error;
  }
}

/**
 * Determine weapon group from existing weapon data.
 * @param {Item} weapon - The weapon item
 * @returns {string} The weapon group
 */
function determineWeaponGroup(weapon) {
  const name = weapon.name?.toLowerCase() ?? '';
  const subcategory = weapon.system?.subcategory?.toLowerCase() ?? '';

  // Check for common weapon types in name or subcategory
  if (name.includes('dagger') || name.includes('knife') || name.includes('stiletto') ||
      name.includes('rondel') || name.includes('misericorde') || name.includes('dirk')) {
    return 'dagger';
  }
  if (name.includes('sword') || name.includes('rapier') || name.includes('sabre') ||
      name.includes('falchion') || name.includes('spadone') || name.includes('spatha')) {
    return 'sword';
  }
  if (name.includes('axe') || name.includes('hatchet') || name.includes('bardiche') ||
      name.includes('poleaxe')) {
    return 'axe';
  }
  if (name.includes('mace') || name.includes('hammer') || name.includes('club') ||
      name.includes('flail') || name.includes('maul') || name.includes('morningstar')) {
    return 'blunt';
  }
  if (name.includes('spear') || name.includes('pike') || name.includes('halberd') ||
      name.includes('glaive') || name.includes('polearm') || name.includes('staff')) {
    return 'polearm';
  }
  if (name.includes('bow') && !name.includes('crossbow')) {
    return 'bow';
  }
  if (name.includes('crossbow')) {
    return 'crossbow';
  }
  if (name.includes('javelin') || name.includes('sling') || name.includes('throwing')) {
    return 'thrown';
  }
  if (name.includes('fist') || name.includes('unarmed') || name.includes('cestus') ||
      name.includes('knuckle')) {
    return 'unarmed';
  }

  // Default based on subcategory if available
  if (subcategory && ['dagger', 'sword', 'axe', 'blunt', 'polearm', 'bow', 'crossbow', 'thrown', 'unarmed'].includes(subcategory)) {
    return subcategory;
  }

  return 'sword'; // Default fallback
}

/**
 * Migrate a single armor item.
 * @param {Item} armor - The armor to migrate
 */
async function migrateArmor(armor) {
  const system = armor.system;

  // Check if already migrated (has encumbering field)
  if (system.encumbering !== undefined && system.armorCategory !== undefined) {
    console.log(`The Weight of Ruin | Armor ${armor.name} already migrated, skipping`);
    return;
  }

  // Build update data
  const updateData = {};

  // Add new armor properties if missing
  if (system.encumbering === undefined) {
    updateData['system.encumbering'] = 0;
  }
  if (system.noisy === undefined) {
    updateData['system.noisy'] = false;
  }
  if (system.bulky === undefined) {
    updateData['system.bulky'] = false;
  }
  if (system.cumbersome === undefined) {
    updateData['system.cumbersome'] = false;
  }
  if (system.flexible === undefined) {
    updateData['system.flexible'] = false;
  }
  if (system.insulating === undefined) {
    updateData['system.insulating'] = false;
  }
  if (system.armorCategory === undefined) {
    updateData['system.armorCategory'] = determineArmorCategory(armor);
  }
  if (system.rarity === undefined) {
    updateData['system.rarity'] = 'common';
  }

  // Ensure quality structure is correct
  if (!system.quality?.level) {
    updateData['system.quality.level'] = 'standard';
    updateData['system.quality.drModifier'] = 0;
    updateData['system.quality.encumberingReduction'] = 0;
  }

  // Only update if there are changes
  if (Object.keys(updateData).length === 0) {
    return;
  }

  try {
    await armor.update(updateData);
    console.log(`The Weight of Ruin | Migrated armor ${armor.name}`);
  } catch (error) {
    console.error(`The Weight of Ruin | Failed to migrate armor ${armor.name}:`, error);
    throw error;
  }
}

/**
 * Determine armor category from existing armor data.
 * @param {Item} armor - The armor item
 * @returns {string} The armor category
 */
function determineArmorCategory(armor) {
  const name = armor.name?.toLowerCase() ?? '';
  const type = armor.system?.type?.toLowerCase() ?? '';

  // Check for shield first
  if (name.includes('shield') || name.includes('buckler') || name.includes('pavise') ||
      type.includes('shield')) {
    return 'shield';
  }

  // Check for plate armor
  if (name.includes('plate') || name.includes('cuirass') || name.includes('breastplate')) {
    return 'plate';
  }

  // Check for mail armor
  if (name.includes('mail') || name.includes('chainmail') || name.includes('chain')) {
    return 'mail';
  }

  // Check for scale/lamellar
  if (name.includes('scale') || name.includes('lamellar') || name.includes('splint')) {
    return 'scale';
  }

  // Check for composite armor
  if (name.includes('brigandine') || name.includes('jack') || name.includes('coat of plates')) {
    return 'composite';
  }

  // Check for quilted armor
  if (name.includes('padded') || name.includes('gambeson') || name.includes('quilted') ||
      name.includes('aketon')) {
    return 'quilted';
  }

  // Check existing type field
  if (type && ['quilted', 'mail', 'composite', 'scale', 'plate', 'shield'].includes(type)) {
    return type;
  }

  return 'none'; // Default fallback
}
