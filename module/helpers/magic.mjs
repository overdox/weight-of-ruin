/**
 * Magic System Helpers for The Weight of Ruin
 * Handles Sorcery, Ritefocus, Necromancy, and Essence mechanics
 */

import { rollThresholdCompression, sendRollToChat, DIFFICULTY_TIERS } from './dice.mjs';
import { WoRRollDialog } from '../apps/roll-dialog.mjs';

/* ========================================
   CONSTANTS
   ======================================== */

/**
 * Sorcery Techniques (verbs)
 */
export const SORCERY_TECHNIQUES = {
  create: { label: 'AOA.Sorcery.Technique.Create', description: 'AOA.Sorcery.Technique.CreateDesc' },
  perceive: { label: 'AOA.Sorcery.Technique.Perceive', description: 'AOA.Sorcery.Technique.PerceiveDesc' },
  transform: { label: 'AOA.Sorcery.Technique.Transform', description: 'AOA.Sorcery.Technique.TransformDesc' },
  destroy: { label: 'AOA.Sorcery.Technique.Destroy', description: 'AOA.Sorcery.Technique.DestroyDesc' },
  control: { label: 'AOA.Sorcery.Technique.Control', description: 'AOA.Sorcery.Technique.ControlDesc' }
};

/**
 * Sorcery Forms (nouns)
 */
export const SORCERY_FORMS = {
  elements: { label: 'AOA.Sorcery.Form.Elements', description: 'AOA.Sorcery.Form.ElementsDesc' },
  living: { label: 'AOA.Sorcery.Form.Living', description: 'AOA.Sorcery.Form.LivingDesc' },
  mind: { label: 'AOA.Sorcery.Form.Mind', description: 'AOA.Sorcery.Form.MindDesc' },
  matter: { label: 'AOA.Sorcery.Form.Matter', description: 'AOA.Sorcery.Form.MatterDesc' },
  spirit: { label: 'AOA.Sorcery.Form.Spirit', description: 'AOA.Sorcery.Form.SpiritDesc' },
  space: { label: 'AOA.Sorcery.Form.Space', description: 'AOA.Sorcery.Form.SpaceDesc' },
  time: { label: 'AOA.Sorcery.Form.Time', description: 'AOA.Sorcery.Form.TimeDesc' }
};

/**
 * Ritefocus Paths
 */
export const RITEFOCUS_PATHS = {
  circlecasting: { label: 'AOA.Ritefocus.Path.Circlecasting', skill: 'ritefocus' },
  binding: { label: 'AOA.Ritefocus.Path.Binding', skill: 'ritefocus' },
  hexing: { label: 'AOA.Ritefocus.Path.Hexing', skill: 'ritefocus' }
};

/**
 * Backlash severity levels
 */
export const BACKLASH_SEVERITY = {
  trivial: { label: 'AOA.Backlash.Trivial', traumaMultiplier: 0.5 },
  minor: { label: 'AOA.Backlash.Minor', traumaMultiplier: 1 },
  moderate: { label: 'AOA.Backlash.Moderate', traumaMultiplier: 1.5 },
  severe: { label: 'AOA.Backlash.Severe', traumaMultiplier: 2, essenceRisk: true },
  catastrophic: { label: 'AOA.Backlash.Catastrophic', traumaMultiplier: 3, essenceRisk: true }
};

/**
 * Corruption sign thresholds
 */
export const CORRUPTION_THRESHOLDS = [8, 6, 4, 2, 0];

/* ========================================
   SORCERY CASTING
   ======================================== */

/**
 * Build a sorcery casting pool.
 * Pool = Witchsight + Technique rank + Form rank
 * @param {Actor} actor - The casting actor
 * @param {string} technique - Technique key
 * @param {string} form - Form key
 * @param {number} [modifier=0] - Additional modifier
 * @returns {Object} Pool data object
 */
export function buildSorceryPool(actor, technique, form, modifier = 0) {
  const witchsight = actor.system.witchsight ?? 0;
  const techniqueRank = actor.system.sorcery?.techniques?.[technique] ?? 0;
  const formRank = actor.system.sorcery?.forms?.[form] ?? 0;

  const total = witchsight + techniqueRank + formRank + modifier;

  return {
    witchsight: {
      label: game.i18n.localize('AOA.Attribute.Witchsight.long'),
      value: witchsight
    },
    technique: {
      label: game.i18n.localize(SORCERY_TECHNIQUES[technique]?.label ?? technique),
      key: technique,
      value: techniqueRank
    },
    form: {
      label: game.i18n.localize(SORCERY_FORMS[form]?.label ?? form),
      key: form,
      value: formRank
    },
    modifier,
    total: Math.max(0, total)
  };
}

/**
 * Cast a spell.
 * @param {Actor} actor - The casting actor
 * @param {Item} spell - The spell item
 * @param {Object} [options={}] - Casting options
 * @param {boolean} [options.skipDialog=false] - Skip the casting dialog
 * @param {number} [options.modifier=0] - Additional modifier
 * @returns {Promise<Object|null>} Casting result or null if cancelled
 */
export async function castSpell(actor, spell, options = {}) {
  // Validate prerequisites
  const validation = validateSpellCasting(actor, spell);
  if (!validation.valid) {
    ui.notifications.warn(validation.message);
    return null;
  }

  // Build the casting pool
  const poolData = buildSorceryPool(
    actor,
    spell.system.technique,
    spell.system.form,
    options.modifier ?? 0
  );

  // Get spell casting parameters
  const difficulty = spell.system.casting?.difficulty ?? 'standard';
  const targetThreshold = spell.system.casting?.targetThreshold ?? 2;

  // Show roll dialog or quick roll
  let result;
  if (options.skipDialog) {
    result = await rollThresholdCompression({
      pool: poolData.total,
      difficulty,
      targetThreshold
    });
  } else {
    result = await WoRRollDialog.create({
      actor,
      poolData,
      title: spell.name,
      rollType: 'spell',
      defaultDifficulty: difficulty,
      defaultTT: targetThreshold
    });
  }

  if (!result) return null;

  // Apply costs on any attempt (not just success)
  await applySpellCosts(actor, spell, result);

  // Handle backlash on failure
  if (result.degree?.key === 'failure' || result.degree?.key === 'criticalFailure') {
    await handleBacklash(actor, spell, result);
  }

  // Send result to chat
  await sendSpellChatMessage(actor, spell, result, poolData);

  return result;
}

/**
 * Validate that an actor can cast a spell.
 * @param {Actor} actor - The actor
 * @param {Item} spell - The spell
 * @returns {Object} Validation result {valid, message}
 */
export function validateSpellCasting(actor, spell) {
  // Check Witchsight
  const witchsight = actor.system.witchsight ?? 0;
  if (witchsight <= 0) {
    return {
      valid: false,
      message: game.i18n.localize('AOA.Magic.NoWitchsight')
    };
  }

  // Check Witchsight requirement
  const reqWitchsight = spell.system.requirements?.witchsight ?? 1;
  if (witchsight < reqWitchsight) {
    return {
      valid: false,
      message: game.i18n.format('AOA.Magic.InsufficientWitchsight', {
        required: reqWitchsight,
        current: witchsight
      })
    };
  }

  // Check Technique requirement
  const technique = spell.system.technique;
  const reqTechniqueRank = spell.system.requirements?.techniqueRank ?? 0;
  const techniqueRank = actor.system.sorcery?.techniques?.[technique] ?? 0;
  if (techniqueRank < reqTechniqueRank) {
    return {
      valid: false,
      message: game.i18n.format('AOA.Magic.InsufficientTechnique', {
        technique: game.i18n.localize(SORCERY_TECHNIQUES[technique]?.label),
        required: reqTechniqueRank,
        current: techniqueRank
      })
    };
  }

  // Check Form requirement
  const form = spell.system.form;
  const reqFormRank = spell.system.requirements?.formRank ?? 0;
  const formRank = actor.system.sorcery?.forms?.[form] ?? 0;
  if (formRank < reqFormRank) {
    return {
      valid: false,
      message: game.i18n.format('AOA.Magic.InsufficientForm', {
        form: game.i18n.localize(SORCERY_FORMS[form]?.label),
        required: reqFormRank,
        current: formRank
      })
    };
  }

  // Check Essence (if spell has Essence cost)
  const essenceCost = spell.system.costs?.essence ?? 0;
  if (essenceCost > 0) {
    const currentEssence = actor.system.essence?.current ?? 10;
    if (currentEssence < essenceCost) {
      return {
        valid: false,
        message: game.i18n.format('AOA.Magic.InsufficientEssence', {
          required: essenceCost,
          current: currentEssence
        })
      };
    }
  }

  return { valid: true };
}

/**
 * Apply spell costs to the caster.
 * @param {Actor} actor - The casting actor
 * @param {Item} spell - The spell
 * @param {Object} result - The casting result
 */
export async function applySpellCosts(actor, spell, result) {
  const costs = spell.system.costs ?? {};

  // Apply Trauma cost
  if (costs.trauma > 0) {
    await actor.modifyTrauma(costs.trauma);
  }

  // Apply Essence cost (with corruption check)
  if (costs.essence > 0) {
    await modifyEssenceWithCorruption(actor, -costs.essence);
  }
}

/**
 * Handle backlash from failed spell casting.
 * @param {Actor} actor - The casting actor
 * @param {Item} spell - The spell
 * @param {Object} result - The casting result
 */
export async function handleBacklash(actor, spell, result) {
  const backlash = spell.system.backlash ?? {};
  const severity = BACKLASH_SEVERITY[backlash.severity ?? 'minor'];
  const isCriticalFailure = result.degree?.key === 'criticalFailure';

  // Find applicable backlash effect
  const trigger = isCriticalFailure ? 'criticalFailure' : 'failure';
  const effect = backlash.effects?.find(e => e.trigger === trigger);

  // Calculate backlash Trauma
  let backlashTrauma = Math.ceil((spell.system.costs?.trauma ?? 1) * severity.traumaMultiplier);

  // Additional Trauma from effect
  if (effect?.traumaCost) {
    backlashTrauma += effect.traumaCost;
  }

  // Apply backlash Trauma
  if (backlashTrauma > 0) {
    await actor.modifyTrauma(backlashTrauma);
    ui.notifications.warn(game.i18n.format('AOA.Magic.BacklashTrauma', {
      amount: backlashTrauma
    }));
  }

  // Essence risk on severe/catastrophic
  if (severity.essenceRisk && isCriticalFailure) {
    const essenceLoss = effect?.essenceCost ?? 1;
    await modifyEssenceWithCorruption(actor, -essenceLoss);
    ui.notifications.error(game.i18n.format('AOA.Magic.BacklashEssence', {
      amount: essenceLoss
    }));
  }

  // Store backlash info in result for chat display
  result.backlash = {
    severity: backlash.severity,
    traumaDealt: backlashTrauma,
    description: effect?.description,
    essenceLost: severity.essenceRisk && isCriticalFailure ? (effect?.essenceCost ?? 1) : 0
  };
}

/* ========================================
   RITEFOCUS RITUALS
   ======================================== */

/**
 * Build a Ritefocus casting pool.
 * Pool = Witchsight + Ritefocus skill + participant bonuses
 * @param {Actor} actor - The primary ritualist
 * @param {Item} ritual - The ritual item
 * @param {number} [additionalParticipants=0] - Number of additional participants
 * @param {number} [modifier=0] - Additional modifier
 * @returns {Object} Pool data object
 */
export function buildRitualPool(actor, ritual, additionalParticipants = 0, modifier = 0) {
  const witchsight = actor.system.witchsight ?? 0;
  const ritefocusRank = actor.getSkillValue('ritefocus') ?? 0;
  const participantBonus = additionalParticipants * (ritual.system.participants?.bonusPerParticipant ?? 0);

  const total = witchsight + ritefocusRank + participantBonus + modifier;

  return {
    witchsight: {
      label: game.i18n.localize('AOA.Attribute.Witchsight.long'),
      value: witchsight
    },
    skill: {
      label: game.i18n.localize('AOA.Skill.Ritefocus'),
      name: 'Ritefocus',
      value: ritefocusRank
    },
    participants: {
      label: game.i18n.localize('AOA.Ritual.ParticipantBonus'),
      count: additionalParticipants,
      value: participantBonus
    },
    modifier,
    total: Math.max(0, total)
  };
}

/**
 * Perform a ritual.
 * @param {Actor} actor - The primary ritualist
 * @param {Item} ritual - The ritual item
 * @param {Object} [options={}] - Ritual options
 * @param {number} [options.participants=1] - Total number of participants
 * @param {boolean} [options.skipDialog=false] - Skip the casting dialog
 * @param {number} [options.modifier=0] - Additional modifier
 * @returns {Promise<Object|null>} Ritual result or null if cancelled
 */
export async function performRitual(actor, ritual, options = {}) {
  // Validate prerequisites
  const validation = validateRitualPerformance(actor, ritual, options.participants ?? 1);
  if (!validation.valid) {
    ui.notifications.warn(validation.message);
    return null;
  }

  const additionalParticipants = Math.max(0, (options.participants ?? 1) - 1);

  // Build the ritual pool
  const poolData = buildRitualPool(
    actor,
    ritual,
    additionalParticipants,
    options.modifier ?? 0
  );

  // Get ritual parameters
  const difficulty = ritual.system.casting?.difficulty ?? 'standard';
  const targetThreshold = ritual.system.casting?.targetThreshold ?? 3;
  const isExtended = ritual.system.casting?.extended?.isExtended ?? false;

  // Handle extended rituals differently
  let result;
  if (isExtended) {
    result = await performExtendedRitual(actor, ritual, poolData, options);
  } else {
    // Single roll ritual
    if (options.skipDialog) {
      result = await rollThresholdCompression({
        pool: poolData.total,
        difficulty,
        targetThreshold
      });
    } else {
      result = await WoRRollDialog.create({
        actor,
        poolData,
        title: ritual.name,
        rollType: 'ritual',
        defaultDifficulty: difficulty,
        defaultTT: targetThreshold
      });
    }
  }

  if (!result) return null;

  // Apply costs
  await applyRitualCosts(actor, ritual, result);

  // Handle failure consequences
  if (result.degree?.key === 'failure' || result.degree?.key === 'criticalFailure') {
    await handleRitualFailure(actor, ritual, result);
  }

  // Send result to chat
  await sendRitualChatMessage(actor, ritual, result, poolData);

  return result;
}

/**
 * Perform an extended ritual (multiple rolls).
 * @param {Actor} actor - The primary ritualist
 * @param {Item} ritual - The ritual item
 * @param {Object} poolData - The pool data
 * @param {Object} options - Options
 * @returns {Promise<Object>} Extended ritual result
 */
async function performExtendedRitual(actor, ritual, poolData, options) {
  const extended = ritual.system.casting.extended;
  const hitsRequired = extended.hitsRequired ?? 10;
  const rollsAllowed = extended.rollsAllowed ?? 5;
  const difficulty = ritual.system.casting?.difficulty ?? 'standard';

  let totalHits = 0;
  let rollsMade = 0;
  const rolls = [];

  // TODO: Implement extended ritual UI with progress tracking
  // For now, use a simple loop with confirmations

  while (rollsMade < rollsAllowed && totalHits < hitsRequired) {
    const continueRitual = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize('AOA.Ritual.ExtendedRoll') },
      content: `
        <p>${game.i18n.format('AOA.Ritual.ExtendedProgress', {
          hits: totalHits,
          required: hitsRequired,
          rolls: rollsMade,
          allowed: rollsAllowed
        })}</p>
        <p>${game.i18n.localize('AOA.Ritual.ContinuePrompt')}</p>
      `,
      yes: { label: game.i18n.localize('AOA.Ritual.Continue') },
      no: { label: game.i18n.localize('AOA.Ritual.Abandon') }
    });

    if (!continueRitual) {
      // Ritual abandoned
      return {
        pool: poolData.total,
        difficulty: DIFFICULTY_TIERS[difficulty],
        hits: totalHits,
        targetThreshold: hitsRequired,
        degree: {
          key: 'abandoned',
          label: 'AOA.Ritual.Abandoned',
          cssClass: 'failure'
        },
        isExtended: true,
        rolls,
        abandoned: true
      };
    }

    // Make the roll
    const rollResult = await rollThresholdCompression({
      pool: poolData.total,
      difficulty,
      targetThreshold: 1 // Each roll just accumulates hits
    });

    totalHits += rollResult.hits;
    rollsMade++;
    rolls.push(rollResult);
  }

  // Determine final result
  const success = totalHits >= hitsRequired;
  const margin = totalHits - hitsRequired;

  return {
    pool: poolData.total,
    difficulty: DIFFICULTY_TIERS[difficulty],
    hits: totalHits,
    targetThreshold: hitsRequired,
    degree: {
      key: success ? (margin >= 3 ? 'criticalSuccess' : 'success') : 'failure',
      label: success ? (margin >= 3 ? 'AOA.Roll.CriticalSuccess' : 'AOA.Roll.Success') : 'AOA.Roll.Failure',
      cssClass: success ? (margin >= 3 ? 'critical-success' : 'success') : 'failure',
      margin
    },
    isExtended: true,
    rolls,
    rollsMade,
    rollsAllowed
  };
}

/**
 * Validate ritual performance prerequisites.
 * @param {Actor} actor - The ritualist
 * @param {Item} ritual - The ritual
 * @param {number} participantCount - Number of participants
 * @returns {Object} Validation result
 */
export function validateRitualPerformance(actor, ritual, participantCount = 1) {
  // Check Witchsight
  const witchsight = actor.system.witchsight ?? 0;
  if (witchsight <= 0) {
    return {
      valid: false,
      message: game.i18n.localize('AOA.Magic.NoWitchsight')
    };
  }

  // Check Witchsight requirement
  const reqWitchsight = ritual.system.requirements?.witchsight ?? 1;
  if (witchsight < reqWitchsight) {
    return {
      valid: false,
      message: game.i18n.format('AOA.Magic.InsufficientWitchsight', {
        required: reqWitchsight,
        current: witchsight
      })
    };
  }

  // Check Ritefocus skill requirement
  const reqRitefocus = ritual.system.requirements?.ritefocusRank ?? 0;
  const ritefocusRank = actor.getSkillValue('ritefocus') ?? 0;
  if (ritefocusRank < reqRitefocus) {
    return {
      valid: false,
      message: game.i18n.format('AOA.Magic.InsufficientRitefocus', {
        required: reqRitefocus,
        current: ritefocusRank
      })
    };
  }

  // Check minimum participants
  const minParticipants = ritual.system.participants?.minimum ?? 1;
  if (participantCount < minParticipants) {
    return {
      valid: false,
      message: game.i18n.format('AOA.Ritual.InsufficientParticipants', {
        required: minParticipants,
        current: participantCount
      })
    };
  }

  return { valid: true };
}

/**
 * Apply ritual costs.
 * @param {Actor} actor - The ritualist
 * @param {Item} ritual - The ritual
 * @param {Object} result - The ritual result
 */
export async function applyRitualCosts(actor, ritual, result) {
  // Don't apply costs if ritual was abandoned
  if (result.abandoned) return;

  const costs = ritual.system.costs ?? {};

  // Apply Trauma cost
  if (costs.trauma > 0) {
    await actor.modifyTrauma(costs.trauma);
  }

  // Apply Essence cost
  if (costs.essence > 0) {
    await modifyEssenceWithCorruption(actor, -costs.essence);
  }

  // Apply Blood cost (additional self-inflicted Trauma)
  if (costs.blood > 0) {
    await actor.modifyTrauma(costs.blood);
    ui.notifications.warn(game.i18n.format('AOA.Magic.BloodCost', { amount: costs.blood }));
  }
}

/**
 * Handle ritual failure consequences.
 * @param {Actor} actor - The ritualist
 * @param {Item} ritual - The ritual
 * @param {Object} result - The ritual result
 */
export async function handleRitualFailure(actor, ritual, result) {
  const failure = ritual.system.failure ?? {};
  const isCriticalFailure = result.degree?.key === 'criticalFailure';
  const wasAbandoned = result.abandoned;

  // Find applicable failure effect
  let trigger = 'failure';
  if (wasAbandoned) trigger = 'interrupted';
  else if (isCriticalFailure) trigger = 'criticalFailure';

  const effect = failure.effects?.find(e => e.trigger === trigger);

  if (effect) {
    // Apply additional costs from failure
    if (effect.traumaCost) {
      await actor.modifyTrauma(effect.traumaCost);
    }
    if (effect.essenceCost) {
      await modifyEssenceWithCorruption(actor, -effect.essenceCost);
    }

    result.failureEffect = {
      description: effect.description,
      traumaCost: effect.traumaCost,
      essenceCost: effect.essenceCost
    };
  }
}

/* ========================================
   ESSENCE & CORRUPTION
   ======================================== */

/**
 * Modify Essence and handle corruption sign prompts.
 * @param {Actor} actor - The actor
 * @param {number} amount - Amount to modify (negative = loss)
 * @returns {Promise<void>}
 */
export async function modifyEssenceWithCorruption(actor, amount) {
  if (actor.type !== 'character') return;

  const currentEssence = actor.system.essence?.current ?? 10;
  const newEssence = Math.max(0, Math.min(10, currentEssence + amount));

  // Update Essence
  await actor.update({ 'system.essence.current': newEssence });

  // Check if we crossed a corruption threshold (only on Essence loss)
  if (amount < 0) {
    const crossedThreshold = checkCorruptionThreshold(currentEssence, newEssence);
    if (crossedThreshold !== null) {
      await promptCorruptionSign(actor, crossedThreshold);
    }
  }

  // Warn on critical Essence
  if (newEssence <= 2 && newEssence > 0 && newEssence !== currentEssence) {
    ui.notifications.warn(game.i18n.format('AOA.Warnings.EssenceCritical', {
      name: actor.name,
      essence: newEssence
    }));
  }

  // Warn on Leng transformation
  if (newEssence === 0 && currentEssence > 0) {
    await showLengWarning(actor);
  }
}

/**
 * Check if Essence loss crossed a corruption threshold.
 * @param {number} oldEssence - Previous Essence value
 * @param {number} newEssence - New Essence value
 * @returns {number|null} Threshold crossed, or null
 */
function checkCorruptionThreshold(oldEssence, newEssence) {
  for (const threshold of CORRUPTION_THRESHOLDS) {
    if (oldEssence > threshold && newEssence <= threshold) {
      return threshold;
    }
  }
  return null;
}

/**
 * Prompt the user to add a corruption sign.
 * @param {Actor} actor - The actor
 * @param {number} threshold - The Essence threshold crossed
 */
export async function promptCorruptionSign(actor, threshold) {
  const result = await foundry.applications.api.DialogV2.prompt({
    window: {
      title: game.i18n.localize('AOA.Essence.CorruptionSignPrompt')
    },
    content: `
      <div class="corruption-sign-prompt">
        <p>${game.i18n.format('AOA.Essence.CorruptionSignMessage', {
          name: actor.name,
          threshold
        })}</p>
        <div class="form-group">
          <label>${game.i18n.localize('AOA.Essence.CorruptionSignDescription')}</label>
          <input type="text" name="description" placeholder="${game.i18n.localize('AOA.Essence.CorruptionSignPlaceholder')}" />
        </div>
      </div>
    `,
    ok: {
      label: game.i18n.localize('AOA.Common.Add'),
      callback: (event, button, dialog) => {
        const input = dialog.element.querySelector('input[name="description"]');
        return input?.value ?? '';
      }
    }
  });

  if (result) {
    await addCorruptionSign(actor, result, threshold);
  }
}

/**
 * Add a corruption sign to an actor.
 * @param {Actor} actor - The actor
 * @param {string} description - Description of the corruption sign
 * @param {number} [threshold] - The Essence threshold (optional)
 */
export async function addCorruptionSign(actor, description, threshold = null) {
  const signs = [...(actor.system.essence?.corruptionSigns ?? [])];
  signs.push({
    id: foundry.utils.randomID(),
    description,
    essenceThreshold: threshold,
    timestamp: Date.now()
  });

  await actor.update({ 'system.essence.corruptionSigns': signs });

  // Send chat message
  const content = game.i18n.format('AOA.Essence.CorruptionSignAdded', {
    name: actor.name,
    sign: description
  });

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: `<div class="wor corruption-message"><i class="fas fa-ghost"></i> ${content}</div>`,
    style: CONST.CHAT_MESSAGE_STYLES.OTHER
  });
}

/**
 * Show the Leng transformation warning.
 * @param {Actor} actor - The actor
 */
async function showLengWarning(actor) {
  ui.notifications.error(game.i18n.format('AOA.Warnings.LengTransformation', {
    name: actor.name
  }));

  // Show dramatic dialog
  await foundry.applications.api.DialogV2.prompt({
    window: {
      title: game.i18n.localize('AOA.Essence.LengTransformation')
    },
    content: `
      <div class="leng-warning">
        <i class="fas fa-skull fa-3x"></i>
        <h2>${game.i18n.localize('AOA.Essence.LengTransformation')}</h2>
        <p>${game.i18n.format('AOA.Essence.LengWarningMessage', { name: actor.name })}</p>
        <p class="leng-consequence">${game.i18n.localize('AOA.Essence.LengConsequence')}</p>
      </div>
    `,
    ok: {
      label: game.i18n.localize('AOA.Common.Acknowledge')
    }
  });

  // Send chat message
  const content = game.i18n.format('AOA.Essence.LengChatMessage', { name: actor.name });
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: `<div class="wor leng-message"><i class="fas fa-skull"></i> <strong>${content}</strong></div>`,
    style: CONST.CHAT_MESSAGE_STYLES.OTHER
  });
}

/* ========================================
   CHAT MESSAGES
   ======================================== */

/**
 * Send a spell casting result to chat.
 * @param {Actor} actor - The caster
 * @param {Item} spell - The spell
 * @param {Object} result - The casting result
 * @param {Object} poolData - The pool breakdown
 */
export async function sendSpellChatMessage(actor, spell, result, poolData) {
  const templateData = {
    actor,
    spell,
    result,
    poolData,
    isSuccess: result.degree?.key === 'success' || result.degree?.key === 'criticalSuccess',
    isCritical: result.degree?.key === 'criticalSuccess' || result.degree?.key === 'criticalFailure',
    degreeLabel: game.i18n.localize(result.degree?.label ?? 'AOA.Roll.Unknown'),
    costs: {
      trauma: spell.system.costs?.trauma ?? 0,
      essence: spell.system.costs?.essence ?? 0
    },
    hasBacklash: !!result.backlash
  };

  const content = await renderTemplate(
    'systems/weight-of-ruin/templates/chat/spell-cast.hbs',
    templateData
  );

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    rolls: result.roll ? [result.roll] : [],
    style: CONST.CHAT_MESSAGE_STYLES.ROLL
  });
}

/**
 * Send a ritual performance result to chat.
 * @param {Actor} actor - The ritualist
 * @param {Item} ritual - The ritual
 * @param {Object} result - The ritual result
 * @param {Object} poolData - The pool breakdown
 */
export async function sendRitualChatMessage(actor, ritual, result, poolData) {
  const templateData = {
    actor,
    ritual,
    result,
    poolData,
    isSuccess: result.degree?.key === 'success' || result.degree?.key === 'criticalSuccess',
    isCritical: result.degree?.key === 'criticalSuccess' || result.degree?.key === 'criticalFailure',
    wasAbandoned: result.abandoned,
    degreeLabel: game.i18n.localize(result.degree?.label ?? 'AOA.Roll.Unknown'),
    costs: {
      trauma: ritual.system.costs?.trauma ?? 0,
      essence: ritual.system.costs?.essence ?? 0,
      blood: ritual.system.costs?.blood ?? 0
    },
    hasFailureEffect: !!result.failureEffect,
    isExtended: result.isExtended
  };

  const content = await renderTemplate(
    'systems/weight-of-ruin/templates/chat/ritual-perform.hbs',
    templateData
  );

  // Collect all rolls from extended rituals
  const rolls = result.isExtended
    ? result.rolls.filter(r => r.roll).map(r => r.roll)
    : (result.roll ? [result.roll] : []);

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    rolls,
    style: CONST.CHAT_MESSAGE_STYLES.ROLL
  });
}
