/**
 * The Weight of Ruin - UI Settings
 * Handles user interface customization settings including theme selection
 */

/**
 * Register all UI-related settings
 * Called during the 'init' hook
 */
export function registerUISettings() {
  // Theme setting - dark is default for grimdark aesthetic
  game.settings.register('weight-of-ruin', 'uiTheme', {
    name: 'WOR.Settings.UITheme.Name',
    hint: 'WOR.Settings.UITheme.Hint',
    scope: 'client',
    config: true,
    type: String,
    choices: {
      'dark': 'WOR.Settings.UITheme.Dark',
      'light': 'WOR.Settings.UITheme.Light'
    },
    default: 'dark',
    onChange: applyTheme
  });
}

/**
 * Apply the selected theme to the document
 * Sets the data-wor-theme attribute on the body element
 * @param {string} [theme] - The theme to apply. If not provided, reads from settings.
 */
export function applyTheme(theme) {
  // Get theme from parameter or settings
  const selectedTheme = theme ?? game.settings.get('weight-of-ruin', 'uiTheme');

  // Apply theme attribute to body
  document.body.dataset.worTheme = selectedTheme;

  console.log(`The Weight of Ruin | Theme applied: ${selectedTheme}`);
}
