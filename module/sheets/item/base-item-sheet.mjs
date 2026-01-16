/**
 * The Weight of Ruin - Base Item Sheet using ApplicationV2
 * @extends {DocumentSheetV2}
 */
const { HandlebarsApplicationMixin, DocumentSheetV2 } = foundry.applications.api;

export class WoRBaseItemSheet extends HandlebarsApplicationMixin(DocumentSheetV2) {

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['wor', 'weight-of-ruin', 'item-sheet'],
    position: {
      width: 520,
      height: 480
    },
    actions: {
      advanceRank: WoRBaseItemSheet.#onAdvanceRank,
      reduceRank: WoRBaseItemSheet.#onReduceRank,
      toggleEquipped: WoRBaseItemSheet.#onToggleEquipped,
      editImage: WoRBaseItemSheet.#onEditImage,
      editEffect: WoRBaseItemSheet.#onEditEffect,
      deleteEffect: WoRBaseItemSheet.#onDeleteEffect,
      createEffect: WoRBaseItemSheet.#onCreateEffect,
      toggleEffect: WoRBaseItemSheet.#onToggleEffect,
      toggleWeaponProperty: WoRBaseItemSheet.#onToggleWeaponProperty,
      toggleArmorProperty: WoRBaseItemSheet.#onToggleArmorProperty,
      toggleBooleanField: WoRBaseItemSheet.#onToggleBooleanField,
      toggleAllowedClass: WoRBaseItemSheet.#onToggleAllowedClass,
      addBonus: WoRBaseItemSheet.#onAddBonus,
      removeBonus: WoRBaseItemSheet.#onRemoveBonus,
      addAppliedCondition: WoRBaseItemSheet.#onAddAppliedCondition,
      removeAppliedCondition: WoRBaseItemSheet.#onRemoveAppliedCondition,
      editDescription: WoRBaseItemSheet.#onEditDescription
    },
    form: {
      submitOnChange: true,
      handler: WoRBaseItemSheet.#onSubmitForm
    },
    window: {
      resizable: true
    }
  };

  /** @override */
  static PARTS = {
    header: {
      template: 'systems/weight-of-ruin/templates/item/parts/header.hbs'
    },
    tabs: {
      template: 'templates/generic/tab-navigation.hbs'
    },
    details: {
      template: 'systems/weight-of-ruin/templates/item/parts/details.hbs',
      scrollable: ['.tab-content']
    }
  };

  /** @override */
  static TABS = {
    description: {
      id: 'description',
      group: 'primary',
      label: 'AOA.Tabs.Description',
      icon: 'fa-solid fa-book-open'
    },
    details: {
      id: 'details',
      group: 'primary',
      label: 'AOA.Tabs.Details',
      icon: 'fa-solid fa-list'
    },
    effects: {
      id: 'effects',
      group: 'primary',
      label: 'AOA.Tabs.Effects',
      icon: 'fa-solid fa-bolt'
    }
  };

  /**
   * Track the current tab group
   * @type {Object}
   */
  tabGroups = {
    primary: 'description'
  };

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const item = this.document;
    const source = item.toObject();

    // Base context
    context.item = item;
    context.source = source;
    context.system = item.system;
    context.flags = item.flags;
    context.config = CONFIG.AOA;

    // Edit mode and ownership
    context.isEditable = this.isEditable;
    context.isEditMode = this.isEditable;
    context.owner = this.document.isOwner;
    context.editable = this.isEditable;

    // Ensure current tab is valid for this item type
    const validTabs = ['weapon', 'armor', 'gear', 'background', 'npcTrait'].includes(item.type)
      ? ['description', 'details', 'effects']
      : ['details', 'effects'];

    if (!validTabs.includes(this.tabGroups.primary)) {
      this.tabGroups.primary = this._getDefaultTab();
    }

    // Tabs
    context.tabs = this._prepareTabs();
    context.currentTab = this.tabGroups.primary;

    // Type-specific context
    context.isSkill = item.type === 'skill';
    context.isTalent = item.type === 'talent';
    context.isWeapon = item.type === 'weapon';
    context.isArmor = item.type === 'armor';
    context.isGear = item.type === 'gear';
    context.isSpell = item.type === 'spell';
    context.isRitual = item.type === 'ritual';
    context.isLineage = item.type === 'lineage';
    context.isBackground = item.type === 'background';
    context.isArchetype = item.type === 'archetype';
    context.isCalling = item.type === 'calling';
    context.isPathway = item.type === 'pathway';
    context.isLifeEvent = item.type === 'lifeEvent';
    context.isNPCTrait = item.type === 'npcTrait';

    // Equipment
    context.canEquip = item.canEquip;
    context.isEquipped = item.isEquipped;

    // Prepare effects
    context.effects = this._prepareEffects();

    // Enriched HTML
    context.enrichedDescription = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      item.system.description ?? '',
      {
        secrets: item.isOwner,
        rollData: item.getRollData(),
        relativeTo: item
      }
    );

    // Type-specific context preparation
    await this._prepareTypeContext(context);

    return context;
  }

  /** @override */
  async _preparePartContext(partId, context) {
    context = await super._preparePartContext(partId, context);

    switch (partId) {
      case 'tabs':
        // Convert tabs object to array for the tab-navigation template
        context.tabs = Object.values(context.tabs);
        break;
      case 'details':
        // Add tabs array for any internal use
        context.tabsArray = Object.values(this._prepareTabs());
        context.activeTab = this.tabGroups.primary;
        break;
    }

    return context;
  }

  /**
   * Prepare tab data, filtering based on item type
   */
  _prepareTabs() {
    const tabs = {};
    const itemType = this.document.type;
    const currentTab = this.tabGroups.primary;

    // Items that have a Description tab (separate from Details)
    const hasDescriptionTab = ['weapon', 'armor', 'gear', 'background', 'npcTrait'].includes(itemType);

    for (const [id, config] of Object.entries(this.constructor.TABS)) {
      // Skip description tab for items that don't have it
      if (id === 'description' && !hasDescriptionTab) continue;

      tabs[id] = {
        ...config,
        active: currentTab === id,
        cssClass: currentTab === id ? 'active' : ''
      };
    }
    return tabs;
  }

  /**
   * Get the default tab for this item type
   */
  _getDefaultTab() {
    const itemType = this.document.type;
    // Weapons, armor, gear, backgrounds, and NPC traits default to description tab
    if (['weapon', 'armor', 'gear', 'background', 'npcTrait'].includes(itemType)) {
      return 'description';
    }
    // All other items default to details
    return 'details';
  }

  /**
   * Prepare effects for display
   */
  _prepareEffects() {
    const effects = {
      temporary: [],
      passive: [],
      inactive: []
    };

    for (const effect of this.document.effects) {
      if (effect.disabled) {
        effects.inactive.push(effect);
      } else if (effect.isTemporary) {
        effects.temporary.push(effect);
      } else {
        effects.passive.push(effect);
      }
    }

    return effects;
  }

  /**
   * Prepare type-specific context data
   * Override in subclasses for type-specific sheets
   */
  async _prepareTypeContext(context) {
    const item = this.document;

    switch (item.type) {
      case 'skill':
        await this._prepareSkillContext(context);
        break;
      case 'talent':
        await this._prepareTalentContext(context);
        break;
      case 'weapon':
        await this._prepareWeaponContext(context);
        break;
      case 'armor':
        await this._prepareArmorContext(context);
        break;
      case 'gear':
        await this._prepareGearContext(context);
        break;
      case 'spell':
        await this._prepareSpellContext(context);
        break;
      case 'ritual':
        await this._prepareRitualContext(context);
        break;
      case 'lineage':
        await this._prepareLineageContext(context);
        break;
      case 'background':
        await this._prepareBackgroundContext(context);
        break;
      case 'archetype':
        await this._prepareArchetypeContext(context);
        break;
      case 'pathway':
        await this._preparePathwayContext(context);
        break;
      case 'lifeEvent':
        await this._prepareLifeEventContext(context);
        break;
      case 'npcTrait':
        await this._prepareNPCTraitContext(context);
        break;
    }
  }

  /* -------------------------------------------- */
  /*  Type-Specific Context Methods               */
  /* -------------------------------------------- */

  async _prepareSkillContext(context) {
    // Attribute options
    context.attributeOptions = {
      strength: 'AOA.Attribute.Strength.long',
      fortitude: 'AOA.Attribute.Fortitude.long',
      agility: 'AOA.Attribute.Agility.long',
      awareness: 'AOA.Attribute.Awareness.long',
      resolve: 'AOA.Attribute.Resolve.long',
      persona: 'AOA.Attribute.Persona.long',
      ingenuity: 'AOA.Attribute.Ingenuity.long',
      expertise: 'AOA.Attribute.Expertise.long',
      witchsight: 'AOA.Attribute.Witchsight.long'
    };

    // Category options
    context.categoryOptions = {
      physical: 'AOA.SkillCategory.Physical',
      social: 'AOA.SkillCategory.Social',
      knowledge: 'AOA.SkillCategory.Knowledge',
      craft: 'AOA.SkillCategory.Craft',
      thaumaturgy: 'AOA.SkillCategory.Thaumaturgy'
    };
  }

  async _prepareTalentContext(context) {
    // Talent type options
    context.talentTypeOptions = {
      universal: 'AOA.TalentType.universal',
      archetype: 'AOA.TalentType.archetype',
      signature: 'AOA.TalentType.signature'
    };

    // Can advance/reduce
    context.canAdvance = context.system.canAdvance;
    context.canReduce = context.system.rank > 1;

    // Enriched effect HTML
    context.enrichedEffect = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      context.system.effect ?? '',
      {
        secrets: this.document.isOwner,
        rollData: this.document.getRollData(),
        relativeTo: this.document
      }
    );
  }

  async _prepareWeaponContext(context) {
    // Attribute options
    context.attributeOptions = {
      strength: 'AOA.Attribute.Strength.long',
      agility: 'AOA.Attribute.Agility.long'
    };

    // Prowess options (used for attack rolls instead of skills)
    context.prowessOptions = {
      weaponProwess: 'AOA.Derived.WeaponProwess.label',
      ballisticProwess: 'AOA.Derived.BallisticProwess.label',
      unarmedProwess: 'AOA.Derived.UnarmedProwess.label'
    };

    // Range type options
    context.rangeTypeOptions = {
      melee: 'AOA.Weapon.RangeType.Melee',
      ranged: 'AOA.Weapon.RangeType.Ranged',
      thrown: 'AOA.Weapon.RangeType.Thrown',
      reach: 'AOA.Weapon.RangeType.Reach'
    };

    // Category options
    context.categoryOptions = {
      simple: 'AOA.Weapon.CategoryType.Simple',
      martial: 'AOA.Weapon.CategoryType.Martial',
      exotic: 'AOA.Weapon.CategoryType.Exotic'
    };

    // Quality options - must match schema choices: poor, standard, fine, superior, masterwork
    context.qualityOptions = {
      poor: 'AOA.Quality.Poor',
      standard: 'AOA.Quality.Standard',
      fine: 'AOA.Quality.Fine',
      superior: 'AOA.Quality.Superior',
      masterwork: 'AOA.Quality.Masterwork'
    };

    // Rarity options
    context.rarityOptions = {
      common: 'AOA.Rarity.Common',
      uncommon: 'AOA.Rarity.Uncommon',
      rare: 'AOA.Rarity.Rare'
    };

    // Weapon group options
    context.groupOptions = {
      dagger: 'AOA.WeaponGroup.Dagger',
      sword: 'AOA.WeaponGroup.Sword',
      axe: 'AOA.WeaponGroup.Axe',
      blunt: 'AOA.WeaponGroup.Blunt',
      polearm: 'AOA.WeaponGroup.Polearm',
      bow: 'AOA.WeaponGroup.Bow',
      crossbow: 'AOA.WeaponGroup.Crossbow',
      thrown: 'AOA.WeaponGroup.Thrown',
      unarmed: 'AOA.WeaponGroup.Unarmed'
    };

    // Weapon property definitions (for checkboxes)
    context.weaponProperties = [
      { key: 'versatile', label: 'AOA.WeaponProperty.Versatile.label' },
      { key: 'twoHanded', label: 'AOA.WeaponProperty.TwoHanded.label' },
      { key: 'light', label: 'AOA.WeaponProperty.Light.label' },
      { key: 'heavy', label: 'AOA.WeaponProperty.Heavy.label' },
      { key: 'finesse', label: 'AOA.WeaponProperty.Finesse.label' },
      { key: 'reach', label: 'AOA.WeaponProperty.Reach.label' },
      { key: 'thrown', label: 'AOA.WeaponProperty.Thrown.label' },
      { key: 'loading', label: 'AOA.WeaponProperty.Loading.label' },
      { key: 'concealable', label: 'AOA.WeaponProperty.Concealable.label' },
      { key: 'trip', label: 'AOA.WeaponProperty.Trip.label' },
      { key: 'wounding', label: 'AOA.WeaponProperty.Wounding.label' },
      { key: 'balanced', label: 'AOA.WeaponProperty.Balanced.label' },
      { key: 'precise', label: 'AOA.WeaponProperty.Precise.label' }
    ];

    // Check which properties are active
    const currentProps = context.system.properties || [];
    context.weaponProperties.forEach(prop => {
      prop.checked = currentProps.includes(prop.key);
    });
  }

  async _prepareArmorContext(context) {
    // Armor category options (layer classification) - like weapon category
    context.armorCategoryOptions = {
      underlayer: 'AOA.Armor.Category.Underlayer',
      outerlayer: 'AOA.Armor.Category.Outerlayer',
      reinforcement: 'AOA.Armor.Category.Reinforcement',
      shield: 'AOA.Armor.Category.Shield'
    };

    // Armor group options for non-shields (material/construction) - like weapon group
    context.armorGroupOptions = {
      quilted: 'AOA.Armor.Group.Quilted',
      mail: 'AOA.Armor.Group.Mail',
      composite: 'AOA.Armor.Group.Composite',
      scale: 'AOA.Armor.Group.Scale',
      plate: 'AOA.Armor.Group.Plate'
    };

    // Shield group options (material/construction)
    context.shieldGroupOptions = {
      hide: 'AOA.Armor.Group.Hide',
      wood: 'AOA.Armor.Group.Wood',
      composite: 'AOA.Armor.Group.Composite',
      metal: 'AOA.Armor.Group.Metal'
    };

    // Determine which group options to show based on category
    const isShield = context.system.armorCategory === 'shield';
    context.currentGroupOptions = isShield ? context.shieldGroupOptions : context.armorGroupOptions;
    context.isShieldCategory = isShield;

    // Quality options - must match schema choices: poor, standard, fine, superior, masterwork
    context.qualityOptions = {
      poor: 'AOA.Quality.Poor',
      standard: 'AOA.Quality.Standard',
      fine: 'AOA.Quality.Fine',
      superior: 'AOA.Quality.Superior',
      masterwork: 'AOA.Quality.Masterwork'
    };

    // Rarity options
    context.rarityOptions = {
      common: 'AOA.Rarity.Common',
      uncommon: 'AOA.Rarity.Uncommon',
      rare: 'AOA.Rarity.Rare',
      exotic: 'AOA.Rarity.Exotic'
    };
  }

  async _prepareGearContext(context) {
    // Gear group options
    context.gearGroupOptions = {
      clothing: 'AOA.Gear.Group.Clothing',
      consumable: 'AOA.Gear.Group.Consumable',
      container: 'AOA.Gear.Group.Container',
      curio: 'AOA.Gear.Group.Curio',
      kit: 'AOA.Gear.Group.Kit',
      remedy: 'AOA.Gear.Group.Remedy',
      tool: 'AOA.Gear.Group.Tool'
    };

    // Rarity options
    context.rarityOptions = {
      common: 'AOA.Rarity.Common',
      uncommon: 'AOA.Rarity.Uncommon',
      rare: 'AOA.Rarity.Rare',
      exotic: 'AOA.Rarity.Exotic'
    };
  }

  async _prepareSpellContext(context) {
    // Technique options
    context.techniqueOptions = {
      create: 'AOA.Sorcery.Technique.Create',
      perceive: 'AOA.Sorcery.Technique.Perceive',
      transform: 'AOA.Sorcery.Technique.Transform',
      destroy: 'AOA.Sorcery.Technique.Destroy',
      control: 'AOA.Sorcery.Technique.Control'
    };

    // Form options
    context.formOptions = {
      elements: 'AOA.Sorcery.Form.Elements',
      living: 'AOA.Sorcery.Form.Living',
      mind: 'AOA.Sorcery.Form.Mind',
      matter: 'AOA.Sorcery.Form.Matter',
      spirit: 'AOA.Sorcery.Form.Spirit',
      space: 'AOA.Sorcery.Form.Space',
      time: 'AOA.Sorcery.Form.Time'
    };
  }

  async _prepareRitualContext(context) {
    // Path options
    context.pathOptions = {
      circlecasting: 'AOA.Ritual.Path.Circlecasting',
      binding: 'AOA.Ritual.Path.Binding',
      hexing: 'AOA.Ritual.Path.Hexing'
    };
  }

  async _prepareLineageContext(context) {
    // Lineage-specific data is mostly in the data model
  }

  async _prepareBackgroundContext(context) {
    // Economic tier options
    context.tierOptions = {
      upper: 'AOA.EconomicTier.Upper',
      middle: 'AOA.EconomicTier.Middle',
      lower: 'AOA.EconomicTier.Lower',
      struggling: 'AOA.EconomicTier.Struggling'
    };

    // Currency options
    context.currencyOptions = {
      orin: 'AOA.Wealth.Orin',
      crowns: 'AOA.Wealth.Crowns',
      sovereigns: 'AOA.Wealth.Sovereigns'
    };

    // Social standing options (ordered from highest to lowest standing)
    context.socialStandingOptions = {
      exalted: 'AOA.SocialStanding.Exalted',
      ordained: 'AOA.SocialStanding.Ordained',
      anointed: 'AOA.SocialStanding.Anointed',
      penitent: 'AOA.SocialStanding.Penitent',
      heretics: 'AOA.SocialStanding.Heretics',
      outcast: 'AOA.SocialStanding.Outcast'
    };
  }

  async _prepareArchetypeContext(context) {
    // Archetype data is mostly in the data model
  }

  async _preparePathwayContext(context) {
    // Pathway data is mostly in the data model
  }

  async _prepareLifeEventContext(context) {
    // Suit options
    context.suitOptions = {
      love: 'AOA.LifeEvent.Suit.Love',
      fortune: 'AOA.LifeEvent.Suit.Fortune',
      conflict: 'AOA.LifeEvent.Suit.Conflict',
      knowledge: 'AOA.LifeEvent.Suit.Knowledge'
    };
  }

  async _prepareNPCTraitContext(context) {
    // Category options with icon paths
    context.categoryOptions = {
      offense: 'AOA.NPCTrait.Category.Offense',
      defense: 'AOA.NPCTrait.Category.Defense',
      mobility: 'AOA.NPCTrait.Category.Mobility',
      control: 'AOA.NPCTrait.Category.Control',
      teamplay: 'AOA.NPCTrait.Category.Teamplay',
      leadership: 'AOA.NPCTrait.Category.Leadership',
      supernatural: 'AOA.NPCTrait.Category.Supernatural',
      ranged: 'AOA.NPCTrait.Category.Ranged',
      signature: 'AOA.NPCTrait.Category.Signature',
      typeTrait: 'AOA.NPCTrait.Category.TypeTrait'
    };

    // Category icons
    context.categoryIcons = {
      offense: 'systems/weight-of-ruin/assets/icons/traits/offense.webp',
      defense: 'systems/weight-of-ruin/assets/icons/traits/defense.webp',
      mobility: 'systems/weight-of-ruin/assets/icons/traits/mobility.webp',
      control: 'systems/weight-of-ruin/assets/icons/traits/control.webp',
      teamplay: 'systems/weight-of-ruin/assets/icons/traits/teamplay.webp',
      leadership: 'systems/weight-of-ruin/assets/icons/traits/leadership.webp',
      supernatural: 'systems/weight-of-ruin/assets/icons/traits/supernatural.webp',
      ranged: 'systems/weight-of-ruin/assets/icons/traits/ranged.webp',
      signature: 'systems/weight-of-ruin/assets/icons/traits/signature.webp',
      typeTrait: 'systems/weight-of-ruin/assets/icons/traits/type.webp'
    };

    // NPC Class options (for allowedClasses)
    context.classOptions = {
      humanoid: 'AOA.NPC.Class.Humanoid',
      beast: 'AOA.NPC.Class.Beast',
      vermin: 'AOA.NPC.Class.Vermin',
      afflicted: 'AOA.NPC.Class.Afflicted',
      apparition: 'AOA.NPC.Class.Apparition',
      fiend: 'AOA.NPC.Class.Fiend'
    };

    // Trigger options
    context.triggerOptions = {
      '': 'AOA.NPCTrait.Trigger.None',
      onHit: 'AOA.NPCTrait.Trigger.OnHit',
      onCrit: 'AOA.NPCTrait.Trigger.OnCrit',
      onDamaged: 'AOA.NPCTrait.Trigger.OnDamaged',
      onDefend: 'AOA.NPCTrait.Trigger.OnDefend',
      onKill: 'AOA.NPCTrait.Trigger.OnKill',
      onTurnStart: 'AOA.NPCTrait.Trigger.OnTurnStart',
      onTurnEnd: 'AOA.NPCTrait.Trigger.OnTurnEnd',
      onMove: 'AOA.NPCTrait.Trigger.OnMove',
      onAllyDeath: 'AOA.NPCTrait.Trigger.OnAllyDeath',
      reaction: 'AOA.NPCTrait.Trigger.Reaction'
    };

    // Condition options (for appliedConditions)
    context.conditionOptions = {
      wounded: 'AOA.Condition.Wounded.label',
      staggered: 'AOA.Condition.Staggered.label',
      stunned: 'AOA.Condition.Stunned.label',
      slowed: 'AOA.Condition.Slowed.label',
      weakened: 'AOA.Condition.Weakened.label',
      restrained: 'AOA.Condition.Restrained.label',
      grappled: 'AOA.Condition.Grappled.label',
      prone: 'AOA.Condition.Prone.label',
      blinded: 'AOA.Condition.Blinded.label',
      frightened: 'AOA.Condition.Frightened.label',
      charmed: 'AOA.Condition.Charmed.label',
      bleeding: 'AOA.Condition.Bleeding.label',
      poisoned: 'AOA.Condition.Poisoned.label',
      burning: 'AOA.Condition.Burning.label',
      numb: 'AOA.Condition.Numb.label',
      shaken: 'AOA.Condition.Shaken.label'
    };

    // Cooldown options
    context.cooldownOptions = {
      '': 'AOA.NPCTrait.Cooldown.None',
      'once/round': 'AOA.NPCTrait.Cooldown.OncePerRound',
      'once/scene': 'AOA.NPCTrait.Cooldown.OncePerScene',
      'once/day': 'AOA.NPCTrait.Cooldown.OncePerDay',
      'recharge': 'AOA.NPCTrait.Cooldown.Recharge'
    };

    // Difficulty options for rolls
    context.difficultyOptions = {
      '': 'AOA.Difficulty.None',
      trivial: 'AOA.Difficulty.Trivial',
      standard: 'AOA.Difficulty.Standard',
      hard: 'AOA.Difficulty.Hard'
    };

    // Tier range options (0-6)
    context.tierOptions = Array.from({ length: 7 }, (_, i) => ({
      value: i,
      label: `${i}`
    }));

    // Current category icon
    const category = this.document.system.category || 'offense';
    context.currentCategoryIcon = context.categoryIcons[category] || context.categoryIcons.offense;
  }

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /** @override */
  _onChangeTab(event, tabs, active) {
    super._onChangeTab(event, tabs, active);
    this.tabGroups[tabs.dataset.group] = active;
  }

  /** @override */
  changeTab(tab, group, options = {}) {
    this.tabGroups[group] = tab;
    this.render();
  }

  /**
   * Handle talent rank advancement
   */
  static async #onAdvanceRank(event, target) {
    event.preventDefault();
    await this.document.advanceRank();
  }

  /**
   * Handle talent rank reduction
   */
  static async #onReduceRank(event, target) {
    event.preventDefault();
    await this.document.reduceRank();
  }

  /**
   * Handle equipment toggle
   */
  static async #onToggleEquipped(event, target) {
    event.preventDefault();
    await this.document.toggleEquipped();
  }

  /**
   * Handle image editing via file picker
   */
  static async #onEditImage(event, target) {
    const current = this.document.img;
    const fp = new FilePicker({
      type: 'image',
      current,
      callback: async (path) => {
        await this.document.update({ img: path });
      }
    });
    fp.browse();
  }

  /**
   * Handle effect editing
   */
  static async #onEditEffect(event, target) {
    event.preventDefault();
    const effectId = target.closest('[data-effect-id]')?.dataset.effectId;
    const effect = this.document.effects.get(effectId);
    if (effect) {
      effect.sheet.render(true);
    }
  }

  /**
   * Handle effect deletion
   */
  static async #onDeleteEffect(event, target) {
    event.preventDefault();
    const effectId = target.closest('[data-effect-id]')?.dataset.effectId;
    const effect = this.document.effects.get(effectId);
    if (effect) {
      await effect.delete();
    }
  }

  /**
   * Handle effect creation
   */
  static async #onCreateEffect(event, target) {
    event.preventDefault();
    await this.document.createEmbeddedDocuments('ActiveEffect', [{
      name: game.i18n.format('DOCUMENT.New', { type: game.i18n.localize('DOCUMENT.ActiveEffect') }),
      img: 'icons/svg/aura.svg',
      origin: this.document.uuid,
      disabled: true
    }]);
  }

  /**
   * Handle effect toggle
   */
  static async #onToggleEffect(event, target) {
    event.preventDefault();
    const effectId = target.closest('[data-effect-id]')?.dataset.effectId;
    const effect = this.document.effects.get(effectId);
    if (effect) {
      await effect.update({ disabled: !effect.disabled });
    }
  }

  /**
   * Handle weapon property toggle
   */
  static async #onToggleWeaponProperty(event, target) {
    event.preventDefault();
    const propertyKey = target.dataset.property;
    if (!propertyKey) return;

    const currentProperties = this.document.system.properties || [];
    let newProperties;

    if (currentProperties.includes(propertyKey)) {
      // Remove the property
      newProperties = currentProperties.filter(p => p !== propertyKey);
    } else {
      // Add the property
      newProperties = [...currentProperties, propertyKey];
    }

    await this.document.update({ 'system.properties': newProperties });
  }

  /**
   * Handle NPC Trait allowed class toggle
   */
  static async #onToggleAllowedClass(event, target) {
    event.preventDefault();
    const classKey = target.dataset.class;
    if (!classKey) return;

    const currentClasses = this.document.system.allowedClasses || [];
    let newClasses;

    if (currentClasses.includes(classKey)) {
      // Remove the class
      newClasses = currentClasses.filter(c => c !== classKey);
    } else {
      // Add the class
      newClasses = [...currentClasses, classKey];
    }

    await this.document.update({ 'system.allowedClasses': newClasses });
  }

  /**
   * Handle adding a new bonus to NPC Trait
   */
  static async #onAddBonus(event, target) {
    event.preventDefault();
    const bonuses = this.document.system.mechanics?.bonuses || [];
    const newBonus = {
      type: 'attack',
      value: 0,
      condition: '',
      damageType: ''
    };
    await this.document.update({
      'system.mechanics.bonuses': [...bonuses, newBonus]
    });
  }

  /**
   * Handle removing a bonus from NPC Trait
   */
  static async #onRemoveBonus(event, target) {
    event.preventDefault();
    const index = parseInt(target.dataset.index, 10);
    if (isNaN(index)) return;

    const bonuses = [...(this.document.system.mechanics?.bonuses || [])];
    bonuses.splice(index, 1);
    await this.document.update({ 'system.mechanics.bonuses': bonuses });
  }

  /**
   * Handle adding a new applied condition to NPC Trait
   */
  static async #onAddAppliedCondition(event, target) {
    event.preventDefault();
    const conditions = this.document.system.mechanics?.appliedConditions || [];
    const newCondition = {
      condition: 'wounded',
      duration: '',
      hitThreshold: 0
    };
    await this.document.update({
      'system.mechanics.appliedConditions': [...conditions, newCondition]
    });
  }

  /**
   * Handle removing an applied condition from NPC Trait
   */
  static async #onRemoveAppliedCondition(event, target) {
    event.preventDefault();
    const index = parseInt(target.dataset.index, 10);
    if (isNaN(index)) return;

    const conditions = [...(this.document.system.mechanics?.appliedConditions || [])];
    conditions.splice(index, 1);
    await this.document.update({ 'system.mechanics.appliedConditions': conditions });
  }

  /**
   * Handle armor property toggle (individual boolean fields)
   */
  static async #onToggleArmorProperty(event, target) {
    event.preventDefault();
    const propertyKey = target.dataset.property;
    if (!propertyKey) return;

    const currentValue = this.document.system[propertyKey] ?? false;
    await this.document.update({ [`system.${propertyKey}`]: !currentValue });
  }

  /**
   * Handle generic boolean field toggle (for nested fields like shield.isShield)
   */
  static async #onToggleBooleanField(event, target) {
    event.preventDefault();
    const fieldPath = target.dataset.field;
    if (!fieldPath) return;

    const currentValue = foundry.utils.getProperty(this.document, fieldPath) ?? false;
    await this.document.update({ [fieldPath]: !currentValue });
  }

  /**
   * Handle description editing via a dialog
   */
  static async #onEditDescription(event, target) {
    event.preventDefault();
    console.log('The Weight of Ruin | Edit description clicked', { event, target, sheet: this });

    const document = this.document;
    const fieldPath = target.dataset.field || 'system.description';
    const currentContent = foundry.utils.getProperty(document, fieldPath) || '';
    const fieldLabel = game.i18n.localize('AOA.Common.Description');

    // Create a unique ID for this editor instance
    const editorId = `editor-${document.id}-${Date.now()}`;

    const content = `
      <form class="wor description-editor-dialog">
        <div class="form-group stacked">
          <label>${fieldLabel}</label>
          <div class="editor-container">
            <textarea id="${editorId}" name="content" style="width: 100%; height: 300px;">${currentContent}</textarea>
          </div>
        </div>
      </form>
    `;

    const dialog = new foundry.applications.api.DialogV2({
      window: {
        title: `${game.i18n.localize('AOA.Common.Edit')}: ${document.name}`,
        resizable: true
      },
      content: content,
      position: {
        width: 500,
        height: 450
      },
      buttons: [
        {
          action: 'save',
          label: game.i18n.localize('Save'),
          icon: 'fas fa-save',
          default: true,
          callback: async (event, button, dialogInstance) => {
            const form = dialogInstance.element.querySelector('form');
            const textarea = form.querySelector('textarea[name="content"]');
            const newContent = textarea?.value || '';
            await document.update({ [fieldPath]: newContent });
          }
        },
        {
          action: 'cancel',
          label: game.i18n.localize('Cancel'),
          icon: 'fas fa-times'
        }
      ]
    });

    await dialog.render(true);
  }

  /**
   * Handle form submission, including editor content
   * @param {SubmitEvent} event - The form submission event
   * @param {HTMLFormElement} form - The form element
   * @param {FormDataExtended} formData - The processed form data
   */
  static async #onSubmitForm(event, form, formData) {
    const updateData = foundry.utils.expandObject(formData.object);

    // Handle NPC Trait array fields stored as text
    if (this.document.type === 'npcTrait') {
      // Convert typeSpecific from comma-separated string to array
      if (typeof updateData.system?.typeSpecific === 'string') {
        updateData.system.typeSpecific = updateData.system.typeSpecific
          .split(',')
          .map(s => s.trim())
          .filter(s => s.length > 0);
      }

      // Convert mechanics.special from newline-separated string to array
      if (typeof updateData.system?.mechanics?.special === 'string') {
        updateData.system.mechanics.special = updateData.system.mechanics.special
          .split('\n')
          .map(s => s.trim())
          .filter(s => s.length > 0);
      }
    }

    await this.document.update(updateData);
  }
}
