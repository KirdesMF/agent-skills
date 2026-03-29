---
name: tailwind-upgrade-v3-v4
description: Migrating from Tailwind CSS v3 to v4 - breaking changes and upgrade path
---

# Upgrade Guide: v3 to v4

Tailwind CSS v4 requires some changes from v3. Most can be automated with the upgrade tool.

## Browser Requirements

v4 targets **Safari 16.4+, Chrome 111+, Firefox 128+**. Uses `@property` and `color-mix()`.

Stick with v3.4 for older browser support.

## Using the Upgrade Tool

```bash
npx @tailwindcss/upgrade
```

Requires Node.js 20+. Run in a new branch first.

The tool handles:
- Dependency updates
- Config file migration to CSS
- Template file changes

## Manual Migration

### PostCSS

```js
// postcss.config.mjs
export default {
  plugins: {
    // v3
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
    // v4
    "@tailwindcss/postcss": {},
  },
};
```

### Vite

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### CLI

```bash
# v3
npx tailwindcss -i input.css -o output.css
# v4
npx @tailwindcss/cli -i input.css -o output.css
```

## Breaking Changes

### @import Instead of @tailwind

```css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 */
@import "tailwindcss";
```

### Removed Deprecated Utilities

| Removed | Use Instead |
|---------|-------------|
| `bg-opacity-*` | `bg-black/50` (opacity modifiers) |
| `text-opacity-*` | `text-black/50` |
| `border-opacity-*` | `border-black/50` |
| `divide-opacity-*` | `divide-black/50` |
| `ring-opacity-*` | `ring-black/50` |
| `placeholder-opacity-*` | `placeholder-black/50` |
| `flex-shrink-*` | `shrink-*` |
| `flex-grow-*` | `grow-*` |
| `overflow-ellipsis` | `text-ellipsis` |
| `decoration-slice` | `box-decoration-slice` |
| `decoration-clone` | `box-decoration-clone` |
| `outline-2` | Use `outline` with arbitrary values |
| `outline-dashed` | Use `outline` with arbitrary values |

### Config File Changes

No more `tailwind.config.js`. Use `@theme` in CSS:

```css
/* v3 - tailwind.config.js */
module.exports = {
  theme: {
    extend: { colors: { brand: '#6366f1' } }
  }
}

/* v4 - app.css */
@theme {
  --color-brand: #6366f1;
}
```

### Prefix Changes

`dark:` variant changes based on `darkMode` selector:

```css
/* v4 - class-based dark mode */
.dark { color-scheme: dark; }
@custom-variant dark (&:where(.dark, .dark *));
```

### Import Path Changes

```css
/* v3 */
@tailwindcss/components;
@tailwindcss/utilities;

/* v4 */
@plugin "@tailwindcss/components";
@plugin "@tailwindcss/utilities";
```

### Plugin Changes

```js
// v3
plugins: [require('@tailwindcss/forms')];

// v4
@import "@tailwindcss/forms";
```

<!--
Source references:
- https://tailwindcss.com/docs/upgrade-guide
-->
