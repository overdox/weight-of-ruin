import ActorBaseData from './base.mjs';

/**
 * The Weight of Ruin - NPC DataModel
 * Simplified actor for non-player characters with threat level and quick stats
 */
export default class NPCData extends ActorBaseData {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // TIER (Power Level)
    // Determines base dice pool budget and trait points
    // ========================================
    schema.tier = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 0,
      max: 6,
      label: "WOR.NPC.Tier.Label"
    });

    // ========================================
    // TRAIT POINTS
    // Budget for selecting NPC traits (determined by tier)
    // ========================================
    schema.traitPoints = new fields.SchemaField({
      max: new fields.NumberField({
        ...requiredInteger,
        initial: 3,
        min: 0,
        label: "WOR.NPC.TraitPoints.Max"
      }),
      spent: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "WOR.NPC.TraitPoints.Spent"
      })
    });

    // ========================================
    // THREAT LEVEL
    // Quick indicator of NPC danger/importance
    // ========================================
    schema.threat = new fields.SchemaField({
      level: new fields.StringField({
        required: false,
        blank: true,
        initial: "minor",
        choices: ["trivial", "minor", "moderate", "major", "severe", "legendary"],
        label: "WOR.NPC.ThreatLevel"
      }),
      // Numeric rating for comparison (1-10)
      rating: new fields.NumberField({
        ...requiredInteger,
        initial: 1,
        min: 1,
        max: 10,
        label: "WOR.NPC.ThreatRating"
      })
    });

    // ========================================
    // NPC TYPE / ROLE
    // ========================================
    schema.npcType = new fields.StringField({
      required: false,
      blank: true,
      initial: "generic",
      label: "WOR.NPC.Type"
    });

    schema.role = new fields.StringField({
      required: false,
      blank: true,
      label: "WOR.NPC.Role"
    });

    // ========================================
    // CLASS / TYPE
    // Creature classification system
    // ========================================
    schema.npcClass = new fields.StringField({
      required: false,
      blank: true,
      initial: "humanoid",
      choices: ["humanoid", "beast", "vermin", "afflicted", "apparition", "fiend"],
      label: "WOR.NPC.Class.Label"
    });

    schema.npcType = new fields.StringField({
      required: false,
      blank: true,
      initial: "",
      label: "WOR.NPC.Type.Label"
    });

    // ========================================
    // NOTABLE ABILITIES (Structured)
    // Quick reference for NPC special capabilities
    // ========================================
    schema.abilities = new fields.ArrayField(
      new fields.SchemaField({
        id: new fields.StringField({ required: true, blank: false }),
        name: new fields.StringField({ required: true, blank: false }),
        description: new fields.StringField({ required: false, blank: true }),
        // For quick-rolls: pool size and difficulty
        pool: new fields.NumberField({ required: false, nullable: true, integer: true }),
        difficulty: new fields.StringField({
          required: false,
          blank: true,
          choices: ["trivial", "standard", "hard"]
        })
      }),
      { initial: [] }
    );

    // ========================================
    // QUICK ATTACKS
    // Pre-configured attacks for fast resolution
    // ========================================
    schema.attacks = new fields.ArrayField(
      new fields.SchemaField({
        id: new fields.StringField({ required: true, blank: false }),
        name: new fields.StringField({ required: true, blank: false }),
        pool: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 }),
        damage: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 }),
        properties: new fields.StringField({ required: false, blank: true })
      }),
      { initial: [] }
    );

    // ========================================
    // TACTICS / GM NOTES
    // ========================================
    schema.tactics = new fields.HTMLField({
      required: false,
      blank: true,
      label: "WOR.NPC.Tactics"
    });

    schema.gmNotes = new fields.HTMLField({
      required: false,
      blank: true,
      label: "WOR.NPC.GMNotes"
    });

    // ========================================
    // MORALE
    // When NPC might flee or surrender
    // ========================================
    schema.morale = new fields.SchemaField({
      threshold: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "WOR.NPC.MoraleThreshold"
      }),
      condition: new fields.StringField({
        required: false,
        blank: true,
        label: "WOR.NPC.MoraleCondition"
      })
    });

    // ========================================
    // LOOT / REWARDS
    // ========================================
    schema.loot = new fields.StringField({
      required: false,
      blank: true,
      label: "WOR.NPC.Loot"
    });

    // ========================================
    // NOTES
    // General notes / description for the NPC
    // ========================================
    schema.notes = new fields.HTMLField({
      required: false,
      blank: true,
      label: "WOR.NPC.Notes"
    });

    return schema;
  }

  // ========================================
  // NPC-SPECIFIC COMPUTED PROPERTIES
  // ========================================

  /**
   * Is this a significant threat?
   */
  get isSignificantThreat() {
    return ["major", "severe", "legendary"].includes(this.threat.level);
  }

  /**
   * Remaining trait points available for spending
   */
  get remainingTraitPoints() {
    return Math.max(0, (this.traitPoints.max || 0) - (this.traitPoints.spent || 0));
  }

  /**
   * Get the best attack pool
   */
  get bestAttackPool() {
    if (this.attacks.length === 0) return 0;
    return Math.max(...this.attacks.map(a => a.pool));
  }

  /**
   * Override getRollData for NPC-specific roll data
   */
  getRollData() {
    const data = super.getRollData();

    // Tier info
    data.tier = this.tier;

    // Trait points
    data.traitPoints = {
      max: this.traitPoints.max,
      spent: this.traitPoints.spent,
      remaining: this.remainingTraitPoints
    };

    // Threat info
    data.threat = {
      level: this.threat.level,
      rating: this.threat.rating
    };

    // Class/Type
    data.npcClass = this.npcClass;
    data.npcType = this.npcType;

    // Quick attack data
    data.attacks = this.attacks.map(a => ({
      name: a.name,
      pool: a.pool,
      damage: a.damage
    }));

    return data;
  }
}
