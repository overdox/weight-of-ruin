/**
 * The Weight of Ruin - Character Creation Wizard
 * Guided 10-step character creation process with LP (Legacy Points) tracking.
 *
 * Steps:
 * 1. Lineage - Roll 3d6 or select, +25 LP for accepting roll
 * 2. Background - Select by tier, +50 LP for The Heretics/Outcast
 * 3. Archetype - Roll 1d6 or select, +25 LP for accepting roll
 * 4. Pathway - Roll 1d6 or select, +25 LP for accepting roll
 * 5. Life Events - Draw up to 3, +10 LP each accepted
 * 6. Attributes - Allocate 20 points (max 5 per attribute)
 * 7. Skills & Talents - Apply grants + free allocation
 * 8. Derived Attributes - Confirmation display
 * 9. Passions - Enter Motivation, Nature, Allegiance
 * 10. Gear & Finalization - Equipment purchase, LP→XP conversion
 */

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class CharacterCreationWizard extends HandlebarsApplicationMixin(ApplicationV2) {

  /** @override */
  static DEFAULT_OPTIONS = {
    id: 'character-creation-wizard',
    classes: ['wor', 'weight-of-ruin', 'character-creation'],
    tag: 'form',
    form: {
      handler: CharacterCreationWizard.#onFormSubmit,
      closeOnSubmit: false
    },
    position: {
      width: 1180,
      height: 900
    },
    window: {
      title: 'AOA.CharacterCreation.Title',
      icon: 'fas fa-user-plus',
      resizable: true
    },
    actions: {
      rollLineage: CharacterCreationWizard.#onRollLineage,
      selectLineage: CharacterCreationWizard.#onSelectLineage,
      rollBackground: CharacterCreationWizard.#onRollBackground,
      selectBackground: CharacterCreationWizard.#onSelectBackground,
      rollArchetype: CharacterCreationWizard.#onRollArchetype,
      selectArchetype: CharacterCreationWizard.#onSelectArchetype,
      selectCalling: CharacterCreationWizard.#onSelectCalling,
      rollPathway: CharacterCreationWizard.#onRollPathway,
      selectPathway: CharacterCreationWizard.#onSelectPathway,
      drawLifeEvent: CharacterCreationWizard.#onDrawLifeEvent,
      acceptLifeEvent: CharacterCreationWizard.#onAcceptLifeEvent,
      rejectLifeEvent: CharacterCreationWizard.#onRejectLifeEvent,
      adjustAttribute: CharacterCreationWizard.#onAdjustAttribute,
      selectFlexibleAttribute: CharacterCreationWizard.#onSelectFlexibleAttribute,
      addSkillRank: CharacterCreationWizard.#onAddSkillRank,
      removeSkillRank: CharacterCreationWizard.#onRemoveSkillRank,
      addTalent: CharacterCreationWizard.#onAddTalent,
      removeTalent: CharacterCreationWizard.#onRemoveTalent,
      purchaseGear: CharacterCreationWizard.#onPurchaseGear,
      removeGear: CharacterCreationWizard.#onRemoveGear,
      rollStartingWealth: CharacterCreationWizard.#onRollStartingWealth,
      convertLPtoXP: CharacterCreationWizard.#onConvertLPtoXP,
      previousStep: CharacterCreationWizard.#onPreviousStep,
      nextStep: CharacterCreationWizard.#onNextStep,
      finalize: CharacterCreationWizard.#onFinalize
    }
  };

  /** @override */
  static PARTS = {
    header: {
      template: 'systems/weight-of-ruin/templates/apps/creation/creation-header.hbs'
    },
    content: {
      template: 'systems/weight-of-ruin/templates/apps/creation/creation-content.hbs',
      scrollable: ['.creation-step-content']
    },
    footer: {
      template: 'systems/weight-of-ruin/templates/apps/creation/creation-footer.hbs'
    }
  };

  /**
   * Step definitions
   * @type {Object[]}
   */
  static STEPS = [
    { id: 'lineage', label: 'AOA.CharacterCreation.Step.Lineage', number: 1 },
    { id: 'background', label: 'AOA.CharacterCreation.Step.Background', number: 2 },
    { id: 'archetype', label: 'AOA.CharacterCreation.Step.Archetype', number: 3 },
    { id: 'pathway', label: 'AOA.CharacterCreation.Step.Pathway', number: 4 },
    { id: 'lifeEvents', label: 'AOA.CharacterCreation.Step.LifeEvents', number: 5 },
    { id: 'attributes', label: 'AOA.CharacterCreation.Step.Attributes', number: 6 },
    { id: 'skills', label: 'AOA.CharacterCreation.Step.Skills', number: 7 },
    { id: 'talents', label: 'AOA.CharacterCreation.Step.Talents', number: 8 },
    { id: 'passions', label: 'AOA.CharacterCreation.Step.Passions', number: 9 },
    { id: 'finalize', label: 'AOA.CharacterCreation.Step.Finalize', number: 10 }
  ];

  /**
   * LP (Legacy Points) awards for various choices
   * @type {Object}
   */
  static LP_AWARDS = {
    rolledLineage: 25,
    rolledBackground: 50,
    rolledArchetype: 25,
    rolledPathway: 25,
    lifeEventAccepted: 10
  };

  /* -------------------------------------------- */
  /*  Constructor                                 */
  /* -------------------------------------------- */

  /**
   * @param {Actor|null} actor - Existing actor to edit, or null to create new
   * @param {Object} options - Application options
   */
  constructor(actor = null, options = {}) {
    super(options);

    /**
     * The actor being created/edited
     * @type {Actor|null}
     */
    this.actor = actor;

    /**
     * Current step (0-indexed)
     * @type {number}
     */
    this.currentStep = 0;

    /**
     * Working character data (accumulated through steps)
     * @type {Object}
     */
    this.characterData = this._initializeCharacterData();

    /**
     * LP tracking
     * @type {Object}
     */
    this.lp = {
      earned: 0,
      spent: 0
    };

    /**
     * Compendium data cache
     * @type {Object}
     */
    this._compendiumCache = {};

    /**
     * Current pending life event (for accept/reject)
     * @type {Object|null}
     */
    this._pendingLifeEvent = null;

    /**
     * Roll results cache (committed once rolled)
     * @type {Object}
     */
    this._rollResults = {
      lineage: null,
      background: null,
      archetype: null,
      pathway: null
    };

    /**
     * Current subtab state (for Skills/Talents step persistence)
     * @type {string}
     */
    this._currentSubtab = 'skills';

    /**
     * Current talent filter state
     * @type {string}
     */
    this._talentFilter = 'all';

    /**
     * Current gear tab state
     * @type {string}
     */
    this._gearTab = 'weapons';

    /**
     * Finalize step tab state (legacy or equipment)
     * @type {string}
     */
    this._finalizeTab = 'legacy';

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
   * Initialize empty character data structure
   * @returns {Object}
   * @private
   */
  _initializeCharacterData() {
    return {
      name: '',
      // Identity
      lineage: null,
      lineageItem: null,
      background: null,
      backgroundItem: null,
      archetype: null,
      archetypeItem: null,
      calling: null,
      pathway: null,
      pathwayItem: null,
      province: '',
      age: null,
      // Life Events
      lifeEvents: [],
      // Attributes (base values before modifiers)
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
      // Points allocated during attribute step
      attributePointsSpent: 0,
      // Flexible attribute bonus (for Human)
      flexibleAttributeChoice: null,
      // Witchsight
      witchsight: 0,
      // Skills (accumulated from all sources)
      skills: {},
      // Free skill ranks to allocate
      freeSkillRanks: 0,
      freeSkillRanksSpent: 0,
      // Talents
      talents: [],
      // Passions
      passions: {
        motivation: '',
        nature: '',
        allegiance: ''
      },
      // Wealth
      wealth: {
        orin: 0,
        crowns: 0,
        sovereigns: 0
      },
      wealthRolled: false,
      // Starting equipment
      equipment: [],
      // Social standing (from background)
      socialStanding: {
        tier: 'penitent',  // Default, will be set by background selection
        rank: 0
      },
      // Contacts
      contacts: [],
      // Flags for tracking choices
      rolledLineage: false,
      rolledArchetype: false,
      rolledPathway: false,
      // XP from leftover LP
      startingXP: 0
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

    // Find compendium packs for this item type
    for (const pack of game.packs) {
      if (pack.documentName !== 'Item') continue;

      const index = await pack.getIndex();
      for (const entry of index) {
        // Load full document to check type
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
   * Get lineages from compendium
   * @returns {Promise<Item[]>}
   */
  async getLineages() {
    return this._loadCompendiumItems('lineage');
  }

  /**
   * Get backgrounds from compendium
   * @returns {Promise<Item[]>}
   */
  async getBackgrounds() {
    return this._loadCompendiumItems('background');
  }

  /**
   * Get archetypes from compendium
   * @returns {Promise<Item[]>}
   */
  async getArchetypes() {
    return this._loadCompendiumItems('archetype');
  }

  /**
   * Get pathways from compendium
   * @returns {Promise<Item[]>}
   */
  async getPathways() {
    return this._loadCompendiumItems('pathway');
  }

  /**
   * Get life events from compendium
   * @returns {Promise<Item[]>}
   */
  async getLifeEvents() {
    return this._loadCompendiumItems('lifeEvent');
  }

  /**
   * Get skills from compendium
   * @returns {Promise<Item[]>}
   */
  async getSkills() {
    return this._loadCompendiumItems('skill');
  }

  /**
   * Get talents from compendium
   * @returns {Promise<Item[]>}
   */
  async getTalents() {
    return this._loadCompendiumItems('talent');
  }

  /**
   * Get gear from compendium
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

    // Add input change listeners for passions and finalize steps
    if (partId === 'content') {
      // Passion inputs
      const motivationInput = htmlElement.querySelector('input[name="motivation"]');
      const natureInput = htmlElement.querySelector('input[name="nature"]');
      const allegianceInput = htmlElement.querySelector('input[name="allegiance"]');

      if (motivationInput) {
        motivationInput.addEventListener('input', (e) => {
          this.characterData.passions.motivation = e.target.value;
          this._updateNavigationState();
        });
      }
      if (natureInput) {
        natureInput.addEventListener('input', (e) => {
          this.characterData.passions.nature = e.target.value;
        });
      }
      if (allegianceInput) {
        allegianceInput.addEventListener('input', (e) => {
          this.characterData.passions.allegiance = e.target.value;
        });
      }

      // Character name input (finalize step)
      const nameInput = htmlElement.querySelector('input[name="name"]');
      if (nameInput) {
        nameInput.addEventListener('input', (e) => {
          this.characterData.name = e.target.value;
          this._updateNavigationState();
        });
      }

      // Age input (finalize step)
      const ageInput = htmlElement.querySelector('input[name="age"]');
      if (ageInput) {
        ageInput.addEventListener('input', (e) => {
          this.characterData.age = parseInt(e.target.value) || null;
        });
      }

      // Sub-tab switching for Skills/Talents (Step 7)
      const subtabBtns = htmlElement.querySelectorAll('[data-action="switchSubtab"]');
      subtabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const targetSubtab = btn.dataset.subtab;
          const container = btn.closest('.step-skills');
          if (!container) return;

          // Track current subtab state
          this._currentSubtab = targetSubtab;

          // Update button states
          container.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Update panel visibility
          container.querySelectorAll('.subtab-panel').forEach(panel => {
            panel.classList.toggle('active', panel.dataset.subtabPanel === targetSubtab);
          });
        });
      });

      // Restore subtab state on render
      const stepSkills = htmlElement.querySelector('.step-skills');
      if (stepSkills && this._currentSubtab) {
        const activeBtn = stepSkills.querySelector(`.subtab-btn[data-subtab="${this._currentSubtab}"]`);
        if (activeBtn) {
          stepSkills.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
          activeBtn.classList.add('active');
          stepSkills.querySelectorAll('.subtab-panel').forEach(panel => {
            panel.classList.toggle('active', panel.dataset.subtabPanel === this._currentSubtab);
          });
        }
      }

      // Talent filter tabs
      const talentFilterBtns = htmlElement.querySelectorAll('.talent-filter-btn');
      talentFilterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const filter = btn.dataset.filter;
          this._talentFilter = filter;

          // Update button states
          talentFilterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Filter talents
          const talentsGrid = htmlElement.querySelector('.talents-grid.redesigned');
          if (talentsGrid) {
            const cards = talentsGrid.querySelectorAll('.talent-card.redesigned');
            cards.forEach(card => {
              const talentType = card.dataset.talentType;
              let show = false;

              switch (filter) {
                case 'all':
                  show = true;
                  break;
                case 'universal':
                  // Show only universal talents
                  show = talentType === 'universal';
                  break;
                case 'archetype':
                  // Show only archetype talents that match the selected archetype
                  show = talentType === 'archetype' && card.dataset.matchesArchetype === 'true';
                  break;
                case 'signature':
                  // Show only signature talents that match the selected calling
                  show = talentType === 'signature' && card.dataset.matchesCalling === 'true';
                  break;
              }

              card.style.display = show ? '' : 'none';
            });
          }
        });
      });

      // Restore talent filter state
      if (this._talentFilter && this._talentFilter !== 'all') {
        const filterBtn = htmlElement.querySelector(`.talent-filter-btn[data-filter="${this._talentFilter}"]`);
        if (filterBtn) filterBtn.click();
      }
    }

    // Gear tab switching (finalize step)
    const gearTabBtns = htmlElement.querySelectorAll('.gear-tab-btn');
    if (gearTabBtns.length) {
      gearTabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tab = btn.dataset.gearTab;
          this._gearTab = tab;

          // Update button states
          gearTabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Show/hide panels
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

    // Finalize step tab switching (Legacy/Equipment)
    const finalizeTabBtns = htmlElement.querySelectorAll('.finalize-tab-btn');
    if (finalizeTabBtns.length) {
      finalizeTabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tab = btn.dataset.finalizeTab;
          this._finalizeTab = tab;

          // Update button states
          finalizeTabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Show/hide panels
          const panels = htmlElement.querySelectorAll('.finalize-tab-panel');
          panels.forEach(panel => {
            panel.classList.toggle('active', panel.dataset.finalizeTabPanel === tab);
          });
        });
      });

      // Restore finalize tab state
      if (this._finalizeTab) {
        const activeTabBtn = htmlElement.querySelector(`.finalize-tab-btn[data-finalize-tab="${this._finalizeTab}"]`);
        if (activeTabBtn) {
          finalizeTabBtns.forEach(b => b.classList.remove('active'));
          activeTabBtn.classList.add('active');
          const panels = htmlElement.querySelectorAll('.finalize-tab-panel');
          panels.forEach(panel => {
            panel.classList.toggle('active', panel.dataset.finalizeTabPanel === this._finalizeTab);
          });
        }
      }
    }

    // Equipment filter dropdowns
    const weaponGroupFilter = htmlElement.querySelector('.weapon-group-filter');
    if (weaponGroupFilter) {
      weaponGroupFilter.addEventListener('change', (e) => {
        this._equipmentFilters.weaponGroup = e.target.value;
        this._applyEquipmentFilter('weapon', e.target.value, htmlElement);
      });
      // Restore filter state
      weaponGroupFilter.value = this._equipmentFilters.weaponGroup;
      this._applyEquipmentFilter('weapon', this._equipmentFilters.weaponGroup, htmlElement);
    }

    const armorGroupFilter = htmlElement.querySelector('.armor-group-filter');
    if (armorGroupFilter) {
      armorGroupFilter.addEventListener('change', (e) => {
        this._equipmentFilters.armorGroup = e.target.value;
        this._applyEquipmentFilter('armor', e.target.value, htmlElement);
      });
      // Restore filter state
      armorGroupFilter.value = this._equipmentFilters.armorGroup;
      this._applyEquipmentFilter('armor', this._equipmentFilters.armorGroup, htmlElement);
    }

    const gearGroupFilter = htmlElement.querySelector('.gear-group-filter');
    if (gearGroupFilter) {
      gearGroupFilter.addEventListener('change', (e) => {
        this._equipmentFilters.gearGroup = e.target.value;
        this._applyEquipmentFilter('gear', e.target.value, htmlElement);
      });
      // Restore filter state
      gearGroupFilter.value = this._equipmentFilters.gearGroup;
      this._applyEquipmentFilter('gear', this._equipmentFilters.gearGroup, htmlElement);
    }
  }

  /**
   * Apply equipment filter to show/hide items
   * @param {string} type - 'weapon', 'armor', or 'gear'
   * @param {string} filterValue - The filter value
   * @param {HTMLElement} htmlElement - The container element
   * @private
   */
  _applyEquipmentFilter(type, filterValue, htmlElement) {
    // Panel names: weapons, armor, gear (armor is singular in template)
    const panelName = type === 'weapon' ? 'weapons' : type;
    const panelSelector = `.gear-tab-panel[data-gear-tab-panel="${panelName}"]`;
    const panel = htmlElement.querySelector(panelSelector);
    if (!panel) return;

    const cards = panel.querySelectorAll('.gear-card');
    cards.forEach(card => {
      if (filterValue === 'all') {
        card.style.display = '';
      } else {
        const cardGroup = card.dataset.group || '';
        // For armor, also check if it's a shield
        if (type === 'armor' && filterValue === 'shield') {
          card.style.display = card.dataset.armorCategory === 'shield' ? '' : 'none';
        } else {
          card.style.display = cardGroup === filterValue ? '' : 'none';
        }
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

    if (nextBtn) {
      nextBtn.disabled = !canProceed;
    }
    if (finalizeBtn) {
      finalizeBtn.disabled = !canProceed;
    }
  }

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = {
      // Current step info
      currentStep: this.currentStep,
      stepId: CharacterCreationWizard.STEPS[this.currentStep].id,
      stepLabel: CharacterCreationWizard.STEPS[this.currentStep].label,
      steps: CharacterCreationWizard.STEPS.map((step, index) => ({
        ...step,
        active: index === this.currentStep,
        completed: index < this.currentStep,
        future: index > this.currentStep
      })),

      // LP tracking
      lp: {
        earned: this.lp.earned,
        spent: this.lp.spent,
        remaining: this.lp.earned - this.lp.spent
      },

      // Character data
      characterData: this.characterData,

      // Roll results
      rollResults: this._rollResults,

      // Pending life event
      pendingLifeEvent: this._pendingLifeEvent,

      // Can proceed to next step
      canProceed: this._canProceedToNextStep(),

      // Is final step
      isFinalStep: this.currentStep === CharacterCreationWizard.STEPS.length - 1,

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
    const stepId = CharacterCreationWizard.STEPS[this.currentStep].id;

    switch (stepId) {
      case 'lineage':
        context.lineages = await this.getLineages();
        context.hasRolled = this._rollResults.lineage !== null;
        context.rolledLineage = this._rollResults.lineage;
        break;

      case 'background':
        const backgrounds = await this.getBackgrounds();
        // Group backgrounds by social standing for display (highest to lowest)
        // Note: freeSkillRanks is now computed from socialStanding in the data model
        context.backgrounds = {
          exalted: backgrounds.filter(b => b.system.socialStanding === 'exalted'),
          ordained: backgrounds.filter(b => b.system.socialStanding === 'ordained'),
          anointed: backgrounds.filter(b => b.system.socialStanding === 'anointed'),
          penitent: backgrounds.filter(b => b.system.socialStanding === 'penitent'),
          heretics: backgrounds.filter(b => b.system.socialStanding === 'heretics'),
          outcast: backgrounds.filter(b => b.system.socialStanding === 'outcast')
        };
        context.allBackgrounds = backgrounds;
        // Provide social standings config for display
        context.socialStandings = CONFIG.AOA.socialStandings;
        context.socialStandingSkillRanks = CONFIG.AOA.socialStandingSkillRanks;
        context.hasRolled = this._rollResults.background !== null;
        context.rolledBackground = this._rollResults.background;
        break;

      case 'archetype':
        context.archetypes = await this.getArchetypes();
        context.hasRolled = this._rollResults.archetype !== null;
        context.rolledArchetype = this._rollResults.archetype;
        context.selectedArchetype = this.characterData.archetypeItem;
        break;

      case 'pathway':
        context.pathways = await this.getPathways();
        context.hasRolled = this._rollResults.pathway !== null;
        context.rolledPathway = this._rollResults.pathway;
        break;

      case 'lifeEvents':
        context.lifeEventsAvailable = await this.getLifeEvents();
        context.acceptedEvents = this.characterData.lifeEvents;
        context.canDrawMore = this.characterData.lifeEvents.length < 3;
        context.hasPending = this._pendingLifeEvent !== null;
        break;

      case 'attributes':
        context.attributePointsTotal = 20;
        context.attributePointsSpent = this.characterData.attributePointsSpent;
        context.attributePointsRemaining = 20 - this.characterData.attributePointsSpent;
        context.lineageModifiers = this.characterData.lineageItem?.system?.attributeModifiers || {};
        context.archetypeModifiers = this.characterData.archetypeItem?.system?.attributeBonuses || {};
        context.hasFlexibleBonus = this.characterData.lineageItem?.system?.hasFlexibleBonus || false;
        context.flexibleAttributeChoice = this.characterData.flexibleAttributeChoice;
        context.computedAttributes = this._computeAttributes();
        // Add totals for easy template access
        context.attributeTotals = {};
        for (const [key, data] of Object.entries(context.computedAttributes)) {
          context.attributeTotals[key] = (data.base || 0) + (data.advances || 0) + (data.modifier || 0);
        }
        // Add lineage base speed for movement calculation
        context.baseSpeed = this.characterData.lineageItem?.system?.baseSpeed ?? 2;
        context.attributeList = [
          { key: 'strength', label: 'AOA.Attributes.Strength' },
          { key: 'fortitude', label: 'AOA.Attributes.Fortitude' },
          { key: 'agility', label: 'AOA.Attributes.Agility' },
          { key: 'awareness', label: 'AOA.Attributes.Awareness' },
          { key: 'resolve', label: 'AOA.Attributes.Resolve' },
          { key: 'persona', label: 'AOA.Attributes.Persona' },
          { key: 'ingenuity', label: 'AOA.Attributes.Ingenuity' },
          { key: 'expertise', label: 'AOA.Attributes.Expertise' }
        ];
        break;

      case 'skills':
        const allSkills = await this.getSkills();
        context.availableSkills = allSkills;
        context.skillsByCategory = this._groupSkillsByCategory(allSkills);
        context.characterSkills = this.characterData.skills;
        context.grantedSkills = this._getGrantedSkills();
        context.freeSkillRanks = this._calculateFreeSkillRanks();
        context.freeSkillRanksSpent = this.characterData.freeSkillRanksSpent;
        context.freeSkillRanksRemaining = context.freeSkillRanks - context.freeSkillRanksSpent;
        context.hasWitchsight = this._computeTotalWitchsight() > 0;
        break;

      case 'talents':
        // Get talents and mark free calling talents
        const rawTalents = await this.getTalents();
        const characterCalling = this.characterData.calling?.toLowerCase();
        const characterArchetype = this.characterData.archetypeItem?.name?.toLowerCase();

        // Get signature talent names from the archetype's calling
        const archetypeSubtype = this.characterData.archetypeItem?.system?.subtypes?.find(
          s => s.name.toLowerCase() === characterCalling
        );
        const callingSignatureTalents = archetypeSubtype?.signatureTalents?.map(t => t.toLowerCase()) || [];

        context.availableTalents = rawTalents.map(talent => {
          const t = foundry.utils.deepClone(talent);
          const talentNameLower = t.name.toLowerCase();
          const talentArchetype = t.system.archetype?.toLowerCase();
          const talentSubtype = t.system.subtype?.toLowerCase();

          // Mark archetype talents that match the character's selected archetype
          if (t.system.talentType === 'archetype') {
            t.system.matchesCharacterArchetype = talentArchetype === characterArchetype;
          }

          // A talent is for this calling if:
          // 1. It's a signature talent AND
          // 2. Either the talent name is in the archetype's signature talents list for this calling
          //    OR the talent's subtype matches the character's calling
          const isCallingTalent = t.system.talentType === 'signature' && (
            callingSignatureTalents.includes(talentNameLower) ||
            talentSubtype === characterCalling
          );

          if (isCallingTalent) {
            t.system.isFreeCalling = true;
            t.system.callingName = characterCalling; // For filtering
            t.system.matchesCharacterCalling = true;
          } else if (t.system.talentType === 'signature') {
            t.system.matchesCharacterCalling = false;
          }

          return t;
        });
        context.characterTalents = this.characterData.talents;
        context.hasWitchsight = this._computeTotalWitchsight() > 0;
        context.talentFilter = this._talentFilter || 'all';
        break;

      case 'passions':
        context.passions = this.characterData.passions;
        break;

      case 'finalize':
        // Finalize tab state (legacy or equipment)
        context.finalizeTab = this._finalizeTab || 'legacy';

        // Load gear by category
        const availableWeapons = await this._loadCompendiumItems('weapon');
        const availableArmor = await this._loadCompendiumItems('armor');
        const availableGear = await this._loadCompendiumItems('gear');

        context.availableWeapons = availableWeapons;
        context.availableArmor = availableArmor;
        context.availableGear = availableGear;
        context.gearTab = this._gearTab || 'weapons';
        context.purchasedGear = this.characterData.equipment;
        context.startingWealth = this._calculateStartingWealth();
        context.currentWealth = this.characterData.wealth;
        context.wealthRolled = this.characterData.wealthRolled;
        context.totalWealthOrin = this.characterData.wealth.orin +
                                  (this.characterData.wealth.crowns * 10) +
                                  (this.characterData.wealth.sovereigns * 100);
        // Background wealth info for roll button
        context.backgroundWealth = this.characterData.backgroundItem?.system.startingWealth || null;
        context.lpRemaining = this.lp.earned - this.lp.spent;
        context.startingXP = this.characterData.startingXP;
        context.characterSummary = this._generateCharacterSummary();

        // Derived attributes for Legacy tab
        context.derivedAttributes = this._computeDerivedAttributes();

        // Equipment filter states
        context.equipmentFilters = this._equipmentFilters;

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
   * Compute total attributes including all modifiers
   * Returns an object with base/advances/modifier structure for each attribute
   * @returns {Object}
   * @private
   */
  _computeAttributes() {
    const allocation = this.characterData.attributes;
    const lineageMods = this.characterData.lineageItem?.system?.attributeModifiers || {};
    const archetypeMods = this.characterData.archetypeItem?.system?.attributeBonuses || {};
    const flexChoice = this.characterData.flexibleAttributeChoice;

    const result = {};
    const attrKeys = ['strength', 'fortitude', 'agility', 'awareness', 'resolve', 'persona', 'ingenuity', 'expertise'];

    for (const key of attrKeys) {
      // Calculate base from character creation sources
      let baseValue = allocation[key] || 0;
      baseValue += lineageMods[key] || 0;
      baseValue += archetypeMods[key] || 0;
      // Add flexible bonus if this attribute was chosen
      if (flexChoice === key && lineageMods.any) {
        baseValue += lineageMods.any;
      }

      // Return new structure with base/advances/modifier
      result[key] = {
        base: baseValue,
        advances: 0,  // No advances during character creation
        modifier: 0   // No temporary modifiers during character creation
      };
    }

    return result;
  }

  /**
   * Get the total value for a computed attribute (for display/calculations)
   * @param {string} attr - The attribute key
   * @returns {number}
   * @private
   */
  _getAttributeTotal(attr) {
    const attrs = this._computeAttributes();
    const attrData = attrs[attr];
    if (!attrData) return 0;
    return (attrData.base || 0) + (attrData.advances || 0) + (attrData.modifier || 0);
  }

  /**
   * Compute derived attributes
   * @returns {Object}
   * @private
   */
  _computeDerivedAttributes() {
    // Use totals for derived attribute calculations
    const toughness = this._getAttributeTotal('resolve') + this._getAttributeTotal('fortitude');
    const reflex = this._getAttributeTotal('agility') + this._getAttributeTotal('awareness');

    // Get wounds bonus from lineage (e.g., Dwarf has +1 Wounds)
    const woundsBonus = this.characterData.lineageItem?.system?.resilienceBonus || 0;
    const wounds = Math.floor((3 + toughness) / 2) + woundsBonus;

    // Get base speed from lineage (default 2 for Human)
    const baseSpeed = this.characterData.lineageItem?.system?.baseSpeed ?? 2;

    // Prowess (combat derived attributes)
    const weaponProwess = this._getAttributeTotal('strength') + this._getAttributeTotal('agility');
    const ballisticProwess = this._getAttributeTotal('awareness') + this._getAttributeTotal('agility');
    const unarmedProwess = this._getAttributeTotal('strength') + this._getAttributeTotal('fortitude');

    // Get martial skill ranks (search case-insensitively)
    const skills = this.characterData.skills || {};
    let armsRank = 0;
    let marksmanshipRank = 0;
    let brawlingRank = 0;

    // Search for skills case-insensitively
    for (const [skillName, rank] of Object.entries(skills)) {
      const lowerName = skillName.toLowerCase();
      if (lowerName === 'arms') armsRank = rank;
      else if (lowerName === 'marksmanship') marksmanshipRank = rank;
      else if (lowerName === 'brawling') brawlingRank = rank;
    }

    // Attack dice pools (Prowess + Skill)
    const meleeAttack = weaponProwess + armsRank;
    const rangedAttack = ballisticProwess + marksmanshipRank;
    const unarmedAttack = unarmedProwess + brawlingRank;

    return {
      toughness,
      reflex,
      defense: Math.floor((3 + reflex) / 2),
      baseSpeed,
      movement: baseSpeed + this._getAttributeTotal('agility'),
      maxTrauma: 3 + toughness,
      wounds,
      weaponProwess,
      ballisticProwess,
      unarmedProwess,
      armsRank,
      marksmanshipRank,
      brawlingRank,
      meleeAttack,
      rangedAttack,
      unarmedAttack
    };
  }

  /**
   * Compute total Witchsight from all sources
   * @returns {number}
   * @private
   */
  _computeTotalWitchsight() {
    let total = 0;

    // From lineage
    if (this.characterData.lineageItem?.system?.startingWitchsight) {
      total += this.characterData.lineageItem.system.startingWitchsight;
    }

    // From archetype
    if (this.characterData.archetypeItem?.system?.startingWitchsight) {
      total += this.characterData.archetypeItem.system.startingWitchsight;
    }

    // From life events
    for (const event of this.characterData.lifeEvents) {
      const wsBenefit = event.benefits?.find(b => b.type === 'witchsight');
      if (wsBenefit?.value) {
        total += wsBenefit.value;
      }
    }

    return total;
  }

  /**
   * Get skills granted from background, pathway, and life events
   * @returns {Object}
   * @private
   */
  _getGrantedSkills() {
    const granted = {};

    // From background
    if (this.characterData.backgroundItem?.system?.skillGrants) {
      for (const grant of this.characterData.backgroundItem.system.skillGrants) {
        if (!grant.choice) {
          granted[grant.skill] = (granted[grant.skill] || 0) + grant.rank;
        }
      }
    }

    // From pathway
    if (this.characterData.pathwayItem?.system?.skillGrants) {
      for (const grant of this.characterData.pathwayItem.system.skillGrants) {
        if (!grant.choice) {
          granted[grant.skill] = (granted[grant.skill] || 0) + grant.rank;
        }
      }
    }

    // From life events
    for (const event of this.characterData.lifeEvents) {
      const skillBenefits = event.benefits?.filter(b => b.type === 'skill') || [];
      for (const benefit of skillBenefits) {
        if (benefit.target) {
          granted[benefit.target] = (granted[benefit.target] || 0) + (benefit.value || 1);
        }
      }
    }

    return granted;
  }

  /**
   * Calculate free skill ranks available (from background tier)
   * Upper: 18, Middle: 22, Lower: 28, Struggling: 36
   * @returns {number}
   * @private
   */
  _calculateFreeSkillRanks() {
    return this.characterData.backgroundItem?.system?.freeSkillRanks ?? 18;
  }

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
   * Calculate starting wealth from background
   * @returns {number}
   * @private
   */
  _calculateStartingWealth() {
    if (!this.characterData.backgroundItem) return 0;

    const wealth = this.characterData.backgroundItem.system.startingWealth;

    // Use formula if available, otherwise average
    if (wealth.formula) {
      const roll = new Roll(wealth.formula);
      roll.evaluateSync();
      return roll.total;
    }

    return Math.floor((wealth.min + wealth.max) / 2);
  }

  /**
   * Generate character summary for final step
   * @returns {Object}
   * @private
   */
  _generateCharacterSummary() {
    const attrs = this._computeAttributes();
    const derived = this._computeDerivedAttributes();

    // Compute attribute totals for display
    const attributeTotals = {};
    for (const [key, data] of Object.entries(attrs)) {
      attributeTotals[key] = (data.base || 0) + (data.advances || 0) + (data.modifier || 0);
    }

    return {
      name: this.characterData.name || game.i18n.localize('AOA.CharacterCreation.UnnamedCharacter'),
      lineage: this.characterData.lineageItem?.name || '-',
      background: this.characterData.backgroundItem?.name || '-',
      archetype: this.characterData.archetypeItem?.name || '-',
      calling: this.characterData.calling || '-',
      pathway: this.characterData.pathwayItem?.name || '-',
      attributes: attrs,
      attributeTotals,  // Simple totals for display
      derived,
      witchsight: this._computeTotalWitchsight(),
      skillCount: Object.keys(this.characterData.skills).length,
      talentCount: this.characterData.talents.length,
      lifeEventCount: this.characterData.lifeEvents.length,
      totalLP: this.lp.earned,
      spentLP: this.lp.spent,
      remainingLP: this.lp.earned - this.lp.spent
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
    const stepId = CharacterCreationWizard.STEPS[this.currentStep].id;

    switch (stepId) {
      case 'lineage':
        return this.characterData.lineageItem !== null;

      case 'background':
        return this.characterData.backgroundItem !== null;

      case 'archetype':
        return this.characterData.archetypeItem !== null &&
               (this.characterData.calling !== null ||
                !this.characterData.archetypeItem.system.subtypes?.length);

      case 'pathway':
        return this.characterData.pathwayItem !== null;

      case 'lifeEvents':
        // Life events step can always proceed (0-3 events)
        return this._pendingLifeEvent === null;

      case 'attributes':
        // Must spend all 20 points, and select flexible bonus if Human
        const hasFlexible = this.characterData.lineageItem?.system?.hasFlexibleBonus;
        const flexibleSelected = !hasFlexible || this.characterData.flexibleAttributeChoice !== null;
        return this.characterData.attributePointsSpent === 20 && flexibleSelected;

      case 'skills':
        // Must spend all free skill ranks
        const freeRanks = this._calculateFreeSkillRanks();
        return this.characterData.freeSkillRanksSpent === freeRanks;

      case 'talents':
        // Talents are optional, always can proceed
        return true;

      case 'passions':
        // At least motivation should be entered
        return this.characterData.passions.motivation?.trim().length > 0;

      case 'finalize':
        // Must have a name
        return this.characterData.name?.trim().length > 0;

      default:
        return true;
    }
  }

  /* -------------------------------------------- */
  /*  Chat Message Helpers                        */
  /* -------------------------------------------- */

  /**
   * Create an enhanced chat message for character creation rolls
   * @param {Object} options - Chat message options
   * @param {Roll} options.roll - The evaluated Roll object
   * @param {string} options.title - The title for the card (e.g., "Lineage Roll")
   * @param {string} options.resultType - The type of result (lineage, archetype, pathway, background)
   * @param {Object} options.result - The result item (name, img, subtitle)
   * @param {string} [options.specialMessage] - Optional special message (e.g., "Player's Choice!")
   * @param {number} [options.lpAward] - LP awarded for this roll
   * @returns {Promise<ChatMessage>}
   */
  static async #createCreationRollMessage({
    roll,
    title,
    resultType,
    result = null,
    specialMessage = null,
    lpAward = null
  }) {
    const templateData = {
      formula: roll.formula,
      total: roll.total,
      title,
      resultType,
      result,
      specialMessage,
      lpAward
    };

    const content = await foundry.applications.handlebars.renderTemplate(
      'systems/weight-of-ruin/templates/chat/creation-roll.hbs',
      templateData
    );

    return ChatMessage.create({
      content,
      speaker: { alias: game.i18n.localize('AOA.CharacterCreation.Title') },
      style: CONST.CHAT_MESSAGE_STYLES.OTHER
    });
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Lineage                   */
  /* -------------------------------------------- */

  /**
   * Roll for lineage (3d6)
   */
  static async #onRollLineage(event, target) {
    // Prevent rolling if already rolled (committed)
    if (this._rollResults.lineage !== null) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.RollAlreadyCommitted'));
      return;
    }

    const roll = await new Roll('3d6').evaluate();
    const total = roll.total;

    // Find matching lineage
    const lineages = await this.getLineages();
    const matchedLineage = lineages.find(l => l.system.matchesRoll(total));

    // Display enhanced roll in chat
    await CharacterCreationWizard.#createCreationRollMessage({
      roll,
      title: game.i18n.localize('AOA.CharacterCreation.LineageRoll'),
      resultType: 'lineage',
      result: matchedLineage ? {
        name: matchedLineage.name,
        img: matchedLineage.img
      } : null,
      lpAward: matchedLineage ? CharacterCreationWizard.LP_AWARDS.rolledLineage : null
    });

    this._rollResults.lineage = {
      roll: total,
      lineage: matchedLineage
    };

    // Auto-select and award LP
    if (matchedLineage) {
      this.characterData.lineage = matchedLineage.name;
      this.characterData.lineageItem = matchedLineage;
      this.characterData.rolledLineage = true;
      this.lp.earned += CharacterCreationWizard.LP_AWARDS.rolledLineage;
    }

    this.render();
  }

  /**
   * Manually select lineage
   */
  static async #onSelectLineage(event, target) {
    const lineageId = target.dataset.lineageId;
    const lineages = await this.getLineages();
    const lineage = lineages.find(l => l.id === lineageId);

    if (!lineage) return;

    // If previously rolled, remove LP (can't change from roll to selection)
    if (this.characterData.rolledLineage) {
      this.lp.earned -= CharacterCreationWizard.LP_AWARDS.rolledLineage;
      this.characterData.rolledLineage = false;
    }

    this.characterData.lineage = lineage.name;
    this.characterData.lineageItem = lineage;

    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Background                */
  /* -------------------------------------------- */

  /**
   * Background roll tables
   */
  static BACKGROUND_ROLL_TABLES = {
    // d100 ranges for social standing
    standingRanges: [
      { min: 1, max: 5, standing: 'exalted' },
      { min: 6, max: 15, standing: 'ordained' },
      { min: 16, max: 45, standing: 'anointed' },
      { min: 46, max: 75, standing: 'penitent' },
      { min: 76, max: 95, standing: 'heretics' },
      { min: 96, max: 100, standing: 'outcast' }
    ],
    // Backgrounds by standing (in roll order)
    backgroundsByStanding: {
      exalted: { die: '1d3', backgrounds: ['Merchant Prince', 'Knight', 'Disgraced Noble'] },
      ordained: { die: '1d3', backgrounds: ['Abbot', 'Courtier', 'Justiciar'] },
      anointed: { die: '1d10', backgrounds: ['Guildmaster', 'Steward', 'Master Artificer', 'Ship Captain', 'Master Mason', 'Physician', 'Apothecary', 'Investigator', 'Innkeeper', 'Bailiff'] },
      penitent: { die: '1d8', backgrounds: ['Blacksmith', 'Barber-Surgeon', 'Caravan Guard', 'Minstrel', 'Night Watchman', 'Scribe', 'Dockhand', 'Serf'] },
      heretics: { die: '1d8', backgrounds: ['Smuggler', 'Pit Fighter', 'Jailer', 'Executioner', 'Camp Follower', 'Bastard', 'Gong-farmer', 'REROLL'] },
      outcast: { die: '1d5', backgrounds: ['Grave Robber', 'Vagrant', 'Mudlark', 'Village Idiot', 'Flagellant'] }
    }
  };

  /**
   * Roll for background (d100 for standing, then die for background)
   */
  static async #onRollBackground(event, target) {
    if (this._rollResults.background !== null) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.RollAlreadyCommitted'));
      return;
    }

    const tables = CharacterCreationWizard.BACKGROUND_ROLL_TABLES;

    // Step 1: Roll d100 for social standing
    const standingRoll = await new Roll('1d100').evaluate();
    const standingResult = tables.standingRanges.find(r => standingRoll.total >= r.min && standingRoll.total <= r.max);
    const standing = standingResult.standing;

    // Step 2: Roll for background within standing (handle reroll for Heretics)
    const standingTable = tables.backgroundsByStanding[standing];
    let backgroundRoll, backgroundName;
    let rerollCount = 0;

    do {
      backgroundRoll = await new Roll(standingTable.die).evaluate();
      backgroundName = standingTable.backgrounds[backgroundRoll.total - 1];
      rerollCount++;
    } while (backgroundName === 'REROLL' && rerollCount < 10); // Safety limit

    // Find the actual background item
    const backgrounds = await this.getBackgrounds();
    const rolledBackground = backgrounds.find(b => b.name === backgroundName);

    if (!rolledBackground) {
      ui.notifications.error(`Background "${backgroundName}" not found in compendium.`);
      return;
    }

    // Prepare dice data for display
    const standingLabel = game.i18n.localize(`AOA.SocialStanding.${standing.charAt(0).toUpperCase() + standing.slice(1)}`);
    const standingDice = standingRoll.dice[0]?.results.map(r => ({
      result: r.result,
      faces: standingRoll.dice[0].faces,
      isMax: r.result === standingRoll.dice[0].faces,
      isMin: r.result === 1
    })) || [];

    const backgroundDice = backgroundRoll.dice[0]?.results.map(r => ({
      result: r.result,
      faces: backgroundRoll.dice[0].faces,
      isMax: r.result === backgroundRoll.dice[0].faces,
      isMin: r.result === 1
    })) || [];

    // Send enhanced roll message
    const content = await renderTemplate(
      'systems/weight-of-ruin/templates/chat/creation-background-roll.hbs',
      {
        standingFormula: standingRoll.formula,
        standingTotal: standingRoll.total,
        standingDice,
        standingName: standingLabel,
        backgroundFormula: backgroundRoll.formula,
        backgroundTotal: backgroundRoll.total,
        backgroundDice,
        result: {
          name: rolledBackground.name,
          img: rolledBackground.img
        },
        lpAward: CharacterCreationWizard.LP_AWARDS.rolledBackground
      }
    );

    await ChatMessage.create({
      content,
      speaker: { alias: game.i18n.localize('AOA.CharacterCreation.Title') },
      style: CONST.CHAT_MESSAGE_STYLES.OTHER
    });

    this._rollResults.background = {
      standingRoll: standingRoll.total,
      standing: standing,
      backgroundRoll: backgroundRoll.total,
      background: rolledBackground,
      isChoice: false
    };

    // Auto-select the rolled background
    this.characterData.background = rolledBackground.name;
    this.characterData.backgroundItem = rolledBackground;
    this.characterData.socialStanding = {
      tier: rolledBackground.system.socialStanding,
      rank: 0
    };
    this.characterData.rolledBackground = true;

    // Award LP for accepting the roll
    this.lp.earned += CharacterCreationWizard.LP_AWARDS.rolledBackground;

    this.render();
  }

  /**
   * Select background (manual choice)
   */
  static async #onSelectBackground(event, target) {
    const backgroundId = target.dataset.backgroundId;
    const backgrounds = await this.getBackgrounds();
    const background = backgrounds.find(b => b.id === backgroundId);

    if (!background) return;

    // If switching from a rolled background to a manual choice, remove the LP bonus
    if (this.characterData.rolledBackground && this._rollResults.background &&
        this._rollResults.background.background?.id !== backgroundId) {
      this.lp.earned -= CharacterCreationWizard.LP_AWARDS.rolledBackground;
      this.characterData.rolledBackground = false;
    }

    // If selecting the rolled background after previously choosing something else
    if (this._rollResults.background?.background?.id === backgroundId && !this.characterData.rolledBackground) {
      this.lp.earned += CharacterCreationWizard.LP_AWARDS.rolledBackground;
      this.characterData.rolledBackground = true;
    }

    this.characterData.background = background.name;
    this.characterData.backgroundItem = background;
    this.characterData.socialStanding = {
      tier: background.system.socialStanding,
      rank: 0
    };

    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Archetype                 */
  /* -------------------------------------------- */

  /**
   * Roll for archetype (1d6)
   */
  static async #onRollArchetype(event, target) {
    if (this._rollResults.archetype !== null) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.RollAlreadyCommitted'));
      return;
    }

    const roll = await new Roll('1d6').evaluate();
    const total = roll.total;

    // Map roll to archetype (1-5 = specific, 6 = choice)
    const archetypes = await this.getArchetypes();
    let matchedArchetype = null;
    const isChoice = total === 6;

    if (total <= 5) {
      matchedArchetype = archetypes.find(a => a.system.rollValue === total);
    }

    // Display enhanced roll in chat
    await CharacterCreationWizard.#createCreationRollMessage({
      roll,
      title: game.i18n.localize('AOA.CharacterCreation.ArchetypeRoll'),
      resultType: 'archetype',
      result: matchedArchetype ? {
        name: matchedArchetype.name,
        img: matchedArchetype.img
      } : null,
      specialMessage: isChoice ? game.i18n.localize('AOA.CharacterCreation.PlayerChoice') : null,
      lpAward: CharacterCreationWizard.LP_AWARDS.rolledArchetype
    });

    this._rollResults.archetype = {
      roll: total,
      archetype: matchedArchetype,
      isChoice
    };

    if (matchedArchetype) {
      this.characterData.archetype = matchedArchetype.name;
      this.characterData.archetypeItem = matchedArchetype;
      this.characterData.rolledArchetype = true;
      this.lp.earned += CharacterCreationWizard.LP_AWARDS.rolledArchetype;
    }

    this.render();
  }

  /**
   * Manually select archetype
   */
  static async #onSelectArchetype(event, target) {
    const archetypeId = target.dataset.archetypeId;
    const archetypes = await this.getArchetypes();
    const archetype = archetypes.find(a => a.id === archetypeId);

    if (!archetype) return;

    // Handle LP for changing from rolled
    if (this.characterData.rolledArchetype && !this._rollResults.archetype?.isChoice) {
      this.lp.earned -= CharacterCreationWizard.LP_AWARDS.rolledArchetype;
      this.characterData.rolledArchetype = false;
    }

    // If roll was 6 (choice), still award LP
    if (this._rollResults.archetype?.isChoice && !this.characterData.rolledArchetype) {
      this.characterData.rolledArchetype = true;
      this.lp.earned += CharacterCreationWizard.LP_AWARDS.rolledArchetype;
    }

    this.characterData.archetype = archetype.name;
    this.characterData.archetypeItem = archetype;
    this.characterData.calling = null; // Reset calling

    this.render();
  }

  /**
   * Select archetype calling (specialization)
   */
  static async #onSelectCalling(event, target) {
    const callingName = target.dataset.calling;
    this.characterData.calling = callingName;
    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Pathway                   */
  /* -------------------------------------------- */

  /**
   * Roll for pathway (1d6)
   */
  static async #onRollPathway(event, target) {
    if (this._rollResults.pathway !== null) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.RollAlreadyCommitted'));
      return;
    }

    const roll = await new Roll('1d6').evaluate();
    const total = roll.total;

    const pathways = await this.getPathways();
    const matchedPathway = pathways.find(p => p.system.rollValue === total);

    // Display enhanced roll in chat
    await CharacterCreationWizard.#createCreationRollMessage({
      roll,
      title: game.i18n.localize('AOA.CharacterCreation.PathwayRoll'),
      resultType: 'pathway',
      result: matchedPathway ? {
        name: matchedPathway.name,
        img: matchedPathway.img
      } : null,
      lpAward: matchedPathway ? CharacterCreationWizard.LP_AWARDS.rolledPathway : null
    });

    this._rollResults.pathway = {
      roll: total,
      pathway: matchedPathway
    };

    if (matchedPathway) {
      this.characterData.pathway = matchedPathway.name;
      this.characterData.pathwayItem = matchedPathway;
      this.characterData.rolledPathway = true;
      this.lp.earned += CharacterCreationWizard.LP_AWARDS.rolledPathway;
    }

    this.render();
  }

  /**
   * Manually select pathway
   */
  static async #onSelectPathway(event, target) {
    const pathwayId = target.dataset.pathwayId;
    const pathways = await this.getPathways();
    const pathway = pathways.find(p => p.id === pathwayId);

    if (!pathway) return;

    if (this.characterData.rolledPathway) {
      this.lp.earned -= CharacterCreationWizard.LP_AWARDS.rolledPathway;
      this.characterData.rolledPathway = false;
    }

    this.characterData.pathway = pathway.name;
    this.characterData.pathwayItem = pathway;

    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Life Events               */
  /* -------------------------------------------- */

  /**
   * Draw a random life event
   */
  static async #onDrawLifeEvent(event, target) {
    if (this.characterData.lifeEvents.length >= 3) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.MaxLifeEvents'));
      return;
    }

    if (this._pendingLifeEvent !== null) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.PendingEventExists'));
      return;
    }

    const lifeEvents = await this.getLifeEvents();

    // Filter out already accepted events
    const acceptedIds = this.characterData.lifeEvents.map(e => e.id);
    const availableEvents = lifeEvents.filter(e => !acceptedIds.includes(e.id));

    if (availableEvents.length === 0) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.NoEventsAvailable'));
      return;
    }

    // Random selection
    const randomIndex = Math.floor(Math.random() * availableEvents.length);
    const drawnEvent = availableEvents[randomIndex];

    // Display in chat
    const content = `
      <div class="wor life-event-draw">
        <h4>${drawnEvent.name}</h4>
        <p><strong>${game.i18n.localize('AOA.LifeEvent.Suit')}:</strong> ${game.i18n.localize(`AOA.LifeEvent.Suit.${drawnEvent.system.suit.charAt(0).toUpperCase() + drawnEvent.system.suit.slice(1)}`)}</p>
        <p>${drawnEvent.system.description || ''}</p>
      </div>
    `;

    await ChatMessage.create({
      speaker: { alias: game.i18n.localize('AOA.CharacterCreation.Title') },
      content,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER
    });

    this._pendingLifeEvent = {
      id: drawnEvent.id,
      name: drawnEvent.name,
      item: drawnEvent,
      benefits: drawnEvent.system.benefits,
      complications: drawnEvent.system.complications,
      lpValue: drawnEvent.system.lpValue
    };

    this.render();
  }

  /**
   * Accept pending life event
   */
  static async #onAcceptLifeEvent(event, target) {
    if (!this._pendingLifeEvent) return;

    // Store the full item data so it can be properly created on the actor
    const fullItem = this._pendingLifeEvent.item;
    this.characterData.lifeEvents.push({
      id: fullItem.id,
      name: fullItem.name,
      img: fullItem.img,
      system: { ...fullItem.system }
    });

    this.lp.earned += this._pendingLifeEvent.lpValue || CharacterCreationWizard.LP_AWARDS.lifeEventAccepted;
    this._pendingLifeEvent = null;

    this.render();
  }

  /**
   * Reject pending life event
   */
  static async #onRejectLifeEvent(event, target) {
    this._pendingLifeEvent = null;
    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Attributes                */
  /* -------------------------------------------- */

  /**
   * Adjust attribute value
   */
  static async #onAdjustAttribute(event, target) {
    const attr = target.dataset.attribute;
    const adjustment = parseInt(target.dataset.adjust);

    const current = this.characterData.attributes[attr] || 0;
    const newValue = current + adjustment;

    // Validate bounds
    if (newValue < 0) return;
    if (newValue > 5) return; // Max 5 at creation

    // Check points available
    const newSpent = this.characterData.attributePointsSpent + adjustment;
    if (newSpent < 0 || newSpent > 20) return;

    this.characterData.attributes[attr] = newValue;
    this.characterData.attributePointsSpent = newSpent;

    this.render();
  }

  /**
   * Select flexible attribute bonus (Human)
   */
  static async #onSelectFlexibleAttribute(event, target) {
    const attr = target.dataset.attribute;
    this.characterData.flexibleAttributeChoice = attr;
    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Skills & Talents          */
  /* -------------------------------------------- */

  /**
   * Add free skill rank
   * Note: Starting skill ranks are capped at 6 during character creation
   */
  static async #onAddSkillRank(event, target) {
    const skillKey = target.dataset.skill;
    const freeRanks = this._calculateFreeSkillRanks();
    const STARTING_SKILL_CAP = 6; // Max skill rank during character creation

    if (this.characterData.freeSkillRanksSpent >= freeRanks) return;

    const currentRank = this.characterData.skills[skillKey] || 0;
    if (currentRank >= STARTING_SKILL_CAP) {
      ui.notifications.info(game.i18n.localize('AOA.CharacterCreation.SkillCapReached'));
      return;
    }

    this.characterData.skills[skillKey] = currentRank + 1;
    this.characterData.freeSkillRanksSpent++;

    this.render();
  }

  /**
   * Remove free skill rank
   */
  static async #onRemoveSkillRank(event, target) {
    const skillKey = target.dataset.skill;
    const grantedSkills = this._getGrantedSkills();
    const grantedRank = grantedSkills[skillKey] || 0;
    const currentRank = this.characterData.skills[skillKey] || 0;

    // Can't go below granted rank
    if (currentRank <= grantedRank) return;

    this.characterData.skills[skillKey] = currentRank - 1;
    this.characterData.freeSkillRanksSpent--;

    if (this.characterData.skills[skillKey] === 0) {
      delete this.characterData.skills[skillKey];
    }

    this.render();
  }

  /**
   * Add talent
   */
  static async #onAddTalent(event, target) {
    const talentId = target.dataset.talentId;
    const talents = await this.getTalents();
    const talent = talents.find(t => t.id === talentId);

    if (!talent) return;

    // Check if already has this talent
    if (this.characterData.talents.find(t => t.id === talentId)) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.TalentAlreadyAdded'));
      return;
    }

    // Check LP cost (10 LP per talent)
    const lpRemaining = this.lp.earned - this.lp.spent;
    if (lpRemaining < 10) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.InsufficientLP'));
      return;
    }

    this.characterData.talents.push({
      id: talent.id,
      name: talent.name,
      rank: 1
    });
    this.lp.spent += 10;

    this.render();
  }

  /**
   * Remove talent
   */
  static async #onRemoveTalent(event, target) {
    const talentId = target.dataset.talentId;
    const index = this.characterData.talents.findIndex(t => t.id === talentId);

    if (index === -1) return;

    this.characterData.talents.splice(index, 1);
    this.lp.spent -= 10;

    this.render();
  }

  /* -------------------------------------------- */
  /*  Action Handlers - Gear & Finalization       */
  /* -------------------------------------------- */

  /**
   * Purchase gear - can substitute higher currencies with lower ones
   * 1 Sovereign = 10 Crowns = 100 Orin
   */
  static async #onPurchaseGear(event, target) {
    const itemId = target.dataset.itemId;
    const gear = await this.getGear();
    const item = gear.find(g => g.id === itemId);

    if (!item) return;

    // Get the multi-currency price
    const price = item.system.price || {};
    const costSovereigns = price.sovereigns || 0;
    const costCrowns = price.crowns || 0;
    const costOrin = price.orin || 0;

    // Calculate total cost and total wealth in Orin for comparison
    const totalCostInOrin = (costSovereigns * 100) + (costCrowns * 10) + costOrin;
    const totalWealthInOrin = (this.characterData.wealth.sovereigns * 100) +
                              (this.characterData.wealth.crowns * 10) +
                              this.characterData.wealth.orin;

    if (totalCostInOrin > totalWealthInOrin) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.InsufficientWealth'));
      return;
    }

    // Track what we actually spend for refunds
    const spent = { sovereigns: 0, crowns: 0, orin: 0 };

    // Pay Sovereigns first (can substitute with Crowns or Orin)
    let remainingSV = costSovereigns;
    if (this.characterData.wealth.sovereigns >= remainingSV) {
      this.characterData.wealth.sovereigns -= remainingSV;
      spent.sovereigns = remainingSV;
      remainingSV = 0;
    } else {
      spent.sovereigns = this.characterData.wealth.sovereigns;
      remainingSV -= this.characterData.wealth.sovereigns;
      this.characterData.wealth.sovereigns = 0;
      // Convert remaining SV cost to Crowns (1 SV = 10 CR)
      const svAsCrowns = remainingSV * 10;
      if (this.characterData.wealth.crowns >= svAsCrowns) {
        this.characterData.wealth.crowns -= svAsCrowns;
        spent.crowns += svAsCrowns;
      } else {
        spent.crowns += this.characterData.wealth.crowns;
        const remainingCrowns = svAsCrowns - this.characterData.wealth.crowns;
        this.characterData.wealth.crowns = 0;
        // Convert remaining to Orin (1 CR = 10 OR)
        this.characterData.wealth.orin -= remainingCrowns * 10;
        spent.orin += remainingCrowns * 10;
      }
    }

    // Pay Crowns (can substitute with Orin)
    let remainingCR = costCrowns;
    if (this.characterData.wealth.crowns >= remainingCR) {
      this.characterData.wealth.crowns -= remainingCR;
      spent.crowns += remainingCR;
    } else {
      spent.crowns += this.characterData.wealth.crowns;
      remainingCR -= this.characterData.wealth.crowns;
      this.characterData.wealth.crowns = 0;
      // Convert remaining CR cost to Orin (1 CR = 10 OR)
      this.characterData.wealth.orin -= remainingCR * 10;
      spent.orin += remainingCR * 10;
    }

    // Pay Orin
    this.characterData.wealth.orin -= costOrin;
    spent.orin += costOrin;

    // Store what we actually spent for accurate refunds
    this.characterData.equipment.push({
      id: item.id,
      name: item.name,
      img: item.img,
      type: item.type,
      price: spent
    });

    this.render();
  }

  /**
   * Remove gear - refunds exact currency amounts that were spent
   */
  static async #onRemoveGear(event, target) {
    const index = parseInt(target.dataset.index);
    const removed = this.characterData.equipment[index];

    if (!removed) return;

    // Refund exact amounts that were spent
    const price = removed.price || {};
    this.characterData.wealth.sovereigns += price.sovereigns || 0;
    this.characterData.wealth.crowns += price.crowns || 0;
    this.characterData.wealth.orin += price.orin || 0;

    this.characterData.equipment.splice(index, 1);
    this.render();
  }

  /**
   * Roll starting wealth based on background min/max values
   */
  static async #onRollStartingWealth(event, target) {
    const background = this.characterData.backgroundItem;
    if (!background) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.SelectBackgroundFirst'));
      return;
    }

    const wealth = background.system.startingWealth;
    const currency = wealth.currency || 'crowns';

    // Roll between min and max
    const range = wealth.max - wealth.min;
    let rolledAmount;

    if (wealth.formula) {
      // Use formula if available
      const roll = new Roll(wealth.formula);
      await roll.evaluate();
      rolledAmount = roll.total;
    } else {
      // Roll randomly between min and max
      const roll = new Roll(`1d${range + 1} - 1 + ${wealth.min}`);
      await roll.evaluate();
      rolledAmount = roll.total;
    }

    // Set wealth in the appropriate currency
    this.characterData.wealth = { orin: 0, crowns: 0, sovereigns: 0 };
    this.characterData.wealth[currency] = rolledAmount;
    this.characterData.wealthRolled = true;

    // Show notification with rolled amount
    ui.notifications.info(
      game.i18n.format('AOA.CharacterCreation.WealthRolled', {
        amount: rolledAmount,
        currency: game.i18n.localize(`AOA.Wealth.${currency.charAt(0).toUpperCase() + currency.slice(1)}`)
      })
    );

    this.render();
  }

  /**
   * Convert remaining LP to XP
   */
  static async #onConvertLPtoXP(event, target) {
    const remaining = this.lp.earned - this.lp.spent;
    this.characterData.startingXP = remaining;
    this.lp.spent = this.lp.earned; // All LP now spent
    this.render();
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
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.StepIncomplete'));
      return;
    }

    // Apply step-specific data before moving on
    await this._applyStepData();

    if (this.currentStep < CharacterCreationWizard.STEPS.length - 1) {
      this.currentStep++;
      this.render();
    }
  }

  /**
   * Apply current step data to character
   * @private
   */
  async _applyStepData() {
    const stepId = CharacterCreationWizard.STEPS[this.currentStep].id;

    switch (stepId) {
      case 'attributes':
        // Apply granted skills from background and pathway
        // Cap at 6 during character creation
        const STARTING_SKILL_CAP = 6;
        const grantedSkills = this._getGrantedSkills();
        for (const [skill, rank] of Object.entries(grantedSkills)) {
          this.characterData.skills[skill] = Math.min(
            STARTING_SKILL_CAP,
            Math.max(this.characterData.skills[skill] || 0, rank)
          );
        }
        // Set witchsight
        this.characterData.witchsight = this._computeTotalWitchsight();
        break;

      case 'passions':
        // Wealth is now rolled manually in the Legacy tab using the roll button
        break;
    }
  }

  /**
   * Finalize character and create actor
   */
  static async #onFinalize(event, target) {
    if (!this._canProceedToNextStep()) {
      ui.notifications.warn(game.i18n.localize('AOA.CharacterCreation.StepIncomplete'));
      return;
    }

    await this._createCharacterActor();
  }

  /**
   * Create or update the character actor with all data
   * @private
   */
  async _createCharacterActor() {
    const attrs = this._computeAttributes();

    // Prepare embedded items
    const embeddedItems = await this._prepareEmbeddedItems();

    // Determine starting essence (Jadwiga starts with 9 instead of 10)
    const startingEssence = this.characterData.lineageItem?.system?.startingEssence ?? 10;

    // Prepare system data for actor
    const systemData = {
      attributes: attrs,
      witchsight: this.characterData.witchsight,
      health: {
        trauma: 0
      },
      essence: {
        current: startingEssence,
        max: 10,
        corruptionSigns: []
      },
      zeal: {
        current: 0,
        max: 5
      },
      passions: this.characterData.passions,
      identity: {
        lineage: this.characterData.lineageItem?.name || '',
        lineageId: this.characterData.lineageItem?.id || '',
        background: this.characterData.backgroundItem?.name || '',
        backgroundId: this.characterData.backgroundItem?.id || '',
        archetype: this.characterData.archetypeItem?.name || '',
        archetypeId: this.characterData.archetypeItem?.id || '',
        calling: this.characterData.calling || '',
        callingId: '', // Will be set when calling items are embedded
        subtype: this.characterData.calling || '', // Deprecated, kept for compatibility
        pathway: this.characterData.pathwayItem?.name || '',
        pathwayId: this.characterData.pathwayItem?.id || '',
        province: this.characterData.province || '',
        age: this.characterData.age || null
      },
      socialStanding: this.characterData.socialStanding,
      wealth: this.characterData.wealth,
      advancement: {
        xp: {
          current: this.characterData.startingXP,
          total: this.characterData.startingXP
        },
        lp: {
          earned: this.lp.earned,
          spent: this.lp.spent
        }
      },
      contacts: this.characterData.contacts,
      creation: {
        complete: true,
        step: 10,
        rolledLineage: this.characterData.rolledLineage,
        rolledArchetype: this.characterData.rolledArchetype,
        rolledPathway: this.characterData.rolledPathway,
        lifeEventsAccepted: this.characterData.lifeEvents.map(e => e.id)
      }
    };

    let actor;

    if (this.actor) {
      // Update existing actor (player editing their pre-created character)
      // First, temporarily mark creation as incomplete to allow adding identity items
      await this.actor.update({
        'system.creation.complete': false
      });

      // Clear existing items
      const existingItemIds = this.actor.items.map(i => i.id);
      if (existingItemIds.length > 0) {
        await this.actor.deleteEmbeddedDocuments('Item', existingItemIds);
      }

      // Add new items while creation is incomplete
      if (embeddedItems.length > 0) {
        await this.actor.createEmbeddedDocuments('Item', embeddedItems);
      }

      // Now update the full system data including marking creation complete
      await this.actor.update({
        name: this.characterData.name,
        system: systemData
      });
      actor = this.actor;
    } else {
      // GM creating new actor - include items directly in create call
      if (!game.user.isGM) {
        ui.notifications.error(game.i18n.localize('AOA.CharacterCreation.NoIncompleteCharacter'));
        return;
      }

      // Create actor with items included (bypasses preCreateItem validation)
      actor = await Actor.create({
        name: this.characterData.name,
        type: 'character',
        system: systemData,
        items: embeddedItems
      });
    }

    // Close wizard and open character sheet
    this.close();
    actor.sheet.render(true);

    ui.notifications.info(game.i18n.format('AOA.CharacterCreation.Complete', { name: actor.name }));
  }

  /**
   * Prepare embedded items for character creation
   * @returns {Promise<Object[]>} Array of item data objects
   * @private
   */
  async _prepareEmbeddedItems() {
    const items = [];

    // Add Lineage item
    if (this.characterData.lineageItem) {
      items.push({
        name: this.characterData.lineageItem.name,
        type: 'lineage',
        img: this.characterData.lineageItem.img,
        system: { ...this.characterData.lineageItem.system }
      });
    }

    // Add Archetype item
    if (this.characterData.archetypeItem) {
      items.push({
        name: this.characterData.archetypeItem.name,
        type: 'archetype',
        img: this.characterData.archetypeItem.img,
        system: { ...this.characterData.archetypeItem.system }
      });
    }

    // Add Background item
    if (this.characterData.backgroundItem) {
      items.push({
        name: this.characterData.backgroundItem.name,
        type: 'background',
        img: this.characterData.backgroundItem.img,
        system: { ...this.characterData.backgroundItem.system }
      });
    }

    // Add Pathway item
    if (this.characterData.pathwayItem) {
      items.push({
        name: this.characterData.pathwayItem.name,
        type: 'pathway',
        img: this.characterData.pathwayItem.img,
        system: { ...this.characterData.pathwayItem.system }
      });
    }

    // Add Life Event items
    for (const eventData of this.characterData.lifeEvents) {
      if (eventData) {
        items.push({
          name: eventData.name,
          type: 'lifeEvent',
          img: eventData.img,
          system: { ...eventData.system }
        });
      }
    }

    // Prepare skill items
    const allSkills = await this.getSkills();
    for (const [skillKey, rank] of Object.entries(this.characterData.skills)) {
      const skillTemplate = allSkills.find(s => s.name.toLowerCase() === skillKey.toLowerCase());
      if (skillTemplate) {
        items.push({
          name: skillTemplate.name,
          type: 'skill',
          img: skillTemplate.img,
          system: {
            ...skillTemplate.system,
            rank: rank
          }
        });
      }
    }

    // Prepare talent items
    const allTalents = await this.getTalents();
    for (const talentData of this.characterData.talents) {
      const talentTemplate = allTalents.find(t => t.id === talentData.id);
      if (talentTemplate) {
        items.push({
          name: talentTemplate.name,
          type: 'talent',
          img: talentTemplate.img,
          system: {
            ...talentTemplate.system,
            rank: talentData.rank
          }
        });
      }
    }

    // Prepare equipment items
    const allGear = await this.getGear();
    for (const equipData of this.characterData.equipment) {
      const itemTemplate = allGear.find(g => g.id === equipData.id);
      if (itemTemplate) {
        items.push({
          name: itemTemplate.name,
          type: itemTemplate.type,
          img: itemTemplate.img,
          system: { ...itemTemplate.system }
        });
      }
    }

    return items;
  }

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /**
   * Handle form submission for text inputs
   */
  static async #onFormSubmit(event, form, formData) {
    // Update character name
    if (formData.object.name !== undefined) {
      this.characterData.name = formData.object.name;
    }

    // Update age
    if (formData.object.age !== undefined) {
      this.characterData.age = parseInt(formData.object.age) || null;
    }

    // Update passions
    if (formData.object.motivation !== undefined) {
      this.characterData.passions.motivation = formData.object.motivation;
    }
    if (formData.object.nature !== undefined) {
      this.characterData.passions.nature = formData.object.nature;
    }
    if (formData.object.allegiance !== undefined) {
      this.characterData.passions.allegiance = formData.object.allegiance;
    }

    // Update province
    if (formData.object.province !== undefined) {
      this.characterData.province = formData.object.province;
    }

    this.render();
  }

  /* -------------------------------------------- */
  /*  Static Launch Method                        */
  /* -------------------------------------------- */

  /**
   * Launch the character creation wizard
   * @param {Actor|null} actor - Existing actor to edit, or null for new
   * @returns {CharacterCreationWizard}
   */
  static launch(actor = null) {
    const wizard = new CharacterCreationWizard(actor);
    wizard.render(true);
    return wizard;
  }
}

// Register for global access
globalThis.AOA = globalThis.AOA || {};
globalThis.AOA.CharacterCreationWizard = CharacterCreationWizard;
