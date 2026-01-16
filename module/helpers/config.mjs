/**
 * The Weight of Ruin system configuration constants.
 */
export const AOA = {};

/**
 * The set of core Attributes used within the system.
 * @type {Object}
 */
AOA.attributes = {
  str: 'AOA.Attribute.Strength.long',
  for: 'AOA.Attribute.Fortitude.long',
  agi: 'AOA.Attribute.Agility.long',
  awa: 'AOA.Attribute.Awareness.long',
  res: 'AOA.Attribute.Resolve.long',
  per: 'AOA.Attribute.Persona.long',
  ing: 'AOA.Attribute.Ingenuity.long',
  exp: 'AOA.Attribute.Expertise.long',
};

AOA.attributeAbbreviations = {
  str: 'AOA.Attribute.Strength.abbr',
  for: 'AOA.Attribute.Fortitude.abbr',
  agi: 'AOA.Attribute.Agility.abbr',
  awa: 'AOA.Attribute.Awareness.abbr',
  res: 'AOA.Attribute.Resolve.abbr',
  per: 'AOA.Attribute.Persona.abbr',
  ing: 'AOA.Attribute.Ingenuity.abbr',
  exp: 'AOA.Attribute.Expertise.abbr',
};

/**
 * Derived attributes calculated from core attributes.
 * @type {Object}
 */
AOA.derivedAttributes = {
  toughness: 'AOA.Derived.Toughness',
  reflex: 'AOA.Derived.Reflex',
  defense: 'AOA.Derived.Defense',
  movement: 'AOA.Derived.Movement',
  maxTrauma: 'AOA.Derived.MaxTrauma',
  wounds: 'AOA.Derived.Wounds',
  // Prowess (combat derived attributes)
  weaponProwess: 'AOA.Derived.WeaponProwess',
  ballisticProwess: 'AOA.Derived.BallisticProwess',
  unarmedProwess: 'AOA.Derived.UnarmedProwess',
};

/**
 * Difficulty tiers for Threshold Compression dice system.
 * @type {Object}
 */
AOA.difficultyTiers = {
  trivial: {
    label: 'AOA.Difficulty.Trivial',
    threshold: 4, // Hits on 4, 5, 6
  },
  standard: {
    label: 'AOA.Difficulty.Standard',
    threshold: 5, // Hits on 5, 6
  },
  hard: {
    label: 'AOA.Difficulty.Hard',
    threshold: 6, // Hits on 6 only
  },
};

/**
 * Target Threshold challenge levels.
 * @type {Object}
 */
AOA.targetThresholds = {
  1: 'AOA.TT.Simple',
  2: 'AOA.TT.Moderate',
  3: 'AOA.TT.Challenging',
  4: 'AOA.TT.Difficult',
  5: 'AOA.TT.Exceptional',
  6: 'AOA.TT.Legendary',
};

/**
 * Skill categories.
 * @type {Object}
 */
AOA.skillCategories = {
  martial: 'AOA.SkillCategory.Martial',
  physical: 'AOA.SkillCategory.Physical',
  social: 'AOA.SkillCategory.Social',
  knowledge: 'AOA.SkillCategory.Knowledge',
  craft: 'AOA.SkillCategory.Craft',
  thaumaturgy: 'AOA.SkillCategory.Thaumaturgy',
};

/**
 * Actor types.
 * @type {Object}
 */
AOA.actorTypes = {
  character: 'AOA.ActorType.Character',
  npc: 'AOA.ActorType.NPC',
  creature: 'AOA.ActorType.Creature',
};

/**
 * Item types.
 * @type {Object}
 */
AOA.itemTypes = {
  skill: 'AOA.ItemType.Skill',
  talent: 'AOA.ItemType.Talent',
  weapon: 'AOA.ItemType.Weapon',
  armor: 'AOA.ItemType.Armor',
  gear: 'AOA.ItemType.Gear',
  spell: 'AOA.ItemType.Spell',
  ritual: 'AOA.ItemType.Ritual',
  lineage: 'AOA.ItemType.Lineage',
  background: 'AOA.ItemType.Background',
  archetype: 'AOA.ItemType.Archetype',
  pathway: 'AOA.ItemType.Pathway',
  lifeEvent: 'AOA.ItemType.LifeEvent',
};

/**
 * Zeal spending costs.
 * @type {Object}
 */
AOA.zealCosts = {
  difficultyShift: 1,
  reroll: 2,
  bonusDice: 3,
  autoSuccess: 5,
};

/**
 * Lineages available in the system.
 * @type {Object}
 */
AOA.lineages = {
  human: 'AOA.Lineage.Human',
  dwarf: 'AOA.Lineage.Dwarf',
  elf: 'AOA.Lineage.Elf',
  changeling: 'AOA.Lineage.Changeling',
  undine: 'AOA.Lineage.Undine',
  helskari: 'AOA.Lineage.Helskari',
  jadwiga: 'AOA.Lineage.Jadwiga',
};

/**
 * Archetypes available in the system.
 * @type {Object}
 */
AOA.archetypes = {
  zealot: 'AOA.Archetype.Zealot',
  thaumaturge: 'AOA.Archetype.Thaumaturge',
  warrior: 'AOA.Archetype.Warrior',
  rogue: 'AOA.Archetype.Rogue',
  sage: 'AOA.Archetype.Sage',
};

/**
 * Lineage color themes for UI styling.
 * Each lineage has primary and secondary colors for frames and accents.
 * @type {Object}
 */
AOA.lineageColors = {
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
AOA.archetypeColors = {
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
AOA.pathways = {
  apprenticeship: 'AOA.Pathway.Apprenticeship',
  militaryService: 'AOA.Pathway.MilitaryService',
  academicStudy: 'AOA.Pathway.AcademicStudy',
  streetSurvival: 'AOA.Pathway.StreetSurvival',
  spiritualCalling: 'AOA.Pathway.SpiritualCalling',
  wandering: 'AOA.Pathway.Wandering',
};

/**
 * Economic tiers for backgrounds.
 * @type {Object}
 */
AOA.economicTiers = {
  upper: 'AOA.EconomicTier.Upper',
  middle: 'AOA.EconomicTier.Middle',
  lower: 'AOA.EconomicTier.Lower',
  struggling: 'AOA.EconomicTier.Struggling',
};

/**
 * Social standings - determines skill ranks and societal perception.
 * @type {Object}
 */
AOA.socialStandings = {
  exalted: 'AOA.SocialStanding.Exalted',
  ordained: 'AOA.SocialStanding.Ordained',
  anointed: 'AOA.SocialStanding.Anointed',
  penitent: 'AOA.SocialStanding.Penitent',
  heretics: 'AOA.SocialStanding.Heretics',
  outcast: 'AOA.SocialStanding.Outcast',
};

/**
 * Skill ranks granted by social standing.
 * Those outside society's grace have learned more through necessity.
 * @type {Object}
 */
AOA.socialStandingSkillRanks = {
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
AOA.magicTraditions = {
  sorcery: 'AOA.Magic.Sorcery',
  ritefocus: 'AOA.Magic.Ritefocus',
  necromancy: 'AOA.Magic.Necromancy',
};

/**
 * Sorcery techniques.
 * @type {Object}
 */
AOA.sorceryTechniques = {
  create: 'AOA.Sorcery.Technique.Create',
  perceive: 'AOA.Sorcery.Technique.Perceive',
  transform: 'AOA.Sorcery.Technique.Transform',
  destroy: 'AOA.Sorcery.Technique.Destroy',
  control: 'AOA.Sorcery.Technique.Control',
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
AOA.conditions = {
  bleeding: {
    id: 'bleeding',
    label: 'AOA.Condition.Bleeding.label',
    description: 'AOA.Condition.Bleeding.Desc',
    icon: 'icons/svg/blood.svg',
    effects: [],
    modifiers: {},
    flags: {
      endOfTurnDamage: 1 // Takes 1 Trauma at end of turn
    }
  },
  blinded: {
    id: 'blinded',
    label: 'AOA.Condition.Blinded.label',
    description: 'AOA.Condition.Blinded.Desc',
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
    label: 'AOA.Condition.Charmed.label',
    description: 'AOA.Condition.Charmed.Desc',
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
    label: 'AOA.Condition.Deafened.label',
    description: 'AOA.Condition.Deafened.Desc',
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
    label: 'AOA.Condition.Defenseless.label',
    description: 'AOA.Condition.Defenseless.Desc',
    icon: 'icons/svg/paralysis.svg',
    effects: [],
    modifiers: {},
    flags: {
      attacksAreTrivial: true // Attacks against this target use Trivial difficulty
    }
  },
  exhausted: {
    id: 'exhausted',
    label: 'AOA.Condition.Exhausted.label',
    description: 'AOA.Condition.Exhausted.Desc',
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
    label: 'AOA.Condition.Flanked.label',
    description: 'AOA.Condition.Flanked.Desc',
    icon: 'icons/svg/target.svg',
    effects: [],
    modifiers: {},
    flags: {
      attackersGainBonus: 2 // Attackers gain +2 dice against this target
    }
  },
  frightened: {
    id: 'frightened',
    label: 'AOA.Condition.Frightened.label',
    description: 'AOA.Condition.Frightened.Desc',
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
    label: 'AOA.Condition.Grappled.label',
    description: 'AOA.Condition.Grappled.Desc',
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
    label: 'AOA.Condition.Hidden.label',
    description: 'AOA.Condition.Hidden.Desc',
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
    label: 'AOA.Condition.Poisoned.label',
    description: 'AOA.Condition.Poisoned.Desc',
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
    label: 'AOA.Condition.Prone.label',
    description: 'AOA.Condition.Prone.Desc',
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
    label: 'AOA.Condition.Restrained.label',
    description: 'AOA.Condition.Restrained.Desc',
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
    label: 'AOA.Condition.Stunned.label',
    description: 'AOA.Condition.Stunned.Desc',
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
    label: 'AOA.Condition.Unconscious.label',
    description: 'AOA.Condition.Unconscious.Desc',
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
    label: 'AOA.Condition.Dying.label',
    description: 'AOA.Condition.Dying.Desc',
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
    label: 'AOA.Condition.Dead.label',
    description: 'AOA.Condition.Dead.Desc',
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
    label: 'AOA.Condition.Staggered.label',
    description: 'AOA.Condition.Staggered.Desc',
    icon: 'systems/weight-of-ruin/assets/icons/staggered.svg',
    effects: [],
    modifiers: {},
    flags: {
      loseActions: 1 // Lose 1 action this turn
    }
  },
  slowed: {
    id: 'slowed',
    label: 'AOA.Condition.Slowed.label',
    description: 'AOA.Condition.Slowed.Desc',
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
    label: 'AOA.Condition.Weakened.label',
    description: 'AOA.Condition.Weakened.Desc',
    icon: 'icons/svg/downgrade.svg',
    effects: [],
    modifiers: {
      attack: -2 // -2 dice to attack rolls
    },
    flags: {}
  },
  shaken: {
    id: 'shaken',
    label: 'AOA.Condition.Shaken.label',
    description: 'AOA.Condition.Shaken.Desc',
    icon: 'systems/weight-of-ruin/assets/icons/shaken.svg',
    effects: [],
    modifiers: {
      allRolls: -2 // -2 dice to all rolls
    },
    flags: {}
  },
  numb: {
    id: 'numb',
    label: 'AOA.Condition.Numb.label',
    description: 'AOA.Condition.Numb.Desc',
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
    label: 'AOA.Condition.Marked.label',
    description: 'AOA.Condition.Marked.Desc',
    icon: 'icons/svg/target.svg',
    effects: [],
    modifiers: {},
    flags: {
      attackersGainBonus: 2 // Attackers gain +2 dice against this target
    }
  },
  tethered: {
    id: 'tethered',
    label: 'AOA.Condition.Tethered.label',
    description: 'AOA.Condition.Tethered.Desc',
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
AOA.weaponProperties = {
  concealable: {
    label: 'AOA.WeaponProperty.Concealable.label',
    description: 'AOA.WeaponProperty.Concealable.Desc',
    modifier: { skill: 'stealth', bonus: 2 }
  },
  finesse: {
    label: 'AOA.WeaponProperty.Finesse.label',
    description: 'AOA.WeaponProperty.Finesse.Desc',
    allowAgility: true,
    agilityBonus: 1
  },
  heavy: {
    label: 'AOA.WeaponProperty.Heavy.label',
    description: 'AOA.WeaponProperty.Heavy.Desc',
    strengthDamageBonus: 1
  },
  light: {
    label: 'AOA.WeaponProperty.Light.label',
    description: 'AOA.WeaponProperty.Light.Desc',
    allowDualWield: true,
    allowAgility: true
  },
  loading: {
    label: 'AOA.WeaponProperty.Loading.label',
    description: 'AOA.WeaponProperty.Loading.Desc',
    requiresReload: true
  },
  reach: {
    label: 'AOA.WeaponProperty.Reach.label',
    description: 'AOA.WeaponProperty.Reach.Desc',
    reachSpaces: 2,
    noAdjacent: true
  },
  thrown: {
    label: 'AOA.WeaponProperty.Thrown.label',
    description: 'AOA.WeaponProperty.Thrown.Desc',
    canThrow: true
  },
  trip: {
    label: 'AOA.WeaponProperty.Trip.label',
    description: 'AOA.WeaponProperty.Trip.Desc',
    tripOnHit: true
  },
  twoHanded: {
    label: 'AOA.WeaponProperty.TwoHanded.label',
    description: 'AOA.WeaponProperty.TwoHanded.Desc',
    hands: 2
  },
  versatile: {
    label: 'AOA.WeaponProperty.Versatile.label',
    description: 'AOA.WeaponProperty.Versatile.Desc',
    twoHandedDamageBonus: 1
  },
  wounding: {
    label: 'AOA.WeaponProperty.Wounding.label',
    description: 'AOA.WeaponProperty.Wounding.Desc',
    bleedOnCrit: true
  },
  balanced: {
    label: 'AOA.WeaponProperty.Balanced.label',
    description: 'AOA.WeaponProperty.Balanced.Desc'
  },
  precise: {
    label: 'AOA.WeaponProperty.Precise.label',
    description: 'AOA.WeaponProperty.Precise.Desc'
  }
};

/**
 * Weapon groups/categories for proficiency and classification.
 * @type {Object}
 */
AOA.weaponGroups = {
  dagger: 'AOA.WeaponGroup.Dagger',
  sword: 'AOA.WeaponGroup.Sword',
  axe: 'AOA.WeaponGroup.Axe',
  blunt: 'AOA.WeaponGroup.Blunt',
  polearm: 'AOA.WeaponGroup.Polearm',
  bow: 'AOA.WeaponGroup.Bow',
  crossbow: 'AOA.WeaponGroup.Crossbow',
  thrown: 'AOA.WeaponGroup.Thrown',
  unarmed: 'AOA.WeaponGroup.Unarmed'
};

/**
 * Weapon quality levels affecting attack dice and cost.
 * @type {Object}
 */
AOA.weaponQuality = {
  poor: {
    label: 'AOA.Quality.Poor',
    attackModifier: -1,
    costMultiplier: 0.5,
    breaksOnCritFail: true
  },
  standard: {
    label: 'AOA.Quality.Standard',
    attackModifier: 0,
    costMultiplier: 1
  },
  fine: {
    label: 'AOA.Quality.Fine',
    attackModifier: 1,
    costMultiplier: 3
  },
  superior: {
    label: 'AOA.Quality.Superior',
    attackModifier: 2,
    costMultiplier: 5
  },
  masterwork: {
    label: 'AOA.Quality.Masterwork',
    attackModifier: 3,
    costMultiplier: 10
  }
};

/**
 * Armor properties from wor_core Section 8.3.
 * @type {Object}
 */
AOA.armorProperties = {
  encumbering: {
    label: 'AOA.ArmorProperty.Encumbering.label',
    description: 'AOA.ArmorProperty.Encumbering.Desc',
    agilityPenalty: -1, // Per level (0-3)
    affectsSkills: ['acrobatics', 'stealth', 'swim']
  },
  noisy: {
    label: 'AOA.ArmorProperty.Noisy.label',
    description: 'AOA.ArmorProperty.Noisy.Desc',
    stealthPenalty: -2
  },
  insulating: {
    label: 'AOA.ArmorProperty.Insulating.label',
    description: 'AOA.ArmorProperty.Insulating.Desc',
    coldResistanceBonus: 2
  },
  flexible: {
    label: 'AOA.ArmorProperty.Flexible.label',
    description: 'AOA.ArmorProperty.Flexible.Desc',
    encumberingReduction: 1
  },
  cumbersome: {
    label: 'AOA.ArmorProperty.Cumbersome.label',
    description: 'AOA.ArmorProperty.Cumbersome.Desc',
    movementPenalty: -1
  },
  bulky: {
    label: 'AOA.ArmorProperty.Bulky.label',
    description: 'AOA.ArmorProperty.Bulky.Desc',
    cannotConceal: true
  }
};

/**
 * Armor categories for classification and layering rules.
 * @type {Object}
 */
AOA.armorCategories = {
  none: 'AOA.ArmorCategory.None',
  quilted: 'AOA.ArmorCategory.Quilted',
  mail: 'AOA.ArmorCategory.Mail',
  composite: 'AOA.ArmorCategory.Composite',
  scale: 'AOA.ArmorCategory.Scale',
  plate: 'AOA.ArmorCategory.Plate',
  shield: 'AOA.ArmorCategory.Shield'
};

/**
 * Armor quality levels affecting DR and encumbering.
 * @type {Object}
 */
AOA.armorQuality = {
  poor: {
    label: 'AOA.Quality.Poor',
    drModifier: -1,
    encumberingReduction: 0,
    costMultiplier: 0.5
  },
  standard: {
    label: 'AOA.Quality.Standard',
    drModifier: 0,
    encumberingReduction: 0,
    costMultiplier: 1
  },
  fine: {
    label: 'AOA.Quality.Fine',
    drModifier: 0,
    encumberingReduction: 1,
    costMultiplier: 3
  },
  superior: {
    label: 'AOA.Quality.Superior',
    drModifier: 1,
    encumberingReduction: 1,
    costMultiplier: 5
  },
  masterwork: {
    label: 'AOA.Quality.Masterwork',
    drModifier: 2,
    encumberingReduction: 2,
    costMultiplier: 10
  }
};

/**
 * Item rarity levels.
 * @type {Object}
 */
AOA.itemRarity = {
  common: 'AOA.Rarity.Common',
  uncommon: 'AOA.Rarity.Uncommon',
  rare: 'AOA.Rarity.Rare',
  exotic: 'AOA.Rarity.Exotic'
};

// ========================================
// NPC CREATION SYSTEM
// ========================================

/**
 * NPC Kind/Form taxonomy.
 * Defines creature types and their specific forms.
 * @type {Object}
 */
AOA.npcKinds = {
  humanoid: {
    label: 'AOA.NPC.Kind.Humanoid',
    forms: ['human', 'dwarf', 'elf', 'undine', 'changeling', 'helskari', 'jadwiga', 'goblin', 'ogre', 'troll']
  },
  beast: {
    label: 'AOA.NPC.Kind.Beast',
    forms: [
      'ape', 'badger', 'bat', 'bear', 'beaver', 'bull', 'camel', 'cat', 'cobra', 'crocodile',
      'doe', 'dog', 'dolphin', 'elephant', 'elk', 'falcon', 'fox', 'hawk', 'horse', 'leopard',
      'lion', 'lynx', 'octopus', 'orca', 'owl', 'raven', 'stag', 'tiger', 'wolf'
    ]
  },
  vermin: {
    label: 'AOA.NPC.Kind.Vermin',
    forms: ['ant', 'beetle', 'cockroach', 'grub', 'leech', 'locust', 'maggot', 'mite', 'scorpion', 'spider', 'termite', 'tick', 'worm']
  },
  afflicted: {
    label: 'AOA.NPC.Kind.Afflicted',
    forms: ['blighted', 'ghul', 'revenant', 'vampire', 'vargin', 'wight', 'werewolf', 'wendigo']
  },
  apparition: {
    label: 'AOA.NPC.Kind.Apparition',
    forms: ['banshee', 'phantom', 'sprite', 'wraith']
  },
  fiend: {
    label: 'AOA.NPC.Kind.Fiend',
    forms: ['demon', 'hellhound', 'imp', 'incubus', 'jinn', 'succubus']
  }
};

/**
 * NPC Form labels for localization.
 * @type {Object}
 */
AOA.npcForms = {
  // Humanoid
  human: 'AOA.NPC.Form.Human',
  dwarf: 'AOA.NPC.Form.Dwarf',
  elf: 'AOA.NPC.Form.Elf',
  undine: 'AOA.NPC.Form.Undine',
  changeling: 'AOA.NPC.Form.Changeling',
  helskari: 'AOA.NPC.Form.Helskari',
  jadwiga: 'AOA.NPC.Form.Jadwiga',
  goblin: 'AOA.NPC.Form.Goblin',
  ogre: 'AOA.NPC.Form.Ogre',
  troll: 'AOA.NPC.Form.Troll',
  // Beast
  ape: 'AOA.NPC.Form.Ape',
  badger: 'AOA.NPC.Form.Badger',
  bat: 'AOA.NPC.Form.Bat',
  bear: 'AOA.NPC.Form.Bear',
  beaver: 'AOA.NPC.Form.Beaver',
  bull: 'AOA.NPC.Form.Bull',
  camel: 'AOA.NPC.Form.Camel',
  cat: 'AOA.NPC.Form.Cat',
  cobra: 'AOA.NPC.Form.Cobra',
  crocodile: 'AOA.NPC.Form.Crocodile',
  doe: 'AOA.NPC.Form.Doe',
  dog: 'AOA.NPC.Form.Dog',
  dolphin: 'AOA.NPC.Form.Dolphin',
  elephant: 'AOA.NPC.Form.Elephant',
  elk: 'AOA.NPC.Form.Elk',
  falcon: 'AOA.NPC.Form.Falcon',
  fox: 'AOA.NPC.Form.Fox',
  hawk: 'AOA.NPC.Form.Hawk',
  horse: 'AOA.NPC.Form.Horse',
  leopard: 'AOA.NPC.Form.Leopard',
  lion: 'AOA.NPC.Form.Lion',
  lynx: 'AOA.NPC.Form.Lynx',
  octopus: 'AOA.NPC.Form.Octopus',
  orca: 'AOA.NPC.Form.Orca',
  owl: 'AOA.NPC.Form.Owl',
  raven: 'AOA.NPC.Form.Raven',
  stag: 'AOA.NPC.Form.Stag',
  tiger: 'AOA.NPC.Form.Tiger',
  wolf: 'AOA.NPC.Form.Wolf',
  // Vermin
  ant: 'AOA.NPC.Form.Ant',
  beetle: 'AOA.NPC.Form.Beetle',
  cockroach: 'AOA.NPC.Form.Cockroach',
  grub: 'AOA.NPC.Form.Grub',
  leech: 'AOA.NPC.Form.Leech',
  locust: 'AOA.NPC.Form.Locust',
  maggot: 'AOA.NPC.Form.Maggot',
  mite: 'AOA.NPC.Form.Mite',
  scorpion: 'AOA.NPC.Form.Scorpion',
  spider: 'AOA.NPC.Form.Spider',
  termite: 'AOA.NPC.Form.Termite',
  tick: 'AOA.NPC.Form.Tick',
  worm: 'AOA.NPC.Form.Worm',
  // Afflicted
  blighted: 'AOA.NPC.Form.Blighted',
  ghul: 'AOA.NPC.Form.Ghul',
  revenant: 'AOA.NPC.Form.Revenant',
  vampire: 'AOA.NPC.Form.Vampire',
  vargin: 'AOA.NPC.Form.Vargin',
  wight: 'AOA.NPC.Form.Wight',
  werewolf: 'AOA.NPC.Form.Werewolf',
  wendigo: 'AOA.NPC.Form.Wendigo',
  // Apparition
  banshee: 'AOA.NPC.Form.Banshee',
  phantom: 'AOA.NPC.Form.Phantom',
  sprite: 'AOA.NPC.Form.Sprite',
  wraith: 'AOA.NPC.Form.Wraith',
  // Fiend
  demon: 'AOA.NPC.Form.Demon',
  hellhound: 'AOA.NPC.Form.Hellhound',
  imp: 'AOA.NPC.Form.Imp',
  incubus: 'AOA.NPC.Form.Incubus',
  jinn: 'AOA.NPC.Form.Jinn',
  succubus: 'AOA.NPC.Form.Succubus'
};

/**
 * NPC Tier definitions.
 * Determines base dice pool budget and trait points.
 * @type {Object}
 */
AOA.npcTiers = {
  0: {
    label: 'AOA.NPC.Tier.Dreg',
    name: 'Dreg',
    baseDicePool: 5,
    traitPoints: 1,
    description: 'AOA.NPC.Tier.Dreg.Desc'
  },
  1: {
    label: 'AOA.NPC.Tier.Skirmisher',
    name: 'Skirmisher',
    baseDicePool: 6,
    traitPoints: 3,
    description: 'AOA.NPC.Tier.Skirmisher.Desc'
  },
  2: {
    label: 'AOA.NPC.Tier.Enforcer',
    name: 'Enforcer',
    baseDicePool: 8,
    traitPoints: 5,
    description: 'AOA.NPC.Tier.Enforcer.Desc'
  },
  3: {
    label: 'AOA.NPC.Tier.Veteran',
    name: 'Veteran',
    baseDicePool: 10,
    traitPoints: 7,
    description: 'AOA.NPC.Tier.Veteran.Desc'
  },
  4: {
    label: 'AOA.NPC.Tier.Elite',
    name: 'Elite',
    baseDicePool: 13,
    traitPoints: 9,
    description: 'AOA.NPC.Tier.Elite.Desc'
  },
  5: {
    label: 'AOA.NPC.Tier.Champion',
    name: 'Champion',
    baseDicePool: 17,
    traitPoints: 11,
    description: 'AOA.NPC.Tier.Champion.Desc'
  },
  6: {
    label: 'AOA.NPC.Tier.Exemplar',
    name: 'Exemplar',
    baseDicePool: 20,
    traitPoints: 13,
    description: 'AOA.NPC.Tier.Exemplar.Desc'
  }
};

/**
 * NPC Trait categories for filtering and organization.
 * @type {Object}
 */
AOA.npcTraitCategories = {
  offense: 'AOA.NPCTrait.Category.Offense',
  defense: 'AOA.NPCTrait.Category.Defense',
  mobility: 'AOA.NPCTrait.Category.Mobility',
  control: 'AOA.NPCTrait.Category.Control',
  teamplay: 'AOA.NPCTrait.Category.Teamplay',
  leadership: 'AOA.NPCTrait.Category.Leadership',
  supernatural: 'AOA.NPCTrait.Category.Supernatural',
  ranged: 'AOA.NPCTrait.Category.Ranged',
  signature: 'AOA.NPCTrait.Category.Signature',
  formTrait: 'AOA.NPCTrait.Category.FormTrait'
};

