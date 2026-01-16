#!/usr/bin/env node
/**
 * Version Sync Script for The Weight of Ruin
 * Synchronizes version between package.json and system.json
 *
 * Usage:
 *   node scripts/sync-version.js           # Sync package.json version to system.json
 *   node scripts/sync-version.js 0.2.0     # Set specific version in both files
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const packagePath = join(ROOT, 'package.json');
const systemPath = join(ROOT, 'system.json');

// Read current files
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
const systemJson = JSON.parse(readFileSync(systemPath, 'utf8'));

// Get version from argument or package.json
const newVersion = process.argv[2] || packageJson.version;

// Validate semver format
if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(newVersion)) {
  console.error(`❌ Invalid version format: ${newVersion}`);
  console.error('   Expected format: X.Y.Z or X.Y.Z-tag');
  process.exit(1);
}

const oldPackageVersion = packageJson.version;
const oldSystemVersion = systemJson.version;

// Update versions
packageJson.version = newVersion;
systemJson.version = newVersion;

// Write files
writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
writeFileSync(systemPath, JSON.stringify(systemJson, null, 2) + '\n');

console.log(`\n✅ Version synchronized to ${newVersion}`);
if (oldPackageVersion !== newVersion) {
  console.log(`   package.json: ${oldPackageVersion} → ${newVersion}`);
}
if (oldSystemVersion !== newVersion) {
  console.log(`   system.json:  ${oldSystemVersion} → ${newVersion}`);
}
console.log('');
