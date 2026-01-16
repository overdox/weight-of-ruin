/**
 * The Weight of Ruin - Base Item DataModel
 * Shared schema fields for all item types
 */
export default class ItemBaseData extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    // ========================================
    // BASIC ITEM FIELDS
    // ========================================
    schema.description = new fields.HTMLField({
      required: false,
      blank: true,
      label: "AOA.Item.Description"
    });

    schema.source = new fields.StringField({
      required: false,
      blank: true,
      label: "AOA.Item.Source"
    });

    return schema;
  }

  /**
   * Prepare data for chat display
   */
  getChatData() {
    return {
      description: this.description
    };
  }
}
