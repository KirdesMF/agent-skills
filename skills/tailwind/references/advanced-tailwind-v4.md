---
name: advanced-tailwind-v4
description: Advanced Tailwind CSS v4 patterns: @utility, @theme modifiers, native animations, namespace reset, color-mix, and container tokens.
---

# Advanced Tailwind v4

## Custom Utilities

Use `@utility` for reusable project utilities.

```css
@utility text-gradient {
  @apply bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent;
}
```

## Theme Modifiers

```css
@theme inline {
  --font-sans: var(--font-inter), system-ui;
}

@theme static {
  --color-brand: oklch(0.65 0.15 240);
}
```

- `@theme inline`: token references another CSS variable.
- `@theme static`: always emit token even if not detected in content.

## Namespace Reset

Use only for intentional full namespace replacement.

```css
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-black: #000;
  --color-primary: oklch(0.45 0.2 260);
}
```

## Native Animations

```css
@theme inline {
  --animate-fade-in: fade-in 0.2s ease-out;
  --animate-fade-out: fade-out 0.2s ease-in;

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }
}
```

Popover-style entry:

```css
[popover] {
  transition:
    opacity 0.2s,
    transform 0.2s,
    display 0.2s allow-discrete;
  opacity: 0;
  transform: scale(0.95);
}

[popover]:popover-open {
  opacity: 1;
  transform: scale(1);
}

@starting-style {
  [popover]:popover-open {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

## Derived Color Ramps

```css
@theme {
  --color-primary-50: color-mix(in oklab, var(--primary) 5%, transparent);
  --color-primary-100: color-mix(in oklab, var(--primary) 10%, transparent);
  --color-primary-200: color-mix(in oklab, var(--primary) 20%, transparent);
}
```

Use for reusable generated ramps. Prefer slash opacity utilities for simple opacity changes.

## Container Tokens

```css
@theme {
  --container-xs: 20rem;
  --container-sm: 24rem;
  --container-md: 28rem;
  --container-lg: 32rem;
}
```

<!--
Source references:
- https://tailwindcss.com/docs/theme
- https://tailwindcss.com/docs/functions-and-directives
- https://tailwindcss.com/docs/animation
-->
