import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Life Event DataModel
 * 40 events in four suits (Love, Fortune, Conflict, Knowledge)
 * Each provides benefits and complications (structured data)
 */
export default class LifeEventData extends ItemBaseData {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // SUIT
    // Four suits of 10 events each
    // ========================================
    schema.suit = new fields.StringField({
      required: true,
      blank: false,
      initial: "fortune",
      choices: ["love", "fortune", "conflict", "knowledge"],
      label: "WOR.LifeEvent.Suit"
    });

    // ========================================
    // NUMBER
    // 1-10 within the suit (1-40 total)
    // ========================================
    schema.number = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 1,
      max: 10,
      label: "WOR.LifeEvent.Number"
    });

    // ========================================
    // BENEFITS (Structured)
    // ========================================
    schema.benefits = new fields.ArrayField(
      new fields.SchemaField({
        type: new fields.StringField({
          required: true,
          blank: false,
          choices: [
            "skill",
            "talent",
            "attribute",
            "wealth",
            "contact",
            "reputation",
            "equipment",
            "witchsight",
            "zeal",
            "other"
          ]
        }),
        // For skills/talents: name of the skill/talent
        target: new fields.StringField({ required: false, blank: true }),
        // For numeric benefits: the value
        value: new fields.NumberField({ required: false, nullable: true, integer: true }),
        // Description of the benefit
        description: new fields.StringField({ required: true, blank: false }),
        // Is this a choice?
        choice: new fields.BooleanField({ initial: false }),
        options: new fields.ArrayField(
          new fields.StringField({ required: true, blank: false }),
          { initial: [] }
        )
      }),
      { initial: [] }
    );

    // ========================================
    // COMPLICATIONS (Structured)
    // ========================================
    schema.complications = new fields.ArrayField(
      new fields.SchemaField({
        type: new fields.StringField({
          required: true,
          blank: false,
          choices: [
            "enemy",
            "debt",
            "obligation",
            "secret",
            "injury",
            "reputation",
            "phobia",
            "loss",
            "curse",
            "other"
          ]
        }),
        // For specific complications: target name
        target: new fields.StringField({ required: false, blank: true }),
        // Severity
        severity: new fields.StringField({
          required: false,
          blank: true,
          initial: "moderate",
          choices: ["minor", "moderate", "major", "severe"]
        }),
        // Description of the complication
        description: new fields.StringField({ required: true, blank: false }),
        // Is this removable with LP?
        removable: new fields.BooleanField({ initial: true }),
        // LP cost to remove
        removalCost: new fields.NumberField({ ...requiredInteger, initial: 15, min: 0 })
      }),
      { initial: [] }
    );

    // ========================================
    // LP VALUE
    // LP gained for accepting this event
    // ========================================
    schema.lpValue = new fields.NumberField({
      ...requiredInteger,
      initial: 10,
      min: 0,
      label: "WOR.LifeEvent.LPValue"
    });

    // ========================================
    // NARRATIVE PROMPT
    // Story seed for incorporating this event
    // ========================================
    schema.narrativePrompt = new fields.HTMLField({
      required: false,
      blank: true,
      label: "WOR.LifeEvent.NarrativePrompt"
    });

    // ========================================
    // LINKED EVENTS
    // Events that may chain from this one
    // ========================================
    schema.linkedEvents = new fields.ArrayField(
      new fields.SchemaField({
        eventId: new fields.StringField({ required: true, blank: false }),
        condition: new fields.StringField({ required: false, blank: true })
      }),
      { initial: [] }
    );

    // ========================================
    // DRAW CONDITIONS
    // When this event can be drawn
    // ========================================
    schema.conditions = new fields.SchemaField({
      // Minimum/maximum character age
      minAge: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      maxAge: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      // Required lineages (empty = any)
      lineages: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      ),
      // Required archetypes (empty = any)
      archetypes: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      ),
      // Other conditions
      other: new fields.StringField({ required: false, blank: true })
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Absolute event number (1-40)
   */
  get absoluteNumber() {
    const suitOffsets = { love: 0, fortune: 10, conflict: 20, knowledge: 30 };
    return suitOffsets[this.suit] + this.number;
  }

  /**
   * Has benefits
   */
  get hasBenefits() {
    return this.benefits.length > 0;
  }

  /**
   * Has complications
   */
  get hasComplications() {
    return this.complications.length > 0;
  }

  /**
   * Is purely beneficial (no complications)
   */
  get isPurelyBeneficial() {
    return this.hasBenefits && !this.hasComplications;
  }

  /**
   * Is purely detrimental (no benefits)
   */
  get isPurelyDetrimental() {
    return this.hasComplications && !this.hasBenefits;
  }

  /**
   * Total removable complication cost
   */
  get totalRemovalCost() {
    return this.complications
      .filter(c => c.removable)
      .reduce((total, c) => total + c.removalCost, 0);
  }

  /**
   * Check if event can be drawn given conditions
   */
  canDraw(context = {}) {
    const cond = this.conditions;

    if (cond.minAge && context.age < cond.minAge) return false;
    if (cond.maxAge && context.age > cond.maxAge) return false;
    if (cond.lineages.length > 0 && !cond.lineages.includes(context.lineage)) return false;
    if (cond.archetypes.length > 0 && !cond.archetypes.includes(context.archetype)) return false;

    return true;
  }

  /**
   * Get data for character creation
   */
  getCreationData() {
    return {
      suit: this.suit,
      number: this.number,
      absoluteNumber: this.absoluteNumber,
      benefits: this.benefits.map(b => ({
        type: b.type,
        target: b.target,
        value: b.value,
        description: b.description,
        choice: b.choice,
        options: [...b.options]
      })),
      complications: this.complications.map(c => ({
        type: c.type,
        target: c.target,
        severity: c.severity,
        description: c.description,
        removable: c.removable,
        removalCost: c.removalCost
      })),
      lpValue: this.lpValue
    };
  }
}
