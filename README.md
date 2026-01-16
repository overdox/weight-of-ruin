# The Weight of Ruin

![Foundry v13](https://img.shields.io/badge/foundry-v13-green)
![Version](https://img.shields.io/badge/version-alpha0.1.2-blue)

A grimdark medieval fantasy RPG system for [Foundry VTT](https://foundryvtt.com) where magic corrupts and choices have lasting consequences.

## Overview

**The Weight of Ruin** is a tabletop roleplaying game set in a dangerous, consequential world inspired by Viking, Byzantine, and Carolingian cultures. The system emphasizes lethal combat, corrupting magic, and meaningful choices where actions have lasting consequences.

## Installation

### Via Foundry VTT

1. Open Foundry VTT and navigate to the **Game Systems** tab
2. Click **Install System**
3. Paste the manifest URL below and click **Install**

```
https://raw.githubusercontent.com/overdox/weight-of-ruin/main/system.json
```

### Manual Installation

1. Download the latest release from the [releases page](https://github.com/overdox/weight-of-ruin/releases)
2. Extract to your Foundry VTT `Data/systems/` directory
3. Restart Foundry VTT
4. Create a new world using "The Weight of Ruin" system

## Development

### Requirements

- Node.js 20+
- npm

### Setup

```bash
# Install dependencies
npm install

# Compile SCSS and watch for changes
npm run build
```

### Project Structure

```
weight-of-ruin/
├── module/           # JavaScript modules
│   ├── documents/    # Actor/Item document classes
│   ├── data-models/  # DataModel schemas
│   ├── sheets/       # Application sheets
│   └── helpers/      # Utilities and config
├── templates/        # Handlebars templates
├── scss/             # SCSS source files
├── css/              # Compiled CSS
├── lang/             # Localization files
├── assets/           # Images and icons
└── packs/            # Compendium packs
```

## Compatibility
- **Foundry VTT**: v13+


## License

See [LICENSE.txt](LICENSE.txt) for details.