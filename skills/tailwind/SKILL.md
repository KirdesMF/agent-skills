---
name: tailwind
description: Tailwind CSS v4 styling for any project — @theme, semantic tokens, dark mode, component variants, utilities, and optional shadcn/ui integration.
metadata:
  author: KirdesMF
  version: "2026.5.5"
  source: Hand-merged from Tailwind docs, Tailwind v4 notes, and optional shadcn/ui styling rules
---

# Tailwind CSS v4

Use for Tailwind CSS v4 styling in any project. shadcn/ui is optional. Do not install or assume shadcn/ui unless project already uses it or user asks.

Core rule: keep same semantic token names across projects (`background`, `foreground`, `primary`, `muted`, `border`, `ring`, etc.), then map values per app/theme.

## Operating Model

1. Inspect project first: global CSS path, Tailwind version, existing tokens, component patterns, `cn()` helper, shadcn presence (`components.json`).
2. Use existing global CSS file. Do not invent new CSS entry.
3. Treat CSS variables as source of truth.
4. Define light values in `:root`, dark values in `.dark`, Tailwind utilities in `@theme inline`.
5. Use semantic utilities in components: `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring`.
6. Avoid raw palette classes for UI meaning: no `bg-blue-500`, `text-gray-600`, `dark:bg-zinc-950` when token should exist.
7. If shadcn/ui exists, use existing component variants first. If no shadcn, use same tokens with project components/CVA.

## Reference Map

| Topic | Use When | Reference |
| --- | --- | --- |
| Setup + tokens | Editing global CSS, adding theme values, dark mode | [core-design-tokens](references/core-design-tokens.md) |
| Components | Creating buttons, cards, inputs, variants, `cn()` | [core-component-patterns](references/core-component-patterns.md) |
| Utility rules | Reviewing class names, layout, semantic classes | [best-practices-utilities](references/best-practices-utilities.md) |
| Advanced v4 | `@utility`, animations, `@theme static`, namespace reset | [advanced-tailwind-v4](references/advanced-tailwind-v4.md) |
| Full audit examples | Larger audits and examples, optional shadcn notes | [tailwind-v4-rules](references/tailwind-v4-rules.md) |

## Quick Rules

- Shared tokens across all projects, shadcn or not.
- Component code expresses purpose, not brand color.
- Change theme by editing variables, not JSX classes.
- `className` mostly for layout/spacing/sizing.
- Repeated visual styles become variants or tokens.
- Use `gap-*`, not new `space-*` patterns.
- Use `size-*` for equal width/height.
- Use `truncate` instead of long truncation trio.
- Use `cn()` for conditional classes.
- Preserve focus-visible, disabled, ARIA, keyboard states.
