/**
 * NPC Traits Compendium Data
 * All NPC traits formatted for Foundry compendium.
 */

export const NPC_TRAITS_DATA = [
  {
    "name": "Brutal Follow-Through",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/offense.webp",
    "system": {
      "description": "When this NPC scores 3 or more hits on an attack, deal +1 damage.",
      "category": "offense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onCrit",
        "appliedConditions": [],
        "special": [
          "+1 damage when scoring 3+ hits"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Sunderer",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/offense.webp",
    "system": {
      "description": "On a hit, the target's armor DR is reduced by 1 until repaired.",
      "category": "offense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Target armor DR -1 until repaired"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Hook & Drag",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/offense.webp",
    "system": {
      "description": "If you score 2+ more hits than the target's defense, you may pull the target 2 spaces and break engagement.",
      "category": "offense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Pull target 2 spaces when exceeding defense by 2+",
          "Breaks engagement"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Cruel Precision",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/offense.webp",
    "system": {
      "description": "Increase maximum hits by +1 on attacks made by this NPC.",
      "category": "offense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "maxHits",
            "value": 1,
            "condition": "",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Overkill Conversion",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/offense.webp",
    "system": {
      "description": "Extra hits beyond what's needed to beat defense inflict Bleeding (1 extra hit = 1 round of Bleeding).",
      "category": "offense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "bleeding",
            "duration": "per extra hit",
            "hitThreshold": null
          }
        ],
        "special": [
          "Excess hits convert to Bleeding rounds"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Executioner",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/offense.webp",
    "system": {
      "description": "Gain +2 dice against targets who are Wounded, Prone, Restrained, or outnumbered.",
      "category": "offense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "vs wounded/prone/restrained/outnumbered",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Rend Armor Gap",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/offense.webp",
    "system": {
      "description": "Ignore 1 point of DR if you score at least 2 hits on an attack.",
      "category": "offense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Ignore 1 DR when scoring 2+ hits"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Staggering Impact",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/offense.webp",
    "system": {
      "description": "If you beat defense by 1+, the target is Staggered (loses 1 space of movement or -1 die on next action).",
      "category": "offense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "staggered",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pinpoint Weakness",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/offense.webp",
    "system": {
      "description": "Once per fight, reroll up to 2 dice that did not score hits on an attack.",
      "category": "offense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerFight",
        "appliedConditions": [],
        "special": [
          "Reroll up to 2 non-hits on an attack"
        ],
        "passive": false,
        "cooldown": "Once per combat"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Spray of Nails",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/offense.webp",
    "system": {
      "description": "Cone or line attack: roll once and apply to all targets in the area; each target defends individually.",
      "category": "offense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Area attack (cone/line)",
          "Single roll vs multiple targets"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Ragged Resilience",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/defense.webp",
    "system": {
      "description": "The first time this NPC would suffer a Critical Injury, it instead takes 2 Trauma.",
      "category": "defense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onDamaged",
        "appliedConditions": [],
        "special": [
          "First Critical Injury becomes 2 Trauma instead"
        ],
        "passive": true,
        "cooldown": "Once per combat"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Hardened Plates",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/defense.webp",
    "system": {
      "description": "Gain +1 DR against one damage type (slash, pierce, or blunt). Chosen at NPC creation.",
      "category": "defense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "dr",
            "value": 1,
            "condition": "",
            "damageType": "chosen"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pain-Dead",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/defense.webp",
    "system": {
      "description": "Ignore the first penalty from being hurt (no -dice until the second wound threshold is reached).",
      "category": "defense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Ignore first wound penalty"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Shield Wall",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/defense.webp",
    "system": {
      "description": "If adjacent to an ally with this trait, gain +1 defense.",
      "category": "defense",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "defense",
            "value": 1,
            "condition": "adjacent to ally with Shield Wall",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Duck and Weave",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/defense.webp",
    "system": {
      "description": "Gain +1 defense against ranged attacks if this NPC moved this round.",
      "category": "defense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "defense",
            "value": 1,
            "condition": "vs ranged, if moved this round",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Parry Master",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/defense.webp",
    "system": {
      "description": "If the attacker beats your defense by exactly 1, reduce their hits by 1 (potentially causing a miss).",
      "category": "defense",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onDamaged",
        "appliedConditions": [],
        "special": [
          "Reduce attacker hits by 1 when they barely hit"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Too Mean to Die",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/defense.webp",
    "system": {
      "description": "When reduced to 0 Resilience, make a Fortitude + Resolve check; on 2+ hits, stay up with 1 Resilience.",
      "category": "defense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 3,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onDamaged",
        "appliedConditions": [],
        "special": [
          "Roll Fortitude + Resolve at 0 Resilience",
          "On 2+ hits: survive with 1 Resilience"
        ],
        "passive": false,
        "cooldown": "Once per combat"
      },
      "roll": {
        "hasRoll": true,
        "pool": "fortitude + resolve",
        "difficulty": "standard"
      }
    }
  },
  {
    "name": "Fortified Position",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/defense.webp",
    "system": {
      "description": "While in cover or fortification, attackers suffer -2 dice, and this NPC gains +1 max hits on defense.",
      "category": "defense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "maxHits",
            "value": 1,
            "condition": "defense, while in cover",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Attackers suffer -2 dice when NPC is in cover"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Grim Determination",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/defense.webp",
    "system": {
      "description": "When an ally dies nearby, this NPC gains +1 die on all checks for 1 round.",
      "category": "defense",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 1,
            "condition": "for 1 round after ally dies",
            "damageType": ""
          }
        ],
        "trigger": "onAllyDown",
        "appliedConditions": [],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Skitter-Step",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/mobility.webp",
    "system": {
      "description": "After attacking, shift 1-2 spaces without provoking reactions.",
      "category": "mobility",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Shift 1-2 spaces after attacking",
          "Does not provoke reactions"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Vault & Crash",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/mobility.webp",
    "system": {
      "description": "Ignore difficult terrain; if you end movement adjacent to a target, gain +1 die on your next melee attack.",
      "category": "mobility",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 1,
            "condition": "next melee attack after ending movement adjacent",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Ignore difficult terrain"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Shadow Lunge",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/mobility.webp",
    "system": {
      "description": "Once per round, move half speed as part of an attack action.",
      "category": "mobility",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerRound",
        "appliedConditions": [],
        "special": [
          "Move half speed as part of attack"
        ],
        "passive": false,
        "cooldown": "Once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Blink Hop",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/mobility.webp",
    "system": {
      "description": "Short-range teleport (up to 10 spaces). After teleporting, gain +1 die on the next action.",
      "category": "mobility",
      "allowedClasses": [
        "apparition",
        "fiend"
      ],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 1,
            "condition": "next action after teleporting",
            "damageType": ""
          }
        ],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Teleport up to 10 spaces"
        ],
        "passive": false,
        "cooldown": "Every other round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Slip Through Gaps",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/mobility.webp",
    "system": {
      "description": "Can move through enemy spaces; enemies cannot body-block this NPC.",
      "category": "mobility",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Move through enemy spaces",
          "Cannot be body-blocked"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Ambush Predator",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/mobility.webp",
    "system": {
      "description": "First round only: gain +2 dice and +1 max hits if attacking from concealment.",
      "category": "mobility",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "first round from concealment",
            "damageType": ""
          },
          {
            "type": "maxHits",
            "value": 1,
            "condition": "first round from concealment",
            "damageType": ""
          }
        ],
        "trigger": "firstRound",
        "appliedConditions": [],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Wall-Climber",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/mobility.webp",
    "system": {
      "description": "Treat vertical surfaces as normal ground; gain advantageous angles for ambushes from above.",
      "category": "mobility",
      "allowedClasses": [
        "beast",
        "vermin",
        "fiend"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Climb vertical surfaces freely",
          "Ambush angles from above"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Graveyard Sprint",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/mobility.webp",
    "system": {
      "description": "When below half Resilience, movement increases by +50%.",
      "category": "mobility",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "movement",
            "value": 50,
            "condition": "percent, when below half Resilience",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Crippling Strike",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/control.webp",
    "system": {
      "description": "On 3+ hits, apply Slowed or Weakened (-1 die) for 1 round.",
      "category": "control",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onCrit",
        "appliedConditions": [
          {
            "condition": "slowed",
            "duration": "1 round",
            "hitThreshold": 3
          },
          {
            "condition": "weakened",
            "duration": "1 round",
            "hitThreshold": 3
          }
        ],
        "special": [
          "Choose Slowed or Weakened"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Hamstring",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/control.webp",
    "system": {
      "description": "If you beat defense by 2+, the target cannot sprint or charge next turn.",
      "category": "control",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Prevent sprint/charge when beating defense by 2+"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Net, Chain, Barbs",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/control.webp",
    "system": {
      "description": "On a hit, target becomes Restrained unless they spend an action and roll 2+ hits to break free.",
      "category": "control",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "restrained",
            "duration": "until escaped",
            "hitThreshold": null
          }
        ],
        "special": [
          "Escape: action + 2 hits vs Standard"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Terror Brand",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/control.webp",
    "system": {
      "description": "Targets who witness this attack must pass Resolve (2+ hits) or suffer -1 die for a round.",
      "category": "control",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "frightened",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Witnesses test Resolve or -1 die for 1 round"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Marked for the Pack",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/control.webp",
    "system": {
      "description": "If this NPC hits a target, allies gain +1 die to attack that same target until end of next round.",
      "category": "control",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Mark target: allies gain +1 die vs marked target"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Suppressing Fire",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/control.webp",
    "system": {
      "description": "Designate a zone; any enemy crossing it risks an automatic attack at -2 dice. Limited to 2 triggers per round.",
      "category": "control",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "reaction",
        "appliedConditions": [],
        "special": [
          "Zone control",
          "Auto-attack at -2 dice vs crossing enemies",
          "Max 2 triggers per round"
        ],
        "passive": false,
        "cooldown": "2 uses per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Dazzle/Smoke/Ash",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/control.webp",
    "system": {
      "description": "Creates a zone: ranged attacks through it suffer -2 dice, and movement is halved.",
      "category": "control",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Create obscuring zone",
          "-2 dice to ranged through zone",
          "Half movement in zone"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Swarm Tactics",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/teamplay.webp",
    "system": {
      "description": "This NPC gains +1 die per adjacent ally (maximum +3).",
      "category": "teamplay",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 1,
            "condition": "per adjacent ally, max +3",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Rotating Front",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/teamplay.webp",
    "system": {
      "description": "When an ally is hit, this NPC can swap places with them as a reaction (once per round).",
      "category": "teamplay",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onAllyHit",
        "appliedConditions": [],
        "special": [
          "Swap places with hit ally"
        ],
        "passive": false,
        "cooldown": "Once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Bodyguard",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/teamplay.webp",
    "system": {
      "description": "Take the hit for a leader or ally within 2 spaces; gain +1 DR for that intercepted hit.",
      "category": "teamplay",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "dr",
            "value": 1,
            "condition": "when intercepting hit",
            "damageType": ""
          }
        ],
        "trigger": "reaction",
        "appliedConditions": [],
        "special": [
          "Intercept attacks on allies within 2 spaces"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pack Feint",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/teamplay.webp",
    "system": {
      "description": "If two allies engage the same target, one can \"feint\": the other gains +1 max hits.",
      "category": "teamplay",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "maxHits",
            "value": 1,
            "condition": "ally attacking same target after feint",
            "damageType": ""
          }
        ],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Requires 2 allies on same target"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Fodder Screen",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/teamplay.webp",
    "system": {
      "description": "While a grunt is adjacent to a leader, attackers suffer -1 die to hit the leader.",
      "category": "teamplay",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Adjacent grunt provides -1 die to attacks vs leader"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Barking Orders",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/leadership.webp",
    "system": {
      "description": "Once per round, grant an ally +2 dice on their next action.",
      "category": "leadership",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Grant ally +2 dice on next action"
        ],
        "passive": false,
        "cooldown": "Once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Keep Moving!",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/leadership.webp",
    "system": {
      "description": "Allies within earshot ignore difficult terrain penalties for 1 round.",
      "category": "leadership",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Allies ignore difficult terrain for 1 round"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "No Retreat",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/leadership.webp",
    "system": {
      "description": "While this leader is present, allies gain +1 die to resist fear/panic and don't rout until half are down.",
      "category": "leadership",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 3,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 1,
            "condition": "allies resisting fear/panic",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Allies don't rout until half are down"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Rally in Blood",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/leadership.webp",
    "system": {
      "description": "When an ally drops, leader gains a Command token. Spend to give an ally a free move or reroll 1 die.",
      "category": "leadership",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onAllyDown",
        "appliedConditions": [],
        "special": [
          "Gain Command token when ally drops",
          "Spend: ally free move or reroll 1 die"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Chosen of Ruin",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/leadership.webp",
    "system": {
      "description": "The leader's first failed roll each scene: convert one miss into a hit.",
      "category": "leadership",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 4,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerFight",
        "appliedConditions": [],
        "special": [
          "First failed roll: convert 1 miss to hit"
        ],
        "passive": false,
        "cooldown": "Once per scene"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Punish Cowardice",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/leadership.webp",
    "system": {
      "description": "If an ally flees, this leader immediately gains +2 dice on their next attack.",
      "category": "leadership",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "next attack after ally flees",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Grave-Tether",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/supernatural.webp",
    "system": {
      "description": "On a hit, target is \"tethered\"; if they move away, they take 1 damage.",
      "category": "supernatural",
      "allowedClasses": [
        "afflicted",
        "apparition",
        "fiend"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Tether target",
          "Moving away deals 1 damage"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Witch-Light",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/supernatural.webp",
    "system": {
      "description": "Ranged hex: on 2+ hits, target suffers -2 dice on perception/aim checks for a round.",
      "category": "supernatural",
      "allowedClasses": [
        "afflicted",
        "apparition",
        "fiend"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [
          {
            "condition": "blinded",
            "duration": "1 round",
            "hitThreshold": 2
          }
        ],
        "special": [
          "-2 dice to perception/aim"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": true,
        "pool": "5",
        "difficulty": "standard"
      }
    }
  },
  {
    "name": "Fate's Interest",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/supernatural.webp",
    "system": {
      "description": "Once per scene, treat a rolled 6 as two hits (only one die can do this per roll).",
      "category": "supernatural",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerFight",
        "appliedConditions": [],
        "special": [
          "One 6 counts as two hits"
        ],
        "passive": false,
        "cooldown": "Once per scene"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Blood Price",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/supernatural.webp",
    "system": {
      "description": "This NPC can take 1 Trauma to gain +3 dice on a single roll.",
      "category": "supernatural",
      "allowedClasses": [
        "afflicted",
        "fiend"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 3,
            "condition": "costs 1 Trauma",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Self-damage for power"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Unnatural Recovery",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/supernatural.webp",
    "system": {
      "description": "At end of round, if this NPC inflicted a Critical Injury this round, recover 1 Resilience.",
      "category": "supernatural",
      "allowedClasses": [
        "afflicted",
        "fiend"
      ],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 3,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onTurnEnd",
        "appliedConditions": [],
        "special": [
          "Heal 1 Resilience if inflicted Critical Injury this round"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Cold Void Aura",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/supernatural.webp",
    "system": {
      "description": "Enemies within 2 spaces suffer -1 die on Resolve checks and cannot gain morale bonuses.",
      "category": "supernatural",
      "allowedClasses": [
        "apparition",
        "fiend"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Aura: enemies within 2 spaces -1 die Resolve",
          "No morale bonuses in aura"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Sharpshooter's Calm",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/ranged.webp",
    "system": {
      "description": "If stationary this round, gain +1 max hits with ranged attacks.",
      "category": "ranged",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "maxHits",
            "value": 1,
            "condition": "ranged, if stationary",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Running Gunner",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/ranged.webp",
    "system": {
      "description": "No penalty for firing while moving; gain +1 die if you moved this round.",
      "category": "ranged",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 1,
            "condition": "ranged, if moved",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "No move-and-shoot penalty"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Incendiary Ammo",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/ranged.webp",
    "system": {
      "description": "On any hit, apply Burning (1 damage next round) or armor decay.",
      "category": "ranged",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "burning",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Or armor decay instead of Burning"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Ricochet Trick",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/ranged.webp",
    "system": {
      "description": "Ignore partial cover once per round.",
      "category": "ranged",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerRound",
        "appliedConditions": [],
        "special": [
          "Ignore partial cover"
        ],
        "passive": false,
        "cooldown": "Once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Spotter",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/ranged.webp",
    "system": {
      "description": "Mark a target: allies gain +1 die against marked enemies until marker is removed.",
      "category": "ranged",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Mark target",
          "Allies +1 die vs marked"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Meat Hooker",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/signature.webp",
    "system": {
      "description": "If you beat defense by 3+, target is pinned and takes damage if they act.",
      "category": "signature",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 3,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onCrit",
        "appliedConditions": [
          {
            "condition": "restrained",
            "duration": "until freed",
            "hitThreshold": null
          }
        ],
        "special": [
          "Pin target",
          "Acting while pinned deals damage"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Bone-Saw",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/signature.webp",
    "system": {
      "description": "Against Restrained or Prone targets, gain +2 dice and +1 damage.",
      "category": "signature",
      "allowedClasses": [],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "vs restrained/prone",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "+1 damage vs restrained/prone"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Disease Vector",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/signature.webp",
    "system": {
      "description": "On a hit, target must pass Fortitude in downtime or gain a lingering penalty.",
      "category": "signature",
      "allowedClasses": [
        "vermin",
        "afflicted"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "poisoned",
            "duration": "lingering",
            "hitThreshold": null
          }
        ],
        "special": [
          "Downtime Fortitude check or lingering penalty"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Cannibal Frenzy",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/signature.webp",
    "system": {
      "description": "When adjacent to a corpse, gain +2 dice for one round, then suffer -1 die next round.",
      "category": "signature",
      "allowedClasses": [
        "beast",
        "afflicted",
        "fiend"
      ],
      "typeSpecific": [],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "adjacent to corpse, for 1 round",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "-1 die next round after frenzy"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Sermon of Ash",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/signature.webp",
    "system": {
      "description": "A shout: enemies within range must pass Resolve or become Shaken (-2 dice to all rolls).",
      "category": "signature",
      "allowedClasses": [
        "humanoid",
        "afflicted",
        "fiend"
      ],
      "typeSpecific": [],
      "cost": 2,
      "tierRequirement": {
        "min": 3,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [
          {
            "condition": "shaken",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Area shout",
          "Resolve check or Shaken"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": true,
        "pool": "5",
        "difficulty": "standard"
      }
    }
  },
  {
    "name": "Siren Hook",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "As an action, target in sight tests Resolve vs your hits; on a failure they are Charmed for 1 round.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "succubus",
        "incubus"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [
          {
            "condition": "charmed",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Opposed Resolve check"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": true,
        "pool": "persona + resolve",
        "difficulty": "standard"
      }
    }
  },
  {
    "name": "Kiss of Ruin",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If you start your turn adjacent to a Charmed target, deal +1 Trauma automatically.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "succubus",
        "incubus"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onTurnStart",
        "appliedConditions": [],
        "special": [
          "Auto +1 Trauma to adjacent Charmed target"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Glamour Skin",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "First attack against you each round suffers -2 dice unless the attacker passes Awareness (2+ hits).",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "succubus",
        "incubus"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "First attacker each round: -2 dice or Awareness check"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Turn Desire",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "When an enemy misses you, you may shift 2 spaces and gain +1 die on your next social/deception roll.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "succubus",
        "incubus"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 1,
            "condition": "next social/deception roll after being missed",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Shift 2 spaces when missed"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Scuttle-Through",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Ignore engagement and body-blocking; move through enemy spaces freely.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "imp"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Move through enemy spaces",
          "Ignore engagement"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Annoying Little Horror",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If you hit, target takes -1 die to their next action (max -2 from multiple imps).",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "imp"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "weakened",
            "duration": "1 action",
            "hitThreshold": null
          }
        ],
        "special": [
          "Stacks to -2 from multiple imps"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Gremlin Luck",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Once per round, reroll one die that missed.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "imp"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerRound",
        "appliedConditions": [],
        "special": [
          "Reroll 1 miss"
        ],
        "passive": false,
        "cooldown": "Once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pocket Saboteur",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On 2+ hits vs a device/weapon/armor strap, apply Jammed/Loose/Disabled until fixed.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "imp"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Disable equipment on 2+ hits"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Half-There",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Non-magical/mundane attacks suffer -2 dice to hit you.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "phantom"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Non-magical attacks: -2 dice"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Fade Step",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "After being targeted (hit or miss), you may teleport 5 spaces (once per round).",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "phantom"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "reaction",
        "appliedConditions": [],
        "special": [
          "Teleport 5 spaces after being targeted"
        ],
        "passive": false,
        "cooldown": "Once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Chill Draft",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, apply Numb: -1 die to physical actions for 1 round.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "phantom"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "numb",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Unseen Angle",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If attacking from concealment/invisibility, gain +1 max hits on that first strike.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "phantom"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "maxHits",
            "value": 1,
            "condition": "first attack from concealment",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Life-Drain Touch",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, deal damage and heal 1 Resilience if you scored 2+ hits.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "wraith"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Heal 1 Resilience on 2+ hits"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Terror Halo",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Enemies within 2 spaces suffer -1 die on Resolve checks; on first sight, they test Resolve or become Shaken.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "wraith"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [
          {
            "condition": "shaken",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Aura: -1 die Resolve within 2 spaces",
          "First sight: Resolve check or Shaken"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Shadow Bind",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If you beat defense by 2+, target is Slowed for 1 round.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "wraith"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "slowed",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Requires beating defense by 2+"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Hungry for Heat",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Against Bleeding or Wounded targets, gain +2 dice.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "wraith"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "vs bleeding/wounded",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Refuses the Grave",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "The first time you would drop, make a Fortitude + Resolve check; on 2+ hits stand back up with 1 Resilience.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "revenant"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onDamaged",
        "appliedConditions": [],
        "special": [
          "Roll at 0 Resilience",
          "On 2+ hits: rise with 1 Resilience"
        ],
        "passive": false,
        "cooldown": "Once per combat"
      },
      "roll": {
        "hasRoll": true,
        "pool": "fortitude + resolve",
        "difficulty": "standard"
      }
    }
  },
  {
    "name": "Grudge-Fueled",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Mark one enemy at combat start: gain +2 dice against them. If they drop, suffer -1 die next round.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "revenant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "vs marked enemy",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Mark one enemy",
          "-1 die if marked enemy drops"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Unholy Fortitude",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Ignore the first movement/accuracy penalty from wounds.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "revenant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Ignore first wound penalty"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Dead Hands",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, target cannot disengage for free; leaving triggers a free strike (once per round).",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "revenant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Prevent free disengage",
          "Free strike if they leave"
        ],
        "passive": false,
        "cooldown": "Free strike once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Blood Scent",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Automatically detect wounded creatures nearby; gain +1 die to track and ambush them.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "vampire"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 1,
            "condition": "tracking/ambushing wounded",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Detect wounded creatures"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Sanguine Feast",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If you deal a wound this round, heal 1 Resilience.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "vampire"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onKill",
        "appliedConditions": [],
        "special": [
          "Heal 1 Resilience when dealing wound"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Mist Slip",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Once per round, reduce attacker hits by 1 and move 5 spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "vampire"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "reaction",
        "appliedConditions": [],
        "special": [
          "Reduce incoming hits by 1",
          "Move 5 spaces"
        ],
        "passive": false,
        "cooldown": "Once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Command the Weak",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "As a shout, a weak-willed enemy tests Resolve; on failure they become Shaken.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "vampire"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [
          {
            "condition": "shaken",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Target tests Resolve or Shaken"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": true,
        "pool": "persona",
        "difficulty": "standard"
      }
    }
  },
  {
    "name": "Swarm Link",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Gain +1 die per adjacent ant ally (maximum +3).",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "ant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 1,
            "condition": "per adjacent ant ally, max +3",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Acid Bite",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On any hit, target's armor DR is reduced by 1.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "ant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Reduce target armor DR by 1"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Tunneler",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Ignore difficult terrain; can create a burrow exit for allies.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "ant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Ignore difficult terrain",
          "Create burrow exits"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Formic Wall",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If 3+ ants are adjacent, ranged attacks through them suffer -2 dice.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "ant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "3+ adjacent ants: -2 dice to ranged through"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Web Snare",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Ranged attack: on 2+ hits, target becomes Restrained until they escape (action + 2 hits).",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "spider"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [
          {
            "condition": "restrained",
            "duration": "until escaped",
            "hitThreshold": 2
          }
        ],
        "special": [
          "Escape: action + 2 hits"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": true,
        "pool": "5",
        "difficulty": "standard"
      }
    }
  },
  {
    "name": "Ceiling Hunter",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "While above the target, gain +2 dice on the first strike and can drop into engagement.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "spider"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "first attack from above",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Drop into engagement"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Venom",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, target tests Fortitude; on failure they become Weakened and take 1 damage next round.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "spider",
        "scorpion",
        "cobra"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "weakened",
            "duration": "1 round",
            "hitThreshold": null
          },
          {
            "condition": "poisoned",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Target tests Fortitude"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Silk Line",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Once per round, move 10 spaces ignoring obstacles (line-of-sight required).",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "spider"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerRound",
        "appliedConditions": [],
        "special": [
          "Move 10 spaces ignoring obstacles"
        ],
        "passive": false,
        "cooldown": "Once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Burrow Ambush",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If you emerge from below or cover, gain +1 max hits on that first attack.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "worm"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "maxHits",
            "value": 1,
            "condition": "first attack from burrow/cover",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Constriction",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If you beat defense by 2+, target is Grappled; each round they take 1 damage.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin",
        "beast"
      ],
      "typeSpecific": [
        "worm",
        "cobra"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "grappled",
            "duration": "until escaped",
            "hitThreshold": null
          }
        ],
        "special": [
          "Grapple when beating defense by 2+",
          "1 damage per round while grappled"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Swallow Whole",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Against a Grappled target with 3+ hits, swallow them: target takes damage each round, can escape with action + 3 hits.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin",
        "beast"
      ],
      "typeSpecific": [
        "worm"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onCrit",
        "appliedConditions": [],
        "special": [
          "Swallow grappled target on 3+ hits",
          "Ongoing damage",
          "Escape: action + 3 hits"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Tremor Sense",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Hidden creatures moving nearby suffer -2 dice to Stealth checks against you.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "worm"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Hidden creatures: -2 Stealth vs you"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pack Takedown",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If an ally is adjacent to your target, gain +2 dice and on hit you may knock prone if you beat defense by 1+.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "wolf"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "ally adjacent to target",
            "damageType": ""
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "prone",
            "duration": "instant",
            "hitThreshold": null
          }
        ],
        "special": [
          "Knock prone when beating defense by 1+"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Relentless Chase",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "When a target disengages, you may follow half your movement (once per round).",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "wolf",
        "dog"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "reaction",
        "appliedConditions": [],
        "special": [
          "Follow disengaging target half movement"
        ],
        "passive": false,
        "cooldown": "Once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Howl",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Allies within earshot gain +1 die to attack the same target until end of next round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "wolf"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Allies +1 die vs same target"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Hold!",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, target is Grappled unless they beat your hits with a Strength + Fortitude test.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "dog"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "grappled",
            "duration": "until escaped",
            "hitThreshold": null
          }
        ],
        "special": [
          "Target tests Strength + Fortitude to avoid"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Scent Work",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice to tracking; can't be easily fooled by simple disguises.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "dog",
        "wolf"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "tracking",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to simple disguises"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Guard Training",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If an enemy enters your reach, you get a free warning snap (one attack at -2 dice) once per round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "dog"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "reaction",
        "appliedConditions": [],
        "special": [
          "Free attack at -2 dice when enemy enters reach"
        ],
        "passive": false,
        "cooldown": "Once per round"
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Stalk Pounce",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If you start concealed and move at least 5 spaces before attacking, gain +3 dice and +1 damage.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "tiger",
        "leopard",
        "lion",
        "lynx"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 3,
            "condition": "pounce from concealment after 5+ space move",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "+1 damage on pounce"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Rake",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On 2+ hits, apply Bleeding (1 damage next round).",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "tiger",
        "leopard",
        "lion",
        "lynx",
        "bear"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "bleeding",
            "duration": "1 round",
            "hitThreshold": 2
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Terrifying Presence",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Enemies within 6 spaces must roll Resolve (TT 2) at start of combat or gain frightened.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "demon"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "firstRound",
        "appliedConditions": [
          {
            "condition": "frightened",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Start of combat: enemies RES (TT 2) or frightened"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Unstoppable Mass",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Ignore difficult terrain and shove through: enemies can't stop your movement. If you end adjacent, you may push them 2 spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "bear",
        "elephant",
        "bull"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Ignore difficult terrain",
          "Cannot be body-blocked",
          "Push adjacent enemies 2 spaces"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Maul",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If you beat defense by 2+, deal +1 damage and target is Staggered.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "bear"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "staggered",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "+1 damage when beating defense by 2+"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Thick Hide",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+1 DR against one damage type and reduce incoming damage by 1 on the first hit each round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "bear",
        "elephant",
        "crocodile"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "dr",
            "value": 1,
            "condition": "vs one damage type",
            "damageType": "chosen"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "First hit each round: -1 damage"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Devastating Charge",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If moving at least 4 spaces in a straight line before attacking, gain +3 dice and +2 damage. Target gains prone on hit.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "bull"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 3,
            "condition": "after 4+ space charge"
          },
          {
            "type": "damagePool",
            "value": 2,
            "condition": "charge"
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "prone",
            "duration": "until stood up",
            "hitThreshold": null
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Thick Skull",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Immune to stunned. +1 DR against bludgeoning.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "bull"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "dr",
            "value": 1,
            "condition": "",
            "damageType": "blunt"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to stunned"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Enraged",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "When this NPC takes damage, gain +1 die on attacks until end of next turn (stacks to +3).",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "bull"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 1,
            "condition": "after taking damage, stacks to +3"
          }
        ],
        "trigger": "onDamaged",
        "appliedConditions": [],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Massive",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+4 Wounds. Cannot be knocked prone or pushed by creatures smaller than itself.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "elephant"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "+4 Wounds",
          "Immune to prone/push from smaller creatures"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Trampling Charge",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "When moving through enemy spaces, deal 2 Trauma to each enemy. Enemies must roll AGI (TT 2) or fall prone.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "elephant"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [
          {
            "condition": "prone",
            "duration": "until stood up",
            "hitThreshold": null
          }
        ],
        "special": [
          "Moving through enemies: 2 Trauma each, AGI (TT 2) or prone"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Trunk Strike",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit with 2+ hits, may choose to grapple OR push target 3 spaces instead of dealing damage.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "elephant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "On 2+ hits: grapple OR push 3 spaces instead of damage"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Never Forgets",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice against any creature that has damaged this NPC or its allies in the past.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "elephant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "vs creatures that have harmed NPC or allies"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Swift Runner",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+3 Movement. Can take the Dash action as a free action once per round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "horse"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "movement",
            "value": 3,
            "condition": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Dash as free action once/round"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Powerful Kick",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Attacks against targets behind this NPC gain +2 dice and push target 2 spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "horse"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "attacking targets behind"
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Push target 2 spaces"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Warhorse Training",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Does not panic in combat. Can move and allow rider to attack without penalty.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "horse"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "No panic",
          "Rider attacks without movement penalty"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Antler Charge",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If moving at least 3 spaces before attacking, gain +2 dice. On hit with 2+ hits, target gains prone.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "stag"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "after 3+ space charge"
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "prone",
            "duration": "until stood up",
            "hitThreshold": 2
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Fleet of Foot",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 Movement. Ignore difficult terrain in forests.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "stag",
        "elk",
        "doe"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "movement",
            "value": 2,
            "condition": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Ignore forest difficult terrain"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Protective Instinct",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice on attacks against enemies threatening allies (allies who are grappled, prone, or at low health).",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "stag",
        "doe"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "defending threatened allies"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Mighty Antlers",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit with 2+ hits, target gains either bleeding or staggered (NPC's choice).",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "elk"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "bleeding",
            "duration": "1 round",
            "hitThreshold": 2
          },
          {
            "condition": "staggered",
            "duration": "1 round",
            "hitThreshold": 2
          }
        ],
        "special": [
          "Choose bleeding or staggered"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Herd Movement",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 Movement when moving with 2+ elk allies. Allies can move through each other's spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "elk"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "movement",
            "value": 2,
            "condition": "with 2+ elk allies"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Elk can move through each other"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Winter Endurance",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Immune to cold effects. +1 DR in cold environments.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "elk"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "dr",
            "value": 1,
            "condition": "cold environments",
            "damageType": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to cold"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Flight Response",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 Movement. When hit by an attack, may immediately move 3 spaces without provoking (once per round).",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "doe"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "movement",
            "value": 2,
            "condition": ""
          }
        ],
        "trigger": "reaction",
        "appliedConditions": [],
        "special": [
          "When hit, move 3 spaces without provoking (once/round)"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Alert",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Cannot be surprised. +2 dice on Awareness. Allies within 6 spaces gain +1 die on Awareness.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "doe"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "awareness"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Cannot be surprised",
          "Allies within 6 spaces: +1 awareness"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Cunning Escape",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Once per round, when targeted by an attack, may move 2 spaces before the attack is resolved. Attacker suffers -1 die.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "fox"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "reaction",
        "appliedConditions": [],
        "special": [
          "When targeted, move 2 spaces and attacker gets -1 die (once/round)"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Clever Hunter",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice on attacks against targets that are distracted, flanked, or have already acted this round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "fox"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "vs distracted/flanked/already acted"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Den Dweller",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can create a small burrow (1 action). While in burrow, untargetable but cannot attack. Can emerge as part of movement.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "fox",
        "badger"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Action: Create burrow",
          "In burrow: untargetable, cannot attack"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Diving Strike",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "When attacking from above (10+ spaces up), gain +3 dice and +1 damage. Can fly at double Movement when diving.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "falcon",
        "hawk"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 3,
            "condition": "diving from 10+ spaces"
          },
          {
            "type": "damagePool",
            "value": 1,
            "condition": "diving"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Double Movement when diving"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Keen Eyes",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can see clearly up to 1 mile. +3 dice on Awareness to spot targets. Ignore penalties for range.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "falcon",
        "hawk"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 3,
            "condition": "awareness spotting"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "See 1 mile",
          "Ignore range penalties"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Talon Grip",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, may grapple if target is smaller. Can fly while carrying grappled target at half Movement.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "falcon",
        "hawk"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "grappled",
            "duration": "until escaped",
            "hitThreshold": null
          }
        ],
        "special": [
          "Grapple smaller targets",
          "Fly with grappled at half speed"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Silent Wings",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Flight at full Movement. Completely silent while flying. +3 dice on Stealth while airborne.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "owl"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 3,
            "condition": "stealth while flying"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Flight",
          "Silent flight"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Night Hunter",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can see in complete darkness. +2 dice on attacks in dim light or darkness.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "owl"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "in darkness/dim light"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "See in darkness"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Head Rotation",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Cannot be flanked. +2 dice on Awareness against hidden enemies.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "owl"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "awareness vs hidden"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Cannot be flanked"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Clever Mimic",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can mimic voices and sounds perfectly. +2 dice on deception using mimicry.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "raven"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "deception mimicry"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Perfect voice mimicry"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Eye Peck",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit with 3+ hits, target must roll AGI (TT 2) or gain blinded for 1 round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "raven"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "blinded",
            "duration": "1 round",
            "hitThreshold": 3
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Omen Bird",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Once per day, can provide a cryptic warning. Allies who hear it gain +1 die on their next roll to avoid danger.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "raven"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerFight",
        "appliedConditions": [],
        "special": [
          "Once/day: Cryptic warning",
          "Allies +1 die to avoid danger"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Flock Tactics",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+1 die per adjacent raven ally (max +3). Can share food locations and danger warnings with other ravens.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "raven"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 1,
            "condition": "per adjacent raven, max +3"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Echolocation",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can \"see\" underwater regardless of visibility. +2 dice on Awareness in water. Detect hidden creatures within 10 spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "dolphin"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "awareness in water"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "See underwater",
          "Detect hidden within 10 spaces"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Ramming Speed",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If moving at least 4 spaces before attacking, gain +2 dice and +2 damage. Target gains staggered.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "dolphin"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "after 4+ space swim"
          },
          {
            "type": "damagePool",
            "value": 2,
            "condition": "ram"
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "staggered",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pod Tactics",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+1 die per adjacent dolphin ally (max +3). Can communicate complex information to other dolphins.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "dolphin"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 1,
            "condition": "per adjacent dolphin, max +3"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Complex communication with dolphins"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Apex Ocean Hunter",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+3 dice against any aquatic creature. Can sense blood in water up to 1 mile away.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "orca"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 3,
            "condition": "vs aquatic creatures"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Sense blood 1 mile"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Wave Breach",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can leap up to 6 spaces out of water. When landing on or near a target, deal 3 Trauma and target gains prone.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "orca"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [
          {
            "condition": "prone",
            "duration": "until stood up",
            "hitThreshold": null
          }
        ],
        "special": [
          "Leap 6 spaces from water",
          "Landing near target: 3 Trauma + prone"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pack Hunter",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice when attacking a target that another orca attacked this round. Can coordinate attacks with other orcas.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "orca"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "target attacked by other orca this round"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Eight Arms",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can grapple up to 4 targets simultaneously. +2 dice on grapple attempts.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "octopus"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "grappling"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Grapple up to 4 targets"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Ink Cloud",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Once per combat, create a 4-space radius cloud of ink. Creatures inside are blinded and suffer -3 dice on attacks.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "octopus"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerFight",
        "appliedConditions": [],
        "special": [
          "Once/combat: 4-space ink cloud",
          "Inside: blinded, -3 dice attacks"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Camouflage",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+3 dice on Stealth. Can change color to match surroundings. First attack from hiding gains +2 dice.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "octopus"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 3,
            "condition": "stealth"
          },
          {
            "type": "attackPool",
            "value": 2,
            "condition": "first attack from hiding"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Squeeze Through",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can fit through any opening larger than its beak. Ignore movement penalties from tight spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "octopus"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Fit through tiny openings",
          "Ignore tight space penalties"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Desert Adapted",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Immune to heat effects. Can go 2 weeks without water. +2 dice on Fortitude in hot environments.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "camel"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "fortitude in heat"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to heat",
          "2 weeks without water"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Spitting Attack",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Ranged attack (6 spaces). On hit, target must roll Fortitude (TT 1) or suffer -2 dice on attacks for 1 round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "camel"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Ranged 6 spaces",
          "FOR (TT 1) or -2 dice attacks"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Beast of Burden",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can carry twice normal load without penalty. +2 Wounds.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "camel"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Double carry capacity",
          "+2 Wounds"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Dam Builder",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can create barriers in water (1 action). Barriers block movement and provide cover.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "beaver"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Action: Create water barrier",
          "Blocks movement, provides cover"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Powerful Bite",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+1 damage. Can gnaw through wood and similar materials at double speed.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "beaver"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "damagePool",
            "value": 1,
            "condition": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Gnaw wood at double speed"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Semi-Aquatic",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can hold breath for 15 minutes. Swim at full Movement. +2 dice on Stealth in water.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "beaver"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "stealth in water"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Hold breath 15 min",
          "Swim at full speed"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Powerful Grip",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice on grapple attempts. While grappling, can still make attacks with -1 die.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "ape"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "grappling"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Can attack while grappling at -1 die"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Brachiation",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can swing through trees/vines at double Movement. +1 die on attacks when dropping from above.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "ape"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 1,
            "condition": "dropping from above"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Double Movement swinging through trees"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Tool User",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can use improvised weapons without penalty. +1 damage when using rocks or clubs.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "ape"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "damagePool",
            "value": 1,
            "condition": "with rocks/clubs"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "No penalty with improvised weapons"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Intimidating Display",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "As an action, beat chest and roar. Enemies within 4 spaces must roll Resolve (TT 2) or gain shaken for 1 round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "ape"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [
          {
            "condition": "shaken",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Action: 4-space display, RES (TT 2) or shaken"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Fearless Fighter",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Immune to frightened. +2 dice when below half Wounds.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "badger"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "below half Wounds"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to frightened"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Burrower",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can burrow at half Movement. While in burrow, cannot be targeted. Can emerge and attack in same turn.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast",
        "vermin"
      ],
      "typeSpecific": [
        "badger",
        "worm",
        "ant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Burrow at half Movement",
          "In burrow: untargetable",
          "Can emerge + attack"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Savage Tenacity",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "When this NPC would be reduced to 0 Wounds, make one final attack before falling.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "badger"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerFight",
        "appliedConditions": [],
        "special": [
          "At 0 Wounds: make one final attack before falling"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Swooping Attack",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can fly at full Movement. When flying past an enemy, make an attack without stopping. +1 die if moving at least 4 spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "bat"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 1,
            "condition": "moving 4+ spaces"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Flight",
          "Attack while flying past"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Disorienting Screech",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "As an action, all creatures within 3 spaces must roll Fortitude (TT 2) or suffer -2 dice on attacks for 1 round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "bat"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Action: 3-space screech",
          "FOR (TT 2) or -2 dice attacks"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Death Roll",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit with 2+ hits against a grappled target, deal +2 damage and target gains prone.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "crocodile"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "damagePool",
            "value": 2,
            "condition": "vs grappled"
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "prone",
            "duration": "until stood up",
            "hitThreshold": 2
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Ambush Lurker",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "While partially submerged or in cover, attackers suffer -2 dice to hit this NPC. First attack from hiding gains +2 dice.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "crocodile"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "first attack from hiding"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "While submerged/in cover: attackers -2 dice"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Iron Jaws",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, target gains grappled. While grappling, this NPC can drag the target into water at half Movement.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "crocodile"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "grappled",
            "duration": "until escaped",
            "hitThreshold": null
          }
        ],
        "special": [
          "Can drag grappled target into water"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Armored Hide",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 DR against slashing and piercing. -1 DR against bludgeoning.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "crocodile"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "dr",
            "value": 2,
            "condition": "",
            "damageType": "slash"
          },
          {
            "type": "dr",
            "value": 2,
            "condition": "",
            "damageType": "pierce"
          },
          {
            "type": "dr",
            "value": -1,
            "condition": "",
            "damageType": "blunt"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Nine Lives",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "The first time this NPC would be reduced to 0 Wounds, remain at 1 Wound instead. Can occur up to 3 times per day.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "cat"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "First 3 times at 0 Wounds each day: stay at 1 Wound"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Nimble Dodge",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 Defense against attacks of opportunity. Can move through enemy spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "cat"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "defense",
            "value": 2,
            "condition": "vs opportunity attacks"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Move through enemy spaces"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Claws Out",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, target gains bleeding for 1 round. Can climb at full Movement.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "cat"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "bleeding",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Climb at full Movement"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Hood Display",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "As an action, flare hood. All enemies within 4 spaces must roll Resolve (TT 2) or suffer -1 die on attacks against this NPC for 1 round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "cobra"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Action: 4-space hood display",
          "Enemies RES (TT 2) or -1 die vs this NPC"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Lightning Strike",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice on attacks against targets that haven't acted yet this round.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "cobra"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "vs targets that haven't acted"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Winter Hunter",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Ignore movement penalties from snow or ice. +1 die on attacks in cold environments.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "lynx"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 1,
            "condition": "cold environments"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Ignore snow/ice movement penalties"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Ear Tufts",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice on Awareness. Can hear heartbeats within 6 spaces, detecting hidden creatures automatically.",
      "category": "typeTrait",
      "allowedClasses": [
        "beast"
      ],
      "typeSpecific": [
        "lynx"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "awareness"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Detect hidden creatures within 6 spaces via heartbeat"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Venomous Tail",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit with 2+ hits, target must roll Fortitude (TT 2) or gain poisoned for 2 rounds (2 Trauma at end of each turn).",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "scorpion"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "poisoned",
            "duration": "2 rounds",
            "hitThreshold": 2
          }
        ],
        "special": [
          "Poisoned: 2 Trauma at end of turn"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pincer Grip",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, may grapple target. While grappling, tail attacks gain +2 dice against the grappled target.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "scorpion"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "tail attacks vs grappled target"
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "grappled",
            "duration": "until escaped",
            "hitThreshold": null
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Desert Dweller",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Immune to heat. Can sense vibrations in sand, detecting hidden creatures within 8 spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "scorpion"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to heat",
          "Detect hidden within 8 spaces via vibrations"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Chitinous Armor",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 DR against slashing. Immune to prone.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "scorpion",
        "beetle"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "dr",
            "value": 2,
            "condition": "",
            "damageType": "slash"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to prone"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Shell Defense",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "As a reaction when attacked, gain +3 DR until start of next turn. Cannot move or attack while in shell.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "beetle"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "dr",
            "value": 3,
            "condition": "while in shell"
          }
        ],
        "trigger": "reaction",
        "appliedConditions": [],
        "special": [
          "Cannot move/attack while in shell"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Horns of Fury",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If moving at least 3 spaces before attacking, gain +2 dice and push target 2 spaces on hit.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "beetle"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "after 3+ space move"
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Push target 2 spaces"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Attach and Feed",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, attach to target. While attached, deal 1 Trauma at end of each turn and heal 1 Trauma. Target must spend action to remove.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "tick",
        "leech"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Attach on hit",
          "While attached: 1 Trauma/turn to target, heal 1",
          "Action to remove"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Disease Carrier",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, target must roll Fortitude (TT 2) or contract a disease (effects vary). Disease manifests after combat.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "tick",
        "mite",
        "cockroach"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "On hit: FOR (TT 2) or contract disease"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Unkillable",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "The first time reduced to 0 Wounds each combat, remain at 1 Wound. +2 DR against poison and disease.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "cockroach"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "dr",
            "value": 2,
            "condition": "vs poison/disease"
          }
        ],
        "trigger": "oncePerFight",
        "appliedConditions": [],
        "special": [
          "First 0 Wounds: stay at 1",
          "+2 DR vs poison/disease"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Scuttle Away",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "When hit, may move 3 spaces without provoking. Can fit through gaps as small as 1 inch.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "cockroach"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "reaction",
        "appliedConditions": [],
        "special": [
          "When hit, move 3 spaces no provoking",
          "Fit through 1 inch gaps"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Swarm Flight",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can fly at full Movement. +2 dice when 3+ locust allies are within 5 spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "locust"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "3+ locust allies within 5 spaces"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Flight"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Devouring Swarm",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "When 4+ locusts attack same target in a round, target takes +2 Trauma and gains slowed.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "locust"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [
          {
            "condition": "slowed",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "4+ locusts same target: +2 Trauma and slowed"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Wood Eater",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Attacks ignore DR from wooden armor/shields. Can consume wooden barriers at half Movement.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "termite"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Ignore wooden armor/shield DR",
          "Consume wood barriers"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Colony Mind",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+1 die for each termite ally within 3 spaces (max +4). All termites act on same initiative.",
      "category": "typeTrait",
      "allowedClasses": [
        "vermin"
      ],
      "typeSpecific": [
        "termite",
        "ant"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 1,
            "condition": "per termite within 3 spaces, max +4"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "All termites same initiative"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Corpse Eater",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can consume a corpse as an action to heal all Trauma and gain +2 dice on next attack.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "ghul"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "after consuming corpse"
          }
        ],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Consume corpse: heal all Trauma"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Paralyzing Touch",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit with 3+ hits, target must roll Fortitude (TT 2) or gain stunned for 1 round.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "ghul"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "stunned",
            "duration": "1 round",
            "hitThreshold": 3
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Grave Stench",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "All living creatures within 3 spaces suffer -2 dice on attacks due to nausea.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "ghul"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Living creatures within 3 spaces: -2 dice attacks"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Shapeshift",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can shift between human and wolf form as an action. Wolf form: +2 dice attacks, +2 Movement. Human form: can use weapons/items.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "werewolf"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "wolf form"
          },
          {
            "type": "movement",
            "value": 2,
            "condition": "wolf form"
          }
        ],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Action: shift forms"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Regeneration",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "At start of turn, heal 2 Trauma unless damaged by silver this round.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "werewolf"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onTurnStart",
        "appliedConditions": [],
        "special": [
          "Heal 2 Trauma at start of turn",
          "Does not work if damaged by silver"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Infectious Bite",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit with 3+ hits, target must roll Fortitude (TT 3) or become cursed with lycanthropy.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "werewolf"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "On 3+ hits: FOR (TT 3) or gain lycanthropy curse"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Lunar Frenzy",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "During full moon: +3 dice on attacks but must attack nearest creature each turn.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "werewolf"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 3,
            "condition": "during full moon"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Must attack nearest creature during full moon"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Eternal Hunger",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Must consume flesh each day or suffer -2 dice on all rolls. Consuming a corpse grants +2 dice for 1 hour.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "wendigo"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "after consuming flesh, 1 hour"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Must eat daily or -2 all rolls"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Freezing Aura",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "All creatures within 3 spaces take 1 Trauma at end of each round from cold. Water freezes within 6 spaces.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "wendigo"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onTurnEnd",
        "appliedConditions": [],
        "special": [
          "3 spaces: 1 cold Trauma/round",
          "Water freezes within 6 spaces"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Mimic Voice",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can perfectly mimic voices of creatures it has heard. +3 dice on deception to lure prey.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "wendigo"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 3,
            "condition": "deception to lure"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Mimic any heard voice"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Terrifying Speed",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+4 Movement. Can move through difficult terrain without penalty. Enemies that see this movement gain shaken.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "wendigo"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "movement",
            "value": 4,
            "condition": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [
          {
            "condition": "shaken",
            "duration": "1 round",
            "hitThreshold": null
          }
        ],
        "special": [
          "Ignore difficult terrain",
          "Movement causes shaken"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Plague Touch",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, target must roll Fortitude (TT 2) or gain poisoned for 3 rounds.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "blighted"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "poisoned",
            "duration": "3 rounds",
            "hitThreshold": null
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Rotten Flesh",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Immune to poison and disease. When hit by melee, attacker must roll Fortitude (TT 1) or take 1 Trauma from exposure.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "blighted"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to poison/disease",
          "Melee attackers: FOR (TT 1) or 1 Trauma"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Spreading Blight",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Plants and food within 6 spaces wither and rot. Water becomes undrinkable.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "blighted"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "6 spaces: plants wither, food rots, water poisoned"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Lifedrain Touch",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit, deal +2 Trauma and heal 2 Trauma. Target's max Wounds reduced by 1 until long rest.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "wight"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "damagePool",
            "value": 2,
            "condition": ""
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [],
        "special": [
          "Heal 2 Trauma",
          "Target max Wounds -1 until long rest"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Command Undead",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can command up to 4 lesser undead (zombies, skeletons) within 10 spaces. They act on this NPC's turn.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "wight"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Command 4 lesser undead within 10 spaces"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Sunlight Weakness",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "In direct sunlight, suffer -2 dice on all rolls and cannot regenerate.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "wight",
        "vampire"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "In sunlight: -2 all rolls, no regeneration"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Bestial Hunger",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit with 2+ hits, may drain blood to heal 2 Trauma. Target gains bleeding.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "vargin"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "bleeding",
            "duration": "2 rounds",
            "hitThreshold": 2
          }
        ],
        "special": [
          "On 2+ hits: heal 2 Trauma"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pack Leader",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Wolf and dog NPCs within 10 spaces gain +1 die on attacks. Can command wolves as a free action.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "vargin"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Wolves/dogs within 10 spaces: +1 die",
          "Command wolves as free action"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Savage Pounce",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "If moving at least 4 spaces before attacking, gain +2 dice. On hit, may knock target prone.",
      "category": "typeTrait",
      "allowedClasses": [
        "afflicted"
      ],
      "typeSpecific": [
        "vargin"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "after 4+ space move"
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "prone",
            "duration": "until stood up",
            "hitThreshold": null
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Wail of Death",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Once per combat, all living creatures within 8 spaces must roll Resolve (TT 3) or take 4 Trauma and gain frightened.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "banshee"
      ],
      "cost": 3,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerFight",
        "appliedConditions": [
          {
            "condition": "frightened",
            "duration": "until end of combat",
            "hitThreshold": null
          }
        ],
        "special": [
          "8 spaces: RES (TT 3) or 4 Trauma + frightened"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Harbinger of Death",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can sense when a creature within 100 spaces will die soon. +2 dice against creatures at half Wounds or less.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "banshee"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "vs targets at half Wounds or less"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Sense death within 100 spaces"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Keening",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Constant low wail. All enemies within 5 spaces suffer -1 die on attacks due to despair.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "banshee"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Enemies within 5 spaces: -1 die attacks"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Glamour",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can become invisible as an action. Attacking or taking damage ends invisibility. +3 dice on Stealth while invisible.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "sprite"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 3,
            "condition": "stealth while invisible"
          }
        ],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Action: become invisible",
          "Attacking/damage ends"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pixie Dust",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "As an action, target within 3 spaces must roll Fortitude (TT 2) or fall asleep for 1 minute. Any damage wakes them.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "sprite"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "3 spaces: FOR (TT 2) or sleep 1 minute",
          "Damage wakes"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Tiny Form",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+3 Defense due to size. Can fit through any opening. -2 damage on attacks.",
      "category": "typeTrait",
      "allowedClasses": [
        "apparition"
      ],
      "typeSpecific": [
        "sprite"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "defense",
            "value": 3,
            "condition": ""
          },
          {
            "type": "damagePool",
            "value": -2,
            "condition": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Fit through any opening"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Demon Strength",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 damage on all attacks. Can lift and throw objects twice normal weight.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "demon"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "damagePool",
            "value": 2,
            "condition": ""
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Lift/throw double weight"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Hellfire",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Once per combat, breathe fire in a 4-space cone. All creatures in cone take 3 Trauma and gain burning.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "demon",
        "hellhound"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "oncePerFight",
        "appliedConditions": [
          {
            "condition": "burning",
            "duration": "2 rounds",
            "hitThreshold": null
          }
        ],
        "special": [
          "4-space cone: 3 Trauma + burning"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Demon Hide",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 DR against non-magical attacks. Immune to fire and poison.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "demon"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "dr",
            "value": 2,
            "condition": "vs non-magical"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to fire and poison"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Pack Hunting",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice when attacking a target that another hellhound attacked this round.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "hellhound"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "target attacked by other hellhound"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Fire Immunity",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Immune to fire damage. Can walk through flames without harm. Body temperature burns on touch.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "hellhound"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to fire",
          "Touch deals 1 burn damage"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Tracking Hound",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can track any creature it has smelled. +3 dice on tracking. Cannot be lost or misdirected.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "hellhound"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 3,
            "condition": "tracking"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Track any smelled creature",
          "Cannot be misdirected"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Wish Granting",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can grant minor wishes with twisted interpretations. Mortals who accept wishes become bound.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "jinn"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 2,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Grant twisted wishes",
          "Wish-takers become bound"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Elemental Form",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can shift into smoke/fire/wind form. In elemental form: immune to physical attacks, +3 Movement, cannot attack.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "jinn"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "movement",
            "value": 3,
            "condition": "elemental form"
          }
        ],
        "trigger": "action",
        "appliedConditions": [],
        "special": [
          "Elemental form: immune to physical, cannot attack"
        ],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Ancient Knowledge",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+3 dice on all Knowledge rolls. Knows forgotten secrets and can read any language.",
      "category": "typeTrait",
      "allowedClasses": [
        "fiend"
      ],
      "typeSpecific": [
        "jinn"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 3,
            "condition": "knowledge rolls"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Read any language",
          "Know secrets"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Sneaky Sneaky",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice on Stealth. Can hide as a free action if in cover or darkness.",
      "category": "typeTrait",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [
        "goblin"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": 2,
            "condition": "stealth"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Hide as free action in cover/darkness"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Dirty Fighting",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+2 dice on attacks against flanked, prone, or restrained targets. Can throw dirt as an action (blinded 1 round, Fortitude TT 1 negates).",
      "category": "typeTrait",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [
        "goblin"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 2,
            "condition": "vs flanked/prone/restrained"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Action: throw dirt, FOR (TT 1) or blinded 1 round"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Strength in Numbers",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+1 die per goblin ally within 3 spaces (max +4). -2 dice on attacks when no allies are nearby.",
      "category": "typeTrait",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [
        "goblin"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "attackPool",
            "value": 1,
            "condition": "per goblin ally within 3 spaces, max +4"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "-2 dice when no allies nearby"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Massive Club",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "+3 damage. On hit with 2+ hits, target gains staggered.",
      "category": "typeTrait",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [
        "ogre"
      ],
      "cost": 2,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "damagePool",
            "value": 3,
            "condition": ""
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "staggered",
            "duration": "1 round",
            "hitThreshold": 2
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Dim-Witted",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "-2 dice on social and knowledge rolls. Immune to complex deceptions (too stupid to fool).",
      "category": "typeTrait",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [
        "ogre"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "pool",
            "value": -2,
            "condition": "social and knowledge"
          }
        ],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Immune to complex deceptions"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Throw Anything",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Can throw boulders, logs, or even smaller creatures. Ranged attack (8 spaces), 4 damage.",
      "category": "typeTrait",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [
        "ogre",
        "troll"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "Ranged 8 spaces, 4 damage",
          "Can throw creatures"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Troll Regeneration",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "At start of turn, heal 3 Trauma unless damaged by fire or acid this round.",
      "category": "typeTrait",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [
        "troll"
      ],
      "cost": 3,
      "tierRequirement": {
        "min": 1,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "onTurnStart",
        "appliedConditions": [],
        "special": [
          "Heal 3 Trauma/turn",
          "Stopped by fire/acid"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Rending Claws",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "On hit with 2+ hits, target gains bleeding. If already bleeding, deal +2 damage instead.",
      "category": "typeTrait",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [
        "troll"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [
          {
            "type": "damagePool",
            "value": 2,
            "condition": "vs already bleeding"
          }
        ],
        "trigger": "onHit",
        "appliedConditions": [
          {
            "condition": "bleeding",
            "duration": "2 rounds",
            "hitThreshold": 2
          }
        ],
        "special": [],
        "passive": false,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  },
  {
    "name": "Fire Vulnerability",
    "type": "npcTrait",
    "img": "systems/weight-of-ruin/assets/icons/traits/type.webp",
    "system": {
      "description": "Takes +2 damage from fire. Cannot regenerate while burning.",
      "category": "typeTrait",
      "allowedClasses": [
        "humanoid"
      ],
      "typeSpecific": [
        "troll"
      ],
      "cost": 1,
      "tierRequirement": {
        "min": 0,
        "max": 6
      },
      "mechanics": {
        "bonuses": [],
        "trigger": "",
        "appliedConditions": [],
        "special": [
          "+2 fire damage",
          "No regen while burning"
        ],
        "passive": true,
        "cooldown": ""
      },
      "roll": {
        "hasRoll": false,
        "pool": "",
        "difficulty": ""
      }
    }
  }
];

