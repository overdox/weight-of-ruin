# The Weight of Ruin Style Guide

This document provides reference for styling patterns used throughout the The Weight of Ruin Foundry VTT system.

---

## Table of Contents

1. [Global Dark Theme (Default)](#global-dark-theme-default)
2. [Dialog Styles](#dialog-styles)
3. [Color Palette](#color-palette)
4. [Component Patterns](#component-patterns)
5. [CSS Variables](#css-variables)
6. [Typography](#typography)
7. [Spacing](#spacing)

---

## Global Dark Theme (Default)

**IMPORTANT:** All WoR windows automatically inherit the grimdark dark theme from `_dark-theme-defaults.scss`. You do NOT need to specify dark gradient backgrounds, button styles, or section headers - these are provided automatically.

### What's Provided Automatically

All `.wor` and `.weight-of-ruin` windows get these defaults:

- **Dark gradient background** (burgundy-brown gradient)
- **Headerless window style** with floating close/minimize buttons
- **White text** on dark backgrounds
- **Section headers** with burgundy-copper gradient
- **Section bodies** with semi-transparent dark backgrounds
- **Form inputs** styled for dark theme (dark background, copper border)
- **Buttons** styled for dark theme (secondary and primary copper variants)
- **Dialog footers** with dark background
- **Cards/boxes** with dark semi-transparent backgrounds
- **Alert/warning boxes** for danger, warning, success states

### Creating a New Dialog

For new dialogs, you typically only need:

1. Add the `wor` class to the dialog
2. Use standard HTML structure with `.dialog-header`, `.section-header`, `.section-body`
3. Only add component-specific SCSS for unique styling needs

**JavaScript:**
```javascript
classes: ['wor', 'your-dialog-class'],
```

**HTML Template:**
```html
<div class="your-dialog-wrapper">
  <!-- Header with portrait (optional) -->
  <header class="dialog-header">
    <div class="header-content">
      <img class="actor-portrait" src="..." />
      <div class="header-info">
        <h1 class="dialog-title">Dialog Title</h1>
        <span class="actor-name">Actor Name</span>
      </div>
    </div>
  </header>

  <div class="your-dialog-content">
    <!-- Section with header bar -->
    <div class="dialog-section">
      <div class="section-header">
        <i class="fas fa-icon"></i>
        <h2>Section Title</h2>
      </div>
      <div class="section-body">
        <!-- Content automatically gets dark styling -->
      </div>
    </div>

    <!-- Summary box (automatically styled) -->
    <div class="effective-pool-summary">
      <span class="pool-label">Label:</span>
      <span class="pool-value">Value</span>
    </div>
  </div>
</div>
```

**Component SCSS (only for overrides):**
```scss
// In _your-dialog.scss - only add what's SPECIFIC to this dialog
.your-dialog-content {
  padding: $spacing-xl;
  max-height: 500px;
  overflow-y: auto;

  // Only add custom elements not covered by defaults
  .your-unique-element {
    // styles
  }
}
```

---

## Dialog Styles

### Dark Gradient Style (DEFAULT - All Dialogs)

Used for editors and wizards with a dark, immersive background.

**Characteristics:**
- Dark burgundy-brown gradient background
- Centered title header (no portrait)
- Section header bars with burgundy-copper gradient
- Card-based layouts with semi-transparent backgrounds
- Light text on dark backgrounds

**CSS Pattern:**
```scss
// Add explicit class to dialog for reliable targeting
.wor.your-dialog-class,
.dialog-v2:has(.your-wrapper-class) {
  width: 700px !important;
  max-width: 90vw !important;
  border: none !important;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6) !important;
  border-radius: $border-radius-lg !important;

  // Transparent window header with floating close button
  &:not(.minimized) > .window-header {
    --color-header-background: transparent;
    background: transparent !important;
    border: none !important;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    // ... close button styling
  }

  // Dark gradient background
  &:not(.minimized) > .window-content {
    background: linear-gradient(180deg,
      rgba(60, 30, 30, 0.98) 0%,
      rgba(40, 25, 25, 0.98) 50%,
      rgba(30, 20, 20, 0.98) 100%
    ) !important;
    padding: 0 !important;
    border-radius: $border-radius-lg;
  }
}
```

**JavaScript - Adding Dialog Class:**
```javascript
const result = await foundry.applications.api.DialogV2.wait({
  window: {
    title: game.i18n.localize('AOA.Your.Title'),
    icon: 'fas fa-icon'
  },
  classes: ['wor', 'your-dialog-class'],  // Add custom classes here
  content,
  buttons: [...]
});
```

**HTML Structure:**
```html
<div class="your-wrapper-class">
  <div class="editor-header">
    <h2 class="editor-title">Title</h2>
    <p class="editor-subtitle">Subtitle</p>
  </div>
  <form class="your-form-class">
    <div class="section-header">
      <i class="fas fa-icon"></i>
      <span>Section Name</span>
    </div>
    <div class="your-grid-class">
      <!-- Cards here -->
    </div>
  </form>
</div>
```

---

## Color Palette

### Primary Colors (SCSS Variables)

| Variable | Description | Usage |
|----------|-------------|-------|
| `$c-burgundy` | Deep red-brown | Headers, accents |
| `$c-copper` | Warm copper | Primary accent, buttons |
| `$c-copper-dark` | Darker copper | Button gradients, borders |
| `$c-copper-light` | Lighter copper | Hover states |
| `$c-gold` | Gold accent | Icons, highlights, abbreviations |
| `$c-gold-muted` | Muted gold | Borders, subtle accents |
| `$c-parchment` | Warm beige | Light backgrounds, text on dark |
| `$c-magic` | Purple | Magic/Witchsight elements |
| `$c-magic-light` | Light purple | Magic text, highlights |

### Text Colors

| Variable | Description | Usage |
|----------|-------------|-------|
| `$c-text-dark` | Dark text | Primary text on light backgrounds |
| `$c-text-medium` | Medium text | Secondary text, labels |
| `#fff` / `rgba(255,255,255,0.x)` | White text | Text on dark backgrounds |

### CSS Custom Properties (Theme-Aware)

Use these for theme-aware styling (light/dark mode):

```scss
// Alpha variants for overlays
var(--wor-dark-alpha-05)   // 5% dark overlay
var(--wor-dark-alpha-08)   // 8% dark overlay
var(--wor-dark-alpha-10)   // 10% dark overlay
var(--wor-dark-alpha-15)   // 15% dark overlay

var(--wor-copper-alpha-10) // 10% copper
var(--wor-copper-alpha-15) // 15% copper
var(--wor-copper-alpha-30) // 30% copper
var(--wor-copper-alpha-40) // 40% copper

var(--wor-magic-alpha-10)  // 10% magic purple
var(--wor-magic-alpha-15)  // 15% magic purple
```

---

## Component Patterns

### Dark Dialog Header (Editor Style)

Used for centered title headers in dark gradient dialogs (no portrait).

**SCSS:**
```scss
.editor-header {
  padding: $spacing-xl $spacing-xl $spacing-lg;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .editor-title {
    margin: 0 0 $spacing-xs 0;
    font-family: $font-primary;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: #fff !important;  // White for visibility
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }

  .editor-subtitle {
    margin: 0;
    font-size: $font-size-base;
    color: rgba(255, 255, 255, 0.7);
  }
}
```

**HTML:**
```html
<div class="editor-header">
  <h2 class="editor-title">Edit Attribute Modifiers</h2>
  <p class="editor-subtitle">Character Name</p>
</div>
```

---

### Section Header Bar

Used to divide content sections with a styled header.

**SCSS:**
```scss
.section-header {
  display: flex !important;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-lg;  // Extra left padding for text
  background: linear-gradient(135deg, $c-burgundy 0%, $c-copper 100%) !important;
  border-radius: $border-radius-sm;
  margin-bottom: $spacing-md;

  i {
    color: $c-gold !important;
    font-size: $font-size-sm;
  }

  span {
    font-family: $font-primary;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    color: #fff !important;
    text-transform: uppercase;
    letter-spacing: $letter-spacing-wide;
  }

  // Magic/Witchsight variant
  &.witchsight {
    background: linear-gradient(135deg, rgba($c-magic, 0.6) 0%, rgba($c-magic, 0.4) 100%) !important;
  }
}
```

**HTML:**
```html
<div class="section-header">
  <i class="fas fa-chart-bar"></i>
  <span>Section Title</span>
</div>
```

---

### Card Grid Layout

Used for displaying items in a grid (attributes, skills, etc.).

**SCSS:**
```scss
// Grid container - adjust columns as needed
.your-grid {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;  // 4 columns
  gap: $spacing-md !important;
  margin-bottom: $spacing-md;
}

// Card styling
.your-card {
  display: flex !important;
  flex-direction: column !important;
  padding: $spacing-md !important;
  background: rgba(0, 0, 0, 0.3) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: $border-radius-sm !important;
  transition: all $transition-fast;

  &:hover {
    border-color: rgba($c-copper, 0.4) !important;
    background: rgba(0, 0, 0, 0.4) !important;
  }
}
```

---

### Attribute Card (Dark Theme)

**SCSS:**
```scss
.attribute-card {
  .card-header {
    display: flex !important;
    align-items: baseline;
    gap: $spacing-sm;
    margin-bottom: $spacing-xs;

    .attribute-abbr {
      font-family: $font-primary;
      font-size: $font-size-xl !important;
      font-weight: $font-weight-bold;
      color: $c-gold !important;
    }

    .attribute-name {
      font-size: $font-size-sm;
      color: rgba(255, 255, 255, 0.7) !important;
    }
  }

  .card-value {
    font-family: $font-primary;
    font-size: $font-size-2xl !important;
    font-weight: $font-weight-bold;
    color: #fff !important;  // White for visibility on dark background
    margin-bottom: $spacing-xs;
  }

  .card-breakdown {
    display: flex !important;
    gap: $spacing-md;
    margin-bottom: $spacing-sm;

    .breakdown-item {
      font-size: $font-size-xs;
      color: rgba(255, 255, 255, 0.5) !important;
    }
  }

  .card-modifier {
    display: flex !important;
    align-items: center;
    gap: $spacing-sm;
    padding-top: $spacing-sm;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    label {
      font-size: $font-size-xs;
      color: rgba(255, 255, 255, 0.6) !important;
      text-transform: uppercase;
    }

    input[type="number"] {
      width: 60px;
      padding: $spacing-xs $spacing-sm;
      text-align: center;
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      background: rgba(0, 0, 0, 0.4) !important;
      border: 1px solid rgba($c-copper, 0.4) !important;
      border-radius: $border-radius-sm;
      color: #fff !important;  // White for visibility

      &:focus {
        outline: none;
        border-color: $c-copper !important;
        box-shadow: 0 0 6px rgba($c-copper, 0.4);
      }
    }
  }
}
```

**HTML:**
```html
<div class="attribute-card">
  <div class="card-header">
    <span class="attribute-abbr">STR</span>
    <span class="attribute-name">Strength</span>
  </div>
  <div class="card-value">5</div>
  <div class="card-breakdown">
    <span class="breakdown-item">Base: +3</span>
    <span class="breakdown-item">Adv: +2</span>
  </div>
  <div class="card-modifier">
    <label>Modifier</label>
    <input type="number" name="strength.modifier" value="0" />
  </div>
</div>
```

---

### Dialog Footer Buttons (Dark Theme)

**SCSS:**
```scss
.your-dialog-class {
  footer,
  .dialog-buttons {
    display: flex;
    gap: $spacing-md;
    padding: $spacing-lg $spacing-xl;
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    justify-content: flex-end;

    button {
      font-family: $font-primary;
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      padding: $spacing-sm $spacing-xl;
      border-radius: $border-radius-sm;
      cursor: pointer;
      transition: all $transition-fast;
      min-width: 100px;

      // Cancel button
      &[data-action="cancel"] {
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.8);

        &:hover {
          background: rgba(0, 0, 0, 0.5);
          border-color: rgba(255, 255, 255, 0.3);
        }
      }

      // Save/Primary button
      &.default,
      &[data-action="save"] {
        background: linear-gradient(135deg, $c-copper 0%, $c-copper-dark 100%);
        border: 1px solid $c-copper-dark;
        color: #fff;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);

        &:hover {
          background: linear-gradient(135deg, $c-copper-light 0%, $c-copper 100%);
          box-shadow: 0 2px 8px rgba($c-copper, 0.4);
        }
      }

      i {
        margin-right: $spacing-xs;
      }
    }
  }
}
```

---

### Portrait Frame (Parchment Style Headers)

**SCSS:**
```scss
.actor-portrait {
  width: 56px;
  height: 56px;
  border-radius: $border-radius-md;
  border: 3px solid $c-gold;
  outline: 2px solid rgba(0, 0, 0, 0.4);
  object-fit: cover;
  box-shadow: $shadow-lg, 0 0 0 1px rgba(255, 255, 255, 0.2);
}
```

---

## CSS Variables

### Defined in `_colors.scss`

```scss
// Theme-aware background texture
var(--wor-bg-parchment-texture)  // Switches between parchment.webp and parchment-dark.webp

// Core colors as CSS variables
var(--wor-copper)
var(--wor-copper-dark)
var(--wor-copper-light)
var(--wor-gold)
var(--wor-burgundy)
var(--wor-magic)

// Background colors
var(--wor-bg-primary)
var(--wor-bg-elevated)
var(--wor-bg-tertiary)
```

---

## Typography

### Font Families

| Variable | Font Stack | Usage |
|----------|------------|-------|
| `$font-primary` | "IM Fell English", "Palatino Linotype", "Book Antiqua", Georgia, serif | Headers, titles, important text |
| `$font-body` | System font stack | Body text, labels |

### Font Sizes

| Variable | Size | Usage |
|----------|------|-------|
| `$font-size-xs` | 0.65rem | Small labels, hints |
| `$font-size-sm` | 0.75rem | Secondary text, breakdowns |
| `$font-size-base` | 0.875rem | Body text |
| `$font-size-lg` | 1rem | Emphasized text |
| `$font-size-xl` | 1.25rem | Card headers, abbreviations |
| `$font-size-2xl` | 1.5rem | Large values, titles |

---

## Spacing

| Variable | Size | Usage |
|----------|------|-------|
| `$spacing-xs` | 2px | Tight spacing |
| `$spacing-sm` | 4px | Small gaps |
| `$spacing-md` | 8px | Default spacing |
| `$spacing-lg` | 12px | Section spacing |
| `$spacing-xl` | 16px | Large sections |

---

## Best Practices

### 1. Use Direct Selectors with `!important`

When styling DialogV2 content, use direct class selectors with `!important` to override Foundry's default styles:

```scss
// Good - direct selector
.your-class {
  display: grid !important;
  background: rgba(0, 0, 0, 0.3) !important;
}

// Avoid - deeply nested selectors that may not match
.wrapper .form .container .your-class {
  display: grid;
}
```

### 2. Add Explicit Classes to DialogV2

Always add custom classes to dialogs for reliable CSS targeting:

```javascript
classes: ['wor', 'your-dialog-class'],
```

### 3. Use Both `:has()` and Explicit Class Selectors

For browser compatibility, use both:

```scss
.wor.your-dialog-class,
.dialog-v2:has(.your-wrapper-class) {
  // styles
}
```

### 4. Theme-Aware Colors

Use CSS custom properties for colors that should adapt to light/dark themes:

```scss
// Good - theme aware
background: var(--wor-dark-alpha-08);

// Avoid - hardcoded colors that won't adapt
background: rgba(0, 0, 0, 0.08);
```

### 5. Localization Keys

Always use localization for user-facing text:

```javascript
game.i18n.localize('AOA.Section.Attributes')
```

Common key patterns:
- `AOA.Section.X` - Section headers
- `AOA.Attribute.X.long` / `.abbr` - Attribute names
- `AOA.Common.Save` / `.Cancel` - Common buttons

---

## File Locations

| File | Purpose |
|------|---------|
| `src/scss/global/_dark-theme-defaults.scss` | **GLOBAL DEFAULTS** - Base grimdark styling for ALL WoR windows |
| `src/scss/global/_window.scss` | Window-specific overrides and special cases |
| `src/scss/components/_attack-dialog.scss` | Attack dialog specific overrides |
| `src/scss/components/_defense-dialog.scss` | Defense dialog specific overrides |
| `src/scss/utils/_colors.scss` | Color variables and CSS custom properties |
| `src/scss/utils/_variables.scss` | Spacing, typography, other variables |
| `src/scss/utils/_mixins.scss` | Reusable mixins including `parchment-bg` |

---

*Last Updated: January 2026*
