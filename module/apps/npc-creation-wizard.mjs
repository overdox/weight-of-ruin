/**
 * The Weight of Ruin - NPC Creation Wizard
 * Guided 6-step NPC creation process for GMs.
 *
 * Steps:
 * 1. Class & Type - Select creature class and specific type
 * 2. Tier - Select power tier (determines base dice pool and trait points)
 * 3. Attributes - Distribute attribute values (with tier-based templates)
 * 4. Skills - Distribute skill ranks (with tier/class-based templates)
 * 5. Traits - Select NPC traits up to trait point budget
 * 6. Finalization - Name, equipment, and final review
 */

import {
  NPC_CLASSES,
  NPC_TYPES,
  NPC_TIERS,
  TRAIT_CATEGORIES,
  getTypesForClass,
  getTierData,
  getClassOptions,
  getTierOptions,
  getTraitCategoryOptions
} from '../helpers/npc-config.mjs';

import {
  generateAttributeTemplate,
  generateSkillTemplate,
  getAttributeTemplatesForClass,
  getSkillTemplatesForClass
} from '../helpers/npc-templates.mjs';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class NPCCreationWizard extends HandlebarsApplicationMixin(ApplicationV2) {

  /** @override */
  static DEFAULT_OPTIONS = {
    id: 'npc-creation-wizard',
    classes: ['wor', 'weight-of-ruin', 'npc-creation'],
    tag: 'form',
    form: {
      handler: NPCCreationWizard.#onFormSubmit,
      closeOnSubmit: false
    },
    position: {
      width: 900,
      height: 700
    },
    window: {
      title: 'AOA.NPCCreation.Title',
      icon: 'fas fa-skull',
      resizable: true
    },
    actions: {
      selectClass: NPCCreationWizard.#onSelectClass,
      selectType: NPCCreationWizard.#onSelectType,
      selectTier: NPCCreationWizard.#onSelectTier,
      selectAttributeTemplate: NPCCreationWizard.#onSelectAttributeTemplate,
      adjustAttribute: NPCCreationWizard.#onAdjustAttribute,
      selectSkillTemplate: NPCCreationWizard.#onSelectSkillTemplate,
      addSkillRank: NPCCreationWizard.#onAddSkillRank,
      removeSkillRank: NPCCreationWizard.#onRemoveSkillRank,
      selectTraitCategory: NPCCreationWizard.#onSelectTraitCategory,
      addTrait: NPCCreationWizard.#onAddTrait,
      removeTrait: NPCCreationWizard.#onRemoveTrait,
      purchaseGear: NPCCreationWizard.#onPurchaseGear,
      removeGear: NPCCreationWizard.#onRemoveGear,
      previousStep: NPCCreationWizard.#onPreviousStep,
      nextStep: NPCCreationWizard.#onNextStep,
      finalize: NPCCreationWizard.#onFinalize,
      startOver: NPCCreationWizard.#onStartOver
    }
  };

  /** @override */
  static PARTS = {
    header: {
      template: 'systems/weight-of-ruin/templates/apps/npc-creation/npc-creation-header.hbs'
    },
    content: {
      template: 'systems/weight-of-ruin/templates/apps/npc-creation/npc-creation-content.hbs',
      scrollable: ['.creation-step-content']
    },
    footer: {
      template: 'systems/weight-of-ruin/templates/apps/npc-creation/npc-creation-footer.hbs'
    }
  };

  /**
   * Step definitions
   * @type {Object[]}
   */
  static STEPS = [
    { id: 'classType', label: 'AOA.NPCCreation.Step.ClassType', number: 1 },
    { id: 'tier', label: 'AOA.NPCCreation.Step.Tier', number: 2 },
    { id: 'attributes', label: 'AOA.NPCCreation.Step.Attributes', number: 3 },
    { id: 'skills', label: 'AOA.NPCCreation.Step.Skills', number: 4 },
    { id: 'traits', label: 'AOA.NPCCreation.Step.Traits', number: 5 },
    { id: 'finalize', label: 'AOA.NPCCreation.Step.Finalize', number: 6 }
  ];

  /* -------------------------------------------- */
  /*  Constructor                                 */
  /* -------------------------------------------- */

  /**
   * @param {Object} options - Application options
   */
  constructor(options = {}) {
    super(options);

    /**
     * Current step (0-indexed)
     * @type {number}
     */
    this.currentStep = 0;

    /**
     * Working NPC data (accumulated through steps)
     * @type {Object}
     */
    this.npcData = this._initializeNPCData();

    /**
     * Compendium data cache
     * @type {Object}
     */
    this._compendiumCache = {};

    /**
     * Current trait category filter
     * @type {string}
     */
    this._traitCategoryFilter = 'all';

    /**
     * Current gear tab
     * @type {string}
     */
    this._gearTab = 'weapons';

    /**
     * Equipment filter states
     * @type {Object}
     */
    this._equipmentFilters = {
      weaponGroup: 'all',
      armorGroup: 'all',
      gearGroup: 'all'
    };
  }

  /* -------------------------------------------- */
  /*  Data Initialization                         */
  /* -------------------------------------------- */

  /**
   * Initialize empty NPC data structure
   * @returns {Object}
   * @private
   */
  _initializeNPCData() {
    return {
      name: '',
      // Identity
      npcClass: null,
      npcType: null,
      tier: 1, // Default to Skirmisher
      // Attributes (base values)
      attributes: {
        strength: 0,
        fortitude: 0,
        agility: 0,
        awareness: 0,
        resolve: 0,
        persona: 0,
        ingenuity: 0,
        expertise: 0
      },
      attributePointsSpent: 0,
      selectedAttributeTemplate: null,
      // Skills
      skills: {},
      skillRanksSpent: 0,
      selectedSkillTemplate: null,
      // Traits
      traits: [],
      traitPointsSpent: 0,
      // Equipment
      equipment: [],
      // Notes
      notes: ''
    };
  }

  /* -------------------------------------------- */
  /*  Compendium Data Loading                     */
  /* -------------------------------------------- */

  /**
   * Load items from compendiums
   * @param {string} type - Item type to load
   * @returns {Promise<Item[]>}
   */
  async _loadCompendiumItems(type) {
    if (this._compendiumCache[type]) return this._compendiumCache[type];

    const items = [];

    for (const pack of game.packs) {
      if (pack.documentName !== 'Item') continue;

      const index = await pack.getIndex();
      for (const entry of index) {
        const doc = await pack.getDocument(entry._id);
        if (doc.type === type) {
          items.push(doc);
        }
      }
    }

    // Also check world items
    const worldItems = game.items.filter(i => i.type === type);
    items.push(...worldItems);

    this._compendiumCache[type] = items;
    return items;
  }

  /**
   * Get NPC traits from compendium
   * @returns {Promise<Item[]>}
   */
  async getNPCTraits() {
    return this._loadCompendiumItems('npcTrait');
  }

  /**
   * Get skills from compendium
   * @returns {Promise<Item[]>}
   */
  async getSkills() {
    return this._loadCompendiumItems('skill');
  }

  /**
   * Get gear from compendium (weapons, armor, gear)
   * @returns {Promise<Item[]>}
   */
  async getGear() {
    const weapons = await this._loadCompendiumItems('weapon');
    const armor = await this._loadCompendiumItems('armor');
    const gear = await this._loadCompendiumItems('gear');
    return [...weapons, ...armor, ...gear];
  }

  /* -------------------------------------------- */
  /*  Event Listeners                             */
  /* -------------------------------------------- */

  /**
   * Attach event listeners to rendered parts
   * @param {string} partId - The part being rendered
   * @param {HTMLElement} htmlElement - The rendered HTML element
   * @param {object} options - Render options
   * @override
   */
  _attachPartListeners(partId, htmlElement, options) {
    super._attachPartListeners(partId, htmlElement, options);

    if (partId === 'content') {
      // Name input
      const nameInput = htmlElement.querySelector('input[name="name"]');
      if (nameInput) {
        nameInput.addEventListener('input', (e) => {
          this.npcData.name = e.target.value;
          this._updateNavigationState();
        });
      }

      // Notes textarea
      const notesInput = htmlElement.querySelector('textarea[name="notes"]');
      if (notesInput) {
        notesInput.addEventListener('input', (e) => {
          this.npcData.notes = e.target.value;
        });
      }

      // Trait category filter buttons
      const traitFilterBtns = htmlElement.querySelectorAll('.trait-category-btn');
      traitFilterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const category = btn.dataset.category;
          this._traitCategoryFilter = category;

          // Update button states
          traitFilterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Filter traits
          this._filterTraits(htmlElement, category);
        });
      });

      // Restore trait filter state
      if (this._traitCategoryFilter !== 'all') {
        const filterBtn = htmlElement.querySelector(`.trait-category-btn[data-category="${this._traitCategoryFilter}"]`);
        if (filterBtn) filterBtn.click();
      }

      // Keyboard navigation for selection cards
      this._attachKeyboardNavigation(htmlElement);
    }

    // Gear tab switching
    const gearTabBtns = htmlElement.querySelectorAll('.gear-tab-btn');
    if (gearTabBtns.length) {
      gearTabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tab = btn.dataset.gearTab;
          this._gearTab = tab;

          gearTabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const panels = htmlElement.querySelectorAll('.gear-tab-panel');
          panels.forEach(panel => {
            panel.classList.toggle('active', panel.dataset.gearTabPanel === tab);
          });
        });
      });

      // Restore gear tab state
      if (this._gearTab) {
        const activeTabBtn = htmlElement.querySelector(`.gear-tab-btn[data-gear-tab="${this._gearTab}"]`);
        if (activeTabBtn) {
          gearTabBtns.forEach(b => b.classList.remove('active'));
          activeTabBtn.classList.add('active');
          const panels = htmlElement.querySelectorAll('.gear-tab-panel');
          panels.forEach(panel => {
            panel.classList.toggle('active', panel.dataset.gearTabPanel === this._gearTab);
          });
        }
      }
    }
  }

  /**
   * Filter displayed traits by category
   * @param {HTMLElement} htmlElement
   * @param {string} category
   * @private
   */
  _filterTraits(htmlElement, category) {
    const traitCards = htmlElement.querySelectorAll('.trait-card');
    traitCards.forEach(card => {
      if (category === 'all') {
        card.style.display = '';
      } else {
        const cardCategory = card.dataset.category;
        card.style.display = cardCategory === category ? '' : 'none';
      }
    });
  }

  /**
   * Attach keyboard navigation to selection elements
   * @param {HTMLElement} htmlElement
   * @private
   */
  _attachKeyboardNavigation(htmlElement) {
    // Make selection cards keyboard accessible
    const selectableCards = htmlElement.querySelectorAll(
      '.class-card, .type-card, .tier-card, .template-btn'
    );

    selectableCards.forEach(card => {
      // Make focusable if not already
      if (!card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
      }

      // Handle Enter/Space for selection
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    // Arrow key navigation within card grids
    const cardGrids = htmlElement.querySelectorAll('.class-grid, .type-grid, .tier-grid, .template-buttons');
    cardGrids.forEach(grid => {
      grid.addEventListener('keydown', (e) => {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

        const cards = Array.from(grid.querySelectorAll('[tabindex="0"]'));
        const currentIndex = cards.indexOf(document.activeElement);
        if (currentIndex === -1) return;

        e.preventDefault();
        let nextIndex = currentIndex;

        // Get grid column count from computed styles
        const gridStyle = getComputedStyle(grid);
        const columnCount = gridStyle.gridTemplateColumns.split(' ').length;

        switch (e.key) {
          case 'ArrowRight':
            nextIndex = Math.min(currentIndex + 1, cards.length - 1);
            break;
          case 'ArrowLeft':
            nextIndex = Math.max(currentIndex - 1, 0);
            break;
          case 'ArrowDown':
            nextIndex = Math.min(currentIndex + columnCount, cards.length - 1);
            break;
          case 'ArrowUp':
            nextIndex = Math.max(currentIndex - columnCount, 0);
            break;
        }

        if (nextIndex !== currentIndex && cards[nextIndex]) {
          cards[nextIndex].focus();
        }
      });
    });

    // Global keyboard shortcuts for navigation
    htmlElement.addEventListener('keydown', (e) => {
      // Alt+Left = Previous Step
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        const backBtn = this.element?.querySelector('.back-btn:not(:disabled)');
        if (backBtn) backBtn.click();
      }
      // Alt+Right = Next Step
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        const nextBtn = this.element?.querySelector('.next-btn:not(:disabled)');
        if (nextBtn) nextBtn.click();
      }
      // Alt+Enter = Finalize (on last step)
      if (e.altKey && e.key === 'Enter') {
        e.preventDefault();
        const finalizeBtn = this.element?.querySelector('.finalize-btn:not(:disabled)');
        if (finalizeBtn) finalizeBtn.click();
      }
    });
  }

  /**
   * Update the navigation button state based on current step validation
   * @private
   */
  _updateNavigationState() {
    const canProceed = this._canProceedToNextStep();
    const nextBtn = this.element?.querySelector('.next-btn');
    const finalizeBtn = this.element?.querySelector('.finalize-btn');

    if (nextBtn) nextBtn.disabled = !canProceed;
    if (finalizeBtn) finalizeBtn.disabled = !canProceed;
  }

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const tierData = getTierData(this.npcData.tier);

    const context = {
      // Current step info
      currentStep: this.currentStep,
      stepId: NPCCreationWizard.STEPS[this.currentStep].id,
      stepLabel: NPCCreationWizard.STEPS[this.currentStep].label,
      steps: NPCCreationWizard.STEPS.map((step, index) => ({
        ...step,
        active: index === this.currentStep,
        completed: index < this.currentStep,
        future: index > this.currentStep
      })),

      // Trait points tracking
      traitPoints: {
        total: tierData.traitPoints,
        spent: this.npcData.traitPointsSpent,
        remaining: tierData.traitPoints - this.npcData.traitPointsSpent
      },

      // NPC data
      npcData: this.npcData,

      // Can proceed to next step
      canProceed: this._canProceedToNextStep(),

      // Is final step
      isFinalStep: this.currentStep === NPCCreationWizard.STEPS.length - 1,

      // Localization helper
      localize: game.i18n.localize.bind(game.i18n)
    };

    // Add step-specific context
    await this._prepareStepContext(context);

    return context;
  }

  /**
   * Prepare context for current step
   * @param {Object} context
   * @private
   */
  async _prepareStepContext(context) {
    const stepId = NPCCreationWizard.STEPS[this.currentStep].id;

    switch (stepId) {
      case 'classType':
        context.classes = Object.values(NPC_CLASSES).map(cls => ({
          ...cls,
          selected: this.npcData.npcClass === cls.id,
          localizedLabel: game.i18n.localize(cls.label)
        }));
        context.types = this.npcData.npcClass ? getTypesForClass(this.npcData.npcClass).map(type => ({
          ...type,
          selected: this.npcData.npcType === type.id,
          localizedLabel: game.i18n.localize(type.label)
        })) : [];
        context.selectedClass = this.npcData.npcClass ? NPC_CLASSES[this.npcData.npcClass] : null;
        context.selectedType = this.npcData.npcType;
        break;

      case 'tier':
        context.tiers = Object.values(NPC_TIERS).map(tier => ({
          ...tier,
          selected: this.npcData.tier === tier.id,
          localizedLabel: game.i18n.localize(tier.label),
          localizedDesc: game.i18n.localize(tier.description)
        }));
        context.selectedTier = getTierData(this.npcData.tier);
        break;

      case 'attributes':
        const tierDataAttr = getTierData(this.npcData.tier);
        context.attributePointsTotal = tierDataAttr.suggestedAttributes.total;
        context.attributePointsSpent = this.npcData.attributePointsSpent;
        context.attributePointsRemaining = tierDataAttr.suggestedAttributes.total - this.npcData.attributePointsSpent;
        context.attributeMax = tierDataAttr.suggestedAttributes.max;
        context.attributeList = [
          { key: 'strength', label: 'AOA.Attribute.Strength.long', abbr: 'AOA.Attribute.Strength.abbr' },
          { key: 'fortitude', label: 'AOA.Attribute.Fortitude.long', abbr: 'AOA.Attribute.Fortitude.abbr' },
          { key: 'agility', label: 'AOA.Attribute.Agility.long', abbr: 'AOA.Attribute.Agility.abbr' },
          { key: 'awareness', label: 'AOA.Attribute.Awareness.long', abbr: 'AOA.Attribute.Awareness.abbr' },
          { key: 'resolve', label: 'AOA.Attribute.Resolve.long', abbr: 'AOA.Attribute.Resolve.abbr' },
          { key: 'persona', label: 'AOA.Attribute.Persona.long', abbr: 'AOA.Attribute.Persona.abbr' },
          { key: 'ingenuity', label: 'AOA.Attribute.Ingenuity.long', abbr: 'AOA.Attribute.Ingenuity.abbr' },
          { key: 'expertise', label: 'AOA.Attribute.Expertise.long', abbr: 'AOA.Attribute.Expertise.abbr' }
        ];
        // Use tier-scaled templates from npc-templates.mjs
        context.attributeTemplates = getAttributeTemplatesForClass(this.npcData.npcClass || 'humanoid');
        context.selectedAttributeTemplate = this.npcData.selectedAttributeTemplate;
        context.tier = this.npcData.tier;
        context.npcClass = this.npcData.npcClass;
        break;

      case 'skills':
        const tierDataSkill = getTierData(this.npcData.tier);
        const allSkills = await this.getSkills();
        context.availableSkills = allSkills;
        context.skillsByCategory = this._groupSkillsByCategory(allSkills);
        context.characterSkills = this.npcData.skills;
        context.skillRanksTotal = tierDataSkill.suggestedSkillRanks;
        context.skillRanksSpent = this.npcData.skillRanksSpent;
        context.skillRanksRemaining = tierDataSkill.suggestedSkillRanks - this.npcData.skillRanksSpent;
        // Use tier-scaled templates from npc-templates.mjs
        context.skillTemplates = getSkillTemplatesForClass(this.npcData.npcClass || 'humanoid');
        context.selectedSkillTemplate = this.npcData.selectedSkillTemplate;
        context.tier = this.npcData.tier;
        context.npcClass = this.npcData.npcClass;
        break;

      case 'traits':
        const tierDataTraits = getTierData(this.npcData.tier);
        const npcTraits = await this.getNPCTraits();
        // Filter traits by class and type
        context.availableTraits = npcTraits.filter(trait => {
          const allowedClasses = trait.system.allowedClasses || [];
          const typeSpecific = trait.system.typeSpecific || [];

          // Check class restriction
          if (allowedClasses.length > 0 && !allowedClasses.includes(this.npcData.npcClass)) {
            return false;
          }

          // Check type restriction
          if (typeSpecific.length > 0 && !typeSpecific.includes(this.npcData.npcType)) {
            return false;
          }

          // Check tier requirement
          const tierReq = trait.system.tierRequirement || {};
          const minTier = tierReq.min ?? 0;
          const maxTier = tierReq.max ?? 6;
          if (this.npcData.tier < minTier || this.npcData.tier > maxTier) {
            return false;
          }

          return true;
        }).map(trait => ({
          id: trait.id,
          name: trait.name,
          img: trait.img,
          system: trait.system,
          selected: this.npcData.traits.some(t => t.id === trait.id),
          isTypeSpecific: (trait.system.typeSpecific || []).length > 0
        }));

        // Separate type-specific traits for highlighting
        context.typeSpecificTraits = context.availableTraits.filter(t => t.isTypeSpecific);
        context.generalTraits = context.availableTraits.filter(t => !t.isTypeSpecific);

        context.selectedTraits = this.npcData.traits;
        context.traitCategories = Object.values(TRAIT_CATEGORIES).map(cat => ({
          ...cat,
          localizedLabel: game.i18n.localize(cat.label)
        }));
        context.traitCategoryFilter = this._traitCategoryFilter;
        context.traitPointsTotal = tierDataTraits.traitPoints;
        context.traitPointsSpent = this.npcData.traitPointsSpent;
        context.traitPointsRemaining = tierDataTraits.traitPoints - this.npcData.traitPointsSpent;
        break;

      case 'finalize':
        // Load gear
        const availableWeapons = await this._loadCompendiumItems('weapon');
        const availableArmor = await this._loadCompendiumItems('armor');
        const availableGear = await this._loadCompendiumItems('gear');

        context.availableWeapons = availableWeapons;
        context.availableArmor = availableArmor;
        context.availableGear = availableGear;
        context.gearTab = this._gearTab || 'weapons';
        context.selectedEquipment = this.npcData.equipment;
        context.npcSummary = this._generateNPCSummary();

        // Filter options
        context.weaponGroups = ['all', 'dagger', 'sword', 'axe', 'blunt', 'polearm', 'bow', 'crossbow', 'thrown', 'unarmed'];
        context.armorGroups = ['all', 'quilted', 'mail', 'composite', 'scale', 'plate', 'shield'];
        context.gearGroups = ['all', 'clothing', 'consumable', 'container', 'curio', 'kit', 'remedy', 'tool'];
        break;
    }
  }

  /* -------------------------------------------- */
  /*  Computed Values                             */
  /* -------------------------------------------- */

  /**
   * Group skills by category
   * @param {Item[]} skills
   * @returns {Object}
   * @private
   */
  _groupSkillsByCategory(skills) {
    const grouped = {
      martial: [],
      physical: [],
      social: [],
      knowledge: [],
      craft: [],
      thaumaturgy: []
    };

    for (const skill of skills) {
      const category = skill.system.category || 'physical';
      if (grouped[category]) {
        grouped[category].push(skill);
      }
    }

    return grouped;
  }

  /**
   * Compute derived attributes for NPC
   * @returns {Object}
   * @private
   */
  _computeDerivedAttributes() {
    const attrs = this.npcData.attributes;
    const toughness = (attrs.resolve || 0) + (attrs.fortitude || 0);
    const reflex = (attrs.agility || 0) + (attrs.awareness || 0);

    return {
      toughness,
      reflex,
      defense: Math.floor((3 + reflex) / 2),
      movement: 2 + (attrs.agility || 0),
      maxTrauma: 3 + toughness,
      wounds: Math.floor((3 + toughness) / 2),
      weaponProwess: (attrs.strength || 0) + (attrs.agility || 0),
      ballisticProwess: (attrs.awareness || 0) + (attrs.agility || 0),
      unarmedProwess: (attrs.strength || 0) + (attrs.fortitude || 0)
    };
  }

  /**
   * Generate NPC summary for final step
   * @returns {Object}
   * @private
   */
  _generateNPCSummary() {
    const derived = this._computeDerivedAttributes();
    const tierData = getTierData(this.npcData.tier);

    return {
      name: this.npcData.name || game.i18n.localize('AOA.NPCCreation.UnnamedNPC'),
      npcClass: this.npcData.npcClass ? game.i18n.localize(NPC_CLASSES[this.npcData.npcClass].label) : '-',
      npcType: this.npcData.npcType ? game.i18n.localize(NPC_TYPES[this.npcData.npcClass]?.find(t => t.id === this.npcData.npcType)?.label || this.npcData.npcType) : '-',
      tier: game.i18n.localize(tierData.label),
      tierName: tierData.name,
      baseDicePool: tierData.baseDicePool,
      attributes: this.npcData.attributes,
      derived,
      skillCount: Object.keys(this.npcData.skills).length,
      traitCount: this.npcData.traits.length,
      traitPointsSpent: this.npcData.traitPointsSpent,
      traitPointsTotal: tierData.traitPoints,
      equipmentCount: this.npcData.equipment.length
    };
  }

  /* -------------------------------------------- */
  /*  Step Validation                             */
  /* -------------------------------------------- */

  /**
   * Check if current step is complete and can proceed
   * @returns {boolean}
   * @private
   */
  _canProceedToNextStep() {
    const stepId = NPCCreationWizard.STEPS[this.currentStep].id;

    switch (stepId) {
      case 'classType':
        return this.npcData.npcClass !== null && this.npcData.npcType !== null;

      case 'tier':
        return this.npcData.tier !== null;

      case 'attributes':
        // Attributes are optional but should be within budget
        const tierDataAttr = getTierData(this.npcData.tier);
        return this.npcData.attributePointsSpent <= tierDataAttr.suggestedAttributes.total;

      case 'skills':
        // Skills are optional
        return true;

      case 'traits':
        // Traits are optional but cannot exceed budget
        const tierDataTraits = getTierData(this.npcData.tier);
        return this.npcData.traitPointsSpent <= tierDataTraits.traitPoints;

      case 'finalize':
        // Must have a name
        return this.npcData.name?.trim().length > 0;

      default:
        return true;
    }
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Class & Type              */
  /* -------------------------------------------- */

  /**
   * Select creature class
   */
  static async #onSelectClass(event, target) {
    const classId = target.dataset.classId;
    if (!NPC_CLASSES[classId]) return;

    this.npcData.npcClass = classId;
    this.npcData.npcType = null; // Reset type when class changes

    this.render();
  }

  /**
   * Select creature type
   */
  static async #onSelectType(event, target) {
    const typeId = target.dataset.typeId;
    this.npcData.npcType = typeId;
    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Tier                      */
  /* -------------------------------------------- */

  /**
   * Select power tier
   */
  static async #onSelectTier(event, target) {
    const tierId = parseInt(target.dataset.tierId);
    if (!NPC_TIERS[tierId]) return;

    this.npcData.tier = tierId;
    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Attributes                */
  /* -------------------------------------------- */

  /**
   * Select attribute template
   */
  static async #onSelectAttributeTemplate(event, target) {
    const templateKey = target.dataset.template;
    const npcClass = this.npcData.npcClass || 'humanoid';
    const tier = this.npcData.tier;

    // Generate tier-scaled attributes from template
    const generated = generateAttributeTemplate(npcClass, templateKey, tier);

    if (!generated) return;

    // Apply generated values
    this.npcData.attributes = { ...generated };

    // Calculate spent points
    this.npcData.attributePointsSpent = Object.values(this.npcData.attributes).reduce((sum, val) => sum + val, 0);
    this.npcData.selectedAttributeTemplate = templateKey;

    this.render();
  }

  /**
   * Adjust attribute value
   */
  static async #onAdjustAttribute(event, target) {
    const attr = target.dataset.attribute;
    const adjustment = parseInt(target.dataset.adjust);

    const current = this.npcData.attributes[attr] || 0;
    const newValue = current + adjustment;

    // Validate bounds
    if (newValue < 0) return;

    const tierData = getTierData(this.npcData.tier);
    if (newValue > tierData.suggestedAttributes.max) return;

    // Check points available
    const newSpent = this.npcData.attributePointsSpent + adjustment;
    if (newSpent < 0 || newSpent > tierData.suggestedAttributes.total) return;

    this.npcData.attributes[attr] = newValue;
    this.npcData.attributePointsSpent = newSpent;
    this.npcData.selectedAttributeTemplate = null; // Clear template selection

    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Skills                    */
  /* -------------------------------------------- */

  /**
   * Select skill template
   */
  static async #onSelectSkillTemplate(event, target) {
    const templateKey = target.dataset.template;
    const npcClass = this.npcData.npcClass || 'humanoid';
    const tier = this.npcData.tier;

    // Generate tier-scaled skills from template
    const generated = generateSkillTemplate(npcClass, templateKey, tier);

    if (!generated) return;

    // Apply generated values
    this.npcData.skills = { ...generated };
    this.npcData.skillRanksSpent = Object.values(this.npcData.skills).reduce((sum, val) => sum + val, 0);
    this.npcData.selectedSkillTemplate = templateKey;

    this.render();
  }

  /**
   * Add skill rank
   */
  static async #onAddSkillRank(event, target) {
    const skillKey = target.dataset.skill;
    const tierData = getTierData(this.npcData.tier);

    if (this.npcData.skillRanksSpent >= tierData.suggestedSkillRanks) return;

    const currentRank = this.npcData.skills[skillKey] || 0;
    if (currentRank >= 6) return; // Max rank cap

    this.npcData.skills[skillKey] = currentRank + 1;
    this.npcData.skillRanksSpent++;
    this.npcData.selectedSkillTemplate = null;

    this.render();
  }

  /**
   * Remove skill rank
   */
  static async #onRemoveSkillRank(event, target) {
    const skillKey = target.dataset.skill;
    const currentRank = this.npcData.skills[skillKey] || 0;

    if (currentRank <= 0) return;

    this.npcData.skills[skillKey] = currentRank - 1;
    this.npcData.skillRanksSpent--;
    this.npcData.selectedSkillTemplate = null;

    if (this.npcData.skills[skillKey] === 0) {
      delete this.npcData.skills[skillKey];
    }

    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Traits                    */
  /* -------------------------------------------- */

  /**
   * Select trait category filter
   */
  static async #onSelectTraitCategory(event, target) {
    const category = target.dataset.category;
    this._traitCategoryFilter = category;
    this.render();
  }

  /**
   * Add trait
   */
  static async #onAddTrait(event, target) {
    const traitId = target.dataset.traitId;
    const traits = await this.getNPCTraits();
    const trait = traits.find(t => t.id === traitId);

    if (!trait) return;

    // Check if already has this trait
    if (this.npcData.traits.find(t => t.id === traitId)) {
      ui.notifications.warn(game.i18n.localize('AOA.NPCCreation.TraitAlreadyAdded'));
      return;
    }

    // Check trait points
    const tierData = getTierData(this.npcData.tier);
    const cost = trait.system.cost || 1;
    if (this.npcData.traitPointsSpent + cost > tierData.traitPoints) {
      ui.notifications.warn(game.i18n.localize('AOA.NPCCreation.InsufficientTraitPoints'));
      return;
    }

    this.npcData.traits.push({
      id: trait.id,
      name: trait.name,
      img: trait.img,
      cost: cost,
      category: trait.system.category
    });
    this.npcData.traitPointsSpent += cost;

    this.render();
  }

  /**
   * Remove trait
   */
  static async #onRemoveTrait(event, target) {
    const traitId = target.dataset.traitId;
    const index = this.npcData.traits.findIndex(t => t.id === traitId);

    if (index === -1) return;

    const removed = this.npcData.traits[index];
    this.npcData.traitPointsSpent -= removed.cost || 1;
    this.npcData.traits.splice(index, 1);

    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Equipment                 */
  /* -------------------------------------------- */

  /**
   * Add equipment
   */
  static async #onPurchaseGear(event, target) {
    const itemId = target.dataset.itemId;
    const gear = await this.getGear();
    const item = gear.find(g => g.id === itemId);

    if (!item) return;

    // NPCs don't pay for gear, just add it
    this.npcData.equipment.push({
      id: item.id,
      name: item.name,
      img: item.img,
      type: item.type
    });

    this.render();
  }

  /**
   * Remove equipment
   */
  static async #onRemoveGear(event, target) {
    const index = parseInt(target.dataset.index);
    if (index >= 0 && index < this.npcData.equipment.length) {
      this.npcData.equipment.splice(index, 1);
      this.render();
    }
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Navigation                */
  /* -------------------------------------------- */

  /**
   * Go back to previous step
   */
  static async #onPreviousStep(event, target) {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  }

  /**
   * Proceed to next step
   */
  static async #onNextStep(event, target) {
    if (!this._canProceedToNextStep()) {
      ui.notifications.warn(game.i18n.localize('AOA.NPCCreation.StepIncomplete'));
      return;
    }

    if (this.currentStep < NPCCreationWizard.STEPS.length - 1) {
      this.currentStep++;
      this.render();
    }
  }

  /**
   * Start over from the beginning
   */
  static async #onStartOver(event, target) {
    const confirmed = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize('AOA.NPCCreation.StartOver') },
      content: `<p>${game.i18n.localize('AOA.NPCCreation.StartOverConfirm')}</p>`,
      yes: { label: game.i18n.localize('AOA.Common.Yes') },
      no: { label: game.i18n.localize('AOA.Common.No') }
    });

    if (confirmed) {
      this.currentStep = 0;
      this.npcData = this._initializeNPCData();
      this._traitCategoryFilter = 'all';
      this._compendiumCache = {};
      this.render();
    }
  }

  /**
   * Finalize NPC and create actor
   */
  static async #onFinalize(event, target) {
    if (!this._canProceedToNextStep()) {
      ui.notifications.warn(game.i18n.localize('AOA.NPCCreation.StepIncomplete'));
      return;
    }

    await this._createNPCActor();
  }

  /* -------------------------------------------- */
  /*  Actor Creation                              */
  /* -------------------------------------------- */

  /**
   * Create the NPC actor with all configured data
   * @private
   */
  async _createNPCActor() {
    const tierData = getTierData(this.npcData.tier);
    const derived = this._computeDerivedAttributes();

    // Prepare embedded items
    const embeddedItems = await this._prepareEmbeddedItems();

    // Build system data
    const systemData = {
      npcClass: this.npcData.npcClass,
      npcType: this.npcData.npcType,
      tier: this.npcData.tier,
      attributes: {
        strength: { base: this.npcData.attributes.strength, advances: 0, modifier: 0 },
        fortitude: { base: this.npcData.attributes.fortitude, advances: 0, modifier: 0 },
        agility: { base: this.npcData.attributes.agility, advances: 0, modifier: 0 },
        awareness: { base: this.npcData.attributes.awareness, advances: 0, modifier: 0 },
        resolve: { base: this.npcData.attributes.resolve, advances: 0, modifier: 0 },
        persona: { base: this.npcData.attributes.persona, advances: 0, modifier: 0 },
        ingenuity: { base: this.npcData.attributes.ingenuity, advances: 0, modifier: 0 },
        expertise: { base: this.npcData.attributes.expertise, advances: 0, modifier: 0 }
      },
      health: {
        trauma: 0
      },
      traitPoints: {
        max: tierData.traitPoints,
        spent: this.npcData.traitPointsSpent
      },
      notes: this.npcData.notes || ''
    };

    // Determine token image based on NPC class
    const tokenImageMap = {
      humanoid: 'systems/weight-of-ruin/assets/tokens/humanoid.webp',
      beast: 'systems/weight-of-ruin/assets/tokens/beast.webp',
      vermin: 'systems/weight-of-ruin/assets/tokens/vermin.webp',
      afflicted: 'systems/weight-of-ruin/assets/tokens/afflicted.webp',
      apparition: 'systems/weight-of-ruin/assets/tokens/apparition.webp',
      fiend: 'systems/weight-of-ruin/assets/tokens/fiend.webp'
    };
    const tokenImage = tokenImageMap[this.npcData.npcClass] || 'systems/weight-of-ruin/assets/tokens/default.webp';

    // Create actor with token image
    const actor = await Actor.create({
      name: this.npcData.name,
      type: 'npc',
      img: tokenImage,
      prototypeToken: {
        texture: {
          src: tokenImage
        }
      },
      system: systemData,
      items: embeddedItems
    });

    // Close wizard and open NPC sheet
    this.close();
    actor.sheet.render(true);

    ui.notifications.info(game.i18n.format('AOA.NPCCreation.Complete', { name: actor.name }));
  }

  /**
   * Prepare embedded items for NPC
   * @returns {Promise<Object[]>}
   * @private
   */
  async _prepareEmbeddedItems() {
    const items = [];

    // Add skills
    const allSkills = await this.getSkills();
    for (const [skillKey, rank] of Object.entries(this.npcData.skills)) {
      const skillTemplate = allSkills.find(s => s.name.toLowerCase() === skillKey.toLowerCase());
      if (skillTemplate) {
        const systemData = skillTemplate.system.toObject();
        systemData.rank = rank;
        items.push({
          name: skillTemplate.name,
          type: 'skill',
          img: skillTemplate.img,
          system: systemData
        });
      }
    }

    // Add traits
    const allTraits = await this.getNPCTraits();
    for (const traitData of this.npcData.traits) {
      const traitTemplate = allTraits.find(t => t.id === traitData.id);
      if (traitTemplate) {
        items.push({
          name: traitTemplate.name,
          type: 'npcTrait',
          img: traitTemplate.img,
          system: traitTemplate.system.toObject()
        });
      }
    }

    // Add equipment
    const allGear = await this.getGear();
    for (const equipData of this.npcData.equipment) {
      const itemTemplate = allGear.find(g => g.id === equipData.id);
      if (itemTemplate) {
        items.push({
          name: itemTemplate.name,
          type: itemTemplate.type,
          img: itemTemplate.img,
          system: itemTemplate.system.toObject()
        });
      }
    }

    return items;
  }

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /**
   * Handle form submission
   */
  static async #onFormSubmit(event, form, formData) {
    if (formData.object.name !== undefined) {
      this.npcData.name = formData.object.name;
    }
    if (formData.object.notes !== undefined) {
      this.npcData.notes = formData.object.notes;
    }
    this.render();
  }

  /* -------------------------------------------- */
  /*  Static Launch Method                        */
  /* -------------------------------------------- */

  /**
   * Launch the NPC creation wizard
   * @returns {NPCCreationWizard}
   */
  static launch() {
    if (!game.user.isGM) {
      ui.notifications.error(game.i18n.localize('AOA.NPCCreation.GMOnly'));
      return null;
    }

    const wizard = new NPCCreationWizard();
    wizard.render(true);
    return wizard;
  }
}

// Register for global access
globalThis.AOA = globalThis.AOA || {};
globalThis.AOA.NPCCreationWizard = NPCCreationWizard;
