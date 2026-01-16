/**
 * The Weight of Ruin - Base Actor DataModel
 * Shared schema fields for all actor types (character, npc, creature)
 *
 * Core Attributes (8): STR, FOR, AGI, AWA, RES, PER, ING, EXP
 * Range: -2 to 10 (starting max 5)
 */
export default class ActorBaseData extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    // ========================================
    // CORE ATTRIBUTES (8)
    // Each attribute has: base (character creation), advances (improvements), modifier (temp/other)
    // ========================================
    const attributeSchema = (label) => new fields.SchemaField({
      base: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: -2,
        max: 10,
        label: `${label}.Base`
      }),
      advances: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        max: 10,
        label: `${label}.Advances`
      }),
      modifier: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        label: `${label}.Modifier`
      })
    });

    schema.attributes = new fields.SchemaField({
      strength: attributeSchema("AOA.Attributes.Strength"),
      fortitude: attributeSchema("AOA.Attributes.Fortitude"),
      agility: attributeSchema("AOA.Attributes.Agility"),
      awareness: attributeSchema("AOA.Attributes.Awareness"),
      resolve: attributeSchema("AOA.Attributes.Resolve"),
      persona: attributeSchema("AOA.Attributes.Persona"),
      ingenuity: attributeSchema("AOA.Attributes.Ingenuity"),
      expertise: attributeSchema("AOA.Attributes.Expertise")
    });

    // ========================================
    // WITCHSIGHT (Special Attribute)
    // Required for Thaumaturgy skills
    // ========================================
    schema.witchsight = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
      min: 0,
      max: 10,
      label: "AOA.Attributes.Witchsight"
    });

    // ========================================
    // BASE SPEED (from Lineage)
    // Stored on actor, synced from lineage item
    // Movement = Base Speed + Agility
    // ========================================
    schema.baseSpeed = new fields.NumberField({
      ...requiredInteger,
      initial: 2,
      min: 0,
      max: 5,
      label: "AOA.Derived.BaseSpeed"
    });

    // ========================================
    // HEALTH SYSTEM (Attrition System)
    // Trauma accumulates from damage; Breaking Point triggers Wounds Rolls
    // ========================================
    schema.health = new fields.SchemaField({
      // Trauma: Accumulated physical damage (cuts, bruises, fractures)
      trauma: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "AOA.Health.Trauma"
      }),
      // Wounds: Survival resource pool (remaining health)
      wounds: new fields.SchemaField({
        // Current wounds (decreases when failing Wounds Rolls)
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0, // Set during prepareData based on formula
          min: 0,
          label: "AOA.Health.Wounds.Value"
        }),
        // Max wounds (base value from formula, can be modified by traits)
        max: new fields.NumberField({
          ...requiredInteger,
          initial: 0, // Set during prepareData based on formula
          min: 0,
          label: "AOA.Health.Wounds.Max"
        })
      }),
      // Max Trauma reduction (accumulated from failing Wounds Rolls)
      // Each failed roll reduces Max Trauma by 2
      maxTraumaReduction: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        label: "AOA.Health.MaxTraumaReduction"
      }),
      // Stabilized flag (set by Medicine check when unconscious)
      stabilized: new fields.BooleanField({
        initial: false,
        label: "AOA.Health.Stabilized"
      })
    });

    // ========================================
    // BIOGRAPHY / NOTES
    // ========================================
    schema.biography = new fields.HTMLField({ required: false, blank: true });
    schema.notes = new fields.HTMLField({ required: false, blank: true });

    return schema;
  }

  // ========================================
  // ATTRIBUTE HELPERS
  // ========================================

  /**
   * Get the total value for an attribute (base + advances + modifier)
   * @param {string} attr - The attribute key (e.g., 'strength', 'fortitude')
   * @returns {number} The total attribute value
   */
  getAttributeTotal(attr) {
    const attribute = this.attributes[attr];
    if (!attribute) return 0;
    return (attribute.base || 0) + (attribute.advances || 0) + (attribute.modifier || 0);
  }

  // ========================================
  // COMPUTED PROPERTIES (Derived Attributes)
  // ========================================

  /**
   * Toughness = Resolve + Fortitude
   * Trauma threshold - when Trauma >= Toughness, character enters Breaking Point
   */
  get toughness() {
    return this.getAttributeTotal('resolve') + this.getAttributeTotal('fortitude');
  }

  /**
   * Reflex = Agility + Awareness
   * Used for Initiative and Defense base
   */
  get reflex() {
    return this.getAttributeTotal('agility') + this.getAttributeTotal('awareness');
  }

  /**
   * Defense = floor((3 + Reflex) / 2)
   * Passive defense value
   */
  get defense() {
    return Math.floor((3 + this.reflex) / 2);
  }

  /**
   * Movement = Base Speed + Agility
   * Spaces per Move action (Base Speed comes from Lineage)
   */
  get movement() {
    return (this.baseSpeed ?? 2) + this.getAttributeTotal('agility');
  }

  // ========================================
  // PROWESS DERIVED ATTRIBUTES (Combat)
  // Replace the former combat skills
  // ========================================

  /**
   * Weapon Prowess (WP) = Strength + Agility
   * Used for melee weapon attacks
   */
  get weaponProwess() {
    return this.getAttributeTotal('strength') + this.getAttributeTotal('agility');
  }

  /**
   * Ballistic Prowess (BP) = Awareness + Agility
   * Used for ranged weapon attacks
   */
  get ballisticProwess() {
    return this.getAttributeTotal('awareness') + this.getAttributeTotal('agility');
  }

  /**
   * Unarmed Prowess (UP) = Strength + Fortitude
   * Used for unarmed combat, grappling, brawling
   */
  get unarmedProwess() {
    return this.getAttributeTotal('strength') + this.getAttributeTotal('fortitude');
  }

  /**
   * Max Trauma = 3 + Toughness - maxTraumaReduction
   * Threshold before Breaking Point is triggered
   */
  get maxTrauma() {
    return 3 + this.toughness - (this.health.maxTraumaReduction || 0);
  }

  /**
   * Base Wounds = floor((3 + Toughness) / 2)
   * Base survival resource pool (before lineage bonuses)
   */
  get baseWounds() {
    return Math.floor((3 + this.toughness) / 2);
  }

  /**
   * Current Wounds
   * Returns current wounds value; if 0 (uninitialized), returns maxWounds
   */
  get wounds() {
    const value = this.health.wounds.value;
    // If value is 0 (uninitialized), assume full wounds
    return value > 0 ? value : this.maxWounds;
  }

  /**
   * Max Wounds
   * Returns the maximum wounds, which is baseWounds + any trait modifiers stored in health.wounds.max
   * If health.wounds.max is 0 (uninitialized), uses baseWounds directly
   */
  get maxWounds() {
    // If max is set (non-zero), use it; otherwise calculate from baseWounds
    // This allows trait bonuses to be stored in health.wounds.max
    const storedMax = this.health.wounds.max;
    return storedMax > 0 ? storedMax : this.baseWounds;
  }

  /**
   * Breaking Point State Check
   * Character is at Breaking Point when Trauma > Max Trauma
   * (Checked at END of turn, but state tracked continuously)
   */
  get atBreakingPoint() {
    return this.health.trauma > this.maxTrauma;
  }

  /**
   * Unconscious State Check
   * Character is unconscious when at Breaking Point AND Wounds <= 1
   */
  get isUnconscious() {
    return this.atBreakingPoint && this.health.wounds.value <= 1;
  }

  /**
   * Dead State Check
   * Character is dead when Wounds reaches 0
   */
  get isDead() {
    return this.health.wounds.value <= 0;
  }

  /**
   * Stabilized State Check
   * Character has been stabilized by Medicine check
   */
  get isStabilized() {
    return this.health.stabilized;
  }

  /**
   * Prepare derived data - called during data preparation
   */
  prepareDerivedData() {
    // Derived attributes are computed via getters, but we can cache them here
    // if needed for performance or to make them available in roll data
  }

  /**
   * Get data for roll formulas
   */
  getRollData() {
    const data = {};

    // Core attributes (shorthand for formulas) - use totals for rolls
    data.str = this.getAttributeTotal('strength');
    data.for = this.getAttributeTotal('fortitude');
    data.agi = this.getAttributeTotal('agility');
    data.awa = this.getAttributeTotal('awareness');
    data.res = this.getAttributeTotal('resolve');
    data.per = this.getAttributeTotal('persona');
    data.ing = this.getAttributeTotal('ingenuity');
    data.exp = this.getAttributeTotal('expertise');

    // Full attribute names (includes base/advances/modifier breakdown)
    data.attributes = foundry.utils.deepClone(this.attributes);

    // Add totals to attributes for convenience
    for (const [key, attr] of Object.entries(data.attributes)) {
      attr.total = this.getAttributeTotal(key);
    }

    // Witchsight
    data.witchsight = this.witchsight;

    // Derived attributes
    data.derived = {
      toughness: this.toughness,
      reflex: this.reflex,
      defense: this.defense,
      baseSpeed: this.baseSpeed,
      movement: this.movement,
      maxTrauma: this.maxTrauma,
      baseWounds: this.baseWounds,
      // Prowess (combat derived attributes)
      weaponProwess: this.weaponProwess,
      ballisticProwess: this.ballisticProwess,
      unarmedProwess: this.unarmedProwess
    };

    // Shorthand prowess aliases for roll formulas
    data.wp = this.weaponProwess;
    data.bp = this.ballisticProwess;
    data.up = this.unarmedProwess;

    // Health state
    data.health = {
      trauma: this.health.trauma,
      maxTrauma: this.maxTrauma,
      wounds: this.health.wounds.value,
      maxWounds: this.health.wounds.max,
      maxTraumaReduction: this.health.maxTraumaReduction,
      atBreakingPoint: this.atBreakingPoint,
      isUnconscious: this.isUnconscious,
      isDead: this.isDead,
      isStabilized: this.isStabilized
    };

    return data;
  }
}
