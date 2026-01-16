import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Spell DataModel
 * Sorcery formulaic spells with Technique + Form requirements
 * Includes costs, duration, range, effect magnitude, backlash tables
 */
export default class SpellData extends ItemBaseData {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // SORCERY REQUIREMENTS
    // ========================================
    schema.technique = new fields.StringField({
      required: true,
      blank: false,
      initial: "create",
      choices: ["create", "perceive", "transform", "destroy", "control"],
      label: "AOA.Spell.Technique"
    });

    schema.form = new fields.StringField({
      required: true,
      blank: false,
      initial: "elements",
      choices: ["elements", "living", "mind", "matter", "spirit", "space", "time"],
      label: "AOA.Spell.Form"
    });

    // Minimum ranks required in Technique and Form
    schema.requirements = new fields.SchemaField({
      techniqueRank: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0, max: 10 }),
      formRank: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0, max: 10 }),
      witchsight: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 10 })
    });

    // ========================================
    // SPELL RANK / LEVEL
    // ========================================
    schema.rank = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 1,
      max: 10,
      label: "AOA.Spell.Rank"
    });

    // ========================================
    // COSTS
    // ========================================
    schema.costs = new fields.SchemaField({
      trauma: new fields.NumberField({
        ...requiredInteger,
        initial: 1,
        min: 0,
        label: "AOA.Spell.Cost.Trauma"
      }),
      essence: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "AOA.Spell.Cost.Essence"
      }),
      // Additional material costs
      components: new fields.ArrayField(
        new fields.SchemaField({
          name: new fields.StringField({ required: true, blank: false }),
          consumed: new fields.BooleanField({ initial: true }),
          value: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 })
        }),
        { initial: [] }
      )
    });

    // ========================================
    // CASTING
    // ========================================
    schema.casting = new fields.SchemaField({
      // Actions required to cast
      actionCost: new fields.NumberField({
        ...requiredInteger,
        initial: 1,
        min: 0,
        label: "AOA.Spell.ActionCost"
      }),
      // Difficulty tier for casting
      difficulty: new fields.StringField({
        required: false,
        blank: true,
        initial: "standard",
        choices: ["trivial", "standard", "hard"],
        label: "AOA.Spell.Difficulty"
      }),
      // Target threshold for casting
      targetThreshold: new fields.NumberField({
        ...requiredInteger,
        initial: 2,
        min: 1,
        label: "AOA.Spell.TargetThreshold"
      }),
      // Is this a formulaic (learned) spell or improvised
      formulaic: new fields.BooleanField({
        initial: true,
        label: "AOA.Spell.Formulaic"
      })
    });

    // ========================================
    // EFFECT
    // ========================================
    schema.effect = new fields.SchemaField({
      description: new fields.HTMLField({
        required: false,
        blank: true,
        label: "AOA.Spell.Effect.Description"
      }),
      magnitude: new fields.StringField({
        required: false,
        blank: true,
        initial: "minor",
        choices: ["trivial", "minor", "moderate", "major", "extreme"],
        label: "AOA.Spell.Effect.Magnitude"
      }),
      // Damage if applicable
      damage: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      damageType: new fields.StringField({ required: false, blank: true }),
      // Healing if applicable
      healing: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 })
    });

    // ========================================
    // RANGE
    // ========================================
    schema.range = new fields.SchemaField({
      type: new fields.StringField({
        required: false,
        blank: true,
        initial: "touch",
        choices: ["self", "touch", "short", "medium", "long", "sight", "unlimited"],
        label: "AOA.Spell.Range.Type"
      }),
      distance: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 })
    });

    // ========================================
    // DURATION
    // ========================================
    schema.duration = new fields.SchemaField({
      type: new fields.StringField({
        required: false,
        blank: true,
        initial: "instant",
        choices: ["instant", "concentration", "rounds", "minutes", "hours", "days", "permanent"],
        label: "AOA.Spell.Duration.Type"
      }),
      value: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      // Can be dismissed early
      dismissable: new fields.BooleanField({ initial: true })
    });

    // ========================================
    // TARGETS
    // ========================================
    schema.targets = new fields.SchemaField({
      type: new fields.StringField({
        required: false,
        blank: true,
        initial: "single",
        choices: ["self", "single", "multiple", "area", "all"],
        label: "AOA.Spell.Targets.Type"
      }),
      count: new fields.NumberField({ required: false, nullable: true, integer: true, min: 1 }),
      areaSize: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      areaShape: new fields.StringField({
        required: false,
        blank: true,
        choices: ["sphere", "cone", "line", "cube", "cylinder"]
      })
    });

    // ========================================
    // BACKLASH
    // Consequences of failed casting
    // ========================================
    schema.backlash = new fields.SchemaField({
      // Backlash severity level
      severity: new fields.StringField({
        required: false,
        blank: true,
        initial: "minor",
        choices: ["trivial", "minor", "moderate", "severe", "catastrophic"],
        label: "AOA.Spell.Backlash.Severity"
      }),
      // Specific backlash effects for this spell
      effects: new fields.ArrayField(
        new fields.SchemaField({
          trigger: new fields.StringField({
            required: true,
            blank: false,
            choices: ["failure", "criticalFailure", "botch"]
          }),
          description: new fields.StringField({ required: true, blank: false }),
          traumaCost: new fields.NumberField({ required: false, nullable: true, integer: true }),
          essenceCost: new fields.NumberField({ required: false, nullable: true, integer: true })
        }),
        { initial: [] }
      ),
      // Roll table reference for random backlash
      table: new fields.StringField({ required: false, blank: true })
    });

    // ========================================
    // SCALING (optional)
    // How the spell improves with more hits
    // ========================================
    schema.scaling = new fields.SchemaField({
      enabled: new fields.BooleanField({ initial: false }),
      perHit: new fields.StringField({ required: false, blank: true }),
      maximum: new fields.NumberField({ required: false, nullable: true, integer: true })
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Total trauma cost
   */
  get totalTraumaCost() {
    return this.costs.trauma;
  }

  /**
   * Has Essence cost (dangerous)
   */
  get hasEssenceCost() {
    return this.costs.essence > 0;
  }

  /**
   * Is an instant spell
   */
  get isInstant() {
    return this.duration.type === "instant";
  }

  /**
   * Requires concentration
   */
  get requiresConcentration() {
    return this.duration.type === "concentration";
  }

  /**
   * Can target self
   */
  get canTargetSelf() {
    return this.targets.type === "self" || this.range.type === "self";
  }

  /**
   * Is an area effect spell
   */
  get isAreaEffect() {
    return this.targets.type === "area";
  }

  /**
   * Get roll data for this spell
   */
  getRollData() {
    return {
      rank: this.rank,
      technique: this.technique,
      form: this.form,
      traumaCost: this.totalTraumaCost,
      essenceCost: this.costs.essence,
      difficulty: this.casting.difficulty,
      targetThreshold: this.casting.targetThreshold,
      damage: this.effect.damage,
      healing: this.effect.healing
    };
  }
}
