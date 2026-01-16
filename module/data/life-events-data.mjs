/**
 * Life Events Compendium Data
 * 40 events across 4 suits (Love, Fortune, Conflict, Knowledge)
 *
 * benefits.type choices: skill, talent, attribute, wealth, contact, reputation, equipment, witchsight, zeal, other
 * complications.type choices: enemy, debt, obligation, secret, injury, reputation, phobia, loss, curse, other
 */

export const LIFE_EVENTS_DATA = [
  // ============ SUIT OF LOVE (1-10) ============
  {
    name: "First Love",
    type: "lifeEvent",
    img: "icons/magic/life/heart-glowing-red.webp",
    system: {
      description: "<p>A passionate romance that burned bright and brief.</p>",
      suit: "love",
      number: 1,
      benefits: [
        { type: "attribute", target: "persona", value: 1, description: "+1 Persona from the experience of love", choice: false, options: [] }
      ],
      complications: [
        { type: "other", target: "", severity: "moderate", description: "The relationship ended—your former lover may be married to another, dead, or nursing a grudge.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Sworn Sibling",
    type: "lifeEvent",
    img: "icons/skills/social/diplomacy-handshake-yellow.webp",
    system: {
      description: "<p>You found a kindred spirit and swore a bond of loyalty.</p>",
      suit: "love",
      number: 2,
      benefits: [
        { type: "contact", target: "", value: null, description: "A devoted friend who will aid you at significant personal risk", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "moderate", description: "They have a dangerous enemy who now considers you a target as well.", removable: false, removalCost: 0 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Betrayed by a Lover",
    type: "lifeEvent",
    img: "icons/magic/life/heart-broken-red.webp",
    system: {
      description: "<p>Someone you trusted with your heart used it against you.</p>",
      suit: "love",
      number: 3,
      benefits: [
        { type: "skill", target: "Insight", value: 1, description: "+1 Insight from learning to read people", choice: false, options: [] },
        { type: "skill", target: "Deception", value: 1, description: "+1 Deception from understanding lies", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "moderate", description: "Your betrayer still lives, possibly in a position of power, and may recognize you.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Secret Child",
    type: "lifeEvent",
    img: "icons/environment/people/commoner.webp",
    system: {
      description: "<p>You fathered or bore a child you have never acknowledged.</p>",
      suit: "love",
      number: 4,
      benefits: [
        { type: "other", target: "", value: null, description: "You may call upon this connection if it becomes known—an heir, a hostage, or an unexpected ally", choice: false, options: [] }
      ],
      complications: [
        { type: "secret", target: "", severity: "major", description: "The child exists somewhere. Someone may know. The other parent may seek you.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Marriage of Convenience",
    type: "lifeEvent",
    img: "icons/sundries/documents/document-sealed-brown-red.webp",
    system: {
      description: "<p>You wed (or were betrothed) for political or economic reasons.</p>",
      suit: "love",
      number: 5,
      benefits: [
        { type: "wealth", target: "", value: 20, description: "20 Orin from the marriage arrangement", choice: false, options: [] },
        { type: "contact", target: "", value: null, description: "A contact among your spouse's family", choice: false, options: [] }
      ],
      complications: [
        { type: "obligation", target: "", severity: "moderate", description: "The marriage may be loveless, binding, or entangled with obligations you wish to escape.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Death of a Loved One",
    type: "lifeEvent",
    img: "icons/magic/death/grave-tombstone-glow-teal.webp",
    system: {
      description: "<p>Someone dear to you died, changing you forever.</p>",
      suit: "love",
      number: 6,
      benefits: [
        { type: "attribute", target: "resolve", value: 1, description: "+1 Resolve from enduring loss", choice: false, options: [] },
        { type: "equipment", target: "", value: null, description: "You inherited a minor keepsake of sentimental value", choice: false, options: [] }
      ],
      complications: [
        { type: "phobia", target: "", severity: "minor", description: "You carry this loss. The GM may invoke it when dealing with similar situations.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Rescued from Peril",
    type: "lifeEvent",
    img: "icons/magic/light/beam-rays-blue.webp",
    system: {
      description: "<p>A stranger saved your life when no one else would.</p>",
      suit: "love",
      number: 7,
      benefits: [
        { type: "contact", target: "", value: null, description: "Someone who watches over you, expecting nothing but gratitude someday", choice: false, options: [] }
      ],
      complications: [
        { type: "debt", target: "", severity: "moderate", description: "You owe a debt you do not yet understand.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Unrequited Devotion",
    type: "lifeEvent",
    img: "icons/magic/life/heart-cross-purple-orange.webp",
    system: {
      description: "<p>You loved someone who never returned your feelings.</p>",
      suit: "love",
      number: 8,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 to Performance or Charm", choice: true, options: ["Performance", "Charm"] }
      ],
      complications: [
        { type: "other", target: "", severity: "minor", description: "The object of your affection still exists in the world, possibly as an obstacle.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Found Family",
    type: "lifeEvent",
    img: "icons/environment/people/group.webp",
    system: {
      description: "<p>You were taken in by people who became closer than blood.</p>",
      suit: "love",
      number: 9,
      benefits: [
        { type: "contact", target: "", value: null, description: "A contact who is fiercely protective of you", choice: false, options: [] },
        { type: "skill", target: "", value: 1, description: "+1 to Streetwise or Navigation", choice: true, options: ["Streetwise", "Navigation"] }
      ],
      complications: [
        { type: "obligation", target: "", severity: "moderate", description: "Your found family has enemies, debts, or obligations that now involve you.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Forbidden Passion",
    type: "lifeEvent",
    img: "icons/magic/life/heart-shadow-red.webp",
    system: {
      description: "<p>You loved across boundaries—class, faith, faction, or species.</p>",
      suit: "love",
      number: 10,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 to a Social skill of your choice", choice: true, options: ["Persuasion", "Intimidation", "Deception", "Charm", "Diplomacy", "Leadership", "Etiquette", "Bargaining", "Insight", "Performance", "Streetwise", "Carousing"] },
        { type: "contact", target: "", value: null, description: "A secret contact in the forbidden group", choice: false, options: [] }
      ],
      complications: [
        { type: "secret", target: "", severity: "major", description: "This relationship, if discovered, would scandalize or endanger you both.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },

  // ============ SUIT OF FORTUNE (11-20) ============
  {
    name: "Unexpected Inheritance",
    type: "lifeEvent",
    img: "icons/containers/chest/chest-simple-box-brown.webp",
    system: {
      description: "<p>A distant relative died and left you something of value.</p>",
      suit: "fortune",
      number: 1,
      benefits: [
        { type: "wealth", target: "", value: 50, description: "50 Orin or an item worth 75 Orin", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "moderate", description: "Others believe the inheritance should have been theirs, or it comes with conditions.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Gambler's Luck",
    type: "lifeEvent",
    img: "icons/sundries/gaming/dice-runed-brown.webp",
    system: {
      description: "<p>You won big in a game of chance.</p>",
      suit: "fortune",
      number: 2,
      benefits: [
        { type: "wealth", target: "", value: 30, description: "30 Orin from your winnings", choice: false, options: [] },
        { type: "skill", target: "Carousing", value: 1, description: "+1 Carousing when gambling", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "moderate", description: "The loser was powerful, connected, or vindictive—they have not forgotten.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Terrible Loss",
    type: "lifeEvent",
    img: "icons/environment/settlement/building-rubble.webp",
    system: {
      description: "<p>Everything you had was taken from you—fire, theft, or disaster.</p>",
      suit: "fortune",
      number: 3,
      benefits: [
        { type: "skill", target: "Streetwise", value: 1, description: "+1 Streetwise from surviving hardship", choice: false, options: [] },
        { type: "other", target: "", value: null, description: "You carry no debts from before", choice: false, options: [] }
      ],
      complications: [
        { type: "loss", target: "", severity: "major", description: "You lost something irreplaceable: an heirloom, a home, or evidence of your identity.", removable: false, removalCost: 0 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Patron's Favor",
    type: "lifeEvent",
    img: "icons/environment/people/cleric-grey.webp",
    system: {
      description: "<p>A wealthy or powerful individual took an interest in you.</p>",
      suit: "fortune",
      number: 4,
      benefits: [
        { type: "contact", target: "", value: null, description: "A patron who provides occasional support (money, connections, information)", choice: false, options: [] }
      ],
      complications: [
        { type: "obligation", target: "", severity: "moderate", description: "The Patron expects service and loyalty; defiance may be costly.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Merchant Venture",
    type: "lifeEvent",
    img: "icons/commodities/currency/coins-plain-stack-gold.webp",
    system: {
      description: "<p>You invested in a trade expedition.</p>",
      suit: "fortune",
      number: 5,
      benefits: [
        { type: "wealth", target: "", value: 40, description: "40 Orin from successful trade", choice: false, options: [] },
        { type: "skill", target: "Bargaining", value: 1, description: "+1 Bargaining from trading experience", choice: false, options: [] }
      ],
      complications: [
        { type: "debt", target: "", severity: "moderate", description: "A partner blames you for decisions made, or creditors believe you owe them.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Stroke of Fate",
    type: "lifeEvent",
    img: "icons/magic/light/explosion-star-large-teal.webp",
    system: {
      description: "<p>You escaped certain death through pure luck.</p>",
      suit: "fortune",
      number: 6,
      benefits: [
        { type: "zeal", target: "", value: 1, description: "+1 Zeal at the start of play", choice: false, options: [] }
      ],
      complications: [
        { type: "other", target: "", severity: "minor", description: "You survived when others did not. Someone may blame you, or guilt may haunt you.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Discovered Treasure",
    type: "lifeEvent",
    img: "icons/containers/chest/chest-reinforced-steel-green.webp",
    system: {
      description: "<p>You found something valuable hidden or forgotten.</p>",
      suit: "fortune",
      number: 7,
      benefits: [
        { type: "equipment", target: "", value: 50, description: "A valuable item (weapon, tool, or art object worth up to 50 Orin)", choice: false, options: [] }
      ],
      complications: [
        { type: "curse", target: "", severity: "moderate", description: "The item may be stolen, cursed, or sought by others who know what it truly is.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Ruinous Debt",
    type: "lifeEvent",
    img: "icons/sundries/documents/document-brown.webp",
    system: {
      description: "<p>You borrowed more than you could repay.</p>",
      suit: "fortune",
      number: 8,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 to any skill from training or tools", choice: true, options: ["Swordplay", "Axecraft", "Polearms", "Archery", "Crossbows", "Brawling", "Athletics", "Stealth", "Alchemy", "Medicine"] }
      ],
      complications: [
        { type: "debt", target: "", severity: "major", description: "You owe 100 Orin or a significant favor to someone who will collect.", removable: true, removalCost: 20 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Royal Notice",
    type: "lifeEvent",
    img: "icons/environment/people/cavalry-heavy.webp",
    system: {
      description: "<p>A noble or ruler noticed you—for good or ill.</p>",
      suit: "fortune",
      number: 9,
      benefits: [
        { type: "skill", target: "Etiquette", value: 1, description: "+1 Etiquette from exposure to court", choice: false, options: [] },
        { type: "contact", target: "", value: null, description: "One contact among servants of power", choice: false, options: [] }
      ],
      complications: [
        { type: "other", target: "", severity: "moderate", description: "Attention from the powerful is never safe. You may be used, watched, or eliminated.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Windfall and Loss",
    type: "lifeEvent",
    img: "icons/commodities/currency/coins-assorted-mix-copper.webp",
    system: {
      description: "<p>Fortune granted and snatched away in quick succession.</p>",
      suit: "fortune",
      number: 10,
      benefits: [
        { type: "skill", target: "Insight", value: 1, description: "+1 Insight from the experience", choice: false, options: [] },
        { type: "skill", target: "Bargaining", value: 1, description: "+1 Bargaining from the experience", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "moderate", description: "The cause of your loss (a swindler, a disaster, a curse) may return.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },

  // ============ SUIT OF CONFLICT (21-30) ============
  {
    name: "Blood Feud",
    type: "lifeEvent",
    img: "icons/skills/melee/blade-tips-triple-steel.webp",
    system: {
      description: "<p>You made a mortal enemy of someone dangerous.</p>",
      suit: "conflict",
      number: 1,
      benefits: [
        { type: "skill", target: "Investigation", value: 1, description: "+1 Investigation when tracking or researching your enemy", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "major", description: "You have a Nemesis who actively seeks your harm.", removable: false, removalCost: 0 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Battle Survivor",
    type: "lifeEvent",
    img: "icons/environment/people/infantry-army.webp",
    system: {
      description: "<p>You lived through a terrible conflict.</p>",
      suit: "conflict",
      number: 2,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 to a combat skill", choice: true, options: ["Swordplay", "Axecraft", "Polearms", "Archery", "Crossbows", "Brawling", "Shields"] },
        { type: "skill", target: "", value: 1, description: "+1 to Warfare or Medicine", choice: true, options: ["Warfare", "Medicine"] }
      ],
      complications: [
        { type: "phobia", target: "", severity: "moderate", description: "Trauma lingers. The GM may invoke memories at dramatic moments.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Killed Someone",
    type: "lifeEvent",
    img: "icons/skills/melee/blade-tip-chipped-blood-red.webp",
    system: {
      description: "<p>You took a life—in battle, self-defense, or cold blood.</p>",
      suit: "conflict",
      number: 3,
      benefits: [
        { type: "attribute", target: "resolve", value: 1, description: "+1 Resolve when facing lethal situations", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "moderate", description: "The dead have families. Someone may seek vengeance or justice.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Left for Dead",
    type: "lifeEvent",
    img: "icons/magic/death/bones-crossed-gray.webp",
    system: {
      description: "<p>You were defeated and abandoned to die.</p>",
      suit: "conflict",
      number: 4,
      benefits: [
        { type: "attribute", target: "fortitude", value: 1, description: "+1 Fortitude from surviving the ordeal", choice: false, options: [] }
      ],
      complications: [
        { type: "secret", target: "", severity: "major", description: "Those who left you believe you dead. The revelation of your survival will have consequences.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Captured and Ransomed",
    type: "lifeEvent",
    img: "icons/magic/control/debuff-chains-blue.webp",
    system: {
      description: "<p>You were held prisoner and eventually freed.</p>",
      suit: "conflict",
      number: 5,
      benefits: [
        { type: "skill", target: "Insight", value: 1, description: "+1 Insight from observing captors", choice: false, options: [] },
        { type: "contact", target: "", value: null, description: "A contact among former captors (strange as it seems)", choice: false, options: [] }
      ],
      complications: [
        { type: "debt", target: "", severity: "major", description: "The ransom may have cost your family everything, or your captor may expect future cooperation.", removable: true, removalCost: 20 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Duel of Honor",
    type: "lifeEvent",
    img: "icons/skills/melee/shield-block-bash-blue.webp",
    system: {
      description: "<p>You fought a formal duel over a matter of principle.</p>",
      suit: "conflict",
      number: 6,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 Intimidation or Charm when your name is known", choice: true, options: ["Intimidation", "Charm"] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "moderate", description: "The duel's other party (or their family) remembers. The matter may not be settled.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Witnessed Atrocity",
    type: "lifeEvent",
    img: "icons/magic/death/projectile-skull-fire-green.webp",
    system: {
      description: "<p>You saw something terrible—massacre, torture, or worse.</p>",
      suit: "conflict",
      number: 7,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 Sense Magic or Beast Lore", choice: true, options: ["Sense Magic", "Beast Lore"] }
      ],
      complications: [
        { type: "secret", target: "", severity: "major", description: "The memory does not fade. You may recognize perpetrators—or be recognized as a witness.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Hunted",
    type: "lifeEvent",
    img: "icons/skills/social/theft-pickpocket-bribery-brown.webp",
    system: {
      description: "<p>Someone powerful declared you an enemy.</p>",
      suit: "conflict",
      number: 8,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 Stealth or Navigation", choice: true, options: ["Stealth", "Navigation"] },
        { type: "other", target: "", value: null, description: "You can spot pursuit", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "major", description: "The hunt may be ongoing. You have an Enemy with resources.", removable: false, removalCost: 0 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Saved by Violence",
    type: "lifeEvent",
    img: "icons/skills/melee/strike-blade-blood-red.webp",
    system: {
      description: "<p>Only bloodshed preserved your life.</p>",
      suit: "conflict",
      number: 9,
      benefits: [
        { type: "talent", target: "Quick Thinking", value: null, description: "+1 to Initiative (Quick Thinking equivalent)", choice: false, options: [] }
      ],
      complications: [
        { type: "secret", target: "", severity: "moderate", description: "The violence solved one problem but created another. Someone knows what you did.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Marked by War",
    type: "lifeEvent",
    img: "icons/skills/wounds/injury-pain-body-orange.webp",
    system: {
      description: "<p>Combat left permanent reminders on your body.</p>",
      suit: "conflict",
      number: 10,
      benefits: [
        { type: "skill", target: "Intimidation", value: 1, description: "+1 Intimidation from your fearsome appearance", choice: false, options: [] },
        { type: "reputation", target: "", value: null, description: "Veterans recognize you as one of their own", choice: false, options: [] }
      ],
      complications: [
        { type: "injury", target: "", severity: "moderate", description: "You bear a visible mark (scar, missing finger, limp) that makes you memorable.", removable: false, removalCost: 0 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },

  // ============ SUIT OF KNOWLEDGE (31-40) ============
  {
    name: "Forbidden Text",
    type: "lifeEvent",
    img: "icons/sundries/books/book-worn-brown.webp",
    system: {
      description: "<p>You read something you should not have.</p>",
      suit: "knowledge",
      number: 1,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 Arcane Lore or Religion", choice: true, options: ["Arcane Lore", "Religion"] },
        { type: "other", target: "", value: null, description: "You know a dangerous secret", choice: false, options: [] }
      ],
      complications: [
        { type: "other", target: "", severity: "moderate", description: "The knowledge attracts attention. Those who guard such secrets may be watching.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Apprenticed to a Master",
    type: "lifeEvent",
    img: "icons/skills/trades/academics-study-reading-book.webp",
    system: {
      description: "<p>A skilled individual taught you in secret.</p>",
      suit: "knowledge",
      number: 2,
      benefits: [
        { type: "skill", target: "", value: 2, description: "+2 to any skill (cannot exceed rank 3 from this alone)", choice: true, options: ["Swordplay", "Axecraft", "Alchemy", "Medicine", "Arcane Lore", "Stealth", "Smithing", "Leatherworking"] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "moderate", description: "Your teacher had enemies, or taught you for reasons you do not yet understand.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Discovered a Secret",
    type: "lifeEvent",
    img: "icons/sundries/documents/document-sealed-beige-red.webp",
    system: {
      description: "<p>You learned something powerful about someone important.</p>",
      suit: "knowledge",
      number: 3,
      benefits: [
        { type: "other", target: "", value: null, description: "You have leverage—a secret that could ruin or compromise someone significant", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "major", description: "Secrets are dangerous. If they learn you know, they may act first.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Touched by the Veil",
    type: "lifeEvent",
    img: "icons/magic/perception/eye-tendrils-web-purple.webp",
    system: {
      description: "<p>You experienced something supernatural that changed you.</p>",
      suit: "knowledge",
      number: 4,
      benefits: [
        { type: "skill", target: "Sense Magic", value: 1, description: "+1 Sense Magic from supernatural exposure", choice: false, options: [] },
        { type: "other", target: "", value: null, description: "You can sometimes feel when magic is being worked nearby", choice: false, options: [] }
      ],
      complications: [
        { type: "curse", target: "", severity: "moderate", description: "The Veil remembers you. Strange coincidences follow, and Veil entities may take notice.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Failed Experiment",
    type: "lifeEvent",
    img: "icons/tools/laboratory/vials-blue-pink.webp",
    system: {
      description: "<p>You attempted something ambitious and it went wrong.</p>",
      suit: "knowledge",
      number: 5,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 to a craft skill", choice: true, options: ["Alchemy", "Medicine", "Smithing", "Carpentry", "Leatherworking"] }
      ],
      complications: [
        { type: "injury", target: "", severity: "moderate", description: "The failure had consequences: a scar, a debt, a destroyed reputation, or a victim.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Keeper of Secrets",
    type: "lifeEvent",
    img: "icons/sundries/documents/document-bound-white-tan.webp",
    system: {
      description: "<p>You were trusted with information others would kill for.</p>",
      suit: "knowledge",
      number: 6,
      benefits: [
        { type: "other", target: "", value: null, description: "You have a Secret—valuable information that could be traded, used, or protected", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "major", description: "Others seek this secret. Silence may be harder than speaking.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Heretical Learning",
    type: "lifeEvent",
    img: "icons/sundries/books/book-eye-purple.webp",
    system: {
      description: "<p>Your education crossed lines the orthodox forbid.</p>",
      suit: "knowledge",
      number: 7,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 to a knowledge skill", choice: true, options: ["History", "Religion", "Arcane Lore", "Nature Lore", "Medicine", "Law", "Warfare", "Geography", "Heraldry", "Beast Lore"] },
        { type: "other", target: "", value: null, description: "You know truths that contradict official doctrine", choice: false, options: [] }
      ],
      complications: [
        { type: "enemy", target: "", severity: "moderate", description: "Inquisitors, witch hunters, or orthodox scholars may consider you tainted.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Prophetic Dream",
    type: "lifeEvent",
    img: "icons/magic/perception/eye-ringed-glow-angry-teal.webp",
    system: {
      description: "<p>You dreamed something that seemed more than a dream.</p>",
      suit: "knowledge",
      number: 8,
      benefits: [
        { type: "other", target: "", value: null, description: "You have a vision of something yet to come—the GM will honor this in some form", choice: false, options: [] }
      ],
      complications: [
        { type: "obligation", target: "", severity: "moderate", description: "Prophecy is a burden. You may feel compelled to act on what you saw.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Mentored a Student",
    type: "lifeEvent",
    img: "icons/environment/people/cleric-orange.webp",
    system: {
      description: "<p>You taught someone what you knew.</p>",
      suit: "knowledge",
      number: 9,
      benefits: [
        { type: "skill", target: "", value: 1, description: "+1 to any skill you already have at rank 2+", choice: true, options: ["Any skill at rank 2+"] },
        { type: "contact", target: "", value: null, description: "A former student", choice: false, options: [] }
      ],
      complications: [
        { type: "other", target: "", severity: "minor", description: "Students may surpass, betray, or embarrass their teachers.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  },
  {
    name: "Glimpsed the Beyond",
    type: "lifeEvent",
    img: "icons/magic/death/skeleton-worn-skull-tan.webp",
    system: {
      description: "<p>You experienced something that suggested mortality is not the end.</p>",
      suit: "knowledge",
      number: 10,
      benefits: [
        { type: "attribute", target: "resolve", value: 1, description: "+1 Resolve—you fear death less", choice: false, options: [] },
        { type: "other", target: "", value: null, description: "You have a sense for the undead and spirits", choice: false, options: [] }
      ],
      complications: [
        { type: "curse", target: "", severity: "moderate", description: "What lies beyond took notice. You may have attracted unwanted attention from the other side.", removable: true, removalCost: 15 }
      ],
      lpValue: 10,
      narrativePrompt: "",
      linkedEvents: [],
      conditions: { minAge: null, maxAge: null, lineages: [], archetypes: [], other: "" }
    }
  }
];

export default LIFE_EVENTS_DATA;
