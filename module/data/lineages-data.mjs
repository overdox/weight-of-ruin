/**
 * Lineages Compendium Data
 * All 7 lineages with their modifiers and traits
 */

export const LINEAGES_DATA = [
  {
    name: "Human",
    type: "lineage",
    img: "systems/weight-of-ruin/assets/icons/lineages/human.webp",
    system: {
      description: "<p>The dominant people of Aventail, humans are adaptable, ambitious, and varied as the lands they inhabit.</p><p>Humans built the great kingdoms, forged the iron roads, and filled the world with their countless tongues and traditions. They lack the longevity of the elder folk but compensate with relentless drive and rapid adaptation. A human can be anything—saint or sinner, peasant or king, scholar or savage.</p>",
      rollRange: { min: 3, max: 9 },
      attributeModifiers: {
        strength: 0,
        fortitude: 0,
        agility: 0,
        awareness: 0,
        resolve: 0,
        persona: 0,
        ingenuity: 0,
        expertise: 0,
        any: 1
      },
      bonusSkillRanks: 1,
      baseSpeed: 2,
      startingWitchsight: 0,
      lifespan: "60–80 years",
      traits: [
        {
          name: "Adaptable",
          description: "Humans begin with one additional skill rank, which may be placed in any skill. Additionally, humans may treat any Archetype as their \"native\" Archetype for the purpose of talent costs."
        }
      ],
      provinces: ["Jorvyn", "Sarvane", "Carrowhelm"],
      socialStanding: "Humans face no inherent prejudice and may hold any position in society that their Background permits.",
      physicalDescription: "Humans vary enormously by region. Jorvynners tend toward fair skin, broad shoulders, and hair ranging from flaxen to auburn. Sarvanites are often olive-skinned with dark hair. Carrowhelmns range from pale to ruddy, with features as varied as their fractured kingdoms."
    }
  },
  {
    name: "Dwarf",
    type: "lineage",
    img: "systems/weight-of-ruin/assets/icons/lineages/dwarf.webp",
    system: {
      description: "<p>Stout folk of the deep places, dwarves are renowned for their craftsmanship, endurance, and grudges that outlast generations.</p><p>The dwarves claim they were carved from the living stone by the First Smiths before the world cooled. Whether truth or legend, they remain bound to mountain and mine, to forge and foundation. A dwarf's word is iron, and a dwarf's enemy is remembered until the stars go dark.</p>",
      rollRange: { min: 10, max: 11 },
      attributeModifiers: {
        strength: 1,
        fortitude: 1,
        agility: 0,
        awareness: 0,
        resolve: 0,
        persona: -1,
        ingenuity: 0,
        expertise: 0
      },
      baseSpeed: 1,
      startingWitchsight: 0,
      lifespan: "200–300 years",
      resilienceBonus: 1,
      traits: [
        {
          name: "Stone's Endurance",
          description: "Dwarves gain +2 dice when resisting poison, disease, or magical effects that would transform or transmute their body. Additionally, dwarves have +1 maximum Wounds."
        }
      ],
      provinces: ["Sarvane", "Jorvyn", "Carrowhelm"],
      socialStanding: "Dwarves are respected as craftsmen and feared as warriors, but many humans view them as stubborn, avaricious, and insular. Dwarves face –1 die on social rolls with those who distrust \"delvers.\"",
      physicalDescription: "Dwarves stand between four and five feet tall, with broad frames and dense musculature. Both sexes wear elaborate braided beards, decorated with clan tokens. Skin tones range from pale granite to deep bronze, and eyes often glint with metallic hues—copper, gold, or iron-grey."
    }
  },
  {
    name: "Elf",
    type: "lineage",
    img: "systems/weight-of-ruin/assets/icons/lineages/elf.webp",
    system: {
      description: "<p>Fading remnants of an elder age, elves are creatures of the Veil—beautiful, distant, and touched by otherworldly sorrow.</p><p>The elves remember when the world was young and the Veil lay closer to mortal lands. That intimacy marked them, granting long life but binding their fate to the slow decay of magic itself. Most elves have withdrawn to hidden enclaves; those who walk among humans do so as exiles, seekers, or those too curious to remain in twilight courts.</p>",
      rollRange: { min: 12, max: 13 },
      attributeModifiers: {
        strength: 0,
        fortitude: -1,
        agility: 1,
        awareness: 1,
        resolve: 0,
        persona: 0,
        ingenuity: 0,
        expertise: 0
      },
      baseSpeed: 2,
      startingWitchsight: 1,
      lifespan: "500–800 years",
      traits: [
        {
          name: "Veil-Touched",
          description: "Elves begin with Witchsight 1 (even without choosing the Thaumaturge Archetype). They may sense magic within 30 feet without rolling. However, elves are especially vulnerable to iron—weapons made of cold iron deal +2 damage against them, and iron bindings prevent spellcasting."
        }
      ],
      provinces: ["Sarvane", "Jorvyn", "Wyrdwood"],
      socialStanding: "Elves inspire a mixture of awe, envy, and fear. Many humans consider them untrustworthy, their motives inscrutable. Elves face –1 die on social rolls with those who fear \"the Fair Folk\" and +1 die with those who romanticize them.",
      physicalDescription: "Elves are tall and slender, standing six to seven feet with elongated limbs and angular features. Their eyes lack visible pupils, instead displaying solid colors—silver, violet, amber, or green. Hair colors include shades impossible for humans: moonlight white, deep blue, or autumn copper. Pointed ears sweep back from narrow skulls."
    }
  },
  {
    name: "Changeling",
    type: "lineage",
    img: "systems/weight-of-ruin/assets/icons/lineages/changeling.webp",
    system: {
      description: "<p>Children of the wrong side of the Veil, Changelings are mortals marked by fae ancestry—shapeshifters walking between worlds.</p><p>Legends claim Changelings are human children stolen by the Fair Folk and replaced with fae offspring, or the descendants of such unfortunates. The truth is murkier. Changelings are neither fully human nor fully fae but caught between, able to shift their features as others change clothes. This gift makes them invaluable as spies and diplomats—and deeply distrusted by everyone else.</p>",
      rollRange: { min: 14, max: 14 },
      attributeModifiers: {
        strength: 0,
        fortitude: 0,
        agility: 0,
        awareness: 0,
        resolve: -1,
        persona: 1,
        ingenuity: 1,
        expertise: 0
      },
      baseSpeed: 3,
      startingWitchsight: 0,
      lifespan: "100–150 years",
      traits: [
        {
          name: "Shapechanger",
          description: "Changelings can alter their physical appearance at will, requiring 1 minute of concentration. This includes facial features, skin tone, hair color, apparent age, and apparent sex. They cannot change size significantly (height varies by no more than 6 inches) or mimic specific individuals without studying them for at least an hour. Assuming a studied form grants +3 dice to Deception rolls to impersonate that person. Magical detection reveals their true nature."
        }
      ],
      provinces: ["Jorvyn", "Wyrdwood", "Kaldros"],
      socialStanding: "Changelings are feared almost universally. In many regions, they are killed on discovery. Even those who escape persecution live under constant suspicion. Changelings face –2 dice on all social rolls if their true nature is known, except with those specifically seeking their talents.",
      physicalDescription: "A Changeling's \"true\" form is typically pale and androgynous, with large eyes that shift color with emotion and hair that seems to move of its own accord. However, they rarely show this form. Most Changelings maintain a \"primary\" human appearance and can alter their features at will. Extended use of a single form may cause it to become more \"real\" to them."
    }
  },
  {
    name: "Undine",
    type: "lineage",
    img: "systems/weight-of-ruin/assets/icons/lineages/undine.webp",
    system: {
      description: "<p>Water-touched folk of the coastal reaches, Undines carry the sea in their blood and the tide in their souls.</p><p>Undines are said to descend from unions between mortals and spirits of water—whether river nymphs, sea-wives, or the drowned dead returned. They are drawn to coastlines, rivers, and lakes, often serving as fisherfolk, sailors, or guardians of sacred waters. An Undine far from water grows sickly and melancholy; near it, they are vital and strange.</p>",
      rollRange: { min: 15, max: 15 },
      attributeModifiers: {
        strength: -1,
        fortitude: 1,
        agility: 0,
        awareness: 1,
        resolve: 0,
        persona: 0,
        ingenuity: 0,
        expertise: 0
      },
      baseSpeed: 2,
      startingWitchsight: 0,
      lifespan: "120–180 years",
      traits: [
        {
          name: "Child of Waters",
          description: "Undines can breathe underwater indefinitely and swim at their normal Movement rate without penalty. They gain +2 dice on all rolls related to swimming, diving, or underwater activity. Additionally, Undines can sense the direction and distance of the nearest significant body of water within 10 miles. However, if an Undine goes more than 3 days without immersing themselves in natural water, they suffer –1 die to all rolls until they do so."
        }
      ],
      provinces: ["Jorvyn", "Kaldros"],
      socialStanding: "Undines are viewed with superstitious unease by inland folk but are often honored in coastal communities. In maritime regions, they face no social penalty; elsewhere, they suffer –1 die on social rolls with those who distrust \"water-spirits.\"",
      physicalDescription: "Undines appear mostly human but with subtle differences: skin with a faint blue or green tinge, hair that moves as if underwater even when dry, webbed fingers and toes, and eyes without whites—pure pools of blue, green, or black. Their blood runs cold, and their touch is always damp."
    }
  },
  {
    name: "Helskari",
    type: "lineage",
    img: "systems/weight-of-ruin/assets/icons/lineages/helskari.webp",
    system: {
      description: "<p>Born of the frozen wastes beyond the Rimwall, the Helskari are a hardy people shaped by ice and isolation.</p><p>The Helskari claim descent from the frost giants of legend, though most scholars dismiss such tales. What cannot be denied is their resilience—they thrive in climates that would kill other folk, and their pale eyes seem to pierce through blizzard and darkness alike. Those who venture south are often raiders, traders, or exiles seeking fortune in warmer lands.</p>",
      rollRange: { min: 16, max: 16 },
      attributeModifiers: {
        strength: 0,
        fortitude: 1,
        agility: 0,
        awareness: 1,
        resolve: 0,
        persona: -1,
        ingenuity: 0,
        expertise: 0
      },
      baseSpeed: 3,
      startingWitchsight: 0,
      lifespan: "70–90 years",
      traits: [
        {
          name: "Winter's Blood",
          description: "Helskari suffer no ill effects from cold environments and gain +2 dice when resisting cold-based damage or effects. They can see clearly in snowstorms, fog, and dim light as if it were bright day. However, they suffer –1 die on all rolls when in extreme heat for extended periods."
        }
      ],
      provinces: ["Rimwall", "Jorvyn"],
      socialStanding: "Helskari are viewed as savage raiders by many southern folk. They face –1 die on social rolls with those who fear \"northmen,\" but gain +1 die when dealing with those who respect strength and directness.",
      physicalDescription: "Helskari are tall and powerfully built, with pale skin that seems to absorb light rather than reflect it. Their hair ranges from bone-white to ice-blue, and their eyes are often colorless or pale grey. Ritual scarification marks achievements and clan allegiance."
    }
  },
  {
    name: "Jadwiga",
    type: "lineage",
    img: "systems/weight-of-ruin/assets/icons/lineages/jadwiga.webp",
    system: {
      description: "<p>Descended from the witch-queens of old, the Jadwiga carry cursed blood that grants them power at terrible cost.</p><p>The Jadwiga trace their lineage to the legendary Baba Yaga, the Grandmother of Witches, who bred with mortals to create a bloodline of sorcerers. This heritage manifests as an innate connection to the dark magic of the wild places—but also as a hunger that gnaws at the soul. Many Jadwiga hear whispers in the night, urging them toward power and ruin.</p>",
      rollRange: { min: 17, max: 18 },
      attributeModifiers: {
        strength: 0,
        fortitude: -1,
        agility: 0,
        awareness: 0,
        resolve: 1,
        persona: 0,
        ingenuity: 1,
        expertise: 0
      },
      baseSpeed: 2,
      startingWitchsight: 1,
      startingEssence: 9,
      lifespan: "150–250 years",
      traits: [
        {
          name: "Witch-Blood",
          description: "Jadwiga begin with Witchsight 1 and may learn Thaumaturgy skills even without the Thaumaturge Archetype. They gain +1 die when using Sorcery or Ritefocus. However, the dark heritage exacts a price: Jadwiga begin with Essence 9 instead of 10, and whenever they would lose Essence, they lose 1 additional point."
        }
      ],
      provinces: ["Wyrdwood", "Sarvane", "Kaldros"],
      socialStanding: "Jadwiga are feared as witches and demon-spawn. In most lands, revealing Jadwiga heritage invites persecution or death. They face –2 dice on social rolls if their nature is known, except with those who seek dark power.",
      physicalDescription: "Jadwiga appear mostly human but bear subtle signs of their heritage: iron-grey hair even in youth, eyes with vertically-slit pupils, elongated canine teeth, and an unsettling aura that makes animals nervous and children cry. Their blood runs dark, almost black, and tastes of copper and ash."
    }
  }
];

export default LINEAGES_DATA;
