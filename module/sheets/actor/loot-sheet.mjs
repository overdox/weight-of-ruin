const { HandlebarsApplicationMixin, DocumentSheetV2 } = foundry.applications.api;

/**
 * Loot/Merchant Sheet using ApplicationV2 for The Weight of Ruin.
 * Supports two modes:
 * - Loot: Treasure distribution from encounters
 * - Merchant: Players can browse and purchase items
 * @extends {DocumentSheetV2}
 */
export class WoRLootSheet extends HandlebarsApplicationMixin(DocumentSheetV2) {

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['wor', 'weight-of-ruin', 'actor-sheet', 'loot-sheet'],
    position: {
      width: 500,
      height: 600
    },
    actions: {
      editItem: WoRLootSheet.#onEditItem,
      deleteItem: WoRLootSheet.#onDeleteItem,
      splitCoins: WoRLootSheet.#onSplitCoins,
      lootTokens: WoRLootSheet.#onLootTokens,
      toggleSheetType: WoRLootSheet.#onToggleSheetType,
      adjustQuantity: WoRLootSheet.#onAdjustQuantity,
      purchaseItem: WoRLootSheet.#onPurchaseItem,
      takeItem: WoRLootSheet.#onTakeItem,
      editPortrait: WoRLootSheet.#onEditPortrait,
      // Header controls
      configurePrototypeToken: WoRLootSheet.#onConfigurePrototypeToken,
      viewCharacterArt: WoRLootSheet.#onViewCharacterArt,
      viewTokenArt: WoRLootSheet.#onViewTokenArt,
      configureActorSettings: WoRLootSheet.#onConfigureActorSettings
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
    form: {
      template: 'systems/weight-of-ruin/templates/actor/loot/loot-sheet.hbs',
      scrollable: ['.loot-inventory']
    }
  };

  /* -------------------------------------------- */
  /*  Header Controls                             */
  /* -------------------------------------------- */

  /** @override */
  _getHeaderControls() {
    const controls = super._getHeaderControls();
    const actor = this.document;

    // Prototype Token - only for GMs
    if (game.user.isGM) {
      controls.push({
        icon: 'fa-solid fa-user-circle',
        label: 'WOR.HeaderControls.PrototypeToken',
        action: 'configurePrototypeToken',
        visible: true
      });
    }

    // View Character Artwork
    controls.push({
      icon: 'fa-solid fa-image',
      label: 'WOR.HeaderControls.ViewCharacterArt',
      action: 'viewCharacterArt',
      visible: true
    });

    // View Token Artwork
    controls.push({
      icon: 'fa-solid fa-user-circle',
      label: 'WOR.HeaderControls.ViewTokenArt',
      action: 'viewTokenArt',
      visible: !!actor.prototypeToken?.texture?.src
    });

    // Actor Settings (ownership/permissions)
    if (game.user.isGM) {
      controls.push({
        icon: 'fa-solid fa-cogs',
        label: 'WOR.HeaderControls.ActorSettings',
        action: 'configureActorSettings',
        visible: true
      });
    }

    return controls;
  }

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /** @override */
  get title() {
    const mode = this.document.system.isMerchantMode
      ? game.i18n.localize('WOR.Loot.SheetType.merchant')
      : game.i18n.localize('WOR.Loot.SheetType.loot');
    return `${this.document.name} (${mode})`;
  }

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = {};
    const actor = this.document;
    const source = actor.toObject();

    // Base data
    context.actor = actor;
    context.source = source;
    context.system = actor.system;
    context.isEditable = this.isEditable;
    context.isGM = game.user.isGM;
    context.isOwner = actor.isOwner;

    // Portrait with fallback
    const defaultArtwork = 'systems/weight-of-ruin/assets/tokens/default_artwork.webp';
    const isDefaultImg = !actor.img || actor.img === CONST.DEFAULT_TOKEN;
    context.portraitImg = isDefaultImg ? defaultArtwork : actor.img;

    // Sheet type (loot vs merchant)
    context.isLootMode = actor.system.isLootMode;
    context.isMerchantMode = actor.system.isMerchantMode;
    context.sheetType = actor.system.sheetType;

    // Wealth
    context.wealth = actor.system.wealth;
    context.totalWealthInOrin = actor.system.totalWealthInOrin;
    context.hasWealth = context.totalWealthInOrin > 0;

    // Settings
    context.hiddenWhenEmpty = actor.system.hiddenWhenEmpty;
    context.priceModifier = actor.system.priceModifier;

    // Enriched description
    const enrichOptions = { secrets: actor.isOwner, relativeTo: actor };
    context.enrichedDescription = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      actor.system.description ?? '', enrichOptions
    );

    // Prepare items by category
    context.items = this._prepareItems(actor);
    context.hasItems = actor.items.size > 0;
    context.isEmpty = actor.system.isEmpty;

    // Total values
    context.totalItemValue = actor.system.totalItemValue;
    context.totalValue = actor.system.totalValue;

    // Player characters available for coin splitting
    if (game.user.isGM) {
      context.playerCharacters = game.actors.filter(a =>
        a.type === 'character' && a.hasPlayerOwner
      );
    }

    return context;
  }

  /**
   * Organize items by type for display.
   * @param {Actor} actor
   * @returns {Object}
   */
  _prepareItems(actor) {
    const items = {
      weapons: [],
      armor: [],
      gear: []
    };

    for (const item of actor.items) {
      const itemData = item.toObject();
      itemData.id = item.id;
      itemData.img = item.img;
      itemData.name = item.name;
      itemData.value = item.system.value || 0;
      itemData.quantity = item.system.quantity || 1;
      itemData.totalValue = itemData.value * itemData.quantity;

      // Apply price modifier for merchant mode
      if (actor.system.isMerchantMode) {
        itemData.modifiedPrice = actor.system.getModifiedPrice(itemData.value);
        itemData.totalModifiedPrice = itemData.modifiedPrice * itemData.quantity;
      }

      switch (item.type) {
        case 'weapon':
          items.weapons.push(itemData);
          break;
        case 'armor':
          items.armor.push(itemData);
          break;
        case 'gear':
          items.gear.push(itemData);
          break;
      }
    }

    // Sort each category by name
    for (const category of Object.values(items)) {
      category.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /** @override */
  async _onChangeForm(formConfig, event) {
    // Let the parent handle the form change, which triggers document update
    await super._onChangeForm(formConfig, event);
  }

  /**
   * Handle form input changes manually.
   * @param {Event} event - The change event
   */
  async _onFormChange(event) {
    const target = event.target;
    if (!target.name) return;

    // Get the value based on input type
    let value;
    if (target.type === 'checkbox') {
      value = target.checked;
    } else if (target.type === 'number') {
      value = Number(target.value) || 0;
    } else {
      value = target.value;
    }

    // Update the document
    await this.document.update({ [target.name]: value });
  }

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);

    // Bind change events for form inputs
    const form = this.element.querySelector('form');
    if (form) {
      form.addEventListener('change', this._onFormChange.bind(this));
    }

    // Setup drag-drop handling
    const dragDrop = new foundry.applications.ux.DragDrop.implementation({
      dragSelector: '.item[data-item-id]',
      dropSelector: '.loot-sheet-form',
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
   * Check if drag can start.
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
   * Handle drag start.
   * @param {DragEvent} event
   */
  _onDragStart(event) {
    const target = event.currentTarget;
    const itemId = target.dataset.itemId;
    const item = this.document.items.get(itemId);

    if (!item) return;

    const dragData = item.toDragData();
    event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
  }

  /**
   * Handle drop.
   * @param {DragEvent} event
   */
  async _onDrop(event) {
    const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(event);

    switch (data.type) {
      case 'Item':
        return this._onDropItem(event, data);
    }
  }

  /**
   * Handle dropping an item onto the loot sheet.
   * @param {DragEvent} event
   * @param {Object} data
   */
  async _onDropItem(event, data) {
    if (!this.isEditable) return;

    const item = await Item.implementation.fromDropData(data);
    if (!item) return;

    // Only accept equipment items
    const validTypes = ['weapon', 'armor', 'gear'];
    if (!validTypes.includes(item.type)) {
      ui.notifications.warn(game.i18n.localize('WOR.Loot.InvalidItemType'));
      return;
    }

    // Check if dropping from another actor
    const sourceActor = item.parent;
    if (sourceActor && sourceActor.id !== this.document.id) {
      // Transfer from another actor
      await this._transferItemFromActor(item, sourceActor);
    } else if (!sourceActor) {
      // Dropping from compendium or sidebar
      const itemData = item.toObject();
      delete itemData._id;
      await Item.create(itemData, { parent: this.document });
    }
  }

  /**
   * Transfer an item from another actor to this loot pile.
   * @param {Item} item
   * @param {Actor} sourceActor
   */
  async _transferItemFromActor(item, sourceActor) {
    const itemData = item.toObject();
    delete itemData._id;

    // Unequip if equipped
    if (itemData.system.equipped) {
      itemData.system.equipped = false;
    }

    // Create on target, delete from source
    await Item.create(itemData, { parent: this.document });
    await item.delete();

    ui.notifications.info(game.i18n.format('WOR.Loot.ItemTransferred', { name: item.name }));
  }

  /* -------------------------------------------- */
  /*  Action Handlers                             */
  /* -------------------------------------------- */

  /**
   * Edit an item.
   */
  static async #onEditItem(event, target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    const item = this.document.items.get(itemId);
    if (item) item.sheet.render(true);
  }

  /**
   * Delete an item.
   */
  static async #onDeleteItem(event, target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    const item = this.document.items.get(itemId);
    if (!item) return;

    const confirmed = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize('WOR.Dialog.DeleteItem') },
      content: `<p>${game.i18n.format('WOR.Dialog.DeleteItemConfirm', { name: item.name })}</p>`,
      yes: { label: game.i18n.localize('WOR.Common.Delete'), icon: 'fas fa-trash' },
      no: { label: game.i18n.localize('WOR.Common.Cancel') }
    });

    if (confirmed) {
      await item.delete();
    }
  }

  /**
   * Toggle between loot and merchant mode.
   * Only owners can toggle the mode.
   */
  static async #onToggleSheetType(event, target) {
    // Silently fail for non-owners
    if (!this.document.isOwner) return;

    const currentType = this.document.system.sheetType;
    const newType = currentType === 'loot' ? 'merchant' : 'loot';
    await this.document.update({ 'system.sheetType': newType });
  }

  /**
   * Adjust item quantity.
   */
  static async #onAdjustQuantity(event, target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    const item = this.document.items.get(itemId);
    if (!item) return;

    const adjustment = parseInt(target.dataset.adjust) || 0;
    const currentQuantity = item.system.quantity || 1;
    const newQuantity = Math.max(1, currentQuantity + adjustment);

    await item.update({ 'system.quantity': newQuantity });
  }

  /**
   * Open coin splitting dialog.
   */
  static async #onSplitCoins(event, target) {
    if (!game.user.isGM) return;

    const wealth = this.document.system.wealth;
    if (this.document.system.totalWealthInOrin === 0) {
      ui.notifications.warn(game.i18n.localize('WOR.Loot.NoCoinsToSplit'));
      return;
    }

    // Get player characters
    const playerCharacters = game.actors.filter(a =>
      a.type === 'character' && a.hasPlayerOwner
    );

    if (playerCharacters.length === 0) {
      ui.notifications.warn(game.i18n.localize('WOR.Loot.NoPlayersAvailable'));
      return;
    }

    // Build dialog content
    const content = await foundry.applications.handlebars.renderTemplate(
      'systems/weight-of-ruin/templates/actor/loot/split-coins-dialog.hbs',
      {
        wealth,
        playerCharacters,
        totalInOrin: this.document.system.totalWealthInOrin
      }
    );

    const result = await foundry.applications.api.DialogV2.wait({
      window: { title: game.i18n.localize('WOR.Loot.SplitCoins') },
      classes: ['weight-of-ruin', 'split-coins-dialog'],
      content,
      buttons: [
        {
          action: 'split',
          label: game.i18n.localize('WOR.Loot.SplitCoins'),
          icon: 'fas fa-coins',
          default: true,
          callback: (event, button, dialog) => {
            const form = dialog.element.querySelector('form');
            const selected = Array.from(form.querySelectorAll('input[name="character"]:checked'))
              .map(input => input.value);
            return selected;
          }
        },
        {
          action: 'cancel',
          label: game.i18n.localize('WOR.Common.Cancel')
        }
      ]
    });

    if (result === 'cancel' || !result || result.length === 0) {
      if (result && result.length === 0) {
        ui.notifications.warn(game.i18n.localize('WOR.Loot.NoPlayersSelected'));
      }
      return;
    }

    // Perform the split
    await this._splitCoins(result);
  }

  /**
   * Split coins among selected characters.
   * @param {string[]} characterIds
   */
  async _splitCoins(characterIds) {
    const targetActors = characterIds.map(id => game.actors.get(id)).filter(a => a);
    if (targetActors.length === 0) return;

    const { sovereigns, crowns, orin } = this.document.system.wealth;
    const numTargets = targetActors.length;

    const splitSovereigns = Math.floor(sovereigns / numTargets);
    const splitCrowns = Math.floor(crowns / numTargets);
    const splitOrin = Math.floor(orin / numTargets);

    // Batch update all target actors
    const updates = targetActors.map(actor => ({
      _id: actor.id,
      'system.wealth.sovereigns': actor.system.wealth.sovereigns + splitSovereigns,
      'system.wealth.crowns': actor.system.wealth.crowns + splitCrowns,
      'system.wealth.orin': actor.system.wealth.orin + splitOrin
    }));

    await Actor.updateDocuments(updates);

    // Leave remainder in loot actor
    await this.document.update({
      'system.wealth': {
        sovereigns: sovereigns % numTargets,
        crowns: crowns % numTargets,
        orin: orin % numTargets
      }
    });

    // Notify
    const names = targetActors.map(a => a.name).join(', ');
    ui.notifications.info(game.i18n.format('WOR.Loot.SplitComplete', { count: numTargets }));

    // Chat message
    const chatContent = `
      <div class="wor loot-split">
        <h4>${game.i18n.localize('WOR.Loot.CoinsSplit')}</h4>
        <p>${game.i18n.format('WOR.Loot.SplitDetails', {
          sovereigns: splitSovereigns,
          crowns: splitCrowns,
          orin: splitOrin,
          recipients: names
        })}</p>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.document }),
      content: chatContent
    });
  }

  /**
   * Open loot tokens dialog.
   */
  static async #onLootTokens(event, target) {
    if (!game.user.isGM) return;

    // Get controlled tokens (excluding this loot actor's tokens)
    const lootTokenIds = this.document.getActiveTokens().map(t => t.id);
    const selectedTokens = canvas.tokens.controlled.filter(t =>
      !lootTokenIds.includes(t.id) &&
      t.actor &&
      ['npc', 'creature'].includes(t.actor.type)
    );

    if (selectedTokens.length === 0) {
      ui.notifications.warn(game.i18n.localize('WOR.Loot.NoTokensSelected'));
      return;
    }

    // Build dialog content
    const tokenData = selectedTokens.map(t => ({
      id: t.id,
      name: t.name,
      img: t.document.texture.src,
      actorId: t.actor.id,
      itemCount: t.actor.items.filter(i => ['weapon', 'armor', 'gear'].includes(i.type)).length
    }));

    const content = await foundry.applications.handlebars.renderTemplate(
      'systems/weight-of-ruin/templates/actor/loot/loot-tokens-dialog.hbs',
      { tokens: tokenData }
    );

    const result = await foundry.applications.api.DialogV2.wait({
      window: { title: game.i18n.localize('WOR.Loot.LootTokens') },
      classes: ['weight-of-ruin', 'loot-tokens-dialog'],
      content,
      buttons: [
        {
          action: 'loot',
          label: game.i18n.localize('WOR.Loot.LootTokens'),
          icon: 'fas fa-hand-holding',
          default: true,
          callback: (event, button, dialog) => {
            const form = dialog.element.querySelector('form');
            const selected = Array.from(form.querySelectorAll('input[name="token"]:checked'))
              .map(input => input.value);
            return selected;
          }
        },
        {
          action: 'cancel',
          label: game.i18n.localize('WOR.Common.Cancel')
        }
      ]
    });

    if (result === 'cancel' || !result || result.length === 0) {
      return;
    }

    // Perform the looting
    await this._lootFromTokens(result);
  }

  /**
   * Loot items from selected tokens.
   * @param {string[]} tokenIds
   */
  async _lootFromTokens(tokenIds) {
    let totalItems = 0;

    for (const tokenId of tokenIds) {
      const token = canvas.tokens.get(tokenId);
      if (!token?.actor) continue;

      const sourceActor = token.actor;
      const itemsToLoot = sourceActor.items.filter(i =>
        ['weapon', 'armor', 'gear'].includes(i.type)
      );

      for (const item of itemsToLoot) {
        const itemData = item.toObject();
        delete itemData._id;

        // Unequip
        if (itemData.system.equipped) {
          itemData.system.equipped = false;
        }

        await Item.create(itemData, { parent: this.document });
        await item.delete();
        totalItems++;
      }
    }

    if (totalItems > 0) {
      ui.notifications.info(game.i18n.format('WOR.Loot.LootComplete', { count: totalItems }));
    }
  }

  /**
   * Handle purchasing an item (merchant mode).
   */
  static async #onPurchaseItem(event, target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    const item = this.document.items.get(itemId);
    if (!item) return;

    // Determine the buyer
    const buyer = game.user.character;
    if (!buyer) {
      ui.notifications.warn(game.i18n.localize('WOR.Loot.NoBuyerSelected'));
      return;
    }

    // Calculate price
    const basePrice = item.system.value || 0;
    const modifiedPrice = this.document.system.getModifiedPrice(basePrice);

    // Check if buyer can afford it
    const buyerWealth = buyer.system.totalWealthInOrin;
    if (buyerWealth < modifiedPrice) {
      ui.notifications.warn(game.i18n.localize('WOR.Loot.CannotAfford'));
      return;
    }

    // Confirm purchase
    const confirmed = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize('WOR.Loot.ConfirmPurchase') },
      content: `<p>${game.i18n.format('WOR.Loot.PurchaseConfirm', {
        item: item.name,
        price: modifiedPrice,
        buyer: buyer.name
      })}</p>`,
      yes: { label: game.i18n.localize('WOR.Loot.Purchase'), icon: 'fas fa-coins' },
      no: { label: game.i18n.localize('WOR.Common.Cancel') }
    });

    if (!confirmed) return;

    // If user has owner permission, do it directly; otherwise use socket
    if (this.document.isOwner) {
      // Deduct from buyer's wealth
      await this._deductWealth(buyer, modifiedPrice);

      // Add to merchant's wealth
      await this._addWealth(this.document, modifiedPrice);

      // Transfer item
      const itemData = item.toObject();
      delete itemData._id;
      itemData.system.equipped = false;

      if (item.system.quantity > 1) {
        await item.update({ 'system.quantity': item.system.quantity - 1 });
        itemData.system.quantity = 1;
      } else {
        await item.delete();
      }

      await Item.create(itemData, { parent: buyer });

      ui.notifications.info(game.i18n.format('WOR.Loot.PurchaseComplete', {
        item: item.name,
        buyer: buyer.name
      }));
    } else {
      // Request purchase via query (GM will handle it)
      const activeGM = game.users.activeGM;
      if (!activeGM) {
        ui.notifications.warn(game.i18n.localize('WOR.Loot.NoGMOnline'));
        return;
      }

      const queryData = {
        lootActorId: this.document.id,
        itemId: itemId,
        targetActorId: buyer.id,
        price: modifiedPrice
      };

      try {
        const result = await activeGM.query('weight-of-ruin.purchaseItem', queryData);

        if (result.success) {
          ui.notifications.info(game.i18n.format('WOR.Loot.PurchaseComplete', {
            item: result.itemName,
            buyer: result.targetName
          }));
        } else if (result.error === 'cannot_afford') {
          ui.notifications.warn(game.i18n.localize('WOR.Loot.CannotAfford'));
        } else {
          ui.notifications.warn(game.i18n.localize('WOR.Loot.PurchaseFailed'));
        }
      } catch (error) {
        console.error('The Weight of Ruin | Purchase query error:', error);
        ui.notifications.error(game.i18n.localize('WOR.Loot.PurchaseFailed'));
      }
    }
  }

  /**
   * Handle taking an item (loot mode - for players).
   */
  static async #onTakeItem(event, target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    const item = this.document.items.get(itemId);
    if (!item) return;

    // Determine the taker
    const taker = game.user.character;
    if (!taker) {
      ui.notifications.warn(game.i18n.localize('WOR.Loot.NoCharacterSelected'));
      return;
    }

    // If user has owner permission, do it directly; otherwise use query
    if (this.document.isOwner) {
      // Direct transfer
      const itemName = item.name;
      const takerName = taker.name;
      const lootName = this.document.name;

      const itemData = item.toObject();
      delete itemData._id;
      itemData.system.equipped = false;

      if (item.system.quantity > 1) {
        await item.update({ 'system.quantity': item.system.quantity - 1 });
        itemData.system.quantity = 1;
      } else {
        await item.delete();
      }

      await Item.create(itemData, { parent: taker });

      // Post chat message
      const chatContent = `
        <div class="wor loot-take">
          <p><strong>${takerName}</strong> grabbed <strong>${itemName}</strong> from <strong>${lootName}</strong>.</p>
        </div>
      `;
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: taker }),
        content: chatContent
      });
    } else {
      // Request transfer via query (GM will handle it)
      // Check if any GM is online
      const activeGM = game.users.activeGM;
      if (!activeGM) {
        ui.notifications.warn(game.i18n.localize('WOR.Loot.NoGMOnline'));
        return;
      }

      const queryData = {
        lootActorId: this.document.id,
        itemId: itemId,
        targetActorId: taker.id
      };
      console.log('The Weight of Ruin | Sending takeItem query to GM:', activeGM.name);
      console.log('The Weight of Ruin | Query data:', JSON.stringify(queryData));

      try {
        const result = await activeGM.query('weight-of-ruin.takeItem', queryData);
        console.log('The Weight of Ruin | Query result:', result);

        if (!result.success) {
          ui.notifications.warn(game.i18n.localize('WOR.Loot.TransferFailed'));
        }
        // Success case: chat message is posted by GM's handler
      } catch (error) {
        console.error('The Weight of Ruin | Query error:', error);
        ui.notifications.error(game.i18n.localize('WOR.Loot.TransferFailed'));
      }
    }
  }

  /**
   * Deduct wealth from an actor.
   * @param {Actor} actor
   * @param {number} amount - Amount in Orin
   */
  async _deductWealth(actor, amount) {
    let remaining = amount;
    let { sovereigns, crowns, orin } = actor.system.wealth;

    // Deduct from Orin first
    if (orin >= remaining) {
      orin -= remaining;
      remaining = 0;
    } else {
      remaining -= orin;
      orin = 0;
    }

    // Then from Crowns (1 Crown = 10 Orin)
    if (remaining > 0) {
      const crownsNeeded = Math.ceil(remaining / 10);
      if (crowns >= crownsNeeded) {
        crowns -= crownsNeeded;
        const change = (crownsNeeded * 10) - remaining;
        orin += change;
        remaining = 0;
      } else {
        remaining -= crowns * 10;
        crowns = 0;
      }
    }

    // Finally from Sovereigns (1 Sovereign = 100 Orin)
    if (remaining > 0) {
      const sovereignsNeeded = Math.ceil(remaining / 100);
      sovereigns -= sovereignsNeeded;
      const change = (sovereignsNeeded * 100) - remaining;
      // Convert change back to smaller denominations
      crowns += Math.floor(change / 10);
      orin += change % 10;
    }

    await actor.update({
      'system.wealth': { sovereigns, crowns, orin }
    });
  }

  /**
   * Add wealth to an actor.
   * @param {Actor} actor
   * @param {number} amount - Amount in Orin
   */
  async _addWealth(actor, amount) {
    // Convert to proper denominations
    const sovereigns = Math.floor(amount / 100);
    const crowns = Math.floor((amount % 100) / 10);
    const orin = amount % 10;

    await actor.update({
      'system.wealth.sovereigns': actor.system.wealth.sovereigns + sovereigns,
      'system.wealth.crowns': actor.system.wealth.crowns + crowns,
      'system.wealth.orin': actor.system.wealth.orin + orin
    });
  }

  /**
   * Edit portrait image.
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

  /* -------------------------------------------- */
  /*  Header Control Handlers                     */
  /* -------------------------------------------- */

  /**
   * Configure prototype token.
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
      ui.notifications.warn(game.i18n.localize('WOR.HeaderControls.NoCharacterArt'));
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
      ui.notifications.warn(game.i18n.localize('WOR.HeaderControls.NoTokenArt'));
      return;
    }

    // Create an image popout (v13 API)
    new foundry.applications.apps.ImagePopout({
      src: tokenImg,
      window: { title: `${actor.name} - ${game.i18n.localize('WOR.HeaderControls.Token')}` },
      uuid: actor.uuid
    }).render(true);
  }

  /**
   * Configure actor settings (ownership).
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static async #onConfigureActorSettings(event, target) {
    const actor = this.document;
    if (!actor.isOwner) return;

    // Open the document ownership configuration (v13 API)
    new foundry.applications.apps.DocumentOwnershipConfig({ document: actor }).render(true);
  }
}
