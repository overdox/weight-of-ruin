/**
 * Skills Compendium Data
 * All skills organized by category
 * Martial skills add to Prowess for attack pools:
 * - Arms + WP (Weapon Prowess) = melee attack pool
 * - Marksmanship + BP (Ballistic Prowess) = ranged attack pool
 * - Brawling + UP (Unarmed Prowess) = unarmed attack pool
 */

export const SKILLS_DATA = [
  // ============ MARTIAL SKILLS (3) ============
  // These skills add directly to Prowess for attack dice pools
  {
    name: "Arms",
    type: "skill",
    img: "icons/skills/melee/hand-grip-sword-red.webp",
    system: {
      description: "Training with melee weapons. Each rank adds +1 to Weapon Prowess attack pools.",
      attribute: "strength",
      category: "martial",
      subcategory: null,
      rank: 0,
      specialization: "",
      prowess: "weaponProwess"
    }
  },
  {
    name: "Marksmanship",
    type: "skill",
    img: "icons/skills/ranged/arrow-flying-white-blue.webp",
    system: {
      description: "Training with ranged weapons. Each rank adds +1 to Ballistic Prowess attack pools.",
      attribute: "awareness",
      category: "martial",
      subcategory: null,
      rank: 0,
      specialization: "",
      prowess: "ballisticProwess"
    }
  },
  {
    name: "Brawling",
    type: "skill",
    img: "icons/skills/melee/unarmed-punch-fist.webp",
    system: {
      description: "Training in unarmed combat, grappling, and improvised weapons. Each rank adds +1 to Unarmed Prowess attack pools.",
      attribute: "strength",
      category: "martial",
      subcategory: null,
      rank: 0,
      specialization: "",
      prowess: "unarmedProwess"
    }
  },

  // ============ PHYSICAL SKILLS (10) ============
  // Movement (6)
  {
    name: "Athletics",
    type: "skill",
    img: "icons/skills/movement/figure-running-gray.webp",
    system: {
      description: "Running, jumping, lifting, raw physical exertion",
      attribute: "strength",
      category: "physical",
      subcategory: "movement",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Climb",
    type: "skill",
    img: "icons/skills/movement/arrow-upward-yellow.webp",
    system: {
      description: "Scaling walls, cliffs, trees, rigging",
      attribute: "strength",
      category: "physical",
      subcategory: "movement",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Swim",
    type: "skill",
    img: "icons/skills/movement/feet-winged-boots-blue.webp",
    system: {
      description: "Swimming, diving, resisting currents",
      attribute: "fortitude",
      category: "physical",
      subcategory: "movement",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Ride",
    type: "skill",
    img: "icons/environment/creatures/horse-brown.webp",
    system: {
      description: "Mounted movement and mounted combat",
      attribute: "agility",
      category: "physical",
      subcategory: "movement",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Animal Handling",
    type: "skill",
    img: "icons/environment/creatures/horse-white.webp",
    system: {
      description: "Training, calming, and working with animals",
      attribute: "persona",
      category: "physical",
      subcategory: "movement",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Acrobatics",
    type: "skill",
    img: "icons/skills/movement/ball-spinning-blue.webp",
    system: {
      description: "Tumbling, balance, controlled falls",
      attribute: "agility",
      category: "physical",
      subcategory: "movement",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Dodge",
    type: "skill",
    img: "icons/skills/movement/arrow-upward-white.webp",
    system: {
      description: "Evading attacks, reflexive avoidance",
      attribute: "agility",
      category: "physical",
      subcategory: "movement",
      rank: 0,
      specialization: ""
    }
  },
  // Subterfuge (4)
  {
    name: "Stealth",
    type: "skill",
    img: "icons/skills/social/theft-pickpocket-bribery-brown.webp",
    system: {
      description: "Moving unseen and unheard",
      attribute: "agility",
      category: "physical",
      subcategory: "subterfuge",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Sleight of Hand",
    type: "skill",
    img: "icons/skills/social/theft-pickpocket-bribery-brown.webp",
    system: {
      description: "Pickpocketing, palming, misdirection",
      attribute: "agility",
      category: "physical",
      subcategory: "subterfuge",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Lockpicking",
    type: "skill",
    img: "icons/tools/hand/lockpicks-steel-grey.webp",
    system: {
      description: "Opening locks without keys",
      attribute: "agility",
      category: "physical",
      subcategory: "subterfuge",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Traps",
    type: "skill",
    img: "icons/environment/traps/trap-jaw-steel.webp",
    system: {
      description: "Setting, detecting, and disarming traps",
      attribute: "ingenuity",
      category: "physical",
      subcategory: "subterfuge",
      rank: 0,
      specialization: ""
    }
  },

  // ============ SOCIAL SKILLS (12) ============
  {
    name: "Persuasion",
    type: "skill",
    img: "icons/skills/social/diplomacy-handshake-yellow.webp",
    system: {
      description: "Convincing through reason and appeal",
      attribute: "persona",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Intimidation",
    type: "skill",
    img: "icons/skills/social/intimidation-impressing.webp",
    system: {
      description: "Coercing through threat and presence",
      attribute: "resolve",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Deception",
    type: "skill",
    img: "icons/skills/social/peace-luck-insult.webp",
    system: {
      description: "Lying, feigning, misleading",
      attribute: "persona",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Charm",
    type: "skill",
    img: "icons/skills/social/diplomacy-handshake.webp",
    system: {
      description: "Making favorable impressions, seduction",
      attribute: "persona",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Diplomacy",
    type: "skill",
    img: "icons/skills/social/diplomacy-peace-alliance.webp",
    system: {
      description: "Formal negotiation, treaties, court politics",
      attribute: "expertise",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Leadership",
    type: "skill",
    img: "icons/skills/social/wave-halt-stop.webp",
    system: {
      description: "Inspiring, commanding, rallying others",
      attribute: "resolve",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Etiquette",
    type: "skill",
    img: "icons/skills/social/diplomacy-unity-alliance.webp",
    system: {
      description: "Proper conduct in social and formal settings",
      attribute: "expertise",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Bargaining",
    type: "skill",
    img: "icons/commodities/currency/coins-plain-stack-gold-yellow.webp",
    system: {
      description: "Haggling, trade negotiation, deal-making",
      attribute: "persona",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Insight",
    type: "skill",
    img: "icons/magic/perception/eye-ringed-green.webp",
    system: {
      description: "Reading intentions, detecting lies, empathy",
      attribute: "awareness",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Performance",
    type: "skill",
    img: "icons/tools/instruments/harp-lap-brown.webp",
    system: {
      description: "Acting, singing, storytelling, music",
      attribute: "persona",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Streetwise",
    type: "skill",
    img: "icons/environment/settlement/city-entrance.webp",
    system: {
      description: "Navigating criminal underworld, finding contacts",
      attribute: "ingenuity",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Carousing",
    type: "skill",
    img: "icons/consumables/drinks/alcohol-beer-mug-yellow.webp",
    system: {
      description: "Drinking, gambling, working a crowd",
      attribute: "fortitude",
      category: "social",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },

  // ============ KNOWLEDGE SKILLS (12) ============
  {
    name: "History",
    type: "skill",
    img: "icons/sundries/scrolls/scroll-bound-brown-tan.webp",
    system: {
      description: "Past events, lineages, fallen empires",
      attribute: "expertise",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Religion",
    type: "skill",
    img: "icons/commodities/treasure/token-gold-cross.webp",
    system: {
      description: "Faiths, theology, religious practices",
      attribute: "expertise",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Arcane Lore",
    type: "skill",
    img: "icons/sundries/books/book-worn-blue.webp",
    system: {
      description: "Magical theory, occult knowledge, the Veil",
      attribute: "expertise",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Nature Lore",
    type: "skill",
    img: "icons/environment/wilderness/tree-oak.webp",
    system: {
      description: "Plants, animals, weather, wilderness",
      attribute: "expertise",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Medicine",
    type: "skill",
    img: "icons/tools/laboratory/mortar-powder-green.webp",
    system: {
      description: "Anatomy, treatment, surgery, diagnosis",
      attribute: "expertise",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Law",
    type: "skill",
    img: "icons/skills/social/trading-justice-scale-gold.webp",
    system: {
      description: "Legal codes, contracts, justice systems",
      attribute: "expertise",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Warfare",
    type: "skill",
    img: "icons/environment/people/infantry-army.webp",
    system: {
      description: "Tactics, strategy, siegecraft, military history",
      attribute: "expertise",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Geography",
    type: "skill",
    img: "icons/sundries/documents/document-sealed-brown-red.webp",
    system: {
      description: "Lands, regions, trade routes, cartography",
      attribute: "expertise",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Heraldry",
    type: "skill",
    img: "icons/sundries/flags/banner-flag-white.webp",
    system: {
      description: "Noble houses, crests, lineages, political ties",
      attribute: "expertise",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Beast Lore",
    type: "skill",
    img: "icons/creatures/abilities/wolf-howl-moon-white.webp",
    system: {
      description: "Monsters, supernatural creatures, weaknesses",
      attribute: "expertise",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Navigation",
    type: "skill",
    img: "icons/tools/navigation/compass-brass-blue-red.webp",
    system: {
      description: "Wayfinding by stars, maps, landmarks",
      attribute: "ingenuity",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Weather Sense",
    type: "skill",
    img: "icons/magic/water/projectile-ice-snowflake.webp",
    system: {
      description: "Predicting weather patterns, reading the sky",
      attribute: "awareness",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Engineering",
    type: "skill",
    img: "icons/tools/hand/hammer-and-nail.webp",
    system: {
      description: "Construction, siege engines, mechanical devices",
      attribute: "ingenuity",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Investigation",
    type: "skill",
    img: "icons/tools/scribal/magnifying-glass.webp",
    system: {
      description: "Searching, deduction, piecing together clues",
      attribute: "ingenuity",
      category: "knowledge",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },

  // ============ CRAFT SKILLS (8) ============
  {
    name: "Smithing",
    type: "skill",
    img: "icons/tools/smithing/anvil.webp",
    system: {
      description: "Forging metal—weapons, armor, tools",
      attribute: "strength",
      category: "craft",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Leatherworking",
    type: "skill",
    img: "icons/commodities/leather/fur-pelt-brown.webp",
    system: {
      description: "Tanning, crafting leather goods and armor",
      attribute: "agility",
      category: "craft",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Tailoring",
    type: "skill",
    img: "icons/commodities/cloth/thread-and-needle.webp",
    system: {
      description: "Clothing, cloth armor, fabric work",
      attribute: "agility",
      category: "craft",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Carpentry",
    type: "skill",
    img: "icons/skills/trades/construction-carpentry-hammer.webp",
    system: {
      description: "Woodworking, construction, shipbuilding",
      attribute: "strength",
      category: "craft",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Alchemy",
    type: "skill",
    img: "icons/tools/laboratory/vials-blue-pink.webp",
    system: {
      description: "Potions, compounds, chemical processes",
      attribute: "ingenuity",
      category: "craft",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Apothecary",
    type: "skill",
    img: "icons/tools/laboratory/bowl-herbs-green.webp",
    system: {
      description: "Medicines, salves, herbal remedies",
      attribute: "expertise",
      category: "craft",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Jewelcraft",
    type: "skill",
    img: "icons/commodities/gems/gem-shattered-orange.webp",
    system: {
      description: "Gems, precious metals, fine detail work",
      attribute: "agility",
      category: "craft",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },
  {
    name: "Cooking",
    type: "skill",
    img: "icons/tools/cooking/pot-camping-iron-black.webp",
    system: {
      description: "Preparing food, preservation, nutrition",
      attribute: "ingenuity",
      category: "craft",
      subcategory: "",
      rank: 0,
      specialization: ""
    }
  },

  // ============ THAUMATURGY SKILLS (4) ============
  // Note: These skills use Witchsight + Skill for rolls, but attribute field
  // stores the secondary attribute used when Witchsight is not available
  {
    name: "Spellcraft",
    type: "skill",
    img: "icons/magic/symbols/rune-sigil-green-purple.webp",
    system: {
      description: "Casting Sorcery—immediate, personal magic",
      attribute: "resolve",
      category: "thaumaturgy",
      subcategory: "",
      rank: 0,
      specialization: "",
      requiresWitchsight: true
    }
  },
  {
    name: "Ritefocus",
    type: "skill",
    img: "icons/magic/symbols/runes-carved-stone-purple.webp",
    system: {
      description: "Performing rituals—prepared, lasting magic",
      attribute: "ingenuity",
      category: "thaumaturgy",
      subcategory: "",
      rank: 0,
      specialization: "",
      requiresWitchsight: true
    }
  },
  {
    name: "Necromancy",
    type: "skill",
    img: "icons/magic/death/bones-crossed-gray.webp",
    system: {
      description: "Working death magic—transgressive, costly",
      attribute: "resolve",
      category: "thaumaturgy",
      subcategory: "",
      rank: 0,
      specialization: "",
      requiresWitchsight: true
    }
  },
  {
    name: "Sense Magic",
    type: "skill",
    img: "icons/magic/perception/eye-slit-pink.webp",
    system: {
      description: "Detecting magical auras, identifying enchantments",
      attribute: "awareness",
      category: "thaumaturgy",
      subcategory: "",
      rank: 0,
      specialization: "",
      requiresWitchsight: true
    }
  }
];

export default SKILLS_DATA;
