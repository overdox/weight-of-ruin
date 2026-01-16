/**
 * The Weight of Ruin - Migrations Module
 * Handles data migrations between system versions
 */

import { migrateHealthSystem } from './health-system.mjs';
import { migrateWeaponsArmor } from './weapons-armor.mjs';
import { migrateArmorFieldRename } from './armor-field-rename.mjs';
import { migrateProwessRename } from './prowess-rename.mjs';

/**
 * Current system data version.
 * Increment this when new migrations are added.
 */
export const SYSTEM_DATA_VERSION = 4;

/**
 * List of migrations in order they should be applied.
 * Each migration should have:
 * - version: The version this migration brings the data to
 * - name: Human-readable name for the migration
 * - migrate: Async function that performs the migration
 */
const MIGRATIONS = [
  {
    version: 1,
    name: 'Health System (Fatigue/Critical Injuries to Trauma/Resilience)',
    migrate: migrateHealthSystem
  },
  {
    version: 2,
    name: 'Weapons & Armor (new damage formula, properties, and categories)',
    migrate: migrateWeaponsArmor
  },
  {
    version: 3,
    name: 'Armor Field Rename (armorType→armorCategory, armorCategory→armorGroup)',
    migrate: migrateArmorFieldRename
  },
  {
    version: 4,
    name: 'Prowess Rename (meleeProwess → weaponProwess)',
    migrate: migrateProwessRename
  }
];

/**
 * Check if migrations are needed and run them.
 * Called during system ready hook.
 */
export async function checkAndRunMigrations() {
  // Only GM can run migrations
  if (!game.user.isGM) return;

  // Get the current data version from settings
  const currentVersion = game.settings.get('weight-of-ruin', 'systemDataVersion') ?? 0;

  // Check if migrations are needed
  if (currentVersion >= SYSTEM_DATA_VERSION) {
    console.log('The Weight of Ruin | Data is up to date, no migrations needed');
    return;
  }

  // Determine which migrations to run
  const migrationsToRun = MIGRATIONS.filter(m => m.version > currentVersion);

  if (migrationsToRun.length === 0) {
    console.log('The Weight of Ruin | No migrations to run');
    return;
  }

  // Show notification
  ui.notifications.info(`The Weight of Ruin | Running ${migrationsToRun.length} data migration(s)...`, { permanent: true });

  // Run migrations in order
  for (const migration of migrationsToRun) {
    console.log(`The Weight of Ruin | Running migration: ${migration.name}`);

    try {
      await migration.migrate();
      console.log(`The Weight of Ruin | Migration complete: ${migration.name}`);
    } catch (error) {
      console.error(`The Weight of Ruin | Migration failed: ${migration.name}`, error);
      ui.notifications.error(`Migration failed: ${migration.name}. See console for details.`);
      return; // Stop on error
    }
  }

  // Update the stored version
  await game.settings.set('weight-of-ruin', 'systemDataVersion', SYSTEM_DATA_VERSION);

  ui.notifications.info('The Weight of Ruin | Data migrations complete!', { permanent: true });
}

/**
 * Register migration-related settings.
 * Called during system init hook.
 */
export function registerMigrationSettings() {
  game.settings.register('weight-of-ruin', 'systemDataVersion', {
    name: 'System Data Version',
    hint: 'Used to track data migrations. Do not modify.',
    scope: 'world',
    config: false,
    type: Number,
    default: 0
  });
}
