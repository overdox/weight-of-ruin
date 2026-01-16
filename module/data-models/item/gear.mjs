import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Gear DataModel
 * General equipment: adventuring gear, tools, supplies
 */
export default class GearData extends ItemBaseData {

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
    // QUANTITY
    // ========================================
    schema.quantity = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 0,
      label: "WOR.Gear.Quantity"
    });

    // ========================================
    // WEIGHT (per unit)
    // ========================================
    schema.weight = new fields.NumberField({
      required: true,
      nullable: false,
      initial: 0.5,
      min: 0,
      label: "WOR.Gear.Weight"
    });

    // ========================================
    // PRICE (multi-currency, per unit)
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
        initial: 1,
        min: 0,
        label: "WOR.Wealth.Orin"
      })
    });

    // ========================================
    // GEAR GROUP (Category)
    // ========================================
    schema.gearGroup = new fields.StringField({
      required: true,
      blank: false,
      initial: "kit",
      choices: [
        "clothing",
        "consumable",
        "container",
        "curio",
        "kit",
        "remedy",
        "tool"
      ],
      label: "WOR.Gear.Group.Label"
    });

    // ========================================
    // CONSUMABLE
    // ========================================
    schema.consumable = new fields.SchemaField({
      isConsumable: new fields.BooleanField({ initial: false }),
      uses: new fields.SchemaField({
        current: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 }),
        max: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 })
      })
    });

    // ========================================
    // CONTAINER
    // ========================================
    schema.container = new fields.SchemaField({
      isContainer: new fields.BooleanField({ initial: false }),
      capacity: new fields.NumberField({ required: false, nullable: true, min: 0 }),
      contents: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      )
    });

    // ========================================
    // SPECIAL PROPERTIES
    // ========================================
    schema.properties = new fields.ArrayField(
      new fields.StringField({ required: true, blank: false }),
      { initial: [] }
    );

    // ========================================
    // EQUIPPED / CARRIED STATE
    // ========================================
    schema.carried = new fields.BooleanField({
      initial: true,
      label: "WOR.Gear.Carried"
    });

    schema.equipped = new fields.BooleanField({
      initial: false,
      label: "WOR.Gear.Equipped"
    });

    // ========================================
    // SKILL ASSOCIATION (for tools/kits)
    // ========================================
    schema.associatedSkill = new fields.StringField({
      required: false,
      blank: true,
      label: "WOR.Gear.AssociatedSkill"
    });

    // ========================================
    // FORMULA (for items with mechanical effects)
    // ========================================
    schema.formula = new fields.StringField({
      required: false,
      blank: true,
      label: "WOR.Gear.Formula"
    });

    // ========================================
    // RARITY
    // ========================================
    schema.rarity = new fields.StringField({
      required: true,
      blank: false,
      initial: "common",
      choices: ["common", "uncommon", "rare", "exotic"],
      label: "WOR.Item.Rarity"
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
   * Total weight (quantity * unit weight)
   */
  get totalWeight() {
    return this.quantity * this.weight;
  }

  /**
   * Total value (quantity * unit value)
   */
  get totalValue() {
    return this.quantity * this.value;
  }

  /**
   * Is consumable with uses remaining
   */
  get hasUsesRemaining() {
    if (!this.consumable.isConsumable) return true;
    return this.consumable.uses.current > 0;
  }

  /**
   * Is empty (quantity = 0)
   */
  get isEmpty() {
    return this.quantity <= 0;
  }

  /**
   * Get roll data for this gear
   */
  getRollData() {
    return {
      quantity: this.quantity,
      gearGroup: this.gearGroup,
      formula: this.formula,
      associatedSkill: this.associatedSkill
    };
  }

  // ========================================
  // STATIC METHODS
  // ========================================

  /**
   * Get the icon path for a gear item based on its group
   * @param {string} group - The gear group
   * @returns {string} The path to the gear icon
   */
  static getGroupIcon(group) {
    const basePath = 'systems/weight-of-ruin/assets/icons/gear/';
    const iconMap = {
      clothing: `${basePath}clothing.webp`,
      consumable: `${basePath}consumable.webp`,
      container: `${basePath}container.webp`,
      curio: `${basePath}curio.webp`,
      kit: `${basePath}kit.webp`,
      remedy: `${basePath}remedie.webp`,
      tool: `${basePath}tool.webp`
    };
    return iconMap[group] || `${basePath}kit.webp`;
  }

  /**
   * Get the icon path for this gear based on its group
   * @returns {string} The path to the gear icon
   */
  get groupIcon() {
    return GearData.getGroupIcon(this.gearGroup);
  }
}
