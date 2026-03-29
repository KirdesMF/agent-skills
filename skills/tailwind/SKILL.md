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

| v3 | v4 |
|----|----|
| `tailwind.config.js/ts` | `@theme` in CSS |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| `darkMode: 'class'` | `@custom-variant dark (&:where(.dark, .dark *))` |
| `theme.extend.colors` | `@theme { --color-*: value }` |
| Requires plugins for animations | Native `@keyframes` in `@theme` |

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
theme: { extend: { colors: { brand: '#6366f1' } } }

/* v4 */
@import "tailwindcss";
@theme { --color-brand: #6366f1; }
```

```html
<!-- v3 -->
<div class="bg-opacity-50">

<!-- v4 -->
<div class="bg-red-500/50">
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

Use OKLCH for better color perception, or arbitrary `bg-[#hex]`.

## Animations

```css
@theme {
  --animate-fade-in: fade-in 0.3s ease-out;
  
  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
}
```

```html
<div class="animate-fade-in">
```

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
