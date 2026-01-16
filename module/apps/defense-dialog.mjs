/**
 * Defense Roll Dialog Application
 * Allows defenders to configure defense rolls with buy options
 */

import {
  FERVOR_OPTIONS,
  canSpendFervor
} from '../helpers/dice.mjs';

import {
  buildDefensePool,
  getBuyOptions,
  canUseBuyOption,
  rollDefense,
  sendDefenseToChat,
  isFullDefenseActive,
  FULL_DEFENSE_BONUS,
  BUY_OPTION_PENALTY_PER_USE
} from '../helpers/defense.mjs';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Defense Roll Dialog
 * Extends ApplicationV2 with HandlebarsApplicationMixin for proper template rendering
 */
export class WoRDefenseDialog extends HandlebarsApplicationMixin(ApplicationV2) {

  /**
   * Create and show the defense dialog.
   * @param {Object} options - Dialog options
   * @param {Actor} options.actor - The defending actor
   * @returns {Promise<Object|null>} Defense roll result or null if cancelled
   */
  static async create({ actor }) {
    return new Promise((resolve) => {
      const dialog = new WoRDefenseDialog({ actor, resolve });
      dialog.render(true);
    });
  }

  constructor({ actor, resolve }) {
    super({});
    this.actor = actor;
    this.buyOption = 'none';
    this.modifier = 0;
    this.fervorSpend = {};
    this.resolve = resolve;
    this._rolled = false;
  }

  /** @override */
  static DEFAULT_OPTIONS = {
    id: 'defense-dialog',
    classes: ['wor', 'weight-of-ruin', 'defense-dialog'],
    tag: 'form',
    form: {
      handler: WoRDefenseDialog.#onFormSubmit,
      closeOnSubmit: false
    },
    position: {
      width: 450,
      height: 'auto'
    },
    window: {
      title: 'AOA.Defense.Title',
      icon: 'fas fa-shield-alt',
      resizable: false
    },
    actions: {
      roll: WoRDefenseDialog.#onRoll,
      cancel: WoRDefenseDialog.#onCancel,
      selectBuyOption: WoRDefenseDialog.#onSelectBuyOption
    }
  };

  /** @override */
  static PARTS = {
    content: {
      template: 'systems/weight-of-ruin/templates/apps/defense-dialog.hbs',
      scrollable: ['.defense-dialog-content']
    },
    footer: {
      template: 'templates/generic/form-footer.hbs'
    }
  };

  /** @override */
  async _prepareContext() {
    const currentFervor = this.actor?.system?.zeal?.current ?? 0;
    const buyOptions = getBuyOptions(this.actor);
    const canBuy = canUseBuyOption(this.actor, this.buyOption);

    // Build pool with current options
    const poolData = buildDefensePool(this.actor, this.buyOption, this.modifier);

    // Calculate effective pool with fervor
    let effectivePool = poolData.total;
    if (this.fervorSpend.bonusDice) effectivePool += 3;

    // Check for zero pool
    const isZeroPool = effectivePool <= 0;
    const canAttemptZeroPool = isZeroPool && canSpendFervor(this.actor, 1);

    // Full Defense status
    const fullDefenseActive = isFullDefenseActive(this.actor);

    return {
      actor: this.actor,
      poolData,
      effectivePool,
      isZeroPool,
      canAttemptZeroPool,

      // Full Defense
      fullDefenseActive,
      fullDefenseBonus: FULL_DEFENSE_BONUS,

      // Buy options - show penalty info
      buyOptions: buyOptions.map(opt => ({
        ...opt,
        selected: opt.key === this.buyOption,
        penaltyText: opt.hasPenalty ? `(-${opt.usagePenalty})` : null
      })),
      canBuy,
      buyWarning: !canBuy && this.buyOption !== 'none',
      buyPenaltyPerUse: BUY_OPTION_PENALTY_PER_USE,

      // Modifier
      modifier: this.modifier,

      // Fervor options
      currentFervor,
      fervorOptions: this._getFervorOptions(currentFervor, effectivePool),
      fervorSpend: this.fervorSpend,

      // Footer buttons
      buttons: [
        {
          type: 'button',
          action: 'roll',
          icon: 'fas fa-shield-alt',
          label: 'AOA.Combat.RollDefense',
          cssClass: 'default'
        },
        {
          type: 'button',
          action: 'cancel',
          icon: 'fas fa-times',
          label: 'AOA.Common.Cancel'
        }
      ]
    };
  }

  /**
   * Get available Fervor options for display.
   * Note: Difficulty shift is not available for defense rolls (always Standard)
   */
  _getFervorOptions(currentFervor, pool) {
    const options = [];

    // Bonus Dice (3 Fervor)
    if (currentFervor >= 3) {
      options.push({
        key: 'bonusDice',
        ...FERVOR_OPTIONS.bonusDice,
        label: game.i18n.localize(FERVOR_OPTIONS.bonusDice.label),
        checked: this.fervorSpend.bonusDice || false,
        disabled: false
      });
    }

    // Auto Success (5 Fervor)
    if (currentFervor >= 5) {
      options.push({
        key: 'autoSuccess',
        ...FERVOR_OPTIONS.autoSuccess,
        label: game.i18n.localize(FERVOR_OPTIONS.autoSuccess.label),
        checked: this.fervorSpend.autoSuccess || false,
        disabled: false
      });
    }

    // Zero Pool (1 Fervor) - only if pool is 0
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

    // Buy option radio buttons
    html.querySelectorAll('input[name="buyOption"]').forEach(radio => {
      radio.addEventListener('change', (event) => {
        this.buyOption = event.target.value;
        this.render();
      });
    });

    // Modifier input
    html.querySelector('[name="modifier"]')?.addEventListener('change', (event) => {
      this.modifier = parseInt(event.target.value) || 0;
      this.render();
    });

    // Fervor checkboxes
    html.querySelectorAll('.fervor-option input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (event) => {
        const key = event.target.dataset.fervorOption;
        this.fervorSpend[key] = event.target.checked;

        // Auto success is exclusive - uncheck others
        if (key === 'autoSuccess' && event.target.checked) {
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
   * Form submission handler (does nothing, we use action buttons)
   */
  static #onFormSubmit(event, form, formData) {
    // Prevent default form submission
    event.preventDefault();
  }

  /**
   * Roll button action handler
   */
  static async #onRoll(event, target) {
    await this.#executeRoll();
    this.close();
  }

  /**
   * Cancel button action handler
   */
  static #onCancel(event, target) {
    this.close();
  }

  /**
   * Buy option selection handler
   */
  static #onSelectBuyOption(event, target) {
    this.buyOption = target.dataset.option;
    this.render();
  }

  /**
   * Execute the defense roll.
   * @private
   */
  async #executeRoll() {
    this._rolled = true;

    // Perform the defense roll (always Standard difficulty)
    const result = await rollDefense({
      actor: this.actor,
      buyOption: this.buyOption,
      modifier: this.modifier,
      difficulty: 'standard',
      fervorSpend: this.fervorSpend
    });

    // Send to chat
    await sendDefenseToChat({
      actor: this.actor,
      result
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
