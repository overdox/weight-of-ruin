import {
  DIFFICULTY_TIERS,
  FERVOR_OPTIONS,
  rollThresholdCompression,
  reroll,
  sendRollToChat,
  canSpendFervor,
  spendFervor,
  shiftDifficulty,
  getAvailableFervorOptions
} from '../helpers/dice.mjs';

/**
 * Roll Dialog Application
 * Allows users to configure rolls before executing them
 */
export class WoRRollDialog extends foundry.applications.api.DialogV2 {

  /**
   * Create and show the roll dialog.
   * @param {Object} options - Dialog options
   * @returns {Promise<Object|null>} Roll result or null if cancelled
   */
  static async create({
    actor,
    poolData,
    title,
    rollType,
    defaultDifficulty = 'standard',
    defaultTT = null
  }) {
    return new Promise((resolve) => {
      const dialog = new WoRRollDialog({
        actor,
        poolData,
        title,
        rollType,
        defaultDifficulty,
        defaultTT,
        resolve
      });
      dialog.render(true);
    });
  }

  constructor({ actor, poolData, title, rollType, defaultDifficulty, defaultTT, resolve }) {
    super({
      window: {
        title: `${game.i18n.localize('AOA.Roll.Title')}: ${title}`,
        resizable: false
      },
      position: {
        width: 400,
        height: 'auto'
      },
      buttons: [
        {
          action: 'roll',
          label: game.i18n.localize('AOA.Common.Roll'),
          icon: 'fas fa-dice-d20',
          default: true,
          callback: (event, button, dialog) => dialog.#executeRoll()
        },
        {
          action: 'cancel',
          label: game.i18n.localize('AOA.Common.Cancel'),
          icon: 'fas fa-times'
        }
      ]
    });

    this.actor = actor;
    this.poolData = poolData;
    this.rollTitle = title;
    this.rollType = rollType;
    this.difficulty = defaultDifficulty;
    this.targetThreshold = defaultTT;
    this.modifier = 0;
    this.fervorSpend = {};
    this.resolve = resolve;
  }

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['wor', 'roll-dialog']
  };

  /** @override */
  static PARTS = {
    content: {
      template: 'systems/weight-of-ruin/templates/apps/roll-dialog.hbs'
    }
  };

  /** @override */
  async _prepareContext() {
    const currentFervor = this.actor?.system?.zeal?.current ?? 0;
    const effectivePool = this.poolData.total + this.modifier + (this.fervorSpend.bonusDice ? 3 : 0);
    const effectiveDifficulty = this.fervorSpend.difficultyShift
      ? shiftDifficulty(this.difficulty, -1)
      : this.difficulty;

    // Check for zero pool
    const isZeroPool = effectivePool <= 0;
    const canAttemptZeroPool = isZeroPool && canSpendFervor(this.actor, 1);

    return {
      title: this.rollTitle,
      rollType: this.rollType,
      actor: this.actor,
      poolData: this.poolData,
      modifier: this.modifier,
      effectivePool,
      isZeroPool,
      canAttemptZeroPool,

      // Difficulty
      difficulty: this.difficulty,
      effectiveDifficulty,
      difficultyTiers: Object.entries(DIFFICULTY_TIERS).map(([key, data]) => ({
        key,
        label: game.i18n.localize(data.label),
        threshold: data.threshold,
        selected: key === this.difficulty
      })),

      // Target Threshold
      targetThreshold: this.targetThreshold,

      // Zeal
      currentFervor,
      fervorOptions: this._getFervorOptions(currentFervor, effectivePool),
      fervorSpend: this.fervorSpend
    };
  }

  /**
   * Get available Zeal options for display.
   */
  _getFervorOptions(currentFervor, pool) {
    const options = [];

    // Difficulty Shift (1 Zeal)
    if (currentFervor >= 1 && this.difficulty !== 'trivial') {
      options.push({
        key: 'difficultyShift',
        ...FERVOR_OPTIONS.difficultyShift,
        label: game.i18n.localize(FERVOR_OPTIONS.difficultyShift.label),
        checked: this.fervorSpend.difficultyShift || false,
        disabled: false
      });
    }

    // Bonus Dice (3 Zeal)
    if (currentFervor >= 3) {
      options.push({
        key: 'bonusDice',
        ...FERVOR_OPTIONS.bonusDice,
        label: game.i18n.localize(FERVOR_OPTIONS.bonusDice.label),
        checked: this.fervorSpend.bonusDice || false,
        disabled: false
      });
    }

    // Auto Success (5 Zeal)
    if (currentFervor >= 5) {
      options.push({
        key: 'autoSuccess',
        ...FERVOR_OPTIONS.autoSuccess,
        label: game.i18n.localize(FERVOR_OPTIONS.autoSuccess.label),
        checked: this.fervorSpend.autoSuccess || false,
        disabled: false
      });
    }

    // Zero Pool (1 Zeal) - only if pool is 0
    if (pool <= 0 && currentFervor >= 1) {
      options.push({
        key: 'zeroPool',
        ...FERVOR_OPTIONS.zeroPool,
        label: game.i18n.localize(FERVOR_OPTIONS.zeroPool.label),
        checked: this.fervorSpend.zeroPool || false,
        disabled: false
      });
    }

    return options;
  }

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);

    const html = this.element;

    // Difficulty selector
    html.querySelector('[name="difficulty"]')?.addEventListener('change', (event) => {
      this.difficulty = event.target.value;
      this.render();
    });

    // Modifier input
    html.querySelector('[name="modifier"]')?.addEventListener('change', (event) => {
      this.modifier = parseInt(event.target.value) || 0;
      this.render();
    });

    // Target Threshold input
    html.querySelector('[name="targetThreshold"]')?.addEventListener('change', (event) => {
      const value = event.target.value;
      this.targetThreshold = value ? parseInt(value) : null;
      this.render();
    });

    // Zeal checkboxes
    html.querySelectorAll('.zeal-option input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (event) => {
        const key = event.target.dataset.zealOption;
        this.fervorSpend[key] = event.target.checked;

        // Auto success is exclusive - uncheck others
        if (key === 'autoSuccess' && event.target.checked) {
          this.fervorSpend.difficultyShift = false;
          this.fervorSpend.bonusDice = false;
          this.fervorSpend.zeroPool = false;
        }
        // If checking another option, uncheck auto success
        else if (event.target.checked && key !== 'autoSuccess') {
          this.fervorSpend.autoSuccess = false;
        }

        this.render();
      });
    });
  }

  /**
   * Execute the roll.
   * @private
   */
  async #executeRoll() {
    this._rolled = true;

    // Handle Auto Success
    if (this.fervorSpend.autoSuccess) {
      // Spend 5 Zeal
      if (this.actor) {
        await spendFervor(this.actor, 5);
      }

      // Create auto-success result
      const result = {
        pool: this.poolData.total + this.modifier,
        difficulty: DIFFICULTY_TIERS[this.difficulty],
        roll: null,
        hits: this.targetThreshold ? this.targetThreshold + 3 : 6, // Guaranteed critical
        targetThreshold: this.targetThreshold,
        degree: {
          key: 'criticalSuccess',
          label: 'AOA.Roll.CriticalSuccess',
          cssClass: 'critical-success',
          margin: 3
        },
        margin: 3,
        isAutoSuccess: true,
        fervorSpend: { autoSuccess: true }
      };

      await sendRollToChat({
        actor: this.actor,
        result,
        poolData: this.poolData,
        title: this.rollTitle,
        rollType: this.rollType
      });

      this.resolve(result);
      return;
    }

    // Calculate total Zeal cost and spend
    let fervorCost = 0;
    if (this.fervorSpend.difficultyShift) fervorCost += 1;
    if (this.fervorSpend.bonusDice) fervorCost += 3;
    if (this.fervorSpend.zeroPool) fervorCost += 1;

    if (fervorCost > 0 && this.actor) {
      await spendFervor(this.actor, fervorCost);
    }

    // Calculate effective values
    const bonusDice = this.fervorSpend.bonusDice ? 3 : 0;
    const effectivePool = this.poolData.total + this.modifier + bonusDice;
    const effectiveDifficulty = this.fervorSpend.difficultyShift
      ? shiftDifficulty(this.difficulty, -1)
      : this.difficulty;

    // Perform the roll
    const result = await rollThresholdCompression({
      pool: effectivePool,
      difficulty: effectiveDifficulty,
      targetThreshold: this.targetThreshold,
      fervorSpend: this.fervorSpend
    });

    // Send to chat
    const finalPoolData = {
      ...this.poolData,
      modifier: this.poolData.modifier + this.modifier,
      bonusDice,
      total: effectivePool
    };

    await sendRollToChat({
      actor: this.actor,
      result,
      poolData: finalPoolData,
      title: this.rollTitle,
      rollType: this.rollType
    });

    this.resolve(result);
  }

  /** @override */
  async close(options = {}) {
    // Resolve with null if cancelled (not rolled)
    if (!this._rolled) {
      this.resolve(null);
    }
    return super.close(options);
  }
}

/**
 * Show a post-roll dialog for Zeal reroll option.
 * @param {Actor} actor - The actor
 * @param {Object} result - The roll result
 * @returns {Promise<Object>} Final result (original or rerolled)
 */
export async function showRerollDialog(actor, result) {
  if (!canSpendFervor(actor, 2)) {
    return result;
  }

  const rerollChoice = await foundry.applications.api.DialogV2.confirm({
    window: { title: game.i18n.localize('AOA.Zeal.Reroll') },
    content: `
      <p>${game.i18n.localize('AOA.Zeal.RerollPrompt')}</p>
      <p><strong>${game.i18n.localize('AOA.Roll.Hits')}:</strong> ${result.hits}</p>
      <p><strong>${game.i18n.localize('AOA.Zeal.Cost')}:</strong> 2</p>
    `,
    yes: {
      label: game.i18n.localize('AOA.Zeal.Reroll'),
      icon: 'fas fa-dice'
    },
    no: {
      label: game.i18n.localize('AOA.Common.Cancel'),
      icon: 'fas fa-times'
    }
  });

  if (rerollChoice) {
    await spendFervor(actor, 2);
    return reroll(result);
  }

  return result;
}
