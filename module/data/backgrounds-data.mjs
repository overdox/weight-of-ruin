/**
 * Backgrounds Compendium Data
 * All 37 backgrounds organized by economic tier
 */

export const BACKGROUNDS_DATA = [
  // ============ UPPER TIER (7) ============
  {
    name: "Merchant Prince",
    type: "background",
    img: "icons/commodities/currency/coins-plain-stack-gold-yellow.webp",
    system: {
      description: "<p>Large-scale trade; high risk of total loss due to piracy, politics, or shipwreck.</p>",
      economicTier: "upper",
      monthlyIncome: { min: 230, max: 320 },
      startingWealth: 275,
      skillGrants: [
        { skill: "Bargaining", rank: 2 },
        { skill: "Etiquette", rank: 1 },
        { skill: "Geography", rank: 1 }
      ],
      contact: "Trade partner or ship captain",
      socialStanding: "exalted",
      lpAward: 0
    }
  },
  {
    name: "Moneylender",
    type: "background",
    img: "icons/commodities/currency/coins-plain-stack-gold.webp",
    system: {
      description: "<p>Interest is a river that never stops—until debtors riot, vanish, or \"renegotiate\" with knives; spends heavily on contracts, guards, and officials.</p>",
      economicTier: "upper",
      monthlyIncome: { min: 180, max: 260 },
      startingWealth: 220,
      skillGrants: [
        { skill: "Bargaining", rank: 2 },
        { skill: "Law", rank: 1 },
        { skill: "Insight", rank: 1 }
      ],
      contact: "Debtor or fellow financier",
      socialStanding: "anointed",
      lpAward: 0
    }
  },
  {
    name: "Guildmaster",
    type: "background",
    img: "icons/tools/smithing/anvil.webp",
    system: {
      description: "<p>Collects dues and controls permits; must fund feasts, bribes, apprenticeships, and \"charity,\" or the guild votes you out (or worse).</p>",
      economicTier: "upper",
      monthlyIncome: { min: 150, max: 230 },
      startingWealth: 190,
      skillGrants: [
        { skill: "Leadership", rank: 2 },
        { skill: "Bargaining", rank: 1 },
        { skill: "Etiquette", rank: 1 }
      ],
      contact: "Guild member or rival guildmaster",
      socialStanding: "anointed",
      lpAward: 0
    }
  },
  {
    name: "Steward",
    type: "background",
    img: "icons/sundries/documents/document-sealed-brown-red.webp",
    system: {
      description: "<p>Manages a Highborn's estate; stable income but legally liable for any losses.</p>",
      economicTier: "upper",
      monthlyIncome: { min: 160, max: 200 },
      startingWealth: 180,
      skillGrants: [
        { skill: "Law", rank: 2 },
        { skill: "Bargaining", rank: 1 },
        { skill: "Leadership", rank: 1 }
      ],
      contact: "Noble employer or estate servant",
      socialStanding: "anointed",
      lpAward: 0
    }
  },
  {
    name: "Justiciar",
    type: "background",
    img: "icons/skills/social/trading-justice-scale-gold.webp",
    system: {
      description: "<p>Crown salary with \"gift\" pressure from every side; one unpopular ruling can cost you your seat—or your life.</p>",
      economicTier: "upper",
      monthlyIncome: { min: 120, max: 170 },
      startingWealth: 145,
      skillGrants: [
        { skill: "Law", rank: 2 },
        { skill: "Insight", rank: 1 },
        { skill: "Intimidation", rank: 1 }
      ],
      contact: "Crown official or lawyer",
      socialStanding: "ordained",
      lpAward: 0
    }
  },
  {
    name: "Courtier",
    type: "background",
    img: "icons/commodities/treasure/crown-gold-laurel-wreath.webp",
    system: {
      description: "<p>Royal stipend; 70% must be reinvested into fashion and bribes to stay relevant.</p>",
      economicTier: "upper",
      monthlyIncome: { min: 90, max: 150 },
      startingWealth: 120,
      skillGrants: [
        { skill: "Etiquette", rank: 2 },
        { skill: "Charm", rank: 1 },
        { skill: "Deception", rank: 1 }
      ],
      contact: "Fellow courtier or royal servant",
      socialStanding: "ordained",
      lpAward: 0
    }
  },
  {
    name: "Master Artificer",
    type: "background",
    img: "icons/tools/laboratory/vials-blue-pink.webp",
    system: {
      description: "<p>Paid for precision wonders (and dangerous prototypes); materials are ruinous, failures become lawsuits.</p>",
      economicTier: "upper",
      monthlyIncome: { min: 90, max: 150 },
      startingWealth: 120,
      skillGrants: [
        { skill: "Alchemy", rank: 2 },
        { skill: "Smithing", rank: 1 },
        { skill: "Arcane Lore", rank: 1 }
      ],
      contact: "Patron or fellow artificer",
      socialStanding: "anointed",
      lpAward: 0
    }
  },

  // ============ MIDDLE TIER (11) ============
  {
    name: "Ship Captain",
    type: "background",
    img: "icons/tools/nautical/anchor.webp",
    system: {
      description: "<p>Wage plus a slice of cargo/profit; must keep a crew fed, a hull afloat, and a reputation intact.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 70, max: 140 },
      startingWealth: 105,
      skillGrants: [
        { skill: "Navigation", rank: 2 },
        { skill: "Leadership", rank: 1 },
        { skill: "Swim", rank: 1 }
      ],
      contact: "Crew member or harbor master",
      socialStanding: "anointed",
      lpAward: 0
    }
  },
  {
    name: "Knight",
    type: "background",
    img: "icons/environment/people/cavalry.webp",
    system: {
      description: "<p>Title-based; requires 60% of income for horse, squire, and armor maintenance.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 80, max: 130 },
      startingWealth: 105,
      skillGrants: [
        { skill: "Ride", rank: 2 },
        { skill: "Swordplay", rank: 1 },
        { skill: "Heraldry", rank: 1 }
      ],
      contact: "Liege lord or fellow knight",
      socialStanding: "exalted",
      lpAward: 0
    }
  },
  {
    name: "Master Mason",
    type: "background",
    img: "icons/tools/hand/pickaxe-steel-grey.webp",
    system: {
      description: "<p>Big projects pay well; wages vanish into tools, injuries, and keeping workers fed.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 60, max: 120 },
      startingWealth: 90,
      skillGrants: [
        { skill: "Carpentry", rank: 2 },
        { skill: "Leadership", rank: 1 },
        { skill: "Bargaining", rank: 1 }
      ],
      contact: "Guild member or architect",
      socialStanding: "anointed",
      lpAward: 0
    }
  },
  {
    name: "Disgraced Noble",
    type: "background",
    img: "icons/commodities/treasure/crown-gold-satin-gems-red.webp",
    system: {
      description: "<p>Still clinging to rents and favors, but hemorrhages money on debts, lawsuits, and appearances.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 50, max: 110 },
      startingWealth: 80,
      skillGrants: [
        { skill: "Etiquette", rank: 2 },
        { skill: "Heraldry", rank: 1 },
        { skill: "Deception", rank: 1 }
      ],
      contact: "Former servant or creditor",
      socialStanding: "exalted",
      lpAward: 0
    }
  },
  {
    name: "Abbot",
    type: "background",
    img: "icons/environment/people/cleric-grey.webp",
    system: {
      description: "<p>Manages monastery lands; vast resources, but personal use is strictly monitored.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 70, max: 110 },
      startingWealth: 90,
      skillGrants: [
        { skill: "Religion", rank: 2 },
        { skill: "Leadership", rank: 1 },
        { skill: "Medicine", rank: 1 }
      ],
      contact: "Monk or bishop",
      socialStanding: "ordained",
      lpAward: 0
    }
  },
  {
    name: "Physician",
    type: "background",
    img: "icons/tools/laboratory/bowl-liquid-orange.webp",
    system: {
      description: "<p>Wealthy patients pay handsomely, but sanitation, instruments, and plague risk make work costly.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 65, max: 105 },
      startingWealth: 85,
      skillGrants: [
        { skill: "Medicine", rank: 2 },
        { skill: "Apothecary", rank: 1 },
        { skill: "Insight", rank: 1 }
      ],
      contact: "Patient or fellow physician",
      socialStanding: "anointed",
      lpAward: 0
    }
  },
  {
    name: "Apothecary",
    type: "background",
    img: "icons/tools/cooking/mortar-herbs-yellow.webp",
    system: {
      description: "<p>Skilled professional; income tied to rare herb availability and plague seasons.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 45, max: 70 },
      startingWealth: 57,
      skillGrants: [
        { skill: "Apothecary", rank: 2 },
        { skill: "Nature Lore", rank: 1 },
        { skill: "Bargaining", rank: 1 }
      ],
      contact: "Herb supplier or customer",
      socialStanding: "anointed",
      lpAward: 0
    }
  },
  {
    name: "Smuggler",
    type: "background",
    img: "icons/containers/bags/sack-leather-brown.webp",
    system: {
      description: "<p>Good money in quiet routes; bad money when customs seizes cargo or informants talk.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 40, max: 95 },
      startingWealth: 67,
      skillGrants: [
        { skill: "Stealth", rank: 2 },
        { skill: "Deception", rank: 1 },
        { skill: "Streetwise", rank: 1 }
      ],
      contact: "Fence or corrupt official",
      socialStanding: "heretics",
      lpAward: 0
    }
  },
  {
    name: "Investigator",
    type: "background",
    img: "icons/tools/scribal/lens-grey-brown.webp",
    system: {
      description: "<p>Fee-for-service; high travel expenses; income fluctuates with crime rates.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 40, max: 65 },
      startingWealth: 52,
      skillGrants: [
        { skill: "Investigation", rank: 2 },
        { skill: "Insight", rank: 1 },
        { skill: "Streetwise", rank: 1 }
      ],
      contact: "Client or informant",
      socialStanding: "anointed",
      lpAward: 0
    }
  },
  {
    name: "Innkeeper",
    type: "background",
    img: "icons/consumables/drinks/alcohol-beer-stein-wooden-brown.webp",
    system: {
      description: "<p>Steady coin if the beds stay filled; profits leak into spoilage, repairs, and brawl damage.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 35, max: 65 },
      startingWealth: 50,
      skillGrants: [
        { skill: "Carousing", rank: 2 },
        { skill: "Insight", rank: 1 },
        { skill: "Bargaining", rank: 1 }
      ],
      contact: "Regular patron or supplier",
      socialStanding: "anointed",
      lpAward: 0
    }
  },
  {
    name: "Bailiff",
    type: "background",
    img: "icons/sundries/documents/document-official-capital.webp",
    system: {
      description: "<p>Stable; responsible for collecting fines/taxes; prone to \"corruption\" bonuses.</p>",
      economicTier: "middle",
      monthlyIncome: { min: 35, max: 55 },
      startingWealth: 45,
      skillGrants: [
        { skill: "Law", rank: 2 },
        { skill: "Intimidation", rank: 1 },
        { skill: "Investigation", rank: 1 }
      ],
      contact: "Lord or tax dodger",
      socialStanding: "anointed",
      lpAward: 0
    }
  },

  // ============ LOWER TIER (8) ============
  {
    name: "Jailer",
    type: "background",
    img: "icons/tools/hand/lockpicks-steel-grey.webp",
    system: {
      description: "<p>Government salary; supplemented by \"comfort fees\" paid by wealthy prisoners.</p>",
      economicTier: "lower",
      monthlyIncome: { min: 30, max: 50 },
      startingWealth: 40,
      skillGrants: [
        { skill: "Intimidation", rank: 2 },
        { skill: "Insight", rank: 1 },
        { skill: "Brawling", rank: 1 }
      ],
      contact: "Guard or prisoner",
      socialStanding: "heretics",
      lpAward: 50
    }
  },
  {
    name: "Executioner",
    type: "background",
    img: "icons/skills/melee/hand-grip-axe-strike-orange.webp",
    system: {
      description: "<p>Stable crown/city pay, but socially radioactive; forced to live in isolation.</p>",
      economicTier: "lower",
      monthlyIncome: { min: 25, max: 45 },
      startingWealth: 35,
      skillGrants: [
        { skill: "Axecraft", rank: 2 },
        { skill: "Intimidation", rank: 1 },
        { skill: "Medicine", rank: 1 }
      ],
      contact: "Condemned prisoner or official",
      socialStanding: "heretics",
      lpAward: 50
    }
  },
  {
    name: "Blacksmith",
    type: "background",
    img: "icons/tools/smithing/anvil.webp",
    system: {
      description: "<p>Reliable demand, brutal hours; earnings swing with iron/charcoal prices and guild dues.</p>",
      economicTier: "lower",
      monthlyIncome: { min: 24, max: 38 },
      startingWealth: 31,
      skillGrants: [
        { skill: "Smithing", rank: 2 },
        { skill: "Bargaining", rank: 1 },
        { skill: "Athletics", rank: 1 }
      ],
      contact: "Supplier or customer",
      socialStanding: "penitent",
      lpAward: 50
    }
  },
  {
    name: "Barber-Surgeon",
    type: "background",
    img: "icons/tools/cooking/knife-cleaver-steel-grey.webp",
    system: {
      description: "<p>Bloodletting, pulling teeth, basic stitching; equipment dulls fast, infections risk lynch mobs.</p>",
      economicTier: "lower",
      monthlyIncome: { min: 20, max: 40 },
      startingWealth: 30,
      skillGrants: [
        { skill: "Medicine", rank: 2 },
        { skill: "Sleight of Hand", rank: 1 },
        { skill: "Charm", rank: 1 }
      ],
      contact: "Patient or fellow surgeon",
      socialStanding: "penitent",
      lpAward: 50
    }
  },
  {
    name: "Caravan Guard",
    type: "background",
    img: "icons/environment/people/infantry.webp",
    system: {
      description: "<p>Wages and hazard pay look good until gear breaks and weeks pass between payouts.</p>",
      economicTier: "lower",
      monthlyIncome: { min: 20, max: 45 },
      startingWealth: 32,
      skillGrants: [
        { skill: "Swordplay", rank: 2 },
        { skill: "Navigation", rank: 1 },
        { skill: "Ride", rank: 1 }
      ],
      contact: "Merchant or fellow guard",
      socialStanding: "penitent",
      lpAward: 50
    }
  },
  {
    name: "Minstrel",
    type: "background",
    img: "icons/magic/nature/instrument-recorder-leaves.webp",
    system: {
      description: "<p>Tips and patron gifts spike during feasts; wrong song can earn a beating or warrant.</p>",
      economicTier: "lower",
      monthlyIncome: { min: 15, max: 45 },
      startingWealth: 30,
      skillGrants: [
        { skill: "Performance", rank: 2 },
        { skill: "Charm", rank: 1 },
        { skill: "Streetwise", rank: 1 }
      ],
      contact: "Patron or fellow performer",
      socialStanding: "penitent",
      lpAward: 50
    }
  },
  {
    name: "Pit Fighter",
    type: "background",
    img: "icons/weapons/fist/fist-knuckles-brass.webp",
    system: {
      description: "<p>High peaks, low valleys; income depends on winning; high medical overhead.</p>",
      economicTier: "lower",
      monthlyIncome: { min: 15, max: 40 },
      startingWealth: 27,
      skillGrants: [
        { skill: "Brawling", rank: 2 },
        { skill: "Athletics", rank: 1 },
        { skill: "Intimidation", rank: 1 }
      ],
      contact: "Fight promoter or rival",
      socialStanding: "heretics",
      lpAward: 50
    }
  },
  {
    name: "Night Watchman",
    type: "background",
    img: "icons/sundries/lights/torch-brown.webp",
    system: {
      description: "<p>Low base pay; supplemented by \"hush money\" from gangs or small bribes.</p>",
      economicTier: "lower",
      monthlyIncome: { min: 15, max: 28 },
      startingWealth: 21,
      skillGrants: [
        { skill: "Stealth", rank: 1 },
        { skill: "Insight", rank: 1 },
        { skill: "Streetwise", rank: 2 }
      ],
      contact: "Fellow watchman or criminal",
      socialStanding: "penitent",
      lpAward: 50
    }
  },

  // ============ STRUGGLING TIER (11) ============
  {
    name: "Scribe",
    type: "background",
    img: "icons/sundries/documents/document-letter-tan.webp",
    system: {
      description: "<p>Paid per contract, letter, or copy; ink and parchment aren't cheap.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 12, max: 24 },
      startingWealth: 18,
      skillGrants: [
        { skill: "History", rank: 1 },
        { skill: "Law", rank: 1 },
        { skill: "Etiquette", rank: 1 }
      ],
      contact: "Employer or fellow scribe",
      socialStanding: "penitent",
      lpAward: 50
    }
  },
  {
    name: "Grave Robber",
    type: "background",
    img: "icons/environment/settlement/graveyard-tombstone-night.webp",
    system: {
      description: "<p>Highly illegal; income depends on \"freshness\" of burials and bribes to keep lanterns turned away.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 5, max: 25 },
      startingWealth: 15,
      skillGrants: [
        { skill: "Stealth", rank: 2 },
        { skill: "Streetwise", rank: 1 },
        { skill: "Medicine", rank: 1 }
      ],
      contact: "Fence or anatomist",
      socialStanding: "outcast",
      lpAward: 50
    }
  },
  {
    name: "Village Idiot",
    type: "background",
    img: "icons/environment/people/commoner.webp",
    system: {
      description: "<p>Paid in \"kind\" (eggs/milk) as much as coin; feared and socially isolated.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 10, max: 18 },
      startingWealth: 14,
      skillGrants: [
        { skill: "Performance", rank: 1 },
        { skill: "Insight", rank: 2 },
        { skill: "Streetwise", rank: 1 }
      ],
      contact: "Village elder or traveling merchant",
      socialStanding: "outcast",
      lpAward: 50
    }
  },
  {
    name: "Gong-farmer",
    type: "background",
    img: "icons/tools/hand/pickaxe-simple-stone-brown.webp",
    system: {
      description: "<p>High-pay for a low-tier job: emptying cesspits; most coin goes to alcohol and soap.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 10, max: 16 },
      startingWealth: 13,
      skillGrants: [
        { skill: "Athletics", rank: 2 },
        { skill: "Streetwise", rank: 1 },
        { skill: "Carousing", rank: 1 }
      ],
      contact: "Fellow worker or tavern keeper",
      socialStanding: "heretics",
      lpAward: 50
    }
  },
  {
    name: "Dockhand",
    type: "background",
    img: "icons/tools/nautical/anchor.webp",
    system: {
      description: "<p>Day wages and backbreaking loads; injuries common, foremen skim.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 8, max: 14 },
      startingWealth: 11,
      skillGrants: [
        { skill: "Athletics", rank: 2 },
        { skill: "Swim", rank: 1 },
        { skill: "Brawling", rank: 1 }
      ],
      contact: "Sailor or foreman",
      socialStanding: "penitent",
      lpAward: 50
    }
  },
  {
    name: "Camp Follower",
    type: "background",
    img: "icons/environment/wilderness/camp-improvised.webp",
    system: {
      description: "<p>Scavenging and odd jobs for armies; income fluctuates with war/peace.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 6, max: 12 },
      startingWealth: 9,
      skillGrants: [
        { skill: "Streetwise", rank: 2 },
        { skill: "Bargaining", rank: 1 },
        { skill: "Medicine", rank: 1 }
      ],
      contact: "Soldier or fellow camp follower",
      socialStanding: "heretics",
      lpAward: 50
    }
  },
  {
    name: "Bastard",
    type: "background",
    img: "icons/environment/settlement/city-night.webp",
    system: {
      description: "<p>Paid per tail by the guild; high risk of disease/infection costs.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 4, max: 10 },
      startingWealth: 7,
      skillGrants: [
        { skill: "Charm", rank: 2 },
        { skill: "Deception", rank: 1 },
        { skill: "Insight", rank: 1 }
      ],
      contact: "Client or guild master",
      socialStanding: "heretics",
      lpAward: 50
    }
  },
  {
    name: "Vagrant",
    type: "background",
    img: "icons/skills/social/diplomacy-handshake-gray.webp",
    system: {
      description: "<p>Begging, petty theft, and \"running errands\" for gangs; constant risk.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 4, max: 8 },
      startingWealth: 6,
      skillGrants: [
        { skill: "Streetwise", rank: 2 },
        { skill: "Stealth", rank: 1 },
        { skill: "Sleight of Hand", rank: 1 }
      ],
      contact: "Beggar king or gang leader",
      socialStanding: "outcast",
      lpAward: 50
    }
  },
  {
    name: "Mudlark",
    type: "background",
    img: "icons/magic/water/elemental-water.webp",
    system: {
      description: "<p>Scavenging riverbanks at low tide for scrap; income luck-based, trench foot common.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 3, max: 7 },
      startingWealth: 5,
      skillGrants: [
        { skill: "Investigation", rank: 2 },
        { skill: "Swim", rank: 1 },
        { skill: "Streetwise", rank: 1 }
      ],
      contact: "Fence or fellow mudlark",
      socialStanding: "outcast",
      lpAward: 50
    }
  },
  {
    name: "Serf",
    type: "background",
    img: "icons/skills/trades/farming-scarecrow-simple-green.webp",
    system: {
      description: "<p>Bound to land and obligation; mostly paid in grain or labor credit.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 1, max: 5 },
      startingWealth: 3,
      skillGrants: [
        { skill: "Athletics", rank: 2 },
        { skill: "Nature Lore", rank: 1 },
        { skill: "Cooking", rank: 1 }
      ],
      contact: "Lord or village elder",
      socialStanding: "penitent",
      lpAward: 50
    }
  },
  {
    name: "Flagellant",
    type: "background",
    img: "icons/equipment/back/cloak-brown-collared-fur-white-tied.webp",
    system: {
      description: "<p>Relies on alms; income must be spent on self-mortification tools or penance.</p>",
      economicTier: "struggling",
      monthlyIncome: { min: 0, max: 3 },
      startingWealth: 1,
      skillGrants: [
        { skill: "Religion", rank: 2 },
        { skill: "Persuasion", rank: 1 },
        { skill: "Intimidation", rank: 1 }
      ],
      contact: "Fellow penitent or priest",
      socialStanding: "outcast",
      lpAward: 50
    }
  }
];

export default BACKGROUNDS_DATA;
