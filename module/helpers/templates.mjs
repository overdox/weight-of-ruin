/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return foundry.applications.handlebars.loadTemplates([
    // Actor partials (ApplicationV2)
    'systems/weight-of-ruin/templates/actor/parts/header.hbs',
    'systems/weight-of-ruin/templates/actor/parts/main.hbs',
    'systems/weight-of-ruin/templates/actor/parts/attributes.hbs',
    'systems/weight-of-ruin/templates/actor/parts/skills.hbs',
    'systems/weight-of-ruin/templates/actor/parts/talents.hbs',
    'systems/weight-of-ruin/templates/actor/parts/combat.hbs',
    'systems/weight-of-ruin/templates/actor/parts/inventory.hbs',
    'systems/weight-of-ruin/templates/actor/parts/magic.hbs',
    'systems/weight-of-ruin/templates/actor/parts/legacy.hbs',
    // NPC sheet templates
    'systems/weight-of-ruin/templates/actor/npc/npc-header.hbs',
    'systems/weight-of-ruin/templates/actor/npc/npc-body.hbs',
    // Loot sheet templates
    'systems/weight-of-ruin/templates/actor/loot/loot-sheet.hbs',
    'systems/weight-of-ruin/templates/actor/loot/split-coins-dialog.hbs',
    'systems/weight-of-ruin/templates/actor/loot/loot-tokens-dialog.hbs',
    // Item partials (ApplicationV2)
    'systems/weight-of-ruin/templates/item/parts/header.hbs',
    'systems/weight-of-ruin/templates/item/parts/details.hbs',
    // Chat templates
    'systems/weight-of-ruin/templates/chat/roll-card.hbs',
    'systems/weight-of-ruin/templates/chat/resilience-roll.hbs',
    'systems/weight-of-ruin/templates/chat/attack-card.hbs',
    'systems/weight-of-ruin/templates/chat/spell-cast.hbs',
    'systems/weight-of-ruin/templates/chat/ritual-perform.hbs',
    'systems/weight-of-ruin/templates/chat/zeal-notification.hbs',
    'systems/weight-of-ruin/templates/chat/essence-notification.hbs',
    'systems/weight-of-ruin/templates/chat/generic-notification.hbs',
    'systems/weight-of-ruin/templates/chat/creation-roll.hbs',
    'systems/weight-of-ruin/templates/chat/creation-background-roll.hbs',
    'systems/weight-of-ruin/templates/chat/defense-card.hbs',
    'systems/weight-of-ruin/templates/chat/initiative-card.hbs',
    // Chat partials
    'systems/weight-of-ruin/templates/chat/partials/card-header.hbs',
    'systems/weight-of-ruin/templates/chat/partials/collapsible-details.hbs',
    'systems/weight-of-ruin/templates/chat/partials/card-buttons.hbs',
    // App templates
    'systems/weight-of-ruin/templates/apps/roll-dialog.hbs',
    'systems/weight-of-ruin/templates/apps/attack-dialog.hbs',
    'systems/weight-of-ruin/templates/apps/defense-dialog.hbs',
    'systems/weight-of-ruin/templates/apps/defense-header.hbs',
    'systems/weight-of-ruin/templates/apps/condition-reference.hbs',
    // Character Creation Wizard templates
    'systems/weight-of-ruin/templates/apps/creation/creation-header.hbs',
    'systems/weight-of-ruin/templates/apps/creation/creation-content.hbs',
    'systems/weight-of-ruin/templates/apps/creation/creation-footer.hbs',
    // NPC Creation Wizard templates
    'systems/weight-of-ruin/templates/apps/npc-creation/npc-creation-header.hbs',
    'systems/weight-of-ruin/templates/apps/npc-creation/npc-creation-content.hbs',
    'systems/weight-of-ruin/templates/apps/npc-creation/npc-creation-footer.hbs',
    // Advancement Wizard
    'systems/weight-of-ruin/templates/apps/advancement-wizard.hbs',
  ]);
};
