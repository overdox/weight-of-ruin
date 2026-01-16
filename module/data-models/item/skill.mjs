import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Skill DataModel
 * 54 skills across 5 categories, ranks 0-10
 * Tracks rank and sources (Background, Pathway, Free, Advancement)
 */
export default class SkillData extends ItemBaseData {

  /**
   * Migrate source data before validation
   * Handles rename of meleeProwess → weaponProwess
   */
  static migrateData(source) {
    if (source.prowess === 'meleeProwess') {
      source.prowess = 'weaponProwess';
    }
    return super.migrateData(source);
  }

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // SKILL RANK (Total)
    // ========================================
    schema.rank = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
      min: 0,
      max: 10,
      label: "AOA.Skill.Rank"
    });

    // ========================================
    // RANK SOURCES (Separate tracking)
    // ========================================
    schema.sources = new fields.SchemaField({
      background: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "AOA.Skill.Source.Background"
      }),
      pathway: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "AOA.Skill.Source.Pathway"
      }),
      free: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "AOA.Skill.Source.Free"
      }),
      advancement: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "AOA.Skill.Source.Advancement"
      }),
      other: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "AOA.Skill.Source.Other"
      })
    });

    // ========================================
    // ASSOCIATED ATTRIBUTE
    // Which attribute is added to the dice pool
    // ========================================
    schema.attribute = new fields.StringField({
      required: true,
      blank: false,
      initial: "agility",
      choices: ["strength", "fortitude", "agility", "awareness", "resolve", "persona", "ingenuity", "expertise"],
      label: "AOA.Skill.Attribute"
    });

    // ========================================
    // SKILL CATEGORY
    // Martial, Physical, Social, Knowledge, Craft, Thaumaturgy
    // ========================================
    schema.category = new fields.StringField({
      required: true,
      blank: false,
      initial: "physical",
      choices: ["martial", "physical", "social", "knowledge", "craft", "thaumaturgy"],
      label: "AOA.Skill.Category"
    });

    // ========================================
    // ASSOCIATED PROWESS (Martial skills only)
    // Which prowess this skill adds to for attack pools
    // ========================================
    schema.prowess = new fields.StringField({
      required: false,
      blank: true,
      initial: "",
      choices: ["", "weaponProwess", "ballisticProwess", "unarmedProwess"],
      label: "AOA.Skill.Prowess"
    });

    // ========================================
    // WITCHSIGHT REQUIREMENT
    // Thaumaturgy skills require Witchsight > 0
    // ========================================
    schema.requiresWitchsight = new fields.BooleanField({
      initial: false,
      label: "AOA.Skill.RequiresWitchsight"
    });

    // ========================================
    // SPECIALIZATIONS (Optional)
    // ========================================
    schema.specializations = new fields.ArrayField(
      new fields.StringField({ required: true, blank: false }),
      { initial: [] }
    );

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Total rank from all sources
   */
  get totalRank() {
    const s = this.sources;
    const calculated = s.background + s.pathway + s.free + s.advancement + s.other;
    // Return the higher of stored rank or calculated (for flexibility)
    return Math.max(this.rank, calculated);
  }

  /**
   * Is this a Martial skill (Arms, Marksmanship, Brawling)
   */
  get isMartial() {
    return this.category === "martial";
  }

  /**
   * Is this a Thaumaturgy skill
   */
  get isThaumaturgy() {
    return this.category === "thaumaturgy";
  }

  /**
   * Skill can be used (not gated by missing Witchsight)
   * Note: Actual gating happens at the actor level
   */
  get isUsable() {
    return !this.requiresWitchsight;
  }

  /**
   * Override prepareDerivedData
   */
  prepareDerivedData() {
    // Sync rank with sources total if sources have been modified
    const sourcesTotal = this.sources.background + this.sources.pathway +
                         this.sources.free + this.sources.advancement + this.sources.other;
    if (sourcesTotal > 0 && this.rank !== sourcesTotal) {
      this.rank = Math.min(10, sourcesTotal);
    }
  }

  /**
   * Get roll data for this skill
   */
  getRollData() {
    return {
      rank: this.totalRank,
      attribute: this.attribute,
      category: this.category,
      prowess: this.prowess,
      isMartial: this.isMartial,
      requiresWitchsight: this.requiresWitchsight
    };
  }
}
