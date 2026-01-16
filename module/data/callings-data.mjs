/**
 * The Weight of Ruin - Callings Data
 * 20 Callings (4 per Archetype) - formerly known as Subtypes
 *
 * Zealot: Heretic, Inquisitor, Paladin, Witch Hunter
 * Thaumaturge: Druid, Magus, Theurgist, Witch
 * Warrior: Barbarian, Captain, Knight, Sellsword
 * Rogue: Assassin, Bounty Hunter, Ranger, Thief
 * Sage: Alchemist, Skald, Occultist, Physician
 */

export const CALLINGS_DATA = [
  // ========================================
  // ZEALOT CALLINGS
  // ========================================
  {
    name: "Heretic",
    img: "icons/magic/unholy/hand-claw-glow-red.webp",
    type: "calling",
    system: {
      description: "<p>Those who walk the line between faith and forbidden knowledge. Heretics have glimpsed truths that the orthodox hierarchy would condemn, learning secret doctrines and practicing twisted miracles that blur the boundary between divine blessing and unholy power.</p>",
      archetype: "zealot",
      focus: "Forbidden knowledge, false piety, twisted miracles",
      signatureTalents: [
        { name: "Forbidden Lore", description: "Access to knowledge deemed heretical by the orthodox church." },
        { name: "False Faith", description: "Ability to mask your true beliefs and pass among the faithful." },
        { name: "Dark Miracle", description: "Channel divine power through unorthodox or forbidden means." }
      ],
      features: [],
      suggestedSkills: ["Religion", "Deception", "Arcane Lore", "Persuasion"],
      startingEquipment: [],
      flavorText: "<p>The truth is rarely pure and never simple. You have learned this lesson well, finding wisdom in texts the church would burn and power in prayers they would condemn.</p>"
    }
  },
  {
    name: "Inquisitor",
    img: "icons/skills/social/intimidation-impersonate.webp",
    type: "calling",
    system: {
      description: "<p>Agents of divine justice who root out heresy, corruption, and the taint of dark magic. Inquisitors are granted authority to question, judge, and punish those who threaten the faithful, wielding both spiritual and temporal power in service to their church.</p>",
      archetype: "zealot",
      focus: "Extracting truth, condemning the guilty, piercing deception",
      signatureTalents: [
        { name: "Interrogation", description: "Expert techniques for extracting truth from the unwilling." },
        { name: "Judgment", description: "Pronounce divine judgment upon the guilty, with tangible effects." },
        { name: "Witch Sight", description: "Perceive the taint of dark magic and supernatural corruption." }
      ],
      features: [],
      suggestedSkills: ["Intimidation", "Insight", "Religion", "Investigation"],
      startingEquipment: [],
      flavorText: "<p>No one expects the faithful servant until they stand before you, their sins laid bare. You are the blade of divine justice, and none escape your scrutiny.</p>"
    }
  },
  {
    name: "Paladin",
    img: "icons/weapons/swords/sword-gold-holy.webp",
    type: "calling",
    system: {
      description: "<p>Holy warriors who combine martial prowess with divine conviction. Paladins are champions of their faith, sworn to protect the innocent and destroy the enemies of their god. Their oaths bind them to codes of honor that grant them supernatural might.</p>",
      archetype: "zealot",
      focus: "Holy warfare, protecting the innocent, divine might",
      signatureTalents: [
        { name: "Holy Champion", description: "Channel divine power to enhance your combat abilities." },
        { name: "Divine Mount", description: "Bond with a blessed war horse or other sacred beast." },
        { name: "Oath of Protection", description: "Swear an oath that grants you power to defend others." }
      ],
      features: [],
      suggestedSkills: ["Religion", "Athletics", "Leadership", "Medicine"],
      startingEquipment: [],
      flavorText: "<p>By steel and by faith, you stand against the darkness. Your oath is your shield, your conviction your sword. The innocent need fear nothing while you draw breath.</p>"
    }
  },
  {
    name: "Witch Hunter",
    img: "icons/magic/fire/flame-burning-skull-purple.webp",
    type: "calling",
    system: {
      description: "<p>Specialists in tracking and destroying those who wield dark magic. Witch Hunters have learned to sense the corruption of sorcery and developed techniques to suppress and counter magical threats. They are feared by spellcasters throughout the realm.</p>",
      archetype: "zealot",
      focus: "Destroying spellcasters, suppressing magic, tracking the tainted",
      signatureTalents: [
        { name: "Mage Slayer", description: "Devastating attacks against spellcasters and supernatural creatures." },
        { name: "Null Zone", description: "Create an area where magic is suppressed or fails entirely." },
        { name: "Smell of Sin", description: "Detect the presence of dark magic and corruption by scent." }
      ],
      features: [],
      suggestedSkills: ["Investigation", "Tracking", "Intimidation", "Religion"],
      startingEquipment: [],
      flavorText: "<p>You know the stench of the Veil, the telltale signs of those who have bargained away their humanity. When you find them—and you always do—there will be a reckoning.</p>"
    }
  },

  // ========================================
  // THAUMATURGE CALLINGS
  // ========================================
  {
    name: "Druid",
    img: "icons/magic/nature/tree-spirit-entangled-green.webp",
    type: "calling",
    system: {
      description: "<p>Wielders of natural magic who draw power from the living world. Druids can assume animal forms, command the forces of nature, and commune with the spirits of wild places. They often stand apart from civilization, serving as guardians of the natural order.</p>",
      archetype: "thaumaturge",
      focus: "Natural magic, animal forms, plant manipulation",
      signatureTalents: [
        { name: "Wild Shape", description: "Transform into animals and natural creatures." },
        { name: "Nature's Ally", description: "Call upon beasts and spirits of the wild to aid you." },
        { name: "Verdant Touch", description: "Manipulate plants and accelerate natural growth." }
      ],
      features: [],
      suggestedSkills: ["Sense Magic", "Survival", "Nature Lore", "Animal Handling"],
      startingEquipment: [],
      flavorText: "<p>The wild speaks to you in ways the city-dwellers cannot fathom. You are the bridge between civilization and the untamed world, guardian of ancient groves and forgotten places.</p>"
    }
  },
  {
    name: "Magus",
    img: "icons/weapons/swords/sword-guard-purple.webp",
    type: "calling",
    system: {
      description: "<p>Battle mages who blend swordplay with sorcery. The Magus has mastered the art of weaving spells through weapon strikes, becoming a deadly fusion of warrior and wizard. They are equally dangerous at sword's reach or spell's range.</p>",
      archetype: "thaumaturge",
      focus: "Combat sorcery, spell-blade fusion, arcane warfare",
      signatureTalents: [
        { name: "Spell Combat", description: "Cast spells while fighting with weapons." },
        { name: "Arcane Armor", description: "Weave magical protection that doesn't impede spellcasting." },
        { name: "Spellstrike", description: "Channel spells through your weapon strikes." }
      ],
      features: [],
      suggestedSkills: ["Spellcraft", "Swordplay", "Arcane Lore", "Athletics"],
      startingEquipment: [],
      flavorText: "<p>Where others see a contradiction, you found synthesis. Your blade is your focus, your spells are your edge. Let the purists debate while you win battles.</p>"
    }
  },
  {
    name: "Theurgist",
    img: "icons/magic/holy/chalice-glowing-gold-water.webp",
    type: "calling",
    system: {
      description: "<p>Sorcerers who bargain with divine or quasi-divine entities for their power. Theurgists walk a dangerous path, channeling forces beyond mortal comprehension through pacts and sacred geometries. Their magic is powerful but bound by the terms of their agreements.</p>",
      archetype: "thaumaturge",
      focus: "Divine pacts, sacred geometry, channeling higher powers",
      signatureTalents: [
        { name: "Divine Pact", description: "Form a pact with a higher power to gain magical abilities." },
        { name: "Sacred Geometry", description: "Draw power from mathematical and mystical patterns." },
        { name: "Channel Divinity", description: "Serve as a conduit for divine or spiritual energy." }
      ],
      features: [],
      suggestedSkills: ["Spellcraft", "Religion", "Arcane Lore", "History"],
      startingEquipment: [],
      flavorText: "<p>The gods—or things that call themselves gods—answer when you call. Whether blessing or curse, you have opened doors that cannot be closed.</p>"
    }
  },
  {
    name: "Witch",
    img: "icons/consumables/potions/potion-bottle-corked-green.webp",
    type: "calling",
    system: {
      description: "<p>Practitioners of old magic, wielding curses, brewing potions, and working spells passed down through generations. Witches draw power from tradition and intuition rather than formal study, and often form covens to amplify their abilities.</p>",
      archetype: "thaumaturge",
      focus: "Curses, potions, coven magic",
      signatureTalents: [
        { name: "Hex", description: "Lay curses and ill fortune upon your enemies." },
        { name: "Brew Potion", description: "Create magical potions, salves, and elixirs." },
        { name: "Coven Magic", description: "Draw power from or contribute to a magical collective." }
      ],
      features: [],
      suggestedSkills: ["Spellcraft", "Alchemy", "Herbalism", "Insight"],
      startingEquipment: [],
      flavorText: "<p>Your grandmother knew, and her grandmother before her. The old ways have power that the academies will never understand. Let them call you witch—you wear the name with pride.</p>"
    }
  },

  // ========================================
  // WARRIOR CALLINGS
  // ========================================
  {
    name: "Barbarian",
    img: "icons/skills/melee/strike-axe-blood-red.webp",
    type: "calling",
    system: {
      description: "<p>Warriors who channel primal fury into devastating combat prowess. Barbarians fight with savage intensity, drawing on reserves of rage that make them nearly unstoppable in battle. They are often outsiders to \"civilized\" lands, following their own codes of honor.</p>",
      archetype: "warrior",
      focus: "Primal fury, savage resilience, instinctive combat",
      signatureTalents: [
        { name: "Berserker Rage", description: "Enter a state of battle fury that enhances your combat abilities." },
        { name: "Savage Resilience", description: "Shrug off wounds that would fell lesser warriors." },
        { name: "Primal Instinct", description: "Rely on instinct to sense danger and react faster than thought." }
      ],
      features: [],
      suggestedSkills: ["Athletics", "Intimidation", "Survival", "Unarmed Combat"],
      startingEquipment: [],
      flavorText: "<p>Let them build their walls and forge their chains of law. When the red haze descends, nothing stands before you. This is the only truth you need.</p>"
    }
  },
  {
    name: "Captain",
    img: "icons/environment/people/spearfighter.webp",
    type: "calling",
    system: {
      description: "<p>Leaders of warriors who inspire through example and tactical acumen. Captains command respect on the battlefield, directing troops with precision while fighting alongside them. Their presence turns rabbles into fighting forces.</p>",
      archetype: "warrior",
      focus: "Inspiring troops, tactical command, leading from front",
      signatureTalents: [
        { name: "Rally the Troops", description: "Inspire allies to fight harder and resist fear." },
        { name: "Tactical Command", description: "Direct allies' actions for coordinated attacks." },
        { name: "Lead from Front", description: "Gain bonuses when fighting alongside those you command." }
      ],
      features: [],
      suggestedSkills: ["Leadership", "Tactics", "Persuasion", "History"],
      startingEquipment: [],
      flavorText: "<p>A soldier alone is a weapon. A soldier inspired is an army. You have learned that the greatest power lies not in your own sword arm, but in your ability to make others believe.</p>"
    }
  },
  {
    name: "Knight",
    img: "icons/equipment/shield/heater-crystal-blue.webp",
    type: "calling",
    system: {
      description: "<p>Noble warriors bound by codes of chivalry and honor. Knights are often of noble birth, trained from youth in the arts of mounted combat and single combat. Their status brings both privilege and obligation.</p>",
      archetype: "warrior",
      focus: "Mounted combat, chivalric honor, single combat",
      signatureTalents: [
        { name: "Mounted Combat", description: "Fight with devastating effectiveness from horseback." },
        { name: "Challenge", description: "Issue formal challenges that compel honorable response." },
        { name: "Chivalric Resolve", description: "Draw strength from your code of honor." }
      ],
      features: [],
      suggestedSkills: ["Riding", "Etiquette", "Leadership", "Heraldry"],
      startingEquipment: [],
      flavorText: "<p>Your sword is pledged, your honor your bond. In a world of treachery, you stand for something older and perhaps nobler—though only the worthy may judge.</p>"
    }
  },
  {
    name: "Sellsword",
    img: "icons/weapons/swords/sword-worn.webp",
    type: "calling",
    system: {
      description: "<p>Professional warriors who fight for coin rather than cause. Sellswords have no illusions about glory—war is work, and they're very good at their job. They fight dirty when needed, survive against the odds, and always make sure they get paid.</p>",
      archetype: "warrior",
      focus: "Dirty fighting, survival, exploiting weakness",
      signatureTalents: [
        { name: "Dirty Fighting", description: "Use underhanded tactics to gain advantage in combat." },
        { name: "Survivor", description: "Escape situations that should be fatal." },
        { name: "Opportunist", description: "Exploit openings in enemy defenses ruthlessly." }
      ],
      features: [],
      suggestedSkills: ["Streetwise", "Intimidation", "Gambling", "Athletics"],
      startingEquipment: [],
      flavorText: "<p>Honor doesn't pay the bills. You've learned what works in the mud and blood of real battle, and you're still standing. That's all that matters.</p>"
    }
  },

  // ========================================
  // ROGUE CALLINGS
  // ========================================
  {
    name: "Assassin",
    img: "icons/weapons/daggers/dagger-curved-engraved-red.webp",
    type: "calling",
    system: {
      description: "<p>Masters of the killing art who strike from shadows and vanish without trace. Assassins are trained to eliminate specific targets through stealth, poison, and precision violence. Their services command high prices and higher discretion.</p>",
      archetype: "rogue",
      focus: "Lethal strikes, vanishing after kills, poison craft",
      signatureTalents: [
        { name: "Death Strike", description: "Devastating attacks against unaware or helpless targets." },
        { name: "Vanish", description: "Disappear from sight even in the midst of combat." },
        { name: "Poison Master", description: "Create and apply deadly poisons with expertise." }
      ],
      features: [],
      suggestedSkills: ["Stealth", "Alchemy", "Disguise", "Streetwise"],
      startingEquipment: [],
      flavorText: "<p>Death comes for everyone. You simply help it arrive a little sooner for those who have earned it—or those who can afford your price.</p>"
    }
  },
  {
    name: "Bounty Hunter",
    img: "icons/tools/hunting/trap-jaw-steel.webp",
    type: "calling",
    system: {
      description: "<p>Professional hunters of men who track down fugitives for reward. Bounty Hunters combine investigative skills with the ability to capture or kill their quarry. They operate in the grey areas of law, licensed to do what others cannot.</p>",
      archetype: "rogue",
      focus: "Tracking targets, capturing alive, relentless pursuit",
      signatureTalents: [
        { name: "Mark Prey", description: "Designate a target and gain bonuses to track and fight them." },
        { name: "Incapacitate", description: "Subdue targets without killing them." },
        { name: "Relentless Pursuit", description: "Track targets across any terrain, never losing the trail." }
      ],
      features: [],
      suggestedSkills: ["Tracking", "Investigation", "Streetwise", "Intimidation"],
      startingEquipment: [],
      flavorText: "<p>Everyone leaves a trail. Every debt comes due. You are the instrument of that reckoning, patient as stone and inevitable as dawn.</p>"
    }
  },
  {
    name: "Ranger",
    img: "icons/weapons/bows/longbow-leather-green.webp",
    type: "calling",
    system: {
      description: "<p>Wilderness experts who blend martial skill with nature craft. Rangers are at home in the wild places where civilization ends, tracking prey, navigating treacherous terrain, and surviving where others would perish.</p>",
      archetype: "rogue",
      focus: "Wilderness mastery, hunting, animal kinship",
      signatureTalents: [
        { name: "Favored Terrain", description: "Gain significant advantages in your chosen environment." },
        { name: "Hunter's Quarry", description: "Mark prey and track them with supernatural precision." },
        { name: "Wild Empathy", description: "Communicate with and influence wild animals." }
      ],
      features: [],
      suggestedSkills: ["Survival", "Tracking", "Archery", "Animal Handling"],
      startingEquipment: [],
      flavorText: "<p>The wild is neither cruel nor kind—it simply is. You have learned its ways, earned your place in its order. Let others cling to their cities.</p>"
    }
  },
  {
    name: "Thief",
    img: "icons/tools/hand/lockpicks-steel-grey.webp",
    type: "calling",
    system: {
      description: "<p>Masters of stealth and acquisition who take what isn't theirs. Thieves range from desperate cutpurses to master burglars, but all share skills in bypassing security, moving unseen, and making quick escapes when things go wrong.</p>",
      archetype: "rogue",
      focus: "Locks, climbing, escaping pursuit",
      signatureTalents: [
        { name: "Master Locksmith", description: "Open any lock given sufficient time and tools." },
        { name: "Second-Story Work", description: "Scale walls and navigate rooftops with ease." },
        { name: "Getaway", description: "Escape pursuit through speed, misdirection, and luck." }
      ],
      features: [],
      suggestedSkills: ["Lockpicking", "Sleight of Hand", "Stealth", "Acrobatics"],
      startingEquipment: [],
      flavorText: "<p>Locks are puzzles. Guards are obstacles. Owners are just people who haven't realized they're holding your property. Yet.</p>"
    }
  },

  // ========================================
  // SAGE CALLINGS
  // ========================================
  {
    name: "Alchemist",
    img: "icons/consumables/potions/potion-bottle-round-red.webp",
    type: "calling",
    system: {
      description: "<p>Masters of transformation who seek to understand and manipulate the fundamental nature of matter. Alchemists create potions, bombs, and mutagens, pushing the boundaries of natural law through careful experimentation and occasional explosions.</p>",
      archetype: "sage",
      focus: "Transmutation, bombs, self-enhancement mutagens",
      signatureTalents: [
        { name: "Transmutation", description: "Transform materials from one form to another." },
        { name: "Bomb Craft", description: "Create explosive concoctions with various effects." },
        { name: "Mutagen", description: "Brew elixirs that temporarily enhance your abilities." }
      ],
      features: [],
      suggestedSkills: ["Alchemy", "Apothecary", "Arcane Lore", "Investigation"],
      startingEquipment: [],
      flavorText: "<p>The universe is a puzzle, and you hold the pieces. Through fire and formula, you seek to unlock secrets older than civilization. The explosions are merely... educational.</p>"
    }
  },
  {
    name: "Skald",
    img: "icons/tools/instruments/lute-gold-tan.webp",
    type: "calling",
    system: {
      description: "<p>Warrior-poets who preserve history in song and inspire heroic deeds through their art. Skalds are valued as historians, entertainers, and battlefield motivators, wielding the power of story and song to shape the actions of those around them.</p>",
      archetype: "sage",
      focus: "Battle inspiration, heroic tales, vocal power",
      signatureTalents: [
        { name: "Battle Hymn", description: "Sing songs that inspire allies in combat." },
        { name: "Saga of Heroes", description: "Invoke legendary heroes to inspire great deeds." },
        { name: "Voice of Power", description: "Speak with supernatural force that compels action." }
      ],
      features: [],
      suggestedSkills: ["Performance", "History", "Persuasion", "Intimidation"],
      startingEquipment: [],
      flavorText: "<p>The song remembers when flesh forgets. You carry the weight of legends in your voice, and when you sing of heroes, heroes answer.</p>"
    }
  },
  {
    name: "Occultist",
    img: "icons/magic/symbols/runes-star-blue.webp",
    type: "calling",
    system: {
      description: "<p>Scholars of forbidden knowledge who probe the boundaries between worlds. Occultists seek truths hidden from common sight, communing with spirits and delving into mysteries that safer scholars avoid. Their knowledge is powerful but comes at a cost.</p>",
      archetype: "sage",
      focus: "Spirit communication, forbidden lore, dark bargains",
      signatureTalents: [
        { name: "Spirit Sight", description: "Perceive spirits and supernatural entities others cannot see." },
        { name: "Forbidden Knowledge", description: "Access to dangerous secrets and hidden truths." },
        { name: "Dark Bargain", description: "Strike deals with spirits and entities for power or information." }
      ],
      features: [],
      suggestedSkills: ["Arcane Lore", "Religion", "History", "Sense Magic"],
      startingEquipment: [],
      flavorText: "<p>The veil is thin for those who know where to look. You have gazed beyond and found answers—though sometimes the questions that follow are worse.</p>"
    }
  },
  {
    name: "Physician",
    img: "icons/tools/laboratory/bowl-herbs-green.webp",
    type: "calling",
    system: {
      description: "<p>Healers who understand the workings of the body through study and practice. Physicians can treat wounds, cure diseases, and perform surgeries that save lives others would consider lost. Their knowledge is both respected and feared.</p>",
      archetype: "sage",
      focus: "Surgery, triage, anatomical expertise",
      signatureTalents: [
        { name: "Surgeon", description: "Perform complex medical procedures under difficult conditions." },
        { name: "Triage", description: "Assess injuries quickly and prioritize treatment effectively." },
        { name: "Anatomical Knowledge", description: "Understanding of anatomy that aids both healing and harm." }
      ],
      features: [],
      suggestedSkills: ["Medicine", "Apothecary", "Investigation", "Insight"],
      startingEquipment: [],
      flavorText: "<p>The body is a mechanism, intricate and fragile. You have learned its workings, how to mend what is broken—and, when necessary, how to break what still functions.</p>"
    }
  }
];

/**
 * Get all callings for a specific archetype
 * @param {string} archetype - The archetype name (lowercase)
 * @returns {Array} Array of calling data objects
 */
export function getCallingsByArchetype(archetype) {
  return CALLINGS_DATA.filter(c => c.system.archetype === archetype.toLowerCase());
}

/**
 * Get a specific calling by name
 * @param {string} name - The calling name
 * @returns {Object|undefined} The calling data object or undefined
 */
export function getCallingByName(name) {
  return CALLINGS_DATA.find(c => c.name.toLowerCase() === name.toLowerCase());
}

/**
 * Get all calling names
 * @returns {Array} Array of calling names
 */
export function getAllCallingNames() {
  return CALLINGS_DATA.map(c => c.name);
}

/**
 * Get calling names grouped by archetype
 * @returns {Object} Object with archetype keys and arrays of calling names
 */
export function getCallingsGroupedByArchetype() {
  return {
    zealot: getCallingsByArchetype('zealot').map(c => c.name),
    thaumaturge: getCallingsByArchetype('thaumaturge').map(c => c.name),
    warrior: getCallingsByArchetype('warrior').map(c => c.name),
    rogue: getCallingsByArchetype('rogue').map(c => c.name),
    sage: getCallingsByArchetype('sage').map(c => c.name)
  };
}
