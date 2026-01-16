import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Armor DataModel
 * Updated to match new armor system with S/P/B damage reduction
 *
 * Armor Types:
 * - Underlayer: Foundation armor worn beneath metal (gambeson, aketon, etc.)
 * - Outer: Primary protection layer (mail, plate, brigandine) - only ONE at a time
 * - Reinforcement: Additional pieces that add DR directly (gorget, pauldrons, etc.)
 *
 * DR Stacking Rules:
 * - Layered armor: Highest DR + half of additional layers (rounded down)
 * - Reinforcements: Add directly without halving
 *
 * Properties:
 * - Encumbering (X): -X dice to Agility-based physical skills
 * - Noisy: -2 dice to Stealth checks
 * - Insulating: +2 dice to resist cold exposure
 * - Flexible: Reduces total Encumbering by 1 (minimum 0)
 * - Cumbersome: -1 to Movement speed
 * - Bulky: Cannot be concealed under normal clothing
 * - Heat (X): Adds X to Heat total for trauma checks
 * - Chafing: Penalty after activity without underlayer
 */
export default class ArmorData extends ItemBaseData {

  /**
   * Migrate source data before validation
   * Migrates old value field to price object
   */
  static migrateData(source) {
    // Migrate old 'value' field to 'price' object
    if (source.value !== undefined && source.price === undefined) {
      const totalOrin = source.value || 0;
      source.price = {
        sovereigns: Math.floor(totalOrin / 100),
        crowns: Math.floor((totalOrin % 100) / 10),
        orin: totalOrin % 10
      };
      delete source.value;
    }

    return super.migrateData(source);
  }

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // DAMAGE REDUCTION (DR) - Split by damage type
    // ========================================
    schema.dr = new fields.SchemaField({
      slash: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        max: 10,
        label: "WOR.Armor.DR.Slash"
      }),
      pierce: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        max: 10,
        label: "WOR.Armor.DR.Pierce"
      }),
      blunt: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        max: 10,
        label: "WOR.Armor.DR.Blunt"
      })
    });

    // ========================================
    // ARMOR CATEGORY (Layer classification)
    // Renamed from armorType for consistency with weapons
    // Note: Also accepts old material values for migration compatibility
    // ========================================
    schema.armorCategory = new fields.StringField({
      required: true,
      blank: false,
      initial: "outerlayer",
      // Include old material values for migration compatibility
      choices: ["underlayer", "outerlayer", "reinforcement", "shield", "quilted", "mail", "composite", "scale", "plate", "none"],
      label: "WOR.Armor.Category"
    });

    // ========================================
    // ARMOR GROUP (Material/construction)
    // Renamed from armorCategory for consistency with weapons
    // Different options based on category:
    // - Armor (underlayer/outerlayer/reinforcement): quilted, mail, composite, scale, plate
    // - Shield: hide, wood, composite, metal
    // ========================================
    schema.armorGroup = new fields.StringField({
      required: true,
      blank: false,
      initial: "mail",
      choices: ["quilted", "mail", "composite", "scale", "plate", "hide", "wood", "metal"],
      label: "WOR.Armor.Group"
    });

    // ========================================
    // ARMOR PROPERTIES
    // ========================================

    // Encumbering: -X dice to Agility-based physical skills (0-3)
    schema.encumbering = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
      min: 0,
      max: 3,
      label: "WOR.Armor.Property.Encumbering"
    });

    // Heat: Adds to Heat total for trauma checks (0-5)
    schema.heat = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
      min: 0,
      max: 5,
      label: "WOR.Armor.Property.Heat"
    });

    // Noisy: -2 dice to Stealth checks
    schema.noisy = new fields.BooleanField({
      initial: false,
      label: "WOR.Armor.Property.Noisy"
    });

    // Bulky: Cannot be concealed under normal clothing
    schema.bulky = new fields.BooleanField({
      initial: false,
      label: "WOR.Armor.Property.Bulky"
    });

    // Cumbersome: -1 to Movement speed
    schema.cumbersome = new fields.BooleanField({
      initial: false,
      label: "WOR.Armor.Property.Cumbersome"
    });

    // Flexible: Reduces Encumbering by 1 (minimum 0)
    schema.flexible = new fields.BooleanField({
      initial: false,
      label: "WOR.Armor.Property.Flexible"
    });

    // Insulating: +2 dice to resist cold exposure
    schema.insulating = new fields.BooleanField({
      initial: false,
      label: "WOR.Armor.Property.Insulating"
    });

    // Chafing: Penalty after strenuous activity without underlayer
    schema.chafing = new fields.BooleanField({
      initial: false,
      label: "WOR.Armor.Property.Chafing"
    });

    // Requires Underlayer: Metal armor that needs padding beneath
    schema.requiresUnderlayer = new fields.BooleanField({
      initial: false,
      label: "WOR.Armor.RequiresUnderlayer"
    });

    // ========================================
    // RARITY
    // ========================================
    schema.rarity = new fields.StringField({
      required: true,
      blank: false,
      initial: "common",
      choices: ["common", "uncommon", "rare", "exotic"],
      label: "WOR.Armor.Rarity"
    });

    // ========================================
    // QUALITY
    // Affects DR and Encumbering based on craftsmanship
    // ========================================
    schema.quality = new fields.SchemaField({
      level: new fields.StringField({
        required: true,
        blank: false,
        initial: "standard",
        choices: ["poor", "standard", "fine", "superior", "masterwork"],
        label: "WOR.Armor.Quality"
      }),
      drModifier: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        label: "WOR.Armor.Quality.DRModifier"
      }),
      encumberingReduction: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "WOR.Armor.Quality.EncumberingReduction"
      })
    });

    // ========================================
    // EQUIPPED STATE
    // ========================================
    schema.equipped = new fields.BooleanField({
      initial: false,
      label: "WOR.Armor.Equipped"
    });

    // ========================================
    // SHIELD-SPECIFIC
    // ========================================
    schema.shield = new fields.SchemaField({
      isShield: new fields.BooleanField({ initial: false }),
      defenseBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      blockDR: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    // ========================================
    // WEIGHT
    // ========================================
    schema.weight = new fields.NumberField({
      required: true,
      nullable: false,
      initial: 5,
      min: 0,
      label: "WOR.Armor.Weight"
    });

    // ========================================
    // PRICE (multi-currency)
    // ========================================
    schema.price = new fields.SchemaField({
      sovereigns: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "WOR.Wealth.Sovereigns"
      }),
      crowns: new fields.NumberField({
        ...requiredInteger,
        initial: 5,
        min: 0,
        label: "WOR.Wealth.Crowns"
      }),
      orin: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "WOR.Wealth.Orin"
      })
    });

    // ========================================
    // COVERAGE (for reinforcements)
    // Which body locations are protected
    // ========================================
    schema.coverage = new fields.ArrayField(
      new fields.StringField({
        required: true,
        blank: false,
        choices: ["head", "neck", "shoulders", "arms", "torso", "legs", "hands", "feet", "full"]
      }),
      { initial: ["torso"] }
    );

    // ========================================
    // QUANTITY
    // ========================================
    schema.quantity = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 1,
      label: "WOR.Gear.Quantity"
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Total value in Orin (for backwards compatibility and calculations)
   * 1 Sovereign = 100 Orin, 1 Crown = 10 Orin
   */
  get value() {
    return (this.price?.sovereigns || 0) * 100 +
           (this.price?.crowns || 0) * 10 +
           (this.price?.orin || 0);
  }

  /**
   * Get DR for a specific damage type with quality modifier
   * @param {string} type - 'slash', 'pierce', or 'blunt'
   * @returns {number}
   */
  getDR(type) {
    const qualityDR = {
      poor: -1,
      standard: 0,
      fine: 0,
      superior: 1,
      masterwork: 2
    };
    const bonus = qualityDR[this.quality.level] ?? this.quality.drModifier;
    return Math.max(0, (this.dr[type] ?? 0) + bonus);
  }

  /**
   * Total DR object including quality modifier
   */
  get totalDR() {
    return {
      slash: this.getDR('slash'),
      pierce: this.getDR('pierce'),
      blunt: this.getDR('blunt')
    };
  }

  /**
   * DR display string (S/P/B format)
   */
  get drDisplay() {
    const dr = this.totalDR;
    return `${dr.slash}/${dr.pierce}/${dr.blunt}`;
  }

  /**
   * Effective Encumbering after quality reduction and Flexible property
   */
  get effectiveEncumbering() {
    let enc = this.encumbering;

    const qualityReduction = {
      poor: 0,
      standard: 0,
      fine: 1,
      superior: 1,
      masterwork: 2
    };
    enc -= qualityReduction[this.quality.level] ?? 0;

    if (this.flexible) {
      enc -= 1;
    }

    return Math.max(0, enc);
  }

  /**
   * Is this a shield
   */
  get isShield() {
    return this.armorCategory === "shield" || this.shield.isShield;
  }

  /**
   * Is this an underlayer (can be worn under other armor)
   */
  get isUnderlayer() {
    return this.armorCategory === "underlayer";
  }

  /**
   * Is this an outer layer (primary armor)
   */
  get isOuterLayer() {
    return this.armorCategory === "outerlayer";
  }

  /**
   * Is this a reinforcement (adds DR directly)
   */
  get isReinforcement() {
    return this.armorCategory === "reinforcement";
  }

  /**
   * Is this plate armor
   */
  get isPlate() {
    return this.armorGroup === "plate";
  }

  /**
   * Is this mail armor
   */
  get isMail() {
    return this.armorGroup === "mail";
  }

  /**
   * Can this armor be layered under other armor
   */
  get canLayer() {
    return this.armorCategory === "underlayer";
  }

  /**
   * Has movement penalty (Cumbersome property)
   */
  get hasMovementPenalty() {
    return this.cumbersome;
  }

  /**
   * Stealth penalty from armor
   */
  get stealthPenalty() {
    let penalty = 0;
    if (this.noisy) penalty -= 2;
    penalty -= this.effectiveEncumbering;
    return penalty;
  }

  /**
   * Get property summary string for display
   */
  get propertySummary() {
    const props = [];
    if (this.effectiveEncumbering > 0) props.push(`Encumbering (${this.effectiveEncumbering})`);
    if (this.heat > 0) props.push(`Heat (${this.heat})`);
    if (this.noisy) props.push("Noisy");
    if (this.bulky) props.push("Bulky");
    if (this.cumbersome) props.push("Cumbersome");
    if (this.flexible) props.push("Flexible");
    if (this.insulating) props.push("Insulating");
    if (this.chafing) props.push("Chafing");
    return props.length > 0 ? props.join(", ") : "—";
  }

  /**
   * Get roll data for this armor
   */
  getRollData() {
    return {
      dr: this.totalDR,
      drDisplay: this.drDisplay,
      category: this.armorCategory,
      group: this.armorGroup,
      encumbering: this.effectiveEncumbering,
      heat: this.heat,
      noisy: this.noisy,
      cumbersome: this.cumbersome,
      insulating: this.insulating,
      isShield: this.isShield,
      stealthPenalty: this.stealthPenalty,
      rarity: this.rarity,
      quality: this.quality.level
    };
  }

  // ========================================
  // STATIC METHODS
  // ========================================

  /**
   * Get the icon path for an armor based on its category and group
   * @param {string} category - The armor category (underlayer, outerlayer, reinforcement, shield)
   * @param {string} group - The armor group (quilted, mail, composite, scale, plate, hide, wood, metal)
   * @returns {string} The path to the armor icon
   */
  static getGroupIcon(category, group) {
    const basePath = 'systems/weight-of-ruin/assets/icons/armor/';

    // Shield icons based on material
    if (category === 'shield') {
      const shieldIconMap = {
        hide: `${basePath}shield-hide.webp`,
        wood: `${basePath}shield-wooden.webp`,
        composite: `${basePath}shield-composite.webp`,
        metal: `${basePath}shield-buckler-metal.webp`
      };
      return shieldIconMap[group] || `${basePath}shield-wooden.webp`;
    }

    // Reinforcement pieces use a single icon
    if (category === 'reinforcement') {
      return `${basePath}reinforcement.webp`;
    }

    // Armor icons based on material group (underlayer and outerlayer)
    const armorIconMap = {
      quilted: `${basePath}gambeson.webp`,
      mail: `${basePath}hauberk.webp`,
      composite: `${basePath}brigandine.webp`,
      scale: `${basePath}lamellar.webp`,
      plate: `${basePath}plate.webp`
    };
    return armorIconMap[group] || `${basePath}hauberk.webp`;
  }

  /**
   * Get the icon path for this armor based on its category and group
   * @returns {string} The path to the armor icon
   */
  get groupIcon() {
    return ArmorData.getGroupIcon(this.armorCategory, this.armorGroup);
  }
}
