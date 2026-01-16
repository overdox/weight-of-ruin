import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - Calling DataModel
 * Callings are specializations within Archetypes (formerly "Subtypes")
 * 20 total: 4 per Archetype
 *
 * Zealot: Heretic, Inquisitor, Paladin, Witch Hunter
 * Thaumaturge: Druid, Magus, Theurgist, Witch
 * Warrior: Barbarian, Captain, Knight, Sellsword
 * Rogue: Assassin, Bounty Hunter, Ranger, Thief
 * Sage: Alchemist, Skald, Occultist, Physician
 */
export default class CallingData extends ItemBaseData {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // PARENT ARCHETYPE
    // Which archetype this calling belongs to
    // ========================================
    // Note: Includes legacy archetype names (cleric, enchanter, fighter) for backward compatibility
    // cleric->zealot, enchanter->thaumaturge, fighter->warrior
    schema.archetype = new fields.StringField({
      required: true,
      blank: false,
      initial: 'warrior',
      choices: ['zealot', 'thaumaturge', 'warrior', 'rogue', 'sage', 'cleric', 'enchanter', 'fighter'],
      label: "AOA.Calling.Archetype"
    });

    // ========================================
    // FOCUS
    // What this calling specializes in
    // ========================================
    schema.focus = new fields.StringField({
      required: false,
      blank: true,
      label: "AOA.Calling.Focus"
    });

    // ========================================
    // SIGNATURE TALENTS
    // Talents unique to this calling
    // ========================================
    schema.signatureTalents = new fields.ArrayField(
      new fields.SchemaField({
        name: new fields.StringField({ required: true, blank: false }),
        description: new fields.HTMLField({ required: false, blank: true })
      }),
      { initial: [] }
    );

    // ========================================
    // FEATURES
    // Special abilities or traits of this calling
    // ========================================
    schema.features = new fields.ArrayField(
      new fields.SchemaField({
        name: new fields.StringField({ required: true, blank: false }),
        description: new fields.HTMLField({ required: false, blank: true })
      }),
      { initial: [] }
    );

    // ========================================
    // SUGGESTED SKILLS
    // Skills commonly used by this calling
    // ========================================
    schema.suggestedSkills = new fields.ArrayField(
      new fields.StringField({ required: true, blank: false }),
      { initial: [] }
    );

    // ========================================
    // STARTING EQUIPMENT
    // Recommended starting gear for this calling
    // ========================================
    schema.startingEquipment = new fields.ArrayField(
      new fields.StringField({ required: true, blank: false }),
      { initial: [] }
    );

    // ========================================
    // ROLE EMPHASIS
    // How this calling approaches different situations
    // ========================================
    schema.roleEmphasis = new fields.SchemaField({
      combat: new fields.StringField({ required: false, blank: true }),
      exploration: new fields.StringField({ required: false, blank: true }),
      social: new fields.StringField({ required: false, blank: true }),
      magic: new fields.StringField({ required: false, blank: true })
    });

    // ========================================
    // FLAVOR TEXT
    // Thematic description for character building
    // ========================================
    schema.flavorText = new fields.HTMLField({
      required: false,
      blank: true,
      label: "AOA.Calling.FlavorText"
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Number of signature talents
   */
  get signatureTalentCount() {
    return this.signatureTalents.length;
  }

  /**
   * Has features
   */
  get hasFeatures() {
    return this.features.length > 0;
  }

  /**
   * Get archetype display name
   */
  get archetypeDisplay() {
    const archetypes = {
      zealot: 'Zealot',
      thaumaturge: 'Thaumaturge',
      warrior: 'Warrior',
      rogue: 'Rogue',
      sage: 'Sage',
      // Legacy name mappings
      cleric: 'Zealot',
      enchanter: 'Thaumaturge',
      fighter: 'Warrior'
    };
    return archetypes[this.archetype] || this.archetype;
  }

  /**
   * Get signature talent names as array
   */
  get signatureTalentNames() {
    return this.signatureTalents.map(t => t.name);
  }

  /**
   * Get data for character creation
   */
  getCreationData() {
    return {
      archetype: this.archetype,
      focus: this.focus,
      signatureTalents: this.signatureTalents.map(t => ({
        name: t.name,
        description: t.description
      })),
      features: this.features.map(f => ({
        name: f.name,
        description: f.description
      })),
      suggestedSkills: [...this.suggestedSkills],
      startingEquipment: [...this.startingEquipment]
    };
  }
}
