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
 * Pool = Prowess + Martial Skill + Modifiers
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
    weaponProwess: 'AOA.Derived.WeaponProwess.label',
    ballisticProwess: 'AOA.Derived.BallisticProwess.label',
    unarmedProwess: 'AOA.Derived.UnarmedProwess.label'
  };
  const prowessLabel = game.i18n.localize(prowessLabels[prowessKey] || 'AOA.Derived.WeaponProwess.label');

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

  // Calculate total pool: Prowess + Skill + Modifier
  const total = Math.max(0, prowessValue + skillRank + modifier);

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
    modifier,
    total,
    weapon: {
      name: weapon.name,
      id: weapon.id
    }
  };
}

/**
 * Calculate damage from an attack.
 * Damage = Weapon Damage + Strength (if melee) - Target DR
 * @param {Object} options - Damage calculation options
 * @param {Item} options.weapon - The weapon item
 * @param {Actor} options.attacker - The attacking actor
 * @param {Actor} [options.target] - The target actor (for DR)
 * @param {boolean} [options.isCritical=false] - Whether this was a critical hit
 * @returns {Object} Damage breakdown
 */
export function calculateDamage({ weapon, attacker, target = null, isCritical = false }) {
  const weaponData = weapon.system;

  // Base weapon damage
  const baseDamage = weaponData.baseDamage ?? 0;

  // Strength bonus for melee weapons (if useStrengthBonus is true)
  const rangeType = weaponData.range?.type || 'melee';
  const isMelee = ['melee', 'reach', 'thrown'].includes(rangeType);
  const useStrengthBonus = weaponData.useStrengthBonus ?? isMelee;
  const strengthBonus = useStrengthBonus ? (attacker.system.getAttributeTotal?.('strength') ?? attacker.system.str ?? 0) : 0;

  // Quality modifier (if weapon has quality bonuses)
  const qualityBonus = weaponData.attackBonus ?? weaponData.quality?.attackModifier ?? 0;

  // Total raw damage before DR
  const rawDamage = baseDamage + strengthBonus + qualityBonus;

  // Target's Damage Reduction
  let targetDR = 0;
  if (target) {
    targetDR = target.armorDR ?? 0;
  }

  // Final damage after DR (minimum 0)
  const finalDamage = Math.max(0, rawDamage - targetDR);

  // Trauma dealt: 1 for normal hit, 2 for critical hit
  const traumaDealt = isCritical ? 2 : 1;

  return {
    baseDamage,
    strengthBonus,
    qualityBonus,
    rawDamage,
    targetDR,
    finalDamage,
    traumaDealt,
    isCritical,
    isMelee,
    breakdown: {
      base: baseDamage,
      strength: strengthBonus,
      quality: qualityBonus,
      dr: targetDR
    }
  };
}

/**
 * Perform a complete attack roll.
 * @param {Object} options - Attack options
 * @param {Actor} options.attacker - The attacking actor
 * @param {Item} options.weapon - The weapon item
 * @param {Actor} [options.target] - The target actor
 * @param {number} [options.modifier=0] - Additional modifier
 * @param {string} [options.difficulty='standard'] - Difficulty tier
 * @param {boolean} [options.skipDialog=false] - Skip the attack dialog
 * @returns {Promise<Object>} Attack result
 */
export async function rollAttack({
  attacker,
  weapon,
  target = null,
  modifier = 0,
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
    poolData.modifier = modifier;
    poolData.total = Math.max(0, poolData.prowess.value + poolData.skill.rank + modifier);
  }

  // Always use standard difficulty
  difficulty = 'standard';

  // Roll the attack
  const rollResult = await rollThresholdCompression({
    pool: poolData.total,
    difficulty,
    targetThreshold
  });

  // Determine if it's a hit and if critical
  const isHit = rollResult.degree && ['success', 'criticalSuccess'].includes(rollResult.degree.key);
  const isCritical = rollResult.degree?.key === 'criticalSuccess';

  // Calculate damage if hit
  let damageResult = null;
  if (isHit) {
    damageResult = calculateDamage({
      weapon,
      attacker,
      target,
      isCritical
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
      range: weapon.system.range?.type || 'melee',
      hands: weapon.system.hands || 1,
      properties: weapon.system.properties || []
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
        title: game.i18n.format('AOA.Combat.AttackWith', { weapon: weapon.name }),
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
          label: game.i18n.localize('AOA.Combat.Attack'),
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
          label: game.i18n.localize('AOA.Common.Cancel'),
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

  const content = await foundry.applications.handlebars.renderTemplate(
    'systems/weight-of-ruin/templates/chat/attack-card.hbs',
    {
      ...attackResult,
      diceDisplay,
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
    { key: 'flanking', label: 'AOA.Combat.Modifier.Flanking', value: 2, type: 'attack' },
    { key: 'highGround', label: 'AOA.Combat.Modifier.HighGround', value: 1, type: 'attack' },
    { key: 'prone', label: 'AOA.Combat.Modifier.Prone', value: -2, type: 'attack' },
    { key: 'cover', label: 'AOA.Combat.Modifier.Cover', value: -2, type: 'attack' },
    { key: 'obscured', label: 'AOA.Combat.Modifier.Obscured', value: -2, type: 'attack' },
    { key: 'pointBlank', label: 'AOA.Combat.Modifier.PointBlank', value: 2, type: 'ranged' },
    { key: 'longRange', label: 'AOA.Combat.Modifier.LongRange', value: -2, type: 'ranged' }
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
