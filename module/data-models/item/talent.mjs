import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Talent DataModel
 * Talents have 5 ranks with distinct effects
 * Types: Universal, Archetype (shared), Signature
 * Only stores current rank's effect (per user requirement)
 */
export default class TalentData extends ItemBaseData {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // TALENT RANK (1-5)
    // ========================================
    schema.rank = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 1,
      max: 5,
      label: "AOA.Talent.Rank"
    });

    schema.maxRank = new fields.NumberField({
      ...requiredInteger,
      initial: 5,
      min: 1,
      max: 5,
      label: "AOA.Talent.MaxRank"
    });

    // ========================================
    // CURRENT RANK EFFECT (Only current rank stored)
    // ========================================
    schema.effect = new fields.HTMLField({
      required: false,
      blank: true,
      label: "AOA.Talent.Effect"
    });

    // ========================================
    // TALENT TYPE
    // ========================================
    schema.talentType = new fields.StringField({
      required: true,
      blank: false,
      initial: "universal",
      choices: ["universal", "archetype", "signature"],
      label: "AOA.Talent.Type"
    });

    // ========================================
    // ARCHETYPE/CALLING ASSOCIATION
    // For archetype talents: which archetype (e.g., "warrior", "sage")
    // For signature talents: which calling (e.g., "paladin", "assassin")
    // ========================================
    schema.archetype = new fields.StringField({
      required: false,
      blank: true,
      initial: "",
      label: "AOA.Talent.Archetype"
    });

    schema.subtype = new fields.StringField({
      required: false,
      blank: true,
      initial: "",
      label: "AOA.Talent.Subtype"
    });

    // ========================================
    // ARCHETYPE RESTRICTIONS (Legacy/Additional)
    // Which archetypes/subtypes can take this talent
    // ========================================
    schema.restrictions = new fields.SchemaField({
      archetypes: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      ),
      subtypes: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      ),
      // If true, talent is exclusive to listed archetypes/subtypes
      exclusive: new fields.BooleanField({ initial: false })
    });

    // ========================================
    // PREREQUISITES
    // Other talents or attributes required
    // ========================================
    schema.prerequisites = new fields.SchemaField({
      talents: new fields.ArrayField(
        new fields.SchemaField({
          name: new fields.StringField({ required: true, blank: false }),
          rank: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 })
        }),
        { initial: [] }
      ),
      attributes: new fields.ArrayField(
        new fields.SchemaField({
          attribute: new fields.StringField({ required: true, blank: false }),
          minimum: new fields.NumberField({ ...requiredInteger, initial: 1 })
        }),
        { initial: [] }
      ),
      skills: new fields.ArrayField(
        new fields.SchemaField({
          skill: new fields.StringField({ required: true, blank: false }),
          minimum: new fields.NumberField({ ...requiredInteger, initial: 1 })
        }),
        { initial: [] }
      ),
      witchsight: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      other: new fields.StringField({ required: false, blank: true })
    });

    // ========================================
    // MECHANICAL EFFECTS
    // Structured for automation
    // ========================================
    schema.mechanics = new fields.SchemaField({
      // Passive bonuses
      bonuses: new fields.ArrayField(
        new fields.SchemaField({
          type: new fields.StringField({
            required: true,
            blank: false,
            choices: ["attribute", "skill", "defense", "damage", "pool", "other"]
          }),
          target: new fields.StringField({ required: false, blank: true }),
          value: new fields.NumberField({ required: true, nullable: false, integer: true })
        }),
        { initial: [] }
      ),
      // Special abilities granted
      abilities: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      ),
      // Is this talent always active or must be activated
      passive: new fields.BooleanField({ initial: true })
    });

    // ========================================
    // LP COST (for character creation)
    // ========================================
    schema.lpCost = new fields.NumberField({
      ...requiredInteger,
      initial: 10,
      min: 0,
      label: "AOA.Talent.LPCost"
    });

    // ========================================
    // XP COST (for advancement)
    // ========================================
    schema.xpCost = new fields.NumberField({
      ...requiredInteger,
      initial: 10,
      min: 0,
      label: "AOA.Talent.XPCost"
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Can this talent be advanced (not at max rank)
   */
  get canAdvance() {
    return this.rank < this.maxRank;
  }

  /**
   * Is this a signature talent
   */
  get isSignature() {
    return this.talentType === "signature";
  }

  /**
   * Is this a universal talent
   */
  get isUniversal() {
    return this.talentType === "universal";
  }

  /**
   * Check if a character can take this talent
   */
  canTake(archetype, subtype) {
    // Universal talents can be taken by anyone
    if (this.isUniversal) return true;

    // Check archetype restrictions
    if (this.restrictions.exclusive) {
      if (this.restrictions.archetypes.length > 0 &&
          !this.restrictions.archetypes.includes(archetype)) {
        return false;
      }
      if (this.restrictions.subtypes.length > 0 &&
          !this.restrictions.subtypes.includes(subtype)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get roll data for this talent
   */
  getRollData() {
    return {
      rank: this.rank,
      maxRank: this.maxRank,
      type: this.talentType,
      bonuses: this.mechanics.bonuses
    };
  }
}
