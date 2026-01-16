import { getActiveConditions, toggleCondition, removeCondition } from '../../helpers/conditions.mjs';

const { HandlebarsApplicationMixin, DocumentSheetV2 } = foundry.applications.api;

/**
 * Base Actor Sheet using ApplicationV2 for The Weight of Ruin.
 * Provides common functionality for all actor types.
 * @extends {DocumentSheetV2}
 * @mixes {HandlebarsApplicationMixin}
 */
export class WoRBaseActorSheet extends HandlebarsApplicationMixin(DocumentSheetV2) {

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['wor', 'weight-of-ruin', 'actor-sheet'],
    position: {
      width: 800,
      height: 1000
    },
    actions: {
      editItem: WoRBaseActorSheet.#onEditItem,
      deleteItem: WoRBaseActorSheet.#onDeleteItem,
      createItem: WoRBaseActorSheet.#onCreateItem,
      rollSkill: WoRBaseActorSheet.#onRollSkill,
      rollAttribute: WoRBaseActorSheet.#onRollAttribute,
      editAttribute: WoRBaseActorSheet.#onEditAttribute,
      openAttributeEditor: WoRBaseActorSheet.#onOpenAttributeEditor,
      toggleEquip: WoRBaseActorSheet.#onToggleEquip,
      useItem: WoRBaseActorSheet.#onUseItem,
      rollDamage: WoRBaseActorSheet.#onRollDamage,
      rollDefense: WoRBaseActorSheet.#onRollDefense,
      activateFullDefense: WoRBaseActorSheet.#onActivateFullDefense,
      rollInitiative: WoRBaseActorSheet.#onRollInitiative,
      // Health & Resource actions
      adjustTrauma: WoRBaseActorSheet.#onAdjustTrauma,
      rollWounds: WoRBaseActorSheet.#onRollWounds,
      setFervor: WoRBaseActorSheet.#onSetFervor,
      adjustFervor: WoRBaseActorSheet.#onAdjustFervor,
      setEssence: WoRBaseActorSheet.#onSetEssence,
      adjustEssence: WoRBaseActorSheet.#onAdjustEssence,
      // Condition actions
      toggleCondition: WoRBaseActorSheet.#onToggleCondition,
      removeCondition: WoRBaseActorSheet.#onRemoveCondition,
      openConditionReference: WoRBaseActorSheet.#onOpenConditionReference,
      // Wealth actions
      editWealth: WoRBaseActorSheet.#onEditWealth,
      // Portrait
      editPortrait: WoRBaseActorSheet.#onEditPortrait,
      // Identity card expansion
      toggleExpand: WoRBaseActorSheet.#onToggleExpand,
      // Talent expansion
      toggleTalentExpand: WoRBaseActorSheet.#onToggleTalentExpand,
      // Rest
      openRestDialog: WoRBaseActorSheet.#onOpenRestDialog,
      // Advancement
      adjustXP: WoRBaseActorSheet.#onAdjustXP,
      purchaseAdvancement: WoRBaseActorSheet.#onPurchaseAdvancement,
      // Header controls
      configurePrototypeToken: WoRBaseActorSheet.#onConfigurePrototypeToken,
      viewCharacterArt: WoRBaseActorSheet.#onViewCharacterArt,
      viewTokenArt: WoRBaseActorSheet.#onViewTokenArt,
      configureActorSettings: WoRBaseActorSheet.#onConfigureActorSettings,
      // Notes editor toggle
      toggleNotesEditor: WoRBaseActorSheet.#onToggleNotesEditor
    },
    form: {
      submitOnChange: true
    },
    window: {
      resizable: true
    }
  };

  /** @override */
  static PARTS = {
    header: {
      template: 'systems/weight-of-ruin/templates/actor/parts/header.hbs'
    },
    main: {
      template: 'systems/weight-of-ruin/templates/actor/parts/main.hbs',
      scrollable: ['.tab-content']
    }
  };

  /* -------------------------------------------- */
  /*  Header Controls                             */
  /* -------------------------------------------- */

  /** @override */
  _getHeaderControls() {
    const controls = super._getHeaderControls();
    const actor = this.document;

    // Build our custom controls in the desired order
    // Order: Configure Sheet (from parent), Prototype Token, View Character Artwork, View Token Artwork, Actor Settings

    // Prototype Token - only for GMs
    if (game.user.isGM) {
      controls.push({
        icon: 'fa-solid fa-user-circle',
        label: 'AOA.HeaderControls.PrototypeToken',
        action: 'configurePrototypeToken',
        visible: true
      });
    }

    // View Character Artwork
    controls.push({
      icon: 'fa-solid fa-image',
      label: 'AOA.HeaderControls.ViewCharacterArt',
      action: 'viewCharacterArt',
      visible: true
    });

    // View Token Artwork
    controls.push({
      icon: 'fa-solid fa-user-circle',
      label: 'AOA.HeaderControls.ViewTokenArt',
      action: 'viewTokenArt',
      visible: !!actor.prototypeToken?.texture?.src
    });

    // Actor Settings (ownership/permissions)
    if (game.user.isGM) {
      controls.push({
        icon: 'fa-solid fa-cogs',
        label: 'AOA.HeaderControls.ActorSettings',
        action: 'configureActorSettings',
        visible: true
      });
    }

    return controls;
  }

  /**
   * Available tabs for the sheet.
   * Override in subclasses to customize.
   */
  static TABS = {
    core: { id: 'core', group: 'primary', label: 'AOA.Tabs.Core' },
    skills: { id: 'skills', group: 'primary', label: 'AOA.Tabs.Skills' },
    talents: { id: 'talents', group: 'primary', label: 'AOA.Tabs.Talents' },
    combat: { id: 'combat', group: 'primary', label: 'AOA.Tabs.Combat' },
    inventory: { id: 'inventory', group: 'primary', label: 'AOA.Tabs.Inventory' },
    thaumaturgy: { id: 'thaumaturgy', group: 'primary', label: 'AOA.Tabs.Thaumaturgy' },
    profile: { id: 'profile', group: 'primary', label: 'AOA.Tabs.Profile' }
  };

  /**
   * The current tab being viewed.
   * @type {string}
   */
  tabGroups = {
    primary: 'core'
  };

  /**
   * Whether to show all skills (including rank 0) or only ranked skills.
   * @type {boolean}
   */
  showAllSkills = false;

  /**
   * The current sub-tab in the Profile tab.
   * @type {string}
   */
  profileTab = 'identity';

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.document;
    const source = actor.toObject();

    // Base context data
    context.actor = actor;
    context.source = source;
    context.system = actor.system;
    context.flags = actor.flags;
    context.config = CONFIG.AOA;
    context.isEditable = this.isEditable;
    context.isEditMode = this.isEditMode;
    context.isPlayMode = this.isPlayMode;
    context.owner = actor.isOwner;
    context.isGM = game.user.isGM;

    // Portrait image with fallback to system default
    const defaultArtwork = 'systems/weight-of-ruin/assets/tokens/default_artwork.webp';
    const isDefaultImg = !actor.img || actor.img === CONST.DEFAULT_TOKEN;
    context.portraitImg = isDefaultImg ? defaultArtwork : actor.img;

    // Roll data for formulas
    context.rollData = actor.getRollData();

    // Prepare items by type
    context.items = this._prepareItems(actor);

    // Prepare aggregated data from actor
    context.skills = actor.skills;
    context.skillsByCategory = actor.skillsByCategory;
    context.talents = actor.talents;
    context.weapons = actor.weapons;
    context.equippedWeapons = actor.equippedWeapons;
    context.armor = actor.armor;
    context.equippedArmor = actor.equippedArmor;
    context.gear = actor.gear;
    context.spells = actor.spells;
    context.rituals = actor.rituals;

    // Derived values from DataModel
    context.toughness = actor.system.toughness;
    context.reflex = actor.system.reflex;
    context.defense = actor.system.defense;
    context.baseSpeed = actor.system.baseSpeed;
    context.movement = actor.system.movement;
    context.wounds = actor.system.wounds;
    context.maxWounds = actor.system.maxWounds;
    context.maxTrauma = actor.system.maxTrauma;
    // Prowess (combat derived attributes)
    context.weaponProwess = actor.system.weaponProwess;
    context.ballisticProwess = actor.system.ballisticProwess;
    context.unarmedProwess = actor.system.unarmedProwess;

    // Martial skill ranks
    context.armsRank = actor.getSkillValue('arms');
    context.marksmanshipRank = actor.getSkillValue('marksmanship');
    context.brawlingRank = actor.getSkillValue('brawling');

    // Attack dice pools (Prowess + Skill)
    context.meleeAttack = actor.system.weaponProwess + context.armsRank;
    context.rangedAttack = actor.system.ballisticProwess + context.marksmanshipRank;
    context.unarmedAttack = actor.system.unarmedProwess + context.brawlingRank;

    // Attribute totals for template (base + advances + modifier)
    context.attributeTotals = {
      strength: actor.system.getAttributeTotal('strength'),
      fortitude: actor.system.getAttributeTotal('fortitude'),
      agility: actor.system.getAttributeTotal('agility'),
      awareness: actor.system.getAttributeTotal('awareness'),
      resolve: actor.system.getAttributeTotal('resolve'),
      persona: actor.system.getAttributeTotal('persona'),
      ingenuity: actor.system.getAttributeTotal('ingenuity'),
      expertise: actor.system.getAttributeTotal('expertise')
    };

    // Derived values from Actor (includes equipment modifiers)
    context.totalDefense = actor.totalDefense;
    context.armorDR = actor.armorDR;
    context.armorDefenseModifier = actor.armorDefenseModifier;
    context.armorMovementPenalty = actor.armorMovementPenalty;
    context.effectiveMovement = actor.effectiveMovement;
    context.encumbrance = actor.encumbrance;

    // Skills visibility toggle
    context.showAllSkills = this.showAllSkills;

    // Profile sub-tab
    context.profileTab = this.profileTab;

    // Enriched HTML for rich text fields
    context.enrichedNotes = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      actor.system.notes ?? '',
      { secrets: actor.isOwner, rollData: context.rollData, relativeTo: actor }
    );

    // LP remaining (for character actors)
    if (actor.system.advancement?.lp) {
      context.lpRemaining = (actor.system.advancement.lp.earned || 0) -
                            (actor.system.advancement.lp.spent || 0);
    }

    // Fervor pips for clickable display
    if (actor.system.fervor) {
      const currentFervor = actor.system.fervor.current ?? 0;
      const maxFervor = actor.system.fervor.max ?? 5;
      context.fervorPips = [];
      for (let i = 1; i <= maxFervor; i++) {
        context.fervorPips.push({
          value: i,
          filled: i <= currentFervor
        });
      }
    }

    // Tabs
    context.tabs = this._prepareTabs(options);

    // Active conditions
    context.conditions = getActiveConditions(actor);
    context.hasConditions = context.conditions.length > 0;

    // Full Defense status (for combat tab)
    const { isFullDefenseActive } = await import('../../helpers/defense.mjs');
    context.fullDefenseActive = isFullDefenseActive(actor);

    return context;
  }

  /**
   * Prepare items organized by type for display.
   * @param {Actor} actor - The actor document
   * @returns {Object} Items organized by type
   */
  _prepareItems(actor) {
    const items = {
      skills: [],
      talents: [],
      weapons: [],
      armor: [],
      gear: [],
      spells: [],
      rituals: [],
      lineage: null,
      background: null,
      archetype: null,
      pathway: null,
      lifeEvents: []
    };

    for (const item of actor.items) {
      // Enrich item data
      const itemData = item.toObject();
      itemData.id = item.id;
      itemData.isEquipped = item.system.equipped ?? false;

      switch (item.type) {
        case 'skill':
          items.skills.push(itemData);
          break;
        case 'talent':
          items.talents.push(itemData);
          break;
        case 'weapon':
          items.weapons.push(itemData);
          break;
        case 'armor':
          items.armor.push(itemData);
          break;
        case 'gear':
          items.gear.push(itemData);
          break;
        case 'spell':
          items.spells.push(itemData);
          break;
        case 'ritual':
          items.rituals.push(itemData);
          break;
        case 'lineage':
          items.lineage = itemData;
          break;
        case 'background':
          items.background = itemData;
          break;
        case 'archetype':
          items.archetype = itemData;
          break;
        case 'pathway':
          items.pathway = itemData;
          break;
        case 'lifeEvent':
          items.lifeEvents.push(itemData);
          break;
      }
    }

    // Sort arrays alphabetically
    items.skills.sort((a, b) => a.name.localeCompare(b.name));
    items.talents.sort((a, b) => a.name.localeCompare(b.name));
    items.weapons.sort((a, b) => a.name.localeCompare(b.name));
    items.gear.sort((a, b) => a.name.localeCompare(b.name));
    items.spells.sort((a, b) => a.name.localeCompare(b.name));

    return items;
  }

  /**
   * Prepare tab data for the sheet.
   * @param {Object} options - Render options
   * @returns {Object} Tab configuration
   */
  _prepareTabs(options) {
    const tabs = {};
    for (const [key, tab] of Object.entries(this.constructor.TABS)) {
      tabs[key] = {
        ...tab,
        active: this.tabGroups[tab.group] === tab.id,
        cssClass: this.tabGroups[tab.group] === tab.id ? 'active' : ''
      };
    }
    return tabs;
  }

  /* -------------------------------------------- */
  /*  Part Context                                */
  /* -------------------------------------------- */

  /** @override */
  async _preparePartContext(partId, context) {
    context = await super._preparePartContext(partId, context);

    switch (partId) {
      case 'header':
        context.partId = 'header';
        break;
      case 'main':
        context.partId = 'main';
        // Convert tabs object to array for iteration
        context.tabsArray = Object.values(context.tabs);
        // Current active tab ID
        context.activeTab = this.tabGroups.primary || 'core';
        break;
    }

    return context;
  }

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);

    // Enable drag-drop for items
    this._setupDragDrop();

    // Add quick roll listeners (shift-click)
    this._setupQuickRolls();

    // Setup skill visibility toggle
    this._setupSkillVisibilityToggle();

    // Setup tab navigation
    this._setupTabNavigation();

    // Setup profile sub-tab navigation
    this._setupProfileTabNavigation();

    // Setup editor button handlers for ProseMirror
    this._setupEditorButtons();

    // Setup notes editor with Save and Close behavior
    this._setupNotesEditor();
  }

  /**
   * Setup the notes editor with Save and Close functionality.
   * Resets editor state on render and handles save button behavior.
   */
  _setupNotesEditor() {
    const section = this.element.querySelector('.notes-section');
    if (!section) return;

    const viewDiv = section.querySelector('.notes-view');
    const editDiv = section.querySelector('.notes-edit');
    const editBtn = section.querySelector('.toggle-editor-btn');

    // Reset editor to view mode on render
    if (viewDiv) viewDiv.classList.remove('hidden');
    if (editDiv) editDiv.classList.add('hidden');
    if (editBtn) editBtn.style.display = '';

    // Use event delegation to catch save button clicks
    section.addEventListener('click', (event) => {
      const saveBtn = event.target.closest('button[data-action="save"]');
      if (saveBtn) {
        // Small delay to let ProseMirror save first, then close editor
        setTimeout(() => {
          if (viewDiv) viewDiv.classList.remove('hidden');
          if (editDiv) editDiv.classList.add('hidden');
          if (editBtn) editBtn.style.display = '';
        }, 100);
      }
    });

    // Update save button tooltip to "Save and Close" when ProseMirror initializes
    const updateSaveButton = () => {
      const saveBtn = section.querySelector('button[data-action="save"]');
      if (saveBtn) {
        saveBtn.setAttribute('data-tooltip', game.i18n.localize('AOA.Common.SaveAndClose'));
      }
    };
    // Try immediately and also after a short delay for async initialization
    updateSaveButton();
    setTimeout(updateSaveButton, 100);
  }

  /**
   * Set up click handlers for editor toggle buttons.
   * Required for ApplicationV2 since it doesn't automatically wire these up.
   */
  _setupEditorButtons() {
    const editors = this.element.querySelectorAll('.editor');
    for (const editor of editors) {
      const button = editor.querySelector('.editor-edit');
      if (!button) continue;

      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const target = editor.dataset.target;
        if (!target) return;

        // Get the current content
        const content = foundry.utils.getProperty(this.document, target) ?? '';

        // Create the editor
        const editorElement = editor.querySelector('.editor-content');
        if (!editorElement) return;

        // Check if already in edit mode
        if (editor.classList.contains('prosemirror-editing')) {
          // Save and close
          const proseMirror = editor.querySelector('prose-mirror');
          if (proseMirror) {
            await this.document.update({ [target]: proseMirror.value });
          }
          this.render();
          return;
        }

        // Activate ProseMirror editor
        editor.classList.add('prosemirror-editing');
        const proseMirrorElement = document.createElement('prose-mirror');
        proseMirrorElement.name = target;
        proseMirrorElement.setAttribute('document-uuid', this.document.uuid);
        proseMirrorElement.innerHTML = content;

        // Replace content with editor
        editorElement.innerHTML = '';
        editorElement.appendChild(proseMirrorElement);

        // Change button to save icon
        const icon = button.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-edit');
          icon.classList.add('fa-save');
        }
      });
    }
  }

  /**
   * Set up tab navigation click handlers.
   */
  _setupTabNavigation() {
    const tabs = this.element.querySelectorAll('.sheet-tabs .item[data-tab]');
    tabs.forEach(tab => {
      tab.addEventListener('click', (event) => {
        event.preventDefault();
        const tabId = tab.dataset.tab;
        const group = tab.dataset.group || 'primary';
        this.changeTab(tabId, group);
      });
    });
  }

  /**
   * Set up profile sub-tab navigation click handlers.
   */
  _setupProfileTabNavigation() {
    const tabs = this.element.querySelectorAll('.profile-tabs .item[data-tab]');
    tabs.forEach(tab => {
      tab.addEventListener('click', (event) => {
        event.preventDefault();
        const tabId = tab.dataset.tab;
        this.changeProfileTab(tabId);
      });
    });
  }

  /**
   * Change the active profile sub-tab.
   * @param {string} tab - The tab ID to switch to
   */
  changeProfileTab(tab) {
    this.profileTab = tab;
    this.render();
  }

  /**
   * Set up the skill visibility toggle handler.
   */
  _setupSkillVisibilityToggle() {
    const toggle = this.element.querySelector('.show-all-skills');
    if (toggle) {
      toggle.addEventListener('change', (event) => {
        this.showAllSkills = event.target.checked;
        this.render();
      });
    }
  }

  /**
   * Set up drag-drop handlers for items.
   */
  _setupDragDrop() {
    const dragDrop = new foundry.applications.ux.DragDrop.implementation({
      dragSelector: '.item[data-item-id]',
      dropSelector: '.sheet-body',
      permissions: {
        dragstart: this._canDragStart.bind(this),
        drop: this._canDragDrop.bind(this)
      },
      callbacks: {
        dragstart: this._onDragStart.bind(this),
        drop: this._onDrop.bind(this)
      }
    });
    dragDrop.bind(this.element);
  }

  /**
   * Set up quick roll handlers (shift-click).
   */
  _setupQuickRolls() {
    // Skill quick rolls
    this.element.querySelectorAll('[data-action="rollSkill"]').forEach(el => {
      el.addEventListener('click', (event) => {
        if (event.shiftKey) {
          event.preventDefault();
          const skillName = el.dataset.skill;
          this.document.rollSkill(skillName, { skipDialog: true });
        }
      });
    });

    // Attribute quick rolls
    this.element.querySelectorAll('[data-action="rollAttribute"]').forEach(el => {
      el.addEventListener('click', (event) => {
        if (event.shiftKey) {
          event.preventDefault();
          const attribute = el.dataset.attribute;
          this.document.rollAttribute(attribute, { skipDialog: true });
        }
      });
    });
  }

  /**
   * Check if drag start is allowed.
   */
  _canDragStart(selector) {
    return this.isEditable;
  }

  /**
   * Check if drop is allowed.
   */
  _canDragDrop(selector) {
    return this.isEditable;
  }

  /**
   * Handle drag start for items.
   * @param {DragEvent} event
   */
  _onDragStart(event) {
    const li = event.currentTarget;
    const itemId = li.dataset.itemId;
    const item = this.document.items.get(itemId);

    if (!item) return;

    const dragData = item.toDragData();
    event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
  }

  /**
   * Handle drop events.
   * @param {DragEvent} event
   */
  async _onDrop(event) {
    const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(event);

    switch (data.type) {
      case 'Item':
        return this._onDropItem(event, data);
      case 'Actor':
        return this._onDropActor(event, data);
      case 'ActiveEffect':
        return this._onDropActiveEffect(event, data);
    }
  }

  /**
   * Handle dropping an Item on the sheet.
   * @param {DragEvent} event
   * @param {Object} data - Drag data
   */
  async _onDropItem(event, data) {
    if (!this.isEditable) return;

    const item = await Item.implementation.fromDropData(data);
    if (!item) return;

    // If the item is from this actor, it's a sort operation
    if (item.parent === this.document) {
      return this._onSortItem(event, item);
    }

    // Otherwise, create a copy on this actor
    return this._onDropItemCreate(item);
  }

  /**
   * Create an item from a drop.
   * @param {Item} item - The item to create
   */
  async _onDropItemCreate(item) {
    const itemData = item.toObject();

    // Remove any ID to create a new item
    delete itemData._id;

    return Item.create(itemData, { parent: this.document });
  }

  /**
   * Handle sorting items within the sheet.
   * @param {DragEvent} event
   * @param {Item} item - The item being sorted
   */
  async _onSortItem(event, item) {
    // Get drop target
    const dropTarget = event.target.closest('.item[data-item-id]');
    if (!dropTarget) return;

    const targetId = dropTarget.dataset.itemId;
    if (targetId === item.id) return;

    // Get all items of this type
    const siblings = this.document.items.filter(i => i.type === item.type);
    const targetItem = siblings.find(i => i.id === targetId);

    if (!targetItem) return;

    // Perform the sort
    const sortUpdates = foundry.utils.SortingHelpers.performIntegerSort(item, {
      target: targetItem,
      siblings
    });

    const updateData = sortUpdates.map(u => ({
      _id: u.target.id,
      sort: u.update.sort
    }));

    return this.document.updateEmbeddedDocuments('Item', updateData);
  }

  /**
   * Handle dropping an Actor on the sheet.
   */
  async _onDropActor(event, data) {
    // Override in subclasses if needed
  }

  /**
   * Handle dropping an ActiveEffect on the sheet.
   */
  async _onDropActiveEffect(event, data) {
    const effect = await ActiveEffect.implementation.fromDropData(data);
    if (!effect || effect.parent === this.document) return;

    return ActiveEffect.create(effect.toObject(), { parent: this.document });
  }

  /* -------------------------------------------- */
  /*  Action Handlers                             */
  /* -------------------------------------------- */

  /**
   * Edit an item.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onEditItem(event, target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    const item = this.document.items.get(itemId);
    if (item) item.sheet.render(true);
  }

  /**
   * Delete an item.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onDeleteItem(event, target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    const item = this.document.items.get(itemId);

    if (!item) return;

    // Confirm deletion
    const confirmed = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize('AOA.Common.Delete') },
      content: `<p>${game.i18n.format('AOA.Confirm.DeleteItem', { name: item.name })}</p>`,
      yes: { label: game.i18n.localize('AOA.Common.Delete'), icon: 'fas fa-trash' },
      no: { label: game.i18n.localize('AOA.Common.Cancel'), icon: 'fas fa-times' }
    });

    if (confirmed) {
      await item.delete();
    }
  }

  /**
   * Create a new item.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onCreateItem(event, target) {
    const type = target.dataset.type || 'gear';
    const itemData = {
      name: game.i18n.format('AOA.Item.New', { type: game.i18n.localize(`AOA.ItemTypes.${type}`) }),
      type
    };

    const [item] = await Item.createDocuments([itemData], { parent: this.document });
    item.sheet.render(true);
  }

  /**
   * Roll a skill.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onRollSkill(event, target) {
    const skillName = target.dataset.skill;
    if (!skillName) return;

    // Check for shift-click quick roll
    const skipDialog = event.shiftKey;
    await this.document.rollSkill(skillName, { skipDialog, event });
  }

  /**
   * Roll an attribute.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onRollAttribute(event, target) {
    const attribute = target.dataset.attribute;
    if (!attribute) return;

    // Check for shift-click quick roll
    const skipDialog = event.shiftKey;
    await this.document.rollAttribute(attribute, { skipDialog, event });
  }

  /**
   * Edit an attribute value (toggle input visibility).
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onEditAttribute(event, target) {
    event.preventDefault();
    event.stopPropagation();

    const attribute = target.dataset.attribute;
    if (!attribute) return;

    // Find the attribute box and toggle the input visibility
    const attributeBox = target.closest('.attribute-box');
    if (!attributeBox) return;

    const input = attributeBox.querySelector('.attribute-input');
    const valueContainer = attributeBox.querySelector('.attribute-value-container');

    if (input && valueContainer) {
      // Toggle visibility
      const isHidden = input.classList.contains('hidden');
      if (isHidden) {
        input.classList.remove('hidden');
        valueContainer.classList.add('hidden');
        input.focus();
        input.select();

        // Add blur handler to hide input and save
        const blurHandler = async () => {
          input.classList.add('hidden');
          valueContainer.classList.remove('hidden');
          input.removeEventListener('blur', blurHandler);
        };
        input.addEventListener('blur', blurHandler);

        // Add enter key handler
        const keyHandler = async (e) => {
          if (e.key === 'Enter') {
            input.blur();
          } else if (e.key === 'Escape') {
            // Revert to original value
            const originalValue = attribute === 'witchsight'
              ? this.document.system.witchsight
              : this.document.system.attributes[attribute];
            input.value = originalValue;
            input.blur();
          }
          input.removeEventListener('keydown', keyHandler);
        };
        input.addEventListener('keydown', keyHandler);
      } else {
        input.classList.add('hidden');
        valueContainer.classList.remove('hidden');
      }
    }
  }

  /**
   * Open the attribute editor dialog.
   * Only allows editing modifiers (temporary bonuses/penalties).
   * Base and Advances are read-only (set during creation/advancement).
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onOpenAttributeEditor(event, target) {
    event.preventDefault();
    const actor = this.document;
    const attributes = actor.system.attributes;
    const witchsight = actor.system.witchsight;

    // Build form content - card style matching Character Advancement dialog
    const attributeCards = Object.entries(attributes).map(([key, attr]) => {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      const label = game.i18n.localize(`AOA.Attribute.${capitalizedKey}.long`);
      const abbr = game.i18n.localize(`AOA.Attribute.${capitalizedKey}.abbr`);
      const base = attr.base || 0;
      const advances = attr.advances || 0;
      const modifier = attr.modifier || 0;
      const total = base + advances + modifier;
      return `
        <div class="attribute-card">
          <div class="card-header">
            <span class="attribute-abbr">${abbr}</span>
            <span class="attribute-name">${label}</span>
          </div>
          <div class="card-value">${total}</div>
          <div class="card-breakdown">
            <span class="breakdown-item">Base: ${base >= 0 ? '+' : ''}${base}</span>
            <span class="breakdown-item">Adv: ${advances >= 0 ? '+' : ''}${advances}</span>
          </div>
          <div class="card-modifier">
            <label>${game.i18n.localize('AOA.Attribute.Modifier')}</label>
            <input type="number" name="${key}.modifier" value="${modifier}" />
          </div>
        </div>
      `;
    }).join('');

    const content = `
      <div class="attribute-editor-wrapper">
        <div class="editor-header">
          <h2 class="editor-title">${game.i18n.localize('AOA.Attribute.EditModifiers')}</h2>
          <p class="editor-subtitle">${actor.name}</p>
        </div>
        <form class="attribute-editor-form">
          <div class="section-header">
            <i class="fas fa-chart-bar"></i>
            <span>${game.i18n.localize('AOA.Section.Attributes')}</span>
          </div>
          <div class="attributes-grid">
            ${attributeCards}
          </div>
          <div class="section-header witchsight">
            <i class="fas fa-eye"></i>
            <span>${game.i18n.localize('AOA.Attribute.Witchsight.long')}</span>
          </div>
          <div class="witchsight-display">
            <span class="witchsight-abbr">${game.i18n.localize('AOA.Attribute.Witchsight.abbr')}</span>
            <span class="witchsight-value">${witchsight}</span>
            <span class="witchsight-note">(${game.i18n.localize('AOA.Attribute.Witchsight.ReadOnly')})</span>
          </div>
        </form>
      </div>
    `;

    const result = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.localize('AOA.Attribute.EditModifiers'),
        icon: 'fas fa-edit'
      },
      classes: ['wor', 'attribute-editor-dialog'],
      content,
      buttons: [
        {
          action: 'save',
          label: game.i18n.localize('AOA.Common.Save'),
          icon: 'fas fa-save',
          default: true,
          callback: (event, button, dialog) => {
            const form = dialog.element.querySelector('form');
            const formData = new FormData(form);
            const data = {};
            for (const [key, value] of formData.entries()) {
              data[key] = parseInt(value) || 0;
            }
            return data;
          }
        },
        {
          action: 'cancel',
          label: game.i18n.localize('AOA.Common.Cancel'),
          icon: 'fas fa-times'
        }
      ]
    });

    if (result && result !== 'cancel') {
      // Build update data - only modifiers are editable
      const updateData = {};
      for (const [key, value] of Object.entries(result)) {
        updateData[`system.attributes.${key}`] = value;
      }
      await actor.update(updateData);
    }
  }

  /**
   * Toggle equipped state of an item with equipment restrictions.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onToggleEquip(event, target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    const item = this.document.items.get(itemId);

    if (!item || typeof item.toggleEquipped !== 'function') return;

    // If unequipping, just do it
    if (item.isEquipped) {
      await item.toggleEquipped();
      return;
    }

    // Equipping - check restrictions
    const itemType = item.type;

    if (itemType === 'armor') {
      await this._handleArmorEquip(item);
    } else if (itemType === 'weapon') {
      await this._handleWeaponEquip(item);
    } else {
      // Other equippable items - just equip
      await item.toggleEquipped();
    }
  }

  /**
   * Handle equipping armor with layer restrictions.
   * - Only 1 underlayer allowed
   * - Only 1 outerlayer allowed
   * - Multiple reinforcements allowed
   * - Only 1 shield allowed
   * @param {Item} newArmor - The armor to equip
   * @protected
   */
  async _handleArmorEquip(newArmor) {
    const armorCategory = newArmor.system.armorCategory;

    // Reinforcements can always be equipped without restriction
    if (armorCategory === 'reinforcement') {
      await newArmor.toggleEquipped();
      return;
    }

    // For underlayer, outerlayer, and shield - only 1 of each type allowed
    const equippedOfSameCategory = this.document.items.find(i =>
      i.type === 'armor' &&
      i.isEquipped &&
      i.system.armorCategory === armorCategory
    );

    if (equippedOfSameCategory) {
      // Show switch dialog
      const confirmed = await this._showEquipmentSwitchDialog({
        currentItem: equippedOfSameCategory,
        newItem: newArmor,
        itemType: 'armor',
        armorCategory: armorCategory
      });

      if (confirmed) {
        await equippedOfSameCategory.toggleEquipped(); // Unequip current
        await newArmor.toggleEquipped(); // Equip new
      }
    } else {
      // No armor of this category equipped, just equip
      await newArmor.toggleEquipped();
    }
  }

  /**
   * Handle equipping weapons with hand limit (max 2 hands).
   * @param {Item} newWeapon - The weapon to equip
   * @protected
   */
  async _handleWeaponEquip(newWeapon) {
    const newWeaponHands = newWeapon.system.hands || 1;
    const equippedWeapons = this.document.items.filter(i => i.type === 'weapon' && i.isEquipped);
    const currentHandsUsed = equippedWeapons.reduce((sum, w) => sum + (w.system.hands || 1), 0);

    // Check if we have room
    if (currentHandsUsed + newWeaponHands <= 2) {
      // Enough hands available, just equip
      await newWeapon.toggleEquipped();
      return;
    }

    // Not enough hands - need to switch
    // If new weapon is 2-handed, need to unequip all current weapons
    // If new weapon is 1-handed, find weapons to swap

    if (newWeaponHands === 2) {
      // 2-handed weapon needs all hands free
      const confirmed = await this._showEquipmentSwitchDialog({
        currentItem: equippedWeapons.length === 1 ? equippedWeapons[0] : equippedWeapons,
        newItem: newWeapon,
        itemType: 'weapon',
        reason: 'hands'
      });

      if (confirmed) {
        // Unequip all current weapons
        for (const weapon of equippedWeapons) {
          await weapon.toggleEquipped();
        }
        await newWeapon.toggleEquipped();
      }
    } else {
      // 1-handed weapon but no room - find a weapon to swap
      // Prefer swapping a 1-handed weapon, or the first equipped weapon
      const weaponToSwap = equippedWeapons.find(w => (w.system.hands || 1) === 1) || equippedWeapons[0];

      const confirmed = await this._showEquipmentSwitchDialog({
        currentItem: weaponToSwap,
        newItem: newWeapon,
        itemType: 'weapon',
        reason: 'hands'
      });

      if (confirmed) {
        await weaponToSwap.toggleEquipped();
        await newWeapon.toggleEquipped();
      }
    }
  }

  /**
   * Show a dialog asking if the user wants to switch equipment.
   * @param {Object} options - Dialog options
   * @param {Item|Item[]} options.currentItem - Currently equipped item(s)
   * @param {Item} options.newItem - Item to equip
   * @param {string} options.itemType - Type of item ('armor' or 'weapon')
   * @param {string} [options.reason] - Reason for restriction ('hands')
   * @param {string} [options.armorCategory] - Armor category for specific messaging
   * @returns {Promise<boolean>} True if user confirms the switch
   * @protected
   */
  async _showEquipmentSwitchDialog({ currentItem, newItem, itemType, reason, armorCategory }) {
    const currentItems = Array.isArray(currentItem) ? currentItem : [currentItem];
    const currentNames = currentItems.map(i => i.name).join(', ');

    let content;
    if (itemType === 'armor') {
      // Get localized category name
      const categoryKey = armorCategory ? `AOA.Armor.Category.${armorCategory.charAt(0).toUpperCase() + armorCategory.slice(1)}` : 'AOA.Armor.Category.Outerlayer';
      const categoryName = game.i18n.localize(categoryKey);

      content = `
        <p>${game.i18n.format('AOA.Equipment.ArmorCategoryAlreadyEquipped', { category: categoryName })}</p>
        <p><strong>${game.i18n.localize('AOA.Equipment.CurrentlyEquipped')}:</strong> ${currentNames}</p>
        <p><strong>${game.i18n.localize('AOA.Equipment.WantToEquip')}:</strong> ${newItem.name}</p>
        <p>${game.i18n.localize('AOA.Equipment.SwitchQuestion')}</p>
      `;
    } else {
      const handsNeeded = newItem.system.hands || 1;
      content = `
        <p>${game.i18n.format('AOA.Equipment.NotEnoughHands', { hands: handsNeeded })}</p>
        <p><strong>${game.i18n.localize('AOA.Equipment.CurrentlyEquipped')}:</strong> ${currentNames}</p>
        <p><strong>${game.i18n.localize('AOA.Equipment.WantToEquip')}:</strong> ${newItem.name}</p>
        <p>${game.i18n.localize('AOA.Equipment.SwitchQuestion')}</p>
      `;
    }

    return foundry.applications.api.DialogV2.confirm({
      window: {
        title: game.i18n.localize('AOA.Equipment.SwitchTitle'),
        icon: 'fas fa-exchange-alt'
      },
      content,
      yes: {
        label: game.i18n.localize('AOA.Equipment.Switch'),
        icon: 'fas fa-check'
      },
      no: {
        label: game.i18n.localize('AOA.Common.Cancel'),
        icon: 'fas fa-times'
      }
    });
  }

  /**
   * Use an item (roll, cast, etc.).
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onUseItem(event, target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    const item = this.document.items.get(itemId);

    if (item && typeof item.roll === 'function') {
      await item.roll();
    }
  }

  /**
   * Roll damage for a weapon.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onRollDamage(event, target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    const item = this.document.items.get(itemId);

    if (!item || item.type !== 'weapon') return;

    const actor = this.document;
    const strength = actor.system.getAttributeTotal('strength');

    // Calculate damage
    const baseDamage = item.system.baseDamage || 0;
    const useStrengthBonus = item.system.useStrengthBonus ?? true;
    const totalDamage = useStrengthBonus ? baseDamage + strength : baseDamage;

    // Create chat message
    const messageContent = `
      <div class="wor damage-roll">
        <h3><i class="fas fa-tint"></i> ${game.i18n.localize('AOA.Combat.Damage')}: ${item.name}</h3>
        <div class="damage-breakdown">
          <span class="base-damage">${game.i18n.localize('AOA.Weapon.BaseDamage')}: ${baseDamage}</span>
          ${useStrengthBonus ? `<span class="strength-bonus">+ ${game.i18n.localize('AOA.Attribute.Strength.abbr')}: ${strength}</span>` : ''}
        </div>
        <div class="damage-total">
          <strong>${game.i18n.localize('AOA.Combat.TotalDamage')}:</strong>
          <span class="total-value">${totalDamage}</span>
        </div>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: messageContent
    });
  }

  /**
   * Roll a defense roll.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onRollDefense(event, target) {
    const { showDefenseDialog } = await import('../../helpers/defense.mjs');
    await showDefenseDialog({ actor: this.document });
  }

  /**
   * Activate Full Defense stance.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onActivateFullDefense(event, target) {
    const { activateFullDefense, isFullDefenseActive } = await import('../../helpers/defense.mjs');

    // Check if already active
    if (isFullDefenseActive(this.document)) {
      ui.notifications.warn(game.i18n.localize('AOA.Defense.FullDefense.AlreadyActive'));
      return;
    }

    await activateFullDefense(this.document);
  }

  /**
   * Roll initiative for this actor.
   * Uses the combat system's rollInitiative if in combat, otherwise creates a standalone roll.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onRollInitiative(event, target) {
    const actor = this.document;

    // Check if actor is in active combat
    if (game.combat) {
      const combatant = game.combat.combatants.find(c => c.actorId === actor.id);
      if (combatant) {
        // Use combat's rollInitiative which handles everything
        await game.combat.rollInitiative([combatant.id]);
        return;
      }
    }

    // Not in combat - roll initiative as a standalone roll
    const reflex = actor.system.reflex ?? 0;
    const agility = actor.system.getAttributeTotal('agility');
    const awareness = actor.system.getAttributeTotal('awareness');

    const roll = new Roll('1d6 + @reflex', { reflex });
    await roll.evaluate();

    // Create chat message with styled card
    const content = await foundry.applications.handlebars.renderTemplate(
      'systems/weight-of-ruin/templates/chat/initiative-card.hbs',
      {
        actor: { name: actor.name, img: actor.img },
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

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content,
      rolls: [roll],
      flags: { 'weight-of-ruin': { initiativeRoll: true } }
    });
  }

  /* -------------------------------------------- */
  /*  Health & Resource Action Handlers           */
  /* -------------------------------------------- */

  /**
   * Adjust Trauma value.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onAdjustTrauma(event, target) {
    const adjustment = parseInt(target.dataset.adjust) || 0;
    await this.document.modifyTrauma(adjustment);
  }

  /**
   * Roll a Wounds Roll.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onRollWounds(event, target) {
    await this.document.rollWounds();
  }

  /**
   * Set Fervor to a specific value (clicking a pip).
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onSetFervor(event, target) {
    const fervorValue = parseInt(target.dataset.fervor) || 0;
    const currentFervor = this.document.system.fervor?.current ?? 0;

    // Toggle behavior: if clicking the current value, reduce by 1
    const newFervor = (fervorValue === currentFervor) ? Math.max(0, currentFervor - 1) : fervorValue;

    await this.document.update({ 'system.fervor.current': newFervor });
  }

  /**
   * Adjust Fervor value by increment.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onAdjustFervor(event, target) {
    const adjustment = parseInt(target.dataset.adjust) || 0;
    await this.document.modifyFervor(adjustment);
  }

  /**
   * Set Essence to a specific value (clicking a pip).
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onSetEssence(event, target) {
    const essenceValue = parseInt(target.dataset.essence) || 0;
    const currentEssence = this.document.system.essence?.current ?? 10;

    // If reducing Essence, confirm
    if (essenceValue < currentEssence) {
      const confirmed = await foundry.applications.api.DialogV2.confirm({
        window: { title: game.i18n.localize('AOA.Essence.ConfirmDecrease') },
        content: `<p>${game.i18n.format('AOA.Essence.DecreaseWarning', {
          current: currentEssence,
          new: essenceValue
        })}</p>`,
        yes: { label: game.i18n.localize('AOA.Common.Confirm'), icon: 'fas fa-check' },
        no: { label: game.i18n.localize('AOA.Common.Cancel'), icon: 'fas fa-times' }
      });

      if (!confirmed) return;
    }

    await this.document.update({ 'system.essence.current': essenceValue });

    // Check for warnings
    if (essenceValue === 0) {
      ui.notifications.error(game.i18n.format('AOA.Warnings.LengTransformation', { name: this.document.name }));
    } else if (essenceValue <= 2) {
      ui.notifications.warn(game.i18n.format('AOA.Warnings.EssenceCritical', {
        name: this.document.name,
        essence: essenceValue
      }));
    }
  }

  /**
   * Adjust Essence value by increment.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onAdjustEssence(event, target) {
    const adjustment = parseInt(target.dataset.adjust) || 0;

    // If decreasing, confirm
    if (adjustment < 0) {
      const currentEssence = this.document.system.essence?.current ?? 10;
      const newEssence = currentEssence + adjustment;

      const confirmed = await foundry.applications.api.DialogV2.confirm({
        window: { title: game.i18n.localize('AOA.Essence.ConfirmDecrease') },
        content: `<p>${game.i18n.format('AOA.Essence.DecreaseWarning', {
          current: currentEssence,
          new: Math.max(0, newEssence)
        })}</p>`,
        yes: { label: game.i18n.localize('AOA.Common.Confirm'), icon: 'fas fa-check' },
        no: { label: game.i18n.localize('AOA.Common.Cancel'), icon: 'fas fa-times' }
      });

      if (!confirmed) return;
    }

    await this.document.modifyEssence(adjustment);
  }

  /* -------------------------------------------- */
  /*  Rest Action Handler                         */
  /* -------------------------------------------- */

  /**
   * Open the rest dialog to recover Trauma.
   * Rest rules from wor_core.md:
   * - Remove 1 Trauma per 2 hours of sleep
   * - Maximum 4 Trauma removed per full night (8 hours)
   * - Comfortable rest (safe environment): additional 1 Trauma per night
   * - Rest alone cannot restore Resilience or Max Trauma
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onOpenRestDialog(event, target) {
    const actor = this.document;
    const currentTrauma = actor.system.health?.trauma ?? 0;

    const content = `
      <form class="rest-dialog-form">
        <p class="rest-info">${game.i18n.localize('AOA.Rest.RecoveryRate')}</p>
        <p class="rest-info">${game.i18n.localize('AOA.Rest.MaxRecovery')}</p>

        <div class="form-group">
          <label>${game.i18n.localize('AOA.Rest.Duration')}</label>
          <select name="duration">
            <option value="2">${game.i18n.localize('AOA.Rest.TwoHours')}</option>
            <option value="4">${game.i18n.localize('AOA.Rest.FourHours')}</option>
            <option value="8" selected>${game.i18n.localize('AOA.Rest.EightHours')}</option>
            <option value="custom">${game.i18n.localize('AOA.Rest.Custom')}</option>
          </select>
        </div>

        <div class="form-group custom-duration hidden">
          <label>${game.i18n.localize('AOA.Rest.Hours')}</label>
          <input type="number" name="customHours" value="8" min="1" max="24" />
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" name="comfortable" />
            ${game.i18n.localize('AOA.Rest.Comfortable')}
          </label>
          <p class="hint">${game.i18n.localize('AOA.Rest.ComfortableHint')}</p>
        </div>

        <div class="rest-preview">
          <p><strong>${game.i18n.localize('AOA.Health.Trauma')}:</strong> ${currentTrauma}</p>
          <p class="trauma-preview"><strong>${game.i18n.localize('AOA.Rest.TraumaRecovered')}:</strong> <span class="preview-value">4</span></p>
        </div>
      </form>
    `;

    const result = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.localize('AOA.Rest.DialogTitle'),
        icon: 'fas fa-bed'
      },
      content,
      render: (event, dialog) => {
        const form = dialog.element.querySelector('form');
        const durationSelect = form.querySelector('[name="duration"]');
        const customDurationDiv = form.querySelector('.custom-duration');
        const customHoursInput = form.querySelector('[name="customHours"]');
        const comfortableCheckbox = form.querySelector('[name="comfortable"]');
        const previewValue = form.querySelector('.preview-value');

        const updatePreview = () => {
          let hours;
          if (durationSelect.value === 'custom') {
            hours = parseInt(customHoursInput.value) || 8;
          } else {
            hours = parseInt(durationSelect.value);
          }
          const comfortable = comfortableCheckbox.checked;

          // Calculate trauma recovery: 1 per 2 hours, max 4 per night
          let traumaRecovery = Math.floor(hours / 2);
          traumaRecovery = Math.min(traumaRecovery, 4); // Max 4 per night

          // Add comfortable bonus (1 per night, only for 8+ hours)
          if (comfortable && hours >= 8) {
            traumaRecovery += 1;
          }

          // Can't recover more than current trauma
          traumaRecovery = Math.min(traumaRecovery, currentTrauma);

          previewValue.textContent = traumaRecovery;
        };

        durationSelect.addEventListener('change', () => {
          if (durationSelect.value === 'custom') {
            customDurationDiv.classList.remove('hidden');
          } else {
            customDurationDiv.classList.add('hidden');
          }
          updatePreview();
        });

        customHoursInput.addEventListener('change', updatePreview);
        comfortableCheckbox.addEventListener('change', updatePreview);

        updatePreview();
      },
      buttons: [
        {
          action: 'rest',
          label: game.i18n.localize('AOA.Rest.Confirm'),
          icon: 'fas fa-bed',
          default: true,
          callback: (event, button, dialog) => {
            const form = dialog.element.querySelector('form');
            let hours;
            if (form.elements.duration.value === 'custom') {
              hours = parseInt(form.elements.customHours.value) || 8;
            } else {
              hours = parseInt(form.elements.duration.value);
            }
            return {
              hours,
              comfortable: form.elements.comfortable.checked
            };
          }
        },
        {
          action: 'cancel',
          label: game.i18n.localize('AOA.Rest.Cancel'),
          icon: 'fas fa-times'
        }
      ]
    });

    if (result && result !== 'cancel') {
      const { hours, comfortable } = result;

      // Calculate trauma recovery
      let traumaRecovery = Math.floor(hours / 2);
      traumaRecovery = Math.min(traumaRecovery, 4); // Max 4 per night

      // Add comfortable bonus (only for 8+ hours)
      if (comfortable && hours >= 8) {
        traumaRecovery += 1;
      }

      // Can't recover more than current trauma
      traumaRecovery = Math.min(traumaRecovery, currentTrauma);

      if (traumaRecovery > 0) {
        // Update trauma
        const newTrauma = Math.max(0, currentTrauma - traumaRecovery);
        await actor.update({ 'system.health.trauma': newTrauma });

        // Show chat message
        const messageContent = comfortable && hours >= 8
          ? game.i18n.format('AOA.Rest.RestResultComfortable', {
              name: actor.name,
              hours: hours,
              trauma: traumaRecovery
            })
          : game.i18n.format('AOA.Rest.RestResult', {
              name: actor.name,
              hours: hours,
              trauma: traumaRecovery
            });

        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor }),
          content: `<div class="wor rest-result">
            <h3><i class="fas fa-bed"></i> ${game.i18n.localize('AOA.Rest.RestComplete')}</h3>
            <p>${messageContent}</p>
          </div>`
        });
      } else {
        ui.notifications.info(game.i18n.format('AOA.Rest.NoTraumaToRecover', { name: actor.name }));
      }
    }
  }

  /* -------------------------------------------- */
  /*  Condition Action Handlers                   */
  /* -------------------------------------------- */

  /**
   * Toggle a condition on the actor.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onToggleCondition(event, target) {
    const conditionId = target.dataset.conditionId;
    if (!conditionId) return;

    await toggleCondition(this.document, conditionId);
  }

  /**
   * Remove a condition from the actor.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onRemoveCondition(event, target) {
    const conditionId = target.dataset.conditionId;
    if (!conditionId) return;

    await removeCondition(this.document, conditionId);
  }

  /**
   * Open the condition reference panel.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onOpenConditionReference(event, target) {
    // Import dynamically to avoid circular dependencies
    const { ConditionReferencePanel } = await import('../../apps/condition-reference.mjs');
    ConditionReferencePanel.open(this.document);
  }

  /* -------------------------------------------- */
  /*  Wealth Action Handlers                      */
  /* -------------------------------------------- */

  /**
   * Open the wealth edit dialogue.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onEditWealth(event, target) {
    const actor = this.document;
    const wealth = actor.system.wealth || { sovereigns: 0, crowns: 0, orin: 0 };

    const content = `
      <form class="wealth-edit-form">
        <p>${game.i18n.localize('AOA.Wealth.EditDescription')}</p>
        <div class="form-group">
          <label>${game.i18n.localize('AOA.Wealth.Operation')}</label>
          <select name="operation">
            <option value="add">${game.i18n.localize('AOA.Wealth.Add')}</option>
            <option value="subtract">${game.i18n.localize('AOA.Wealth.Subtract')}</option>
            <option value="set">${game.i18n.localize('AOA.Wealth.Set')}</option>
          </select>
        </div>
        <div class="form-group">
          <label>${game.i18n.localize('AOA.Wealth.Sovereigns')}</label>
          <div class="currency-row">
            <span class="current-value">${game.i18n.localize('AOA.Wealth.Current')}: ${wealth.sovereigns}</span>
            <input type="number" name="sovereigns" value="0" min="0" />
          </div>
        </div>
        <div class="form-group">
          <label>${game.i18n.localize('AOA.Wealth.Crowns')}</label>
          <div class="currency-row">
            <span class="current-value">${game.i18n.localize('AOA.Wealth.Current')}: ${wealth.crowns}</span>
            <input type="number" name="crowns" value="0" min="0" />
          </div>
        </div>
        <div class="form-group">
          <label>${game.i18n.localize('AOA.Wealth.Orin')}</label>
          <div class="currency-row">
            <span class="current-value">${game.i18n.localize('AOA.Wealth.Current')}: ${wealth.orin}</span>
            <input type="number" name="orin" value="0" min="0" />
          </div>
        </div>
      </form>
    `;

    const result = await foundry.applications.api.DialogV2.prompt({
      window: { title: game.i18n.localize('AOA.Wealth.Edit') },
      content,
      ok: {
        label: game.i18n.localize('AOA.Common.Apply'),
        icon: 'fas fa-check',
        callback: (event, button, dialog) => {
          const form = button.form;
          return {
            operation: form.elements.operation.value,
            sovereigns: parseInt(form.elements.sovereigns.value) || 0,
            crowns: parseInt(form.elements.crowns.value) || 0,
            orin: parseInt(form.elements.orin.value) || 0
          };
        }
      }
    });

    if (result) {
      const updateData = {};
      const { operation, sovereigns, crowns, orin } = result;

      switch (operation) {
        case 'add':
          updateData['system.wealth.sovereigns'] = wealth.sovereigns + sovereigns;
          updateData['system.wealth.crowns'] = wealth.crowns + crowns;
          updateData['system.wealth.orin'] = wealth.orin + orin;
          break;
        case 'subtract':
          updateData['system.wealth.sovereigns'] = Math.max(0, wealth.sovereigns - sovereigns);
          updateData['system.wealth.crowns'] = Math.max(0, wealth.crowns - crowns);
          updateData['system.wealth.orin'] = Math.max(0, wealth.orin - orin);
          break;
        case 'set':
          if (sovereigns > 0) updateData['system.wealth.sovereigns'] = sovereigns;
          if (crowns > 0) updateData['system.wealth.crowns'] = crowns;
          if (orin > 0) updateData['system.wealth.orin'] = orin;
          break;
      }

      if (Object.keys(updateData).length > 0) {
        await actor.update(updateData);
      }
    }
  }

  /**
   * Handle clicking the portrait to open a file picker.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onEditPortrait(event, target) {
    const actor = this.document;
    const FilePickerClass = foundry.applications.apps.FilePicker.implementation;
    const fp = new FilePickerClass({
      type: 'image',
      current: actor.img,
      callback: async (path) => {
        await actor.update({ img: path });
      }
    });
    fp.browse();
  }

  /**
   * Toggle expansion of an identity card (Lineage, Archetype, Background, Pathway, Life Event).
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static #onToggleExpand(event, target) {
    // Don't toggle if clicking on edit/delete buttons
    if (event.target.closest('.item-control')) return;

    const card = target.closest('.identity-card');
    if (!card) return;

    // Only expand if the card has an item
    if (!card.classList.contains('has-item')) return;

    // Toggle expanded state
    card.classList.toggle('expanded');
  }

  /**
   * Toggle expansion of a talent item to show/hide details.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static #onToggleTalentExpand(event, target) {
    // Don't toggle if clicking on edit/delete buttons
    if (event.target.closest('.item-control')) return;

    const talentItem = target.closest('.talent-item');
    if (!talentItem) return;

    // Toggle expanded state
    talentItem.classList.toggle('expanded');
  }

  /* -------------------------------------------- */
  /*  Advancement Action Handlers                 */
  /* -------------------------------------------- */

  /**
   * Open the XP adjustment dialog.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onAdjustXP(event, target) {
    const actor = this.document;
    const currentXP = actor.system.advancement?.xp?.current ?? 0;
    const totalXP = actor.system.advancement?.xp?.total ?? 0;

    const content = `
      <form class="xp-adjust-form">
        <p class="xp-current"><strong>${game.i18n.localize('AOA.Advancement.XP.Current')}:</strong> ${currentXP}</p>

        <div class="form-group">
          <label>${game.i18n.localize('AOA.Wealth.Operation')}</label>
          <select name="operation">
            <option value="add">${game.i18n.localize('AOA.Advancement.XP.Add')}</option>
            <option value="subtract">${game.i18n.localize('AOA.Advancement.XP.Subtract')}</option>
          </select>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize('AOA.Advancement.XP.Amount')}</label>
          <input type="number" name="amount" value="0" min="0" max="10000" />
        </div>

        <div class="form-group">
          <label>${game.i18n.localize('AOA.Advancement.XP.Reason')}</label>
          <input type="text" name="reason" placeholder="${game.i18n.localize('AOA.Advancement.XP.ReasonPlaceholder')}" />
        </div>
      </form>
    `;

    const result = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.localize('AOA.Advancement.XP.AdjustTitle'),
        icon: 'fas fa-star'
      },
      content,
      buttons: [
        {
          action: 'apply',
          label: game.i18n.localize('AOA.Common.Apply'),
          icon: 'fas fa-check',
          default: true,
          callback: (event, button, dialog) => {
            const form = dialog.element.querySelector('form');
            return {
              operation: form.elements.operation.value,
              amount: parseInt(form.elements.amount.value) || 0,
              reason: form.elements.reason.value.trim()
            };
          }
        },
        {
          action: 'cancel',
          label: game.i18n.localize('AOA.Common.Cancel'),
          icon: 'fas fa-times'
        }
      ]
    });

    if (result && result !== 'cancel' && result.amount > 0) {
      const { operation, amount, reason } = result;
      let newCurrent, newTotal;

      if (operation === 'add') {
        newCurrent = Math.min(currentXP + amount, 10000);
        newTotal = totalXP + amount;
      } else {
        newCurrent = Math.max(0, currentXP - amount);
        newTotal = totalXP; // Don't reduce total when spending
      }

      await actor.update({
        'system.advancement.xp.current': newCurrent,
        'system.advancement.xp.total': newTotal
      });

      // Log to chat if reason provided
      if (reason) {
        const changeText = operation === 'add'
          ? `+${amount} XP`
          : `-${amount} XP`;

        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor }),
          content: `<div class="wor xp-adjustment">
            <h3><i class="fas fa-star"></i> ${game.i18n.localize('AOA.Advancement.XP.AdjustTitle')}</h3>
            <p><strong>${actor.name}:</strong> ${changeText}</p>
            <p class="reason"><em>${reason}</em></p>
          </div>`
        });
      }
    }
  }

  /**
   * Open the advancement wizard to purchase an advancement.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onPurchaseAdvancement(event, target) {
    const actor = this.document;
    const currentXP = actor.system.advancement?.xp?.current ?? 0;

    // Double-check XP requirement
    if (currentXP < 1000) {
      ui.notifications.warn(game.i18n.localize('AOA.Advancement.PurchaseDisabled'));
      return;
    }

    // Import and open the advancement wizard
    const { AdvancementWizard } = await import('../../apps/advancement-wizard.mjs');
    const wizard = new AdvancementWizard(actor);
    wizard.render(true);
  }

  /* -------------------------------------------- */
  /*  Header Control Action Handlers              */
  /* -------------------------------------------- */

  /**
   * Configure the prototype token for this actor.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onConfigurePrototypeToken(event, target) {
    const actor = this.document;
    if (!actor.isOwner) return;

    // Open the prototype token configuration (v13 API)
    new CONFIG.Token.prototypeSheetClass({ prototype: actor.prototypeToken }).render(true);
  }

  /**
   * View the character artwork in an image popout.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onViewCharacterArt(event, target) {
    const actor = this.document;
    const img = actor.img;

    if (!img || img === CONST.DEFAULT_TOKEN) {
      ui.notifications.warn(game.i18n.localize('AOA.HeaderControls.NoCharacterArt'));
      return;
    }

    // Create an image popout (v13 API)
    new foundry.applications.apps.ImagePopout({
      src: img,
      window: { title: actor.name },
      uuid: actor.uuid
    }).render(true);
  }

  /**
   * View the token artwork in an image popout.
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onViewTokenArt(event, target) {
    const actor = this.document;
    const tokenImg = actor.prototypeToken?.texture?.src;

    if (!tokenImg || tokenImg === CONST.DEFAULT_TOKEN) {
      ui.notifications.warn(game.i18n.localize('AOA.HeaderControls.NoTokenArt'));
      return;
    }

    // Create an image popout (v13 API)
    new foundry.applications.apps.ImagePopout({
      src: tokenImg,
      window: { title: `${actor.name} - ${game.i18n.localize('AOA.HeaderControls.Token')}` },
      uuid: actor.uuid
    }).render(true);
  }

  /**
   * Configure actor settings (ownership/permissions).
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onConfigureActorSettings(event, target) {
    const actor = this.document;
    if (!actor.isOwner) return;

    // Open the document ownership configuration (v13 API)
    new foundry.applications.apps.DocumentOwnershipConfig({ document: actor }).render(true);
  }

  /**
   * Toggle the notes editor between view and edit modes
   * @param {PointerEvent} event - The triggering event
   * @param {HTMLElement} target - The element that triggered the action
   */
  static async #onToggleNotesEditor(event, target) {
    event.preventDefault();
    const section = target.closest('.notes-section');
    if (!section) return;

    const viewDiv = section.querySelector('.notes-view');
    const editDiv = section.querySelector('.notes-edit');
    if (!viewDiv || !editDiv) return;

    // Toggle visibility
    viewDiv.classList.add('hidden');
    editDiv.classList.remove('hidden');

    // Hide the edit button while editing
    target.style.display = 'none';
  }

  /* -------------------------------------------- */
  /*  Tab Management                              */
  /* -------------------------------------------- */

  /** @override */
  changeTab(tab, group, options = {}) {
    this.tabGroups[group] = tab;
    this.render();
  }

  /** @override */
  _onChangeTab(event, tabs, active) {
    super._onChangeTab(event, tabs, active);
    this.tabGroups[tabs.dataset.group] = active;
  }
}
