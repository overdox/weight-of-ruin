/**
 * Pathways Compendium Data
 * All 6 pathways with skill grants
 */

export const PATHWAYS_DATA = [
  {
    name: "Apprenticeship",
    type: "pathway",
    img: "icons/tools/smithing/anvil.webp",
    system: {
      description: "<p><em>Years of learning a trade under a master's watchful eye.</em></p><p>You spent your formative years bound to a master craftsman, merchant, or professional. The work was often tedious, the lessons harsh, and the hours long—but you emerged with practical skills that will serve you for life. Whether you completed your training or fled before your term ended shapes how the world sees you now.</p>",
      rollValue: 1,
      skillGrants: [
        { skill: "Craft Skill", rank: 2, choice: true, options: ["Smithing", "Leatherworking", "Tailoring", "Carpentry", "Alchemy", "Apothecary", "Jewelcraft", "Cooking"] },
        { skill: "Bargaining", rank: 1, choice: false, options: [] },
        { skill: "Streetwise or Craft", rank: 1, choice: true, options: ["Streetwise", "Smithing", "Leatherworking", "Tailoring", "Carpentry", "Alchemy", "Apothecary", "Jewelcraft", "Cooking"] }
      ],
      contact: {
        type: "Master/Colleague",
        description: "Your former master (if on good terms) or a fellow apprentice (if not). They can provide information about the trade, access to tools or materials, and possibly employment—but may expect favors in return or hold grudges.",
        relationship: "professional"
      },
      narrativeHooks: [
        { name: "Incomplete Contract", description: "You may still owe time on your apprenticeship contract", type: "obligation" },
        { name: "Rival Apprentice", description: "A rival apprentice has risen to prominence and remembers old slights", type: "enemy" },
        { name: "Shared Secret", description: "Your master holds a secret you witnessed—or you hold one of theirs", type: "secret" },
        { name: "Unfinished Commission", description: "A commissioned work was never completed, and someone still wants it", type: "obligation" }
      ],
      resources: {
        wealthModifier: 0,
        equipment: [],
        privileges: []
      },
      duration: {
        years: 5,
        description: "5-7 years typical apprenticeship"
      },
      associatedArchetypes: ["Sage", "Rogue"],
      lpAward: 25
    }
  },
  {
    name: "Military Service",
    type: "pathway",
    img: "icons/environment/people/infantry-army.webp",
    system: {
      description: "<p><em>Training in the art of war, whether for king, coin, or survival.</em></p><p>You served in an armed force—perhaps a lord's levy, a mercenary company, a city watch, or a raiding band. You learned to fight, to follow orders, and to survive when others fell. The experience left marks on your body and soul, but it also gave you skills that few possess and fewer master.</p>",
      rollValue: 2,
      skillGrants: [
        { skill: "Combat Skill", rank: 2, choice: true, options: ["Swordplay", "Axecraft", "Polearms", "Archery", "Crossbows", "Brawling"] },
        { skill: "Athletics", rank: 1, choice: false, options: [] },
        { skill: "Military Skill", rank: 1, choice: true, options: ["Shields", "Warfare", "Swordplay", "Axecraft", "Polearms", "Archery", "Crossbows", "Brawling"] }
      ],
      contact: {
        type: "Comrade-in-arms",
        description: "A former comrade-in-arms. They may be another veteran seeking purpose, an officer who remembers your service, or a survivor from a battle you both would rather forget. They understand what you've seen and can be trusted—to a point.",
        relationship: "peer"
      },
      narrativeHooks: [
        { name: "Desertion", description: "You may have deserted, and someone is looking for you", type: "enemy" },
        { name: "Haunting Battle", description: "A battle you survived haunts your dreams—and your reputation", type: "secret" },
        { name: "Outstanding Debts", description: "You owe money to a former company or have bounty from unpaid contracts", type: "obligation" },
        { name: "Old Enemy", description: "An enemy from your service remembers your face", type: "enemy" }
      ],
      resources: {
        wealthModifier: 0,
        equipment: [],
        privileges: []
      },
      duration: {
        years: 3,
        description: "3-10 years of service"
      },
      associatedArchetypes: ["Warrior", "Rogue"],
      lpAward: 25
    }
  },
  {
    name: "Academic Study",
    type: "pathway",
    img: "icons/sundries/books/book-worn-blue.webp",
    system: {
      description: "<p><em>Formal education in letters, numbers, and the accumulated wisdom of ages.</em></p><p>You received the rare gift of education—whether in a monastery scriptorium, a noble tutor's study, or one of the few universities. You can read, write, and calculate, skills that set you apart from most of the population. You've touched the accumulated wisdom of centuries, even if you've barely scratched its surface.</p>",
      rollValue: 3,
      skillGrants: [
        { skill: "Knowledge Skill", rank: 2, choice: true, options: ["History", "Religion", "Arcane Lore", "Nature Lore", "Medicine", "Law", "Warfare", "Geography", "Heraldry", "Beast Lore"] },
        { skill: "Second Knowledge", rank: 2, choice: true, options: ["History", "Religion", "Arcane Lore", "Nature Lore", "Medicine", "Law", "Warfare", "Geography", "Heraldry", "Beast Lore"] },
        { skill: "Academic Skill", rank: 1, choice: true, options: ["Diplomacy", "Investigation", "History", "Religion", "Arcane Lore", "Nature Lore", "Medicine", "Law", "Warfare", "Geography", "Heraldry", "Beast Lore"] }
      ],
      contact: {
        type: "Scholar/Teacher",
        description: "A fellow scholar, a former teacher, or a rival academic. They can provide access to libraries, translate obscure texts, and share information about learned circles—but academics are often petty, and old rivalries die hard.",
        relationship: "mentor"
      },
      narrativeHooks: [
        { name: "Interrupted Studies", description: "Your studies were interrupted; you may seek to complete them or avoid those who expelled you", type: "goal" },
        { name: "Forbidden Knowledge", description: "You learned something dangerous—a forbidden text, a heretical interpretation, a secret history", type: "secret" },
        { name: "Stolen Work", description: "A thesis or discovery was stolen from you, and the thief rose on your work", type: "enemy" },
        { name: "Educational Debts", description: "You owe significant debts for your education", type: "obligation" }
      ],
      resources: {
        wealthModifier: 0,
        equipment: [],
        privileges: []
      },
      duration: {
        years: 4,
        description: "4-8 years of formal study"
      },
      associatedArchetypes: ["Sage", "Thaumaturge", "Zealot"],
      lpAward: 25
    }
  },
  {
    name: "Street Survival",
    type: "pathway",
    img: "icons/environment/settlement/city-entrance.webp",
    system: {
      description: "<p><em>Learning from the school of hard knocks, alleys, and desperation.</em></p><p>You grew up where the only lessons were those taught by experience and the only teachers were hunger and danger. The streets of a town or city were your classroom, and you learned to take what you needed, avoid what you couldn't handle, and disappear when necessary. Not everyone survives this education; you did.</p>",
      rollValue: 4,
      skillGrants: [
        { skill: "Stealth", rank: 2, choice: false, options: [] },
        { skill: "Streetwise", rank: 2, choice: false, options: [] },
        { skill: "Street Skill", rank: 1, choice: true, options: ["Sleight of Hand", "Deception", "Brawling"] }
      ],
      contact: {
        type: "Underworld Figure",
        description: "A fellow survivor from the streets—another orphan, a fence who bought your goods, a beggar who shared news, or a gang leader you once answered to. They know the underworld and can help you navigate it, but they also know your weaknesses.",
        relationship: "peer"
      },
      narrativeHooks: [
        { name: "Criminal Ties", description: "You may still owe allegiance or debts to a criminal organization", type: "obligation" },
        { name: "Street Rival", description: "Someone you wronged—or who wronged you—still walks the same streets", type: "enemy" },
        { name: "Dangerous Secrets", description: "You know secrets about powerful people who prefer them buried", type: "secret" },
        { name: "Past Crime", description: "A crime from your past may return to haunt you", type: "secret" }
      ],
      resources: {
        wealthModifier: 0,
        equipment: [],
        privileges: []
      },
      duration: {
        years: null,
        description: "Formative years on the streets"
      },
      associatedArchetypes: ["Rogue", "Warrior"],
      lpAward: 25
    }
  },
  {
    name: "Spiritual Calling",
    type: "pathway",
    img: "icons/magic/holy/prayer-hands-glowing-yellow.webp",
    system: {
      description: "<p><em>Devotion to faith, ritual, and the mysteries of the divine.</em></p><p>You felt the call of something greater and answered. Whether raised in a temple, taken in by a monastery, or drawn to pilgrimage, you dedicated yourself to spiritual matters. This path taught you the rituals, the doctrines, and the politics of faith. Whether your belief remains intact or has shattered is between you and whatever powers you once served.</p>",
      rollValue: 5,
      skillGrants: [
        { skill: "Religion", rank: 2, choice: false, options: [] },
        { skill: "Spiritual Skill", rank: 1, choice: true, options: ["Medicine", "Arcane Lore", "Ritefocus"] },
        { skill: "Persuasion", rank: 1, choice: false, options: [] }
      ],
      contact: {
        type: "Religious Figure",
        description: "A figure from your religious life—a mentor who guided your faith, a fellow initiate who shared your doubts, or a superior who may yet have plans for you. They represent your connection to organized faith, for good or ill.",
        relationship: "mentor"
      },
      narrativeHooks: [
        { name: "Broken Vows", description: "You may have left your order before completing vows—or after breaking them", type: "secret" },
        { name: "Crisis of Faith", description: "Your faith was shaken by something you witnessed or learned", type: "mystery" },
        { name: "Divine Purpose", description: "A senior figure sees potential in you and wishes to guide (or control) your path", type: "ally" },
        { name: "Sacred Duty", description: "You bear a sacred duty, prophecy, or obligation you have yet to fulfill", type: "obligation" }
      ],
      resources: {
        wealthModifier: 0,
        equipment: [],
        privileges: []
      },
      duration: {
        years: 5,
        description: "Years of religious training and service"
      },
      associatedArchetypes: ["Zealot", "Thaumaturge"],
      lpAward: 25
    }
  },
  {
    name: "Wandering",
    type: "pathway",
    img: "icons/environment/wilderness/terrain-river-road-gray.webp",
    system: {
      description: "<p><em>Years spent on roads and byways, learning from the world itself.</em></p><p>You never stayed in one place long enough to put down roots. Perhaps you traveled with a merchant caravan, followed a wandering parent, fled from pursuit, or simply felt the road calling. This rootless existence taught you adaptability, self-reliance, and a breadth of experience that few settled folk possess.</p>",
      rollValue: 6,
      skillGrants: [
        { skill: "Navigation", rank: 2, choice: false, options: [] },
        { skill: "Travel Skill", rank: 1, choice: true, options: ["Ride", "Athletics", "Bargaining", "Charm", "Swordplay", "Axecraft", "Archery", "History", "Geography", "Nature Lore"] },
        { skill: "Second Travel Skill", rank: 1, choice: true, options: ["Ride", "Athletics", "Bargaining", "Charm", "Swordplay", "Axecraft", "Archery", "History", "Geography", "Nature Lore"] }
      ],
      contact: {
        type: "Fellow Traveler",
        description: "Someone you met on the road—a fellow traveler, an innkeeper who remembers you, a merchant whose caravan you joined for a season, or a hermit who offered shelter. They are scattered across the land, and while none may be powerful, collectively they form a network.",
        relationship: "peer"
      },
      narrativeHooks: [
        { name: "Mixed Reputation", description: "You've passed through many places; in some, you're remembered fondly—in others, not", type: "secret" },
        { name: "Mysterious Witness", description: "You witnessed something in your travels that you don't fully understand", type: "mystery" },
        { name: "Pursued", description: "Someone or something drove you to wander, and it may find you again", type: "enemy" },
        { name: "Abandoned Heart", description: "You left someone behind who expected you to stay", type: "obligation" }
      ],
      resources: {
        wealthModifier: 0,
        equipment: [],
        privileges: []
      },
      duration: {
        years: null,
        description: "Years of travel and wandering"
      },
      associatedArchetypes: ["Rogue", "Warrior", "Sage"],
      lpAward: 25
    }
  }
];

export default PATHWAYS_DATA;
