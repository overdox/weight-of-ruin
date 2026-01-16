/**
 * The Weight of Ruin system configuration constants.
 */
export const WOR = {};

/**
 * The set of core Attributes used within the system.
 * @type {Object}
 */
WOR.attributes = {
  str: 'WOR.Attribute.Strength.long',
  for: 'WOR.Attribute.Fortitude.long',
  agi: 'WOR.Attribute.Agility.long',
  awa: 'WOR.Attribute.Awareness.long',
  res: 'WOR.Attribute.Resolve.long',
  per: 'WOR.Attribute.Persona.long',
  ing: 'WOR.Attribute.Ingenuity.long',
  exp: 'WOR.Attribute.Expertise.long',
};

WOR.attributeAbbreviations = {
  str: 'WOR.Attribute.Strength.abbr',
  for: 'WOR.Attribute.Fortitude.abbr',
  agi: 'WOR.Attribute.Agility.abbr',
  awa: 'WOR.Attribute.Awareness.abbr',
  res: 'WOR.Attribute.Resolve.abbr',
  per: 'WOR.Attribute.Persona.abbr',
  ing: 'WOR.Attribute.Ingenuity.abbr',
  exp: 'WOR.Attribute.Expertise.abbr',
};

/**
 * Derived attributes calculated from core attributes.
 * @type {Object}
 */
WOR.derivedAttributes = {
  toughness: 'WOR.Derived.Toughness',
  reflex: 'WOR.Derived.Reflex',
  defense: 'WOR.Derived.Defense',
  movement: 'WOR.Derived.Movement',
  maxTrauma: 'WOR.Derived.MaxTrauma',
  wounds: 'WOR.Derived.Wounds',
  // Prowess (combat derived attributes)
  weaponProwess: 'WOR.Derived.WeaponProwess',
  ballisticProwess: 'WOR.Derived.BallisticProwess',
  unarmedProwess: 'WOR.Derived.UnarmedProwess',
};

/**
 * Difficulty tiers for Threshold Compression dice system.
 * @type {Object}
 */
WOR.difficultyTiers = {
  trivial: {
    label: 'WOR.Difficulty.Trivial',
    threshold: 4, // Hits on 4, 5, 6
  },
  standard: {
    label: 'WOR.Difficulty.Standard',
    threshold: 5, // Hits on 5, 6
  },
  hard: {
    label: 'WOR.Difficulty.Hard',
    threshold: 6, // Hits on 6 only
  },
};

/**
 * Target Threshold challenge levels.
 * @type {Object}
 */
WOR.targetThresholds = {
  1: 'WOR.TT.Simple',
  2: 'WOR.TT.Moderate',
  3: 'WOR.TT.Challenging',
  4: 'WOR.TT.Difficult',
  5: 'WOR.TT.Exceptional',
  6: 'WOR.TT.Legendary',
};

/**
 * Skill categories.
 * @type {Object}
 */
WOR.skillCategories = {
  martial: 'WOR.SkillCategory.Martial',
  physical: 'WOR.SkillCategory.Physical',
  social: 'WOR.SkillCategory.Social',
  knowledge: 'WOR.SkillCategory.Knowledge',
  craft: 'WOR.SkillCategory.Craft',
  thaumaturgy: 'WOR.SkillCategory.Thaumaturgy',
};

/**
 * Actor types.
 * @type {Object}
 */
WOR.actorTypes = {
  character: 'WOR.ActorType.Character',
  npc: 'WOR.ActorType.NPC',
  creature: 'WOR.ActorType.Creature',
};

/**
 * Item types.
 * @type {Object}
 */
WOR.itemTypes = {
  skill: 'WOR.ItemType.Skill',
  talent: 'WOR.ItemType.Talent',
  weapon: 'WOR.ItemType.Weapon',
  armor: 'WOR.ItemType.Armor',
  gear: 'WOR.ItemType.Gear',
  spell: 'WOR.ItemType.Spell',
  ritual: 'WOR.ItemType.Ritual',
  lineage: 'WOR.ItemType.Lineage',
  background: 'WOR.ItemType.Background',
  archetype: 'WOR.ItemType.Archetype',
  pathway: 'WOR.ItemType.Pathway',
  lifeEvent: 'WOR.ItemType.LifeEvent',
};

/**
 * Zeal spending costs.
 * @type {Object}
 */
WOR.zealCosts = {
  difficultyShift: 1,
  reroll: 2,
  bonusDice: 3,
  autoSuccess: 5,
};

/**
 * Lineages available in the system.
 * @type {Object}
 */
WOR.lineages = {
  human: 'WOR.Lineage.Human',
  dwarf: 'WOR.Lineage.Dwarf',
  elf: 'WOR.Lineage.Elf',
  changeling: 'WOR.Lineage.Changeling',
  undine: 'WOR.Lineage.Undine',
  helskari: 'WOR.Lineage.Helskari',
  jadwiga: 'WOR.Lineage.Jadwiga',
};

/**
 * Archetypes available in the system.
 * @type {Object}
 */
WOR.archetypes = {
  zealot: 'WOR.Archetype.Zealot',
  thaumaturge: 'WOR.Archetype.Thaumaturge',
  warrior: 'WOR.Archetype.Warrior',
  rogue: 'WOR.Archetype.Rogue',
  sage: 'WOR.Archetype.Sage',
};

/**
 * Lineage color themes for UI styling.
 * Each lineage has primary and secondary colors for frames and accents.
 * @type {Object}
 */
WOR.lineageColors = {
  human: {
    primary: '#c4a35a',      // Gamboge (Tarnished Gold)
    secondary: '#8b7355',    // Dusty bronze
    text: '#2a2520'          // Dark contrast
  },
  dwarf: {
    primary: '#a0522d',      // Deep Ochre (Earth-Stain)
    secondary: '#6b4423',    // Dark earth
    text: '#e8e4d9'          // Light contrast
  },
  elf: {
    primary: '#9b7b8e',      // Amaranth (Withered Violet)
    secondary: '#6d5a62',    // Faded violet
    text: '#e8e4d9'          // Light contrast
  },
  changeling: {
    primary: '#8a9a9a',      // Quicksilver (Living Grey)
    secondary: '#5a6a6a',    // Dark silver
    text: '#1a1a1a'          // Dark contrast
  },
  undine: {
    primary: '#2f5a5a',      // Abyssal Teal (Drowned Blue)
    secondary: '#1a3a3a',    // Deep water
    text: '#e8e4d9'          // Light contrast
  },
  helskari: {
    primary: '#b8d4e3',      // Hoarfrost (Pale Cyan)
    secondary: '#8ab4c9',    // Ice blue
    text: '#1a2530'          // Dark contrast
  },
  jadwiga: {
    primary: '#6b7355',      // Lichen (Sickly Olive)
    secondary: '#4a5240',    // Dark moss
    text: '#e8e4d9'          // Light contrast
  }
};

/**
 * Archetype color themes for UI styling.
 * Each archetype has primary and secondary colors for frames and accents.
 * @type {Object}
 */
WOR.archetypeColors = {
  zealot: {
    primary: '#e8e4d9',     // Bone White
    secondary: '#c9b896',   // Pale Gold
    text: '#2a2520'         // Dark contrast
  },
  thaumaturge: {
    primary: '#5c3d6e',     // Blight Purple
    secondary: '#b5a642',   // Sulfur
    text: '#e8e4d9'         // Light contrast
  },
  warrior: {
    primary: '#6b2c2c',     // Dried Blood
    secondary: '#5a5a5a',   // Iron
    text: '#e8e4d9'         // Light contrast
  },
  rogue: {
    primary: '#1a2420',     // Shadow
    secondary: '#3d5a4a',   // Forest Green
    text: '#e8e4d9'         // Light contrast
  },
  sage: {
    primary: '#4a4a4a',     // Ashen Grey
    secondary: '#6b6b6b',   // Light Grey
    text: '#e8e4d9'         // Light contrast
  }
};

/**
 * Pathways available in the system.
 * @type {Object}
 */
WOR.pathways = {
  apprenticeship: 'WOR.Pathway.Apprenticeship',
  militaryService: 'WOR.Pathway.MilitaryService',
  academicStudy: 'WOR.Pathway.AcademicStudy',
  streetSurvival: 'WOR.Pathway.StreetSurvival',
  spiritualCalling: 'WOR.Pathway.SpiritualCalling',
  wandering: 'WOR.Pathway.Wandering',
};

/**
 * Economic tiers for backgrounds.
 * @type {Object}
 */
WOR.economicTiers = {
  upper: 'WOR.EconomicTier.Upper',
  middle: 'WOR.EconomicTier.Middle',
  lower: 'WOR.EconomicTier.Lower',
  struggling: 'WOR.EconomicTier.Struggling',
};

/**
 * Social standings - determines skill ranks and societal perception.
 * @type {Object}
 */
WOR.socialStandings = {
  exalted: 'WOR.SocialStanding.Exalted',
  ordained: 'WOR.SocialStanding.Ordained',
  anointed: 'WOR.SocialStanding.Anointed',
  penitent: 'WOR.SocialStanding.Penitent',
  heretics: 'WOR.SocialStanding.Heretics',
  outcast: 'WOR.SocialStanding.Outcast',
};

/**
 * Skill ranks granted by social standing.
 * Those outside society's grace have learned more through necessity.
 * @type {Object}
 */
WOR.socialStandingSkillRanks = {
  exalted: 18,    // Specialized education; servants handle menial tasks
  ordained: 24,   // Religious training; focused devotion limits breadth
  anointed: 30,   // Professional competence; guild training with practical scope
  penitent: 36,   // Common labor; diverse practical skills from hard work
  heretics: 42,   // Survival on society's edge; necessity breeds adaptability
  outcast: 48,    // Hard-won experience; every skill learned through desperation
};

/**
 * Magic traditions.
 * @type {Object}
 */
WOR.magicTraditions = {
  sorcery: 'WOR.Magic.Sorcery',
  ritefocus: 'WOR.Magic.Ritefocus',
  necromancy: 'WOR.Magic.Necromancy',
};

/**
 * Sorcery techniques.
 * @type {Object}
 */
WOR.sorceryTechniques = {
  create: 'WOR.Sorcery.Technique.Create',
  perceive: 'WOR.Sorcery.Technique.Perceive',
  transform: 'WOR.Sorcery.Technique.Transform',
  destroy: 'WOR.Sorcery.Technique.Destroy',
  control: 'WOR.Sorcery.Technique.Control',
};

/**
 * Status conditions.
 * Each condition includes:
 * - id: Unique identifier
 * - label: Localization key for display name
 * - description: Localization key for full description
 * - icon: Path to status icon
 * - effects: Array of Active Effect changes (automated modifiers)
 * - modifiers: Object describing dice pool modifiers (for roll integration)
 * - flags: Special handling flags
 * @type {Object}
 */
WOR.conditions = {
  bleeding: {
    id: 'bleeding',
    label: 'WOR.Condition.Bleeding.label',
    description: 'WOR.Condition.Bleeding.Desc',
    icon: 'icons/svg/blood.svg',
    effects: [],
    modifiers: {},
    flags: {
      endOfTurnDamage: 1 // Takes 1 Trauma at end of turn
    }
  },
  blinded: {
    id: 'blinded',
    label: 'WOR.Condition.Blinded.label',
    description: 'WOR.Condition.Blinded.Desc',
    icon: 'icons/svg/blind.svg',
    effects: [],
    modifiers: {
      allRolls: -4, // -4 dice to all rolls requiring sight
      defense: -4 // -4 Defense (can't see attacks coming)
    },
    flags: {
      cannotSee: true
    }
  },
  charmed: {
    id: 'charmed',
    label: 'WOR.Condition.Charmed.label',
    description: 'WOR.Condition.Charmed.Desc',
    icon: 'icons/svg/aura.svg',
    effects: [],
    modifiers: {},
    flags: {
      cannotAttackSource: true,
      socialAdvantage: true // Source has advantage on social rolls
    }
  },
  deafened: {
    id: 'deafened',
    label: 'WOR.Condition.Deafened.label',
    description: 'WOR.Condition.Deafened.Desc',
    icon: 'icons/svg/deaf.svg',
    effects: [],
    modifiers: {
      awarenessHearing: -4 // -4 to hearing-based Awareness
    },
    flags: {
      cannotHear: true
    }
  },
  defenseless: {
    id: 'defenseless',
    label: 'WOR.Condition.Defenseless.label',
    description: 'WOR.Condition.Defenseless.Desc',
    icon: 'icons/svg/paralysis.svg',
    effects: [],
    modifiers: {},
    flags: {
      attacksAreTrivial: true // Attacks against this target use Trivial difficulty
    }
  },
  exhausted: {
    id: 'exhausted',
    label: 'WOR.Condition.Exhausted.label',
    description: 'WOR.Condition.Exhausted.Desc',
    icon: 'icons/svg/sleep.svg',
    effects: [
      { key: 'system.movementMod', mode: 1, value: 0.5 } // Half movement (multiply by 0.5)
    ],
    modifiers: {
      physical: -2 // -2 dice to physical rolls
    },
    flags: {}
  },
  flanked: {
    id: 'flanked',
    label: 'WOR.Condition.Flanked.label',
    description: 'WOR.Condition.Flanked.Desc',
    icon: 'icons/svg/target.svg',
    effects: [],
    modifiers: {},
    flags: {
      attackersGainBonus: 2 // Attackers gain +2 dice against this target
    }
  },
  frightened: {
    id: 'frightened',
    label: 'WOR.Condition.Frightened.label',
    description: 'WOR.Condition.Frightened.Desc',
    icon: 'icons/svg/terror.svg',
    effects: [],
    modifiers: {
      allRolls: -2 // -2 dice to all rolls while source is visible
    },
    flags: {
      mustMoveAway: true // Must move away from source if able
    }
  },
  grappled: {
    id: 'grappled',
    label: 'WOR.Condition.Grappled.label',
    description: 'WOR.Condition.Grappled.Desc',
    icon: 'icons/svg/net.svg',
    effects: [
      { key: 'system.movementMod', mode: 5, value: 0 } // Movement becomes 0 (override)
    ],
    modifiers: {
      attack: -2 // -2 dice to attacks
    },
    flags: {
      cannotMove: true
    }
  },
  hidden: {
    id: 'hidden',
    label: 'WOR.Condition.Hidden.label',
    description: 'WOR.Condition.Hidden.Desc',
    icon: 'icons/svg/invisible.svg',
    effects: [],
    modifiers: {
      attackFromHiding: 2 // +2 dice on attacks from hiding
    },
    flags: {
      invisible: true,
      lostOnAttack: true // Condition removed after attacking
    }
  },
  poisoned: {
    id: 'poisoned',
    label: 'WOR.Condition.Poisoned.label',
    description: 'WOR.Condition.Poisoned.Desc',
    icon: 'icons/svg/poison.svg',
    effects: [],
    modifiers: {
      allRolls: -2 // -2 dice to all rolls
    },
    flags: {
      endOfTurnDamage: 1 // Takes 1 Trauma at end of turn (varies by poison)
    }
  },
  prone: {
    id: 'prone',
    label: 'WOR.Condition.Prone.label',
    description: 'WOR.Condition.Prone.Desc',
    icon: 'icons/svg/falling.svg',
    effects: [],
    modifiers: {
      defenseMelee: -4, // -4 Defense against melee attacks
      defenseRanged: 2 // +2 Defense against ranged attacks
    },
    flags: {
      standUpCost: 1 // Costs 1 Action to stand
    }
  },
  restrained: {
    id: 'restrained',
    label: 'WOR.Condition.Restrained.label',
    description: 'WOR.Condition.Restrained.Desc',
    icon: 'icons/svg/padlock.svg',
    effects: [
      { key: 'system.movementMod', mode: 5, value: 0 } // Movement becomes 0
    ],
    modifiers: {
      defense: -4, // -4 Defense
      attack: -4 // -4 dice to attacks
    },
    flags: {
      cannotMove: true
    }
  },
  stunned: {
    id: 'stunned',
    label: 'WOR.Condition.Stunned.label',
    description: 'WOR.Condition.Stunned.Desc',
    icon: 'icons/svg/daze.svg',
    effects: [],
    modifiers: {
      defense: -2 // -2 Defense
    },
    flags: {
      loseActions: 1 // Lose 1 Action
    }
  },
  unconscious: {
    id: 'unconscious',
    label: 'WOR.Condition.Unconscious.label',
    description: 'WOR.Condition.Unconscious.Desc',
    icon: 'icons/svg/unconscious.svg',
    effects: [
      { key: 'system.movementMod', mode: 5, value: 0 }
    ],
    modifiers: {},
    flags: {
      cannotAct: true,
      isDefenseless: true, // Also applies Defenseless
      autoProne: true // Also applies Prone
    }
  },
  dying: {
    id: 'dying',
    label: 'WOR.Condition.Dying.label',
    description: 'WOR.Condition.Dying.Desc',
    icon: 'systems/weight-of-ruin/assets/icons/dying.svg',
    effects: [],
    modifiers: {},
    flags: {
      cannotAct: true,
      isDefenseless: true,
      deathSaves: true // Requires death saving throws
    }
  },
  dead: {
    id: 'dead',
    label: 'WOR.Condition.Dead.label',
    description: 'WOR.Condition.Dead.Desc',
    icon: 'icons/svg/skull.svg',
    effects: [],
    modifiers: {},
    flags: {
      isDead: true,
      cannotBeRemoved: false // Can only be removed by GM
    }
  },

  // ========================================
  // NPC TRAIT CONDITIONS
  // The following conditions are primarily applied by NPC traits
  // ========================================

  staggered: {
    id: 'staggered',
    label: 'WOR.Condition.Staggered.label',
    description: 'WOR.Condition.Staggered.Desc',
    icon: 'systems/weight-of-ruin/assets/icons/staggered.svg',
    effects: [],
    modifiers: {},
    flags: {
      loseActions: 1 // Lose 1 action this turn
    }
  },
  slowed: {
    id: 'slowed',
    label: 'WOR.Condition.Slowed.label',
    description: 'WOR.Condition.Slowed.Desc',
    icon: 'icons/svg/anchor.svg',
    effects: [
      { key: 'system.movementMod', mode: 1, value: 0.5 } // Half movement (multiply by 0.5)
    ],
    modifiers: {},
    flags: {
      halfMovement: true
    }
  },
  weakened: {
    id: 'weakened',
    label: 'WOR.Condition.Weakened.label',
    description: 'WOR.Condition.Weakened.Desc',
    icon: 'icons/svg/downgrade.svg',
    effects: [],
    modifiers: {
      attack: -2 // -2 dice to attack rolls
    },
    flags: {}
  },
  shaken: {
    id: 'shaken',
    label: 'WOR.Condition.Shaken.label',
    description: 'WOR.Condition.Shaken.Desc',
    icon: 'systems/weight-of-ruin/assets/icons/shaken.svg',
    effects: [],
    modifiers: {
      allRolls: -2 // -2 dice to all rolls
    },
    flags: {}
  },
  numb: {
    id: 'numb',
    label: 'WOR.Condition.Numb.label',
    description: 'WOR.Condition.Numb.Desc',
    icon: 'icons/svg/ice-aura.svg',
    effects: [],
    modifiers: {},
    flags: {
      cannotBeHealed: true, // Cannot benefit from healing
      immuneToPain: true // Doesn't suffer from pain-based effects
    }
  },
  marked: {
    id: 'marked',
    label: 'WOR.Condition.Marked.label',
    description: 'WOR.Condition.Marked.Desc',
    icon: 'icons/svg/target.svg',
    effects: [],
    modifiers: {},
    flags: {
      attackersGainBonus: 2 // Attackers gain +2 dice against this target
    }
  },
  tethered: {
    id: 'tethered',
    label: 'WOR.Condition.Tethered.label',
    description: 'WOR.Condition.Tethered.Desc',
    icon: 'icons/svg/circle.svg',
    effects: [],
    modifiers: {},
    flags: {
      boundToLocation: true, // Cannot move beyond anchor range
      anchorRange: 3 // Default 3 spaces from anchor point
    }
  }
};

/**
 * Weapon properties from wor_core Section 8.2.
 * Each property defines mechanical effects for combat.
 * @type {Object}
 */
WOR.weaponProperties = {
  concealable: {
    label: 'WOR.WeaponProperty.Concealable.label',
    description: 'WOR.WeaponProperty.Concealable.Desc',
    modifier: { skill: 'stealth', bonus: 2 }
  },
  finesse: {
    label: 'WOR.WeaponProperty.Finesse.label',
    description: 'WOR.WeaponProperty.Finesse.Desc',
    allowAgility: true,
    agilityBonus: 1
  },
  heavy: {
    label: 'WOR.WeaponProperty.Heavy.label',
    description: 'WOR.WeaponProperty.Heavy.Desc',
    strengthDamageBonus: 1
  },
  light: {
    label: 'WOR.WeaponProperty.Light.label',
    description: 'WOR.WeaponProperty.Light.Desc',
    allowDualWield: true,
    allowAgility: true
  },
  loading: {
    label: 'WOR.WeaponProperty.Loading.label',
    description: 'WOR.WeaponProperty.Loading.Desc',
    requiresReload: true
  },
  reach: {
    label: 'WOR.WeaponProperty.Reach.label',
    description: 'WOR.WeaponProperty.Reach.Desc',
    reachSpaces: 2,
    noAdjacent: true
  },
  thrown: {
    label: 'WOR.WeaponProperty.Thrown.label',
    description: 'WOR.WeaponProperty.Thrown.Desc',
    canThrow: true
  },
  trip: {
    label: 'WOR.WeaponProperty.Trip.label',
    description: 'WOR.WeaponProperty.Trip.Desc',
    tripOnHit: true
  },
  twoHanded: {
    label: 'WOR.WeaponProperty.TwoHanded.label',
    description: 'WOR.WeaponProperty.TwoHanded.Desc',
    hands: 2
  },
  versatile: {
    label: 'WOR.WeaponProperty.Versatile.label',
    description: 'WOR.WeaponProperty.Versatile.Desc',
    twoHandedDamageBonus: 1
  },
  wounding: {
    label: 'WOR.WeaponProperty.Wounding.label',
    description: 'WOR.WeaponProperty.Wounding.Desc',
    bleedOnCrit: true
  },
  balanced: {
    label: 'WOR.WeaponProperty.Balanced.label',
    description: 'WOR.WeaponProperty.Balanced.Desc'
  },
  precise: {
    label: 'WOR.WeaponProperty.Precise.label',
    description: 'WOR.WeaponProperty.Precise.Desc'
  }
};

/**
 * Weapon groups/categories for proficiency and classification.
 * @type {Object}
 */
WOR.weaponGroups = {
  dagger: 'WOR.WeaponGroup.Dagger',
  sword: 'WOR.WeaponGroup.Sword',
  axe: 'WOR.WeaponGroup.Axe',
  blunt: 'WOR.WeaponGroup.Blunt',
  polearm: 'WOR.WeaponGroup.Polearm',
  bow: 'WOR.WeaponGroup.Bow',
  crossbow: 'WOR.WeaponGroup.Crossbow',
  thrown: 'WOR.WeaponGroup.Thrown',
  unarmed: 'WOR.WeaponGroup.Unarmed'
};

/**
 * Weapon quality levels affecting attack dice and cost.
 * @type {Object}
 */
WOR.weaponQuality = {
  poor: {
    label: 'WOR.Quality.Poor',
    attackModifier: -1,
    costMultiplier: 0.5,
    breaksOnCritFail: true
  },
  standard: {
    label: 'WOR.Quality.Standard',
    attackModifier: 0,
    costMultiplier: 1
  },
  fine: {
    label: 'WOR.Quality.Fine',
    attackModifier: 1,
    costMultiplier: 3
  },
  superior: {
    label: 'WOR.Quality.Superior',
    attackModifier: 2,
    costMultiplier: 5
  },
  masterwork: {
    label: 'WOR.Quality.Masterwork',
    attackModifier: 3,
    costMultiplier: 10
  }
};

/**
 * Armor properties from wor_core Section 8.3.
 * @type {Object}
 */
WOR.armorProperties = {
  encumbering: {
    label: 'WOR.ArmorProperty.Encumbering.label',
    description: 'WOR.ArmorProperty.Encumbering.Desc',
    agilityPenalty: -1, // Per level (0-3)
    affectsSkills: ['acrobatics', 'stealth', 'swim']
  },
  noisy: {
    label: 'WOR.ArmorProperty.Noisy.label',
    description: 'WOR.ArmorProperty.Noisy.Desc',
    stealthPenalty: -2
  },
  insulating: {
    label: 'WOR.ArmorProperty.Insulating.label',
    description: 'WOR.ArmorProperty.Insulating.Desc',
    coldResistanceBonus: 2
  },
  flexible: {
    label: 'WOR.ArmorProperty.Flexible.label',
    description: 'WOR.ArmorProperty.Flexible.Desc',
    encumberingReduction: 1
  },
  cumbersome: {
    label: 'WOR.ArmorProperty.Cumbersome.label',
    description: 'WOR.ArmorProperty.Cumbersome.Desc',
    movementPenalty: -1
  },
  bulky: {
    label: 'WOR.ArmorProperty.Bulky.label',
    description: 'WOR.ArmorProperty.Bulky.Desc',
    cannotConceal: true
  }
};

/**
 * Armor categories for classification and layering rules.
 * @type {Object}
 */
WOR.armorCategories = {
  none: 'WOR.ArmorCategory.None',
  quilted: 'WOR.ArmorCategory.Quilted',
  mail: 'WOR.ArmorCategory.Mail',
  composite: 'WOR.ArmorCategory.Composite',
  scale: 'WOR.ArmorCategory.Scale',
  plate: 'WOR.ArmorCategory.Plate',
  shield: 'WOR.ArmorCategory.Shield'
};

/**
 * Armor quality levels affecting DR and encumbering.
 * @type {Object}
 */
WOR.armorQuality = {
  poor: {
    label: 'WOR.Quality.Poor',
    drModifier: -1,
    encumberingReduction: 0,
    costMultiplier: 0.5
  },
  standard: {
    label: 'WOR.Quality.Standard',
    drModifier: 0,
    encumberingReduction: 0,
    costMultiplier: 1
  },
  fine: {
    label: 'WOR.Quality.Fine',
    drModifier: 0,
    encumberingReduction: 1,
    costMultiplier: 3
  },
  superior: {
    label: 'WOR.Quality.Superior',
    drModifier: 1,
    encumberingReduction: 1,
    costMultiplier: 5
  },
  masterwork: {
    label: 'WOR.Quality.Masterwork',
    drModifier: 2,
    encumberingReduction: 2,
    costMultiplier: 10
  }
};

/**
 * Item rarity levels.
 * @type {Object}
 */
WOR.itemRarity = {
  common: 'WOR.Rarity.Common',
  uncommon: 'WOR.Rarity.Uncommon',
  rare: 'WOR.Rarity.Rare',
  exotic: 'WOR.Rarity.Exotic'
};

// ========================================
// NPC CREATION SYSTEM
// ========================================

/**
 * NPC Kind/Form taxonomy.
 * Defines creature types and their specific forms.
 * @type {Object}
 */
WOR.npcKinds = {
  humanoid: {
    label: 'WOR.NPC.Kind.Humanoid',
    forms: ['human', 'dwarf', 'elf', 'undine', 'changeling', 'helskari', 'jadwiga', 'goblin', 'ogre', 'troll']
  },
  beast: {
    label: 'WOR.NPC.Kind.Beast',
    forms: [
      'ape', 'badger', 'bat', 'bear', 'beaver', 'bull', 'camel', 'cat', 'cobra', 'crocodile',
      'doe', 'dog', 'dolphin', 'elephant', 'elk', 'falcon', 'fox', 'hawk', 'horse', 'leopard',
      'lion', 'lynx', 'octopus', 'orca', 'owl', 'raven', 'stag', 'tiger', 'wolf'
    ]
  },
  vermin: {
    label: 'WOR.NPC.Kind.Vermin',
    forms: ['ant', 'beetle', 'cockroach', 'grub', 'leech', 'locust', 'maggot', 'mite', 'scorpion', 'spider', 'termite', 'tick', 'worm']
  },
  afflicted: {
    label: 'WOR.NPC.Kind.Afflicted',
    forms: ['blighted', 'ghul', 'revenant', 'vampire', 'vargin', 'wight', 'werewolf', 'wendigo']
  },
  apparition: {
    label: 'WOR.NPC.Kind.Apparition',
    forms: ['banshee', 'phantom', 'sprite', 'wraith']
  },
  fiend: {
    label: 'WOR.NPC.Kind.Fiend',
    forms: ['demon', 'hellhound', 'imp', 'incubus', 'jinn', 'succubus']
  }
};

/**
 * NPC Form labels for localization.
 * @type {Object}
 */
WOR.npcForms = {
  // Humanoid
  human: 'WOR.NPC.Form.Human',
  dwarf: 'WOR.NPC.Form.Dwarf',
  elf: 'WOR.NPC.Form.Elf',
  undine: 'WOR.NPC.Form.Undine',
  changeling: 'WOR.NPC.Form.Changeling',
  helskari: 'WOR.NPC.Form.Helskari',
  jadwiga: 'WOR.NPC.Form.Jadwiga',
  goblin: 'WOR.NPC.Form.Goblin',
  ogre: 'WOR.NPC.Form.Ogre',
  troll: 'WOR.NPC.Form.Troll',
  // Beast
  ape: 'WOR.NPC.Form.Ape',
  badger: 'WOR.NPC.Form.Badger',
  bat: 'WOR.NPC.Form.Bat',
  bear: 'WOR.NPC.Form.Bear',
  beaver: 'WOR.NPC.Form.Beaver',
  bull: 'WOR.NPC.Form.Bull',
  camel: 'WOR.NPC.Form.Camel',
  cat: 'WOR.NPC.Form.Cat',
  cobra: 'WOR.NPC.Form.Cobra',
  crocodile: 'WOR.NPC.Form.Crocodile',
  doe: 'WOR.NPC.Form.Doe',
  dog: 'WOR.NPC.Form.Dog',
  dolphin: 'WOR.NPC.Form.Dolphin',
  elephant: 'WOR.NPC.Form.Elephant',
  elk: 'WOR.NPC.Form.Elk',
  falcon: 'WOR.NPC.Form.Falcon',
  fox: 'WOR.NPC.Form.Fox',
  hawk: 'WOR.NPC.Form.Hawk',
  horse: 'WOR.NPC.Form.Horse',
  leopard: 'WOR.NPC.Form.Leopard',
  lion: 'WOR.NPC.Form.Lion',
  lynx: 'WOR.NPC.Form.Lynx',
  octopus: 'WOR.NPC.Form.Octopus',
  orca: 'WOR.NPC.Form.Orca',
  owl: 'WOR.NPC.Form.Owl',
  raven: 'WOR.NPC.Form.Raven',
  stag: 'WOR.NPC.Form.Stag',
  tiger: 'WOR.NPC.Form.Tiger',
  wolf: 'WOR.NPC.Form.Wolf',
  // Vermin
  ant: 'WOR.NPC.Form.Ant',
  beetle: 'WOR.NPC.Form.Beetle',
  cockroach: 'WOR.NPC.Form.Cockroach',
  grub: 'WOR.NPC.Form.Grub',
  leech: 'WOR.NPC.Form.Leech',
  locust: 'WOR.NPC.Form.Locust',
  maggot: 'WOR.NPC.Form.Maggot',
  mite: 'WOR.NPC.Form.Mite',
  scorpion: 'WOR.NPC.Form.Scorpion',
  spider: 'WOR.NPC.Form.Spider',
  termite: 'WOR.NPC.Form.Termite',
  tick: 'WOR.NPC.Form.Tick',
  worm: 'WOR.NPC.Form.Worm',
  // Afflicted
  blighted: 'WOR.NPC.Form.Blighted',
  ghul: 'WOR.NPC.Form.Ghul',
  revenant: 'WOR.NPC.Form.Revenant',
  vampire: 'WOR.NPC.Form.Vampire',
  vargin: 'WOR.NPC.Form.Vargin',
  wight: 'WOR.NPC.Form.Wight',
  werewolf: 'WOR.NPC.Form.Werewolf',
  wendigo: 'WOR.NPC.Form.Wendigo',
  // Apparition
  banshee: 'WOR.NPC.Form.Banshee',
  phantom: 'WOR.NPC.Form.Phantom',
  sprite: 'WOR.NPC.Form.Sprite',
  wraith: 'WOR.NPC.Form.Wraith',
  // Fiend
  demon: 'WOR.NPC.Form.Demon',
  hellhound: 'WOR.NPC.Form.Hellhound',
  imp: 'WOR.NPC.Form.Imp',
  incubus: 'WOR.NPC.Form.Incubus',
  jinn: 'WOR.NPC.Form.Jinn',
  succubus: 'WOR.NPC.Form.Succubus'
};

/**
 * NPC Tier definitions.
 * Determines base dice pool budget and trait points.
 * @type {Object}
 */
WOR.npcTiers = {
  0: {
    label: 'WOR.NPC.Tier.Dreg',
    name: 'Dreg',
    baseDicePool: 5,
    traitPoints: 1,
    description: 'WOR.NPC.Tier.Dreg.Desc'
  },
  1: {
    label: 'WOR.NPC.Tier.Skirmisher',
    name: 'Skirmisher',
    baseDicePool: 6,
    traitPoints: 3,
    description: 'WOR.NPC.Tier.Skirmisher.Desc'
  },
  2: {
    label: 'WOR.NPC.Tier.Enforcer',
    name: 'Enforcer',
    baseDicePool: 8,
    traitPoints: 5,
    description: 'WOR.NPC.Tier.Enforcer.Desc'
  },
  3: {
    label: 'WOR.NPC.Tier.Veteran',
    name: 'Veteran',
    baseDicePool: 10,
    traitPoints: 7,
    description: 'WOR.NPC.Tier.Veteran.Desc'
  },
  4: {
    label: 'WOR.NPC.Tier.Elite',
    name: 'Elite',
    baseDicePool: 13,
    traitPoints: 9,
    description: 'WOR.NPC.Tier.Elite.Desc'
  },
  5: {
    label: 'WOR.NPC.Tier.Champion',
    name: 'Champion',
    baseDicePool: 17,
    traitPoints: 11,
    description: 'WOR.NPC.Tier.Champion.Desc'
  },
  6: {
    label: 'WOR.NPC.Tier.Exemplar',
    name: 'Exemplar',
    baseDicePool: 20,
    traitPoints: 13,
    description: 'WOR.NPC.Tier.Exemplar.Desc'
  }
};

/**
 * NPC Trait categories for filtering and organization.
 * @type {Object}
 */
WOR.npcTraitCategories = {
  offense: 'WOR.NPCTrait.Category.Offense',
  defense: 'WOR.NPCTrait.Category.Defense',
  mobility: 'WOR.NPCTrait.Category.Mobility',
  control: 'WOR.NPCTrait.Category.Control',
  teamplay: 'WOR.NPCTrait.Category.Teamplay',
  leadership: 'WOR.NPCTrait.Category.Leadership',
  supernatural: 'WOR.NPCTrait.Category.Supernatural',
  ranged: 'WOR.NPCTrait.Category.Ranged',
  signature: 'WOR.NPCTrait.Category.Signature',
  formTrait: 'WOR.NPCTrait.Category.FormTrait'
};

