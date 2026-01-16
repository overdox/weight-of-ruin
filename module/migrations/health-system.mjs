/**
 * The Weight of Ruin - Health System Migration
 * Migrates actor data from the old Fatigue/Critical Injuries system
 * to the new Trauma/Resilience system.
 *
 * Old System:
 * - health.fatigue (number)
 * - health.criticalInjuries (array of objects)
 *
 * New System:
 * - health.trauma (number) - replaces fatigue
 * - health.resilience.value (number) - current resilience
 * - health.resilience.max (number) - max resilience
 * - health.maxTraumaReduction (number) - accumulated reduction
 * - health.stabilized (boolean)
 */

/**
 * Migrate the health system data for all actors.
 */
export async function migrateHealthSystem() {
  console.log('The Weight of Ruin | Migrating health system data...');

  // Migrate all world actors
  const worldActors = game.actors.filter(a =>
    ['character', 'npc', 'creature'].includes(a.type)
  );

  console.log(`The Weight of Ruin | Found ${worldActors.length} world actors to migrate`);

  for (const actor of worldActors) {
    await migrateActorHealth(actor);
  }

  // Migrate actors in compendiums
  for (const pack of game.packs) {
    if (pack.documentName !== 'Actor') continue;
    if (pack.locked) {
      console.log(`The Weight of Ruin | Skipping locked compendium: ${pack.collection}`);
      continue;
    }

    const documents = await pack.getDocuments();
    const actorsToMigrate = documents.filter(a =>
      ['character', 'npc', 'creature'].includes(a.type)
    );

    console.log(`The Weight of Ruin | Found ${actorsToMigrate.length} actors in compendium ${pack.collection}`);

    for (const actor of actorsToMigrate) {
      await migrateActorHealth(actor);
    }
  }

  // Migrate token actors on scenes
  for (const scene of game.scenes) {
    for (const token of scene.tokens) {
      if (token.actorLink) continue; // Linked tokens use the world actor data
      if (!token.actor) continue;
      if (!['character', 'npc', 'creature'].includes(token.actor.type)) continue;

      await migrateActorHealth(token.actor, true);
    }
  }

  console.log('The Weight of Ruin | Health system migration complete');
}

/**
 * Migrate a single actor's health data.
 * @param {Actor} actor - The actor to migrate
 * @param {boolean} isToken - Whether this is a token actor (unlinked)
 */
async function migrateActorHealth(actor, isToken = false) {
  const health = actor.system?.health;

  // Check if already migrated (has new resilience structure)
  if (health?.resilience !== undefined && typeof health.resilience === 'object') {
    console.log(`The Weight of Ruin | Actor ${actor.name} already migrated, skipping`);
    return;
  }

  // Get old values
  const oldFatigue = health?.fatigue ?? 0;
  const oldCriticalInjuries = health?.criticalInjuries ?? [];
  const injuryCount = Array.isArray(oldCriticalInjuries) ? oldCriticalInjuries.length : 0;

  // Calculate new values
  // Trauma = old fatigue value
  const trauma = oldFatigue;

  // Calculate base resilience from toughness
  // baseResilience = floor((3 + toughness) / 2)
  const toughness = (actor.system?.attributes?.resolve ?? 0) + (actor.system?.attributes?.fortitude ?? 0);
  const baseResilience = Math.floor((3 + toughness) / 2);

  // Current resilience = max resilience - injury count (converted to lost resilience)
  // Each old critical injury = 1 lost resilience
  const currentResilience = Math.max(0, baseResilience - injuryCount);

  // Max trauma reduction from old injuries (each injury = 2 max trauma reduction)
  const maxTraumaReduction = injuryCount * 2;

  // Prepare update data
  const updateData = {
    'system.health.trauma': trauma,
    'system.health.resilience': {
      value: currentResilience,
      max: baseResilience
    },
    'system.health.maxTraumaReduction': maxTraumaReduction,
    'system.health.stabilized': false,
    // Remove old fields by setting to null
    'system.health.fatigue': null,
    'system.health.criticalInjuries': null
  };

  try {
    await actor.update(updateData);
    console.log(`The Weight of Ruin | Migrated actor ${actor.name}: Fatigue ${oldFatigue} -> Trauma ${trauma}, Injuries ${injuryCount} -> Resilience ${currentResilience}/${baseResilience}`);
  } catch (error) {
    console.error(`The Weight of Ruin | Failed to migrate actor ${actor.name}:`, error);
    throw error;
  }
}
