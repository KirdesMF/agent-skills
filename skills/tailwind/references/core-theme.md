---
name: tailwind-theme
description: Using @theme directive to customize design tokens in Tailwind CSS v4
---

# Theme Variables (@theme)

Tailwind v4 uses CSS-first configuration via the `@theme` directive. Theme variables define which utility classes exist in your project.

## Basic Usage

```css
@import "tailwindcss";

@theme {
  --color-mint-500: oklch(0.72 0.11 178);
}
```

Now you can use `bg-mint-500`, `text-mint-500`, `fill-mint-500`, etc.

## Theme Variable Namespaces

Each namespace creates corresponding utility classes:

| Namespace | Utility Classes |
|-----------|---------------|
| `--color-*` | `bg-*`, `text-*`, `fill-*`, `stroke-*` |
| `--font-*` | `font-*` (family) |
| `--text-*` | `text-*` (size) |
| `--font-weight-*` | `font-*` (weight) |
| `--tracking-*` | `tracking-*` |
| `--leading-*` | `leading-*` |
| `--spacing-*` | `p-*`, `m-*`, `gap-*`, `inset-*`, etc. |
| `--radius-*` | `rounded-*` |
| `--shadow-*` | `shadow-*` |
| `--blur-*` | `blur-*` |
| `--animate-*` | `animate-*` |
| `--breakpoint-*` | Responsive variants like `sm:*`, `md:*` |
| `--container-*` | Container query variants `@sm:*` |

## Extending the Default Theme

```css
@theme {
  --font-script: Great Vibes, cursive;
}
```

Creates `font-script` utility.

## Overriding Defaults

```css
@theme {
  --breakpoint-sm: 30rem;
}
```

Changes `sm:*` breakpoint to 30rem.

## Removing Default Utilities

```css
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-purple: #3f3cbb;
}
```

Removes all default colors except `white` and `purple`.

## Complete Theme Override

```css
@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-lagoon: oklch(0.72 0.11 221.19);
}
```

Disables all defaults, uses only custom values.

## Custom Animations

```css
@theme {
  --animate-fade-in: fade-in 0.3s ease-out;

  @keyframes fade-in {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
}
```

## Using Theme Variables in CSS

Theme variables are available as CSS variables:

```css
.card {
  background-color: var(--color-gray-100);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
}
```

## Inline Theme Variables

Use `inline` when referencing other CSS variables:

```css
@theme inline {
  --font-sans: var(--font-inter);
}
```

This outputs direct values instead of variable references.

## Static Theme Generation

Generate all CSS variables even if unused:

```css
@theme static {
  --color-primary: var(--color-red-500);
}
```

## Sharing Themes Across Projects

```css
/* brand/theme.css */
@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-brand: #6366f1;
}
```

```css
/* In other projects */
@import "tailwindcss";
@import "../brand/theme.css";
```

<!--
Source references:
- https://tailwindcss.com/docs/theme
-->
