---
name: tailwind-configuration
description: Setting up Tailwind CSS v4 with PostCSS, Vite, or CLI
---

# Configuration

Tailwind v4 uses CSS-based configuration with `@theme` and `@import`.

## Installation

### With Vite (Recommended)

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

```css
/* main.css */
@import "tailwindcss";
```

### With PostCSS

```bash
npm install tailwindcss @tailwindcss/postcss
```

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### With CLI

```bash
npm install @tailwindcss/cli
```

```bash
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css
```

### With Webpack

```bash
npm install tailwindcss @tailwindcss/webpack
```

```js
// webpack.config.js
module.exports = {
  plugins: {
    require("@tailwindcss/webpack"),
  },
};
```

## Theme Configuration

All config lives in CSS:

```css
@import "tailwindcss";

@theme {
  --color-brand: #6366f1;
  --font-sans: Inter, sans-serif;
  --spacing-container: 1200px;
}
```

## Adding Plugins

```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";
```

## Using with TypeScript

Add to your CSS file:

```css
@import "tailwindcss";
```

Create a declaration file:

```ts
// tailwindcss.css.d.ts
@theme {
  --color-brand: string;
}
```

## CSS Layers

Tailwind uses CSS layers automatically:

```css
/* layer(theme) - @theme */
@theme { --color-red-500: red; }

/* layer(base) - Preflight */
*, ::before, ::after { box-sizing: border-box; }

/* layer(utilities) - All utilities */
.flex { display: flex; }
```

## Detecting Unused CSS

During development, unused CSS shows in console:

```css
@import "tailwindcss" --debug;
```

## Source Files

Configure which files to scan:

```css
@import "tailwindcss" source("./src/**/*.{html,js,ts,jsx,tsx}");
```

Default: `source("./**/*.{html,js,ts,jsx,tsx,vue,svelte}")`

## Preflight

Disable for specific elements:

```css
@theme {
  --preflight-: initial;
}
```

<!--
Source references:
- https://tailwindcss.com/docs/installation
-->
