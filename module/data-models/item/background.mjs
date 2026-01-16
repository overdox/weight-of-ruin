import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Background DataModel
 * 37 backgrounds organized by economic tier
 * Provides starting wealth, skills, contacts, social standing
 */
export default class BackgroundData extends ItemBaseData {

  /**
   * Migrate source data before validation
   * Handles old format where startingWealth was a number instead of an object
   * Also migrates old social standing keys to new ones
   */
  static migrateData(source) {
    // Migrate startingWealth from number to object
    if (typeof source.startingWealth === 'number') {
      const value = source.startingWealth;
      source.startingWealth = {
        min: Math.floor(value * 0.8),
        max: Math.ceil(value * 1.2),
        currency: "crowns"
      };
    }

    // Migrate old social standing keys to new ones
    const standingMigration = {
      outsideSociety: 'outcast',
      stigmatized: 'heretics',
      thirdEstate: 'penitent',
      secondEstate: 'anointed',
      firstEstate: 'ordained',
      nobility: 'exalted'
    };
    if (source.socialStanding && standingMigration[source.socialStanding]) {
      source.socialStanding = standingMigration[source.socialStanding];
    }

    // Remove old freeSkillRanks field (now derived from socialStanding)
    // Keep for backwards compatibility but it will be ignored
    delete source.freeSkillRanks;

    return super.migrateData(source);
  }

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // ECONOMIC TIER
    // Upper, Middle, Lower, Struggling
    // ========================================
    schema.economicTier = new fields.StringField({
      required: true,
      blank: false,
      initial: "middle",
      choices: ["upper", "middle", "lower", "struggling"],
      label: "WOR.Background.EconomicTier"
    });

    // ========================================
    // STARTING WEALTH
    // Range with configurable currency
    // ========================================
    schema.startingWealth = new fields.SchemaField({
      min: new fields.NumberField({
        ...requiredInteger,
        initial: 50,
        min: 0,
        label: "WOR.Background.StartingWealth.Min"
      }),
      max: new fields.NumberField({
        ...requiredInteger,
        initial: 100,
        min: 0,
        label: "WOR.Background.StartingWealth.Max"
      }),
      // Currency type: orin (copper), crowns (silver), sovereigns (gold)
      currency: new fields.StringField({
        required: true,
        blank: false,
        initial: "crowns",
        choices: ["orin", "crowns", "sovereigns"],
        label: "WOR.Background.StartingWealth.Currency"
      }),
      // Roll formula for wealth (optional)
      formula: new fields.StringField({ required: false, blank: true })
    });

    // Note: freeSkillRanks is now a derived property based on socialStanding
    // See the getter below

    // ========================================
    // SKILL GRANTS
    // Skills provided by this background
    // ========================================
    schema.skillGrants = new fields.ArrayField(
      new fields.SchemaField({
        skill: new fields.StringField({ required: true, blank: false }),
        rank: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 3 }),
        // Is this a choice from a list?
        choice: new fields.BooleanField({ initial: false }),
        // Options if it's a choice
        options: new fields.ArrayField(
          new fields.StringField({ required: true, blank: false }),
          { initial: [] }
        )
      }),
      { initial: [] }
    );

    // ========================================
    // OBLIGATIONS
    // Duties or expectations from background
    // ========================================
    schema.obligations = new fields.ArrayField(
      new fields.SchemaField({
        name: new fields.StringField({ required: true, blank: false }),
        description: new fields.StringField({ required: false, blank: true }),
        severity: new fields.StringField({
          required: false,
          blank: true,
          choices: ["minor", "moderate", "major"]
        })
      }),
      { initial: [] }
    );

    // ========================================
    // SOCIAL STANDING
    // Determines skill ranks and societal perception
    // The Exalted → The Outcast (highest to lowest standing)
    // ========================================
    schema.socialStanding = new fields.StringField({
      required: true,
      blank: false,
      initial: "penitent",
      choices: ["exalted", "ordained", "anointed", "penitent", "heretics", "outcast"],
      label: "WOR.Background.SocialStanding"
    });

    // ========================================
    // CONTACT
    // Simple description of starting contact
    // ========================================
    schema.contact = new fields.StringField({
      required: false,
      blank: true,
      label: "WOR.Background.Contact"
    });

    // ========================================
    // STARTING EQUIPMENT
    // Default gear from background
    // ========================================
    schema.startingEquipment = new fields.ArrayField(
      new fields.SchemaField({
        name: new fields.StringField({ required: true, blank: false }),
        quantity: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
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
    // TYPICAL PROFESSIONS
    // ========================================
    schema.professions = new fields.ArrayField(
      new fields.StringField({ required: true, blank: false }),
      { initial: [] }
    );

    // ========================================
    // CP AWARD
    // CP gained for accepting this background
    // Lower/Struggling tiers give bonus CP
    // ========================================
    schema.lpAward = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
      min: 0,
      label: "WOR.Background.LPAward"
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Average starting wealth
   */
  get averageWealth() {
    return Math.floor((this.startingWealth.min + this.startingWealth.max) / 2);
  }

  /**
   * Free skill ranks based on social standing
   * Those outside society's grace have learned more through necessity
   */
  get freeSkillRanks() {
    const standingRanks = {
      exalted: 18,    // Specialized education; servants handle menial tasks
      ordained: 24,   // Religious training; focused devotion limits breadth
      anointed: 30,   // Professional competence; guild training with practical scope
      penitent: 36,   // Common labor; diverse practical skills from hard work
      heretics: 42,   // Survival on society's edge; necessity breeds adaptability
      outcast: 48     // Hard-won experience; every skill learned through desperation
    };
    return standingRanks[this.socialStanding] ?? 36;
  }


  /**
   * Total skill ranks granted from skill grants (not free ranks)
   */
  get totalSkillRanks() {
    return this.skillGrants.reduce((total, grant) => total + grant.rank, 0);
  }

  /**
   * Has obligations
   */
  get hasObligations() {
    return this.obligations.length > 0;
  }

  /**
   * Get data for character creation
   */
  getCreationData() {
    return {
      economicTier: this.economicTier,
      socialStanding: this.socialStanding,
      freeSkillRanks: this.freeSkillRanks,
      startingWealth: foundry.utils.deepClone(this.startingWealth),
      skillGrants: this.skillGrants.map(g => ({
        skill: g.skill,
        rank: g.rank,
        choice: g.choice,
        options: [...g.options]
      })),
      contact: this.contact,
      startingEquipment: this.startingEquipment.map(e => ({
        name: e.name,
        quantity: e.quantity,
        choice: e.choice,
        options: [...e.options]
      })),
      lpAward: this.lpAward
    };
  }
}
