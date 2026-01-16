import ActorBaseData from './base.mjs';

/**
 * The Weight of Ruin - Character DataModel
 * Full player character with Essence, Zeal, Passions, wealth, social standing, etc.
 */
export default class CharacterData extends ActorBaseData {

  /**
   * Migrate source data before validation
   * Handles old social standing format (economic tiers) to new standing keys
   */
  static migrateData(source) {
    // Migrate old social standing values (economic tiers or old keys)
    if (source.socialStanding?.tier) {
      const standingMigration = {
        // Old economic tier values
        upper: 'anointed',
        middle: 'penitent',
        lower: 'heretics',
        struggling: 'outcast',
        // Old social standing keys (if any existed)
        outsideSociety: 'outcast',
        stigmatized: 'heretics',
        thirdEstate: 'penitent',
        secondEstate: 'anointed',
        firstEstate: 'ordained',
        nobility: 'exalted'
      };
      if (standingMigration[source.socialStanding.tier]) {
        source.socialStanding.tier = standingMigration[source.socialStanding.tier];
      }
    }

    return super.migrateData(source);
  }

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // ESSENCE (Spiritual Integrity)
    // Degrades from 10 to 0; 0 = Leng transformation
    // ========================================
    schema.essence = new fields.SchemaField({
      current: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
        min: 0,
        max: 10,
        label: "WOR.Essence.Current"
      }),
      max: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
        min: 0,
        max: 10,
        label: "WOR.Essence.Max"
      }),
      // Corruption signs manifest as Essence degrades
      corruptionSigns: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField({ required: true, blank: false }),
          description: new fields.StringField({ required: true, blank: false }),
          essenceThreshold: new fields.NumberField({ required: false, nullable: true, integer: true }),
          timestamp: new fields.NumberField({ required: true, nullable: false })
        }),
        { initial: [] }
      )
    });

    // ========================================
    // FERVOR (Passion-driven resource)
    // Max 5, earned by acting on Passions
    // ========================================
    schema.fervor = new fields.SchemaField({
      current: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        max: 5,
        label: "WOR.Fervor.Current"
      }),
      max: new fields.NumberField({
        ...requiredInteger,
        initial: 5,
        min: 0,
        max: 5,
        label: "WOR.Fervor.Max"
      })
    });

    // ========================================
    // PASSIONS (Freeform text)
    // Motivation, Nature, Allegiance
    // ========================================
    schema.passions = new fields.SchemaField({
      motivation: new fields.StringField({
        required: false,
        blank: true,
        label: "WOR.Passions.Motivation"
      }),
      nature: new fields.StringField({
        required: false,
        blank: true,
        label: "WOR.Passions.Nature"
      }),
      allegiance: new fields.StringField({
        required: false,
        blank: true,
        label: "WOR.Passions.Allegiance"
      })
    });

    // ========================================
    // CHARACTER IDENTITY
    // Lineage, Background, Archetype, Pathway references
    // ========================================
    schema.identity = new fields.SchemaField({
      age: new fields.NumberField({
        required: false,
        nullable: true,
        integer: true,
        min: 0,
        label: "WOR.Identity.Age"
      }),
      lineage: new fields.StringField({ required: false, blank: true }),
      lineageId: new fields.StringField({ required: false, blank: true }),
      background: new fields.StringField({ required: false, blank: true }),
      backgroundId: new fields.StringField({ required: false, blank: true }),
      archetype: new fields.StringField({ required: false, blank: true }),
      archetypeId: new fields.StringField({ required: false, blank: true }),
      calling: new fields.StringField({ required: false, blank: true }),
      callingId: new fields.StringField({ required: false, blank: true }),
      // Deprecated - use 'calling' instead
      subtype: new fields.StringField({ required: false, blank: true }),
      pathway: new fields.StringField({ required: false, blank: true }),
      pathwayId: new fields.StringField({ required: false, blank: true }),
      province: new fields.StringField({ required: false, blank: true })
    });

    // ========================================
    // NOTES (Rich text for player notes)
    // ========================================
    schema.notes = new fields.HTMLField({
      required: false,
      blank: true,
      initial: "",
      label: "WOR.Section.Notes"
    });

    // ========================================
    // SOCIAL STANDING
    // Determines societal perception (from background)
    // ========================================
    schema.socialStanding = new fields.SchemaField({
      tier: new fields.StringField({
        required: false,
        blank: true,
        initial: "penitent",
        choices: ["exalted", "ordained", "anointed", "penitent", "heretics", "outcast"],
        label: "WOR.SocialStanding.Tier"
      }),
      rank: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "WOR.SocialStanding.Rank"
      }),
      reputation: new fields.StringField({
        required: false,
        blank: true,
        label: "WOR.SocialStanding.Reputation"
      })
    });

    // ========================================
    // WEALTH
    // Currency: Orin (copper), Crowns (silver), Sovereigns (gold)
    // ========================================
    schema.wealth = new fields.SchemaField({
      orin: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "WOR.Wealth.Orin"
      }),
      crowns: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "WOR.Wealth.Crowns"
      }),
      sovereigns: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "WOR.Wealth.Sovereigns"
      })
    });

    // ========================================
    // EXPERIENCE & ADVANCEMENT
    // ========================================
    schema.advancement = new fields.SchemaField({
      xp: new fields.SchemaField({
        current: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          label: "WOR.Advancement.XP.Current"
        }),
        total: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          label: "WOR.Advancement.XP.Total"
        })
      }),
      // Legacy Points (used during character creation)
      lp: new fields.SchemaField({
        earned: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          label: "WOR.LP.Earned"
        }),
        spent: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          label: "WOR.LP.Spent"
        })
      })
    });

    // ========================================
    // CONTACTS (from Background, Pathway, Life Events)
    // ========================================
    schema.contacts = new fields.ArrayField(
      new fields.SchemaField({
        id: new fields.StringField({ required: true, blank: false }),
        name: new fields.StringField({ required: true, blank: false }),
        description: new fields.StringField({ required: false, blank: true }),
        source: new fields.StringField({ required: false, blank: true }),
        relationship: new fields.StringField({ required: false, blank: true })
      }),
      { initial: [] }
    );

    // ========================================
    // SORCERY (Techniques & Forms)
    // Only relevant if Witchsight > 0
    // ========================================
    schema.sorcery = new fields.SchemaField({
      techniques: new fields.SchemaField({
        create: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        perceive: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        transform: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        destroy: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        control: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 })
      }),
      forms: new fields.SchemaField({
        elements: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        living: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        mind: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        matter: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        spirit: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        space: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        time: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 })
      })
    });

    // ========================================
    // CHARACTER CREATION STATE
    // Tracks progress through creation wizard
    // ========================================
    schema.creation = new fields.SchemaField({
      complete: new fields.BooleanField({ initial: false }),
      step: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      // Track which choices were rolled vs selected
      rolledLineage: new fields.BooleanField({ initial: false }),
      rolledArchetype: new fields.BooleanField({ initial: false }),
      rolledPathway: new fields.BooleanField({ initial: false }),
      // Life events accepted
      lifeEventsAccepted: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      )
    });

    return schema;
  }

  // ========================================
  // CHARACTER-SPECIFIC COMPUTED PROPERTIES
  // ========================================

  /**
   * Total wealth in Orin (base currency)
   * 1 Crown = 10 Orin, 1 Sovereign = 100 Orin
   */
  get totalWealthInOrin() {
    return this.wealth.orin +
           (this.wealth.crowns * 10) +
           (this.wealth.sovereigns * 100);
  }

  /**
   * Remaining Legacy Points
   */
  get lpRemaining() {
    return this.advancement.lp.earned - this.advancement.lp.spent;
  }

  /**
   * Essence at critical level (1-2)
   */
  get essenceCritical() {
    return this.essence.current <= 2 && this.essence.current > 0;
  }

  /**
   * Leng Transformation (Essence = 0)
   */
  get isLeng() {
    return this.essence.current === 0;
  }

  /**
   * Can use Thaumaturgy (has Witchsight)
   */
  get canUseThaumaturgy() {
    return this.witchsight > 0;
  }

  /**
   * Is character creation complete
   */
  get isCreationComplete() {
    return this.creation.complete;
  }

  /**
   * Override prepareDerivedData for character-specific prep
   */
  prepareDerivedData() {
    super.prepareDerivedData();
    // Additional character-specific derived data can be calculated here
  }

  /**
   * Override getRollData for character-specific roll data
   */
  getRollData() {
    const data = super.getRollData();

    // Essence
    data.essence = {
      current: this.essence.current,
      max: this.essence.max,
      critical: this.essenceCritical,
      isLeng: this.isLeng
    };

    // Fervor
    data.fervor = {
      current: this.fervor.current,
      max: this.fervor.max
    };

    // Passions
    data.passions = foundry.utils.deepClone(this.passions);

    // Sorcery (if has Witchsight)
    if (this.canUseThaumaturgy) {
      data.sorcery = {
        techniques: foundry.utils.deepClone(this.sorcery.techniques),
        forms: foundry.utils.deepClone(this.sorcery.forms)
      };
    }

    // Social
    data.socialStanding = foundry.utils.deepClone(this.socialStanding);

    // Wealth
    data.wealth = {
      ...foundry.utils.deepClone(this.wealth),
      totalOrin: this.totalWealthInOrin
    };

    return data;
  }
}
