---
name: tailwind
description: Tailwind CSS v4 - key changes from v3, @theme configuration, migration
metadata:
  author: KirdesMF
  version: "2026.3.29"
  source: Generated from tailwindlabs/tailwindcss.com
---

> The skill is based on Tailwind CSS v4.

## When to Use This Skill

- Migrating from Tailwind v3 to v4
- Setting up new Tailwind v4 projects
- Understanding v4 configuration changes

## Quick Reference

| v3                                    | v4                                               |
| ------------------------------------- | ------------------------------------------------ |
| `tailwind.config.js/ts`               | `@theme` in CSS                                  |
| `@tailwind base/components/utilities` | `@import "tailwindcss"`                          |
| `darkMode: 'class'`                   | `@custom-variant dark (&:where(.dark, .dark *))` |
| `theme.extend.colors`                 | `@theme { --color-*: value }`                    |
| Requires plugins for animations       | Native `@keyframes` in `@theme`                  |

## Setup

```css
/* v4 CSS-first config */
@import "tailwindcss";

@theme {
  --color-brand: #6366f1;
  --font-sans: Inter, sans-serif;
}

@custom-variant dark (&:where(.dark, .dark *));
```

## Migration Checklist

1. **Install**: `npm install tailwindcss @tailwindcss/vite` (Vite) or `@tailwindcss/postcss`
2. **Config**: Replace `tailwind.config.js` with `@theme` in CSS
3. **Import**: Change `@tailwind` directives to `@import "tailwindcss"`
4. **Colors**: Use OKLCH or arbitrary values `bg-[#hex]`
5. **Dark mode**: Add `@custom-variant dark` and `dark:` class
6. **Plugins**: Change `require()` to `@plugin`

## Common Changes

```css
/* v3 */
@tailwind base;
theme: {
  extend: {
    colors: {
      brand: "#6366f1";
    }
  }
}

/* v4 */
@import "tailwindcss";

@theme {
  --color-brand: #6366f1;
}
```

```html
<!-- v3 -->
<div class="bg-opacity-50"></div>

<!-- v4 -->
<div class="bg-red-500/50"></div>
```

## Key v4 Features

- **CSS-first**: All config in CSS via `@theme`
- **Theme variables**: `--color-*`, `--font-*`, `--spacing-*` generate utilities
- **Arbitrary values**: `w-[calc(100%-2rem)]`
- **Custom utilities**: `@utility pattern-* { ... }`
- **Modern browsers**: Requires Safari 16.4+, Chrome 111+

## Colors in v4

```css
@theme {
  --color-mint-500: oklch(0.72 0.11 178);
}
```

## Animations

```css
@theme {
  --animate-fade-in: fade-in 0.3s ease-out;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
```

```html
<div class="animate-fade-in"></div>
```

## Logical Properties (v4)

Préférer les logical properties aux physical properties pour le support RTL/LTR.

### Spacing

| Physical | Logical | Description                        |
| -------- | ------- | ---------------------------------- |
| `pt-4`   | `pbs-4` | padding block start (top en LTR)   |
| `pb-4`   | `pbe-4` | padding block end (bottom en LTR)  |
| `pl-4`   | `pis-4` | padding inline start (left en LTR) |
| `pr-4`   | `pie-4` | padding inline end (right en LTR)  |
| `mt-4`   | `mbs-4` | margin block start                 |
| `mb-4`   | `mbe-4` | margin block end                   |
| `ml-4`   | `mis-4` | margin inline start                |
| `mr-4`   | `mie-4` | margin inline end                  |

### Sizing

| Physical  | Logical                  |
| --------- | ------------------------ |
| `w-*`     | `size-*` (shorthand w+h) |
| `min-w-*` | `min-size-*`             |
| `max-w-*` | `max-size-*`             |

### Borders

| Physical       | Logical        |
| -------------- | -------------- |
| `border-t`     | `border-bs`    |
| `border-b`     | `border-be`    |
| `border-l`     | `border-is`    |
| `border-r`     | `border-ie`    |
| `rounded-tl-*` | `rounded-ss-*` |
| `rounded-tr-*` | `rounded-se-*` |
| `rounded-bl-*` | `rounded-es-*` |
| `rounded-br-*` | `rounded-ee-*` |

### Positioning

| Physical    | Logical                |
| ----------- | ---------------------- |
| `top-*`     | `inset-block-start-*`  |
| `bottom-*`  | `inset-block-end-*`    |
| `left-*`    | `inset-inline-start-*` |
| `right-*`   | `inset-inline-end-*`   |
| `inset-x-*` | `inset-inline-*`       |
| `inset-y-*` | `inset-block-*`        |

### Text Alignment

| Physical     | Logical      |
| ------------ | ------------ |
| `text-left`  | `text-start` |
| `text-right` | `text-end`   |

### Exemple concret

❌ Physical — casse en RTL

<div class="pl-4 border-l-2 rounded-tl-lg text-left">

✅ Logical — fonctionne en LTR et RTL

<div class="pis-4 border-is-2 rounded-ss-lg text-start">

## Best Practices

### Do's

- Use @theme blocks - CSS-first configuration is v4's core pattern
- Use OKLCH colors - Better perceptual uniformity than HSL
- Compose with CVA - Type-safe variants
- Use semantic tokens - bg-primary not bg-blue-500
- Use size-_ - New shorthand for w-_ h-\*
- Add accessibility - ARIA attributes, focus states
- Always use logical properties. only use top left right bottom for exception

### Don'ts

- Don't use tailwind.config.ts - Use CSS @theme instead
- Don't use @tailwind directives - Use @import "tailwindcss"
- Don't use forwardRef - React 19 passes ref as prop
- Don't use arbitrary values - Extend @theme instead
- Don't hardcode colors - Use semantic tokens
- Don't forget dark mode - Test both themes

## Upgrade Tool

```bash
npx @tailwindcss/upgrade
```

Auto-migrates most changes. Run in a new branch first.

<!--
Source references:
- https://tailwindcss.com/docs/upgrade-guide
- https://tailwindcss.com/docs/theme
-->
