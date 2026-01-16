import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Lineage DataModel
 * 5 lineages: Human, Dwarf, Elf, Changeling, Undine
 * Provides attribute modifiers, traits, starting Witchsight
 */
export default class LineageData extends ItemBaseData {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // ATTRIBUTE MODIFIERS
    // ========================================
    schema.attributeModifiers = new fields.SchemaField({
      strength: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      fortitude: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      agility: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      awareness: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      resolve: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      persona: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      ingenuity: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      expertise: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      // For Human: "any" attribute bonus
      any: new fields.NumberField({ ...requiredInteger, initial: 0 })
    });

    // ========================================
    // BONUS SKILL RANKS
    // Extra skill ranks granted by lineage (Human gets +1)
    // ========================================
    schema.bonusSkillRanks = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
      min: 0,
      max: 5,
      label: "AOA.Lineage.BonusSkillRanks"
    });

    // ========================================
    // BASE SPEED
    // Lineage-based movement rate (Movement = Base Speed + Agility)
    // ========================================
    schema.baseSpeed = new fields.NumberField({
      ...requiredInteger,
      initial: 2,
      min: 0,
      max: 5,
      label: "AOA.Lineage.BaseSpeed"
    });

    // ========================================
    // STARTING WITCHSIGHT
    // Elves start with 1
    // ========================================
    schema.startingWitchsight = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
      min: 0,
      max: 10,
      label: "AOA.Lineage.StartingWitchsight"
    });

    // ========================================
    // SPECIAL TRAITS
    // ========================================
    schema.traits = new fields.ArrayField(
      new fields.SchemaField({
        name: new fields.StringField({ required: true, blank: false }),
        description: new fields.HTMLField({ required: false, blank: true }),
        // Mechanical effect (if any)
        effect: new fields.StringField({ required: false, blank: true })
      }),
      { initial: [] }
    );

    // ========================================
    // ELIGIBLE PROVINCES
    // Where this lineage commonly originates
    // ========================================
    schema.provinces = new fields.ArrayField(
      new fields.StringField({ required: true, blank: false }),
      { initial: [] }
    );

    // ========================================
    // LIFESPAN
    // ========================================
    schema.lifespan = new fields.SchemaField({
      average: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      maximum: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      notes: new fields.StringField({ required: false, blank: true })
    });

    // ========================================
    // PHYSICAL CHARACTERISTICS
    // ========================================
    schema.physical = new fields.SchemaField({
      heightRange: new fields.StringField({ required: false, blank: true }),
      buildNotes: new fields.StringField({ required: false, blank: true }),
      distinctiveFeatures: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      )
    });

    // ========================================
    // CULTURAL NOTES
    // ========================================
    schema.culture = new fields.HTMLField({
      required: false,
      blank: true,
      label: "AOA.Lineage.Culture"
    });

    // ========================================
    // ROLL VALUE
    // For random selection (3d6 tables)
    // ========================================
    schema.rollRange = new fields.SchemaField({
      min: new fields.NumberField({ ...requiredInteger, initial: 3, min: 3, max: 18 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 18, min: 3, max: 18 })
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Total attribute modifier sum (for validation)
   */
  get totalModifiers() {
    const mods = this.attributeModifiers;
    return mods.strength + mods.fortitude + mods.agility + mods.awareness +
           mods.resolve + mods.persona + mods.ingenuity + mods.expertise + mods.any;
  }

  /**
   * Has inherent Witchsight
   */
  get hasInherentWitchsight() {
    return this.startingWitchsight > 0;
  }

  /**
   * Has flexible attribute bonus (Human)
   */
  get hasFlexibleBonus() {
    return this.attributeModifiers.any !== 0;
  }

  /**
   * Get modifier for a specific attribute
   */
  getModifier(attribute) {
    return this.attributeModifiers[attribute] || 0;
  }

  /**
   * Check if roll value matches this lineage
   */
  matchesRoll(rollValue) {
    return rollValue >= this.rollRange.min && rollValue <= this.rollRange.max;
  }

  /**
   * Get data for character creation
   */
  getCreationData() {
    return {
      attributeModifiers: foundry.utils.deepClone(this.attributeModifiers),
      bonusSkillRanks: this.bonusSkillRanks,
      baseSpeed: this.baseSpeed,
      startingWitchsight: this.startingWitchsight,
      traits: this.traits.map(t => ({ name: t.name, effect: t.effect })),
      provinces: [...this.provinces]
    };
  }
}
