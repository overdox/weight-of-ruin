const { HandlebarsApplicationMixin, ApplicationV2 } = foundry.applications.api;

/**
 * Advancement Wizard for purchasing character advancements.
 * Players spend 1000 XP to gain:
 * - +1 to one attribute
 * - +1 rank to three skills
 * - Advance one talent or purchase a new one
 * @extends {ApplicationV2}
 * @mixes {HandlebarsApplicationMixin}
 */
export class AdvancementWizard extends HandlebarsApplicationMixin(ApplicationV2) {

  /**
   * The steps in the advancement wizard.
   */
  static STEPS = [
    { id: 'attribute', label: 'AOA.Advancement.Wizard.Attribute', number: 1 },
    { id: 'skills', label: 'AOA.Advancement.Wizard.Skills', number: 2 },
    { id: 'talent', label: 'AOA.Advancement.Wizard.Talent', number: 3 }
  ];

  /** @override */
  static DEFAULT_OPTIONS = {
    id: 'advancement-wizard',
    classes: ['wor', 'weight-of-ruin', 'advancement-wizard'],
    position: {
      width: 650,
      height: 700
    },
    window: {
      title: 'AOA.Advancement.Wizard.Title',
      resizable: true
    },
    actions: {
      selectAttribute: AdvancementWizard.#onSelectAttribute,
      toggleSkill: AdvancementWizard.#onToggleSkill,
      selectTalentMode: AdvancementWizard.#onSelectTalentMode,
      selectTalent: AdvancementWizard.#onSelectTalent,
      nextStep: AdvancementWizard.#onNextStep,
      prevStep: AdvancementWizard.#onPrevStep,
      completeAdvancement: AdvancementWizard.#onCompleteAdvancement,
      cancel: AdvancementWizard.#onCancel
    }
  };

  /** @override */
  static PARTS = {
    main: {
      template: 'systems/weight-of-ruin/templates/apps/advancement-wizard.hbs'
    }
  };

  /**
   * Create a new Advancement Wizard.
   * @param {Actor} actor - The actor being advanced
   * @param {Object} options - Application options
   */
  constructor(actor, options = {}) {
    super(options);
    this.actor = actor;

    // Initialize wizard state
    this._currentStep = 'attribute';
    this._selectedAttribute = null;
    this._selectedSkills = [];
    this._talentMode = null; // 'advance' or 'purchase'
    this._selectedTalent = null;
  }

  /** @override */
  get title() {
    return game.i18n.localize('AOA.Advancement.Wizard.Title');
  }

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    context.actor = this.actor;
    context.system = this.actor.system;
    context.currentStep = this._currentStep;
    context.steps = this._prepareSteps();

    // Prepare step-specific context
    context.stepContext = await this._prepareStepContext();

    // Navigation state
    context.canGoBack = this._currentStep !== 'attribute';
    context.canGoForward = this._canProceedToNextStep();
    context.isLastStep = this._currentStep === 'talent';
    context.canComplete = this._canComplete();

    // Current step number for display
    const stepIndex = AdvancementWizard.STEPS.findIndex(s => s.id === this._currentStep);
    context.currentStepNumber = stepIndex + 1;

    return context;
  }

  /**
   * Prepare step indicators for the header.
   */
  _prepareSteps() {
    const currentIndex = AdvancementWizard.STEPS.findIndex(s => s.id === this._currentStep);

    return AdvancementWizard.STEPS.map((step, index) => ({
      ...step,
      active: step.id === this._currentStep,
      completed: index < currentIndex,
      future: index > currentIndex
    }));
  }

  /**
   * Prepare context for the current step.
   */
  async _prepareStepContext() {
    const context = {
      selectedAttribute: this._selectedAttribute,
      selectedSkills: this._selectedSkills,
      talentMode: this._talentMode,
      selectedTalent: this._selectedTalent
    };

    switch (this._currentStep) {
      case 'attribute':
        context.attributes = this._prepareAttributes();
        break;

      case 'skills':
        context.skills = await this._prepareSkills();
        context.remainingSkills = 3 - this._selectedSkills.length;
        break;

      case 'talent':
        context.existingTalents = this._prepareExistingTalents();
        context.availableTalents = await this._prepareAvailableTalents();
        break;
    }

    return context;
  }

  /**
   * Prepare attributes for selection.
   */
  _prepareAttributes() {
    const attrs = this.actor.system.attributes;
    const attributeKeys = ['strength', 'fortitude', 'agility', 'awareness', 'resolve', 'persona', 'ingenuity', 'expertise'];

    return attributeKeys.map(key => {
      const attr = attrs[key];
      const total = (attr.base || 0) + (attr.advances || 0) + (attr.modifier || 0);
      return {
        key,
        label: game.i18n.localize(`AOA.Attribute.${key.charAt(0).toUpperCase() + key.slice(1)}.long`),
        abbr: game.i18n.localize(`AOA.Attribute.${key.charAt(0).toUpperCase() + key.slice(1)}.abbr`),
        current: total,
        advances: attr.advances || 0,
        selected: this._selectedAttribute === key,
        maxReached: total >= 10 // Assuming 10 is the attribute cap
      };
    });
  }

  /**
   * Prepare skills for selection.
   */
  async _prepareSkills() {
    // Get skills from compendium
    const skillsPack = game.packs.get('weight-of-ruin.skills');
    let allSkills = [];

    if (skillsPack) {
      const documents = await skillsPack.getDocuments();
      allSkills = documents.map(s => ({
        id: s.id,
        name: s.name,
        category: s.system.category,
        attribute: s.system.attribute
      }));
    }

    // Get current skill ranks from actor
    const actorSkills = {};
    for (const item of this.actor.items) {
      if (item.type === 'skill') {
        actorSkills[item.name.toLowerCase()] = item.system.rank || 0;
      }
    }

    // Group by category
    const categories = ['martial', 'physical', 'social', 'knowledge', 'craft', 'thaumaturgy'];
    const skillsByCategory = {};

    for (const cat of categories) {
      skillsByCategory[cat] = allSkills
        .filter(s => s.category === cat)
        .map(s => ({
          ...s,
          currentRank: actorSkills[s.name.toLowerCase()] || 0,
          selected: this._selectedSkills.includes(s.name),
          maxReached: (actorSkills[s.name.toLowerCase()] || 0) >= 10
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }

    return skillsByCategory;
  }

  /**
   * Prepare existing talents that can be advanced.
   */
  _prepareExistingTalents() {
    return this.actor.items
      .filter(i => i.type === 'talent')
      .map(t => ({
        id: t.id,
        name: t.name,
        currentRank: t.system.rank || 1,
        maxRank: t.system.maxRank || 5,
        canAdvance: (t.system.rank || 1) < (t.system.maxRank || 5),
        selected: this._talentMode === 'advance' && this._selectedTalent === t.id
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Prepare available talents for purchase.
   */
  async _prepareAvailableTalents() {
    const talentsPack = game.packs.get('weight-of-ruin.talents');
    if (!talentsPack) return [];

    const documents = await talentsPack.getDocuments();

    // Filter out talents the actor already has
    const ownedTalentNames = new Set(
      this.actor.items.filter(i => i.type === 'talent').map(t => t.name.toLowerCase())
    );

    return documents
      .filter(t => !ownedTalentNames.has(t.name.toLowerCase()))
      .map(t => ({
        id: t.id,
        name: t.name,
        type: t.system.talentType || 'universal',
        description: t.system.description,
        selected: this._talentMode === 'purchase' && this._selectedTalent === t.id
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Check if we can proceed to the next step.
   */
  _canProceedToNextStep() {
    switch (this._currentStep) {
      case 'attribute':
        return this._selectedAttribute !== null;
      case 'skills':
        return this._selectedSkills.length === 3;
      case 'talent':
        return this._talentMode !== null && this._selectedTalent !== null;
      default:
        return false;
    }
  }

  /**
   * Check if the advancement can be completed.
   */
  _canComplete() {
    return this._selectedAttribute !== null &&
           this._selectedSkills.length === 3 &&
           this._talentMode !== null &&
           this._selectedTalent !== null;
  }

  /* -------------------------------------------- */
  /*  Action Handlers                             */
  /* -------------------------------------------- */

  /**
   * Handle attribute selection.
   */
  static #onSelectAttribute(event, target) {
    const attribute = target.dataset.attribute;
    if (!attribute) return;

    this._selectedAttribute = attribute;
    this.render();
  }

  /**
   * Handle skill toggle.
   */
  static #onToggleSkill(event, target) {
    const skillName = target.dataset.skill;
    if (!skillName) return;

    const index = this._selectedSkills.indexOf(skillName);
    if (index >= 0) {
      // Deselect
      this._selectedSkills.splice(index, 1);
    } else if (this._selectedSkills.length < 3) {
      // Select (max 3)
      this._selectedSkills.push(skillName);
    }

    this.render();
  }

  /**
   * Handle talent mode selection.
   */
  static #onSelectTalentMode(event, target) {
    const mode = target.dataset.mode;
    if (!mode) return;

    this._talentMode = mode;
    this._selectedTalent = null; // Clear selection when switching modes
    this.render();
  }

  /**
   * Handle talent selection.
   */
  static #onSelectTalent(event, target) {
    const talentId = target.dataset.talentId;
    if (!talentId) return;

    this._selectedTalent = talentId;
    this.render();
  }

  /**
   * Handle next step.
   */
  static #onNextStep(event, target) {
    const steps = AdvancementWizard.STEPS.map(s => s.id);
    const currentIndex = steps.indexOf(this._currentStep);

    if (currentIndex < steps.length - 1 && this._canProceedToNextStep()) {
      this._currentStep = steps[currentIndex + 1];
      this.render();
    }
  }

  /**
   * Handle previous step.
   */
  static #onPrevStep(event, target) {
    const steps = AdvancementWizard.STEPS.map(s => s.id);
    const currentIndex = steps.indexOf(this._currentStep);

    if (currentIndex > 0) {
      this._currentStep = steps[currentIndex - 1];
      this.render();
    }
  }

  /**
   * Handle advancement completion.
   */
  static async #onCompleteAdvancement(event, target) {
    if (!this._canComplete()) return;

    const actor = this.actor;

    // Deduct 1000 XP
    const currentXP = actor.system.advancement?.xp?.current ?? 0;
    if (currentXP < 1000) {
      ui.notifications.error(game.i18n.localize('AOA.Advancement.PurchaseDisabled'));
      return;
    }

    // 1. Apply attribute advancement
    const attrPath = `system.attributes.${this._selectedAttribute}.advances`;
    const currentAdvances = actor.system.attributes[this._selectedAttribute]?.advances || 0;

    // 2. Apply skill advancements
    const skillUpdates = [];
    for (const skillName of this._selectedSkills) {
      const skillItem = actor.items.find(i => i.type === 'skill' && i.name.toLowerCase() === skillName.toLowerCase());
      if (skillItem) {
        skillUpdates.push({
          _id: skillItem.id,
          'system.rank': (skillItem.system.rank || 0) + 1
        });
      } else {
        // Need to add the skill from compendium
        const skillsPack = game.packs.get('weight-of-ruin.skills');
        if (skillsPack) {
          const documents = await skillsPack.getDocuments();
          const skillDoc = documents.find(s => s.name.toLowerCase() === skillName.toLowerCase());
          if (skillDoc) {
            const skillData = skillDoc.toObject();
            skillData.system.rank = 1;
            delete skillData._id;
            await Item.create(skillData, { parent: actor });
          }
        }
      }
    }

    // 3. Apply talent advancement or purchase
    if (this._talentMode === 'advance') {
      const talentItem = actor.items.get(this._selectedTalent);
      if (talentItem) {
        await talentItem.update({
          'system.rank': (talentItem.system.rank || 1) + 1
        });
      }
    } else {
      // Purchase new talent from compendium
      const talentsPack = game.packs.get('weight-of-ruin.talents');
      if (talentsPack) {
        const talentDoc = await talentsPack.getDocument(this._selectedTalent);
        if (talentDoc) {
          const talentData = talentDoc.toObject();
          talentData.system.rank = 1;
          delete talentData._id;
          await Item.create(talentData, { parent: actor });
        }
      }
    }

    // Apply all updates
    await actor.update({
      [attrPath]: currentAdvances + 1,
      'system.advancement.xp.current': currentXP - 1000
    });

    if (skillUpdates.length > 0) {
      await actor.updateEmbeddedDocuments('Item', skillUpdates);
    }

    // Show success message
    ui.notifications.info(game.i18n.format('AOA.Advancement.Wizard.Success', { name: actor.name }));

    // Create chat message summarizing the advancement
    const attrLabel = game.i18n.localize(`AOA.Attribute.${this._selectedAttribute.charAt(0).toUpperCase() + this._selectedAttribute.slice(1)}.long`);
    const skillsList = this._selectedSkills.join(', ');
    let talentText;
    if (this._talentMode === 'advance') {
      const talentItem = actor.items.get(this._selectedTalent);
      talentText = `Advanced ${talentItem?.name || 'talent'}`;
    } else {
      const talentsPack = game.packs.get('weight-of-ruin.talents');
      const talentDoc = await talentsPack?.getDocument(this._selectedTalent);
      talentText = `Purchased ${talentDoc?.name || 'new talent'}`;
    }

    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `<div class="wor advancement-complete">
        <h3><i class="fas fa-level-up-alt"></i> ${game.i18n.localize('AOA.Advancement.PurchaseTitle')}</h3>
        <p><strong>${actor.name}</strong> has advanced!</p>
        <ul>
          <li><strong>Attribute:</strong> ${attrLabel} +1</li>
          <li><strong>Skills:</strong> ${skillsList} (+1 each)</li>
          <li><strong>Talent:</strong> ${talentText}</li>
        </ul>
        <p class="xp-cost">-1000 XP</p>
      </div>`
    });

    this.close();
  }

  /**
   * Handle cancel.
   */
  static #onCancel(event, target) {
    this.close();
  }
}
