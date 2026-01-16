/**
 * Data model for Loot actors (treasure piles and merchants).
 * @extends {foundry.abstract.TypeDataModel}
 */
const fields = foundry.data.fields;

export default class LootData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const requiredInteger = { required: true, nullable: false, integer: true };

    return {
      // Sheet mode: 'loot' or 'merchant'
      sheetType: new fields.StringField({
        initial: 'loot',
        choices: ['loot', 'merchant'],
        label: 'WOR.Loot.SheetType'
      }),

      // Currency (same structure as character wealth)
      wealth: new fields.SchemaField({
        orin: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          label: 'WOR.Wealth.Orin'
        }),
        crowns: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          label: 'WOR.Wealth.Crowns'
        }),
        sovereigns: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          label: 'WOR.Wealth.Sovereigns'
        })
      }),

      // Auto-hide token when inventory is empty
      hiddenWhenEmpty: new fields.BooleanField({
        initial: false,
        label: 'WOR.Loot.HiddenWhenEmpty'
      }),

      // Description/notes for this loot pile or merchant
      description: new fields.HTMLField({
        initial: '',
        label: 'WOR.Common.Description'
      }),

      // Merchant-specific: price modifier as percentage (100 = normal, 150 = 50% markup)
      priceModifier: new fields.NumberField({
        ...requiredInteger,
        initial: 100,
        min: 0,
        max: 500,
        label: 'WOR.Loot.PriceModifier'
      })
    };
  }

  /* -------------------------------------------- */
  /*  Computed Properties                         */
  /* -------------------------------------------- */

  /**
   * Calculate total wealth in base currency (Orin).
   * Conversion: 1 Crown = 10 Orin, 1 Sovereign = 100 Orin
   * @returns {number}
   */
  get totalWealthInOrin() {
    return this.wealth.orin + (this.wealth.crowns * 10) + (this.wealth.sovereigns * 100);
  }

  /**
   * Check if the loot actor is empty (no items and no currency).
   * @returns {boolean}
   */
  get isEmpty() {
    return this.parent.items.size === 0 && this.totalWealthInOrin === 0;
  }

  /**
   * Check if this is in loot mode.
   * @returns {boolean}
   */
  get isLootMode() {
    return this.sheetType === 'loot';
  }

  /**
   * Check if this is in merchant mode.
   * @returns {boolean}
   */
  get isMerchantMode() {
    return this.sheetType === 'merchant';
  }

  /**
   * Calculate the total value of all items in this loot pile.
   * @returns {number} Total value in Orin
   */
  get totalItemValue() {
    let total = 0;
    for (const item of this.parent.items) {
      const value = item.system.value || 0;
      const quantity = item.system.quantity || 1;
      total += value * quantity;
    }
    return total;
  }

  /**
   * Calculate the total value including currency and items.
   * @returns {number} Total value in Orin
   */
  get totalValue() {
    return this.totalWealthInOrin + this.totalItemValue;
  }

  /**
   * Apply price modifier to a base price (for merchant mode).
   * @param {number} basePrice - The base price in Orin
   * @returns {number} Modified price
   */
  getModifiedPrice(basePrice) {
    return Math.ceil(basePrice * (this.priceModifier / 100));
  }
}
