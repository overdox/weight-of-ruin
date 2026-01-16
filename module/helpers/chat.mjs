/**
 * Chat Card Helper Functions
 * Handles chat card interactivity including collapsible sections and action buttons
 */

/* -------------------------------------------- */
/*  Chat Card Event Handling                    */
/* -------------------------------------------- */

/**
 * Initialize chat card event listeners
 * Called from the renderChatMessage hook
 * @param {ChatMessage} message - The chat message being rendered
 * @param {HTMLElement} html - The rendered HTML element
 */
export function initializeChatCardListeners(message, html) {
  // Handle collapsible sections
  html.querySelectorAll('[data-action="toggle-collapse"]').forEach(el => {
    el.addEventListener('click', _onToggleCollapse);
  });

  // Handle apply damage button
  html.querySelectorAll('[data-action="apply-damage"]').forEach(el => {
    el.addEventListener('click', _onApplyDamage);
  });

  // Handle add injury button
  html.querySelectorAll('[data-action="add-injury"]').forEach(el => {
    el.addEventListener('click', _onAddInjury);
  });

  // Handle apply spell damage button
  html.querySelectorAll('[data-action="apply-spell-damage"]').forEach(el => {
    el.addEventListener('click', _onApplySpellDamage);
  });
}

/* -------------------------------------------- */
/*  Event Handlers                              */
/* -------------------------------------------- */

/**
 * Toggle collapsible section visibility
 * @param {Event} event - The click event
 */
function _onToggleCollapse(event) {
  event.preventDefault();
  event.stopPropagation();

  const header = event.currentTarget;
  const section = header.closest('.collapsible-section');
  if (!section) return;

  const content = section.querySelector('.collapsible-content');
  if (!content) return;

  // Toggle collapsed state on both header and content
  header.classList.toggle('collapsed');
  content.classList.toggle('collapsed');
}

/**
 * Apply damage to targeted actor
 * @param {Event} event - The click event
 */
async function _onApplyDamage(event) {
  event.preventDefault();
  const button = event.currentTarget;
  const targetId = button.dataset.targetId;
  const damage = parseInt(button.dataset.damage) || 0;

  // Get the target actor
  const actor = game.actors.get(targetId);
  if (!actor) {
    ui.notifications.warn(game.i18n.localize('AOA.Combat.TargetNotFound'));
    return;
  }

  // Check permissions
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.localize('AOA.Combat.NoPermission'));
    return;
  }

  // Apply trauma to the target
  const currentTrauma = actor.system.health?.trauma ?? 0;
  const newTrauma = currentTrauma + damage;

  await actor.update({
    'system.health.trauma': newTrauma
  });

  // Disable the button after use
  button.disabled = true;
  button.innerHTML = `<i class="fas fa-check"></i> ${game.i18n.localize('AOA.Combat.DamageApplied')}`;

  // Notify
  ui.notifications.info(
    game.i18n.format('AOA.Combat.DamageAppliedTo', {
      damage: damage,
      name: actor.name
    })
  );
}

/**
 * Add a critical injury to an actor
 * @param {Event} event - The click event
 */
async function _onAddInjury(event) {
  event.preventDefault();
  const button = event.currentTarget;
  const actorId = button.dataset.actorId;

  // Get the actor
  const actor = game.actors.get(actorId);
  if (!actor) {
    ui.notifications.warn(game.i18n.localize('AOA.Health.ActorNotFound'));
    return;
  }

  // Check permissions
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.localize('AOA.Combat.NoPermission'));
    return;
  }

  // Add a critical injury
  const injuries = actor.system.health?.criticalInjuries ?? [];
  const newInjury = {
    id: foundry.utils.randomID(),
    description: '',
    timestamp: Date.now()
  };

  await actor.update({
    'system.health.criticalInjuries': [...injuries, newInjury]
  });

  // Disable the button after use
  button.disabled = true;
  button.innerHTML = `<i class="fas fa-check"></i> ${game.i18n.localize('AOA.Health.InjuryAdded')}`;

  // Notify
  ui.notifications.info(
    game.i18n.format('AOA.Health.InjuryAddedTo', {
      name: actor.name
    })
  );
}

/**
 * Apply spell damage to selected tokens
 * @param {Event} event - The click event
 */
async function _onApplySpellDamage(event) {
  event.preventDefault();
  const button = event.currentTarget;
  const damage = parseInt(button.dataset.damage) || 0;

  // Get selected tokens
  const targets = game.user.targets;
  if (targets.size === 0) {
    ui.notifications.warn(game.i18n.localize('AOA.Spell.NoTargetsSelected'));
    return;
  }

  // Apply damage to each target
  for (const token of targets) {
    const actor = token.actor;
    if (!actor || !actor.isOwner) continue;

    const currentTrauma = actor.system.health?.trauma ?? 0;
    const newTrauma = currentTrauma + damage;

    await actor.update({
      'system.health.trauma': newTrauma
    });
  }

  // Disable the button after use
  button.disabled = true;
  button.innerHTML = `<i class="fas fa-check"></i> ${game.i18n.localize('AOA.Spell.EffectApplied')}`;

  // Notify
  ui.notifications.info(
    game.i18n.format('AOA.Spell.DamageAppliedToTargets', {
      damage: damage,
      count: targets.size
    })
  );
}

/* -------------------------------------------- */
/*  Chat Card Creation Functions                */
/* -------------------------------------------- */

/**
 * Create and send a Zeal notification chat card
 * @param {Actor} actor - The actor spending or gaining Zeal
 * @param {object} options - Options for the notification
 * @param {number} options.spent - Amount of Zeal spent
 * @param {number} options.gained - Amount of Zeal gained
 * @param {number} options.remaining - Remaining Zeal
 * @param {number} options.max - Maximum Zeal
 * @param {object} options.effect - Effect details
 */
export async function createZealNotification(actor, options = {}) {
  const templateData = {
    actor: {
      id: actor.id,
      name: actor.name,
      img: actor.img
    },
    spent: options.spent,
    gained: options.gained,
    remaining: options.remaining ?? actor.system.zeal?.current ?? 0,
    max: options.max ?? actor.system.zeal?.max ?? 5,
    effect: options.effect
  };

  const content = await renderTemplate(
    'systems/weight-of-ruin/templates/chat/zeal-notification.hbs',
    templateData
  );

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    type: CONST.CHAT_MESSAGE_STYLES.OTHER
  });
}

/**
 * Create and send an Essence loss notification chat card
 * @param {Actor} actor - The actor losing Essence
 * @param {object} options - Options for the notification
 * @param {number} options.lost - Amount of Essence lost
 * @param {number} options.gained - Amount of Essence gained
 * @param {number} options.current - Current Essence after change
 * @param {number} options.max - Maximum Essence
 * @param {string} options.reason - Reason for the change
 * @param {boolean} options.showCorruptionPrompt - Whether to show corruption sign prompt
 */
export async function createEssenceNotification(actor, options = {}) {
  const current = options.current ?? actor.system.essence?.current ?? 10;
  const max = options.max ?? actor.system.essence?.max ?? 10;

  const templateData = {
    actor: {
      id: actor.id,
      name: actor.name,
      img: actor.img
    },
    lost: options.lost,
    gained: options.gained,
    current,
    max,
    reason: options.reason,
    showCorruptionPrompt: options.showCorruptionPrompt,
    isWarning: current <= 2 && current > 0,
    isCritical: current <= 1 && current > 0,
    isLeng: current === 0
  };

  const content = await renderTemplate(
    'systems/weight-of-ruin/templates/chat/essence-notification.hbs',
    templateData
  );

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    type: CONST.CHAT_MESSAGE_STYLES.OTHER
  });
}

/**
 * Create and send a generic notification chat card
 * @param {object} options - Options for the notification
 * @param {Actor} options.actor - The actor (optional)
 * @param {string} options.title - Notification title
 * @param {string} options.content - Notification content (HTML)
 * @param {string} options.type - Notification type (condition-gained, condition-removed, resource-change, item-used)
 * @param {string} options.icon - Font Awesome icon class
 * @param {string} options.iconClass - Icon container class (info, success, warning, danger)
 * @param {object} options.item - Item data (optional)
 * @param {object} options.condition - Condition data (optional)
 * @param {object} options.resource - Resource change data (optional)
 */
export async function createGenericNotification(options = {}) {
  const templateData = {
    actor: options.actor ? {
      id: options.actor.id,
      name: options.actor.name,
      img: options.actor.img
    } : null,
    title: options.title,
    content: options.content,
    type: options.type,
    icon: options.icon ?? 'fas fa-info-circle',
    iconClass: options.iconClass ?? 'info',
    item: options.item,
    condition: options.condition,
    resource: options.resource
  };

  const content = await renderTemplate(
    'systems/weight-of-ruin/templates/chat/generic-notification.hbs',
    templateData
  );

  return ChatMessage.create({
    speaker: options.actor ? ChatMessage.getSpeaker({ actor: options.actor }) : null,
    content,
    type: CONST.CHAT_MESSAGE_STYLES.OTHER
  });
}

/* -------------------------------------------- */
/*  Registration                                */
/* -------------------------------------------- */

/**
 * Register chat card functions on the game.wor.chat namespace
 */
export function registerChatFunctions() {
  game.wor.chat = {
    createZealNotification,
    createEssenceNotification,
    createGenericNotification
  };
}
