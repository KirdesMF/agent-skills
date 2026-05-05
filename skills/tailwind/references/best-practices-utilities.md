---
name: best-practices-utilities
description: Tailwind v4 utility class rules for semantic colors, spacing, sizing, truncation, dark mode, and RTL-aware layout.
---

# Utility Best Practices

## Semantic Colors

Avoid raw palette classes for UI meaning:

```tsx
// Avoid
<div className="bg-blue-500 text-white">
  <p className="text-gray-600">Secondary text</p>
</div>

// Prefer
<div className="bg-primary text-primary-foreground">
  <p className="text-muted-foreground">Secondary text</p>
</div>
```

Use raw palette utilities only for decorative one-offs where no semantic meaning/reuse exists.

## Dark Mode

```tsx
// Avoid
<div className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50" />

// Prefer
<div className="bg-background text-foreground" />
```

Theme differences belong in `:root` and `.dark` variables.

## Spacing

Use `gap-*` with flex/grid:

```tsx
// Avoid
<div className="space-y-4"><Card /><Card /></div>

// Prefer
<div className="flex flex-col gap-4"><Card /><Card /></div>
```

## Equal Dimensions

```tsx
// Avoid
<div className="h-10 w-10" />

// Prefer
<div className="size-10" />
```

## Truncation

```tsx
// Avoid
<p className="overflow-hidden text-ellipsis whitespace-nowrap" />

// Prefer
<p className="truncate" />
```

## Conditional Classes

```tsx
// Avoid
<Button className={`w-full ${isActive ? "bg-primary" : "bg-muted"}`}>Save</Button>

// Prefer
<Button className={cn("w-full", isActive ? "bg-primary" : "bg-muted")}>Save</Button>
```

## Logical Properties

Prefer logical utilities for reusable or RTL-capable UI:

| Physical | Logical |
| --- | --- |
| `pl-*` | `pis-*` |
| `pr-*` | `pie-*` |
| `ml-*` | `mis-*` |
| `mr-*` | `mie-*` |
| `text-left` | `text-start` |
| `text-right` | `text-end` |
| `rounded-tl-*` | `rounded-ss-*` |
| `rounded-tr-*` | `rounded-se-*` |

Use physical utilities when placement is intentionally physical.

## Overlay Z-index

Do not add manual `z-*` values to overlay components by default. Change z-index only when debugging documented stacking issue.

## Review Checklist

- Semantic tokens instead of raw palette classes.
- `dark:` not used for semantic color pairs.
- `gap-*`, `size-*`, `truncate` used where better.
- `cn()` used for conditional class composition.
- `className` not overriding component variant/style repeatedly.

<!--
Source references:
- https://tailwindcss.com/docs/utility-first
- https://tailwindcss.com/docs/dark-mode
-->
