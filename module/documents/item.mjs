import { castSpell, performRitual } from '../helpers/magic.mjs';

/**
 * Extend the basic Item for the The Weight of Ruin system.
 * @extends {Item}
 */
export class WoRItem extends Item {

  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
    // The DataModel handles base data through its schema.
  }

  /** @override */
  prepareDerivedData() {
    // Call DataModel's prepareDerivedData if it exists
    if (typeof this.system.prepareDerivedData === 'function') {
      this.system.prepareDerivedData();
    }

    // Type-specific preparation
    switch (this.type) {
      case 'skill':
        this._prepareSkillData();
        break;
      case 'talent':
        this._prepareTalentData();
        break;
      case 'weapon':
        this._prepareWeaponData();
        break;
      case 'armor':
        this._prepareArmorData();
        break;
      case 'spell':
        this._prepareSpellData();
        break;
      case 'ritual':
        this._prepareRitualData();
        break;
    }
  }

  /* -------------------------------------------- */
  /*  Type-Specific Data Preparation              */
  /* -------------------------------------------- */

  /**
   * Prepare skill data - validate bounds, check Witchsight
   */
  _prepareSkillData() {
    const system = this.system;

    // Clamp rank to valid bounds
    if (system.rank < 0) system.rank = 0;
    if (system.rank > 10) system.rank = 10;

    // Calculate if this skill is gated by Witchsight
    system.gated = system.requiresWitchsight && this.actor && !this.actor.system?.witchsight;
  }

  /**
   * Prepare talent data - current rank effect
   */
  _prepareTalentData() {
    const system = this.system;

    // Clamp rank
    if (system.rank < 1) system.rank = 1;
    if (system.rank > system.maxRank) system.rank = system.maxRank;
  }

  /**
   * Prepare weapon data - calculate totals
   */
  _prepareWeaponData() {
    // DataModel already handles totalDamage and attackBonus getters
  }

  /**
   * Prepare armor data - calculate totals
   */
  _prepareArmorData() {
    // DataModel already handles totalDR and totalDefenseModifier getters
  }

  /**
   * Prepare spell data - casting requirements summary
   */
  _prepareSpellData() {
    const system = this.system;

    // Build a casting summary string
    const parts = [];
    if (system.technique) parts.push(system.technique);
    if (system.form) parts.push(system.form);
    system.castingSummary = parts.join(' + ');

    // Build cost summary
    const costs = [];
    if (system.costs?.trauma) costs.push(`${system.costs.trauma} Trauma`);
    if (system.costs?.essence) costs.push(`${system.costs.essence} Essence`);
    system.costSummary = costs.join(', ') || 'None';
  }

  /**
   * Prepare ritual data - requirements summary
   */
  _prepareRitualData() {
    const system = this.system;

    // Build time summary
    if (system.time?.value && system.time?.unit) {
      system.timeSummary = `${system.time.value} ${system.time.unit}`;
    }

    // Build participant summary
    if (system.participants?.minimum) {
      system.participantSummary = system.participants.minimum === 1
        ? 'Solo'
        : `${system.participants.minimum}+ participants`;
    }
  }

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Item
   * @override
   */
  getRollData() {
    // Start with the system data's getRollData if available (from DataModel)
    let rollData;
    if (typeof this.system.getRollData === 'function') {
      rollData = this.system.getRollData();
    } else {
      rollData = { ...super.getRollData() };
    }

    // If present, add the actor's roll data
    if (this.actor) {
      rollData.actor = this.actor.getRollData();
    }

    return rollData;
  }

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Is this a skill item?
   */
  get isSkill() {
    return this.type === 'skill';
  }

  /**
   * Is this a talent item?
   */
  get isTalent() {
    return this.type === 'talent';
  }

  /**
   * Is this an equipment item (weapon, armor, gear)?
   */
  get isEquipment() {
    return ['weapon', 'armor', 'gear'].includes(this.type);
  }

  /**
   * Is this a magic item (spell, ritual)?
   */
  get isMagic() {
    return ['spell', 'ritual'].includes(this.type);
  }

  /**
   * Is this a character creation item?
   */
  get isCreationItem() {
    return ['lineage', 'background', 'archetype', 'pathway', 'lifeEvent'].includes(this.type);
  }

  /**
   * Can this item be equipped?
   */
  get canEquip() {
    return ['weapon', 'armor'].includes(this.type);
  }

  /**
   * Is this item currently equipped?
   */
  get isEquipped() {
    return this.system.equipped || false;
  }

  /* -------------------------------------------- */
  /*  Chat and Display Methods                    */
  /* -------------------------------------------- */

  /**
   * Get data for chat card display.
   */
  getChatData() {
    // Use DataModel's getChatData if available
    if (typeof this.system.getChatData === 'function') {
      return this.system.getChatData();
    }

    // Default chat data
    return {
      name: this.name,
      type: this.type,
      img: this.img,
      description: this.system.description
    };
  }

  /**
   * Get formatted description for display.
   */
  get formattedDescription() {
    return this.system.description || '';
  }

  /* -------------------------------------------- */
  /*  Item Actions                                */
  /* -------------------------------------------- */

  /**
   * Handle item usage - delegates to actor roll methods when appropriate.
   * @param {object} options - Options to pass to the roll
   * @returns {Promise}
   */
  async use(options = {}) {
    // Type-specific usage handling
    switch (this.type) {
      case 'skill':
        return this._useSkill(options);
      case 'weapon':
        return this._useWeapon(options);
      case 'spell':
        return this._useSpell(options);
      case 'ritual':
        return this._useRitual(options);
      case 'talent':
        return this._useTalent(options);
      default:
        return this._useDefault(options);
    }
  }

  /**
   * Alias for use() - backwards compatibility
   */
  async roll(options = {}) {
    return this.use(options);
  }

  /**
   * Use a skill - delegates to actor.rollSkill()
   */
  async _useSkill(options = {}) {
    if (!this.actor) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.NoActorForRoll'));
      return null;
    }

    // Check if skill is gated by Witchsight
    if (this.system.gated) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.SkillRequiresWitchsight'));
      return null;
    }

    // Delegate to actor's rollSkill method
    return this.actor.rollSkill(this.name, options);
  }

  /**
   * Use a weapon - delegates to actor.rollAttack()
   */
  async _useWeapon(options = {}) {
    if (!this.actor) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.NoActorForRoll'));
      return null;
    }

    // Delegate to actor's rollAttack method
    return this.actor.rollAttack(this.id, options);
  }

  /**
   * Use a spell - casting via magic system
   */
  async _useSpell(options = {}) {
    if (!this.actor) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.NoActorForRoll'));
      return null;
    }

    // Delegate to the magic system's castSpell function
    return castSpell(this.actor, this, {
      skipDialog: options.skipDialog ?? options.event?.shiftKey ?? false,
      modifier: options.modifier ?? 0
    });
  }

  /**
   * Use a ritual - perform via magic system
   */
  async _useRitual(options = {}) {
    if (!this.actor) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.NoActorForRoll'));
      return null;
    }

    // Delegate to the magic system's performRitual function
    return performRitual(this.actor, this, {
      skipDialog: options.skipDialog ?? options.event?.shiftKey ?? false,
      modifier: options.modifier ?? 0,
      participants: options.participants ?? 1
    });
  }

  /**
   * Use a talent - display current rank effect
   */
  async _useTalent(options = {}) {
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');

    const content = `
      <div class="wor talent-card">
        <h4>${this.name}</h4>
        <p class="talent-rank">${game.i18n.localize('WOR.Common.Rank')}: ${this.system.rank}/${this.system.maxRank}</p>
        <p class="talent-type">${game.i18n.localize(`WOR.TalentType.${this.system.talentType}`)}</p>
        ${this.system.effect ? `<div class="talent-effect">${this.system.effect}</div>` : ''}
      </div>
    `;

    return ChatMessage.create({
      speaker,
      rollMode,
      flavor: `[${game.i18n.localize('WOR.ItemTypes.talent')}] ${this.name}`,
      content
    });
  }

  /**
   * Default usage - display item info
   */
  async _useDefault(options = {}) {
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${game.i18n.localize(`WOR.ItemTypes.${this.type}`)}] ${this.name}`;

    return ChatMessage.create({
      speaker,
      rollMode,
      flavor: label,
      content: this.system.description ?? ''
    });
  }

  /* -------------------------------------------- */
  /*  Talent Methods                              */
  /* -------------------------------------------- */

  /**
   * Advance this talent by one rank.
   * @returns {Promise<WoRItem|null>}
   */
  async advanceRank() {
    if (this.type !== 'talent') return null;
    if (!this.system.canAdvance) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.TalentMaxRank'));
      return null;
    }

    return this.update({ 'system.rank': this.system.rank + 1 });
  }

  /**
   * Reduce this talent by one rank.
   * @returns {Promise<WoRItem|null>}
   */
  async reduceRank() {
    if (this.type !== 'talent') return null;
    if (this.system.rank <= 1) {
      ui.notifications.warn(game.i18n.localize('WOR.Warnings.TalentMinRank'));
      return null;
    }

    return this.update({ 'system.rank': this.system.rank - 1 });
  }

  /* -------------------------------------------- */
  /*  Equipment Methods                           */
  /* -------------------------------------------- */

  /**
   * Toggle the equipped state of this item.
   * Updates Active Effects on the actor accordingly.
   */
  async toggleEquipped() {
    if (!this.canEquip) return null;

    const newState = !this.isEquipped;
    await this.update({ 'system.equipped': newState });

    // Manage Active Effects
    if (newState) {
      await this._createEquipmentEffects();
    } else {
      await this._removeEquipmentEffects();
    }

    return this;
  }

  /**
   * Create Active Effects for this equipped item.
   * @private
   */
  async _createEquipmentEffects() {
    if (!this.actor) return;

    const effects = this._buildEquipmentEffects();
    if (effects.length === 0) return;

    // Create effects on the item (they transfer to actor)
    for (const effectData of effects) {
      await this.createEmbeddedDocuments('ActiveEffect', [effectData]);
    }
  }

  /**
   * Remove Active Effects created by this item.
   * @private
   */
  async _removeEquipmentEffects() {
    if (!this.actor) return;

    // Find and delete effects created by this item
    const effectIds = this.effects.map(e => e.id);
    if (effectIds.length > 0) {
      await this.deleteEmbeddedDocuments('ActiveEffect', effectIds);
    }
  }

  /**
   * Build Active Effect data for this equipment.
   * @returns {object[]} Array of effect data objects
   * @private
   */
  _buildEquipmentEffects() {
    const effects = [];

    if (this.type === 'armor') {
      effects.push(...this._buildArmorEffects());
    } else if (this.type === 'weapon') {
      effects.push(...this._buildWeaponEffects());
    }

    return effects;
  }

  /**
   * Build Active Effects for armor.
   * @returns {object[]}
   * @private
   */
  _buildArmorEffects() {
    const effects = [];
    const system = this.system;

    // Damage Reduction effect
    if (system.totalDR > 0) {
      effects.push({
        name: `${this.name} (DR)`,
        icon: this.img,
        origin: this.uuid,
        transfer: true,
        disabled: false,
        changes: [{
          key: 'system.combat.dr',
          mode: CONST.ACTIVE_EFFECT_MODES.ADD,
          value: system.totalDR,
          priority: 20
        }]
      });
    }

    // Defense modifier effect
    if (system.totalDefenseModifier !== 0) {
      effects.push({
        name: `${this.name} (Defense)`,
        icon: this.img,
        origin: this.uuid,
        transfer: true,
        disabled: false,
        changes: [{
          key: 'system.derived.defenseBonus',
          mode: CONST.ACTIVE_EFFECT_MODES.ADD,
          value: system.totalDefenseModifier,
          priority: 20
        }]
      });
    }

    // Movement penalty
    if (system.penalties?.movement < 0) {
      effects.push({
        name: `${this.name} (Movement)`,
        icon: this.img,
        origin: this.uuid,
        transfer: true,
        disabled: false,
        changes: [{
          key: 'system.derived.movementBonus',
          mode: CONST.ACTIVE_EFFECT_MODES.ADD,
          value: system.penalties.movement,
          priority: 20
        }]
      });
    }

    return effects;
  }

  /**
   * Build Active Effects for weapons.
   * @returns {object[]}
   * @private
   */
  _buildWeaponEffects() {
    const effects = [];
    const system = this.system;

    // Attack bonus from quality
    if (system.attackBonus !== 0) {
      effects.push({
        name: `${this.name} (Attack)`,
        icon: this.img,
        origin: this.uuid,
        transfer: true,
        disabled: false,
        flags: {
          'weight-of-ruin': {
            weaponId: this.id,
            effectType: 'weaponBonus'
          }
        },
        changes: [{
          key: `system.combat.weaponAttackBonus.${this.id}`,
          mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
          value: system.attackBonus,
          priority: 20
        }]
      });
    }

    return effects;
  }

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle item creation - set up effects if equipped, set default weapon icon
   * @override
   */
  async _onCreate(data, options, userId) {
    super._onCreate(data, options, userId);

    // Only handle items we own
    if (userId !== game.user.id) return;

    // Don't modify items in compendiums (they're locked)
    // Check both this.pack and options.pack for items being created in a pack
    if (this.pack || options.pack) return;

    // If created as equipped, create effects
    if (this.isEquipped && this.canEquip) {
      await this._createEquipmentEffects();
    }

    // Set weapon icon based on group if using default icon
    if (this.type === 'weapon' && this._isDefaultIcon(this.img)) {
      const WeaponData = CONFIG.Item.dataModels.weapon;
      if (WeaponData?.getGroupIcon) {
        const groupIcon = WeaponData.getGroupIcon(this.system.group);
        await this.update({ img: groupIcon });
      }
    }

    // Set armor icon based on category/group if using default icon
    if (this.type === 'armor' && this._isDefaultIcon(this.img)) {
      const ArmorData = CONFIG.Item.dataModels.armor;
      if (ArmorData?.getGroupIcon) {
        const groupIcon = ArmorData.getGroupIcon(this.system.armorCategory, this.system.armorGroup);
        await this.update({ img: groupIcon });
      }
    }
  }

  /**
   * Check if the current image is a default placeholder icon
   * @param {string} img - The image path
   * @returns {boolean}
   * @private
   */
  _isDefaultIcon(img) {
    // No image or empty
    if (!img) return true;

    // Foundry's default placeholder icons
    const defaultIcons = [
      'icons/svg/item-bag.svg',
      'icons/svg/sword.svg',
      'icons/svg/mystery-man.svg',
      CONST.DEFAULT_TOKEN
    ];
    if (defaultIcons.includes(img)) return true;

    // Foundry's built-in icon library (should be replaced with custom icons)
    if (img.startsWith('icons/')) return true;

    return false;
  }

  /**
   * Handle item updates - manage effects when equipped state changes, update weapon icon when group changes
   * @override
   */
  async _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);

    // Only handle items we own
    if (userId !== game.user.id) return;

    // Don't modify items in compendiums (they're locked)
    if (this.pack || options.pack) return;

    // Check if equipped state changed
    if (changed.system?.equipped !== undefined && this.canEquip) {
      if (changed.system.equipped) {
        await this._createEquipmentEffects();
      } else {
        await this._removeEquipmentEffects();
      }
    }

    // Update weapon icon when group changes (if using a weapon group icon)
    if (this.type === 'weapon' && changed.system?.group !== undefined) {
      const WeaponData = CONFIG.Item.dataModels.weapon;
      if (WeaponData?.getGroupIcon && this._isWeaponGroupIcon(this.img)) {
        const groupIcon = WeaponData.getGroupIcon(changed.system.group);
        if (this.img !== groupIcon) {
          await this.update({ img: groupIcon });
        }
      }
    }

    // Update armor icon when category or group changes (if using an armor group icon)
    if (this.type === 'armor' && (changed.system?.armorCategory !== undefined || changed.system?.armorGroup !== undefined)) {
      const ArmorData = CONFIG.Item.dataModels.armor;
      if (ArmorData?.getGroupIcon && this._isArmorGroupIcon(this.img)) {
        const category = changed.system?.armorCategory ?? this.system.armorCategory;
        const group = changed.system?.armorGroup ?? this.system.armorGroup;
        const groupIcon = ArmorData.getGroupIcon(category, group);
        if (this.img !== groupIcon) {
          await this.update({ img: groupIcon });
        }
      }
    }
  }

  /**
   * Check if the current image is a weapon group icon
   * @param {string} img - The image path
   * @returns {boolean}
   * @private
   */
  _isWeaponGroupIcon(img) {
    const weaponIconPath = 'systems/weight-of-ruin/assets/icons/weapons/';
    return img && img.startsWith(weaponIconPath);
  }

  /**
   * Check if the current image is an armor group icon
   * @param {string} img - The image path
   * @returns {boolean}
   * @private
   */
  _isArmorGroupIcon(img) {
    const armorIconPath = 'systems/weight-of-ruin/assets/icons/armor/';
    return img && img.startsWith(armorIconPath);
  }

  /**
   * Handle item deletion - clean up effects
   * @override
   */
  async _onDelete(options, userId) {
    // Effects are automatically deleted with the item
    super._onDelete(options, userId);
  }
}
