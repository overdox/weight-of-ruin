import ItemBaseData from './base.mjs';

/**
 * The Weight of Ruin - NPC Trait DataModel
 * Traits are special abilities for NPCs that provide mechanical effects.
 * Selected during NPC creation based on Class, Type, and Tier.
 *
 * Categories: offense, defense, mobility, control, teamplay, leadership,
 *             supernatural, ranged, signature, typeTrait
 */
export default class NPCTraitData extends ItemBaseData {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // ========================================
    // TRAIT CATEGORY
    // Used for filtering and organization
    // ========================================
    schema.category = new fields.StringField({
      required: true,
      blank: false,
      initial: "offense",
      choices: [
        "offense",      // Offense and Brutality
        "defense",      // Defense and Staying Power
        "mobility",     // Mobility and Repositioning
        "control",      // Control, Debuffs, and Cruelty
        "teamplay",     // Teamplay and Mob Tech
        "leadership",   // Leaders, Shouts, and Morale
        "supernatural", // Weird Powers, Curses, Not-Magic-Magic
        "ranged",       // Ranged Identity and Battlefield Roles
        "signature",    // Signature Grimdark Nastiness
        "typeTrait"     // Type-Specific Traits
      ],
      label: "WOR.NPCTrait.Category"
    });

    // ========================================
    // CLASS RESTRICTIONS
    // Which Classes can use this trait (empty = all)
    // ========================================
    schema.allowedClasses = new fields.ArrayField(
      new fields.StringField({
        required: true,
        blank: false,
        choices: ["humanoid", "beast", "vermin", "afflicted", "apparition", "fiend"]
      }),
      {
        initial: [],
        label: "WOR.NPCTrait.AllowedClasses"
      }
    );

    // ========================================
    // TYPE RESTRICTIONS
    // Specific Types this trait is designed for (empty = any type of allowed Classes)
    // ========================================
    schema.typeSpecific = new fields.ArrayField(
      new fields.StringField({ required: true, blank: false }),
      {
        initial: [],
        label: "WOR.NPCTrait.TypeSpecific"
      }
    );

    // ========================================
    // TRAIT POINT COST
    // How many trait points this costs (usually 1)
    // ========================================
    schema.cost = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 0,
      max: 5,
      label: "WOR.NPCTrait.Cost"
    });

    // ========================================
    // TIER REQUIREMENTS
    // Minimum/maximum tier to take this trait
    // ========================================
    schema.tierRequirement = new fields.SchemaField({
      min: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
        max: 6,
        label: "WOR.NPCTrait.TierMin"
      }),
      max: new fields.NumberField({
        ...requiredInteger,
        initial: 6,
        min: 0,
        max: 6,
        label: "WOR.NPCTrait.TierMax"
      })
    });

    // ========================================
    // MECHANICAL EFFECTS
    // Structured data for automation
    // ========================================
    schema.mechanics = new fields.SchemaField({
      // Passive bonuses (e.g., +1 DR, +2 dice)
      bonuses: new fields.ArrayField(
        new fields.SchemaField({
          type: new fields.StringField({
            required: true,
            blank: false,
            choices: [
              "dr",           // Damage Reduction
              "defense",      // Defense value
              "attackPool",   // Attack dice pool
              "damagePool",   // Damage dice
              "movement",     // Movement speed
              "pool",         // Generic dice pool modifier
              "maxHits",      // Maximum hits (precision)
              "other"         // Other mechanical effect
            ]
          }),
          value: new fields.NumberField({ required: true, nullable: false, integer: true }),
          condition: new fields.StringField({ required: false, blank: true }), // e.g., "vs wounded", "vs ranged"
          damageType: new fields.StringField({ required: false, blank: true }) // e.g., "slash", "pierce", "blunt"
        }),
        { initial: [] }
      ),

      // Trigger conditions (when the trait activates)
      trigger: new fields.StringField({
        required: false,
        blank: true,
        choices: [
          "",              // Always active / passive
          "onHit",         // When this NPC hits
          "onCrit",        // When scoring 3+ extra hits
          "onDamaged",     // When this NPC takes damage
          "onDefend",      // When this NPC defends
          "onKill",        // When this NPC kills/drops a target
          "onTurnStart",   // At start of turn
          "onTurnEnd",     // At end of turn
          "onMove",        // When this NPC moves
          "onAllyHit",     // When an ally is hit
          "onAllyDown",    // When an ally drops
          "onAllyDeath",   // When an ally dies
          "reaction",      // As a reaction
          "action",        // Requires an action to use
          "firstRound",    // First round of combat only
          "oncePerFight",  // Once per combat
          "oncePerRound"   // Once per round
        ],
        label: "WOR.NPCTrait.Trigger"
      }),

      // Applied conditions (debuffs applied to targets)
      appliedConditions: new fields.ArrayField(
        new fields.SchemaField({
          condition: new fields.StringField({
            required: true,
            blank: false,
            choices: [
              "wounded",
              "staggered",
              "stunned",
              "slowed",
              "weakened",
              "restrained",
              "grappled",
              "prone",
              "blinded",
              "frightened",
              "charmed",
              "bleeding",
              "poisoned",
              "burning",
              "numb",
              "shaken"
            ]
          }),
          duration: new fields.StringField({
            required: false,
            blank: true,
            initial: "1 round"
          }),
          hitThreshold: new fields.NumberField({
            required: false,
            nullable: true,
            integer: true,
            initial: null
          }) // Hits needed to apply (null = any hit)
        }),
        { initial: [] }
      ),

      // Special abilities (text descriptions of unique effects)
      special: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        { initial: [] }
      ),

      // Is this trait passive or must be activated
      passive: new fields.BooleanField({ initial: true }),

      // Cooldown (if applicable)
      cooldown: new fields.StringField({
        required: false,
        blank: true,
        label: "WOR.NPCTrait.Cooldown"
      })
    });

    // ========================================
    // QUICK ROLL (if trait grants a rollable ability)
    // ========================================
    schema.roll = new fields.SchemaField({
      // Does this trait have an associated roll
      hasRoll: new fields.BooleanField({ initial: false }),
      // Pool size or formula (e.g., "5" or "@tier + 3")
      pool: new fields.StringField({ required: false, blank: true }),
      // Difficulty for the roll
      difficulty: new fields.StringField({
        required: false,
        blank: true,
        choices: ["", "trivial", "standard", "hard"]
      })
    });

    return schema;
  }

  // ========================================
  // COMPUTED PROPERTIES
  // ========================================

  /**
   * Is this a type-specific trait
   */
  get isTypeSpecific() {
    return this.category === "typeTrait" || this.typeSpecific.length > 0;
  }

  /**
   * Is this trait available for a given Class
   * @param {string} npcClass - The creature class
   * @returns {boolean}
   */
  isAvailableForClass(npcClass) {
    if (this.allowedClasses.length === 0) return true;
    return this.allowedClasses.includes(npcClass);
  }

  /**
   * Is this trait available for a given Type
   * @param {string} npcType - The creature type
   * @returns {boolean}
   */
  isAvailableForType(npcType) {
    if (this.typeSpecific.length === 0) return true;
    return this.typeSpecific.includes(npcType.toLowerCase());
  }

  /**
   * Is this trait available at a given Tier
   * @param {number} tier - The NPC tier
   * @returns {boolean}
   */
  isAvailableAtTier(tier) {
    return tier >= this.tierRequirement.min && tier <= this.tierRequirement.max;
  }

  /**
   * Check if an NPC can take this trait
   * @param {string} npcClass - The NPC's class
   * @param {string} npcType - The NPC's type
   * @param {number} tier - The NPC's tier
   * @returns {boolean}
   */
  canTake(npcClass, npcType, tier) {
    return this.isAvailableForClass(npcClass) &&
           this.isAvailableForType(npcType) &&
           this.isAvailableAtTier(tier);
  }

  /**
   * Get a summary of restrictions for display
   * @returns {string}
   */
  get restrictionSummary() {
    const parts = [];

    if (this.allowedClasses.length > 0) {
      parts.push(`Class: ${this.allowedClasses.join(', ')}`);
    }
    if (this.typeSpecific.length > 0) {
      parts.push(`Type: ${this.typeSpecific.join(', ')}`);
    }
    if (this.tierRequirement.min > 0 || this.tierRequirement.max < 6) {
      parts.push(`Tier: ${this.tierRequirement.min}-${this.tierRequirement.max}`);
    }

    return parts.length > 0 ? parts.join(' | ') : 'None';
  }

  /**
   * Get roll data for this trait
   */
  getRollData() {
    return {
      category: this.category,
      cost: this.cost,
      bonuses: this.mechanics.bonuses,
      trigger: this.mechanics.trigger,
      hasRoll: this.roll.hasRoll,
      pool: this.roll.pool,
      difficulty: this.roll.difficulty
    };
  }
}
