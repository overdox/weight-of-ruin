import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Archetype DataModel
 * 5 archetypes: Zealot, Thaumaturge, Warrior, Rogue, Sage
 * Each has 4 subtypes and provides attribute bonuses, talent access
 */
export default class ArchetypeData extends ItemBaseData {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // ATTRIBUTE BONUSES
    // ========================================
    schema.attributeBonuses = new fields.SchemaField({
      strength: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      fortitude: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      agility: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      awareness: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      resolve: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      persona: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      ingenuity: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      expertise: new fields.NumberField({ ...requiredInteger, initial: 0 })
    });

    // ========================================
    // SUBTYPES
    // ========================================
    schema.subtypes = new fields.ArrayField(
      new fields.SchemaField({
        name: new fields.StringField({ required: true, blank: false }),
        description: new fields.HTMLField({ required: false, blank: true }),
        // Subtype-specific bonuses or features
        features: new fields.ArrayField(
          new fields.StringField({ required: true, blank: false }),
          { initial: [] }
        ),
        // Signature talents available to this subtype
        signatureTalents: new fields.ArrayField(
          new fields.StringField({ required: true, blank: false }),
          { initial: [] }
        )
      }),
      { initial: [] }
    );

    // ========================================
    // STARTING WITCHSIGHT
    // Thaumaturges may grant Witchsight
    // ========================================
    schema.startingWitchsight = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
      min: 0,
      max: 10,
      label: "WOR.Archetype.StartingWitchsight"
    });

    // ========================================
    // SUGGESTED SKILLS
    // Skills commonly associated with this archetype
    // ========================================
    schema.suggestedSkills = new fields.ArrayField(
      new fields.StringField({ required: true, blank: false }),
      { initial: [] }
    );

    // ========================================
    // TALENT ACCESS
    // ========================================
    schema.talentAccess = new fields.SchemaField({
      // Universal talents available to all
      universal: new fields.BooleanField({ initial: true }),
      // Archetype shared talents (all subtypes)
      shared: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      ),
      // Restricted talents (cannot take)
      restricted: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      )
    });

    // ========================================
    // STARTING TALENTS
    // Talents granted at character creation
    // ========================================
    schema.startingTalents = new fields.ArrayField(
      new fields.SchemaField({
        name: new fields.StringField({ required: true, blank: false }),
        rank: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
        // Is this a choice from a list?
        choice: new fields.BooleanField({ initial: false }),
        options: new fields.ArrayField(
          new fields.StringField({ required: true, blank: false }),
          { initial: [] }
        )
      }),
      { initial: [] }
    );

    // ========================================
    // ROLE DESCRIPTION
    // ========================================
    schema.role = new fields.SchemaField({
      combat: new fields.StringField({ required: false, blank: true }),
      exploration: new fields.StringField({ required: false, blank: true }),
      social: new fields.StringField({ required: false, blank: true }),
      magic: new fields.StringField({ required: false, blank: true })
    });

    // ========================================
    // ROLL VALUE
    // For random selection (1d6 or similar)
    // ========================================
    schema.rollValue = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 1,
      max: 6,
      label: "WOR.Archetype.RollValue"
    });

    // ========================================
    // LP AWARD
    // LP gained for accepting random roll
    // ========================================
    schema.lpAward = new fields.NumberField({
      ...requiredInteger,
      initial: 25,
      min: 0,
      label: "WOR.Archetype.LPAward"
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Total attribute bonuses
   */
  get totalBonuses() {
    const bonuses = this.attributeBonuses;
    return bonuses.strength + bonuses.fortitude + bonuses.agility + bonuses.awareness +
           bonuses.resolve + bonuses.persona + bonuses.ingenuity + bonuses.expertise;
  }

  /**
   * Grants Witchsight
   */
  get grantsWitchsight() {
    return this.startingWitchsight > 0;
  }

  /**
   * Number of subtypes
   */
  get subtypeCount() {
    return this.subtypes.length;
  }

  /**
   * Get subtype by name
   */
  getSubtype(name) {
    return this.subtypes.find(s => s.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Get bonus for specific attribute
   */
  getBonus(attribute) {
    return this.attributeBonuses[attribute] || 0;
  }

  /**
   * Check if can access a talent
   */
  canAccessTalent(talentName) {
    if (this.talentAccess.restricted.includes(talentName)) return false;
    return true;
  }

  /**
   * Get data for character creation
   */
  getCreationData() {
    return {
      attributeBonuses: foundry.utils.deepClone(this.attributeBonuses),
      subtypes: this.subtypes.map(s => ({
        name: s.name,
        features: [...s.features],
        signatureTalents: [...s.signatureTalents]
      })),
      startingWitchsight: this.startingWitchsight,
      suggestedSkills: [...this.suggestedSkills],
      startingTalents: this.startingTalents.map(t => ({
        name: t.name,
        rank: t.rank,
        choice: t.choice,
        options: [...t.options]
      })),
      lpAward: this.lpAward
    };
  }
}
