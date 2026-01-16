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
    label: "WOR.NPC.Class.Humanoid",
    description: "WOR.NPC.Class.HumanoidDesc",
    icon: "fas fa-user"
  },
  beast: {
    id: "beast",
    label: "WOR.NPC.Class.Beast",
    description: "WOR.NPC.Class.BeastDesc",
    icon: "fas fa-paw"
  },
  vermin: {
    id: "vermin",
    label: "WOR.NPC.Class.Vermin",
    description: "WOR.NPC.Class.VerminDesc",
    icon: "fas fa-bug"
  },
  afflicted: {
    id: "afflicted",
    label: "WOR.NPC.Class.Afflicted",
    description: "WOR.NPC.Class.AfflictedDesc",
    icon: "fas fa-skull"
  },
  apparition: {
    id: "apparition",
    label: "WOR.NPC.Class.Apparition",
    description: "WOR.NPC.Class.ApparitionDesc",
    icon: "fas fa-ghost"
  },
  fiend: {
    id: "fiend",
    label: "WOR.NPC.Class.Fiend",
    description: "WOR.NPC.Class.FiendDesc",
    icon: "fas fa-fire"
  }
};

// ========================================
// TYPE DEFINITIONS BY CLASS
// ========================================

export const NPC_TYPES = {
  humanoid: [
    { id: "human", label: "WOR.NPC.Type.Human" },
    { id: "dwarf", label: "WOR.NPC.Type.Dwarf" },
    { id: "elf", label: "WOR.NPC.Type.Elf" },
    { id: "undine", label: "WOR.NPC.Type.Undine" },
    { id: "changeling", label: "WOR.NPC.Type.Changeling" },
    { id: "helskari", label: "WOR.NPC.Type.Helskari" },
    { id: "jadwiga", label: "WOR.NPC.Type.Jadwiga" },
    { id: "goblin", label: "WOR.NPC.Type.Goblin" },
    { id: "ogre", label: "WOR.NPC.Type.Ogre" },
    { id: "troll", label: "WOR.NPC.Type.Troll" }
  ],
  beast: [
    { id: "ape", label: "WOR.NPC.Type.Ape" },
    { id: "badger", label: "WOR.NPC.Type.Badger" },
    { id: "bat", label: "WOR.NPC.Type.Bat" },
    { id: "bear", label: "WOR.NPC.Type.Bear" },
    { id: "beaver", label: "WOR.NPC.Type.Beaver" },
    { id: "bull", label: "WOR.NPC.Type.Bull" },
    { id: "camel", label: "WOR.NPC.Type.Camel" },
    { id: "cat", label: "WOR.NPC.Type.Cat" },
    { id: "cobra", label: "WOR.NPC.Type.Cobra" },
    { id: "crocodile", label: "WOR.NPC.Type.Crocodile" },
    { id: "doe", label: "WOR.NPC.Type.Doe" },
    { id: "dog", label: "WOR.NPC.Type.Dog" },
    { id: "dolphin", label: "WOR.NPC.Type.Dolphin" },
    { id: "elephant", label: "WOR.NPC.Type.Elephant" },
    { id: "elk", label: "WOR.NPC.Type.Elk" },
    { id: "falcon", label: "WOR.NPC.Type.Falcon" },
    { id: "fox", label: "WOR.NPC.Type.Fox" },
    { id: "hawk", label: "WOR.NPC.Type.Hawk" },
    { id: "horse", label: "WOR.NPC.Type.Horse" },
    { id: "leopard", label: "WOR.NPC.Type.Leopard" },
    { id: "lion", label: "WOR.NPC.Type.Lion" },
    { id: "lynx", label: "WOR.NPC.Type.Lynx" },
    { id: "octopus", label: "WOR.NPC.Type.Octopus" },
    { id: "orca", label: "WOR.NPC.Type.Orca" },
    { id: "owl", label: "WOR.NPC.Type.Owl" },
    { id: "raven", label: "WOR.NPC.Type.Raven" },
    { id: "stag", label: "WOR.NPC.Type.Stag" },
    { id: "tiger", label: "WOR.NPC.Type.Tiger" },
    { id: "wolf", label: "WOR.NPC.Type.Wolf" }
  ],
  vermin: [
    { id: "ant", label: "WOR.NPC.Type.Ant" },
    { id: "beetle", label: "WOR.NPC.Type.Beetle" },
    { id: "cockroach", label: "WOR.NPC.Type.Cockroach" },
    { id: "grub", label: "WOR.NPC.Type.Grub" },
    { id: "leech", label: "WOR.NPC.Type.Leech" },
    { id: "locust", label: "WOR.NPC.Type.Locust" },
    { id: "maggot", label: "WOR.NPC.Type.Maggot" },
    { id: "mite", label: "WOR.NPC.Type.Mite" },
    { id: "scorpion", label: "WOR.NPC.Type.Scorpion" },
    { id: "spider", label: "WOR.NPC.Type.Spider" },
    { id: "termite", label: "WOR.NPC.Type.Termite" },
    { id: "tick", label: "WOR.NPC.Type.Tick" },
    { id: "worm", label: "WOR.NPC.Type.Worm" }
  ],
  afflicted: [
    { id: "blighted", label: "WOR.NPC.Type.Blighted" },
    { id: "ghul", label: "WOR.NPC.Type.Ghul" },
    { id: "revenant", label: "WOR.NPC.Type.Revenant" },
    { id: "vampire", label: "WOR.NPC.Type.Vampire" },
    { id: "vargin", label: "WOR.NPC.Type.Vargin" },
    { id: "wendigo", label: "WOR.NPC.Type.Wendigo" },
    { id: "werewolf", label: "WOR.NPC.Type.Werewolf" },
    { id: "wight", label: "WOR.NPC.Type.Wight" }
  ],
  apparition: [
    { id: "banshee", label: "WOR.NPC.Type.Banshee" },
    { id: "phantom", label: "WOR.NPC.Type.Phantom" },
    { id: "sprite", label: "WOR.NPC.Type.Sprite" },
    { id: "wraith", label: "WOR.NPC.Type.Wraith" }
  ],
  fiend: [
    { id: "demon", label: "WOR.NPC.Type.Demon" },
    { id: "hellhound", label: "WOR.NPC.Type.Hellhound" },
    { id: "imp", label: "WOR.NPC.Type.Imp" },
    { id: "incubus", label: "WOR.NPC.Type.Incubus" },
    { id: "jinn", label: "WOR.NPC.Type.Jinn" },
    { id: "succubus", label: "WOR.NPC.Type.Succubus" }
  ]
};

// ========================================
// TIER DEFINITIONS
// ========================================

export const NPC_TIERS = {
  0: {
    id: 0,
    name: "dreg",
    label: "WOR.NPC.Tier.Dreg",
    description: "WOR.NPC.Tier.DregDesc",
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
    label: "WOR.NPC.Tier.Skirmisher",
    description: "WOR.NPC.Tier.SkirmisherDesc",
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
    label: "WOR.NPC.Tier.Enforcer",
    description: "WOR.NPC.Tier.EnforcerDesc",
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
    label: "WOR.NPC.Tier.Veteran",
    description: "WOR.NPC.Tier.VeteranDesc",
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
    label: "WOR.NPC.Tier.Elite",
    description: "WOR.NPC.Tier.EliteDesc",
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
    label: "WOR.NPC.Tier.Champion",
    description: "WOR.NPC.Tier.ChampionDesc",
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
    label: "WOR.NPC.Tier.Exemplar",
    description: "WOR.NPC.Tier.ExemplarDesc",
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
    label: "WOR.NPCTrait.Category.Offense",
    description: "WOR.NPCTrait.Category.OffenseDesc",
    icon: "fas fa-sword"
  },
  defense: {
    id: "defense",
    label: "WOR.NPCTrait.Category.Defense",
    description: "WOR.NPCTrait.Category.DefenseDesc",
    icon: "fas fa-shield-alt"
  },
  mobility: {
    id: "mobility",
    label: "WOR.NPCTrait.Category.Mobility",
    description: "WOR.NPCTrait.Category.MobilityDesc",
    icon: "fas fa-running"
  },
  control: {
    id: "control",
    label: "WOR.NPCTrait.Category.Control",
    description: "WOR.NPCTrait.Category.ControlDesc",
    icon: "fas fa-hand-paper"
  },
  teamplay: {
    id: "teamplay",
    label: "WOR.NPCTrait.Category.Teamplay",
    description: "WOR.NPCTrait.Category.TeamplayDesc",
    icon: "fas fa-users"
  },
  leadership: {
    id: "leadership",
    label: "WOR.NPCTrait.Category.Leadership",
    description: "WOR.NPCTrait.Category.LeadershipDesc",
    icon: "fas fa-crown"
  },
  supernatural: {
    id: "supernatural",
    label: "WOR.NPCTrait.Category.Supernatural",
    description: "WOR.NPCTrait.Category.SupernaturalDesc",
    icon: "fas fa-magic"
  },
  ranged: {
    id: "ranged",
    label: "WOR.NPCTrait.Category.Ranged",
    description: "WOR.NPCTrait.Category.RangedDesc",
    icon: "fas fa-crosshairs"
  },
  signature: {
    id: "signature",
    label: "WOR.NPCTrait.Category.Signature",
    description: "WOR.NPCTrait.Category.SignatureDesc",
    icon: "fas fa-skull-crossbones"
  },
  typeTrait: {
    id: "typeTrait",
    label: "WOR.NPCTrait.Category.TypeTrait",
    description: "WOR.NPCTrait.Category.TypeTraitDesc",
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
