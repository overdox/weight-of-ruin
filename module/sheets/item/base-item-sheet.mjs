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
      width: 720,
      height: 650
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
      editDescription: WoRBaseItemSheet.#onEditDescription,
      addModification: WoRBaseItemSheet.#onAddModification,
      removeModification: WoRBaseItemSheet.#onRemoveModification
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
      label: 'WOR.Tabs.Description',
      icon: 'fa-solid fa-book-open'
    },
    details: {
      id: 'details',
      group: 'primary',
      label: 'WOR.Tabs.Details',
      icon: 'fa-solid fa-list'
    },
    effects: {
      id: 'effects',
      group: 'primary',
      label: 'WOR.Tabs.Effects',
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
    context.config = CONFIG.WOR;

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
      strength: 'WOR.Attribute.Strength.long',
      fortitude: 'WOR.Attribute.Fortitude.long',
      agility: 'WOR.Attribute.Agility.long',
      awareness: 'WOR.Attribute.Awareness.long',
      resolve: 'WOR.Attribute.Resolve.long',
      persona: 'WOR.Attribute.Persona.long',
      ingenuity: 'WOR.Attribute.Ingenuity.long',
      expertise: 'WOR.Attribute.Expertise.long',
      witchsight: 'WOR.Attribute.Witchsight.long'
    };

    // Category options
    context.categoryOptions = {
      physical: 'WOR.SkillCategory.Physical',
      social: 'WOR.SkillCategory.Social',
      knowledge: 'WOR.SkillCategory.Knowledge',
      craft: 'WOR.SkillCategory.Craft',
      thaumaturgy: 'WOR.SkillCategory.Thaumaturgy'
    };
  }

  async _prepareTalentContext(context) {
    // Talent type options
    context.talentTypeOptions = {
      universal: 'WOR.TalentType.universal',
      archetype: 'WOR.TalentType.archetype',
      signature: 'WOR.TalentType.signature'
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
      strength: 'WOR.Attribute.Strength.long',
      agility: 'WOR.Attribute.Agility.long'
    };

    // Prowess options (used for attack rolls instead of skills)
    context.prowessOptions = {
      weaponProwess: 'WOR.Derived.WeaponProwess.label',
      ballisticProwess: 'WOR.Derived.BallisticProwess.label',
      unarmedProwess: 'WOR.Derived.UnarmedProwess.label'
    };

    // Range type options
    context.rangeTypeOptions = {
      melee: 'WOR.Weapon.RangeType.Melee',
      ranged: 'WOR.Weapon.RangeType.Ranged',
      thrown: 'WOR.Weapon.RangeType.Thrown',
      reach: 'WOR.Weapon.RangeType.Reach'
    };

    // Category options
    context.categoryOptions = {
      simple: 'WOR.Weapon.CategoryType.Simple',
      martial: 'WOR.Weapon.CategoryType.Martial',
      exotic: 'WOR.Weapon.CategoryType.Exotic'
    };

    // Quality options - must match schema choices: ruined, damaged, inferior, average, fine, superior, masterwork
    context.qualityOptions = {
      ruined: 'WOR.Quality.Ruined',
      damaged: 'WOR.Quality.Damaged',
      inferior: 'WOR.Quality.Inferior',
      average: 'WOR.Quality.Average',
      fine: 'WOR.Quality.Fine',
      superior: 'WOR.Quality.Superior',
      masterwork: 'WOR.Quality.Masterwork'
    };

    // Rarity options
    context.rarityOptions = {
      common: 'WOR.Rarity.Common',
      uncommon: 'WOR.Rarity.Uncommon',
      rare: 'WOR.Rarity.Rare'
    };

    // Weapon group options
    context.groupOptions = {
      dagger: 'WOR.WeaponGroup.Dagger',
      sword: 'WOR.WeaponGroup.Sword',
      axe: 'WOR.WeaponGroup.Axe',
      blunt: 'WOR.WeaponGroup.Blunt',
      polearm: 'WOR.WeaponGroup.Polearm',
      bow: 'WOR.WeaponGroup.Bow',
      crossbow: 'WOR.WeaponGroup.Crossbow',
      thrown: 'WOR.WeaponGroup.Thrown',
      unarmed: 'WOR.WeaponGroup.Unarmed'
    };

    // Weapon property definitions (for checkboxes)
    context.weaponProperties = [
      { key: 'versatile', label: 'WOR.WeaponProperty.Versatile.label' },
      { key: 'twoHanded', label: 'WOR.WeaponProperty.TwoHanded.label' },
      { key: 'light', label: 'WOR.WeaponProperty.Light.label' },
      { key: 'heavy', label: 'WOR.WeaponProperty.Heavy.label' },
      { key: 'finesse', label: 'WOR.WeaponProperty.Finesse.label' },
      { key: 'reach', label: 'WOR.WeaponProperty.Reach.label' },
      { key: 'thrown', label: 'WOR.WeaponProperty.Thrown.label' },
      { key: 'loading', label: 'WOR.WeaponProperty.Loading.label' },
      { key: 'concealable', label: 'WOR.WeaponProperty.Concealable.label' },
      { key: 'trip', label: 'WOR.WeaponProperty.Trip.label' },
      { key: 'wounding', label: 'WOR.WeaponProperty.Wounding.label' },
      { key: 'balanced', label: 'WOR.WeaponProperty.Balanced.label' },
      { key: 'precise', label: 'WOR.WeaponProperty.Precise.label' }
    ];

    // Check which properties are active
    const currentProps = context.system.properties || [];
    context.weaponProperties.forEach(prop => {
      prop.checked = currentProps.includes(prop.key);
    });

    // Damage type options
    context.damageTypeOptions = {
      slashing: 'WOR.DamageType.Slashing',
      piercing: 'WOR.DamageType.Piercing',
      bludgeoning: 'WOR.DamageType.Bludgeoning'
    };

    // Modification category options
    context.modificationCategoryOptions = {
      physical: 'WOR.Weapon.Modification.Physical.label',
      alchemical: 'WOR.Weapon.Modification.Alchemical.label',
      witching: 'WOR.Weapon.Modification.Witching.label'
    };

    // Modification type options by category
    context.modificationTypeOptions = {
      physical: {
        serrated: 'WOR.Weapon.Modification.Physical.Serrated',
        flanged: 'WOR.Weapon.Modification.Physical.Flanged',
        gripWraps: 'WOR.Weapon.Modification.Physical.GripWraps'
      },
      alchemical: {
        acid: 'WOR.Weapon.Modification.Alchemical.Acid',
        poison: 'WOR.Weapon.Modification.Alchemical.Poison',
        incendiary: 'WOR.Weapon.Modification.Alchemical.Incendiary'
      },
      witching: {
        ironsalted: 'WOR.Weapon.Modification.Witching.Ironsalted',
        bloodgrooved: 'WOR.Weapon.Modification.Witching.Bloodgrooved',
        graveTempered: 'WOR.Weapon.Modification.Witching.GraveTempered'
      }
    };

    // Prepare modifications with resolved type options
    context.modifications = (context.system.modifications || []).map((mod, index) => ({
      ...mod,
      index,
      typeOptions: context.modificationTypeOptions[mod.category] || context.modificationTypeOptions.physical
    }));
  }

  async _prepareArmorContext(context) {
    // Armor category options (layer classification) - like weapon category
    context.armorCategoryOptions = {
      underlayer: 'WOR.Armor.Category.Underlayer',
      outerlayer: 'WOR.Armor.Category.Outerlayer',
      reinforcement: 'WOR.Armor.Category.Reinforcement',
      shield: 'WOR.Armor.Category.Shield'
    };

    // Armor group options for non-shields (material/construction) - like weapon group
    context.armorGroupOptions = {
      quilted: 'WOR.Armor.Group.Quilted',
      mail: 'WOR.Armor.Group.Mail',
      composite: 'WOR.Armor.Group.Composite',
      scale: 'WOR.Armor.Group.Scale',
      plate: 'WOR.Armor.Group.Plate'
    };

    // Shield group options (material/construction)
    context.shieldGroupOptions = {
      hide: 'WOR.Armor.Group.Hide',
      wood: 'WOR.Armor.Group.Wood',
      composite: 'WOR.Armor.Group.Composite',
      metal: 'WOR.Armor.Group.Metal'
    };

    // Determine which group options to show based on category
    const isShield = context.system.armorCategory === 'shield';
    context.currentGroupOptions = isShield ? context.shieldGroupOptions : context.armorGroupOptions;
    context.isShieldCategory = isShield;

    // Quality options - must match schema choices: poor, standard, fine, superior, masterwork
    context.qualityOptions = {
      poor: 'WOR.Quality.Poor',
      standard: 'WOR.Quality.Standard',
      fine: 'WOR.Quality.Fine',
      superior: 'WOR.Quality.Superior',
      masterwork: 'WOR.Quality.Masterwork'
    };

    // Rarity options
    context.rarityOptions = {
      common: 'WOR.Rarity.Common',
      uncommon: 'WOR.Rarity.Uncommon',
      rare: 'WOR.Rarity.Rare',
      exotic: 'WOR.Rarity.Exotic'
    };
  }

  async _prepareGearContext(context) {
    // Gear group options
    context.gearGroupOptions = {
      clothing: 'WOR.Gear.Group.Clothing',
      consumable: 'WOR.Gear.Group.Consumable',
      container: 'WOR.Gear.Group.Container',
      curio: 'WOR.Gear.Group.Curio',
      kit: 'WOR.Gear.Group.Kit',
      remedy: 'WOR.Gear.Group.Remedy',
      tool: 'WOR.Gear.Group.Tool'
    };

    // Rarity options
    context.rarityOptions = {
      common: 'WOR.Rarity.Common',
      uncommon: 'WOR.Rarity.Uncommon',
      rare: 'WOR.Rarity.Rare',
      exotic: 'WOR.Rarity.Exotic'
    };
  }

  async _prepareSpellContext(context) {
    // Technique options
    context.techniqueOptions = {
      create: 'WOR.Sorcery.Technique.Create',
      perceive: 'WOR.Sorcery.Technique.Perceive',
      transform: 'WOR.Sorcery.Technique.Transform',
      destroy: 'WOR.Sorcery.Technique.Destroy',
      control: 'WOR.Sorcery.Technique.Control'
    };

    // Form options
    context.formOptions = {
      elements: 'WOR.Sorcery.Form.Elements',
      living: 'WOR.Sorcery.Form.Living',
      mind: 'WOR.Sorcery.Form.Mind',
      matter: 'WOR.Sorcery.Form.Matter',
      spirit: 'WOR.Sorcery.Form.Spirit',
      space: 'WOR.Sorcery.Form.Space',
      time: 'WOR.Sorcery.Form.Time'
    };
  }

  async _prepareRitualContext(context) {
    // Path options
    context.pathOptions = {
      circlecasting: 'WOR.Ritual.Path.Circlecasting',
      binding: 'WOR.Ritual.Path.Binding',
      hexing: 'WOR.Ritual.Path.Hexing'
    };
  }

  async _prepareLineageContext(context) {
    // Lineage-specific data is mostly in the data model
  }

  async _prepareBackgroundContext(context) {
    // Economic tier options
    context.tierOptions = {
      upper: 'WOR.EconomicTier.Upper',
      middle: 'WOR.EconomicTier.Middle',
      lower: 'WOR.EconomicTier.Lower',
      struggling: 'WOR.EconomicTier.Struggling'
    };

    // Currency options
    context.currencyOptions = {
      orin: 'WOR.Wealth.Orin',
      crowns: 'WOR.Wealth.Crowns',
      sovereigns: 'WOR.Wealth.Sovereigns'
    };

    // Social standing options (ordered from highest to lowest standing)
    context.socialStandingOptions = {
      exalted: 'WOR.SocialStanding.Exalted',
      ordained: 'WOR.SocialStanding.Ordained',
      anointed: 'WOR.SocialStanding.Anointed',
      penitent: 'WOR.SocialStanding.Penitent',
      heretics: 'WOR.SocialStanding.Heretics',
      outcast: 'WOR.SocialStanding.Outcast'
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
      love: 'WOR.LifeEvent.Suit.Love',
      fortune: 'WOR.LifeEvent.Suit.Fortune',
      conflict: 'WOR.LifeEvent.Suit.Conflict',
      knowledge: 'WOR.LifeEvent.Suit.Knowledge'
    };
  }

  async _prepareNPCTraitContext(context) {
    // Category options with icon paths
    context.categoryOptions = {
      offense: 'WOR.NPCTrait.Category.Offense',
      defense: 'WOR.NPCTrait.Category.Defense',
      mobility: 'WOR.NPCTrait.Category.Mobility',
      control: 'WOR.NPCTrait.Category.Control',
      teamplay: 'WOR.NPCTrait.Category.Teamplay',
      leadership: 'WOR.NPCTrait.Category.Leadership',
      supernatural: 'WOR.NPCTrait.Category.Supernatural',
      ranged: 'WOR.NPCTrait.Category.Ranged',
      signature: 'WOR.NPCTrait.Category.Signature',
      typeTrait: 'WOR.NPCTrait.Category.TypeTrait'
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
      humanoid: 'WOR.NPC.Class.Humanoid',
      beast: 'WOR.NPC.Class.Beast',
      vermin: 'WOR.NPC.Class.Vermin',
      afflicted: 'WOR.NPC.Class.Afflicted',
      apparition: 'WOR.NPC.Class.Apparition',
      fiend: 'WOR.NPC.Class.Fiend'
    };

    // Trigger options
    context.triggerOptions = {
      '': 'WOR.NPCTrait.Trigger.None',
      onHit: 'WOR.NPCTrait.Trigger.OnHit',
      onCrit: 'WOR.NPCTrait.Trigger.OnCrit',
      onDamaged: 'WOR.NPCTrait.Trigger.OnDamaged',
      onDefend: 'WOR.NPCTrait.Trigger.OnDefend',
      onKill: 'WOR.NPCTrait.Trigger.OnKill',
      onTurnStart: 'WOR.NPCTrait.Trigger.OnTurnStart',
      onTurnEnd: 'WOR.NPCTrait.Trigger.OnTurnEnd',
      onMove: 'WOR.NPCTrait.Trigger.OnMove',
      onAllyDeath: 'WOR.NPCTrait.Trigger.OnAllyDeath',
      reaction: 'WOR.NPCTrait.Trigger.Reaction'
    };

    // Condition options (for appliedConditions)
    context.conditionOptions = {
      wounded: 'WOR.Condition.Wounded.label',
      staggered: 'WOR.Condition.Staggered.label',
      stunned: 'WOR.Condition.Stunned.label',
      slowed: 'WOR.Condition.Slowed.label',
      weakened: 'WOR.Condition.Weakened.label',
      restrained: 'WOR.Condition.Restrained.label',
      grappled: 'WOR.Condition.Grappled.label',
      prone: 'WOR.Condition.Prone.label',
      blinded: 'WOR.Condition.Blinded.label',
      frightened: 'WOR.Condition.Frightened.label',
      charmed: 'WOR.Condition.Charmed.label',
      bleeding: 'WOR.Condition.Bleeding.label',
      poisoned: 'WOR.Condition.Poisoned.label',
      burning: 'WOR.Condition.Burning.label',
      numb: 'WOR.Condition.Numb.label',
      shaken: 'WOR.Condition.Shaken.label'
    };

    // Cooldown options
    context.cooldownOptions = {
      '': 'WOR.NPCTrait.Cooldown.None',
      'once/round': 'WOR.NPCTrait.Cooldown.OncePerRound',
      'once/scene': 'WOR.NPCTrait.Cooldown.OncePerScene',
      'once/day': 'WOR.NPCTrait.Cooldown.OncePerDay',
      'recharge': 'WOR.NPCTrait.Cooldown.Recharge'
    };

    // Difficulty options for rolls
    context.difficultyOptions = {
      '': 'WOR.Difficulty.None',
      trivial: 'WOR.Difficulty.Trivial',
      standard: 'WOR.Difficulty.Standard',
      hard: 'WOR.Difficulty.Hard'
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
    const fieldLabel = game.i18n.localize('WOR.Common.Description');

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
        title: `${game.i18n.localize('WOR.Common.Edit')}: ${document.name}`,
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

    // Handle weapon modification category changes - reset type when category changes
    if (this.document.type === 'weapon' && updateData.system?.modifications) {
      const currentMods = this.document.system.modifications || [];
      const newMods = updateData.system.modifications;

      // Type defaults for each category
      const typeDefaults = {
        physical: 'serrated',
        alchemical: 'acid',
        witching: 'ironsalted'
      };

      // Check each modification for category changes
      for (const [index, newMod] of Object.entries(newMods)) {
        const idx = parseInt(index);
        const currentMod = currentMods[idx];
        if (currentMod && newMod.category && newMod.category !== currentMod.category) {
          // Category changed, reset type to default for new category
          newMod.type = typeDefaults[newMod.category] || 'serrated';
        }
      }

      // Convert modifications object to array
      updateData.system.modifications = Object.values(newMods);
    }

    await this.document.update(updateData);
  }

  /**
   * Handle adding a new modification to a weapon
   */
  static async #onAddModification(event, target) {
    event.preventDefault();
    const modifications = this.document.system.modifications || [];
    const newModification = {
      category: 'physical',
      type: 'serrated'
    };
    await this.document.update({
      'system.modifications': [...modifications, newModification]
    });
  }

  /**
   * Handle removing a modification from a weapon
   */
  static async #onRemoveModification(event, target) {
    event.preventDefault();
    const index = parseInt(target.dataset.index, 10);
    if (isNaN(index)) return;

    const modifications = [...(this.document.system.modifications || [])];
    modifications.splice(index, 1);
    await this.document.update({ 'system.modifications': modifications });
  }

}
