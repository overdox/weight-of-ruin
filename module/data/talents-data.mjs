/**
 * Talents Compendium Data
 * Universal and Archetype talents
 */

export const TALENTS_DATA = [
  // ============ UNIVERSAL TALENTS - COMBAT ============
  {
    name: "Quick Draw",
    type: "talent",
    img: "icons/skills/melee/hand-grip-sword-orange.webp",
    system: {
      description: "<p>Draw and stow weapons with lightning speed.</p>",
      talentType: "universal",
      category: "combat",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "Draw/stow weapons as a free action once per encounter",
        3: "Draw/stow as a free action anytime",
        5: "Draw and Strike as 1 action"
      }
    }
  },
  {
    name: "Dual Wielding",
    type: "talent",
    img: "icons/skills/melee/blade-tips-double-blue.webp",
    system: {
      description: "<p>Fight effectively with a weapon in each hand.</p>",
      talentType: "universal",
      category: "combat",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "–2 penalty to off-hand attacks",
        3: "–1 penalty to off-hand attacks",
        5: "No penalty, bonus attack 1/round"
      }
    }
  },
  {
    name: "Precise Strike",
    type: "talent",
    img: "icons/skills/melee/blade-tip-orange.webp",
    system: {
      description: "<p>Sacrifice power for accuracy in combat.</p>",
      talentType: "universal",
      category: "combat",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 hit, –2 damage",
        3: "+2 hit, –2 damage",
        5: "+3 hit, –2 damage"
      }
    }
  },
  {
    name: "Power Strike",
    type: "talent",
    img: "icons/skills/melee/strike-hammer-destructive-orange.webp",
    system: {
      description: "<p>Sacrifice accuracy for devastating damage.</p>",
      talentType: "universal",
      category: "combat",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "–1 hit, +3 damage",
        3: "–1 hit, +5 damage",
        5: "–1 hit, +8 damage"
      }
    }
  },
  {
    name: "Riposte",
    type: "talent",
    img: "icons/skills/melee/shield-block-bash-blue.webp",
    system: {
      description: "<p>Counter-attack after successful defense.</p>",
      talentType: "universal",
      category: "combat",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "Counter attack 1/encounter",
        3: "Counter attack 1/round",
        5: "Counter grants bonus damage"
      }
    }
  },
  {
    name: "Iron Grip",
    type: "talent",
    img: "icons/equipment/hand/gauntlet-armored-red-gold.webp",
    system: {
      description: "<p>Resist disarms and maintain your hold.</p>",
      talentType: "universal",
      category: "combat",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+2 dice vs. disarm",
        3: "+4 dice vs. disarm",
        5: "Immune to disarm, bonus to grapple"
      }
    }
  },
  {
    name: "Weapon Specialization",
    type: "talent",
    img: "icons/skills/melee/blade-tip-orange.webp",
    system: {
      description: "<p>Expertise with one chosen weapon type.</p>",
      talentType: "universal",
      category: "combat",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 damage with chosen weapon",
        2: "+1 hit with chosen weapon",
        3: "+2 damage with chosen weapon",
        4: "+2 hit with chosen weapon",
        5: "+3 damage with chosen weapon"
      }
    }
  },
  {
    name: "Shield Expert",
    type: "talent",
    img: "icons/equipment/shield/heater-steel-worn.webp",
    system: {
      description: "<p>Enhanced shield techniques.</p>",
      talentType: "universal",
      category: "combat",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 Defense with shield",
        3: "Shield bash as bonus action",
        5: "Cover adjacent ally"
      }
    }
  },
  {
    name: "Rapid Shot",
    type: "talent",
    img: "icons/skills/ranged/arrow-flying-white-blue.webp",
    system: {
      description: "<p>Fire ranged weapons with greater speed.</p>",
      talentType: "universal",
      category: "combat",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "–2 penalty for extra shot",
        3: "–1 penalty for extra shot",
        5: "No penalty, 1/round"
      }
    }
  },
  {
    name: "Deadly Aim",
    type: "talent",
    img: "icons/skills/ranged/target-bullseye-arrow-glowing.webp",
    system: {
      description: "<p>Precision ranged attacks.</p>",
      talentType: "universal",
      category: "combat",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "Spend 1 action aiming, +2 hit",
        3: "+3 hit when aiming",
        5: "+4 hit, ignore partial cover"
      }
    }
  },

  // ============ UNIVERSAL TALENTS - PHYSICAL ============
  {
    name: "Fleet Foot",
    type: "talent",
    img: "icons/skills/movement/figure-running-gray.webp",
    system: {
      description: "<p>Enhanced movement speed.</p>",
      talentType: "universal",
      category: "physical",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 Movement",
        3: "+2 Movement",
        5: "+3 Movement, ignore difficult terrain"
      }
    }
  },
  {
    name: "Endurance",
    type: "talent",
    img: "icons/magic/life/heart-shadow-red.webp",
    system: {
      description: "<p>Resist trauma and exhaustion.</p>",
      talentType: "universal",
      category: "physical",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 Toughness",
        3: "+2 Toughness",
        5: "+3 Toughness"
      }
    }
  },
  {
    name: "Tough as Nails",
    type: "talent",
    img: "icons/skills/wounds/blood-spurt-spray-red.webp",
    system: {
      description: "<p>Shrug off injuries through sheer toughness.</p>",
      talentType: "universal",
      category: "physical",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "1/day ignore 1 Trauma",
        3: "2/day ignore 1 Trauma",
        5: "3/day ignore 1 Trauma, +1 Wounds"
      }
    }
  },
  {
    name: "Iron Will",
    type: "talent",
    img: "icons/magic/control/buff-flight-wings-blue.webp",
    system: {
      description: "<p>Resist mental influence and fear.</p>",
      talentType: "universal",
      category: "mental",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+2 dice vs. fear/manipulation",
        3: "+4 dice vs. fear/manipulation",
        5: "Immune to mundane fear, +6 vs. magic"
      }
    }
  },
  {
    name: "Quick Thinking",
    type: "talent",
    img: "icons/magic/perception/eye-ringed-glow-angry-teal.webp",
    system: {
      description: "<p>React faster in crisis situations.</p>",
      talentType: "universal",
      category: "mental",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 to Initiative",
        3: "+2 to Initiative",
        5: "+3 to Initiative, act in surprise rounds"
      }
    }
  },

  // ============ UNIVERSAL TALENTS - SOCIAL ============
  {
    name: "Silver Tongue",
    type: "talent",
    img: "icons/skills/social/diplomacy-handshake-yellow.webp",
    system: {
      description: "<p>Enhanced persuasion abilities.</p>",
      talentType: "universal",
      category: "social",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 die to Persuasion",
        3: "+2 dice to Persuasion",
        5: "+3 dice, reroll 1 failure/conversation"
      }
    }
  },
  {
    name: "Menacing Presence",
    type: "talent",
    img: "icons/skills/social/intimidation-impressing.webp",
    system: {
      description: "<p>Project threat effectively.</p>",
      talentType: "universal",
      category: "social",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 die to Intimidation",
        3: "Intimidate multiple targets",
        5: "Demoralize as free action"
      }
    }
  },
  {
    name: "Contacts",
    type: "talent",
    img: "icons/environment/people/group.webp",
    system: {
      description: "<p>Network of informants and allies.</p>",
      talentType: "universal",
      category: "social",
      archetype: null,
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "1 contact in home region",
        3: "Contacts in 3 regions",
        5: "Contacts everywhere, +2 to locate people"
      }
    }
  },

  // ============ WARRIOR TALENTS ============
  {
    name: "Battle Hardened",
    type: "talent",
    img: "icons/environment/people/infantry-armored.webp",
    system: {
      description: "<p>Combat experience reduces shock.</p>",
      talentType: "archetype",
      category: "combat",
      archetype: "warrior",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 Toughness in combat",
        3: "+2 Toughness in combat",
        5: "+3 Toughness, ignore first Trauma each fight"
      }
    }
  },
  {
    name: "Cleave",
    type: "talent",
    img: "icons/skills/melee/strike-axe-blood-red.webp",
    system: {
      description: "<p>Strike multiple foes in rapid succession.</p>",
      talentType: "archetype",
      category: "combat",
      archetype: "warrior",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "On kill, free attack adjacent enemy",
        3: "Free attack on any hit",
        5: "Cleave up to 3 targets"
      }
    }
  },
  {
    name: "Armor Training",
    type: "talent",
    img: "icons/equipment/chest/breastplate-banded-steel.webp",
    system: {
      description: "<p>Move better in heavy armor.</p>",
      talentType: "archetype",
      category: "physical",
      archetype: "warrior",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "Reduce armor penalty by 1",
        3: "Reduce armor penalty by 2",
        5: "No armor penalties"
      }
    }
  },
  {
    name: "Berserker Rage",
    type: "talent",
    img: "icons/skills/melee/strike-hammer-destructive-orange.webp",
    system: {
      description: "<p>Enter a killing fury in combat.</p>",
      talentType: "signature",
      category: "combat",
      archetype: "warrior",
      subtype: "barbarian",
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+2 Strength, –2 Defense while raging",
        3: "+3 Strength, –1 Defense",
        5: "+4 Strength, no penalty, ignore pain"
      }
    }
  },
  {
    name: "Rally the Troops",
    type: "talent",
    img: "icons/sundries/flags/banner-flag-red-white.webp",
    system: {
      description: "<p>Inspire allies in combat.</p>",
      talentType: "signature",
      category: "social",
      archetype: "warrior",
      subtype: "captain",
      rank: 1,
      maxRank: 5,
      effects: {
        1: "Allies +1 die, 1/encounter",
        3: "Allies +2 dice, 1/encounter",
        5: "Allies +3 dice, remove fear effects"
      }
    }
  },

  // ============ ROGUE TALENTS ============
  {
    name: "Sneak Attack",
    type: "talent",
    img: "icons/skills/melee/maneuver-daggers-paired-orange.webp",
    system: {
      description: "<p>Strike from hiding for extra damage.</p>",
      talentType: "archetype",
      category: "combat",
      archetype: "rogue",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+2 damage from stealth",
        3: "+4 damage from stealth",
        5: "+6 damage, target Staggered"
      }
    }
  },
  {
    name: "Evasion",
    type: "talent",
    img: "icons/skills/movement/arrow-upward-white.webp",
    system: {
      description: "<p>Dodge area effects with agility.</p>",
      talentType: "archetype",
      category: "physical",
      archetype: "rogue",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "Half damage on failed dodge",
        3: "No damage on success",
        5: "Half damage even on failure"
      }
    }
  },
  {
    name: "Death Strike",
    type: "talent",
    img: "icons/skills/melee/blade-tips-triple-steel.webp",
    system: {
      description: "<p>Lethal precision against unaware targets.</p>",
      talentType: "signature",
      category: "combat",
      archetype: "rogue",
      subtype: "assassin",
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+4 damage vs. unaware targets",
        3: "+6 damage vs. unaware targets",
        5: "Instant kill on Critical Success vs. unaware"
      }
    }
  },

  // ============ ZEALOT TALENTS ============
  {
    name: "Divine Conviction",
    type: "talent",
    img: "icons/magic/holy/prayer-hands-glowing-yellow.webp",
    system: {
      description: "<p>Faith bolsters willpower.</p>",
      talentType: "archetype",
      category: "mental",
      archetype: "zealot",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 die vs. fear/corruption",
        3: "+2 dice vs. fear/corruption",
        5: "+3 dice, inspire adjacent allies"
      }
    }
  },
  {
    name: "Smite",
    type: "talent",
    img: "icons/magic/holy/projectiles-blades-salvo-yellow.webp",
    system: {
      description: "<p>Channel faith into devastating attacks.</p>",
      talentType: "archetype",
      category: "combat",
      archetype: "zealot",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+2 damage vs. unholy creatures",
        3: "+4 damage vs. unholy creatures",
        5: "+6 damage, bypass DR"
      }
    }
  },
  {
    name: "Lay on Hands",
    type: "talent",
    img: "icons/magic/holy/prayer-hands-glowing-yellow-green.webp",
    system: {
      description: "<p>Healing touch powered by faith.</p>",
      talentType: "archetype",
      category: "support",
      archetype: "zealot",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "Remove 1 Trauma, 1/day",
        3: "Remove 1 Trauma, 2/day",
        5: "Remove 1 Trauma 3/day, or remove 1 Critical Injury"
      }
    }
  },

  // ============ THAUMATURGE TALENTS ============
  {
    name: "Arcane Reserve",
    type: "talent",
    img: "icons/magic/symbols/rune-sigil-green-purple.webp",
    system: {
      description: "<p>Extra magical stamina for spellcasting.</p>",
      talentType: "archetype",
      category: "magic",
      archetype: "thaumaturge",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 to spell pool",
        3: "+2 to spell pool",
        5: "+3 to spell pool, recover 1/hour"
      }
    }
  },
  {
    name: "Counterspell",
    type: "talent",
    img: "icons/magic/defensive/shield-barrier-glowing-blue.webp",
    system: {
      description: "<p>Disrupt enemy magic.</p>",
      talentType: "archetype",
      category: "magic",
      archetype: "thaumaturge",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "Contest to negate enemy spell",
        3: "+2 dice to counter spells",
        5: "Reflect on Critical Success"
      }
    }
  },
  {
    name: "Familiar",
    type: "talent",
    img: "icons/creatures/birds/corvid-watchful-glowing-green.webp",
    system: {
      description: "<p>Bond with a magical creature.</p>",
      talentType: "archetype",
      category: "magic",
      archetype: "thaumaturge",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "Gain familiar, share senses",
        3: "Familiar can deliver spells",
        5: "Familiar gains special powers"
      }
    }
  },

  // ============ SAGE TALENTS ============
  {
    name: "Loremaster",
    type: "talent",
    img: "icons/sundries/books/book-worn-blue.webp",
    system: {
      description: "<p>Deep knowledge across many subjects.</p>",
      talentType: "archetype",
      category: "knowledge",
      archetype: "sage",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+1 die to all Knowledge skills",
        3: "+2 dice to all Knowledge skills",
        5: "Know obscure secrets"
      }
    }
  },
  {
    name: "Diagnose",
    type: "talent",
    img: "icons/tools/laboratory/bowl-herbs-green.webp",
    system: {
      description: "<p>Identify ailments and their cures.</p>",
      talentType: "archetype",
      category: "knowledge",
      archetype: "sage",
      subtype: null,
      rank: 1,
      maxRank: 5,
      effects: {
        1: "Identify disease/poison",
        3: "Determine cure required",
        5: "Instant diagnosis, +2 to treat"
      }
    }
  },
  {
    name: "Surgeon",
    type: "talent",
    img: "icons/tools/cooking/knife-chef-steel-black.webp",
    system: {
      description: "<p>Expert medical care and surgery.</p>",
      talentType: "signature",
      category: "support",
      archetype: "sage",
      subtype: "physician",
      rank: 1,
      maxRank: 5,
      effects: {
        1: "+2 dice to treat Critical Injuries",
        3: "Reduce treatment time by half",
        5: "Restore lost limbs (ritual, rare components)"
      }
    }
  }
];

export default TALENTS_DATA;
