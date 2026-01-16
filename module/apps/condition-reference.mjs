/**
 * Condition Reference Panel
 * A reference dialog showing all conditions and their effects.
 * Can be used to apply conditions to a target actor.
 */

import { WOR } from '../helpers/config.mjs';
import { applyCondition } from '../helpers/conditions.mjs';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ConditionReferencePanel extends HandlebarsApplicationMixin(ApplicationV2) {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    id: 'condition-reference-panel',
    classes: ['wor', 'weight-of-ruin', 'condition-reference'],
    tag: 'div',
    position: {
      width: 650,
      height: 'auto'
    },
    window: {
      title: 'WOR.Condition.Reference',
      icon: 'fas fa-book-medical',
      resizable: true,
      minimizable: true
    },
    actions: {
      applyCondition: ConditionReferencePanel.#onApplyCondition,
      toggleDetails: ConditionReferencePanel.#onToggleDetails
    }
  };

  /** @inheritdoc */
  static PARTS = {
    main: {
      template: 'systems/weight-of-ruin/templates/apps/condition-reference.hbs'
    }
  };

  /**
   * Optional target actor for condition application
   * @type {Actor|null}
   */
  #targetActor = null;

  /**
   * Create a new Condition Reference Panel
   * @param {Object} [options={}] - Application options
   * @param {Actor} [options.targetActor] - Optional actor to apply conditions to
   */
  constructor(options = {}) {
    super(options);
    this.#targetActor = options.targetActor ?? null;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Build condition data with localized strings
    const conditions = [];
    for (const [id, condition] of Object.entries(WOR.conditions)) {
      const conditionData = {
        id,
        label: game.i18n.localize(condition.label),
        description: game.i18n.localize(condition.description),
        icon: condition.icon,
        effects: this.#formatEffects(condition),
        modifiers: this.#formatModifiers(condition.modifiers),
        flags: this.#formatFlags(condition.flags),
        hasDetails: Object.keys(condition.modifiers ?? {}).length > 0 ||
                   Object.keys(condition.flags ?? {}).length > 0 ||
                   (condition.effects?.length ?? 0) > 0
      };
      conditions.push(conditionData);
    }

    // Sort alphabetically by label
    conditions.sort((a, b) => a.label.localeCompare(b.label));

    context.conditions = conditions;
    context.hasTarget = !!this.#targetActor;
    context.targetName = this.#targetActor?.name ?? null;

    return context;
  }

  /* -------------------------------------------- */

  /**
   * Format Active Effect changes for display
   * @param {Object} condition - The condition definition
   * @returns {Array} Formatted effect descriptions
   */
  #formatEffects(condition) {
    if (!condition.effects?.length) return [];

    return condition.effects.map(effect => {
      // Translate the key to a readable name
      const keyParts = effect.key.split('.');
      const lastPart = keyParts[keyParts.length - 1];

      let description = '';
      const modeMap = {
        1: 'Multiply',
        2: 'Add',
        3: 'Downgrade',
        4: 'Upgrade',
        5: 'Override'
      };

      const modeName = modeMap[effect.mode] ?? 'Modify';
      description = `${modeName} ${lastPart}: ${effect.value}`;

      return description;
    });
  }

  /**
   * Format modifiers for display
   * @param {Object} modifiers - The condition modifiers
   * @returns {Array} Formatted modifier descriptions
   */
  #formatModifiers(modifiers) {
    if (!modifiers || Object.keys(modifiers).length === 0) return [];

    const formatted = [];
    const modifierLabels = {
      attack: 'WOR.Modifier.Attack',
      defense: 'WOR.Modifier.Defense',
      defenseMelee: 'WOR.Modifier.DefenseMelee',
      defenseRanged: 'WOR.Modifier.DefenseRanged',
      physical: 'WOR.Modifier.Physical',
      allRolls: 'WOR.Modifier.AllRolls',
      awarenessHearing: 'WOR.Modifier.AwarenessHearing',
      attackFromHiding: 'WOR.Modifier.AttackFromHiding'
    };

    for (const [key, value] of Object.entries(modifiers)) {
      const label = modifierLabels[key] ? game.i18n.localize(modifierLabels[key]) : key;
      const sign = value > 0 ? '+' : '';
      formatted.push({
        label,
        value: `${sign}${value}`,
        isPositive: value > 0,
        isNegative: value < 0
      });
    }

    return formatted;
  }

  /**
   * Format condition flags for display
   * @param {Object} flags - The condition flags
   * @returns {Array} Formatted flag descriptions
   */
  #formatFlags(flags) {
    if (!flags || Object.keys(flags).length === 0) return [];

    const formatted = [];
    const flagDescriptions = {
      endOfTurnDamage: 'WOR.Condition.Flag.EndOfTurnDamage',
      cannotSee: 'WOR.Condition.Flag.CannotSee',
      cannotHear: 'WOR.Condition.Flag.CannotHear',
      cannotMove: 'WOR.Condition.Flag.CannotMove',
      cannotAct: 'WOR.Condition.Flag.CannotAct',
      cannotAttackSource: 'WOR.Condition.Flag.CannotAttackSource',
      socialAdvantage: 'WOR.Condition.Flag.SocialAdvantage',
      attacksAreTrivial: 'WOR.Condition.Flag.AttacksAreTrivial',
      attackersGainBonus: 'WOR.Condition.Flag.AttackersGainBonus',
      mustMoveAway: 'WOR.Condition.Flag.MustMoveAway',
      invisible: 'WOR.Condition.Flag.Invisible',
      lostOnAttack: 'WOR.Condition.Flag.LostOnAttack',
      standUpCost: 'WOR.Condition.Flag.StandUpCost',
      loseActions: 'WOR.Condition.Flag.LoseActions',
      isDefenseless: 'WOR.Condition.Flag.IsDefenseless',
      autoProne: 'WOR.Condition.Flag.AutoProne',
      deathSaves: 'WOR.Condition.Flag.DeathSaves',
      isDead: 'WOR.Condition.Flag.IsDead',
      crisisState: 'WOR.Condition.Flag.CrisisState'
    };

    for (const [key, value] of Object.entries(flags)) {
      if (value === false) continue; // Skip false flags

      let description = flagDescriptions[key] ? game.i18n.localize(flagDescriptions[key]) : key;

      // If the value is a number, include it in the description
      if (typeof value === 'number' && value !== 1) {
        description = game.i18n.format(description, { value });
      }

      formatted.push(description);
    }

    return formatted;
  }

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle applying a condition to the target actor
   * @param {PointerEvent} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   */
  static async #onApplyCondition(event, target) {
    event.preventDefault();
    const conditionId = target.dataset.conditionId;

    if (!this.#targetActor) {
      ui.notifications.warn(game.i18n.localize('WOR.Condition.NoTarget'));
      return;
    }

    // Ask for duration
    const duration = await this.#promptDuration(conditionId);
    if (duration === false) return; // Cancelled

    await applyCondition(this.#targetActor, conditionId, {
      duration: duration > 0 ? duration : null
    });

    ui.notifications.info(game.i18n.format('WOR.Condition.Applied', {
      condition: game.i18n.localize(WOR.conditions[conditionId].label),
      actor: this.#targetActor.name
    }));
  }

  /**
   * Toggle visibility of condition details
   * @param {PointerEvent} event - The triggering event
   * @param {HTMLElement} target - The clicked element
   */
  static #onToggleDetails(event, target) {
    const item = target.closest('.condition-entry');
    const details = item?.querySelector('.condition-details');
    if (details) {
      details.classList.toggle('collapsed');
      target.classList.toggle('expanded');
    }
  }

  /**
   * Prompt user for condition duration
   * @param {string} conditionId - The condition being applied
   * @returns {Promise<number|false>} Duration in rounds, 0 for indefinite, or false if cancelled
   */
  async #promptDuration(conditionId) {
    const condition = WOR.conditions[conditionId];

    return foundry.applications.api.DialogV2.prompt({
      window: {
        title: game.i18n.format('WOR.Condition.SetDuration', {
          condition: game.i18n.localize(condition.label)
        }),
        icon: 'fas fa-clock'
      },
      content: `
        <form class="condition-duration-form">
          <div class="form-group">
            <label>${game.i18n.localize('WOR.Condition.Duration')}</label>
            <div class="form-fields">
              <input type="number" name="duration" value="0" min="0" max="100" step="1"/>
              <span class="hint">${game.i18n.localize('WOR.Condition.DurationHint')}</span>
            </div>
          </div>
        </form>
      `,
      ok: {
        label: game.i18n.localize('WOR.Common.Apply'),
        icon: 'fas fa-check',
        callback: (event, button, dialog) => {
          const form = dialog.element.querySelector('form');
          const duration = parseInt(form.querySelector('[name="duration"]').value) || 0;
          return duration;
        }
      },
      rejectClose: false
    });
  }

  /* -------------------------------------------- */
  /*  Static Methods                              */
  /* -------------------------------------------- */

  /**
   * Open the condition reference panel, optionally with a target actor
   * @param {Actor} [targetActor] - Optional actor to apply conditions to
   * @returns {ConditionReferencePanel}
   */
  static open(targetActor = null) {
    const existing = Object.values(ui.windows).find(w => w.id === 'condition-reference-panel');
    if (existing) {
      existing.#targetActor = targetActor;
      existing.render(true);
      return existing;
    }

    return new ConditionReferencePanel({ targetActor }).render(true);
  }
}
