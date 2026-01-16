import {
  rollSkill,
  rollAttribute,
  rollPool,
  rollWounds,
  buildPool,
  buildSkillPool
} from '../helpers/dice.mjs';
import { rollAttack as rollCombatAttack } from '../helpers/combat.mjs';
import {
  hasCondition,
  applyCondition,
  removeCondition,
  updateHealthConditions
} from '../helpers/conditions.mjs';

/**
 * Extend the base Actor document for the The Weight of Ruin system.
 * @extends {Actor}
 */
export class WoRActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
    // The DataModel handles base data through its schema.
  }

  /**
   * @override
   * Augment the actor source data with additional dynamic data.
   * DataModels handle most derived data through getters, but we can
   * add additional processing here if needed.
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags['weight-of-ruin'] || {};

    // Call DataModel's prepareDerivedData if it exists
    if (typeof systemData.prepareDerivedData === 'function') {
      systemData.prepareDerivedData();
    }

    // Process embedded items to aggregate values
    this._prepareEmbeddedItemData();

    // Type-specific preparations
    switch (actorData.type) {
      case 'character':
        this._prepareCharacterData(actorData);
        break;
      case 'npc':
        this._prepareNpcData(actorData);
        break;
      case 'creature':
        this._prepareCreatureData(actorData);
        break;
    }
  }

  /* -------------------------------------------- */
  /*  Embedded Item Aggregation                   */
  /* -------------------------------------------- */

  /**
   * Process embedded items to calculate aggregate values.
   * Skills, talents, equipment, spells, etc.
   */
  _prepareEmbeddedItemData() {
    // Initialize aggregation containers
    this._skills = {};
    this._talents = [];
    this._weapons = [];
    this._armor = [];
    this._gear = [];
    this._spells = [];
    this._rituals = [];
    this._equippedWeapons = [];
    this._equippedArmor = [];

    // Aggregate by type
    for (const item of this.items) {
      switch (item.type) {
        case 'skill':
          this._aggregateSkill(item);
          break;
        case 'talent':
          this._talents.push(item);
          break;
        case 'weapon':
          this._weapons.push(item);
          if (item.system.equipped) {
            this._equippedWeapons.push(item);
          }
          break;
        case 'armor':
          this._armor.push(item);
          if (item.system.equipped) {
            this._equippedArmor.push(item);
          }
          break;
        case 'gear':
          this._gear.push(item);
          break;
        case 'spell':
          this._spells.push(item);
          break;
        case 'ritual':
          this._rituals.push(item);
          break;
        case 'lineage':
          // Sync baseSpeed from lineage item to actor
          if (item.system.baseSpeed !== undefined) {
            this.system.baseSpeed = item.system.baseSpeed;
          }
          break;
      }
    }

    // Calculate derived values from aggregated items
    this._calculateArmorValues();
    this._calculateEncumbrance();
  }

  /**
   * Aggregate a single skill item into the skills object.
   * @param {Item} skill - The skill item
   */
  _aggregateSkill(skill) {
    const key = skill.name.toLowerCase().replace(/\s+/g, '');
    this._skills[key] = {
      id: skill.id,
      name: skill.name,
      rank: skill.system.totalRank ?? skill.system.rank ?? 0,
      attribute: skill.system.attribute,
      category: skill.system.category,
      requiresWitchsight: skill.system.requiresWitchsight ?? false,
      item: skill,
      gated: false,
      usable: true
    };
  }

  /**
   * Calculate total armor DR and defense modifiers from equipped armor.
   * DR Stacking Rules:
   * - Layered armor (underlayer + outerlayer): Highest DR + half of additional layer (rounded down)
   * - Reinforcements: Add directly without halving
   * - Shields: Don't add to passive DR (used for active blocking)
   */
  _calculateArmorValues() {
    let totalDefenseModifier = 0;
    let totalMovementPenalty = 0;

    // Initialize S/P/B DR tracking
    const drByType = { slash: 0, pierce: 0, blunt: 0 };

    // Categorize equipped armor
    let underlayer = null;
    let outerlayer = null;
    const reinforcements = [];
    let shield = null;

    for (const armor of this._equippedArmor) {
      const category = armor.system.armorCategory;

      if (category === 'underlayer') {
        underlayer = armor;
      } else if (category === 'outerlayer') {
        outerlayer = armor;
      } else if (category === 'reinforcement') {
        reinforcements.push(armor);
      } else if (category === 'shield') {
        shield = armor;
      }

      // Accumulate defense modifier and movement penalty from all armor
      totalDefenseModifier += armor.system.totalDefenseModifier ?? armor.system.defenseModifier ?? 0;
      if (armor.system.cumbersome) {
        totalMovementPenalty += 1;
      }
    }

    // Calculate layered armor DR for each damage type
    for (const type of ['slash', 'pierce', 'blunt']) {
      let layeredDR = 0;

      // Get DR values from underlayer and outerlayer
      const underlayerDR = underlayer?.system.totalDR?.[type] ?? underlayer?.system.dr?.[type] ?? 0;
      const outerlayerDR = outerlayer?.system.totalDR?.[type] ?? outerlayer?.system.dr?.[type] ?? 0;

      if (underlayer && outerlayer) {
        // Both layers equipped: highest + half of lower (rounded down)
        const higherDR = Math.max(underlayerDR, outerlayerDR);
        const lowerDR = Math.min(underlayerDR, outerlayerDR);
        layeredDR = higherDR + Math.floor(lowerDR / 2);
      } else {
        // Only one layer or none
        layeredDR = underlayerDR + outerlayerDR;
      }

      // Add reinforcement DR directly (no halving)
      let reinforcementDR = 0;
      for (const reinf of reinforcements) {
        reinforcementDR += reinf.system.totalDR?.[type] ?? reinf.system.dr?.[type] ?? 0;
      }

      drByType[type] = layeredDR + reinforcementDR;
    }

    // Store calculated values
    this._armorDR = drByType;
    this._armorDefenseModifier = totalDefenseModifier;
    this._armorMovementPenalty = totalMovementPenalty;

    // Store shield separately for block actions
    this._equippedShield = shield;
  }

  /**
   * Calculate total encumbrance from carried gear.
   */
  _calculateEncumbrance() {
    let totalWeight = 0;

    for (const item of [...this._weapons, ...this._armor, ...this._gear]) {
      if (item.system.carried !== false) {
        if (item.type === 'gear') {
          totalWeight += item.system.totalWeight ?? (item.system.weight * item.system.quantity) ?? 0;
        } else {
          totalWeight += item.system.weight ?? 0;
        }
      }
    }

    this._encumbrance = totalWeight;
  }

  /* -------------------------------------------- */
  /*  Type-Specific Preparation                   */
  /* -------------------------------------------- */

  /**
   * Prepare Character type specific data.
   */
  _prepareCharacterData(actorData) {
    // Gate Thaumaturgy skills based on Witchsight
    this._gateThaumaturgySkills();

    // Sort skills by category for display
    this._sortSkillsByCategory();
  }

  /**
   * Gate Thaumaturgy skills based on Witchsight value.
   */
  _gateThaumaturgySkills() {
    const hasWitchsight = (this.system.witchsight ?? 0) > 0;

    for (const [key, skill] of Object.entries(this._skills)) {
      if (skill.requiresWitchsight) {
        skill.gated = !hasWitchsight;
        skill.usable = hasWitchsight;
      }
    }
  }

  /**
   * Sort skills into category groups for display.
   */
  _sortSkillsByCategory() {
    this._skillsByCategory = {
      martial: [],
      physical: [],
      social: [],
      knowledge: [],
      craft: [],
      thaumaturgy: []
    };

    for (const [key, skill] of Object.entries(this._skills)) {
      const category = skill.category?.toLowerCase() ?? 'physical';
      if (this._skillsByCategory[category]) {
        this._skillsByCategory[category].push(skill);
      }
    }

    // Sort each category alphabetically
    for (const category of Object.keys(this._skillsByCategory)) {
      this._skillsByCategory[category].sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    // NPC-specific preparations
    this._gateThaumaturgySkills();
  }

  /**
   * Prepare Creature type specific data.
   */
  _prepareCreatureData(actorData) {
    // Creature-specific preparations
    this._gateThaumaturgySkills();
  }

  /* -------------------------------------------- */
  /*  Getters - Item Aggregation                  */
  /* -------------------------------------------- */

  /** Get aggregated skills object */
  get skills() {
    return this._skills ?? {};
  }

  /** Get skills organized by category */
  get skillsByCategory() {
    return this._skillsByCategory ?? {};
  }

  /** Get all talent items */
  get talents() {
    return this._talents ?? [];
  }

  /** Get all weapon items */
  get weapons() {
    return this._weapons ?? [];
  }

  /** Get equipped weapon items */
  get equippedWeapons() {
    return this._equippedWeapons ?? [];
  }

  /** Get all armor items */
  get armor() {
    return this._armor ?? [];
  }

  /** Get equipped armor items */
  get equippedArmor() {
    return this._equippedArmor ?? [];
  }

  /** Get all gear items */
  get gear() {
    return this._gear ?? [];
  }

  /** Get all spell items */
  get spells() {
    return this._spells ?? [];
  }

  /** Get all ritual items */
  get rituals() {
    return this._rituals ?? [];
  }

  /* -------------------------------------------- */
  /*  Getters - Derived Values                    */
  /* -------------------------------------------- */

  /** Get total armor DR as object {slash, pierce, blunt} */
  get armorDR() {
    return this._armorDR ?? { slash: 0, pierce: 0, blunt: 0 };
  }

  /** Get armor DR display string (S/P/B format) */
  get armorDRDisplay() {
    const dr = this.armorDR;
    return `${dr.slash}/${dr.pierce}/${dr.blunt}`;
  }

  /** Get equipped shield (if any) */
  get equippedShield() {
    return this._equippedShield ?? null;
  }

  /** Get equipped underlayer armor (if any) */
  get equippedUnderlayer() {
    return this._equippedArmor?.find(a => a.system.armorCategory === 'underlayer') ?? null;
  }

  /** Get equipped outerlayer armor (if any) */
  get equippedOuterlayer() {
    return this._equippedArmor?.find(a => a.system.armorCategory === 'outerlayer') ?? null;
  }

  /** Get equipped reinforcement pieces */
  get equippedReinforcements() {
    return this._equippedArmor?.filter(a => a.system.armorCategory === 'reinforcement') ?? [];
  }

  /** Get total armor defense modifier */
  get armorDefenseModifier() {
    return this._armorDefenseModifier ?? 0;
  }

  /** Get armor movement penalty */
  get armorMovementPenalty() {
    return this._armorMovementPenalty ?? 0;
  }

  /** Get total defense including armor */
  get totalDefense() {
    const baseDefense = this.system.defense ?? 10;
    return baseDefense + this.armorDefenseModifier;
  }

  /** Get effective movement (base - armor penalty) */
  get effectiveMovement() {
    const baseMovement = this.system.movement ?? 5;
    return Math.max(0, baseMovement - this.armorMovementPenalty);
  }

  /** Get current encumbrance */
  get encumbrance() {
    return this._encumbrance ?? 0;
  }

  /* -------------------------------------------- */
  /*  Helper Methods - Data Access                */
  /* -------------------------------------------- */

  /**
   * Get a specific skill by name.
   * @param {string} skillName - Name of the skill
   * @returns {Object|null} Skill data or null
   */
  getSkill(skillName) {
    const key = skillName.toLowerCase().replace(/\s+/g, '');
    return this._skills?.[key] ?? null;
  }

  /**
   * Get skill value (rank) by name.
   * @param {string} skillName - Name of the skill
   * @returns {number} Skill rank
   */
  getSkillValue(skillName) {
    const skill = this.getSkill(skillName);
    return skill?.rank ?? 0;
  }

  /**
   * Get attribute value by key.
   * @param {string} attrKey - Attribute key (e.g., 'strength')
   * @returns {number} Attribute value
   */
  getAttributeValue(attrKey) {
    return this.system.attributes?.[attrKey] ?? 0;
  }

  /**
   * Check if the actor can use Thaumaturgy.
   * @returns {boolean}
   */
  canUseThaumaturgy() {
    return (this.system.witchsight ?? 0) > 0;
  }

  /**
   * Check if the actor is at Breaking Point (Trauma > Max Trauma).
   * @returns {boolean}
   */
  isAtBreakingPoint() {
    return this.system.atBreakingPoint ?? false;
  }

  /**
   * Get the Target Threshold from this actor's defense.
   * TT = floor(Defense / 3), minimum 1
   * @returns {number}
   */
  getTargetThreshold() {
    return Math.max(1, Math.floor(this.totalDefense / 3));
  }

  /**
   * Build a dice pool for a skill roll.
   * @param {string} skillName - Name of the skill
   * @param {number} modifier - Additional modifier
   * @returns {number} Total dice pool size
   */
  buildSkillPool(skillName, modifier = 0) {
    const skill = this.getSkill(skillName);
    if (!skill) return Math.max(0, modifier);

    const attributeValue = this.getAttributeValue(skill.attribute);
    const skillRank = skill.rank;

    return Math.max(0, attributeValue + skillRank + modifier);
  }

  /**
   * Build a dice pool for an attribute roll.
   * @param {string} attribute - Attribute key
   * @param {number} modifier - Additional modifier
   * @returns {number} Total dice pool size
   */
  buildAttributePool(attribute, modifier = 0) {
    const attributeValue = this.getAttributeValue(attribute);
    return Math.max(0, attributeValue + modifier);
  }

  /* -------------------------------------------- */
  /*  Roll Methods                                */
  /* -------------------------------------------- */

  /**
   * Roll a skill check.
   * @param {string} skillName - Name of the skill to roll
   * @param {Object} options - Roll options
   * @param {number} [options.modifier=0] - Additional modifier
   * @param {string} [options.difficulty='standard'] - Difficulty tier
   * @param {number} [options.targetThreshold] - Target Threshold
   * @param {boolean} [options.skipDialog=false] - Skip the roll dialog
   * @param {Event} [options.event] - Triggering event (for shift-click)
   * @returns {Promise<Object>} Roll result
   */
  async rollSkill(skillName, options = {}) {
    const skill = this.getSkill(skillName);

    // Check if skill is gated
    if (skill?.gated) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.SkillRequiresWitchsight'));
      return null;
    }

    return rollSkill({
      actor: this,
      skill: skillName,
      ...options
    });
  }

  /**
   * Roll an attribute check.
   * @param {string} attribute - Attribute key to roll
   * @param {Object} options - Roll options
   * @param {number} [options.modifier=0] - Additional modifier
   * @param {string} [options.difficulty='standard'] - Difficulty tier
   * @param {number} [options.targetThreshold] - Target Threshold
   * @param {boolean} [options.skipDialog=false] - Skip the roll dialog
   * @param {Event} [options.event] - Triggering event
   * @returns {Promise<Object>} Roll result
   */
  async rollAttribute(attribute, options = {}) {
    return rollAttribute({
      actor: this,
      attribute,
      ...options
    });
  }

  /**
   * Roll a generic dice pool.
   * @param {number} pool - Number of dice
   * @param {Object} options - Roll options
   * @returns {Promise<Object>} Roll result
   */
  async rollPool(pool, options = {}) {
    return rollPool({
      actor: this,
      pool,
      ...options
    });
  }

  /**
   * Roll a Wounds Roll (when at Breaking Point).
   * Called when taking damage while at Breaking Point (Trauma > Max Trauma).
   * Target Threshold = attacker's net hits from the attack.
   * @param {Object} [options={}] - Roll options
   * @param {number} [options.netHits=1] - Net hits from the attack (hits - TT)
   * @returns {Promise<Object>} Wounds roll result
   */
  async rollWounds(options = {}) {
    return rollWounds(this, options);
  }

  /**
   * Roll an attack with a weapon.
   * @param {string} weaponId - ID of the weapon item
   * @param {Object} options - Roll options
   * @param {Actor} [options.target] - Target actor
   * @param {number} [options.modifier=0] - Additional modifier
   * @param {string} [options.difficulty='standard'] - Difficulty tier
   * @param {boolean} [options.skipDialog=false] - Skip the attack dialog
   * @returns {Promise<Object>} Attack result
   */
  async rollAttack(weaponId, options = {}) {
    const weapon = this.items.get(weaponId);
    if (!weapon || weapon.type !== 'weapon') {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.InvalidWeapon'));
      return null;
    }

    // Get the target from game targeting if not provided
    let target = options.target;
    if (!target && game.user.targets.size > 0) {
      const targetToken = game.user.targets.first();
      target = targetToken?.actor;
    }

    return rollCombatAttack({
      attacker: this,
      weapon,
      target,
      modifier: options.modifier ?? 0,
      difficulty: options.difficulty ?? 'standard',
      skipDialog: options.skipDialog ?? (options.event?.shiftKey ?? false)
    });
  }

  /* -------------------------------------------- */
  /*  Roll Data                                   */
  /* -------------------------------------------- */

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    // Start with the system data's getRollData if available (from DataModel)
    let data;
    if (typeof this.system.getRollData === 'function') {
      data = this.system.getRollData();
    } else {
      data = { ...super.getRollData() };
    }

    // Add skills to roll data
    data.skills = {};
    for (const [key, skill] of Object.entries(this._skills ?? {})) {
      data.skills[key] = skill.rank;
    }

    // Add armor values
    data.armor = {
      dr: this.armorDR,
      defenseModifier: this.armorDefenseModifier,
      movementPenalty: this.armorMovementPenalty
    };

    // Add total defense (base + armor)
    if (data.derived) {
      data.derived.totalDefense = this.totalDefense;
      data.derived.effectiveMovement = this.effectiveMovement;
    }

    // Add encumbrance
    data.encumbrance = this.encumbrance;

    // Add item counts
    data.itemCounts = {
      skills: Object.keys(this._skills ?? {}).length,
      talents: this._talents?.length ?? 0,
      weapons: this._weapons?.length ?? 0,
      armor: this._armor?.length ?? 0,
      gear: this._gear?.length ?? 0,
      spells: this._spells?.length ?? 0,
      rituals: this._rituals?.length ?? 0
    };

    return data;
  }

  /* -------------------------------------------- */
  /*  Document Lifecycle                          */
  /* -------------------------------------------- */

  /**
   * @override
   * Perform preliminary operations before a Document of this type is created.
   */
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);

    // Set default actor portrait and token configuration (only if not explicitly provided)
    const defaultImage = 'systems/weight-of-ruin/assets/tokens/default.webp';
    const actorImg = data.img || defaultImage;
    const tokenImg = data.prototypeToken?.texture?.src || actorImg;

    const prototypeToken = {
      texture: { src: tokenImg },
      sight: { enabled: true },
      actorLink: this.type === 'character',
      disposition: this.type === 'character' ? CONST.TOKEN_DISPOSITIONS.FRIENDLY : CONST.TOKEN_DISPOSITIONS.HOSTILE
    };

    this.updateSource({
      img: actorImg,
      prototypeToken
    });
  }

  /**
   * @override
   * Perform preliminary operations before an embedded Item is created.
   */
  async _preCreateDescendantDocuments(parent, collection, documents, data, options, userId) {
    await super._preCreateDescendantDocuments(parent, collection, documents, data, options, userId);

    // Validate items being added
    for (const doc of documents) {
      if (collection === 'items') {
        const validation = this._validateItemAddition(doc);
        if (!validation.valid) {
          ui.notifications.warn(validation.message);
          // Remove invalid item from creation
          const index = documents.indexOf(doc);
          if (index > -1) {
            documents.splice(index, 1);
          }
        }
      }
    }
  }

  /* -------------------------------------------- */
  /*  Validation                                  */
  /* -------------------------------------------- */

  /**
   * Validate whether an item can be added to this actor.
   * @param {Item} item - The item to validate
   * @returns {Object} Validation result with valid boolean and message
   */
  _validateItemAddition(item) {
    // Validate Witchsight-requiring skills
    if (item.type === 'skill' && item.system.requiresWitchsight) {
      if (!this.canUseThaumaturgy()) {
        return {
          valid: false,
          message: game.i18n.format('WOR.Warnings.SkillRequiresWitchsightAdd', { skill: item.name })
        };
      }
    }

    // Validate spells/rituals require Witchsight
    if (['spell', 'ritual'].includes(item.type)) {
      if (!this.canUseThaumaturgy()) {
        return {
          valid: false,
          message: game.i18n.localize('WOR.Warnings.MagicRequiresWitchsight')
        };
      }
    }

    // Validate character creation items only during creation
    if (['lineage', 'background', 'archetype', 'pathway'].includes(item.type)) {
      if (this.type === 'character' && this.system.creation?.complete) {
        return {
          valid: false,
          message: game.i18n.localize('WOR.Warnings.CreationItemAfterComplete')
        };
      }
    }

    // Prevent duplicate lineage/background/archetype/pathway
    if (['lineage', 'background', 'archetype', 'pathway'].includes(item.type)) {
      const existing = this.items.find(i => i.type === item.type);
      if (existing) {
        return {
          valid: false,
          message: game.i18n.format('WOR.Warnings.DuplicateCreationItem', { type: item.type })
        };
      }
    }

    return { valid: true };
  }

  /**
   * Check if attribute value is valid for creation vs advancement.
   * @param {string} attribute - Attribute key
   * @param {number} value - Proposed value
   * @returns {boolean} Whether the value is valid
   */
  isAttributeValueValid(attribute, value) {
    const min = -2;
    const max = this.system.creation?.complete ? 10 : 5;
    return value >= min && value <= max;
  }

  /* -------------------------------------------- */
  /*  Resource Management                         */
  /* -------------------------------------------- */

  /**
   * Modify Trauma on the actor.
   * @param {number} amount - Amount to add (positive) or remove (negative)
   * @returns {Promise<Actor>} Updated actor
   */
  async modifyTrauma(amount) {
    const currentTrauma = this.system.health?.trauma ?? 0;
    const newTrauma = Math.max(0, currentTrauma + amount);
    const maxTrauma = this.system.maxTrauma ?? 3;
    const wasAtBreakingPoint = currentTrauma > maxTrauma;
    const nowAtBreakingPoint = newTrauma > maxTrauma;

    await this.update({ 'system.health.trauma': newTrauma });

    // Update health-related conditions
    await updateHealthConditions(this);

    // Notify if just entered Breaking Point
    if (nowAtBreakingPoint && !wasAtBreakingPoint) {
      ui.notifications.warn(game.i18n.format('WOR.Warnings.EnteredBreakingPoint', { name: this.name }));
    }

    return this;
  }

  /**
   * Modify Essence on the actor (characters only).
   * @param {number} amount - Amount to add (positive) or remove (negative)
   * @returns {Promise<Actor>} Updated actor
   */
  async modifyEssence(amount) {
    if (this.type !== 'character') return this;

    const currentEssence = this.system.essence?.current ?? 10;
    const newEssence = Math.max(0, Math.min(10, currentEssence + amount));

    await this.update({ 'system.essence.current': newEssence });

    // Warn on critical Essence
    if (newEssence <= 2 && newEssence > 0) {
      ui.notifications.warn(game.i18n.format('WOR.Warnings.EssenceCritical', { name: this.name, essence: newEssence }));
    }

    // Warn on Leng transformation
    if (newEssence === 0) {
      ui.notifications.error(game.i18n.format('WOR.Warnings.LengTransformation', { name: this.name }));
    }

    return this;
  }

  /**
   * Modify Fervor on the actor (characters only).
   * @param {number} amount - Amount to add (positive) or remove (negative)
   * @returns {Promise<Actor>} Updated actor
   */
  async modifyFervor(amount) {
    if (this.type !== 'character') return this;

    const currentFervor = this.system.fervor?.current ?? 0;
    const maxFervor = this.system.fervor?.max ?? 5;
    const newFervor = Math.max(0, Math.min(maxFervor, currentFervor + amount));

    await this.update({ 'system.fervor.current': newFervor });

    return this;
  }

  /**
   * Lose Wounds (called when failing a Wounds Roll).
   * @param {number} [amount=1] - Amount of wounds to lose
   * @returns {Promise<Actor>} Updated actor
   */
  async loseWounds(amount = 1) {
    const currentWounds = this.system.health?.wounds?.value ?? 0;
    const newWounds = Math.max(0, currentWounds - amount);

    await this.update({ 'system.health.wounds.value': newWounds });

    // Update health-related conditions (unconscious/dead)
    const stateChanges = await updateHealthConditions(this);

    // Show notifications for state changes
    if (stateChanges.becameUnconscious) {
      ui.notifications.error(game.i18n.format('WOR.Warnings.Unconscious', { name: this.name }));
    }
    if (stateChanges.died) {
      ui.notifications.error(game.i18n.format('WOR.Warnings.Death', { name: this.name }));
    }

    return this;
  }

  /**
   * Reduce Max Trauma by 2 (called after failing a Wounds Roll).
   * This represents accumulated long-term damage.
   * @returns {Promise<Actor>} Updated actor
   */
  async reduceMaxTrauma() {
    const currentReduction = this.system.health?.maxTraumaReduction ?? 0;
    await this.update({ 'system.health.maxTraumaReduction': currentReduction + 2 });
    return this;
  }

  /**
   * Set the stabilized flag on an unconscious actor.
   * @param {boolean} [value=true] - Whether to set stabilized
   * @returns {Promise<Actor>} Updated actor
   */
  async setStabilized(value = true) {
    await this.update({ 'system.health.stabilized': value });
    return this;
  }

  /**
   * Restore Wounds (e.g., after rest or healing).
   * @param {number} [amount] - Amount to restore (defaults to max)
   * @returns {Promise<Actor>} Updated actor
   */
  async restoreWounds(amount) {
    const maxWounds = this.system.maxWounds ?? this.system.baseWounds ?? 3;
    const currentWounds = this.system.health?.wounds?.value ?? 0;
    const toRestore = amount ?? maxWounds;
    const newWounds = Math.min(maxWounds, currentWounds + toRestore);

    await this.update({ 'system.health.wounds.value': newWounds });

    // Clear stabilized flag if regaining wounds
    if (this.system.health?.stabilized) {
      await this.update({ 'system.health.stabilized': false });
    }

    return this;
  }

  /* -------------------------------------------- */
  /*  Recovery Methods                            */
  /* -------------------------------------------- */

  /**
   * Apply rest to recover Trauma.
   * Per wor_core Section 6.7:
   * - Sleep (per 2 hours): Remove 1 Trauma
   * - Full night (8 hours): Maximum 4 Trauma removed
   * - Comfortable rest: Additional 1 Trauma removed
   *
   * @param {Object} [options={}] - Rest options
   * @param {number} [options.hours=2] - Hours of sleep (each 2 hours = 1 Trauma, max 4 from 8 hours)
   * @param {boolean} [options.comfortable=false] - Comfortable conditions (+1 Trauma removed)
   * @returns {Promise<Object>} Recovery result
   */
  async applyRest(options = {}) {
    const { hours = 2, comfortable = false } = options;
    const currentTrauma = this.system.health?.trauma ?? 0;

    // Calculate trauma recovered: 1 per 2 hours, max 4 from 8 hours
    let traumaRecovered = Math.floor(hours / 2);
    traumaRecovered = Math.min(traumaRecovered, 4); // Cap at 4

    // Comfortable rest bonus
    if (comfortable && hours >= 8) {
      traumaRecovered += 1;
    }

    // Can't recover more than current trauma
    traumaRecovered = Math.min(traumaRecovered, currentTrauma);

    if (traumaRecovered > 0) {
      await this.modifyTrauma(-traumaRecovered);
    }

    // Update conditions
    await updateHealthConditions(this);

    // Send chat notification
    const restTypeLabel = hours >= 8
      ? game.i18n.localize('WOR.Recovery.FullNight')
      : game.i18n.format('WOR.Recovery.SleepHours', { hours });

    const content = game.i18n.format('WOR.Recovery.RestResult', {
      name: this.name,
      traumaRecovered,
      restType: restTypeLabel,
      comfortable: comfortable ? ` (${game.i18n.localize('WOR.Recovery.Comfortable')})` : ''
    });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: `<div class="wor recovery-message"><i class="fas fa-bed"></i> ${content}</div>`,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER
    });

    return {
      hours,
      comfortable,
      traumaRecovered,
      newTrauma: currentTrauma - traumaRecovered
    };
  }

  /**
   * Legacy rest method for compatibility.
   * @param {string} restType - Type of rest ('short', 'long', 'full')
   * @returns {Promise<Object>} Recovery result
   */
  async rest(restType = 'short') {
    switch (restType) {
      case 'short':
        return this.applyRest({ hours: 2 });
      case 'long':
        return this.applyRest({ hours: 8 });
      case 'full':
        return this.applyRest({ hours: 8, comfortable: true });
      default:
        return this.applyRest({ hours: 2 });
    }
  }

  /**
   * Apply medical treatment from a healer.
   * Per wor_core Section 6.7:
   * - Medicine Roll (TT 2 by default)
   * - Critical Failure: Patient loses 1 Wound
   * - Failure: Patient gains 1 Trauma
   * - Success (TT 2): Patient removes 2 Trauma
   * - Critical Success: Restore 1 Wound + remove all Trauma
   *
   * @param {Object} rollResult - The medicine roll result from the healer
   * @param {string} rollResult.degree.key - Degree of success key
   * @returns {Promise<Object>} Treatment result
   */
  async applyMedicalTreatment(rollResult) {
    const currentTrauma = this.system.health?.trauma ?? 0;
    const currentWounds = this.system.health?.wounds?.value ?? 0;

    let traumaChange = 0;
    let woundsChange = 0;
    let outcome = '';
    let outcomeIcon = '';

    switch (rollResult.degree?.key) {
      case 'criticalFailure':
        // Patient loses 1 Wound
        woundsChange = -1;
        outcome = 'WOR.Recovery.Treatment.CriticalFailure';
        outcomeIcon = 'fa-skull-crossbones';
        break;
      case 'failure':
        // Patient gains 1 Trauma
        traumaChange = 1;
        outcome = 'WOR.Recovery.Treatment.Failure';
        outcomeIcon = 'fa-times-circle';
        break;
      case 'success':
        // Patient removes 2 Trauma
        traumaChange = -Math.min(2, currentTrauma);
        outcome = 'WOR.Recovery.Treatment.Success';
        outcomeIcon = 'fa-check-circle';
        break;
      case 'criticalSuccess':
        // Restore 1 Wound + remove all Trauma
        woundsChange = 1;
        traumaChange = -currentTrauma;
        outcome = 'WOR.Recovery.Treatment.CriticalSuccess';
        outcomeIcon = 'fa-star';
        break;
      default:
        // Treat unknown as failure
        traumaChange = 1;
        outcome = 'WOR.Recovery.Treatment.Failure';
        outcomeIcon = 'fa-times-circle';
    }

    // Apply changes
    if (traumaChange !== 0) {
      await this.modifyTrauma(traumaChange);
    }
    if (woundsChange !== 0) {
      if (woundsChange > 0) {
        await this.restoreWounds(woundsChange);
      } else {
        await this.loseWounds(-woundsChange);
      }
    }

    // Update conditions
    await updateHealthConditions(this);

    // Send chat notification
    const content = game.i18n.format('WOR.Recovery.TreatmentResult', {
      name: this.name,
      outcome: game.i18n.localize(outcome),
      traumaChange: traumaChange > 0 ? `+${traumaChange}` : traumaChange,
      woundsChange: woundsChange > 0 ? `+${woundsChange}` : woundsChange
    });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: `<div class="wor recovery-message treatment ${rollResult.degree?.key}"><i class="fas ${outcomeIcon}"></i> ${content}</div>`,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER
    });

    return {
      degree: rollResult.degree?.key,
      traumaChange,
      woundsChange,
      newTrauma: currentTrauma + traumaChange,
      newWounds: currentWounds + woundsChange
    };
  }

  /**
   * Apply long-term recovery (1 week bed rest).
   * Per wor_core Section 6.7:
   * - Restore 1 Wound
   * - Restore 2 Max Trauma (reduce maxTraumaReduction by 2)
   *
   * @returns {Promise<Object>} Recovery result
   */
  async applyLongTermRecovery() {
    const currentReduction = this.system.health?.maxTraumaReduction ?? 0;
    const currentWounds = this.system.health?.wounds?.value ?? 0;
    const maxWounds = this.system.maxWounds ?? this.system.baseWounds ?? 3;

    // Restore 1 Wound (up to max)
    const woundsRestored = Math.min(1, maxWounds - currentWounds);
    if (woundsRestored > 0) {
      await this.restoreWounds(woundsRestored);
    }

    // Restore 2 Max Trauma (reduce the reduction)
    const maxTraumaRestored = Math.min(2, currentReduction);
    if (maxTraumaRestored > 0) {
      await this.update({ 'system.health.maxTraumaReduction': currentReduction - maxTraumaRestored });
    }

    // Update conditions
    await updateHealthConditions(this);

    // Send chat notification
    const content = game.i18n.format('WOR.Recovery.LongTermResult', {
      name: this.name,
      woundsRestored,
      maxTraumaRestored
    });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: `<div class="wor recovery-message long-term"><i class="fas fa-hospital"></i> ${content}</div>`,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER
    });

    return {
      woundsRestored,
      maxTraumaRestored
    };
  }

  /**
   * Legacy receiveTreatment for compatibility.
   * @param {Object} options - Treatment options
   * @param {number} [options.traumaHealed=1] - Amount of trauma to heal
   * @param {boolean} [options.restoreWounds=false] - Whether to restore wounds
   * @returns {Promise<Object>} Treatment result
   */
  async receiveTreatment({ traumaHealed = 1, restoreWounds = false } = {}) {
    const currentTrauma = this.system.health?.trauma ?? 0;
    const actualHealed = Math.min(traumaHealed, currentTrauma);

    if (actualHealed > 0) {
      await this.modifyTrauma(-actualHealed);
    }

    if (restoreWounds) {
      await this.restoreWounds();
    }

    // Update conditions
    await updateHealthConditions(this);

    // Send chat notification
    const content = game.i18n.format('WOR.Recovery.TreatmentReceived', {
      name: this.name,
      traumaHealed: actualHealed
    });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: `<div class="wor recovery-message"><i class="fas fa-medkit"></i> ${content}</div>`,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER
    });

    return {
      traumaHealed: actualHealed,
      woundsRestored: restoreWounds,
      newTrauma: currentTrauma - actualHealed
    };
  }

  /**
   * Stabilize an unconscious actor via Medicine check.
   * Sets the stabilized flag to prevent further Wounds Rolls.
   * @returns {Promise<boolean>} Success
   */
  async stabilize() {
    // Can only stabilize if unconscious
    if (!this.system.isUnconscious) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.NotUnconscious'));
      return false;
    }

    // Set stabilized flag
    await this.setStabilized(true);

    // Ensure unconscious condition is applied
    if (!hasCondition(this, 'unconscious')) {
      await applyCondition(this, 'unconscious');
    }

    const content = game.i18n.format('WOR.Recovery.Stabilized', { name: this.name });
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: `<div class="wor recovery-message stabilized"><i class="fas fa-heartbeat"></i> ${content}</div>`,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER
    });

    return true;
  }

  /**
   * Revive an unconscious actor.
   * Requires Wounds > 1 and not at Breaking Point.
   * @returns {Promise<boolean>} Success
   */
  async revive() {
    // Can only revive if wounds > 1 and not at breaking point
    const wounds = this.system.health?.wounds?.value ?? 0;
    const atBreakingPoint = this.system.atBreakingPoint ?? false;

    if (wounds <= 1) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.InsufficientWounds'));
      return false;
    }

    if (atBreakingPoint) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.StillAtBreakingPoint'));
      return false;
    }

    if (hasCondition(this, 'unconscious')) {
      await removeCondition(this, 'unconscious');

      // Clear stabilized flag
      await this.setStabilized(false);

      const content = game.i18n.format('WOR.Recovery.Revived', { name: this.name });
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `<div class="wor recovery-message revived"><i class="fas fa-heart"></i> ${content}</div>`,
        style: CONST.CHAT_MESSAGE_STYLES.OTHER
      });

      return true;
    }

    return false;
  }
}
