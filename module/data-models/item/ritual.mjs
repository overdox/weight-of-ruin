import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Ritual DataModel
 * Ritefocus rituals with paths, complexity, time, components, and participants
 */
export default class RitualData extends ItemBaseData {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // RITEFOCUS PATH
    // ========================================
    schema.path = new fields.StringField({
      required: true,
      blank: false,
      initial: "circlecasting",
      choices: ["circlecasting", "binding", "hexing"],
      label: "AOA.Ritual.Path"
    });

    // ========================================
    // COMPLEXITY / RANK
    // ========================================
    schema.complexity = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 1,
      max: 10,
      label: "AOA.Ritual.Complexity"
    });

    // ========================================
    // TIME REQUIRED
    // ========================================
    schema.time = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        initial: 1,
        min: 1,
        label: "AOA.Ritual.Time.Value"
      }),
      unit: new fields.StringField({
        required: true,
        blank: false,
        initial: "hours",
        choices: ["rounds", "minutes", "hours", "days", "weeks"],
        label: "AOA.Ritual.Time.Unit"
      }),
      // Can be reduced with more participants
      reducible: new fields.BooleanField({ initial: false })
    });

    // ========================================
    // REQUIREMENTS
    // ========================================
    schema.requirements = new fields.SchemaField({
      // Ritefocus skill rank required
      ritefocusRank: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0, max: 10 }),
      // Witchsight required
      witchsight: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 10 }),
      // Location requirements
      location: new fields.StringField({ required: false, blank: true }),
      // Time requirements (specific times)
      timing: new fields.StringField({ required: false, blank: true })
    });

    // ========================================
    // COMPONENTS
    // ========================================
    schema.components = new fields.ArrayField(
      new fields.SchemaField({
        name: new fields.StringField({ required: true, blank: false }),
        quantity: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
        consumed: new fields.BooleanField({ initial: true }),
        // Approximate value in Orin
        value: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
        // Is this component essential or optional
        essential: new fields.BooleanField({ initial: true }),
        // Substitute components
        substitutes: new fields.ArrayField(
          new fields.StringField({ required: true, blank: false }),
          { initial: [] }
        )
      }),
      { initial: [] }
    );

    // ========================================
    // PARTICIPANTS
    // ========================================
    schema.participants = new fields.SchemaField({
      minimum: new fields.NumberField({
        ...requiredInteger,
        initial: 1,
        min: 1,
        label: "AOA.Ritual.Participants.Minimum"
      }),
      maximum: new fields.NumberField({
        required: false,
        nullable: true,
        integer: true,
        min: 1,
        label: "AOA.Ritual.Participants.Maximum"
      }),
      // Bonus per additional participant
      bonusPerParticipant: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0
      }),
      // Requirements for participants
      requirements: new fields.StringField({ required: false, blank: true })
    });

    // ========================================
    // CASTING
    // ========================================
    schema.casting = new fields.SchemaField({
      // Difficulty tier
      difficulty: new fields.StringField({
        required: false,
        blank: true,
        initial: "standard",
        choices: ["trivial", "standard", "hard"],
        label: "AOA.Ritual.Difficulty"
      }),
      // Target threshold
      targetThreshold: new fields.NumberField({
        ...requiredInteger,
        initial: 3,
        min: 1,
        label: "AOA.Ritual.TargetThreshold"
      }),
      // Extended test (multiple rolls needed)
      extended: new fields.SchemaField({
        isExtended: new fields.BooleanField({ initial: false }),
        hitsRequired: new fields.NumberField({ required: false, nullable: true, integer: true, min: 1 }),
        rollsAllowed: new fields.NumberField({ required: false, nullable: true, integer: true, min: 1 })
      })
    });

    // ========================================
    // COSTS
    // ========================================
    schema.costs = new fields.SchemaField({
      trauma: new fields.NumberField({
        ...requiredInteger,
        initial: 2,
        min: 0,
        label: "AOA.Ritual.Cost.Trauma"
      }),
      essence: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "AOA.Ritual.Cost.Essence"
      }),
      // Blood cost (for blood magic rituals)
      blood: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "AOA.Ritual.Cost.Blood"
      }),
      // Sacrifice requirement
      sacrifice: new fields.StringField({ required: false, blank: true })
    });

    // ========================================
    // EFFECT
    // ========================================
    schema.effect = new fields.SchemaField({
      description: new fields.HTMLField({
        required: false,
        blank: true,
        label: "AOA.Ritual.Effect.Description"
      }),
      magnitude: new fields.StringField({
        required: false,
        blank: true,
        initial: "moderate",
        choices: ["trivial", "minor", "moderate", "major", "extreme"],
        label: "AOA.Ritual.Effect.Magnitude"
      }),
      // Duration of effect
      duration: new fields.SchemaField({
        type: new fields.StringField({
          required: false,
          blank: true,
          initial: "permanent",
          choices: ["instant", "hours", "days", "weeks", "months", "years", "permanent", "conditional"]
        }),
        value: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
        condition: new fields.StringField({ required: false, blank: true })
      })
    });

    // ========================================
    // RANGE / AREA
    // ========================================
    schema.range = new fields.SchemaField({
      type: new fields.StringField({
        required: false,
        blank: true,
        initial: "local",
        choices: ["self", "touch", "local", "regional", "unlimited"]
      }),
      areaSize: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 })
    });

    // ========================================
    // FAILURE CONSEQUENCES
    // ========================================
    schema.failure = new fields.SchemaField({
      severity: new fields.StringField({
        required: false,
        blank: true,
        initial: "moderate",
        choices: ["trivial", "minor", "moderate", "severe", "catastrophic"]
      }),
      effects: new fields.ArrayField(
        new fields.SchemaField({
          trigger: new fields.StringField({
            required: true,
            blank: false,
            choices: ["failure", "criticalFailure", "interrupted"]
          }),
          description: new fields.StringField({ required: true, blank: false }),
          traumaCost: new fields.NumberField({ required: false, nullable: true, integer: true }),
          essenceCost: new fields.NumberField({ required: false, nullable: true, integer: true })
        }),
        { initial: [] }
      ),
      // Can the ritual be safely abandoned
      canAbandon: new fields.BooleanField({ initial: true })
    });

    // ========================================
    // PATH-SPECIFIC FIELDS
    // ========================================

    // Circlecasting: Circle/ward specifications
    schema.circle = new fields.SchemaField({
      type: new fields.StringField({ required: false, blank: true }),
      size: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      permanence: new fields.BooleanField({ initial: false })
    });

    // Binding: Entity binding specifications
    schema.binding = new fields.SchemaField({
      targetType: new fields.StringField({ required: false, blank: true }),
      constraints: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      ),
      duration: new fields.StringField({ required: false, blank: true })
    });

    // Hexing: Curse/hex specifications
    schema.hex = new fields.SchemaField({
      targetType: new fields.StringField({ required: false, blank: true }),
      breakCondition: new fields.StringField({ required: false, blank: true }),
      resistance: new fields.StringField({ required: false, blank: true })
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Total time in minutes for comparison
   */
  get totalTimeInMinutes() {
    const multipliers = {
      rounds: 0.1,
      minutes: 1,
      hours: 60,
      days: 1440,
      weeks: 10080
    };
    return this.time.value * (multipliers[this.time.unit] || 1);
  }

  /**
   * Is an extended ritual
   */
  get isExtended() {
    return this.casting.extended.isExtended;
  }

  /**
   * Has dangerous costs (Essence/Blood/Sacrifice)
   */
  get hasDangerousCosts() {
    return this.costs.essence > 0 || this.costs.blood > 0 || this.costs.sacrifice;
  }

  /**
   * Requires multiple participants
   */
  get requiresMultipleParticipants() {
    return this.participants.minimum > 1;
  }

  /**
   * Total component cost (approximate)
   */
  get totalComponentCost() {
    return this.components.reduce((total, comp) => {
      return total + (comp.value || 0) * comp.quantity;
    }, 0);
  }

  /**
   * Get roll data for this ritual
   */
  getRollData() {
    return {
      path: this.path,
      complexity: this.complexity,
      difficulty: this.casting.difficulty,
      targetThreshold: this.casting.targetThreshold,
      traumaCost: this.costs.trauma,
      essenceCost: this.costs.essence,
      isExtended: this.isExtended
    };
  }
}
