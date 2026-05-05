# Tailwind v4 reference

This reference expands the rules in `SKILL.md` with examples. Load it when auditing a component, designing a theme, or explaining why a class pattern should change.

## Source references

- Pinned styling rules: `https://github.com/shadcn-ui/ui/blob/0126502236750ce2d68b99517f14c6a307843a76/skills/shadcn/rules/styling.md`
- Pinned customization guide: `https://github.com/shadcn-ui/ui/blob/0126502236750ce2d68b99517f14c6a307843a76/skills/shadcn/customization.md`
- User-provided Tailwind CSS v4 skill draft, including `@theme`, design tokens, CVA examples, native animations, logical utilities, and advanced configuration patterns.

## Table of contents

1. Semantic colors
2. Tailwind v4 design tokens
3. Component variants and CVA
4. Utility rules
5. Dark mode
6. Forms and error states
7. Native animations
8. Advanced Tailwind v4 patterns
9. Logical properties
10. Overlay z-index
11. Audit template

## 1. Semantic colors

Incorrect:

```tsx
<div className="bg-blue-500 text-white">
  <p className="text-gray-600">Secondary text</p>
</div>
```

Correct:

```tsx
<div className="bg-primary text-primary-foreground">
  <p className="text-muted-foreground">Secondary text</p>
</div>
```

Use semantic tokens for component meaning: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, and chart/sidebar tokens when present.

## 2. Tailwind v4 design tokens

Use this hierarchy:

```text
brand token -> semantic token -> component utility or variant
oklch(0.45 0.2 260) -> --primary -> bg-primary
```

Recommended global CSS shape:

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
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

Use `@theme inline` when Tailwind tokens should reference CSS variables. Use `@theme static` only when a token must always be generated even if unused in detected source files.

## 3. Component variants and CVA

Incorrect:

```tsx
<Button className="border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground">
  Cancel
</Button>
```

Correct:

```tsx
<Button variant="outline">Cancel</Button>
```

For repeated variants, use CVA or the project variant mechanism instead of repeated class strings:

```tsx
import type { ComponentPropsWithRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

## 4. Utility rules

### className for layout only

Acceptable:

```tsx
<Card className="mx-auto max-w-md">
  <CardContent>Dashboard</CardContent>
</Card>
```

Avoid:

```tsx
<Card className="bg-blue-500 text-white shadow-xl">
  <CardContent>Dashboard</CardContent>
</Card>
```

Use this order for visual customization:

1. Built-in variants.
2. Semantic color tokens.
3. CSS variables in the global CSS file.
4. Component variant extension for repeated visual patterns.

### Spacing

Incorrect:

```tsx
<div className="space-y-4">
  <Card />
  <Card />
</div>
```

Correct:

```tsx
<div className="flex flex-col gap-4">
  <Card />
  <Card />
</div>
```

For horizontal spacing, use `flex gap-*` or `grid gap-*`.

### Equal dimensions

Incorrect:

```tsx
<Avatar className="h-10 w-10" />
```

Correct:

```tsx
<Avatar className="size-10" />
```

### Truncation

Incorrect:

```tsx
<p className="overflow-hidden text-ellipsis whitespace-nowrap">Long label</p>
```

Correct:

```tsx
<p className="truncate">Long label</p>
```

### Conditional classes

Incorrect:

```tsx
<Button className={`w-full ${isActive ? "bg-primary" : "bg-muted"}`}>Save</Button>
```

Correct:

```tsx
<Button className={cn("w-full", isActive ? "bg-primary" : "bg-muted")}>Save</Button>
```

Only use conditional color utilities when the state cannot be represented by a component variant, data attribute style, or CVA variant.

## 5. Dark mode

Incorrect:

```tsx
<div className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50" />
```

Correct:

```tsx
<div className="bg-background text-foreground" />
```

Change the `:root` and `.dark` CSS variables when the color should change between themes.

## 6. Forms and error states

Preserve typed props and accessibility attributes:

```tsx
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputProps = ComponentPropsWithRef<"input"> & {
  error?: ReactNode;
};

export function Input({ className, error, id, ...props }: InputProps) {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="relative">
      <input
        id={id}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-destructive focus-visible:ring-destructive" : undefined,
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...props}
      />
      {error && errorId ? (
        <p id={errorId} className="mt-1 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
```

## 7. Native animations

Prefer native v4-compatible CSS animations for simple enter/exit states:

```css
@theme inline {
  --animate-fade-in: fade-in 0.2s ease-out;
  --animate-fade-out: fade-out 0.2s ease-in;
  --animate-slide-in: slide-in 0.3s ease-out;
  --animate-slide-out: slide-out 0.3s ease-in;

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slide-in {
    from { transform: translateY(-0.5rem); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slide-out {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-0.5rem); opacity: 0; }
  }
}
```

Popover-style entry with `@starting-style`:

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

## 8. Advanced Tailwind v4 patterns

### Custom utilities

```css
@utility text-gradient {
  @apply bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent;
}
```

### Theme modifiers

```css
@theme inline {
  --font-sans: var(--font-inter), system-ui;
}

@theme static {
  --color-brand: oklch(0.65 0.15 240);
}
```

### Namespace reset

Use namespace resets only when replacing a namespace intentionally:

```css
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-black: #000;
  --color-primary: oklch(0.45 0.2 260);
}
```

### Derived colors with color-mix

Use `color-mix()` for generated opacity-like token ramps when slash opacity utilities are not enough:

```css
@theme {
  --color-primary-50: color-mix(in oklab, var(--color-primary) 5%, transparent);
  --color-primary-100: color-mix(in oklab, var(--color-primary) 10%, transparent);
  --color-primary-200: color-mix(in oklab, var(--color-primary) 20%, transparent);
}
```

### Container query tokens

```css
@theme {
  --container-xs: 20rem;
  --container-sm: 24rem;
  --container-md: 28rem;
  --container-lg: 32rem;
}
```

## 9. Logical properties

Prefer logical properties over physical ones for bidirectional support when the project supports the corresponding utilities.

| Physical | Logical | Description |
| --- | --- | --- |
| `pt-4` | `pbs-4` | padding block start |
| `pb-4` | `pbe-4` | padding block end |
| `pl-4` | `pis-4` | padding inline start |
| `pr-4` | `pie-4` | padding inline end |
| `mt-4` | `mbs-4` | margin block start |
| `mb-4` | `mbe-4` | margin block end |
| `ml-4` | `mis-4` | margin inline start |
| `mr-4` | `mie-4` | margin inline end |

Other useful replacements:

| Physical | Logical |
| --- | --- |
| `border-t/b/l/r` | `border-bs/be/is/ie` |
| `rounded-tl/tr/bl/br` | `rounded-ss/se/es/ee` |
| `text-left/right` | `text-start/end` |

Do not mechanically replace physical utilities when physical placement is intentional.

## 10. Overlay z-index

Do not add manual `z-*` values to overlay components by default. Dialog, Sheet, Popover, DropdownMenu, Tooltip, HoverCard, and related primitives often manage stacking. Only change z-index when investigating a specific stacking context defect.

## 11. Audit template

Use this compact structure when reviewing code:

```markdown
## Tailwind v4 audit

### Required fixes
- [rule]: [problem] -> [replacement]

### Suggested improvements
- [rule]: [reason]

### Global CSS changes
- [variable or @theme inline mapping]

```
