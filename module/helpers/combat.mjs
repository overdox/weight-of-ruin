/**
 * The Weight of Ruin - Combat Helper Module
 * Implements attack resolution, damage calculation, and combat utilities.
 */

import { rollThresholdCompression, evaluateDegree, sendRollToChat, getDifficultyTier, generateDiceDisplay } from './dice.mjs';

/**
 * Calculate Target Threshold from Defense value.
 * TT = floor(Defense / 3), minimum 1
 * @param {number} defense - Defense value
 * @returns {number} Target Threshold
 */
export function calculateTTFromDefense(defense) {
  return Math.max(1, Math.floor(defense / 3));
}

/**
 * Build an attack dice pool.
 * Pool = Prowess + Martial Skill + Quality + Modifiers
 * Prowess types: weaponProwess (STR+AGI), ballisticProwess (AWA+AGI), unarmedProwess (STR+FOR)
 * Martial skills: Arms (+WP), Marksmanship (+BP), Brawling (+UP)
 * @param {Object} options - Attack options
 * @param {Actor} options.attacker - The attacking actor
 * @param {Item} options.weapon - The weapon item being used
 * @param {number} [options.modifier=0] - Additional modifier
 * @returns {Object} Pool breakdown
 */
export function buildAttackPool({ attacker, weapon, modifier = 0 }) {
  const weaponData = weapon.system;

  // Get the weapon's associated Prowess
  const prowessKey = weaponData.prowess || 'weaponProwess';
  const prowessValue = attacker.system[prowessKey] ?? 0;

  // Get prowess label
  const prowessLabels = {
    weaponProwess: 'WOR.Derived.WeaponProwess.label',
    ballisticProwess: 'WOR.Derived.BallisticProwess.label',
    unarmedProwess: 'WOR.Derived.UnarmedProwess.label'
  };
  const prowessLabel = game.i18n.localize(prowessLabels[prowessKey] || 'WOR.Derived.WeaponProwess.label');

  // Map prowess to martial skill name
  const prowessToSkill = {
    weaponProwess: 'Arms',
    ballisticProwess: 'Marksmanship',
    unarmedProwess: 'Brawling'
  };
  const skillName = prowessToSkill[prowessKey] || 'Arms';

  // Find the martial skill on the actor
  const martialSkill = attacker.items.find(i =>
    i.type === 'skill' &&
    i.name === skillName &&
    i.system.category === 'martial'
  );
  const skillRank = martialSkill?.system?.totalRank ?? martialSkill?.system?.rank ?? 0;

  // Get weapon quality bonus
  const qualityBonus = weaponData.attackBonus ?? 0;

  // Calculate total pool: Prowess + Skill + Quality + Modifier
  const total = Math.max(0, prowessValue + skillRank + qualityBonus + modifier);

  return {
    prowess: {
      key: prowessKey,
      value: prowessValue,
      label: prowessLabel
    },
    skill: {
      name: skillName,
      rank: skillRank,
      item: martialSkill
    },
    quality: qualityBonus,
    modifier,
    total,
    weapon: {
      name: weapon.name,
      id: weapon.id
    }
  };
}

/**
 * Generate HTML display for damage dice with different die shapes.
 * @param {Array} diceResults - Array of {value, die} objects
 * @returns {string} HTML string of dice display
 */
export function generateDamageDiceDisplay(diceResults) {
  if (!diceResults || !Array.isArray(diceResults)) return '';

  return diceResults.map(d => {
    const dieType = d.die || 'd6';
    const maxValue = parseInt(dieType.substring(1)) || 6;
    const isMax = d.value === maxValue;
    const isMin = d.value === 1;

    let classes = ['die', dieType];
    if (isMax) classes.push('max');
    if (isMin) classes.push('min');

    return `<span class="${classes.join(' ')}">${d.value}</span>`;
  }).join('');
}

/**
 * Calculate damage from an attack.
 * Damage = Base + Strength (if enabled) + Modifications + Hits (if Heavy) - DR
 * @param {Object} options - Damage calculation options
 * @param {Item} options.weapon - The weapon item
 * @param {Actor} options.attacker - The attacking actor
 * @param {Actor} [options.target] - The target actor (for DR)
 * @param {boolean} [options.isCritical=false] - Whether this was a critical hit
 * @param {number} [options.hits=0] - Number of hits from attack roll (for Heavy weapons)
 * @returns {Promise<Object>} Damage breakdown with rolled dice
 */
export async function calculateDamage({ weapon, attacker, target = null, isCritical = false, hits = 0 }) {
  const weaponData = weapon.system;

  // Base weapon damage and die type
  const baseDamageCount = weaponData.baseDamage ?? 0;
  const damageDie = weaponData.damageDie || 'd6';

  // Strength bonus for melee weapons (if useStrengthBonus is true)
  const rangeType = weaponData.range?.type || 'melee';
  const isMelee = ['melee', 'reach', 'thrown'].includes(rangeType);
  const useStrengthBonus = weaponData.useStrengthBonus ?? isMelee;
  const strengthBonus = useStrengthBonus ? (attacker.system.getAttributeTotal?.('strength') ?? attacker.system.str ?? 0) : 0;

  // Check if weapon is Heavy (adds hits to damage)
  const properties = weaponData.properties || [];
  const isHeavy = properties.some(p => p.toLowerCase() === 'heavy');
  const heavyBonus = isHeavy ? hits : 0;

  // Quality modifier (if weapon has quality bonuses)
  const qualityBonus = weaponData.attackBonus ?? weaponData.quality?.attackModifier ?? 0;

  // Collect all dice to roll
  const diceToRoll = [];

  // Base damage dice
  if (baseDamageCount > 0) {
    diceToRoll.push({ count: baseDamageCount, die: damageDie, source: 'base' });
  }

  // Process modifications for damage
  const modifications = weaponData.modifications || [];
  const modificationDamage = [];
  let totalModFixedDamage = 0;

  for (const mod of modifications) {
    if (mod.damageDie && mod.damageValue) {
      if (mod.damageDie === 'fixed') {
        totalModFixedDamage += mod.damageValue;
        modificationDamage.push({
          category: mod.category,
          type: mod.type,
          damageType: mod.damageType,
          effect: mod.effect,
          flavour: mod.flavour,
          isFixed: true,
          value: mod.damageValue,
          display: `+${mod.damageValue}`
        });
      } else {
        // Add modification dice to roll
        diceToRoll.push({ count: mod.damageValue, die: mod.damageDie, source: 'modification', category: mod.category });
        modificationDamage.push({
          category: mod.category,
          type: mod.type,
          damageType: mod.damageType,
          effect: mod.effect,
          flavour: mod.flavour,
          isFixed: false,
          diceCount: mod.damageValue,
          die: mod.damageDie,
          display: `${mod.damageValue}${mod.damageDie}`
        });
      }
    } else if (mod.effect || mod.flavour) {
      // Include modifications with just effect/flavour text
      modificationDamage.push({
        category: mod.category,
        type: mod.type,
        damageType: mod.damageType,
        effect: mod.effect,
        flavour: mod.flavour,
        isFixed: false,
        value: 0,
        display: null
      });
    }
  }

  // Roll all damage dice
  const allDiceResults = [];
  let totalDiceRolled = 0;

  for (const diceGroup of diceToRoll) {
    const formula = `${diceGroup.count}${diceGroup.die}`;
    const roll = new Roll(formula);
    await roll.evaluate();

    // Extract individual die results
    for (const term of roll.terms) {
      if (term.results) {
        for (const result of term.results) {
          allDiceResults.push({
            value: result.result,
            die: diceGroup.die,
            source: diceGroup.source,
            category: diceGroup.category
          });
        }
      }
    }
    totalDiceRolled += roll.total;
  }

  // Target's Damage Reduction
  let targetDR = 0;
  if (target) {
    targetDR = target.armorDR ?? 0;
  }

  // Build the damage formula for display
  // Format: {base}{die} + {str} + {mods} + {heavy hits} - {DR}
  const formulaParts = [];
  formulaParts.push(`${baseDamageCount}${damageDie}`);

  if (strengthBonus > 0) {
    formulaParts.push(`${strengthBonus}`);
  }

  // Add modification dice/damage
  for (const mod of modificationDamage) {
    if (mod.display) {
      formulaParts.push(mod.display);
    }
  }

  if (heavyBonus > 0) {
    formulaParts.push(`${heavyBonus}`);
  }

  const damageFormula = formulaParts.join(' + ');

  // Calculate total raw damage (dice + fixed bonuses)
  const rawDamage = totalDiceRolled + strengthBonus + qualityBonus + totalModFixedDamage + heavyBonus;

  // Final damage after DR (minimum 0)
  const finalDamage = Math.max(0, rawDamage - targetDR);

  // Trauma dealt: 1 for normal hit, 2 for critical hit
  const traumaDealt = isCritical ? 2 : 1;

  return {
    baseDamage: baseDamageCount,
    damageDie,
    baseDiceTotal: totalDiceRolled,
    diceResults: allDiceResults,
    strengthBonus,
    qualityBonus,
    heavyBonus,
    isHeavy,
    hits,
    modifications: modificationDamage,
    rawDamage,
    targetDR,
    finalDamage,
    traumaDealt,
    isCritical,
    isMelee,
    formula: damageFormula,
    breakdown: {
      base: baseDamageCount,
      die: damageDie,
      diceTotal: totalDiceRolled,
      strength: strengthBonus,
      quality: qualityBonus,
      heavy: heavyBonus,
      modifications: modificationDamage,
      dr: targetDR
    }
  };
}

/**
 * Perform a complete attack roll.
 * Hits are capped by weapon precision + aim bonus + improved precision talent.
 * @param {Object} options - Attack options
 * @param {Actor} options.attacker - The attacking actor
 * @param {Item} options.weapon - The weapon item
 * @param {Actor} [options.target] - The target actor
 * @param {number} [options.modifier=0] - Additional modifier
 * @param {number} [options.aimBonus=0] - Bonus to max hits from Aim action
 * @param {number} [options.improvedPrecision=0] - Bonus to max hits from Improved Precision talent
 * @param {string} [options.difficulty='standard'] - Difficulty tier
 * @param {boolean} [options.skipDialog=false] - Skip the attack dialog
 * @returns {Promise<Object>} Attack result
 */
export async function rollAttack({
  attacker,
  weapon,
  target = null,
  modifier = 0,
  aimBonus = 0,
  improvedPrecision = 0,
  difficulty = 'standard',
  skipDialog = false
}) {
  // Build the attack pool
  const poolData = buildAttackPool({ attacker, weapon, modifier });

  // Calculate target's TT from Defense
  let targetThreshold = null;
  let targetDefense = null;
  if (target) {
    targetDefense = target.totalDefense ?? 10;
    targetThreshold = calculateTTFromDefense(targetDefense);
  }

  // If not skipping dialog, show the attack dialog
  if (!skipDialog) {
    const dialogResult = await showAttackDialog({
      attacker,
      weapon,
      target,
      poolData,
      targetThreshold,
      targetDefense
    });

    if (!dialogResult) return null; // Dialog cancelled

    // Update values from dialog
    modifier = dialogResult.modifier;
    targetThreshold = dialogResult.targetThreshold;
    aimBonus = dialogResult.aimBonus ?? aimBonus;
    poolData.modifier = modifier;
    // Recalculate total including quality bonus
    poolData.total = Math.max(0, poolData.prowess.value + poolData.skill.rank + poolData.quality + modifier);
  }

  // Always use standard difficulty
  difficulty = 'standard';

  // Roll the attack
  const rollResult = await rollThresholdCompression({
    pool: poolData.total,
    difficulty,
    targetThreshold
  });

  // Calculate maximum hits based on weapon precision
  const weaponPrecision = weapon.system.precision ?? 6;
  const maxHits = weaponPrecision + aimBonus + improvedPrecision;

  // Store raw hits and calculate effective (capped) hits
  const rawHits = rollResult.hits;
  const effectiveHits = Math.min(rawHits, maxHits);
  const hitsCapped = rawHits > maxHits;

  // Update the roll result with capped hits
  rollResult.rawHits = rawHits;
  rollResult.effectiveHits = effectiveHits;
  rollResult.hits = effectiveHits; // Override hits with capped value
  rollResult.maxHits = maxHits;
  rollResult.hitsCapped = hitsCapped;
  rollResult.precision = {
    weapon: weaponPrecision,
    aim: aimBonus,
    talent: improvedPrecision,
    total: maxHits
  };

  // Re-evaluate degree based on effective hits
  if (targetThreshold !== null) {
    rollResult.degree = evaluateDegree(effectiveHits, targetThreshold);
  }

  // Determine if it's a hit and if critical
  const isHit = rollResult.degree && ['success', 'criticalSuccess'].includes(rollResult.degree.key);
  const isCritical = rollResult.degree?.key === 'criticalSuccess';

  // Calculate damage if hit (pass effective hits for Heavy weapon bonus)
  let damageResult = null;
  if (isHit) {
    damageResult = await calculateDamage({
      weapon,
      attacker,
      target,
      isCritical,
      hits: effectiveHits
    });
  }

  // Build the complete attack result
  const attackResult = {
    attacker: {
      id: attacker.id,
      name: attacker.name,
      img: attacker.img
    },
    target: target ? {
      id: target.id,
      name: target.name,
      img: target.img,
      defense: targetDefense,
      dr: target.armorDR ?? 0
    } : null,
    weapon: {
      id: weapon.id,
      name: weapon.name,
      img: weapon.img,
      damage: weapon.system.baseDamage,
      damageDie: weapon.system.damageDie || 'd6',
      range: weapon.system.range?.type || 'melee',
      hands: weapon.system.hands || 1,
      properties: weapon.system.properties || [],
      modifications: weapon.system.modifications || [],
      precision: weaponPrecision
    },
    pool: poolData,
    roll: rollResult,
    targetThreshold,
    isHit,
    isCritical,
    damage: damageResult,
    difficulty: getDifficultyTier(difficulty)
  };

  // Send to chat
  await sendAttackToChat(attackResult);

  return attackResult;
}

/**
 * Show the attack dialog for modifier adjustment.
 * @param {Object} options - Dialog options
 * @returns {Promise<Object|null>} Dialog result or null if cancelled
 */
async function showAttackDialog({ attacker, weapon, target, poolData, targetThreshold, targetDefense }) {
  const content = await foundry.applications.handlebars.renderTemplate(
    'systems/weight-of-ruin/templates/apps/attack-dialog.hbs',
    {
      attacker,
      weapon,
      target,
      poolData,
      targetThreshold,
      targetDefense
    }
  );

  return new Promise((resolve) => {
    new foundry.applications.api.DialogV2({
      window: {
        title: game.i18n.format('WOR.Combat.AttackWith', { weapon: weapon.name }),
        icon: 'fas fa-sword'
      },
      position: {
        width: 450
      },
      classes: ['wor', 'weight-of-ruin', 'attack-dialog'],
      content,
      buttons: [
        {
          action: 'attack',
          label: game.i18n.localize('WOR.Combat.Attack'),
          icon: 'fas fa-crosshairs',
          default: true,
          callback: (event, button, dialog) => {
            const form = button.form;
            resolve({
              modifier: parseInt(form.elements.modifier?.value) || 0,
              difficulty: 'standard',
              targetThreshold: parseInt(form.elements.targetThreshold?.value) || targetThreshold
            });
          }
        },
        {
          action: 'cancel',
          label: game.i18n.localize('WOR.Common.Cancel'),
          icon: 'fas fa-times',
          callback: () => resolve(null)
        }
      ],
      close: () => resolve(null)
    }).render(true);
  });
}

/**
 * Send attack result to chat.
 * @param {Object} attackResult - The attack result object
 */
async function sendAttackToChat(attackResult) {
  const speaker = ChatMessage.getSpeaker({ actor: game.actors.get(attackResult.attacker.id) });
  const rollMode = game.settings.get('core', 'rollMode');

  // Build dice display using shared helper
  const diceDisplay = generateDiceDisplay(
    attackResult.roll.dice,
    attackResult.roll.difficulty?.threshold || 5
  );

  // Build damage dice display if hit
  const damageDiceDisplay = attackResult.damage?.diceResults
    ? generateDamageDiceDisplay(attackResult.damage.diceResults)
    : '';

  const content = await foundry.applications.handlebars.renderTemplate(
    'systems/weight-of-ruin/templates/chat/attack-card.hbs',
    {
      ...attackResult,
      diceDisplay,
      damageDiceDisplay,
      degreeLabel: attackResult.roll.degree ? game.i18n.localize(attackResult.roll.degree.label) : null,
      degreeCss: attackResult.roll.degree?.cssClass || ''
    }
  );

  const messageData = {
    speaker,
    content,
    rollMode,
    rolls: attackResult.roll.roll ? [attackResult.roll.roll] : [],
    flags: {
      'weight-of-ruin': {
        attackResult: {
          attackerId: attackResult.attacker.id,
          targetId: attackResult.target?.id,
          weaponId: attackResult.weapon.id,
          isHit: attackResult.isHit,
          damage: attackResult.damage
        }
      }
    }
  };

  return ChatMessage.create(messageData);
}

/**
 * Get common combat modifiers for reference.
 * @returns {Array} Array of modifier objects
 */
export function getCombatModifiers() {
  return [
    { key: 'flanking', label: 'WOR.Combat.Modifier.Flanking', value: 2, type: 'attack' },
    { key: 'highGround', label: 'WOR.Combat.Modifier.HighGround', value: 1, type: 'attack' },
    { key: 'prone', label: 'WOR.Combat.Modifier.Prone', value: -2, type: 'attack' },
    { key: 'cover', label: 'WOR.Combat.Modifier.Cover', value: -2, type: 'attack' },
    { key: 'obscured', label: 'WOR.Combat.Modifier.Obscured', value: -2, type: 'attack' },
    { key: 'pointBlank', label: 'WOR.Combat.Modifier.PointBlank', value: 2, type: 'ranged' },
    { key: 'longRange', label: 'WOR.Combat.Modifier.LongRange', value: -2, type: 'ranged' }
  ];
}

/**
 * Register combat functions on the game object for global access.
 */
export function registerCombatFunctions() {
  game.wor = game.wor || {};
  game.wor.combat = {
    calculateTTFromDefense,
    buildAttackPool,
    calculateDamage,
    rollAttack,
    getCombatModifiers
  };
}
