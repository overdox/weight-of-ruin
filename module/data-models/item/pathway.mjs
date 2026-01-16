import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Pathway DataModel
 * 6 pathways: Apprenticeship, Military Service, Academic Study,
 * Street Survival, Spiritual Calling, Wandering
 * Provides skill grants, contacts, narrative hooks
 */
export default class PathwayData extends ItemBaseData {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // SKILL GRANTS
    // ========================================
    schema.skillGrants = new fields.ArrayField(
      new fields.SchemaField({
        skill: new fields.StringField({ required: true, blank: false }),
        rank: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 3 }),
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
    // CONTACT TYPE
    // ========================================
    schema.contact = new fields.SchemaField({
      type: new fields.StringField({
        required: false,
        blank: true,
        label: "AOA.Pathway.Contact.Type"
      }),
      description: new fields.StringField({
        required: false,
        blank: true,
        label: "AOA.Pathway.Contact.Description"
      }),
      relationship: new fields.StringField({
        required: false,
        blank: true,
        initial: "professional",
        choices: ["professional", "mentor", "peer", "rival", "family", "romantic"]
      })
    });

    // ========================================
    // NARRATIVE HOOKS
    // Story elements from this pathway
    // ========================================
    schema.narrativeHooks = new fields.ArrayField(
      new fields.SchemaField({
        name: new fields.StringField({ required: true, blank: false }),
        description: new fields.HTMLField({ required: false, blank: true }),
        type: new fields.StringField({
          required: false,
          blank: true,
          choices: ["obligation", "goal", "secret", "enemy", "ally", "mystery"]
        })
      }),
      { initial: [] }
    );

    // ========================================
    // STARTING RESOURCES
    // Additional resources from pathway
    // ========================================
    schema.resources = new fields.SchemaField({
      // Additional wealth modifier
      wealthModifier: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      // Special items or equipment
      equipment: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      ),
      // Special access or privileges
      privileges: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      )
    });

    // ========================================
    // TYPICAL DURATION
    // How long this pathway typically takes
    // ========================================
    schema.duration = new fields.SchemaField({
      years: new fields.NumberField({ required: false, nullable: true, integer: true, min: 0 }),
      description: new fields.StringField({ required: false, blank: true })
    });

    // ========================================
    // ASSOCIATED ARCHETYPES
    // Archetypes this pathway commonly leads to
    // ========================================
    schema.associatedArchetypes = new fields.ArrayField(
      new fields.StringField({ required: true, blank: false }),
      { initial: [] }
    );

    // ========================================
    // ROLL VALUE
    // For random selection
    // ========================================
    schema.rollValue = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 1,
      max: 6,
      label: "AOA.Pathway.RollValue"
    });

    // ========================================
    // LP AWARD
    // LP gained for accepting random roll
    // ========================================
    schema.lpAward = new fields.NumberField({
      ...requiredInteger,
      initial: 25,
      min: 0,
      label: "AOA.Pathway.LPAward"
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Total skill ranks granted
   */
  get totalSkillRanks() {
    return this.skillGrants.reduce((total, grant) => total + grant.rank, 0);
  }

  /**
   * Has narrative hooks
   */
  get hasNarrativeHooks() {
    return this.narrativeHooks.length > 0;
  }

  /**
   * Provides equipment
   */
  get providesEquipment() {
    return this.resources.equipment.length > 0;
  }

  /**
   * Get data for character creation
   */
  getCreationData() {
    return {
      skillGrants: this.skillGrants.map(g => ({
        skill: g.skill,
        rank: g.rank,
        choice: g.choice,
        options: [...g.options]
      })),
      contact: foundry.utils.deepClone(this.contact),
      narrativeHooks: this.narrativeHooks.map(h => ({
        name: h.name,
        type: h.type
      })),
      resources: {
        wealthModifier: this.resources.wealthModifier,
        equipment: [...this.resources.equipment],
        privileges: [...this.resources.privileges]
      },
      lpAward: this.lpAward
    };
  }
}
