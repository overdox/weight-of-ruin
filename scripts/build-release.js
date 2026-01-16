#!/usr/bin/env node
/**
 * Build Release Script for The Weight of Ruin
 * Creates a distributable zip file for Foundry VTT
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Read system.json for version info
const systemJson = JSON.parse(readFileSync(join(ROOT, 'system.json'), 'utf8'));
const { id, version } = systemJson;

const DIST_DIR = join(ROOT, 'dist');
const ZIP_NAME = `${id}-v${version}.zip`;

// Files/folders to include in the release
const INCLUDE = [
  'system.json',
  'module/**/*',
  'templates/**/*',
  'css/**/*',
  'lang/**/*',
  'assets/**/*',
  'packs/**/*',
  'LICENSE*',
  'README.md',
  'CHANGELOG.md'
];

// Files to explicitly exclude (even if matched by include patterns)
const EXCLUDE = [
  '*.scss',
  'src/**',
  'scripts/**',
  'node_modules/**',
  '.git/**',
  '.github/**',
  'dist/**',
  'package*.json',
  'CLAUDE.md',
  '.gitignore',
  '*.log'
];

console.log(`\n📦 Building The Weight of Ruin v${version}\n`);

// Clean/create dist directory
if (existsSync(DIST_DIR)) {
  rmSync(DIST_DIR, { recursive: true });
}
mkdirSync(DIST_DIR);

// Build the zip using git archive (includes only tracked files) or zip command
try {
  // Check if we're in a git repo
  execSync('git rev-parse --git-dir', { cwd: ROOT, stdio: 'ignore' });

  // Use git archive to create a clean export (respects .gitignore automatically)
  const includePatterns = INCLUDE.map(p => `"${p}"`).join(' ');

  console.log('Creating release archive...');

  // Create zip with specific files
  const zipCmd = `zip -r "${join(DIST_DIR, ZIP_NAME)}" ${INCLUDE.map(p => {
    // Handle glob patterns for zip
    if (p.includes('**/*')) {
      return p.replace('**/*', '');
    }
    return p;
  }).filter(p => existsSync(join(ROOT, p.replace('/**/*', '').replace('/*', '')))).join(' ')} -x ${EXCLUDE.map(e => `"${e}"`).join(' ')}`;

  execSync(zipCmd, { cwd: ROOT, stdio: 'inherit' });

  console.log(`\n✅ Release created: dist/${ZIP_NAME}`);
  console.log(`   Size: ${(readFileSync(join(DIST_DIR, ZIP_NAME)).length / 1024 / 1024).toFixed(2)} MB\n`);

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Reminder about manifest URLs
if (!systemJson.manifest || !systemJson.download) {
  console.log('⚠️  Remember to update system.json with:');
  console.log('   - manifest: URL to your hosted system.json');
  console.log('   - download: URL to the release zip file\n');
}
