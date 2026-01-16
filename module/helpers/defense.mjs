/**
 * The Weight of Ruin - Defense Roll Helper Module
 * Implements the opposed defense roll system
 *
 * Defense Pool = Reflex (AGI + AWA)
 * Buy Options:
 * - Parry: +Arms skill rank
 * - Block: +Shield defense bonus (requires equipped shield)
 * - Dodge: +Dodge skill rank
 * - Feint: +Deception skill rank
 *
 * Diminishing Returns (shared across ALL options):
 * - 1st buy: Full bonus
 * - 2nd buy: -2 penalty to ALL options
 * - 3rd buy: -4 penalty to ALL options
 * - etc. (-2 per additional buy)
 * - Penalty resets at start of your turn
 *
 * Full Defense: Spend all actions at turn start for +5 to all defense rolls until next turn
 *
 * Resolution: Attacker must get MORE hits than defender (ties = defender wins)
 * Defense rolls use Standard difficulty (5+)
 */

/**
 * Penalty applied to buy option bonus for each subsequent use in the same turn
 */
export const BUY_OPTION_PENALTY_PER_USE = 2;

/**
 * Bonus granted by Full Defense stance
 */
export const FULL_DEFENSE_BONUS = 5;

import {
  DIFFICULTY_TIERS,
  FERVOR_OPTIONS,
  rollThresholdCompression,
  canSpendFervor,
  spendFervor,
  shiftDifficulty,
  generateDiceDisplay
} from './dice.mjs';

/* -------------------------------------------- */
/*  Buy Option Definitions                       */
/* -------------------------------------------- */

/**
 * Defense buy option definitions
 */
export const DEFENSE_BUY_OPTIONS = {
  none: {
    key: 'none',
    label: 'WOR.Defense.BuyOption.None',
    skillKey: null,
    requiresShield: false
  },
  parry: {
    key: 'parry',
    label: 'WOR.Defense.BuyOption.Parry',
    skillKey: 'arms',
    requiresShield: false
  },
  block: {
    key: 'block',
    label: 'WOR.Defense.BuyOption.Block',
    skillKey: null, // Uses shield defense bonus
    requiresShield: true
  },
  dodge: {
    key: 'dodge',
    label: 'WOR.Defense.BuyOption.Dodge',
    skillKey: 'dodge',
    requiresShield: false
  },
  feint: {
    key: 'feint',
    label: 'WOR.Defense.BuyOption.Feint',
    skillKey: 'deception',
    requiresShield: false
  }
};

/* -------------------------------------------- */
/*  Pool Building                                */
/* -------------------------------------------- */

/**
 * Build a defense dice pool.
 * @param {Actor} actor - The defending actor
 * @param {string} [buyOption='none'] - Buy option key
 * @param {number} [modifier=0] - Additional modifier
 * @param {boolean} [previewMode=false] - If true, don't apply usage penalty (for previewing)
 * @returns {Object} Defense pool data
 */
export function buildDefensePool(actor, buyOption = 'none', modifier = 0, previewMode = false) {
  // Base pool is Reflex (AGI + AWA)
  const reflex = actor.system.reflex ?? 0;
  const agility = actor.system.getAttributeTotal?.('agility') ?? actor.system.attributes?.agility ?? 0;
  const awareness = actor.system.getAttributeTotal?.('awareness') ?? actor.system.attributes?.awareness ?? 0;

  let buyBonus = 0;
  let baseBuyBonus = 0;
  let buyLabel = null;
  let buySkill = null;
  let usageCount = 0;
  let usagePenalty = 0;

  if (buyOption && buyOption !== 'none') {
    const option = DEFENSE_BUY_OPTIONS[buyOption];
    if (option) {
      if (option.requiresShield) {
        // Block uses shield defense bonus
        const shield = actor.equippedShield;
        if (shield) {
          baseBuyBonus = shield.system.shield?.defenseBonus ?? 0;
          buyLabel = game.i18n.localize('WOR.Defense.BuyOption.Block');
          buySkill = shield.name;
        }
      } else if (option.skillKey) {
        // Other options use skill ranks
        baseBuyBonus = actor.getSkillValue?.(option.skillKey) ?? 0;
        buyLabel = game.i18n.localize(option.label);
        buySkill = option.skillKey;
      }

      // Get TOTAL buy usage count this turn (shared across all options)
      if (!previewMode) {
        usageCount = getTotalBuyUsageCount(actor);
        usagePenalty = usageCount * BUY_OPTION_PENALTY_PER_USE;
      }

      // Apply penalty (can't go below 0)
      buyBonus = Math.max(0, baseBuyBonus - usagePenalty);
    }
  }

  // Check for Full Defense stance
  const fullDefenseActive = isFullDefenseActive(actor);
  const fullDefenseBonus = fullDefenseActive ? FULL_DEFENSE_BONUS : 0;

  const total = Math.max(0, reflex + buyBonus + fullDefenseBonus + modifier);

  return {
    reflex,
    agility,
    awareness,
    buyOption,
    baseBuyBonus,
    buyBonus,
    usageCount,
    usagePenalty,
    buyLabel,
    buySkill,
    fullDefenseActive,
    fullDefenseBonus,
    modifier,
    total
  };
}

/**
 * Get available buy options for an actor.
 * The penalty is shared across ALL buy options (not per-option).
 * @param {Actor} actor - The actor
 * @returns {Array} Array of buy option objects with availability and usage info
 */
export function getBuyOptions(actor) {
  const shield = actor.equippedShield;
  const options = [];

  // Get total buy usage count - shared across all options
  const totalBuys = getTotalBuyUsageCount(actor);
  const usagePenalty = totalBuys * BUY_OPTION_PENALTY_PER_USE;

  for (const [key, option] of Object.entries(DEFENSE_BUY_OPTIONS)) {
    let baseBonus = 0;
    let available = true;

    if (option.requiresShield) {
      // Block requires equipped shield
      available = !!shield;
      baseBonus = shield?.system.shield?.defenseBonus ?? 0;
    } else if (option.skillKey) {
      // Other options use skill value
      baseBonus = actor.getSkillValue?.(option.skillKey) ?? 0;
    }

    // Apply shared penalty to this option's bonus (only for non-'none' options)
    const thisPenalty = key !== 'none' ? usagePenalty : 0;
    const effectiveBonus = Math.max(0, baseBonus - thisPenalty);

    options.push({
      key,
      label: game.i18n.localize(option.label),
      baseBonus,
      bonus: effectiveBonus,
      usageCount: totalBuys, // Total buys, shared across all options
      usagePenalty: thisPenalty,
      hasPenalty: thisPenalty > 0,
      available,
      skillKey: option.skillKey,
      requiresShield: option.requiresShield
    });
  }

  return options;
}

/* -------------------------------------------- */
/*  Turn Tracking                                */
/* -------------------------------------------- */

/**
 * Get the current turn identifier for tracking.
 * @returns {Object|null} Turn identifier with combatId and turn, or null if not in combat
 */
function getCurrentTurnId() {
  if (!game.combat) return null;
  return {
    combatId: game.combat.id,
    round: game.combat.round,
    turn: game.combat.turn
  };
}

/**
 * Check if a turn identifier matches the current turn.
 * @param {Object} turnId - Turn identifier to check
 * @returns {boolean} True if it matches current turn
 */
function isCurrentTurn(turnId) {
  if (!turnId || !game.combat) return false;
  return turnId.combatId === game.combat.id &&
         turnId.round === game.combat.round &&
         turnId.turn === game.combat.turn;
}

/**
 * Get total number of times ANY buy option has been used this turn.
 * The penalty applies globally across all buy options, not per-option.
 * @param {Actor} actor - The actor
 * @returns {number} Total number of buys used this turn
 */
export function getTotalBuyUsageCount(actor) {
  if (!game.combat) return 0;

  const usageData = actor.getFlag('weight-of-ruin', 'defenseUsage');
  if (!usageData || !isCurrentTurn(usageData.turnId)) return 0;

  return usageData.totalBuys ?? 0;
}

/**
 * Legacy function for compatibility - returns total buy count.
 * @param {Actor} actor - The actor
 * @param {string} buyOption - The buy option key (ignored, uses total)
 * @returns {number} Total number of buys used this turn
 */
export function getBuyOptionUsageCount(actor, buyOption) {
  // All buy options share the same usage counter now
  return getTotalBuyUsageCount(actor);
}

/**
 * Increment the total buy usage count this turn.
 * @param {Actor} actor - The actor
 * @param {string} buyOption - The buy option key (must not be 'none')
 * @returns {Promise<void>}
 */
export async function markBuyOptionUsed(actor, buyOption) {
  if (!game.combat || buyOption === 'none') return;

  const currentTurnId = getCurrentTurnId();
  let usageData = actor.getFlag('weight-of-ruin', 'defenseUsage');

  // Reset if it's a new turn
  if (!usageData || !isCurrentTurn(usageData.turnId)) {
    usageData = {
      turnId: currentTurnId,
      totalBuys: 0
    };
  }

  // Increment the total buy count (shared across all options)
  usageData.totalBuys = (usageData.totalBuys ?? 0) + 1;

  await actor.setFlag('weight-of-ruin', 'defenseUsage', usageData);
}

/**
 * Reset defense usage tracking (called at start of actor's turn).
 * @param {Actor} actor - The actor
 * @returns {Promise<void>}
 */
export async function resetDefenseUsage(actor) {
  await actor.unsetFlag('weight-of-ruin', 'defenseUsage');
}

/**
 * Check if buy option can still provide a bonus (not completely penalized away).
 * @param {Actor} actor - The actor
 * @param {string} buyOption - The buy option key
 * @returns {boolean} True if option still provides a bonus
 */
export function canUseBuyOption(actor, buyOption = null) {
  // Always available outside combat
  if (!game.combat) return true;

  // If checking a specific option, see if it still has bonus
  if (buyOption && buyOption !== 'none') {
    const options = getBuyOptions(actor);
    const opt = options.find(o => o.key === buyOption);
    return opt?.available && opt?.bonus > 0;
  }

  return true;
}

/* -------------------------------------------- */
/*  Full Defense Stance                          */
/* -------------------------------------------- */

/**
 * Check if Full Defense stance is active for an actor.
 * @param {Actor} actor - The actor
 * @returns {boolean} True if Full Defense is active
 */
export function isFullDefenseActive(actor) {
  if (!game.combat) return false;

  const fullDefense = actor.getFlag('weight-of-ruin', 'fullDefense');
  if (!fullDefense) return false;

  // Full Defense lasts until the start of the actor's next turn
  // It's active if it was set in this combat and we haven't reached the end turn yet
  if (fullDefense.combatId !== game.combat.id) return false;

  const currentRound = game.combat.round;
  const currentTurn = game.combat.turn;

  // Check if we're past the end point
  if (currentRound > fullDefense.endRound) return false;
  if (currentRound === fullDefense.endRound && currentTurn >= fullDefense.endTurn) return false;

  return true;
}

/**
 * Activate Full Defense stance for an actor.
 * Lasts until the start of their next turn.
 * @param {Actor} actor - The actor
 * @returns {Promise<boolean>} True if successfully activated
 */
export async function activateFullDefense(actor) {
  if (!game.combat) {
    ui.notifications.warn(game.i18n.localize('WOR.Defense.FullDefense.NoCombat'));
    return false;
  }

  // Find the actor's position in the turn order
  const combatant = game.combat.combatants.find(c => c.actorId === actor.id);
  if (!combatant) {
    ui.notifications.warn(game.i18n.localize('WOR.Defense.FullDefense.NotInCombat'));
    return false;
  }

  const combatantTurn = game.combat.turns.findIndex(t => t.id === combatant.id);

  // Calculate when Full Defense ends (start of actor's next turn)
  let endRound = game.combat.round;
  let endTurn = combatantTurn;

  // If the actor's turn has already passed this round, it ends next round
  if (game.combat.turn >= combatantTurn) {
    endRound += 1;
  }

  await actor.setFlag('weight-of-ruin', 'fullDefense', {
    combatId: game.combat.id,
    startRound: game.combat.round,
    startTurn: game.combat.turn,
    endRound,
    endTurn
  });

  // Notify
  ui.notifications.info(game.i18n.format('WOR.Defense.FullDefense.Activated', { name: actor.name }));

  // Send chat message
  await sendFullDefenseToChat(actor);

  return true;
}

/**
 * Deactivate Full Defense stance.
 * @param {Actor} actor - The actor
 * @returns {Promise<void>}
 */
export async function deactivateFullDefense(actor) {
  await actor.unsetFlag('weight-of-ruin', 'fullDefense');
}

/**
 * Send Full Defense activation to chat.
 * @param {Actor} actor - The actor
 */
async function sendFullDefenseToChat(actor) {
  const speaker = ChatMessage.getSpeaker({ actor });

  const content = `
    <div class="wor">
      <div class="full-defense-card">
        <div class="card-header">
          <img src="${actor.img}" class="actor-portrait" />
          <div class="header-info">
            <h3>${game.i18n.localize('WOR.Defense.FullDefense.Title')}</h3>
            <span class="actor-name">${actor.name}</span>
          </div>
        </div>
        <div class="card-body">
          <p>${game.i18n.format('WOR.Defense.FullDefense.ChatMessage', { bonus: FULL_DEFENSE_BONUS })}</p>
        </div>
      </div>
    </div>
  `;

  return ChatMessage.create({
    speaker,
    content,
    type: CONST.CHAT_MESSAGE_STYLES.OTHER
  });
}

/* -------------------------------------------- */
/*  Defense Rolling                              */
/* -------------------------------------------- */

/**
 * Perform a defense roll.
 * @param {Object} options - Roll options
 * @param {Actor} options.actor - The defending actor
 * @param {string} [options.buyOption='none'] - Buy option key
 * @param {number} [options.modifier=0] - Additional modifier
 * @param {string} [options.difficulty='standard'] - Difficulty tier
 * @param {Object} [options.fervorSpend={}] - Fervor spending options
 * @returns {Promise<Object>} Defense roll result
 */
export async function rollDefense({
  actor,
  buyOption = 'none',
  modifier = 0,
  difficulty = 'standard',
  fervorSpend = {}
}) {
  // Build pool
  const poolData = buildDefensePool(actor, buyOption, modifier);

  // Apply fervor bonuses
  let effectivePool = poolData.total;
  let effectiveDifficulty = difficulty;

  if (fervorSpend.bonusDice) {
    effectivePool += 3;
  }
  if (fervorSpend.difficultyShift && difficulty !== 'trivial') {
    effectiveDifficulty = shiftDifficulty(difficulty, -1);
  }

  // Handle auto success
  if (fervorSpend.autoSuccess) {
    // Spend 5 Fervor
    if (actor) {
      await spendFervor(actor, 5);
    }

    return {
      poolData,
      effectivePool,
      difficulty: DIFFICULTY_TIERS[effectiveDifficulty],
      roll: null,
      hits: 99, // Very high to always win
      dice: [],
      isAutoSuccess: true,
      fervorSpend: { autoSuccess: true },
      buyOption,
      actor: {
        id: actor.id,
        name: actor.name,
        img: actor.img
      }
    };
  }

  // Calculate fervor cost
  let fervorCost = 0;
  if (fervorSpend.difficultyShift) fervorCost += 1;
  if (fervorSpend.bonusDice) fervorCost += 3;

  if (fervorCost > 0 && actor) {
    await spendFervor(actor, fervorCost);
  }

  // Mark buy option used (if using one)
  if (buyOption !== 'none' && actor) {
    await markBuyOptionUsed(actor, buyOption);
  }

  // Perform the roll
  const result = await rollThresholdCompression({
    pool: effectivePool,
    difficulty: effectiveDifficulty,
    fervorSpend
  });

  // Enhance result with defense-specific data
  return {
    ...result,
    poolData,
    effectivePool,
    buyOption,
    isDefenseRoll: true,
    actor: {
      id: actor.id,
      name: actor.name,
      img: actor.img
    }
  };
}

/* -------------------------------------------- */
/*  Defense Dialog                               */
/* -------------------------------------------- */

/**
 * Show the defense roll dialog.
 * @param {Object} options - Dialog options
 * @param {Actor} options.actor - The defending actor
 * @returns {Promise<Object|null>} Defense roll result or null if cancelled
 */
export async function showDefenseDialog({ actor }) {
  // Import the dialog class
  const { WoRDefenseDialog } = await import('../apps/defense-dialog.mjs');

  return WoRDefenseDialog.create({ actor });
}

/* -------------------------------------------- */
/*  Chat Output                                  */
/* -------------------------------------------- */

/**
 * Send defense roll result to chat.
 * @param {Object} options - Chat options
 * @param {Actor} options.actor - The actor
 * @param {Object} options.result - Defense roll result
 */
export async function sendDefenseToChat({ actor, result }) {
  const speaker = ChatMessage.getSpeaker({ actor });
  const rollMode = game.settings.get('core', 'rollMode');

  // Build dice display
  const diceDisplay = result.dice ? generateDiceDisplay(result.dice, result.difficulty?.threshold || 5) : '';

  // Build content
  const content = await foundry.applications.handlebars.renderTemplate(
    'systems/weight-of-ruin/templates/chat/defense-card.hbs',
    {
      actor: result.actor,
      poolData: result.poolData,
      effectivePool: result.effectivePool,
      hits: result.hits,
      dice: result.dice,
      diceDisplay,
      difficulty: result.difficulty,
      buyOption: result.buyOption,
      buyLabel: result.poolData?.buyLabel,
      buyBonus: result.poolData?.buyBonus,
      isAutoSuccess: result.isAutoSuccess,
      fervorSpend: result.fervorSpend
    }
  );

  // Create chat message
  const messageData = {
    speaker,
    content,
    rollMode,
    rolls: result.roll ? [result.roll] : []
  };

  return ChatMessage.create(messageData);
}

/* -------------------------------------------- */
/*  Module Registration                          */
/* -------------------------------------------- */

/**
 * Register defense functions on the game object for global access.
 */
export function registerDefenseFunctions() {
  game.wor = game.wor || {};
  game.wor.defense = {
    buildDefensePool,
    getBuyOptions,
    getBuyOptionUsageCount,
    canUseBuyOption,
    markBuyOptionUsed,
    resetDefenseUsage,
    isFullDefenseActive,
    activateFullDefense,
    deactivateFullDefense,
    rollDefense,
    showDefenseDialog,
    sendDefenseToChat,
    DEFENSE_BUY_OPTIONS,
    BUY_OPTION_PENALTY_PER_USE,
    FULL_DEFENSE_BONUS
  };
}
