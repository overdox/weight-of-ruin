/**
 * The Weight of Ruin - Dice Helper Module
 * Implements the Threshold Compression dice rolling system
 *
 * Threshold Compression: Difficulty determines which die results count as hits
 * - Trivial: 4, 5, 6 = hit (50% per die)
 * - Standard: 5, 6 = hit (33% per die)
 * - Hard: 6 only = hit (16.7% per die)
 *
 * Target Threshold (TT): Number of hits required for success
 * Degrees of Success:
 * - Critical Failure: 3+ below TT
 * - Failure: Below TT
 * - Success: Meets/exceeds TT
 * - Critical Success: 3+ above TT
 */

/**
 * Difficulty tier definitions
 */
export const DIFFICULTY_TIERS = {
  trivial: {
    key: 'trivial',
    label: 'AOA.Difficulty.Trivial',
    threshold: 4,
    probability: 0.5
  },
  standard: {
    key: 'standard',
    label: 'AOA.Difficulty.Standard',
    threshold: 5,
    probability: 0.333
  },
  hard: {
    key: 'hard',
    label: 'AOA.Difficulty.Hard',
    threshold: 6,
    probability: 0.167
  }
};

/**
 * Degree of success definitions
 */
export const DEGREE_OF_SUCCESS = {
  criticalFailure: {
    key: 'criticalFailure',
    label: 'AOA.Roll.CriticalFailure',
    cssClass: 'critical-failure'
  },
  failure: {
    key: 'failure',
    label: 'AOA.Roll.Failure',
    cssClass: 'failure'
  },
  success: {
    key: 'success',
    label: 'AOA.Roll.Success',
    cssClass: 'success'
  },
  criticalSuccess: {
    key: 'criticalSuccess',
    label: 'AOA.Roll.CriticalSuccess',
    cssClass: 'critical-success'
  }
};

/**
 * Extract dice results from a Roll object.
 * Handles different Foundry versions and roll structures.
 * @param {Roll} roll - The Foundry Roll object
 * @param {number} threshold - The hit threshold (4, 5, or 6)
 * @returns {Array} Array of dice result objects
 */
function extractDiceResults(roll, threshold) {
  // Try different ways to access dice results for compatibility
  let results = [];

  // Method 1: roll.dice[0].results (standard approach)
  if (roll.dice?.[0]?.results) {
    results = roll.dice[0].results;
  }
  // Method 2: roll.terms - find the Die term
  else if (roll.terms) {
    const dieTerm = roll.terms.find(t => t.results);
    if (dieTerm?.results) {
      results = dieTerm.results;
    }
  }

  // Map results to our format
  return results.map(r => ({
    result: r.result,
    isHit: r.result >= threshold,
    isMax: r.result === 6,
    isMin: r.result === 1
  }));
}

/**
 * Generate HTML for displaying dice as D6 icons.
 * @param {Array} diceArray - Array of dice result objects or numbers
 * @param {number} threshold - The hit threshold for determining success
 * @returns {string} HTML string of dice spans
 */
export function generateDiceDisplay(diceArray, threshold = 5) {
  if (!diceArray || !Array.isArray(diceArray)) return '';

  return diceArray.map(d => {
    // Handle both object format {result, isHit, ...} and raw number format
    const value = typeof d === 'object' ? d.result : d;
    const isHit = typeof d === 'object' ? d.isHit : (value >= threshold);
    const isMax = typeof d === 'object' ? d.isMax : (value === 6);
    const isMin = typeof d === 'object' ? d.isMin : (value === 1);

    let classes = ['die', 'd6'];
    if (isHit) classes.push('hit');
    if (isMax) classes.push('max');
    if (isMin) classes.push('min');
    return `<span class="${classes.join(' ')}">${value}</span>`;
  }).join('');
}

/**
 * Fervor spending options
 */
export const FERVOR_OPTIONS = {
  difficultyShift: {
    key: 'difficultyShift',
    cost: 1,
    label: 'AOA.Fervor.DifficultyShift',
    description: 'Shift difficulty one tier easier',
    timing: 'pre-roll'
  },
  reroll: {
    key: 'reroll',
    cost: 2,
    label: 'AOA.Fervor.Reroll',
    description: 'Reroll and take better result',
    timing: 'post-roll'
  },
  bonusDice: {
    key: 'bonusDice',
    cost: 3,
    label: 'AOA.Fervor.BonusDice',
    description: 'Add +3 dice to pool',
    timing: 'pre-roll'
  },
  autoSuccess: {
    key: 'autoSuccess',
    cost: 5,
    label: 'AOA.Fervor.AutoSuccess',
    description: 'Automatic Critical Success',
    timing: 'pre-roll'
  },
  zeroPool: {
    key: 'zeroPool',
    cost: 1,
    label: 'AOA.Fervor.ZeroPool',
    description: 'Attempt roll with 0 dice (1d6 at Hard)',
    timing: 'pre-roll'
  }
};

/* -------------------------------------------- */
/*  Pool Building                               */
/* -------------------------------------------- */

/**
 * Build a dice pool from attribute, skill, and modifiers.
 * @param {Object} options - Pool building options
 * @param {Actor} options.actor - The actor making the roll
 * @param {string} [options.attribute] - Attribute key (e.g., 'strength')
 * @param {string} [options.skill] - Skill name
 * @param {number} [options.modifier=0] - Additional modifier
 * @param {number} [options.bonusDice=0] - Bonus dice (e.g., from Fervor)
 * @returns {Object} Pool breakdown with total
 */
export function buildPool({ actor, attribute, skill, modifier = 0, bonusDice = 0 }) {
  const breakdown = {
    attribute: { key: attribute, value: 0, label: '' },
    skill: { name: skill, value: 0 },
    modifier: modifier,
    bonusDice: bonusDice,
    total: 0
  };

  // Get attribute value (use getAttributeTotal to get base + advances + modifier)
  if (attribute && actor?.system) {
    // Use getAttributeTotal if available, otherwise try to extract from the attribute object
    if (typeof actor.system.getAttributeTotal === 'function') {
      breakdown.attribute.value = actor.system.getAttributeTotal(attribute);
    } else if (actor.system.attributes?.[attribute]) {
      const attr = actor.system.attributes[attribute];
      // Handle object structure with base/advances/modifier
      breakdown.attribute.value = typeof attr === 'object'
        ? (attr.base || 0) + (attr.advances || 0) + (attr.modifier || 0)
        : attr || 0;
    }
    breakdown.attribute.label = game.i18n.localize(`AOA.Attributes.${attribute.charAt(0).toUpperCase() + attribute.slice(1)}`);
  }

  // Get skill value
  if (skill && actor) {
    const skillData = actor.getSkill?.(skill);
    if (skillData) {
      breakdown.skill.value = skillData.rank || 0;
      breakdown.skill.name = skillData.name || skill;
    }
  }

  // Calculate total (floor at 0)
  breakdown.total = Math.max(0,
    breakdown.attribute.value +
    breakdown.skill.value +
    breakdown.modifier +
    breakdown.bonusDice
  );

  return breakdown;
}

/**
 * Build a pool for a specific skill roll.
 * @param {Actor} actor - The actor making the roll
 * @param {string} skillName - Name of the skill
 * @param {number} [modifier=0] - Additional modifier
 * @returns {Object} Pool breakdown
 */
export function buildSkillPool(actor, skillName, modifier = 0) {
  const skillData = actor.getSkill?.(skillName);
  if (!skillData) {
    return buildPool({ actor, modifier });
  }

  return buildPool({
    actor,
    attribute: skillData.attribute,
    skill: skillName,
    modifier
  });
}

/* -------------------------------------------- */
/*  Difficulty Management                       */
/* -------------------------------------------- */

/**
 * Get difficulty tier data.
 * @param {string} tier - Difficulty tier key
 * @returns {Object} Difficulty tier data
 */
export function getDifficultyTier(tier = 'standard') {
  return DIFFICULTY_TIERS[tier] || DIFFICULTY_TIERS.standard;
}

/**
 * Shift difficulty tier up or down.
 * @param {string} currentTier - Current difficulty tier
 * @param {number} shift - Number of steps to shift (negative = easier)
 * @returns {string} New difficulty tier key
 */
export function shiftDifficulty(currentTier, shift) {
  const tiers = ['trivial', 'standard', 'hard'];
  const currentIndex = tiers.indexOf(currentTier);
  if (currentIndex === -1) return 'standard';

  const newIndex = Math.max(0, Math.min(tiers.length - 1, currentIndex + shift));
  return tiers[newIndex];
}

/* -------------------------------------------- */
/*  Target Threshold                            */
/* -------------------------------------------- */

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
 * Get TT description based on value.
 * @param {number} tt - Target Threshold value
 * @returns {Object} TT data with label
 */
export function getTTData(tt) {
  const ttLabels = {
    1: 'AOA.TT.Simple',
    2: 'AOA.TT.Moderate',
    3: 'AOA.TT.Challenging',
    4: 'AOA.TT.Difficult',
    5: 'AOA.TT.Exceptional'
  };

  return {
    value: tt,
    label: ttLabels[tt] || 'AOA.TT.Legendary'
  };
}

/* -------------------------------------------- */
/*  Core Roll Function                          */
/* -------------------------------------------- */

/**
 * Execute a Threshold Compression roll.
 * @param {Object} options - Roll options
 * @param {number} options.pool - Number of dice to roll
 * @param {string} [options.difficulty='standard'] - Difficulty tier
 * @param {number} [options.targetThreshold] - Target Threshold for success evaluation
 * @param {Object} [options.fervorSpend] - Fervor spending options used
 * @returns {Promise<Object>} Roll result object
 */
export async function rollThresholdCompression({
  pool,
  difficulty = 'standard',
  targetThreshold = null,
  fervorSpend = {}
}) {
  const difficultyData = getDifficultyTier(difficulty);
  const threshold = difficultyData.threshold;

  // Handle zero pool
  if (pool <= 0 && !fervorSpend.zeroPool) {
    return {
      pool: 0,
      difficulty: difficultyData,
      roll: null,
      hits: 0,
      targetThreshold,
      degree: targetThreshold ? evaluateDegree(0, targetThreshold) : null,
      margin: targetThreshold ? 0 - targetThreshold : null,
      isAutoFailure: true,
      fervorSpend
    };
  }

  // Adjust pool for zero-pool Fervor spend
  const effectivePool = pool <= 0 && fervorSpend.zeroPool ? 1 : pool;
  const effectiveDifficulty = pool <= 0 && fervorSpend.zeroPool ? 'hard' : difficulty;
  const effectiveThreshold = pool <= 0 && fervorSpend.zeroPool ? 6 : threshold;

  // Build the roll formula: Xd6cs>=Y counts successes
  const formula = `${effectivePool}d6cs>=${effectiveThreshold}`;

  // Create and evaluate the roll
  const roll = new Roll(formula);
  await roll.evaluate();

  // Count hits (roll.total is the count of successes)
  const hits = roll.total;

  // Build result object
  const result = {
    pool: effectivePool,
    originalPool: pool,
    difficulty: getDifficultyTier(effectiveDifficulty),
    roll: roll,
    formula: formula,
    hits: hits,
    dice: extractDiceResults(roll, effectiveThreshold),
    targetThreshold,
    degree: targetThreshold !== null ? evaluateDegree(hits, targetThreshold) : null,
    margin: targetThreshold !== null ? hits - targetThreshold : null,
    isAutoFailure: false,
    fervorSpend,
    isZeroPoolAttempt: pool <= 0 && fervorSpend.zeroPool
  };

  return result;
}

/**
 * Perform a reroll (for Fervor spending).
 * @param {Object} previousResult - The previous roll result
 * @returns {Promise<Object>} New roll result (or previous if worse)
 */
export async function reroll(previousResult) {
  const newResult = await rollThresholdCompression({
    pool: previousResult.pool,
    difficulty: previousResult.difficulty.key,
    targetThreshold: previousResult.targetThreshold,
    fervorSpend: { ...previousResult.fervorSpend, reroll: true }
  });

  // Take the better result
  if (newResult.hits > previousResult.hits) {
    newResult.isReroll = true;
    newResult.previousHits = previousResult.hits;
    return newResult;
  } else {
    previousResult.isReroll = true;
    previousResult.rerollHits = newResult.hits;
    previousResult.keptOriginal = true;
    return previousResult;
  }
}

/* -------------------------------------------- */
/*  Result Evaluation                           */
/* -------------------------------------------- */

/**
 * Evaluate the degree of success based on hits vs Target Threshold.
 * @param {number} hits - Number of hits rolled
 * @param {number} targetThreshold - Target Threshold
 * @returns {Object} Degree of success data
 */
export function evaluateDegree(hits, targetThreshold) {
  const margin = hits - targetThreshold;

  if (margin >= 3) {
    return { ...DEGREE_OF_SUCCESS.criticalSuccess, margin };
  } else if (margin >= 0) {
    return { ...DEGREE_OF_SUCCESS.success, margin };
  } else if (margin >= -2) {
    return { ...DEGREE_OF_SUCCESS.failure, margin };
  } else {
    return { ...DEGREE_OF_SUCCESS.criticalFailure, margin };
  }
}

/**
 * Check if a result is a success (success or critical success).
 * @param {Object} result - Roll result object
 * @returns {boolean}
 */
export function isSuccess(result) {
  if (!result.degree) return false;
  return ['success', 'criticalSuccess'].includes(result.degree.key);
}

/**
 * Check if a result is a critical (critical success or critical failure).
 * @param {Object} result - Roll result object
 * @returns {boolean}
 */
export function isCritical(result) {
  if (!result.degree) return false;
  return ['criticalSuccess', 'criticalFailure'].includes(result.degree.key);
}

/* -------------------------------------------- */
/*  Fervor Spending                             */
/* -------------------------------------------- */

/**
 * Check if actor can spend Fervor.
 * @param {Actor} actor - The actor
 * @param {number} cost - Fervor cost
 * @returns {boolean}
 */
export function canSpendFervor(actor, cost) {
  const currentFervor = actor?.system?.fervor?.current ?? 0;
  return currentFervor >= cost;
}

/**
 * Spend Fervor from an actor.
 * @param {Actor} actor - The actor
 * @param {number} cost - Fervor cost
 * @returns {Promise<boolean>} Success
 */
export async function spendFervor(actor, cost) {
  if (!canSpendFervor(actor, cost)) return false;

  const currentFervor = actor.system.fervor.current;
  await actor.update({ 'system.fervor.current': currentFervor - cost });
  return true;
}

/**
 * Get available Fervor options for an actor.
 * @param {Actor} actor - The actor
 * @param {boolean} isPreRoll - Is this before the roll?
 * @param {number} pool - Current pool size
 * @returns {Array} Available Fervor options
 */
export function getAvailableFervorOptions(actor, isPreRoll = true, pool = 1) {
  const currentFervor = actor?.system?.fervor?.current ?? 0;
  const options = [];

  for (const [key, option] of Object.entries(FERVOR_OPTIONS)) {
    // Check timing
    if (isPreRoll && option.timing !== 'pre-roll') continue;
    if (!isPreRoll && option.timing !== 'post-roll') continue;

    // Check cost
    if (currentFervor < option.cost) continue;

    // Zero pool option only shows when pool is 0
    if (key === 'zeroPool' && pool > 0) continue;

    options.push({
      ...option,
      available: true
    });
  }

  return options;
}

/* -------------------------------------------- */
/*  High-Level Roll Functions                   */
/* -------------------------------------------- */

/**
 * Perform a complete skill roll with dialog or quick roll.
 * @param {Object} options - Roll options
 * @param {Actor} options.actor - The actor making the roll
 * @param {string} options.skill - Skill name
 * @param {number} [options.modifier=0] - Modifier
 * @param {string} [options.difficulty='standard'] - Difficulty
 * @param {number} [options.targetThreshold] - Target Threshold
 * @param {boolean} [options.skipDialog=false] - Skip dialog (quick roll)
 * @param {Event} [options.event] - Triggering event (for shift-click detection)
 * @returns {Promise<Object>} Roll result
 */
export async function rollSkill({
  actor,
  skill,
  modifier = 0,
  difficulty = 'standard',
  targetThreshold = null,
  skipDialog = false,
  event = null
}) {
  // Check for shift-click quick roll
  if (event?.shiftKey) {
    skipDialog = true;
  }

  // Build the pool
  const poolData = buildSkillPool(actor, skill, modifier);

  // Quick roll - go directly to roll and chat
  if (skipDialog) {
    const result = await rollThresholdCompression({
      pool: poolData.total,
      difficulty,
      targetThreshold
    });

    await sendRollToChat({
      actor,
      result,
      poolData,
      title: poolData.skill.name || skill,
      rollType: 'skill'
    });

    return result;
  }

  // Show dialog
  return showRollDialog({
    actor,
    poolData,
    title: poolData.skill.name || skill,
    rollType: 'skill',
    defaultDifficulty: difficulty,
    defaultTT: targetThreshold
  });
}

/**
 * Perform a complete attribute roll.
 * @param {Object} options - Roll options
 * @param {Actor} options.actor - The actor making the roll
 * @param {string} options.attribute - Attribute key
 * @param {number} [options.modifier=0] - Modifier
 * @param {string} [options.difficulty='standard'] - Difficulty
 * @param {number} [options.targetThreshold] - Target Threshold
 * @param {boolean} [options.skipDialog=false] - Skip dialog
 * @param {Event} [options.event] - Triggering event
 * @returns {Promise<Object>} Roll result
 */
export async function rollAttribute({
  actor,
  attribute,
  modifier = 0,
  difficulty = 'standard',
  targetThreshold = null,
  skipDialog = false,
  event = null
}) {
  if (event?.shiftKey) {
    skipDialog = true;
  }

  const poolData = buildPool({ actor, attribute, modifier });

  if (skipDialog) {
    const result = await rollThresholdCompression({
      pool: poolData.total,
      difficulty,
      targetThreshold
    });

    await sendRollToChat({
      actor,
      result,
      poolData,
      title: poolData.attribute.label || attribute,
      rollType: 'attribute'
    });

    return result;
  }

  return showRollDialog({
    actor,
    poolData,
    title: poolData.attribute.label || attribute,
    rollType: 'attribute',
    defaultDifficulty: difficulty,
    defaultTT: targetThreshold
  });
}

/**
 * Perform a generic pool roll.
 * @param {Object} options - Roll options
 * @param {Actor} [options.actor] - The actor (optional)
 * @param {number} options.pool - Dice pool size
 * @param {string} [options.title='Roll'] - Roll title
 * @param {string} [options.difficulty='standard'] - Difficulty
 * @param {number} [options.targetThreshold] - Target Threshold
 * @param {boolean} [options.skipDialog=false] - Skip dialog
 * @param {Event} [options.event] - Triggering event
 * @returns {Promise<Object>} Roll result
 */
export async function rollPool({
  actor = null,
  pool,
  title = 'Roll',
  difficulty = 'standard',
  targetThreshold = null,
  skipDialog = false,
  event = null
}) {
  if (event?.shiftKey) {
    skipDialog = true;
  }

  const poolData = {
    attribute: { value: 0, label: '' },
    skill: { value: 0, name: '' },
    modifier: pool,
    bonusDice: 0,
    total: pool
  };

  if (skipDialog) {
    const result = await rollThresholdCompression({
      pool,
      difficulty,
      targetThreshold
    });

    await sendRollToChat({
      actor,
      result,
      poolData,
      title,
      rollType: 'generic'
    });

    return result;
  }

  return showRollDialog({
    actor,
    poolData,
    title,
    rollType: 'generic',
    defaultDifficulty: difficulty,
    defaultTT: targetThreshold
  });
}

/* -------------------------------------------- */
/*  Chat Output                                 */
/* -------------------------------------------- */

/**
 * Send roll result to chat.
 * @param {Object} options - Chat options
 * @param {Actor} [options.actor] - The actor
 * @param {Object} options.result - Roll result
 * @param {Object} options.poolData - Pool breakdown
 * @param {string} options.title - Roll title
 * @param {string} options.rollType - Type of roll
 */
export async function sendRollToChat({ actor, result, poolData, title, rollType }) {
  const speaker = ChatMessage.getSpeaker({ actor });
  const rollMode = game.settings.get('core', 'rollMode');

  // Build dice display using helper
  const diceDisplay = generateDiceDisplay(result.dice, result.difficulty?.threshold || 5);

  // Build content
  const content = await foundry.applications.handlebars.renderTemplate(
    'systems/weight-of-ruin/templates/chat/roll-card.hbs',
    {
      title,
      rollType,
      actor: actor?.name,
      poolData,
      result,
      diceDisplay,
      difficulty: result.difficulty,
      targetThreshold: result.targetThreshold,
      ttData: result.targetThreshold ? getTTData(result.targetThreshold) : null,
      degree: result.degree,
      margin: result.margin,
      isSuccess: result.degree ? isSuccess(result) : null,
      isCritical: result.degree ? isCritical(result) : null,
      isAutoFailure: result.isAutoFailure,
      isZeroPoolAttempt: result.isZeroPoolAttempt,
      isReroll: result.isReroll,
      previousHits: result.previousHits,
      keptOriginal: result.keptOriginal,
      rerollHits: result.rerollHits,
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
/*  Roll Dialog                                 */
/* -------------------------------------------- */

/**
 * Show the roll dialog.
 * @param {Object} options - Dialog options
 * @returns {Promise<Object|null>} Roll result or null if cancelled
 */
export async function showRollDialog({
  actor,
  poolData,
  title,
  rollType,
  defaultDifficulty = 'standard',
  defaultTT = null
}) {
  // Import the dialog class
  const { WoRRollDialog } = await import('../apps/roll-dialog.mjs');

  return WoRRollDialog.create({
    actor,
    poolData,
    title,
    rollType,
    defaultDifficulty,
    defaultTT
  });
}

/* -------------------------------------------- */
/*  Wounds Roll                                 */
/* -------------------------------------------- */

/**
 * Perform a Wounds Roll.
 * Called when at Breaking Point (Trauma > Max Trauma) and taking damage.
 * Roll current Wounds pool at Standard difficulty.
 * Target Threshold = Attacker's NET HITS (hits - TT required).
 *
 * Success (hits >= TT): Endure - no effect
 * Failure (hits < TT): Falter - lose 1 Wound, Max Trauma -2
 *
 * @param {Actor} actor - The actor at breaking point
 * @param {Object} [options={}] - Roll options
 * @param {number} [options.netHits=1] - Net hits from the attack (default 1)
 * @returns {Promise<Object>} Wounds roll result
 */
export async function rollWounds(actor, options = {}) {
  const wounds = actor.system.health?.wounds?.value ?? 0;
  const maxWounds = actor.system.maxWounds ?? actor.system.baseWounds ?? 3;
  const trauma = actor.system.health?.trauma ?? 0;
  const maxTrauma = actor.system.maxTrauma ?? 3;
  const isStabilized = actor.system.health?.stabilized ?? false;

  // Target Threshold = attacker's net hits (minimum 1)
  const targetThreshold = Math.max(1, options.netHits ?? 1);

  // If stabilized, no roll needed
  if (isStabilized) {
    ui.notifications.info(game.i18n.format('AOA.Health.StabilizedNoRoll', { name: actor.name }));
    return { skipped: true, reason: 'stabilized' };
  }

  // Roll wounds pool at Standard difficulty
  const result = await rollThresholdCompression({
    pool: wounds,
    difficulty: 'standard',
    targetThreshold
  });

  // Determine outcome
  result.isWoundsRoll = true;
  result.wounds = wounds;
  result.maxWounds = maxWounds;
  result.trauma = trauma;
  result.maxTrauma = maxTrauma;
  result.netHits = targetThreshold;
  result.passed = result.hits >= targetThreshold;
  result.failed = result.hits < targetThreshold;
  result.outcome = result.passed ? 'endure' : 'falter';

  // Send to chat
  await sendWoundsRollToChat(actor, result);

  // Apply consequences on failure (Falter)
  if (result.failed) {
    await actor.loseWounds(1);
    await actor.reduceMaxTrauma();
    result.lostWounds = 1;
    result.maxTraumaReduced = 2;
  }

  return result;
}

/**
 * Send Wounds Roll result to chat.
 * @param {Actor} actor - The actor
 * @param {Object} result - Wounds roll result
 */
async function sendWoundsRollToChat(actor, result) {
  const speaker = ChatMessage.getSpeaker({ actor });
  const rollMode = game.settings.get('core', 'rollMode');

  // Build dice display using helper (standard threshold)
  const diceDisplay = generateDiceDisplay(result.dice, 5);

  const content = await foundry.applications.handlebars.renderTemplate(
    'systems/weight-of-ruin/templates/chat/wounds-roll.hbs',
    {
      actor: actor.name,
      result,
      diceDisplay,
      wounds: result.wounds,
      maxWounds: result.maxWounds,
      trauma: result.trauma,
      maxTrauma: result.maxTrauma,
      hits: result.hits,
      targetThreshold: result.netHits,
      passed: result.passed,
      failed: result.failed,
      outcome: result.outcome
    }
  );

  return ChatMessage.create({
    speaker,
    content,
    rollMode,
    rolls: result.roll ? [result.roll] : []
  });
}

/* -------------------------------------------- */
/*  Module Registration                         */
/* -------------------------------------------- */

/**
 * Register dice functions on the game object for global access.
 */
export function registerDiceFunctions() {
  game.wor = game.wor || {};
  game.wor.dice = {
    // Pool building
    buildPool,
    buildSkillPool,

    // Difficulty
    getDifficultyTier,
    shiftDifficulty,
    DIFFICULTY_TIERS,

    // Target Threshold
    calculateTTFromDefense,
    getTTData,

    // Core rolling
    rollThresholdCompression,
    reroll,

    // Result evaluation
    evaluateDegree,
    isSuccess,
    isCritical,
    DEGREE_OF_SUCCESS,

    // Fervor
    canSpendFervor,
    spendFervor,
    getAvailableFervorOptions,
    FERVOR_OPTIONS,

    // High-level rolls
    rollSkill,
    rollAttribute,
    rollPool,
    rollWounds,

    // Chat
    sendRollToChat
  };
}
