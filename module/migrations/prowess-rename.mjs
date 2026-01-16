/**
 * The Weight of Ruin - Prowess Rename Migration
 * Renames meleeProwess to weaponProwess in all items (weapons, skills)
 */

/**
 * Migrate prowess field from meleeProwess to weaponProwess
 */
export async function migrateProwessRename() {
  console.log('The Weight of Ruin | Migrating prowess field (meleeProwess → weaponProwess)');

  // Migrate world actors and their embedded items
  for (const actor of game.actors) {
    const updates = [];

    for (const item of actor.items) {
      if (item.system.prowess === 'meleeProwess') {
        updates.push({
          _id: item.id,
          'system.prowess': 'weaponProwess'
        });
      }
    }

    if (updates.length > 0) {
      console.log(`The Weight of Ruin | Updating ${updates.length} items on actor ${actor.name}`);
      await actor.updateEmbeddedDocuments('Item', updates);
    }
  }

  // Migrate world items (not embedded in actors)
  const worldItemUpdates = [];
  for (const item of game.items) {
    if (item.system.prowess === 'meleeProwess') {
      worldItemUpdates.push({
        _id: item.id,
        'system.prowess': 'weaponProwess'
      });
    }
  }

  if (worldItemUpdates.length > 0) {
    console.log(`The Weight of Ruin | Updating ${worldItemUpdates.length} world items`);
    await Item.updateDocuments(worldItemUpdates);
  }

  // Migrate items in compendiums
  for (const pack of game.packs) {
    if (pack.metadata.packageType !== 'system') continue;
    if (pack.documentClass.documentName !== 'Item') continue;

    const wasLocked = pack.locked;
    if (wasLocked) await pack.configure({ locked: false });

    const documents = await pack.getDocuments();
    const packUpdates = [];

    for (const doc of documents) {
      if (doc.system.prowess === 'meleeProwess') {
        packUpdates.push({
          _id: doc.id,
          'system.prowess': 'weaponProwess'
        });
      }
    }

    if (packUpdates.length > 0) {
      console.log(`The Weight of Ruin | Updating ${packUpdates.length} items in pack ${pack.metadata.label}`);
      await Item.updateDocuments(packUpdates, { pack: pack.collection });
    }

    if (wasLocked) await pack.configure({ locked: true });
  }

  console.log('The Weight of Ruin | Prowess rename migration complete');
}
