/**
 * Archetypes Compendium Data
 * All 5 archetypes with subtypes
 */

export const ARCHETYPES_DATA = [
  {
    name: "Zealot",
    type: "archetype",
    img: "systems/weight-of-ruin/assets/icons/archetypes/zealot.webp",
    system: {
      description: "<p>Servants of faith, wielders of divine authority, and hunters of the unholy.</p><p>Zealots draw power from conviction. Whether they serve the established Church, follow a heretical path, or dedicate themselves to destroying the enemies of faith, they channel belief into tangible effect. In a world where gods are silent and miracles are suspect, Zealots are the anchors of certainty—or the agents of zealous destruction.</p>",
      rollValue: 1,
      attributeBonuses: {
        strength: 0,
        fortitude: 0,
        agility: 0,
        awareness: 0,
        resolve: 1,
        persona: 1,
        ingenuity: 0,
        expertise: 0
      },
      startingWitchsight: 0,
      subtypes: [
        {
          name: "Heretic",
          description: "<p>Forbidden knowledge, false piety, twisted miracles</p>",
          features: [],
          signatureTalents: ["Forbidden Lore", "False Faith", "Dark Miracle"]
        },
        {
          name: "Inquisitor",
          description: "<p>Extracting truth, condemning the guilty, piercing deception</p>",
          features: [],
          signatureTalents: ["Interrogation", "Judgment", "Witch Sight"]
        },
        {
          name: "Paladin",
          description: "<p>Holy warfare, protecting the innocent, divine might</p>",
          features: [],
          signatureTalents: ["Holy Champion", "Divine Mount", "Oath of Protection"]
        },
        {
          name: "Witch Hunter",
          description: "<p>Destroying spellcasters, suppressing magic, tracking the tainted</p>",
          features: [],
          signatureTalents: ["Mage Slayer", "Null Zone", "Smell of Sin"]
        }
      ],
      suggestedSkills: ["Religion", "Persuasion", "Medicine", "Intimidation", "Leadership"],
      talentAccess: {
        universal: true,
        shared: [],
        restricted: []
      },
      startingTalents: [],
      role: {
        combat: "Support and spiritual warfare",
        exploration: "Divine guidance and protection",
        social: "Religious authority and moral leadership",
        magic: "Divine miracles and blessings"
      },
      lpAward: 25
    }
  },
  {
    name: "Thaumaturge",
    type: "archetype",
    img: "systems/weight-of-ruin/assets/icons/archetypes/thaumaturge.webp",
    system: {
      description: "<p>Those who pierce the Veil and shape reality through will and word.</p><p>Thaumaturges wield sorcery—the dangerous art of imposing their will directly upon the fabric of existence. They have Witchsight, the ability to perceive the Whispering Veil, and they have learned to reach through it. This power comes at a cost; every Thaumaturge walks a path toward corruption, and only discipline, luck, or early death prevents the final transformation.</p>",
      rollValue: 2,
      attributeBonuses: {
        strength: 0,
        fortitude: 0,
        agility: 0,
        awareness: 1,
        resolve: 0,
        persona: 0,
        ingenuity: 1,
        expertise: 0
      },
      startingWitchsight: 2,
      subtypes: [
        {
          name: "Druid",
          description: "<p>Natural magic, animal forms, plant manipulation</p>",
          features: [],
          signatureTalents: ["Wild Shape", "Nature's Ally", "Verdant Touch"]
        },
        {
          name: "Magus",
          description: "<p>Combat sorcery, spell-blade fusion, arcane warfare</p>",
          features: [],
          signatureTalents: ["Spell Combat", "Arcane Armor", "Spellstrike"]
        },
        {
          name: "Theurgist",
          description: "<p>Divine pacts, sacred geometry, channeling higher powers</p>",
          features: [],
          signatureTalents: ["Divine Pact", "Sacred Geometry", "Channel Divinity"]
        },
        {
          name: "Witch",
          description: "<p>Curses, potions, coven magic</p>",
          features: [],
          signatureTalents: ["Hex", "Brew Potion", "Coven Magic"]
        }
      ],
      suggestedSkills: ["Spellcraft", "Arcane Lore", "Sense Magic", "Ritefocus", "Alchemy"],
      talentAccess: {
        universal: true,
        shared: [],
        restricted: []
      },
      startingTalents: [],
      role: {
        combat: "Arcane offense and defense",
        exploration: "Magical sensing and utility",
        social: "Mystical knowledge and influence",
        magic: "Primary spellcaster"
      },
      lpAward: 25
    }
  },
  {
    name: "Warrior",
    type: "archetype",
    img: "systems/weight-of-ruin/assets/icons/archetypes/warrior.webp",
    system: {
      description: "<p>Warriors, soldiers, and masters of violence in all its forms.</p><p>Warriors solve problems with steel, strength, and skill at arms. They are the backbone of any army and the edge of any blade. Some fight for honor, others for coin, still others for the sheer joy of battle. In a world where words often fail and gold runs out, the Warrior's skills are always in demand.</p>",
      rollValue: 3,
      attributeBonuses: {
        strength: 1,
        fortitude: 1,
        agility: 0,
        awareness: 0,
        resolve: 0,
        persona: 0,
        ingenuity: 0,
        expertise: 0
      },
      startingWitchsight: 0,
      subtypes: [
        {
          name: "Barbarian",
          description: "<p>Primal fury, savage resilience, instinctive combat</p>",
          features: [],
          signatureTalents: ["Berserker Rage", "Savage Resilience", "Primal Instinct"]
        },
        {
          name: "Captain",
          description: "<p>Inspiring troops, tactical command, leading from front</p>",
          features: [],
          signatureTalents: ["Rally the Troops", "Tactical Command", "Lead from Front"]
        },
        {
          name: "Knight",
          description: "<p>Mounted combat, chivalric honor, single combat</p>",
          features: [],
          signatureTalents: ["Mounted Combat", "Challenge", "Chivalric Resolve"]
        },
        {
          name: "Sellsword",
          description: "<p>Dirty fighting, survival, exploiting weakness</p>",
          features: [],
          signatureTalents: ["Dirty Fighting", "Survivor", "Opportunist"]
        }
      ],
      suggestedSkills: ["Swordplay", "Axecraft", "Polearms", "Shields", "Athletics", "Brawling"],
      talentAccess: {
        universal: true,
        shared: [],
        restricted: []
      },
      startingTalents: [],
      role: {
        combat: "Primary combatant and damage dealer",
        exploration: "Physical challenges and endurance",
        social: "Intimidation and military contacts",
        magic: "None"
      },
      lpAward: 25
    }
  },
  {
    name: "Rogue",
    type: "archetype",
    img: "systems/weight-of-ruin/assets/icons/archetypes/rogue.webp",
    system: {
      description: "<p>Thieves, scouts, assassins, and those who walk in shadows.</p><p>Rogues operate outside the bounds that constrain others. They see locks as suggestions, guards as obstacles, and rules as opportunities. Whether stealing secrets, tracking prey, or ending lives quietly, Rogues value skill, stealth, and the element of surprise. They are rarely the strongest, but they are often the most effective.</p>",
      rollValue: 4,
      attributeBonuses: {
        strength: 0,
        fortitude: 0,
        agility: 1,
        awareness: 0,
        resolve: 0,
        persona: 0,
        ingenuity: 1,
        expertise: 0
      },
      startingWitchsight: 0,
      subtypes: [
        {
          name: "Assassin",
          description: "<p>Lethal strikes, vanishing after kills, poison craft</p>",
          features: [],
          signatureTalents: ["Death Strike", "Vanish", "Poison Master"]
        },
        {
          name: "Bounty Hunter",
          description: "<p>Tracking targets, capturing alive, relentless pursuit</p>",
          features: [],
          signatureTalents: ["Mark Prey", "Incapacitate", "Relentless Pursuit"]
        },
        {
          name: "Ranger",
          description: "<p>Wilderness mastery, hunting, animal kinship</p>",
          features: [],
          signatureTalents: ["Favored Terrain", "Hunter's Quarry", "Wild Empathy"]
        },
        {
          name: "Thief",
          description: "<p>Locks, climbing, escaping pursuit</p>",
          features: [],
          signatureTalents: ["Master Locksmith", "Second-Story Work", "Getaway"]
        }
      ],
      suggestedSkills: ["Stealth", "Sleight of Hand", "Lockpicking", "Traps", "Insight", "Streetwise"],
      talentAccess: {
        universal: true,
        shared: [],
        restricted: []
      },
      startingTalents: [],
      role: {
        combat: "Precision strikes and flanking",
        exploration: "Stealth and infiltration",
        social: "Deception and underworld contacts",
        magic: "None"
      },
      lpAward: 25
    }
  },
  {
    name: "Sage",
    type: "archetype",
    img: "systems/weight-of-ruin/assets/icons/archetypes/sage.webp",
    system: {
      description: "<p>Scholars, healers, and keepers of forbidden knowledge.</p><p>Sages understand that knowledge is power—often more power than sword or spell. They study the natural world, the human body, ancient texts, and dangerous secrets. Some heal, some teach, some create, and some delve into mysteries best left undisturbed. The Sage's weapon is their mind; their battlefield is the library, the laboratory, and the lecture hall.</p>",
      rollValue: 5,
      attributeBonuses: {
        strength: 0,
        fortitude: 0,
        agility: 0,
        awareness: 0,
        resolve: 0,
        persona: 0,
        ingenuity: 1,
        expertise: 1
      },
      startingWitchsight: 0,
      subtypes: [
        {
          name: "Alchemist",
          description: "<p>Transmutation, bombs, self-enhancement mutagens</p>",
          features: [],
          signatureTalents: ["Transmutation", "Bomb Craft", "Mutagen"]
        },
        {
          name: "Skald",
          description: "<p>Battle inspiration, heroic tales, vocal power</p>",
          features: [],
          signatureTalents: ["Battle Hymn", "Saga of Heroes", "Voice of Power"]
        },
        {
          name: "Occultist",
          description: "<p>Spirit communication, forbidden lore, dark bargains</p>",
          features: [],
          signatureTalents: ["Spirit Sight", "Forbidden Knowledge", "Dark Bargain"]
        },
        {
          name: "Physician",
          description: "<p>Surgery, triage, anatomical expertise</p>",
          features: [],
          signatureTalents: ["Surgeon", "Triage", "Anatomical Knowledge"]
        }
      ],
      suggestedSkills: ["Medicine", "History", "Arcane Lore", "Alchemy", "Investigation", "Apothecary"],
      talentAccess: {
        universal: true,
        shared: [],
        restricted: []
      },
      startingTalents: [],
      role: {
        combat: "Support and alchemical items",
        exploration: "Knowledge and investigation",
        social: "Academic and scholarly contacts",
        magic: "Alchemy and occult knowledge"
      },
      lpAward: 25
    }
  }
];

export default ARCHETYPES_DATA;
