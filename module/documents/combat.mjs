/**
 * The Weight of Ruin - Combat Document
 * Extends Foundry's Combat class to implement Reflex-based initiative.
 */
export class WoRCombat extends Combat {

  /**
   * @override
   * Roll initiative for one or multiple Combatants.
   * Initiative = Reflex (Agility + Awareness)
   * @param {string|string[]} ids - Combatant id or array of ids
   * @param {object} [options={}] - Additional options
   * @param {string|null} [options.formula] - Override formula
   * @param {boolean} [options.updateTurn=true] - Update turn order
   * @param {object} [options.messageOptions={}] - Chat message options
   * @returns {Promise<Combat>}
   */
  async rollInitiative(ids, { formula = null, updateTurn = true, messageOptions = {} } = {}) {
    // Ensure ids is an array
    ids = typeof ids === 'string' ? [ids] : ids;

    // Get the current combatant data
    const updates = [];

    for (const id of ids) {
      const combatant = this.combatants.get(id);
      if (!combatant?.isOwner) continue;

      // Get the actor's Reflex value
      const actor = combatant.actor;
      let reflex = 0;
      let agility = 0;
      let awareness = 0;

      if (actor) {
        // Get attribute values - use system.reflex if available, otherwise calculate
        reflex = actor.system.reflex ?? 0;
        agility = actor.system.getAttributeTotal?.('agility') ?? actor.system.attributes?.agility ?? actor.system.attributes?.agi ?? 0;
        awareness = actor.system.getAttributeTotal?.('awareness') ?? actor.system.attributes?.awareness ?? actor.system.attributes?.awa ?? 0;

        // If reflex wasn't set, calculate it
        if (!reflex) {
          reflex = agility + awareness;
        }
      }

      // Use provided formula or default Reflex-based formula
      // Roll 1d6 + Reflex for initiative
      const rollFormula = formula ?? `1d6 + ${reflex}`;
      const roll = await new Roll(rollFormula).evaluate();

      updates.push({
        _id: id,
        initiative: roll.total
      });

      // Create styled chat message for initiative roll
      await this._createInitiativeMessage(combatant, actor, roll, reflex, agility, awareness, messageOptions);
    }

    // Update combatants with new initiative values
    if (updates.length) {
      await this.updateEmbeddedDocuments('Combatant', updates);
    }

    // Update turn order if needed
    if (updateTurn && this.combatant?.id && ids.includes(this.combatant.id)) {
      await this.update({ turn: this.turns.findIndex(t => t.id === this.combatant.id) });
    }

    return this;
  }

  /**
   * Create a styled chat message for an initiative roll.
   * @param {Combatant} combatant - The combatant
   * @param {Actor} actor - The actor
   * @param {Roll} roll - The initiative roll
   * @param {number} reflex - Reflex value
   * @param {number} agility - Agility value
   * @param {number} awareness - Awareness value
   * @param {object} messageOptions - Additional message options
   * @returns {Promise<ChatMessage>}
   */
  async _createInitiativeMessage(combatant, actor, roll, reflex, agility, awareness, messageOptions = {}) {
    const speaker = ChatMessage.getSpeaker({
      actor: actor,
      token: combatant.token,
      alias: combatant.name
    });

    // Render the custom initiative card template
    const content = await foundry.applications.handlebars.renderTemplate(
      'systems/weight-of-ruin/templates/chat/initiative-card.hbs',
      {
        actor: {
          name: combatant.name,
          img: actor?.img ?? combatant.img ?? 'icons/svg/mystery-man.svg'
        },
        roll: {
          total: roll.total,
          dice: roll.dice[0]?.results?.map(r => r.result) ?? [],
          formula: roll.formula
        },
        reflex,
        agility,
        awareness
      }
    );

    const messageData = foundry.utils.mergeObject({
      speaker,
      content,
      rolls: [roll],
      flags: { 'weight-of-ruin': { initiativeRoll: true } }
    }, messageOptions);

    return ChatMessage.create(messageData);
  }

  /**
   * @override
   * Get the default initiative formula for the system.
   * @returns {string}
   */
  _getInitiativeFormula(combatant) {
    const actor = combatant.actor;
    if (!actor) return '1d6';

    // Use system.reflex if available, otherwise calculate from attributes
    let reflex = actor.system.reflex ?? 0;
    if (!reflex) {
      const agility = actor.system.getAttributeTotal?.('agility') ?? actor.system.attributes?.agility ?? actor.system.attributes?.agi ?? 0;
      const awareness = actor.system.getAttributeTotal?.('awareness') ?? actor.system.attributes?.awareness ?? actor.system.attributes?.awa ?? 0;
      reflex = agility + awareness;
    }

    return `1d6 + ${reflex}`;
  }
}

/**
 * The Weight of Ruin - Combatant Document
 * Extends Foundry's Combatant class for any combatant-specific behavior.
 */
export class WoRCombatant extends Combatant {

  /**
   * Get the initiative formula for this specific combatant.
   * @returns {Roll}
   */
  getInitiativeRoll() {
    const actor = this.actor;
    if (!actor) return new Roll('1d6');

    // Use system.reflex if available, otherwise calculate
    let reflex = actor.system.reflex ?? 0;
    if (!reflex) {
      const agility = actor.system.getAttributeTotal?.('agility') ?? actor.system.attributes?.agility ?? actor.system.attributes?.agi ?? 0;
      const awareness = actor.system.getAttributeTotal?.('awareness') ?? actor.system.attributes?.awareness ?? actor.system.attributes?.awa ?? 0;
      reflex = agility + awareness;
    }

    return new Roll(`1d6 + ${reflex}`);
  }

  /**
   * Get the combatant's Reflex value for display.
   * @returns {number}
   */
  get reflex() {
    const actor = this.actor;
    if (!actor) return 0;

    // Use system.reflex if available, otherwise calculate
    let reflex = actor.system.reflex ?? 0;
    if (!reflex) {
      const agility = actor.system.getAttributeTotal?.('agility') ?? actor.system.attributes?.agility ?? actor.system.attributes?.agi ?? 0;
      const awareness = actor.system.getAttributeTotal?.('awareness') ?? actor.system.attributes?.awareness ?? actor.system.attributes?.awa ?? 0;
      reflex = agility + awareness;
    }
    return reflex;
  }
}
