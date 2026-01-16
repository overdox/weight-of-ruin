/**
 * Gear Compendium Data
 * All gear from The Weight of Ruin Equipment Catalogue
 * Categories: clothing, consumable, container, curio, kit, remedy, tool
 * Values in Sovereigns (1 Crown = 10 Sovereigns, 1 Orin = 100 Sovereigns)
 */

import GearData from '../data-models/item/gear.mjs';

export const GEAR_DATA = [
  // ============================================
  // CONTAINERS
  // Items designed to carry, store, or transport other goods
  // ============================================
  {
    name: "Satchel",
    type: "gear",
    img: GearData.getGroupIcon("container"),
    system: {
      description: "<p>A shoulder-slung leather bag with a single buckle. Holds documents, coins, or a day's worth of small necessities without slowing you down.</p>",
      gearGroup: "container",
      weight: 1,
      value: 8,
      quantity: 1,
      container: { isContainer: true, capacity: 10, contents: [] },
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Backpack (Framed)",
    type: "gear",
    img: GearData.getGroupIcon("container"),
    system: {
      description: "<p>A canvas pack reinforced with wooden slats to distribute weight across the shoulders. The adventurer's burden, quite literally.</p>",
      gearGroup: "container",
      weight: 3,
      value: 20,
      quantity: 1,
      container: { isContainer: true, capacity: 30, contents: [] },
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Burlap Sacks (×3)",
    type: "gear",
    img: GearData.getGroupIcon("container"),
    system: {
      description: "<p>For carrying loot, or occasionally, a severed head. Cheap and disposable—like most hirelings.</p>",
      gearGroup: "container",
      weight: 1,
      value: 3,
      quantity: 3,
      container: { isContainer: true, capacity: 15, contents: [] },
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Small Cage (Wicker)",
    type: "gear",
    img: GearData.getGroupIcon("container"),
    system: {
      description: "<p>For a \"canary in a coalmine\" or a Sage's familiar. The bars are too close for anything larger than a rat to escape.</p>",
      gearGroup: "container",
      weight: 2,
      value: 6,
      quantity: 1,
      container: { isContainer: true, capacity: 2, contents: [] },
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Waterskin (Leathern)",
    type: "gear",
    img: GearData.getGroupIcon("container"),
    system: {
      description: "<p>Holds enough water for one day. The leather taste never quite fades, no matter how long you own it.</p>",
      gearGroup: "container",
      weight: 1,
      value: 5,
      quantity: 1,
      container: { isContainer: true, capacity: 1, contents: [] },
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Empty Glass Vials (×5)",
    type: "gear",
    img: GearData.getGroupIcon("container"),
    system: {
      description: "<p>To collect samples of blood, ichor, or strange waters. Stoppered with cork and wrapped in cloth to prevent breakage.</p>",
      gearGroup: "container",
      weight: 0.5,
      value: 10,
      quantity: 5,
      container: { isContainer: true, capacity: 0.5, contents: [] },
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      properties: [],
      carried: true,
      equipped: false
    }
  },

  // ============================================
  // TOOLS
  // Implements for accomplishing specific tasks
  // ============================================
  {
    name: "Crowbar",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>For when the Rogue fails or a tomb lid is too heavy. Also serves admirably as a weapon of last resort.</p>",
      gearGroup: "tool",
      weight: 5,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Block and Tackle",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>A pulley system for lifting heavy treasures or fallen comrades. Requires an anchor point and patience.</p>",
      gearGroup: "tool",
      weight: 4,
      value: 30,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Lockpicks (Stolen/Improvised)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>Essential for Rogues; often hidden in boot linings. Possession alone is a hanging offense in most provinces.</p>",
      gearGroup: "tool",
      weight: 0,
      value: 50,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "lockpicking",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Shovel (Folding)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>For burying the dead, or digging them up. The blade folds against the handle for easier transport.</p>",
      gearGroup: "tool",
      weight: 4,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Hammer (Claw)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>General repairs or boarding up windows during a siege. The claw end finds other uses in desperate moments.</p>",
      gearGroup: "tool",
      weight: 2,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Bellows (Hand)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>Useful for reviving a dying fire or clearing smoke from a small room. Leather cracks if not oiled regularly.</p>",
      gearGroup: "tool",
      weight: 2,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Hourglass (Sand)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>For timing spells, guard shifts, or how long the poison takes to work. Glass is fragile; handle with care.</p>",
      gearGroup: "tool",
      weight: 1,
      value: 30,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Nails (Iron, ×50)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>Common iron nails in a leather pouch. Essential for carpentry, barricades, or impromptu crucifixions.</p>",
      gearGroup: "tool",
      weight: 1,
      value: 4,
      quantity: 50,
      consumable: { isConsumable: true, uses: { current: 50, max: 50 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Compass (Magnetized Needle)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>Rare and temperamental near magical sites. The needle floats in oil within a brass case; it spins wildly near the Veil.</p>",
      gearGroup: "tool",
      weight: 0.5,
      value: 150,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "survival",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Saw (Folding)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>For clearing brush or, in grim emergencies, field amputations. The teeth are coarse—meant for bone as much as wood.</p>",
      gearGroup: "tool",
      weight: 2,
      value: 16,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Whetstone",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>Keeping blades sharp is a daily ritual for Warriors and Rogues. A dull edge costs lives.</p>",
      gearGroup: "tool",
      weight: 0.5,
      value: 3,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Mortar and Pestle",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>For the Sage or Thaumaturge to grind ingredients on the go. Stone holds no residue between uses.</p>",
      gearGroup: "tool",
      weight: 3,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "alchemy",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Lantern (Hooded)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>Iron-framed with shuttered panels to control the light. Burns oil steadily; the hood prevents it betraying your position.</p>",
      gearGroup: "tool",
      weight: 2,
      value: 40,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Chisel Set (×5)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>Hardened steel chisels of varying widths. For stonework, woodcarving, or prying gems from their settings.</p>",
      gearGroup: "tool",
      weight: 2,
      value: 20,
      quantity: 5,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Plumb Line",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>A lead weight on a string for determining true vertical. Masons and sappers rely on it; so do those who dig in unstable ruins.</p>",
      gearGroup: "tool",
      weight: 0.5,
      value: 4,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "File (Metal)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>For sharpening tools, removing rust, or slowly working through iron bars. Patience is required; silence is not guaranteed.</p>",
      gearGroup: "tool",
      weight: 1,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Tongs (Blacksmith's)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>For handling hot metal or anything else you'd rather not touch with bare hands. The grip is sure; the reach is merciful.</p>",
      gearGroup: "tool",
      weight: 2,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Auger (Hand Drill)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>A T-handled drill for boring holes in wood or soft stone. Essential for trapmakers and carpenters alike.</p>",
      gearGroup: "tool",
      weight: 2,
      value: 14,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Calipers (Brass)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>Precision measuring tools for the discerning craftsman. Useful for appraising gems or ensuring a lock's tolerances.</p>",
      gearGroup: "tool",
      weight: 0.5,
      value: 40,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Pliers (Iron)",
    type: "gear",
    img: GearData.getGroupIcon("tool"),
    system: {
      description: "<p>For gripping, bending, and extracting. Nails, teeth, and confessions all yield to sufficient pressure.</p>",
      gearGroup: "tool",
      weight: 1,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },

  // ============================================
  // CONSUMABLES
  // Resources that are depleted through use
  // ============================================
  {
    name: "Tallow Candles (×5)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Rendered animal fat pressed around a wick. They stink, they drip, and they're all most can afford. Each burns for roughly four hours.</p>",
      gearGroup: "consumable",
      weight: 1,
      value: 2,
      quantity: 5,
      consumable: { isConsumable: true, uses: { current: 5, max: 5 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Lamp Oil (Ceramic Flask)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Enough oil to fuel a lantern through a long night. The ceramic keeps it from shattering—and from igniting prematurely.</p>",
      gearGroup: "consumable",
      weight: 1,
      value: 6,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Hardtack (Rations, 7 days)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Rock-hard biscuits that require soaking in broth to eat without breaking a tooth. Weevils are extra protein.</p>",
      gearGroup: "consumable",
      weight: 3,
      value: 5,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 7, max: 7 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Dried Salt-Pork (Rations, 7 days)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Preserved meat that lasts months but increases thirst. Cut thin and chew slowly, or risk cracking a molar.</p>",
      gearGroup: "consumable",
      weight: 2,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 7, max: 7 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Animal Feed (Sack)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Oats and dried grain for mules or horses. Beasts need to eat too—neglect them and walk home.</p>",
      gearGroup: "consumable",
      weight: 10,
      value: 4,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 7, max: 7 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Tobacco and Pipe",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>The only comfort most adventurers have left. The clay pipe is replaceable; the habit is not.</p>",
      gearGroup: "consumable",
      weight: 0,
      value: 6,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 10, max: 10 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Strong Spirits (Flask)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>For dulling pain or cleaning wounds. Burns going down; burns even worse on an open cut.</p>",
      gearGroup: "consumable",
      weight: 1,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 5, max: 5 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Torches (×6)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Pitch-soaked rags wrapped around wooden staves. They burn bright and hot for about an hour each, then leave you in darkness.</p>",
      gearGroup: "consumable",
      weight: 3,
      value: 3,
      quantity: 6,
      consumable: { isConsumable: true, uses: { current: 6, max: 6 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Beeswax Candles (×3)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>The wealthy man's light—burns clean, smells faintly of honey, and doesn't drip onto your maps. Each lasts six hours.</p>",
      gearGroup: "consumable",
      weight: 0.5,
      value: 10,
      quantity: 3,
      consumable: { isConsumable: true, uses: { current: 3, max: 3 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Trail Rations (7 days)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>A mix of dried meat, hard cheese, and nuts. Palatable enough to eat without preparation; bland enough to make you miss home.</p>",
      gearGroup: "consumable",
      weight: 2,
      value: 16,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 7, max: 7 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Dried Fruit (Pouch)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Apples, figs, and berries shriveled to leather. Sweet enough to lift spirits; light enough to justify carrying.</p>",
      gearGroup: "consumable",
      weight: 0.5,
      value: 4,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 3, max: 3 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Cheese Wheel (Small)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Wax-sealed and dense. Keeps for weeks if you don't crack the rind. Pairs well with despair.</p>",
      gearGroup: "consumable",
      weight: 2,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 5, max: 5 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Wine (Cheap Bottle)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Vinegar masquerading as vintage. It'll get you drunk; it won't make you happy about it.</p>",
      gearGroup: "consumable",
      weight: 2,
      value: 6,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Ale (Skin)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Weak ale that's safer than most water. Flat within a day of opening; drink fast or regret slowly.</p>",
      gearGroup: "consumable",
      weight: 2,
      value: 3,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Honey (Jar)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Sweetener, preservative, and wound-sealant in one. Worth its weight in silver to those who know its uses.</p>",
      gearGroup: "consumable",
      weight: 1,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 5, max: 5 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Medicinal Tea (Pouch)",
    type: "gear",
    img: GearData.getGroupIcon("consumable"),
    system: {
      description: "<p>Dried herbs for brewing bitter draughts. Settles stomachs, clears heads, and makes illness marginally more bearable.</p>",
      gearGroup: "consumable",
      weight: 0.5,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 5, max: 5 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },

  // ============================================
  // KIT
  // General adventuring gear for survival, travel, and exploration
  // ============================================
  {
    name: "Flint and Steel",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>A steel striker and a chunk of flint. Sparks fly true, but you'll need tinder to catch them.</p>",
      gearGroup: "kit",
      weight: 0,
      value: 4,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Tinderbox",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>A small tin containing charred cloth and dry wood shavings. Without it, fire-starting becomes an ordeal.</p>",
      gearGroup: "kit",
      weight: 0.5,
      value: 6,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Heavy Woolen Cloak",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Provides protection against the elements and doubles as a blanket. The weight is reassuring on cold nights.</p>",
      gearGroup: "kit",
      weight: 4,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Bedroll & Oilskin",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>A canvas wrap to keep your bedding dry on damp dungeon floors. Smells of mildew no matter how often you air it.</p>",
      gearGroup: "kit",
      weight: 5,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Iron Cooking Pot",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Heavy, but essential for boiling water to avoid \"The Gut-Rot.\" Also serviceable as an improvised helm.</p>",
      gearGroup: "kit",
      weight: 4,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Iron Spikes/Pitons (×10)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Used for climbing or spiking doors shut to prevent pursuit. Drive them deep—your life may depend on it.</p>",
      gearGroup: "kit",
      weight: 2,
      value: 10,
      quantity: 10,
      consumable: { isConsumable: true, uses: { current: 10, max: 10 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Hemp Rope (15m)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Rough on the hands, but sturdy. Check for fraying before every descent; rot sets in faster than you'd think.</p>",
      gearGroup: "kit",
      weight: 5,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Grappling Hook",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>A four-pronged iron hook, essential for city-climbing or ruins. The clatter when it lands has betrayed many a thief.</p>",
      gearGroup: "kit",
      weight: 4,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "athletics",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Small Hand Mirror",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Useful for looking around corners or signaling over distances. Silvered glass in a wooden frame—crack it at your peril.</p>",
      gearGroup: "kit",
      weight: 0.5,
      value: 30,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Chalk (Sticks, ×10)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>For marking paths in labyrinths so you don't get lost. White shows best on dark stone; bring extra.</p>",
      gearGroup: "kit",
      weight: 0,
      value: 2,
      quantity: 10,
      consumable: { isConsumable: true, uses: { current: 10, max: 10 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "String (100ft Spool)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Used for tripwires, measuring, or when chalk fails. Thin hemp wound tight—unravels easily when you need it.</p>",
      gearGroup: "kit",
      weight: 0.5,
      value: 2,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 10, max: 10 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Blank Parchment & Charcoal",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>For mapping or recording local lore. The charcoal smudges; seal your work with wax or lose it to your own sweat.</p>",
      gearGroup: "kit",
      weight: 0.5,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 10, max: 10 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Sealing Wax & Signet",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>For official—or forged—correspondence. The signet is blank; carve your own mark or borrow another's.</p>",
      gearGroup: "kit",
      weight: 0,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 20, max: 20 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Whistle (Signal)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>To communicate over the sound of a storm or battle. Three short blasts means retreat; one long blast means you're already dead.</p>",
      gearGroup: "kit",
      weight: 0,
      value: 3,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Manacles (Iron)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>For capturing bounties or restraining the Veil-touched. The lock is simple—any competent Rogue can defeat it.</p>",
      gearGroup: "kit",
      weight: 2,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Caltrops (Spike-Strips)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Thrown behind you to slow down a pursuing mob. Four points—one always faces up. Collect them later or buy more.</p>",
      gearGroup: "kit",
      weight: 2,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Ten-Foot Pole (Collapsible)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Three sections that screw together. For prodding suspicious floors, checking depths, and keeping your distance from the unnatural.</p>",
      gearGroup: "kit",
      weight: 3,
      value: 4,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Fishing Line & Hooks",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Braided horsehair and barbed iron. Fish don't care about the apocalypse—they'll still bite if you're patient.</p>",
      gearGroup: "kit",
      weight: 0,
      value: 3,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "survival",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Snare Wire (Spool)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Thin brass wire for catching rabbits and other small game. Can also serve as a tripwire for the paranoid.</p>",
      gearGroup: "kit",
      weight: 0.5,
      value: 6,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 5, max: 5 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "survival",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Sewing Kit",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Needles, thread, and a thimble in a leather pouch. For mending clothes, stitching wounds, or repairing sails in a pinch.</p>",
      gearGroup: "kit",
      weight: 0,
      value: 5,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Tent (One-Person)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Oiled canvas stretched over wooden poles. Keeps the rain off; does nothing for the dreams.</p>",
      gearGroup: "kit",
      weight: 8,
      value: 40,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Blanket (Wool)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Heavy, scratchy, and warm. Doubles as a stretcher, a curtain, or—in desperate times—a burial shroud.</p>",
      gearGroup: "kit",
      weight: 3,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Spyglass (Brass)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>Extends to reveal distant details. Scratched lenses and tarnished fittings, but functional. Nobles pay more for prettier glass.</p>",
      gearGroup: "kit",
      weight: 1,
      value: 210,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Map Case (Leather)",
    type: "gear",
    img: GearData.getGroupIcon("kit"),
    system: {
      description: "<p>A waterproof tube for protecting documents. The cap screws tight; the leather has seen better days.</p>",
      gearGroup: "kit",
      weight: 1,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: true, capacity: 5, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },

  // ============================================
  // REMEDIES
  // Medical supplies and alchemical preparations
  // ============================================
  {
    name: "Bandages (Clean Linen)",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>Necessary to stop bleeding and prevent infection. \"Clean\" is relative—boil them between uses if you're wise.</p>",
      gearGroup: "remedy",
      weight: 0.5,
      value: 3,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 5, max: 5 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "medicine",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Curative Salve",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>A pungent herbal paste of comfrey and rendered fat. Speeds healing and keeps wounds from festering. Stings like a bastard.</p>",
      gearGroup: "remedy",
      weight: 0.5,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 3, max: 3 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "medicine",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Smelling Salts",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>To wake a character from unconsciousness or clear a stunned mind. The ammonia reek is violent but effective.</p>",
      gearGroup: "remedy",
      weight: 0,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 5, max: 5 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Anti-venom Vial",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>Niche, but life-saving against forest crawlers and pit vipers. Effectiveness fades with age—check the seal.</p>",
      gearGroup: "remedy",
      weight: 0,
      value: 50,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Pest Mask",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>A leather mask with a long beak filled with dried herbs to filter miasma or foul air. Unsettling to behold; essential in plague-towns.</p>",
      gearGroup: "remedy",
      weight: 1,
      value: 30,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Leech Jar",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>For \"balancing the humors\" after a poisoning or curse. The leeches are fat and hungry; the jar is ceramic and stoppered tight.</p>",
      gearGroup: "remedy",
      weight: 2,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 5, max: 5 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "medicine",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Tourniquet",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>A leather strap with a wooden toggle for cutting off blood flow to a limb. Saves lives; costs limbs. Use sparingly.</p>",
      gearGroup: "remedy",
      weight: 0,
      value: 4,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "medicine",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Splint Kit",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>Wooden slats and linen bindings for setting broken bones. The patient will scream; hold them down anyway.</p>",
      gearGroup: "remedy",
      weight: 1,
      value: 6,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 3, max: 3 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "medicine",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Fever-Break Tea",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>Willow bark and elderflower dried for brewing. Reduces fever and eases aches, but won't cure what's causing them.</p>",
      gearGroup: "remedy",
      weight: 0.5,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 5, max: 5 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Numbing Paste",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>Clove oil and poppy extract mixed into a thick salve. Deadens pain for an hour; leaves a bitter taste that lingers.</p>",
      gearGroup: "remedy",
      weight: 0,
      value: 30,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 3, max: 3 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Purgative Tonic",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>A foul-tasting liquid that violently empties the stomach. Useful after poisoning; miserable regardless.</p>",
      gearGroup: "remedy",
      weight: 0.5,
      value: 16,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Cautery Kit",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>A small brazier, iron rods, and leather straps. For sealing wounds when stitching isn't enough. The smell never leaves you.</p>",
      gearGroup: "remedy",
      weight: 3,
      value: 40,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "medicine",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Healing Poultice",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>Moss, honey, and crushed herbs wrapped in cloth. Applied to wounds to draw out infection; replace daily.</p>",
      gearGroup: "remedy",
      weight: 0.5,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 3, max: 3 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "medicine",
      carried: true,
      equipped: false
    }
  },
  {
    name: "Eye Wash (Vial)",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>Saline solution with a hint of chamomile. For clearing irritants, treating infections, or washing away things you wish you hadn't seen.</p>",
      gearGroup: "remedy",
      weight: 0,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 3, max: 3 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Burn Salve",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>Aloe and rendered fat mixed smooth. Soothes burns and prevents scarring if applied quickly enough.</p>",
      gearGroup: "remedy",
      weight: 0.5,
      value: 16,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 3, max: 3 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Clotting Powder",
    type: "gear",
    img: GearData.getGroupIcon("remedy"),
    system: {
      description: "<p>Ground yarrow and chalk in a stoppered vial. Pour into a wound to slow bleeding; it burns, but less than dying.</p>",
      gearGroup: "remedy",
      weight: 0,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 3, max: 3 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      associatedSkill: "medicine",
      carried: true,
      equipped: false
    }
  },

  // ============================================
  // CLOTHING - Common Wear
  // ============================================
  {
    name: "Peasant's Smock",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>Undyed linen that hangs loose to the knee. Stained with honest labor and never quite clean.</p>",
      gearGroup: "clothing",
      weight: 1,
      value: 2,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Roughspun Tunic",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>Coarse wool in muddy browns and grays. Itches against the skin; warmth is its only virtue.</p>",
      gearGroup: "clothing",
      weight: 1,
      value: 4,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Patched Breeches",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>Wool trousers with more patches than original cloth. Every tear tells a story; most are boring.</p>",
      gearGroup: "clothing",
      weight: 1,
      value: 3,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Leather Boots (Low)",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>Ankle-height with a sturdy sole. The minimum for anyone who walks on anything but marble.</p>",
      gearGroup: "clothing",
      weight: 2,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Travel Cloak",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>Undyed wool, hooded, reaching to mid-calf. The road's uniform—everyone owns one; none are clean.</p>",
      gearGroup: "clothing",
      weight: 3,
      value: 16,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Linen Shirt",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>Bleached white and properly fitted. A sign you can afford to stay clean.</p>",
      gearGroup: "clothing",
      weight: 0.5,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Leather Belt",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>Properly tanned with a brass buckle. Wide enough to hang a pouch or blade.</p>",
      gearGroup: "clothing",
      weight: 0,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Leather Jerkin",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>A sleeveless tunic of worked leather. Fashion and function meet; neither is impressed.</p>",
      gearGroup: "clothing",
      weight: 3,
      value: 50,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Wide-Brimmed Hat",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>Leather or felt with a brim to shade the eyes and shed rain. Travelers, farmers, and those with secrets to hide.</p>",
      gearGroup: "clothing",
      weight: 0.5,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Work Gloves (Leather)",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>Thick hide protecting palms and fingers. Stiff when new, molded to your hands after a month of labor.</p>",
      gearGroup: "clothing",
      weight: 0,
      value: 6,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Scarf (Wool)",
    type: "gear",
    img: GearData.getGroupIcon("clothing"),
    system: {
      description: "<p>Wrapped around the neck against cold and wind. Also useful for masking your face in unsavory districts.</p>",
      gearGroup: "clothing",
      weight: 0,
      value: 4,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },

  // ============================================
  // CURIOS
  // Personal effects, superstitious tokens, and objects of mystical significance
  // ============================================
  {
    name: "Religious Icon/Idol",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>A small wooden carving depicting a saint or outlawed god. The Zealot clutches it during prayer; others hide theirs from inquisitors.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Perfume/Cologne (Vial)",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>To mask the scent of the sewers or the Drowned Dead. Lavender and clove are common; musk is for nobles and fools.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 10, max: 10 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Soap (Lye Block)",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>A luxury, but helps prevent the spread of filth-fever. Harsh on the skin; gentler than dying of plague.</p>",
      gearGroup: "curio",
      weight: 0.5,
      value: 4,
      quantity: 1,
      consumable: { isConsumable: true, uses: { current: 10, max: 10 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Dice/Cards (Weighted)",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>For gambling in taverns during downtime. The weighting is subtle—obvious cheats don't live long.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Theatre Mask (Smiling/Weeping)",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>Carved wood with horsehair ties. Players and con-artists favor them; some say spirits cannot see through the painted eyes.</p>",
      gearGroup: "curio",
      weight: 0.5,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Whittled Totem",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>A crude wooden animal—wolf, crow, or stag—that a character fusses with during rests. Idle hands invite dark thoughts.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 2,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Astral Chart (Incomplete)",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>A map of the stars as they looked before the Veil thickened. Studying it too long induces vertigo and a profound sense of loss.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 50,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Dowsing Pendulum",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>A shard of obsidian on a tarnished chain that twitches near high Tension or magical instability. Unreliable, but believers swear by it.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 30,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Locket of Ash",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>A silver locket containing the ashes of a burned village or a lost loved one. The clasp is stiff; opening it feels like a violation.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 40,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Executioner's Coin",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>A heavy copper piece placed over the eye of a hanged man. Said to bring luck—or a haunting. Spend it at your peril.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Bone Dice (Knucklebones)",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>Carved from sheep or—if the rumors are true—human finger bones. They roll differently than wooden dice; some say more honestly.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 6,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Fortune Cards (Tattered)",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>A deck of twenty-two painted cards used for divination. Half the fortunes are dire; the other half are worse.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 30,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Pressed Flowers",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>Dried blooms preserved between parchment. A reminder of someone, somewhere, in a time before things went wrong.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 1,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Lock of Hair",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>Tied with thread and kept close to the heart. The color fades with years; the memory doesn't.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 1,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Wedding Ring (Tarnished)",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>Silver worn thin, inscription nearly illegible. Still on the finger, or kept in a pouch—either says something.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 50,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Map to Nowhere",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>Hand-drawn, creased, and annotated in a dead man's handwriting. The destination may not exist; the journey might kill you anyway.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 20,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Cryptic Letter",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>Sealed, never opened—or opened and never understood. The handwriting is unfamiliar; the contents are someone else's secret.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 3,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Broken Compass",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>The needle spins freely, pointing at nothing. Or perhaps at something only it can see.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 10,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Soldier's Medal",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>Tin stamped with a forgotten campaign's emblem. Earned in blood; traded for drink more often than not.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 8,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  },
  {
    name: "Childhood Toy",
    type: "gear",
    img: GearData.getGroupIcon("curio"),
    system: {
      description: "<p>A wooden horse, a rag doll, a carved knight. Carried for years, explained to no one.</p>",
      gearGroup: "curio",
      weight: 0,
      value: 2,
      quantity: 1,
      consumable: { isConsumable: false, uses: { current: 1, max: 1 } },
      container: { isContainer: false, capacity: null, contents: [] },
      properties: [],
      carried: true,
      equipped: false
    }
  }
];

export default GEAR_DATA;
