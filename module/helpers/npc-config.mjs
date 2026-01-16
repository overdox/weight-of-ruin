/**
 * The Weight of Ruin - NPC Configuration Data
 * Defines Classes, Types, Tiers, and Trait Categories for NPC creation
 */

// ========================================
// CLASS DEFINITIONS
// ========================================

export const NPC_CLASSES = {
  humanoid: {
    id: "humanoid",
    label: "AOA.NPC.Class.Humanoid",
    description: "AOA.NPC.Class.HumanoidDesc",
    icon: "fas fa-user"
  },
  beast: {
    id: "beast",
    label: "AOA.NPC.Class.Beast",
    description: "AOA.NPC.Class.BeastDesc",
    icon: "fas fa-paw"
  },
  vermin: {
    id: "vermin",
    label: "AOA.NPC.Class.Vermin",
    description: "AOA.NPC.Class.VerminDesc",
    icon: "fas fa-bug"
  },
  afflicted: {
    id: "afflicted",
    label: "AOA.NPC.Class.Afflicted",
    description: "AOA.NPC.Class.AfflictedDesc",
    icon: "fas fa-skull"
  },
  apparition: {
    id: "apparition",
    label: "AOA.NPC.Class.Apparition",
    description: "AOA.NPC.Class.ApparitionDesc",
    icon: "fas fa-ghost"
  },
  fiend: {
    id: "fiend",
    label: "AOA.NPC.Class.Fiend",
    description: "AOA.NPC.Class.FiendDesc",
    icon: "fas fa-fire"
  }
};

// ========================================
// TYPE DEFINITIONS BY CLASS
// ========================================

export const NPC_TYPES = {
  humanoid: [
    { id: "human", label: "AOA.NPC.Type.Human" },
    { id: "dwarf", label: "AOA.NPC.Type.Dwarf" },
    { id: "elf", label: "AOA.NPC.Type.Elf" },
    { id: "undine", label: "AOA.NPC.Type.Undine" },
    { id: "changeling", label: "AOA.NPC.Type.Changeling" },
    { id: "helskari", label: "AOA.NPC.Type.Helskari" },
    { id: "jadwiga", label: "AOA.NPC.Type.Jadwiga" },
    { id: "goblin", label: "AOA.NPC.Type.Goblin" },
    { id: "ogre", label: "AOA.NPC.Type.Ogre" },
    { id: "troll", label: "AOA.NPC.Type.Troll" }
  ],
  beast: [
    { id: "ape", label: "AOA.NPC.Type.Ape" },
    { id: "badger", label: "AOA.NPC.Type.Badger" },
    { id: "bat", label: "AOA.NPC.Type.Bat" },
    { id: "bear", label: "AOA.NPC.Type.Bear" },
    { id: "beaver", label: "AOA.NPC.Type.Beaver" },
    { id: "bull", label: "AOA.NPC.Type.Bull" },
    { id: "camel", label: "AOA.NPC.Type.Camel" },
    { id: "cat", label: "AOA.NPC.Type.Cat" },
    { id: "cobra", label: "AOA.NPC.Type.Cobra" },
    { id: "crocodile", label: "AOA.NPC.Type.Crocodile" },
    { id: "doe", label: "AOA.NPC.Type.Doe" },
    { id: "dog", label: "AOA.NPC.Type.Dog" },
    { id: "dolphin", label: "AOA.NPC.Type.Dolphin" },
    { id: "elephant", label: "AOA.NPC.Type.Elephant" },
    { id: "elk", label: "AOA.NPC.Type.Elk" },
    { id: "falcon", label: "AOA.NPC.Type.Falcon" },
    { id: "fox", label: "AOA.NPC.Type.Fox" },
    { id: "hawk", label: "AOA.NPC.Type.Hawk" },
    { id: "horse", label: "AOA.NPC.Type.Horse" },
    { id: "leopard", label: "AOA.NPC.Type.Leopard" },
    { id: "lion", label: "AOA.NPC.Type.Lion" },
    { id: "lynx", label: "AOA.NPC.Type.Lynx" },
    { id: "octopus", label: "AOA.NPC.Type.Octopus" },
    { id: "orca", label: "AOA.NPC.Type.Orca" },
    { id: "owl", label: "AOA.NPC.Type.Owl" },
    { id: "raven", label: "AOA.NPC.Type.Raven" },
    { id: "stag", label: "AOA.NPC.Type.Stag" },
    { id: "tiger", label: "AOA.NPC.Type.Tiger" },
    { id: "wolf", label: "AOA.NPC.Type.Wolf" }
  ],
  vermin: [
    { id: "ant", label: "AOA.NPC.Type.Ant" },
    { id: "beetle", label: "AOA.NPC.Type.Beetle" },
    { id: "cockroach", label: "AOA.NPC.Type.Cockroach" },
    { id: "grub", label: "AOA.NPC.Type.Grub" },
    { id: "leech", label: "AOA.NPC.Type.Leech" },
    { id: "locust", label: "AOA.NPC.Type.Locust" },
    { id: "maggot", label: "AOA.NPC.Type.Maggot" },
    { id: "mite", label: "AOA.NPC.Type.Mite" },
    { id: "scorpion", label: "AOA.NPC.Type.Scorpion" },
    { id: "spider", label: "AOA.NPC.Type.Spider" },
    { id: "termite", label: "AOA.NPC.Type.Termite" },
    { id: "tick", label: "AOA.NPC.Type.Tick" },
    { id: "worm", label: "AOA.NPC.Type.Worm" }
  ],
  afflicted: [
    { id: "blighted", label: "AOA.NPC.Type.Blighted" },
    { id: "ghul", label: "AOA.NPC.Type.Ghul" },
    { id: "revenant", label: "AOA.NPC.Type.Revenant" },
    { id: "vampire", label: "AOA.NPC.Type.Vampire" },
    { id: "vargin", label: "AOA.NPC.Type.Vargin" },
    { id: "wendigo", label: "AOA.NPC.Type.Wendigo" },
    { id: "werewolf", label: "AOA.NPC.Type.Werewolf" },
    { id: "wight", label: "AOA.NPC.Type.Wight" }
  ],
  apparition: [
    { id: "banshee", label: "AOA.NPC.Type.Banshee" },
    { id: "phantom", label: "AOA.NPC.Type.Phantom" },
    { id: "sprite", label: "AOA.NPC.Type.Sprite" },
    { id: "wraith", label: "AOA.NPC.Type.Wraith" }
  ],
  fiend: [
    { id: "demon", label: "AOA.NPC.Type.Demon" },
    { id: "hellhound", label: "AOA.NPC.Type.Hellhound" },
    { id: "imp", label: "AOA.NPC.Type.Imp" },
    { id: "incubus", label: "AOA.NPC.Type.Incubus" },
    { id: "jinn", label: "AOA.NPC.Type.Jinn" },
    { id: "succubus", label: "AOA.NPC.Type.Succubus" }
  ]
};

// ========================================
// TIER DEFINITIONS
// ========================================

export const NPC_TIERS = {
  0: {
    id: 0,
    name: "dreg",
    label: "AOA.NPC.Tier.Dreg",
    description: "AOA.NPC.Tier.DregDesc",
    baseDicePool: 5,
    traitPoints: 1,
    suggestedAttributes: {
      total: 5,  // Total attribute points to distribute
      max: 2     // Max in any single attribute
    },
    suggestedSkillRanks: 0
  },
  1: {
    id: 1,
    name: "skirmisher",
    label: "AOA.NPC.Tier.Skirmisher",
    description: "AOA.NPC.Tier.SkirmisherDesc",
    baseDicePool: 6,
    traitPoints: 3,
    suggestedAttributes: {
      total: 8,
      max: 3
    },
    suggestedSkillRanks: 2
  },
  2: {
    id: 2,
    name: "enforcer",
    label: "AOA.NPC.Tier.Enforcer",
    description: "AOA.NPC.Tier.EnforcerDesc",
    baseDicePool: 8,
    traitPoints: 5,
    suggestedAttributes: {
      total: 12,
      max: 4
    },
    suggestedSkillRanks: 4
  },
  3: {
    id: 3,
    name: "veteran",
    label: "AOA.NPC.Tier.Veteran",
    description: "AOA.NPC.Tier.VeteranDesc",
    baseDicePool: 10,
    traitPoints: 7,
    suggestedAttributes: {
      total: 16,
      max: 5
    },
    suggestedSkillRanks: 6
  },
  4: {
    id: 4,
    name: "elite",
    label: "AOA.NPC.Tier.Elite",
    description: "AOA.NPC.Tier.EliteDesc",
    baseDicePool: 13,
    traitPoints: 9,
    suggestedAttributes: {
      total: 20,
      max: 6
    },
    suggestedSkillRanks: 8
  },
  5: {
    id: 5,
    name: "champion",
    label: "AOA.NPC.Tier.Champion",
    description: "AOA.NPC.Tier.ChampionDesc",
    baseDicePool: 17,
    traitPoints: 11,
    suggestedAttributes: {
      total: 26,
      max: 7
    },
    suggestedSkillRanks: 10
  },
  6: {
    id: 6,
    name: "exemplar",
    label: "AOA.NPC.Tier.Exemplar",
    description: "AOA.NPC.Tier.ExemplarDesc",
    baseDicePool: 20,
    traitPoints: 13,
    suggestedAttributes: {
      total: 32,
      max: 8
    },
    suggestedSkillRanks: 12
  }
};

// ========================================
// TRAIT CATEGORIES
// ========================================

export const TRAIT_CATEGORIES = {
  offense: {
    id: "offense",
    label: "AOA.NPCTrait.Category.Offense",
    description: "AOA.NPCTrait.Category.OffenseDesc",
    icon: "fas fa-sword"
  },
  defense: {
    id: "defense",
    label: "AOA.NPCTrait.Category.Defense",
    description: "AOA.NPCTrait.Category.DefenseDesc",
    icon: "fas fa-shield-alt"
  },
  mobility: {
    id: "mobility",
    label: "AOA.NPCTrait.Category.Mobility",
    description: "AOA.NPCTrait.Category.MobilityDesc",
    icon: "fas fa-running"
  },
  control: {
    id: "control",
    label: "AOA.NPCTrait.Category.Control",
    description: "AOA.NPCTrait.Category.ControlDesc",
    icon: "fas fa-hand-paper"
  },
  teamplay: {
    id: "teamplay",
    label: "AOA.NPCTrait.Category.Teamplay",
    description: "AOA.NPCTrait.Category.TeamplayDesc",
    icon: "fas fa-users"
  },
  leadership: {
    id: "leadership",
    label: "AOA.NPCTrait.Category.Leadership",
    description: "AOA.NPCTrait.Category.LeadershipDesc",
    icon: "fas fa-crown"
  },
  supernatural: {
    id: "supernatural",
    label: "AOA.NPCTrait.Category.Supernatural",
    description: "AOA.NPCTrait.Category.SupernaturalDesc",
    icon: "fas fa-magic"
  },
  ranged: {
    id: "ranged",
    label: "AOA.NPCTrait.Category.Ranged",
    description: "AOA.NPCTrait.Category.RangedDesc",
    icon: "fas fa-crosshairs"
  },
  signature: {
    id: "signature",
    label: "AOA.NPCTrait.Category.Signature",
    description: "AOA.NPCTrait.Category.SignatureDesc",
    icon: "fas fa-skull-crossbones"
  },
  typeTrait: {
    id: "typeTrait",
    label: "AOA.NPCTrait.Category.TypeTrait",
    description: "AOA.NPCTrait.Category.TypeTraitDesc",
    icon: "fas fa-dna"
  }
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get types available for a given class
 * @param {string} npcClass - The creature class
 * @returns {Array} Array of type objects
 */
export function getTypesForClass(npcClass) {
  return NPC_TYPES[npcClass] || [];
}

/**
 * Get tier data by tier number
 * @param {number} tier - The tier number (0-6)
 * @returns {Object} Tier configuration object
 */
export function getTierData(tier) {
  return NPC_TIERS[tier] || NPC_TIERS[1];
}

/**
 * Get trait points for a given tier
 * @param {number} tier - The tier number (0-6)
 * @returns {number} Number of trait points
 */
export function getTraitPointsForTier(tier) {
  return getTierData(tier).traitPoints;
}

/**
 * Get base dice pool for a given tier
 * @param {number} tier - The tier number (0-6)
 * @returns {number} Base dice pool
 */
export function getBaseDicePoolForTier(tier) {
  return getTierData(tier).baseDicePool;
}

/**
 * Get all classes as an array for select options
 * @returns {Array} Array of {value, label} objects
 */
export function getClassOptions() {
  return Object.values(NPC_CLASSES).map(cls => ({
    value: cls.id,
    label: cls.label
  }));
}

/**
 * Get all tiers as an array for select options
 * @returns {Array} Array of {value, label, traitPoints, baseDicePool} objects
 */
export function getTierOptions() {
  return Object.values(NPC_TIERS).map(tier => ({
    value: tier.id,
    label: tier.label,
    name: tier.name,
    traitPoints: tier.traitPoints,
    baseDicePool: tier.baseDicePool
  }));
}

/**
 * Get all trait categories as an array for select options
 * @returns {Array} Array of {value, label, icon} objects
 */
export function getTraitCategoryOptions() {
  return Object.values(TRAIT_CATEGORIES).map(cat => ({
    value: cat.id,
    label: cat.label,
    icon: cat.icon
  }));
}

/**
 * Validate if a class/type combination is valid
 * @param {string} npcClass - The creature class
 * @param {string} npcType - The creature type
 * @returns {boolean} True if valid
 */
export function isValidClassType(npcClass, npcType) {
  const types = NPC_TYPES[npcClass];
  if (!types) return false;
  return types.some(t => t.id === npcType);
}

// Legacy aliases for backwards compatibility
export const NPC_KINDS = NPC_CLASSES;
export const NPC_FORMS = NPC_TYPES;
export const getFormsForKind = getTypesForClass;
export const getKindOptions = getClassOptions;
export const isValidKindForm = isValidClassType;
