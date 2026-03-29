---
name: tailwind
description: Tailwind CSS v4 - CSS-first, @theme, breaking changes v3→v4
metadata:
  author: KirdesMF
  version: "2026.3.29"
  source: Generated from tailwindlabs/tailwindcss.com
---

> The skill is based on Tailwind CSS v4, generated at 2026-03-29.

Tailwind CSS v4 is a utility-first CSS framework with a CSS-first configuration approach using the `@theme` directive.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Theme Variables | @theme directive, extending/overriding defaults | [core-theme](references/core-theme.md) |
| Upgrade from v3 | Breaking changes, upgrade tool, manual migration | [core-upgrade-v3-v4](references/core-upgrade-v3-v4.md) |
| Configuration | CSS-based config, PostCSS, Vite, CLI setup | [core-configuration](references/core-configuration.md) |
| Custom Styles | Adding custom utilities, arbitrary values | [core-custom-styles](references/core-custom-styles.md) |
| Utility Classes | Layout, spacing, typography, colors overview | [core-utilities](references/core-utilities.md) |

## Key Changes in v4

- **CSS-first config**: No more `tailwind.config.js` - use `@theme` in CSS
- **@import "tailwindcss"**: Replaces `@tailwind base/components/utilities`
- **Modern browsers only**: Safari 16.4+, Chrome 111+, Firefox 128+
- **Theme variables**: Define colors, fonts, spacing via CSS variables
- **Performance**: Faster builds, better tree-shaking
