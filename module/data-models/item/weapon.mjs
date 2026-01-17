import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Weapon DataModel
 * Weapons have damage, associated attribute/skill, range, and properties
 *
 * Damage Formula: For melee weapons, damage = baseDamage + Strength Bonus (SB)
 * For ranged weapons, damage is typically flat unless useStrengthBonus is true
 */
export default class WeaponData extends ItemBaseData {

  /**
   * Migrate source data before validation
   * Handles rename of meleeProwess → weaponProwess
   * Migrates old value field to price object
   * Migrates old quality levels to new system
   */
  static migrateData(source) {
    if (source.prowess === 'meleeProwess') {
      source.prowess = 'weaponProwess';
    }

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

    // Migrate old quality levels to new system
    // Old: poor, standard, fine, superior, masterwork
    // New: ruined, damaged, inferior, average, fine, superior, masterwork
    if (source.quality?.level) {
      const qualityMigration = {
        'poor': 'inferior',
        'standard': 'average'
        // fine, superior, masterwork remain the same
      };
      if (qualityMigration[source.quality.level]) {
        source.quality.level = qualityMigration[source.quality.level];
      }
    }

    // Migrate reliability to precision
    if (source.reliability !== undefined && source.precision === undefined) {
      source.precision = source.reliability;
      delete source.reliability;
    }

    return super.migrateData(source);
  }

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // DAMAGE
    // Base damage value - for melee, add SB at roll time
    // ========================================
    schema.baseDamage = new fields.NumberField({
      ...requiredInteger,
      initial: 4,
      min: 0,
      label: "WOR.Weapon.BaseDamage"
    });

    // Damage die type (d4, d6, d8, d10, d12)
    schema.damageDie = new fields.StringField({
      required: true,
      blank: false,
      initial: "d6",
      choices: ["d4", "d6", "d8", "d10", "d12"],
      label: "WOR.Weapon.DamageDie"
    });

    // Whether to add Strength Bonus to damage (true for melee, some ranged like Composite Bow)
    schema.useStrengthBonus = new fields.BooleanField({
      initial: true,
      label: "WOR.Weapon.UseStrengthBonus"
    });

    schema.damageType = new fields.StringField({
      required: false,
      blank: true,
      initial: "slashing",
      choices: ["slashing", "piercing", "bludgeoning"],
      label: "WOR.Weapon.DamageType"
    });

    // ========================================
    // PRECISION (PRE)
    // Maximum number of hits that can count on an attack roll
    // ========================================
    schema.precision = new fields.NumberField({
      required: false,
      nullable: true,
      integer: true,
      initial: 6,
      min: 1,
      max: 10,
      label: "WOR.Weapon.Precision"
    });

    // ========================================
    // ARMOR PIERCING (AP)
    // Reduces target's DR by this amount
    // ========================================
    schema.armorPiercing = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
      min: 0,
      label: "WOR.Weapon.ArmorPiercing"
    });

    // ========================================
    // ASSOCIATED ATTRIBUTE & SKILL
    // ========================================
    schema.attribute = new fields.StringField({
      required: true,
      blank: false,
      initial: "strength",
      choices: ["strength", "agility"],
      label: "WOR.Weapon.Attribute"
    });

    // Prowess used for attack rolls (replaces former skill field)
    schema.prowess = new fields.StringField({
      required: true,
      blank: false,
      initial: "weaponProwess",
      choices: ["weaponProwess", "ballisticProwess", "unarmedProwess"],
      label: "WOR.Weapon.ProwessLabel"
    });

    // ========================================
    // WEAPON CATEGORY (Proficiency Type)
    // Simple, Martial, or Exotic
    // ========================================
    schema.category = new fields.StringField({
      required: true,
      blank: false,
      initial: "simple",
      choices: ["simple", "martial", "exotic"],
      label: "WOR.Weapon.Category"
    });

    // ========================================
    // RANGE
    // ========================================
    schema.range = new fields.SchemaField({
      type: new fields.StringField({
        required: true,
        blank: false,
        initial: "melee",
        choices: ["melee", "ranged", "thrown", "reach"],
        label: "WOR.Weapon.Range.Type"
      }),
      // For ranged weapons: base range (may include SB+X format stored as base value)
      value: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      // Whether range adds Strength Bonus (e.g., "SB+50" for bows)
      addStrengthToRange: new fields.BooleanField({ initial: false }),
      // Melee reach (default 1, or 2 for Reach weapons)
      reach: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 })
    });

    // ========================================
    // WEAPON PROPERTIES
    // ========================================
    schema.properties = new fields.ArrayField(
      new fields.StringField({ required: true, blank: false }),
      { initial: [] }
    );

    // ========================================
    // WEAPON MODIFICATIONS
    // Physical, Alchemical, or Witching enhancements
    // ========================================
    schema.modifications = new fields.ArrayField(
      new fields.SchemaField({
        category: new fields.StringField({
          required: true,
          blank: false,
          initial: "physical",
          choices: ["physical", "alchemical", "witching"],
          label: "WOR.Weapon.Modification.Category"
        }),
        type: new fields.StringField({
          required: true,
          blank: false,
          initial: "serrated",
          label: "WOR.Weapon.Modification.Type"
        }),
        // Damage die type for the modification (fixed, d4, d6, d8, d10, d12)
        damageDie: new fields.StringField({
          required: false,
          blank: true,
          initial: "",
          choices: ["", "fixed", "d4", "d6", "d8", "d10", "d12"],
          label: "WOR.Weapon.Modification.DamageDie"
        }),
        // Damage value (used with 'fixed' or as number of dice)
        damageValue: new fields.NumberField({
          required: false,
          nullable: true,
          integer: true,
          initial: null,
          min: 0,
          label: "WOR.Weapon.Modification.DamageValue"
        }),
        // Damage type based on category (physical/alchemical/witching)
        damageType: new fields.StringField({
          required: false,
          blank: true,
          initial: "",
          label: "WOR.Weapon.Modification.DamageType"
        }),
        // Optional mechanical effect description
        effect: new fields.StringField({
          required: false,
          blank: true,
          initial: "",
          label: "WOR.Weapon.Modification.Effect"
        }),
        // Optional flavour/description text
        flavour: new fields.StringField({
          required: false,
          blank: true,
          initial: "",
          label: "WOR.Weapon.Modification.Flavour"
        })
      }),
      { initial: [] }
    );

    // ========================================
    // WEAPON GROUP
    // Category for weapon proficiency/similarity
    // ========================================
    schema.group = new fields.StringField({
      required: true,
      blank: false,
      initial: "sword",
      choices: ["dagger", "sword", "axe", "blunt", "polearm", "bow", "crossbow", "thrown", "unarmed"],
      label: "WOR.Weapon.Group"
    });

    // ========================================
    // RARITY
    // ========================================
    schema.rarity = new fields.StringField({
      required: true,
      blank: false,
      initial: "common",
      choices: ["common", "uncommon", "rare", "exotic"],
      label: "WOR.Weapon.Rarity"
    });

    // ========================================
    // QUALITY MODIFIER
    // Affects attack dice based on craftsmanship
    // ========================================
    schema.quality = new fields.SchemaField({
      level: new fields.StringField({
        required: true,
        blank: false,
        initial: "average",
        choices: ["ruined", "damaged", "inferior", "average", "fine", "superior", "masterwork"],
        label: "WOR.Weapon.Quality"
      }),
      // Attack dice modifier based on quality level
      // Ruined: -3, Damaged: -2, Inferior: -1, Average: 0, Fine: +1, Superior: +2, Masterwork: +3
      attackModifier: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        label: "WOR.Weapon.Quality.AttackModifier"
      })
    });

    // ========================================
    // EQUIPPED STATE
    // ========================================
    schema.equipped = new fields.BooleanField({
      initial: false,
      label: "WOR.Weapon.Equipped"
    });

    // ========================================
    // HANDS REQUIRED
    // ========================================
    schema.hands = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 1,
      max: 2,
      label: "WOR.Weapon.Hands"
    });

    // ========================================
    // WEIGHT / ENCUMBRANCE
    // ========================================
    schema.weight = new fields.NumberField({
      required: true,
      nullable: false,
      initial: 1,
      min: 0,
      label: "WOR.Weapon.Weight"
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
        initial: 0,
        min: 0,
        label: "WOR.Wealth.Crowns"
      }),
      orin: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
        min: 0,
        label: "WOR.Wealth.Orin"
      })
    });

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
   * Is this a melee weapon
   */
  get isMelee() {
    return this.range.type === "melee" || this.range.type === "thrown" || this.range.type === "reach";
  }

  /**
   * Is this a ranged weapon
   */
  get isRanged() {
    return this.range.type === "ranged" || this.range.type === "thrown";
  }

  /**
   * Is this a reach weapon (can attack at 2 spaces, cannot attack adjacent)
   */
  get isReach() {
    return this.range.type === "reach" || this.hasProperty("reach");
  }

  /**
   * Base damage value (without Strength Bonus)
   * For display purposes; actual damage calculated at roll time with actor context
   */
  get displayDamage() {
    const dieType = this.damageDie || 'd6';
    if (this.useStrengthBonus) {
      return `${this.baseDamage}${dieType}+SB`;
    }
    return `${this.baseDamage}${dieType}`;
  }

  /**
   * Calculate total damage with actor's Strength Bonus
   * @param {number} strengthBonus - The actor's Strength attribute value
   * @returns {number} Total damage
   */
  calculateDamage(strengthBonus = 0) {
    let damage = this.baseDamage;
    if (this.useStrengthBonus) {
      damage += strengthBonus;
    }
    return Math.max(0, damage);
  }

  /**
   * Attack pool modifier from quality
   * Ruined: -3, Damaged: -2, Inferior: -1, Average: 0, Fine: +1, Superior: +2, Masterwork: +3
   */
  get attackBonus() {
    const qualityBonuses = {
      ruined: -3,
      damaged: -2,
      inferior: -1,
      average: 0,
      fine: 1,
      superior: 2,
      masterwork: 3
    };
    return qualityBonuses[this.quality.level] ?? this.quality.attackModifier;
  }

  /**
   * Effective range (adds Strength Bonus if applicable)
   * @param {number} strengthBonus - The actor's Strength attribute value
   * @returns {number} Effective range in spaces
   */
  calculateRange(strengthBonus = 0) {
    if (!this.range.value) return null;
    let range = this.range.value;
    if (this.range.addStrengthToRange) {
      range += strengthBonus;
    }
    return range;
  }

  /**
   * Display range string (e.g., "SB+50" or "60")
   */
  get displayRange() {
    if (!this.range.value) return this.range.type === "melee" ? "Melee" : "—";
    if (this.range.addStrengthToRange) {
      return `SB+${this.range.value}`;
    }
    return String(this.range.value);
  }

  /**
   * Is this a two-handed weapon
   */
  get isTwoHanded() {
    return this.hands === 2 || this.hasProperty("twoHanded");
  }

  /**
   * Is this a finesse weapon (can use Agility instead of Strength)
   */
  get isFinesse() {
    return this.hasProperty("finesse");
  }

  /**
   * Is this a heavy weapon (+1 damage when using Strength)
   */
  get isHeavy() {
    return this.hasProperty("heavy");
  }

  /**
   * Is this a light weapon (can dual-wield)
   */
  get isLight() {
    return this.hasProperty("light");
  }

  /**
   * Is this a loading weapon (requires action to reload)
   */
  get requiresLoading() {
    return this.hasProperty("loading");
  }

  /**
   * Does this weapon cause Wounding (Bleeding on crit)
   */
  get isWounding() {
    return this.hasProperty("wounding");
  }

  /**
   * Has a specific property
   */
  hasProperty(property) {
    return this.properties.includes(property.toLowerCase());
  }

  /**
   * Get the thrown range if this weapon can be thrown
   * Parses "Thrown (X spaces)" from properties
   */
  get thrownRange() {
    const thrownProp = this.properties.find(p => p.toLowerCase().startsWith("thrown"));
    if (!thrownProp) return null;
    const match = thrownProp.match(/\((\d+)/);
    return match ? parseInt(match[1]) : 10; // Default 10 if not specified
  }

  /**
   * Get roll data for this weapon
   */
  getRollData() {
    return {
      baseDamage: this.baseDamage,
      damageDie: this.damageDie,
      useStrengthBonus: this.useStrengthBonus,
      damageType: this.damageType,
      attribute: this.attribute,
      skill: this.skill,
      attackBonus: this.attackBonus,
      precision: this.precision,
      armorPiercing: this.armorPiercing,
      isMelee: this.isMelee,
      isRanged: this.isRanged,
      isFinesse: this.isFinesse,
      isHeavy: this.isHeavy,
      isLight: this.isLight,
      isWounding: this.isWounding,
      properties: this.properties,
      group: this.group,
      rarity: this.rarity
    };
  }

  /**
   * Get the icon path for a given weapon group
   * @param {string} group - The weapon group key
   * @returns {string} The path to the weapon group icon
   */
  static getGroupIcon(group) {
    const iconMap = {
      dagger: 'systems/weight-of-ruin/assets/icons/weapons/dagger.webp',
      sword: 'systems/weight-of-ruin/assets/icons/weapons/sword.webp',
      axe: 'systems/weight-of-ruin/assets/icons/weapons/axe.webp',
      blunt: 'systems/weight-of-ruin/assets/icons/weapons/blunt.webp',
      polearm: 'systems/weight-of-ruin/assets/icons/weapons/polearm.webp',
      bow: 'systems/weight-of-ruin/assets/icons/weapons/bow.webp',
      crossbow: 'systems/weight-of-ruin/assets/icons/weapons/crossbow.webp',
      thrown: 'systems/weight-of-ruin/assets/icons/weapons/thrown.webp',
      unarmed: 'systems/weight-of-ruin/assets/icons/weapons/unarmed.webp'
    };
    return iconMap[group] || 'systems/weight-of-ruin/assets/icons/weapons/sword.webp';
  }

  /**
   * Get the icon path for this weapon based on its group
   * @returns {string} The path to the weapon group icon
   */
  get groupIcon() {
    return WeaponData.getGroupIcon(this.group);
  }
}
