/**
 * The Weight of Ruin - Conditions Helper Module
 * Manages status conditions, duration tracking, and their effects on actors.
 */

import { AOA } from './config.mjs';

/**
 * Check if an actor has a specific condition.
 * @param {Actor} actor - The actor to check
 * @param {string} conditionId - The condition ID
 * @returns {boolean}
 */
export function hasCondition(actor, conditionId) {
  return actor.statuses?.has(conditionId) ?? false;
}

/**
 * Apply a condition to an actor with optional duration.
 * @param {Actor} actor - The actor
 * @param {string} conditionId - The condition ID
 * @param {Object} [options={}] - Options
 * @param {number} [options.duration] - Duration in rounds (null = indefinite)
 * @param {string} [options.sourceId] - ID of the source (for frightened, charmed, etc.)
 * @param {string} [options.sourceName] - Name of the source
 * @returns {Promise<ActiveEffect|null>} The created effect or null
 */
export async function applyCondition(actor, conditionId, options = {}) {
  const condition = AOA.conditions[conditionId];
  if (!condition) {
    console.warn(`AOA | Unknown condition: ${conditionId}`);
    return null;
  }

  // Check if already has condition
  if (hasCondition(actor, conditionId)) {
    // If condition exists and new duration is provided, update it
    if (options.duration !== undefined) {
      await updateConditionDuration(actor, conditionId, options.duration);
    }
    return null;
  }

  // Create the status effect
  const effectData = {
    name: game.i18n.localize(condition.label),
    img: condition.icon,
    statuses: [conditionId],
    flags: {
      'weight-of-ruin': {
        conditionId: conditionId,
        duration: options.duration ?? null, // null = indefinite
        sourceId: options.sourceId ?? null,
        sourceName: options.sourceName ?? null,
        modifiers: condition.modifiers ?? {},
        conditionFlags: condition.flags ?? {}
      }
    }
  };

  // Add duration display if applicable
  if (options.duration) {
    effectData.duration = {
      rounds: options.duration
    };
  }

  // Add any mechanical effects (Active Effect changes)
  if (condition.effects?.length > 0) {
    effectData.changes = condition.effects;
  }

  const [effect] = await actor.createEmbeddedDocuments('ActiveEffect', [effectData]);

  // Handle compound conditions (e.g., Unconscious also applies Defenseless and Prone)
  if (condition.flags?.isDefenseless && !hasCondition(actor, 'defenseless')) {
    await applyCondition(actor, 'defenseless', { sourceId: conditionId });
  }
  if (condition.flags?.autoProne && !hasCondition(actor, 'prone')) {
    await applyCondition(actor, 'prone', { sourceId: conditionId });
  }

  // Notify in chat
  await sendConditionMessage(actor, conditionId, true, options.duration);

  return effect;
}

/**
 * Remove a condition from an actor.
 * @param {Actor} actor - The actor
 * @param {string} conditionId - The condition ID
 * @param {boolean} [silent=false] - If true, don't send chat message
 * @returns {Promise<void>}
 */
export async function removeCondition(actor, conditionId, silent = false) {
  // Find the effect with this condition
  const effect = actor.effects.find(e => e.statuses?.has(conditionId));
  if (effect) {
    await effect.delete();

    // Also remove conditions that were applied due to this condition
    // e.g., removing Unconscious should remove Defenseless and Prone that were auto-applied
    const condition = AOA.conditions[conditionId];
    if (condition?.flags?.isDefenseless) {
      const defenselessEffect = actor.effects.find(e =>
        e.statuses?.has('defenseless') &&
        e.flags?.['weight-of-ruin']?.sourceId === conditionId
      );
      if (defenselessEffect) await defenselessEffect.delete();
    }
    if (condition?.flags?.autoProne) {
      const proneEffect = actor.effects.find(e =>
        e.statuses?.has('prone') &&
        e.flags?.['weight-of-ruin']?.sourceId === conditionId
      );
      if (proneEffect) await proneEffect.delete();
    }

    if (!silent) {
      await sendConditionMessage(actor, conditionId, false);
    }
  }
}

/**
 * Toggle a condition on an actor.
 * @param {Actor} actor - The actor
 * @param {string} conditionId - The condition ID
 * @param {Object} [options={}] - Options for applying (duration, source)
 * @returns {Promise<boolean>} New state (true = has condition)
 */
export async function toggleCondition(actor, conditionId, options = {}) {
  if (hasCondition(actor, conditionId)) {
    await removeCondition(actor, conditionId);
    return false;
  } else {
    await applyCondition(actor, conditionId, options);
    return true;
  }
}

/**
 * Update the duration of an existing condition.
 * @param {Actor} actor - The actor
 * @param {string} conditionId - The condition ID
 * @param {number} newDuration - New duration in rounds
 * @returns {Promise<void>}
 */
export async function updateConditionDuration(actor, conditionId, newDuration) {
  const effect = actor.effects.find(e => e.statuses?.has(conditionId));
  if (effect) {
    await effect.update({
      'flags.weight-of-ruin.duration': newDuration,
      'duration.rounds': newDuration
    });
  }
}

/**
 * Get the remaining duration of a condition.
 * @param {Actor} actor - The actor
 * @param {string} conditionId - The condition ID
 * @returns {number|null} Remaining rounds or null if indefinite/not present
 */
export function getConditionDuration(actor, conditionId) {
  const effect = actor.effects.find(e => e.statuses?.has(conditionId));
  return effect?.flags?.['weight-of-ruin']?.duration ?? null;
}

/**
 * Get all active conditions on an actor with full data.
 * @param {Actor} actor - The actor
 * @returns {Array} Array of condition data with active effect info
 */
export function getActiveConditions(actor) {
  const active = [];
  for (const effect of actor.effects) {
    const conditionId = effect.flags?.['weight-of-ruin']?.conditionId;
    if (conditionId && AOA.conditions[conditionId]) {
      const condition = AOA.conditions[conditionId];
      active.push({
        id: conditionId,
        effectId: effect.id,
        label: game.i18n.localize(condition.label),
        description: game.i18n.localize(condition.description),
        icon: condition.icon,
        duration: effect.flags?.['weight-of-ruin']?.duration,
        sourceId: effect.flags?.['weight-of-ruin']?.sourceId,
        sourceName: effect.flags?.['weight-of-ruin']?.sourceName,
        modifiers: condition.modifiers ?? {},
        flags: condition.flags ?? {}
      });
    }
  }
  return active;
}

/**
 * Calculate total condition modifiers for a roll.
 * @param {Actor} actor - The actor making the roll
 * @param {string} rollType - Type of roll ('attack', 'defense', 'skill', 'physical', 'social', etc.)
 * @param {Object} [context={}] - Additional context (isRanged, isMelee, etc.)
 * @returns {Object} Object with modifier total and breakdown
 */
export function getConditionModifiers(actor, rollType, context = {}) {
  const activeConditions = getActiveConditions(actor);
  let total = 0;
  const breakdown = [];

  for (const condition of activeConditions) {
    const mods = condition.modifiers;
    let modifier = 0;
    let reason = '';

    switch (rollType) {
      case 'attack':
        if (mods.attack) {
          modifier = mods.attack;
          reason = 'attack penalty';
        }
        if (mods.attackFromHiding && condition.id === 'hidden') {
          modifier = mods.attackFromHiding;
          reason = 'attack from hiding';
        }
        if (mods.allRolls) {
          modifier += mods.allRolls;
          reason = reason ? `${reason}, all rolls` : 'all rolls penalty';
        }
        break;

      case 'defense':
        if (mods.defense) {
          modifier = mods.defense;
          reason = 'defense penalty';
        }
        // Special handling for Prone (different vs melee/ranged)
        if (condition.id === 'prone') {
          if (context.isMelee && mods.defenseMelee) {
            modifier = mods.defenseMelee;
            reason = 'prone vs melee';
          } else if (context.isRanged && mods.defenseRanged) {
            modifier = mods.defenseRanged;
            reason = 'prone vs ranged';
          }
        }
        break;

      case 'physical':
        if (mods.physical) {
          modifier = mods.physical;
          reason = 'physical penalty';
        }
        if (mods.allRolls) {
          modifier += mods.allRolls;
          reason = reason ? `${reason}, all rolls` : 'all rolls penalty';
        }
        break;

      case 'skill':
      case 'social':
      case 'knowledge':
        if (mods.allRolls) {
          modifier = mods.allRolls;
          reason = 'all rolls penalty';
        }
        break;
    }

    if (modifier !== 0) {
      total += modifier;
      breakdown.push({
        condition: condition.label,
        conditionId: condition.id,
        modifier,
        reason
      });
    }
  }

  return { total, breakdown };
}

/**
 * Get defense modifiers from target's conditions.
 * Used when attacking a target to determine their effective defense.
 * @param {Actor} target - The target actor
 * @param {Object} [context={}] - Attack context (isMelee, isRanged)
 * @returns {Object} Object with modifier total, breakdown, and special flags
 */
export function getTargetConditionModifiers(target, context = {}) {
  const activeConditions = getActiveConditions(target);
  let defenseModifier = 0;
  let attackerBonus = 0;
  const breakdown = [];
  const flags = {
    isDefenseless: false,
    attacksAreTrivial: false
  };

  for (const condition of activeConditions) {
    const mods = condition.modifiers;
    const condFlags = condition.flags;

    // Check for Defenseless (attacks become Trivial)
    if (condFlags.attacksAreTrivial || condFlags.isDefenseless) {
      flags.isDefenseless = true;
      flags.attacksAreTrivial = true;
      breakdown.push({
        condition: condition.label,
        effect: 'Attacks are Trivial difficulty'
      });
    }

    // Defense modifiers on the target
    if (mods.defense) {
      defenseModifier += mods.defense;
      breakdown.push({
        condition: condition.label,
        modifier: mods.defense,
        type: 'defense'
      });
    }

    // Prone special case
    if (condition.id === 'prone') {
      if (context.isMelee && mods.defenseMelee) {
        defenseModifier += mods.defenseMelee;
        breakdown.push({
          condition: condition.label,
          modifier: mods.defenseMelee,
          type: 'defense vs melee'
        });
      } else if (context.isRanged && mods.defenseRanged) {
        defenseModifier += mods.defenseRanged;
        breakdown.push({
          condition: condition.label,
          modifier: mods.defenseRanged,
          type: 'defense vs ranged'
        });
      }
    }

    // Attacker bonus (e.g., Flanked gives attackers +2)
    if (condFlags.attackersGainBonus) {
      attackerBonus += condFlags.attackersGainBonus;
      breakdown.push({
        condition: condition.label,
        modifier: condFlags.attackersGainBonus,
        type: 'attacker bonus'
      });
    }
  }

  return {
    defenseModifier,
    attackerBonus,
    breakdown,
    flags
  };
}

/**
 * Process end-of-turn effects for an actor.
 * Called when an actor's turn ends in combat.
 * Includes checking for Resilience Roll if at Breaking Point.
 * @param {Actor} actor - The actor whose turn is ending
 * @returns {Promise<Object>} Summary of effects processed
 */
export async function processEndOfTurn(actor) {
  const summary = {
    traumaTaken: 0,
    conditionsExpired: [],
    messages: [],
    resilienceRollNeeded: false,
    resilienceRollResult: null
  };

  const activeConditions = getActiveConditions(actor);

  for (const condition of activeConditions) {
    // Process end-of-turn damage (Bleeding, Poisoned, etc.)
    if (condition.flags.endOfTurnDamage) {
      const damage = condition.flags.endOfTurnDamage;
      summary.traumaTaken += damage;
      summary.messages.push(game.i18n.format('AOA.Condition.EndOfTurnDamage', {
        name: actor.name,
        condition: condition.label,
        damage
      }));
    }
  }

  // Apply accumulated trauma
  if (summary.traumaTaken > 0) {
    await actor.modifyTrauma(summary.traumaTaken);
  }

  // Check for Resilience Roll at end of turn if at Breaking Point
  const atBreakingPoint = actor.system.atBreakingPoint ?? false;
  const isStabilized = actor.system.health?.stabilized ?? false;

  if (atBreakingPoint && !isStabilized) {
    summary.resilienceRollNeeded = true;
    // The actual roll is triggered by the actor - prompt the user
    summary.messages.push(game.i18n.format('AOA.Health.ResilienceRollRequired', {
      name: actor.name
    }));
  }

  return summary;
}

/**
 * Process start-of-turn effects for an actor.
 * Called when an actor's turn starts in combat.
 * @param {Actor} actor - The actor whose turn is starting
 * @returns {Promise<Object>} Summary of effects processed
 */
export async function processStartOfTurn(actor) {
  const summary = {
    actionsLost: 0,
    conditionsExpired: [],
    messages: []
  };

  const activeConditions = getActiveConditions(actor);

  for (const condition of activeConditions) {
    // Process action loss (Stunned)
    if (condition.flags.loseActions) {
      summary.actionsLost += condition.flags.loseActions;
      summary.messages.push(game.i18n.format('AOA.Condition.LostActions', {
        name: actor.name,
        condition: condition.label,
        actions: condition.flags.loseActions
      }));
    }
  }

  return summary;
}

/**
 * Decrement condition durations at end of round.
 * Call this when the combat round advances.
 * @param {Combat} combat - The active combat
 * @returns {Promise<Object>} Summary of expired conditions
 */
export async function decrementConditionDurations(combat) {
  const summary = {
    expired: []
  };

  // Process all combatants
  for (const combatant of combat.combatants) {
    const actor = combatant.actor;
    if (!actor) continue;

    for (const effect of actor.effects) {
      const conditionId = effect.flags?.['weight-of-ruin']?.conditionId;
      const duration = effect.flags?.['weight-of-ruin']?.duration;

      // Only process conditions with durations
      if (conditionId && duration !== null && duration > 0) {
        const newDuration = duration - 1;

        if (newDuration <= 0) {
          // Condition expired
          await removeCondition(actor, conditionId);
          summary.expired.push({
            actorId: actor.id,
            actorName: actor.name,
            conditionId,
            conditionLabel: game.i18n.localize(AOA.conditions[conditionId]?.label)
          });
        } else {
          // Decrement duration
          await effect.update({
            'flags.weight-of-ruin.duration': newDuration,
            'duration.rounds': newDuration
          });
        }
      }
    }
  }

  return summary;
}

/**
 * Check and update health-related conditions based on actor state.
 * Call this when Trauma or Resilience changes.
 * @param {Actor} actor - The actor to check
 * @returns {Promise<Object>} State changes that occurred
 */
export async function updateHealthConditions(actor) {
  const changes = {
    becameUnconscious: false,
    recovered: false,
    died: false
  };

  const trauma = actor.system.health?.trauma ?? 0;
  const maxTrauma = actor.system.maxTrauma ?? 3;
  const resilience = actor.system.health?.resilience?.value ?? 0;

  const atBreakingPoint = trauma > maxTrauma;
  const isUnconscious = atBreakingPoint && resilience <= 1;
  const isDead = resilience <= 0;

  // Handle Unconscious state (at Breaking Point AND Resilience <= 1)
  const wasUnconscious = hasCondition(actor, 'unconscious');
  if (isUnconscious && !isDead && !wasUnconscious) {
    await applyCondition(actor, 'unconscious');
    changes.becameUnconscious = true;
  } else if (!isUnconscious && wasUnconscious) {
    await removeCondition(actor, 'unconscious');
    changes.recovered = true;
  }

  // Handle Dead state (Resilience reaches 0)
  const wasDead = hasCondition(actor, 'dead');
  if (isDead && !wasDead) {
    // Remove unconscious if transitioning to dead
    if (hasCondition(actor, 'unconscious')) {
      await removeCondition(actor, 'unconscious', true);
    }
    await applyCondition(actor, 'dead');
    changes.died = true;
  }
  // Note: Dead condition can only be removed manually by GM, not automatically

  return changes;
}

/**
 * Send a condition change notification to chat.
 * @param {Actor} actor - The affected actor
 * @param {string} conditionId - The condition ID
 * @param {boolean} gained - True if gained, false if removed
 * @param {number} [duration] - Duration in rounds (if applicable)
 * @returns {Promise<ChatMessage>}
 */
async function sendConditionMessage(actor, conditionId, gained, duration = null) {
  const condition = AOA.conditions[conditionId];
  if (!condition) return;

  // Don't send messages for certain auto-applied conditions

  const messageKey = gained ? 'AOA.Condition.Gained' : 'AOA.Condition.Removed';
  let content = `<div class="wor condition-message ${gained ? 'gained' : 'removed'}">`;
  content += `<img src="${condition.icon}" class="condition-icon" width="24" height="24"/>`;
  content += `<span class="condition-text">${game.i18n.format(messageKey, {
    name: actor.name,
    condition: game.i18n.localize(condition.label)
  })}</span>`;
  if (gained && duration) {
    content += `<span class="condition-duration">(${game.i18n.format('AOA.Condition.DurationRounds', { rounds: duration })})</span>`;
  }
  content += `</div>`;

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    style: CONST.CHAT_MESSAGE_STYLES.OTHER
  });
}

/**
 * Prompt the user with a Resilience Roll dialog.
 * Called at end of turn when actor is at Breaking Point.
 * @param {Actor} actor - The actor at breaking point
 * @returns {Promise<boolean>} Whether the user chose to roll
 */
export async function promptResilienceRoll(actor) {
  const resilience = actor.system.health?.resilience?.value ?? 0;
  const maxResilience = actor.system.maxResilience ?? actor.system.baseResilience ?? 3;
  const trauma = actor.system.health?.trauma ?? 0;
  const maxTrauma = actor.system.maxTrauma ?? 3;

  const content = `
    <p>${game.i18n.format('AOA.Health.ResilienceRollPrompt', { name: actor.name })}</p>
    <p><strong>${game.i18n.localize('AOA.Health.Resilience')}:</strong> ${resilience}/${maxResilience}</p>
    <p><strong>${game.i18n.localize('AOA.Health.Trauma')}:</strong> ${trauma}/${maxTrauma}</p>
    <p>${game.i18n.localize('AOA.Health.ResilienceRollInfo')}</p>
  `;

  return foundry.applications.api.DialogV2.confirm({
    window: {
      title: game.i18n.localize('AOA.Health.ResilienceRollTitle'),
      icon: 'fas fa-heartbeat'
    },
    content,
    yes: {
      label: game.i18n.localize('AOA.Health.RollResilience'),
      icon: 'fas fa-dice'
    },
    no: {
      label: game.i18n.localize('AOA.Common.Cancel'),
      icon: 'fas fa-times'
    },
    rejectClose: false,
    defaultYes: true
  });
}

/**
 * Register combat hooks for condition duration tracking.
 * Called during system initialization.
 */
export function registerCombatHooks() {
  // Decrement durations at end of round
  Hooks.on('combatRound', async (combat, updateData, updateOptions) => {
    if (game.user.isGM) {
      const summary = await decrementConditionDurations(combat);

      // Notify about expired conditions
      for (const expired of summary.expired) {
        ui.notifications.info(game.i18n.format('AOA.Condition.Expired', {
          actor: expired.actorName,
          condition: expired.conditionLabel
        }));
      }
    }
  });

  // Process start of turn
  Hooks.on('combatTurnChange', async (combat, prior, current) => {
    if (!game.user.isGM) return;

    const combatant = combat.combatants.get(current.combatantId);
    if (!combatant?.actor) return;

    const startSummary = await processStartOfTurn(combatant.actor);

    // Notify about lost actions
    if (startSummary.actionsLost > 0) {
      ui.notifications.warn(game.i18n.format('AOA.Condition.TurnStartLostActions', {
        actor: combatant.actor.name,
        actions: startSummary.actionsLost
      }));
    }
  });

  // Process end of turn (before turn change)
  Hooks.on('preUpdateCombat', async (combat, updateData, options, userId) => {
    if (!game.user.isGM) return;
    if (!('turn' in updateData)) return;

    // Get the actor whose turn is ending
    const currentCombatant = combat.combatants.get(combat.current.combatantId);
    if (!currentCombatant?.actor) return;

    const endSummary = await processEndOfTurn(currentCombatant.actor);

    // Notify about end-of-turn damage and resilience roll requirements
    if (endSummary.messages.length > 0) {
      ChatMessage.create({
        content: endSummary.messages.join('<br>'),
        speaker: ChatMessage.getSpeaker({ actor: currentCombatant.actor })
      });
    }

    // Prompt for Resilience Roll if needed
    if (endSummary.resilienceRollNeeded) {
      const shouldRoll = await promptResilienceRoll(currentCombatant.actor);
      if (shouldRoll) {
        await currentCombatant.actor.rollResilience();
      }
    }
  });
}

/**
 * Register status effects with Foundry for token HUD.
 * Called during system ready hook when game.i18n is available.
 */
export function registerStatusEffects() {
  // Build status effects array for Foundry v13+
  const statusEffects = Object.entries(AOA.conditions).map(([id, condition]) => ({
    id: id,
    name: game.i18n.localize(condition.label),
    img: condition.icon
  }));

  // Set as the system's status effects
  CONFIG.statusEffects = statusEffects;
}

/**
 * Register conditions system functionality.
 * Called during system ready hook when game.i18n is available.
 */
export function registerConditions() {
  // Register combat hooks for duration tracking
  registerCombatHooks();

  // Register on game object for easy access
  game.wor = game.wor || {};
  game.wor.conditions = {
    hasCondition,
    applyCondition,
    removeCondition,
    toggleCondition,
    getActiveConditions,
    getConditionModifiers,
    getTargetConditionModifiers,
    updateConditionDuration,
    getConditionDuration,
    processEndOfTurn,
    processStartOfTurn,
    decrementConditionDurations,
    updateHealthConditions,
    promptResilienceRoll
  };
}
