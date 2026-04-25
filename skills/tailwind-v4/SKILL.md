---
name: tailwind-v4-shadcn
description: enforce tailwind css v4 styling, theming, and component conventions for shadcn/ui and react projects. use when creating, reviewing, or editing tailwind v4 @theme css, semantic design tokens, oklch color variables, dark mode, shadcn/ui component customization, cva variants, cn usage, class names, responsive layouts, native animations, logical properties, or design-system utilities.
---

# Tailwind v4 shadcn/ui styling

Apply this skill whenever the task involves Tailwind CSS v4 styling, theming, or shadcn/ui component customization. Optimize for semantic tokens, CSS-variable based design systems, accessible component states, and minimal diffs.

## Source references

This skill is based on these pinned shadcn/ui skill documents and merged with the user's existing Tailwind v4 skill notes:

- `https://github.com/shadcn-ui/ui/blob/0126502236750ce2d68b99517f14c6a307843a76/skills/shadcn/rules/styling.md`
- `https://github.com/shadcn-ui/ui/blob/0126502236750ce2d68b99517f14c6a307843a76/skills/shadcn/customization.md`
- User-provided Tailwind CSS v4 skill draft covering `@theme`, design tokens, v4 component patterns, logical properties, and advanced utilities.

For expanded examples and review checklists, read `references/tailwind-v4-shadcn-rules.md`.

## Operating model

1. Determine whether the project uses Tailwind CSS v4 and/or shadcn/ui.
   - Prefer project context from `npx shadcn@latest info --json` when available.
   - Treat `tailwindVersion: "v4"` as authoritative.
   - Use the returned `tailwindCssFile`; do not invent a new global CSS file.
2. For component styling, use this priority order:
   1. Existing shadcn/ui component composition.
   2. Built-in component variants and sizes.
   3. Semantic Tailwind utilities backed by CSS variables.
   4. Global CSS variables plus `@theme inline` mappings.
   5. Component variant extension with CVA for repeated visual patterns.
   6. Local `className` only for layout, spacing, sizing, or safe one-off structure.
4. Before adding custom markup, check whether a shadcn/ui component already exists.
5. When editing code, preserve the project import aliases, React version conventions, and icon library from project context.

## Non-negotiable styling rules

- Use semantic color tokens such as `bg-background`, `bg-primary`, `text-primary-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`, and `bg-card`.
- Do not use raw palette utilities for shadcn component meaning, such as `bg-blue-500`, `text-gray-600`, `border-zinc-200`, or `dark:bg-neutral-950`.
- Use `className` for layout and structure, not for overriding component colors, typography, or state styling.
- Prefer component variants before custom classes, for example `variant="outline"`, `variant="secondary"`, `variant="destructive"`, and `size="sm"`.
- Use `gap-*` with `flex`, `grid`, or `flex flex-col`; do not use `space-x-*` or `space-y-*` in new code.
- Use `size-*` when width and height are equal; do not write equivalent `w-* h-*` pairs.
- Use `truncate`; do not spell out `overflow-hidden text-ellipsis whitespace-nowrap`.
- Do not write manual `dark:` color overrides for shadcn semantic colors. Define light and dark CSS variables instead.
- Use the project `cn()` helper for conditional classes. Avoid template-literal class conditionals.
- Avoid arbitrary values when a token should exist. Extend `@theme` instead for recurring design values.
- Do not set manual `z-*` values on overlay components such as Dialog, Sheet, Popover, DropdownMenu, Tooltip, HoverCard, or Command-in-Dialog unless debugging a documented stacking bug.
- Preserve accessibility states: focus-visible rings, disabled styles, ARIA attributes for invalid state, and keyboard-friendly semantics.

## Tailwind v4 setup

Basic v4 entry pattern:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --font-sans: var(--font-sans);
}
```

## Design-token model

Use a three-layer token hierarchy:

1. Brand tokens: abstract brand values such as raw OKLCH hues, brand font variables, and spacing primitives.
2. Semantic tokens: purpose-based values such as `--primary`, `--background`, `--destructive`, and `--ring`.
3. Component tokens or variants: specific component-facing APIs such as `variant="destructive"` or `bg-primary`.

Do not expose raw brand color names in component code when the class is expressing UI meaning. Prefer semantic utilities.

## Tailwind v4 theming workflow

Use CSS variables as the source of truth:

1. Edit the global CSS file reported by `tailwindCssFile`.
2. Define semantic variables in `:root` for light mode.
3. Define matching variables in `.dark` for dark mode.
4. Register variables in Tailwind v4 with `@theme inline`.
5. Use the resulting utilities in components.

Default pattern:

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

Then use:

```tsx
<Badge className="bg-warning text-warning-foreground">Warning</Badge>
```

Use `@theme static` only when tokens must always be emitted even if not detected in source. Use namespace resets such as `--color-*: initial` only for intentional full palette replacement.

## Component customization rules

- For one-off layout changes, pass layout classes to `className`, for example `max-w-md`, `mx-auto`, `grid`, `gap-4`, or `size-10`.
- For repeated visual variants, update the component's variant system rather than repeating ad hoc class strings.
- For design-system colors, define CSS variables and Tailwind v4 `@theme inline` mappings instead of using raw colors in JSX.
- For component wrappers, keep the wrapper semantic and pass through the underlying shadcn component API.
- Do not fork a shadcn component only to change spacing or color when a variant, token, or wrapper is sufficient.
- In React 19 projects, accept `ref` as a prop where the project already follows that convention. In older React projects, preserve existing `forwardRef` patterns.
- For TypeScript examples, avoid `any`, avoid non-null assertions, use `import type` for type-only imports, and prefer small typed helpers.

## Logical properties and bidirectionality

Prefer logical utilities for new reusable components, especially in libraries or products with possible RTL support:

- Prefer `text-start`/`text-end` over `text-left`/`text-right` when direction should follow locale.
- Prefer logical border radius utilities such as `rounded-ss-*` over physical corner utilities when direction matters.
- Prefer logical border and spacing utilities when the project supports them.
- Continue using physical utilities only when the layout is intentionally physical, such as absolute positioning of an icon that must remain visually left.

## Review checklist

Before returning code, verify:

- Components use semantic tokens instead of raw palette classes.
- Dark mode is handled through `.dark` variables, not manual `dark:` utility overrides.
- Custom colors are registered through `@theme inline` for Tailwind v4.
- Spacing uses `gap-*`, not `space-*`.
- Equal dimensions use `size-*`.
- Conditional classes use `cn()`.
- Overlay components do not use manual z-index values.
- `className` does not override shadcn component color, typography, or state styling when a variant or token should be used.
- Component examples preserve project TypeScript strictness and React-version conventions.

## Response expectations

When reviewing or editing code:

- Name the rule being applied when rejecting or changing a class pattern.
- Prefer minimal diffs.
- Explain global CSS variable changes separately from component JSX changes.
- If the project might not be Tailwind v4, ask for or inspect project context before giving v4-specific CSS.
