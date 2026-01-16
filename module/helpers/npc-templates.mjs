/**
 * The Weight of Ruin - NPC Template System
 * Generates tier-scaled attribute and skill distributions for NPC creation
 *
 * Templates are defined as weighted ratios that get scaled to match
 * the tier's attribute/skill budget while respecting max limits.
 */

import { NPC_TIERS, getTierData } from './npc-config.mjs';

// ========================================
// ATTRIBUTE TEMPLATE DEFINITIONS
// ========================================

/**
 * Attribute template archetypes by Class
 * Each template defines relative weights for attributes (higher = more points allocated)
 * Weights are normalized and scaled to tier budget during generation
 */
export const ATTRIBUTE_ARCHETYPES = {
  humanoid: {
    balanced: {
      label: 'AOA.NPCCreation.Template.Balanced',
      description: 'AOA.NPCCreation.TemplateDesc.Balanced',
      weights: { str: 1, for: 1, agi: 1, awa: 1, res: 1, per: 1, ing: 1, exp: 1 }
    },
    brute: {
      label: 'AOA.NPCCreation.Template.Brute',
      description: 'AOA.NPCCreation.TemplateDesc.Brute',
      weights: { str: 3, for: 3, agi: 1, awa: 1, res: 1, per: 0.5, ing: 0.5, exp: 0 }
    },
    agile: {
      label: 'AOA.NPCCreation.Template.Agile',
      description: 'AOA.NPCCreation.TemplateDesc.Agile',
      weights: { str: 0.5, for: 1, agi: 3, awa: 3, res: 1, per: 0.5, ing: 0.5, exp: 0.5 }
    },
    cunning: {
      label: 'AOA.NPCCreation.Template.Cunning',
      description: 'AOA.NPCCreation.TemplateDesc.Cunning',
      weights: { str: 0.5, for: 0.5, agi: 1.5, awa: 2, res: 1, per: 2, ing: 2, exp: 0.5 }
    },
    leader: {
      label: 'AOA.NPCCreation.Template.Leader',
      description: 'AOA.NPCCreation.TemplateDesc.Leader',
      weights: { str: 1, for: 1, agi: 1, awa: 1.5, res: 2, per: 2, ing: 1, exp: 0.5 }
    },
    caster: {
      label: 'AOA.NPCCreation.Template.Caster',
      description: 'AOA.NPCCreation.TemplateDesc.Caster',
      weights: { str: 0, for: 0.5, agi: 1, awa: 2, res: 2, per: 1, ing: 2.5, exp: 1 }
    }
  },
  beast: {
    predator: {
      label: 'AOA.NPCCreation.Template.Predator',
      description: 'AOA.NPCCreation.TemplateDesc.Predator',
      weights: { str: 3, for: 2, agi: 2, awa: 3, res: 0.5, per: 0, ing: 0, exp: 0.5 }
    },
    prey: {
      label: 'AOA.NPCCreation.Template.Prey',
      description: 'AOA.NPCCreation.TemplateDesc.Prey',
      weights: { str: 0.5, for: 2, agi: 3, awa: 3, res: 1, per: 0.5, ing: 0, exp: 0 }
    },
    tank: {
      label: 'AOA.NPCCreation.Template.Tank',
      description: 'AOA.NPCCreation.TemplateDesc.Tank',
      weights: { str: 3, for: 4, agi: 0.5, awa: 1.5, res: 1.5, per: 0, ing: 0, exp: 0.5 }
    },
    ambusher: {
      label: 'AOA.NPCCreation.Template.Ambusher',
      description: 'AOA.NPCCreation.TemplateDesc.Ambusher',
      weights: { str: 2, for: 1, agi: 3, awa: 3, res: 0.5, per: 0, ing: 0.5, exp: 0 }
    }
  },
  vermin: {
    swarm: {
      label: 'AOA.NPCCreation.Template.Swarm',
      description: 'AOA.NPCCreation.TemplateDesc.Swarm',
      weights: { str: 0, for: 1, agi: 3, awa: 2, res: 0.5, per: 0, ing: 0, exp: 0 }
    },
    ambusher: {
      label: 'AOA.NPCCreation.Template.Ambusher',
      description: 'AOA.NPCCreation.TemplateDesc.Ambusher',
      weights: { str: 1.5, for: 1, agi: 3, awa: 3, res: 0.5, per: 0, ing: 0, exp: 0 }
    },
    venomous: {
      label: 'AOA.NPCCreation.Template.Venomous',
      description: 'AOA.NPCCreation.TemplateDesc.Venomous',
      weights: { str: 0.5, for: 1.5, agi: 2, awa: 2, res: 1, per: 0, ing: 1, exp: 0 }
    },
    burrower: {
      label: 'AOA.NPCCreation.Template.Burrower',
      description: 'AOA.NPCCreation.TemplateDesc.Burrower',
      weights: { str: 2, for: 2, agi: 1.5, awa: 2, res: 0.5, per: 0, ing: 0, exp: 0 }
    }
  },
  afflicted: {
    undead: {
      label: 'AOA.NPCCreation.Template.Undead',
      description: 'AOA.NPCCreation.TemplateDesc.Undead',
      weights: { str: 2, for: 3, agi: 0.5, awa: 1.5, res: 2, per: 0.5, ing: 0.5, exp: 0.5 }
    },
    cursed: {
      label: 'AOA.NPCCreation.Template.Cursed',
      description: 'AOA.NPCCreation.TemplateDesc.Cursed',
      weights: { str: 2, for: 2, agi: 2, awa: 2, res: 1.5, per: 0.5, ing: 0.5, exp: 0 }
    },
    vampiric: {
      label: 'AOA.NPCCreation.Template.Vampiric',
      description: 'AOA.NPCCreation.TemplateDesc.Vampiric',
      weights: { str: 2, for: 1.5, agi: 2, awa: 2, res: 1.5, per: 2, ing: 1.5, exp: 0 }
    },
    feral: {
      label: 'AOA.NPCCreation.Template.Feral',
      description: 'AOA.NPCCreation.TemplateDesc.Feral',
      weights: { str: 3, for: 2, agi: 2.5, awa: 2.5, res: 1, per: 0, ing: 0, exp: 0 }
    }
  },
  apparition: {
    ethereal: {
      label: 'AOA.NPCCreation.Template.Ethereal',
      description: 'AOA.NPCCreation.TemplateDesc.Ethereal',
      weights: { str: 0, for: 0, agi: 2, awa: 3, res: 3, per: 1.5, ing: 1.5, exp: 0.5 }
    },
    vengeful: {
      label: 'AOA.NPCCreation.Template.Vengeful',
      description: 'AOA.NPCCreation.TemplateDesc.Vengeful',
      weights: { str: 1.5, for: 0.5, agi: 2, awa: 3, res: 2, per: 1.5, ing: 0.5, exp: 0 }
    },
    possessor: {
      label: 'AOA.NPCCreation.Template.Possessor',
      description: 'AOA.NPCCreation.TemplateDesc.Possessor',
      weights: { str: 0, for: 0, agi: 1.5, awa: 2.5, res: 2.5, per: 2, ing: 2.5, exp: 0 }
    }
  },
  fiend: {
    demonic: {
      label: 'AOA.NPCCreation.Template.Demonic',
      description: 'AOA.NPCCreation.TemplateDesc.Demonic',
      weights: { str: 3, for: 3, agi: 1.5, awa: 2, res: 2, per: 1, ing: 1.5, exp: 0 }
    },
    tempter: {
      label: 'AOA.NPCCreation.Template.Tempter',
      description: 'AOA.NPCCreation.TemplateDesc.Tempter',
      weights: { str: 0.5, for: 1, agi: 2, awa: 2.5, res: 2, per: 3.5, ing: 2, exp: 0.5 }
    },
    minion: {
      label: 'AOA.NPCCreation.Template.Minion',
      description: 'AOA.NPCCreation.TemplateDesc.Minion',
      weights: { str: 0.5, for: 1, agi: 3, awa: 2, res: 1, per: 0.5, ing: 1.5, exp: 0.5 }
    },
    corruptor: {
      label: 'AOA.NPCCreation.Template.Corruptor',
      description: 'AOA.NPCCreation.TemplateDesc.Corruptor',
      weights: { str: 1, for: 1, agi: 1.5, awa: 2, res: 2.5, per: 2, ing: 2.5, exp: 0.5 }
    }
  }
};

// ========================================
// SKILL TEMPLATE DEFINITIONS
// ========================================

/**
 * Skill template archetypes by Class
 * Each template defines which skills to prioritize and their relative importance
 */
export const SKILL_ARCHETYPES = {
  humanoid: {
    warrior: {
      label: 'AOA.NPCCreation.SkillTemplate.Warrior',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Warrior',
      skills: [
        { skill: 'Arms', priority: 3 },
        { skill: 'Athletics', priority: 2 },
        { skill: 'Awareness', priority: 2 },
        { skill: 'Intimidation', priority: 1 }
      ]
    },
    assassin: {
      label: 'AOA.NPCCreation.SkillTemplate.Assassin',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Assassin',
      skills: [
        { skill: 'Arms', priority: 2 },
        { skill: 'Stealth', priority: 3 },
        { skill: 'Awareness', priority: 2 },
        { skill: 'Lethality', priority: 1 }
      ]
    },
    guard: {
      label: 'AOA.NPCCreation.SkillTemplate.Guard',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Guard',
      skills: [
        { skill: 'Arms', priority: 2 },
        { skill: 'Awareness', priority: 3 },
        { skill: 'Athletics', priority: 1 },
        { skill: 'Intimidation', priority: 2 }
      ]
    },
    mage: {
      label: 'AOA.NPCCreation.SkillTemplate.Mage',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Mage',
      skills: [
        { skill: 'Spellcraft', priority: 3 },
        { skill: 'Awareness', priority: 2 },
        { skill: 'Occult', priority: 2 },
        { skill: 'Resolve', priority: 1 }
      ]
    },
    scout: {
      label: 'AOA.NPCCreation.SkillTemplate.Scout',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Scout',
      skills: [
        { skill: 'Awareness', priority: 3 },
        { skill: 'Stealth', priority: 2 },
        { skill: 'Athletics', priority: 2 },
        { skill: 'Survival', priority: 1 }
      ]
    },
    diplomat: {
      label: 'AOA.NPCCreation.SkillTemplate.Diplomat',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Diplomat',
      skills: [
        { skill: 'Persuasion', priority: 3 },
        { skill: 'Insight', priority: 2 },
        { skill: 'Deception', priority: 2 },
        { skill: 'Awareness', priority: 1 }
      ]
    }
  },
  beast: {
    hunter: {
      label: 'AOA.NPCCreation.SkillTemplate.Hunter',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Hunter',
      skills: [
        { skill: 'Brawling', priority: 3 },
        { skill: 'Athletics', priority: 2 },
        { skill: 'Awareness', priority: 3 }
      ]
    },
    stalker: {
      label: 'AOA.NPCCreation.SkillTemplate.Stalker',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Stalker',
      skills: [
        { skill: 'Stealth', priority: 3 },
        { skill: 'Awareness', priority: 3 },
        { skill: 'Brawling', priority: 2 }
      ]
    },
    charger: {
      label: 'AOA.NPCCreation.SkillTemplate.Charger',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Charger',
      skills: [
        { skill: 'Brawling', priority: 3 },
        { skill: 'Athletics', priority: 3 },
        { skill: 'Intimidation', priority: 2 }
      ]
    }
  },
  vermin: {
    swarmer: {
      label: 'AOA.NPCCreation.SkillTemplate.Swarmer',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Swarmer',
      skills: [
        { skill: 'Brawling', priority: 2 },
        { skill: 'Stealth', priority: 3 },
        { skill: 'Athletics', priority: 2 }
      ]
    },
    ambusher: {
      label: 'AOA.NPCCreation.SkillTemplate.Ambusher',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Ambusher',
      skills: [
        { skill: 'Stealth', priority: 3 },
        { skill: 'Brawling', priority: 2 },
        { skill: 'Awareness', priority: 3 }
      ]
    },
    parasite: {
      label: 'AOA.NPCCreation.SkillTemplate.Parasite',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Parasite',
      skills: [
        { skill: 'Stealth', priority: 3 },
        { skill: 'Brawling', priority: 2 },
        { skill: 'Athletics', priority: 2 }
      ]
    }
  },
  afflicted: {
    relentless: {
      label: 'AOA.NPCCreation.SkillTemplate.Relentless',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Relentless',
      skills: [
        { skill: 'Brawling', priority: 3 },
        { skill: 'Athletics', priority: 2 },
        { skill: 'Intimidation', priority: 2 },
        { skill: 'Awareness', priority: 1 }
      ]
    },
    predator: {
      label: 'AOA.NPCCreation.SkillTemplate.Predator',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Predator',
      skills: [
        { skill: 'Stealth', priority: 2 },
        { skill: 'Brawling', priority: 3 },
        { skill: 'Awareness', priority: 2 },
        { skill: 'Intimidation', priority: 1 }
      ]
    },
    mastermind: {
      label: 'AOA.NPCCreation.SkillTemplate.Mastermind',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Mastermind',
      skills: [
        { skill: 'Deception', priority: 3 },
        { skill: 'Persuasion', priority: 2 },
        { skill: 'Awareness', priority: 2 },
        { skill: 'Occult', priority: 1 }
      ]
    }
  },
  apparition: {
    haunter: {
      label: 'AOA.NPCCreation.SkillTemplate.Haunter',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Haunter',
      skills: [
        { skill: 'Stealth', priority: 3 },
        { skill: 'Intimidation', priority: 3 },
        { skill: 'Awareness', priority: 2 }
      ]
    },
    possessor: {
      label: 'AOA.NPCCreation.SkillTemplate.Possessor',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Possessor',
      skills: [
        { skill: 'Spellcraft', priority: 3 },
        { skill: 'Awareness', priority: 2 },
        { skill: 'Deception', priority: 2 },
        { skill: 'Resolve', priority: 1 }
      ]
    },
    wailing: {
      label: 'AOA.NPCCreation.SkillTemplate.Wailing',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Wailing',
      skills: [
        { skill: 'Intimidation', priority: 3 },
        { skill: 'Awareness', priority: 2 },
        { skill: 'Stealth', priority: 2 }
      ]
    }
  },
  fiend: {
    destroyer: {
      label: 'AOA.NPCCreation.SkillTemplate.Destroyer',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Destroyer',
      skills: [
        { skill: 'Brawling', priority: 3 },
        { skill: 'Athletics', priority: 2 },
        { skill: 'Intimidation', priority: 2 },
        { skill: 'Awareness', priority: 1 }
      ]
    },
    corrupter: {
      label: 'AOA.NPCCreation.SkillTemplate.Corrupter',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Corrupter',
      skills: [
        { skill: 'Deception', priority: 3 },
        { skill: 'Persuasion', priority: 2 },
        { skill: 'Awareness', priority: 2 },
        { skill: 'Spellcraft', priority: 1 }
      ]
    },
    trickster: {
      label: 'AOA.NPCCreation.SkillTemplate.Trickster',
      description: 'AOA.NPCCreation.SkillTemplateDesc.Trickster',
      skills: [
        { skill: 'Deception', priority: 3 },
        { skill: 'Stealth', priority: 2 },
        { skill: 'Awareness', priority: 2 },
        { skill: 'Athletics', priority: 1 }
      ]
    }
  }
};

// ========================================
// TEMPLATE GENERATION FUNCTIONS
// ========================================

/**
 * Generate attribute values from a template archetype for a specific tier
 * @param {string} npcClass - The NPC class (humanoid, beast, etc.)
 * @param {string} templateKey - The template key (balanced, brute, etc.)
 * @param {number} tier - The NPC tier (0-6)
 * @returns {Object} Generated attribute values { strength: X, fortitude: Y, ... }
 */
export function generateAttributeTemplate(npcClass, templateKey, tier) {
  const archetype = ATTRIBUTE_ARCHETYPES[npcClass]?.[templateKey];
  if (!archetype) {
    console.warn(`Unknown attribute archetype: ${npcClass}/${templateKey}`);
    return generateDefaultAttributes(tier);
  }

  const tierData = getTierData(tier);
  const budget = tierData.suggestedAttributes.total;
  const maxPerAttr = tierData.suggestedAttributes.max;

  // Calculate total weight
  const weights = archetype.weights;
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);

  if (totalWeight === 0) {
    return generateDefaultAttributes(tier);
  }

  // Map short keys to full attribute names
  const keyMap = {
    str: 'strength',
    for: 'fortitude',
    agi: 'agility',
    awa: 'awareness',
    res: 'resolve',
    per: 'persona',
    ing: 'ingenuity',
    exp: 'expertise'
  };

  // First pass: calculate raw values
  const rawValues = {};
  let allocated = 0;

  for (const [key, weight] of Object.entries(weights)) {
    const fullKey = keyMap[key];
    // Calculate proportional value
    const raw = (weight / totalWeight) * budget;
    // Round down and clamp to max
    rawValues[fullKey] = Math.min(Math.floor(raw), maxPerAttr);
    allocated += rawValues[fullKey];
  }

  // Second pass: distribute remaining points
  let remaining = budget - allocated;
  const sortedKeys = Object.entries(weights)
    .sort((a, b) => b[1] - a[1]) // Sort by weight descending
    .map(([key]) => keyMap[key]);

  // Distribute to highest weighted attributes that aren't at max
  let index = 0;
  while (remaining > 0 && index < sortedKeys.length * 2) {
    const key = sortedKeys[index % sortedKeys.length];
    if (rawValues[key] < maxPerAttr) {
      rawValues[key]++;
      remaining--;
    }
    index++;
  }

  return rawValues;
}

/**
 * Generate default (balanced) attribute distribution for a tier
 * @param {number} tier - The NPC tier
 * @returns {Object} Balanced attribute values
 */
export function generateDefaultAttributes(tier) {
  const tierData = getTierData(tier);
  const budget = tierData.suggestedAttributes.total;
  const maxPerAttr = tierData.suggestedAttributes.max;

  const attributes = {
    strength: 0,
    fortitude: 0,
    agility: 0,
    awareness: 0,
    resolve: 0,
    persona: 0,
    ingenuity: 0,
    expertise: 0
  };

  // Distribute evenly
  const keys = Object.keys(attributes);
  const baseValue = Math.min(Math.floor(budget / keys.length), maxPerAttr);
  let remaining = budget;

  for (const key of keys) {
    attributes[key] = baseValue;
    remaining -= baseValue;
  }

  // Distribute remainder to first attributes
  let index = 0;
  while (remaining > 0) {
    const key = keys[index % keys.length];
    if (attributes[key] < maxPerAttr) {
      attributes[key]++;
      remaining--;
    }
    index++;
  }

  return attributes;
}

/**
 * Generate skill ranks from a template archetype for a specific tier
 * @param {string} npcClass - The NPC class
 * @param {string} templateKey - The template key
 * @param {number} tier - The NPC tier (0-6)
 * @returns {Object} Generated skill ranks { "Arms": 3, "Athletics": 2, ... }
 */
export function generateSkillTemplate(npcClass, templateKey, tier) {
  const archetype = SKILL_ARCHETYPES[npcClass]?.[templateKey];
  if (!archetype) {
    console.warn(`Unknown skill archetype: ${npcClass}/${templateKey}`);
    return {};
  }

  const tierData = getTierData(tier);
  const budget = tierData.suggestedSkillRanks;

  if (budget === 0) {
    return {};
  }

  // Calculate total priority weight
  const totalPriority = archetype.skills.reduce((sum, s) => sum + s.priority, 0);

  if (totalPriority === 0) {
    return {};
  }

  const skills = {};
  let allocated = 0;

  // First pass: allocate based on priority
  for (const { skill, priority } of archetype.skills) {
    const raw = (priority / totalPriority) * budget;
    const value = Math.max(1, Math.floor(raw)); // At least 1 rank
    skills[skill] = Math.min(value, 6); // Max 6 ranks per skill
    allocated += skills[skill];
  }

  // Adjust if over budget
  while (allocated > budget) {
    // Find lowest priority skill with ranks > 1
    const sortedSkills = archetype.skills
      .filter(s => skills[s.skill] > 1)
      .sort((a, b) => a.priority - b.priority);

    if (sortedSkills.length === 0) break;

    skills[sortedSkills[0].skill]--;
    allocated--;
  }

  // Adjust if under budget
  let remaining = budget - allocated;
  const sortedByPriority = [...archetype.skills].sort((a, b) => b.priority - a.priority);
  let index = 0;

  while (remaining > 0 && index < sortedByPriority.length * 6) {
    const { skill } = sortedByPriority[index % sortedByPriority.length];
    if (skills[skill] < 6) {
      skills[skill]++;
      remaining--;
    }
    index++;
  }

  return skills;
}

/**
 * Get all attribute templates available for a class
 * @param {string} npcClass - The NPC class
 * @returns {Object} Template definitions { key: { label, description } }
 */
export function getAttributeTemplatesForClass(npcClass) {
  const archetypes = ATTRIBUTE_ARCHETYPES[npcClass] || ATTRIBUTE_ARCHETYPES.humanoid;
  const templates = {};

  for (const [key, archetype] of Object.entries(archetypes)) {
    templates[key] = {
      label: archetype.label,
      description: archetype.description
    };
  }

  return templates;
}

/**
 * Get all skill templates available for a class
 * @param {string} npcClass - The NPC class
 * @returns {Object} Template definitions { key: { label, description } }
 */
export function getSkillTemplatesForClass(npcClass) {
  const archetypes = SKILL_ARCHETYPES[npcClass] || SKILL_ARCHETYPES.humanoid;
  const templates = {};

  for (const [key, archetype] of Object.entries(archetypes)) {
    templates[key] = {
      label: archetype.label,
      description: archetype.description
    };
  }

  return templates;
}

/**
 * Preview what a template would generate for a given tier
 * Useful for displaying template info in the UI
 * @param {string} npcClass - The NPC class
 * @param {string} templateKey - The template key
 * @param {number} tier - The NPC tier
 * @param {string} type - 'attributes' or 'skills'
 * @returns {Object} Generated values
 */
export function previewTemplate(npcClass, templateKey, tier, type) {
  if (type === 'attributes') {
    return generateAttributeTemplate(npcClass, templateKey, tier);
  } else if (type === 'skills') {
    return generateSkillTemplate(npcClass, templateKey, tier);
  }
  return {};
}

/**
 * Validate that a template generates values within tier limits
 * @param {string} npcClass - The NPC class
 * @param {string} templateKey - The template key
 * @param {number} tier - The NPC tier
 * @param {string} type - 'attributes' or 'skills'
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validateTemplate(npcClass, templateKey, tier, type) {
  const errors = [];
  const tierData = getTierData(tier);

  if (type === 'attributes') {
    const values = generateAttributeTemplate(npcClass, templateKey, tier);
    const total = Object.values(values).reduce((sum, v) => sum + v, 0);
    const max = Math.max(...Object.values(values));

    if (total > tierData.suggestedAttributes.total) {
      errors.push(`Total (${total}) exceeds budget (${tierData.suggestedAttributes.total})`);
    }
    if (max > tierData.suggestedAttributes.max) {
      errors.push(`Max value (${max}) exceeds tier limit (${tierData.suggestedAttributes.max})`);
    }
  } else if (type === 'skills') {
    const values = generateSkillTemplate(npcClass, templateKey, tier);
    const total = Object.values(values).reduce((sum, v) => sum + v, 0);

    if (total > tierData.suggestedSkillRanks) {
      errors.push(`Total ranks (${total}) exceeds budget (${tierData.suggestedSkillRanks})`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
