---
name: core-design-tokens
description: Tailwind CSS v4 setup with shared semantic tokens, @theme inline mappings, and dark mode variables.
---

# Core Design Tokens

Use CSS variables as source of truth. Keep token names portable across projects, including projects without shadcn/ui.

## Token Hierarchy

```text
brand value -> semantic token -> Tailwind utility/component variant
oklch(0.45 0.2 260) -> --primary -> bg-primary
```

- Brand tokens: raw brand colors, fonts, spacing primitives.
- Semantic tokens: `--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--ring`.
- Component API: `bg-primary`, `text-primary-foreground`, `variant="destructive"`.

## Global CSS Pattern

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0.025 264);
  --primary: oklch(0.145 0.025 264);
  --primary-foreground: oklch(0.98 0.01 264);
  --secondary: oklch(0.96 0.01 264);
  --secondary-foreground: oklch(0.145 0.025 264);
  --muted: oklch(0.96 0.01 264);
  --muted-foreground: oklch(0.46 0.02 264);
  --accent: oklch(0.96 0.01 264);
  --accent-foreground: oklch(0.145 0.025 264);
  --destructive: oklch(0.53 0.22 27);
  --destructive-foreground: oklch(0.98 0.01 264);
  --border: oklch(0.91 0.01 264);
  --input: oklch(0.91 0.01 264);
  --ring: oklch(0.145 0.025 264);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0.025 264);
  --radius: 0.5rem;
}

.dark {
  --background: oklch(0.145 0.025 264);
  --foreground: oklch(0.98 0.01 264);
  --primary: oklch(0.98 0.01 264);
  --primary-foreground: oklch(0.145 0.025 264);
  --secondary: oklch(0.22 0.02 264);
  --secondary-foreground: oklch(0.98 0.01 264);
  --muted: oklch(0.22 0.02 264);
  --muted-foreground: oklch(0.65 0.02 264);
  --accent: oklch(0.22 0.02 264);
  --accent-foreground: oklch(0.98 0.01 264);
  --destructive: oklch(0.42 0.15 27);
  --destructive-foreground: oklch(0.98 0.01 264);
  --border: oklch(0.22 0.02 264);
  --input: oklch(0.22 0.02 264);
  --ring: oklch(0.83 0.02 264);
  --card: oklch(0.145 0.025 264);
  --card-foreground: oklch(0.98 0.01 264);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --radius-sm: calc(var(--radius) - 0.25rem);
  --radius-md: calc(var(--radius) - 0.125rem);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 0.25rem);
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground antialiased; }
}
```

## Non-shadcn Projects

Use same token names even without shadcn/ui. Build custom components with `bg-primary`, `text-primary-foreground`, `border-border`, `ring-ring`. This keeps design portable between projects.

## Key Points

- Use OKLCH for perceptual color consistency.
- Dark mode changes variables, not component class names.
- `@theme inline` maps CSS variables to Tailwind utilities.
- Add new tokens only when repeated or meaningful.

<!--
Source references:
- https://tailwindcss.com/docs/theme
- https://tailwindcss.com/docs/dark-mode
- https://ui.shadcn.com/docs/theming
-->
