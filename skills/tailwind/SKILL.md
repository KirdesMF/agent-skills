---
name: tailwind
description: Tailwind CSS v4 — @theme configuration, design tokens, components, v3→v4 migration
metadata:
  author: KirdesMF
  version: "2026.3.29"
---

## Quick Migration

```bash
npx @tailwindcss/upgrade  # Auto-migrates most changes — run in a new branch first
```

**Manual checklist:**

1. `npm install tailwindcss @tailwindcss/vite` (Vite) or `@tailwindcss/postcss`
2. Replace `tailwind.config.js` → `@theme` in CSS
3. Replace `@tailwind` directives → `@import "tailwindcss"`
4. Plugins: `require()` → `@plugin`

---

## Key Changes v3 → v4

| v3                                    | v4                                               |
| ------------------------------------- | ------------------------------------------------ |
| `tailwind.config.ts`                  | `@theme` in CSS                                  |
| `@tailwind base/components/utilities` | `@import "tailwindcss"`                          |
| `darkMode: "class"`                   | `@custom-variant dark (&:where(.dark, .dark *))` |
| `theme.extend.colors`                 | `@theme { --color-*: value }`                    |
| `require("tailwindcss-animate")`      | `@keyframes` inside `@theme` + `@starting-style` |
| `forwardRef`                          | Ref as prop (React 19)                           |
| `h-10 w-10`                           | `size-10`                                        |
| `bg-opacity-50`                       | `bg-red-500/50`                                  |

> Requires Safari 16.4+, Chrome 111+

---

## Basic Setup

```css
@import "tailwindcss";

@theme {
  --color-brand: #6366f1;
  --font-sans: Inter, sans-serif;
}

@custom-variant dark (&:where(.dark, .dark *));
```

---

## Design Tokens

### Hierarchy

```
Brand Tokens (abstract)
  └── Semantic Tokens (purpose)
      └── Component Tokens (specific)

oklch(45% 0.2 260) → --color-primary → bg-primary
```

### Full example (light + dark)

```css
@import "tailwindcss";

@theme {
  /* Semantic colors in OKLCH */
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(14.5% 0.025 264);
  --color-primary: oklch(14.5% 0.025 264);
  --color-primary-foreground: oklch(98% 0.01 264);
  --color-secondary: oklch(96% 0.01 264);
  --color-secondary-foreground: oklch(14.5% 0.025 264);
  --color-muted: oklch(96% 0.01 264);
  --color-muted-foreground: oklch(46% 0.02 264);
  --color-accent: oklch(96% 0.01 264);
  --color-accent-foreground: oklch(14.5% 0.025 264);
  --color-destructive: oklch(53% 0.22 27);
  --color-destructive-foreground: oklch(98% 0.01 264);
  --color-border: oklch(91% 0.01 264);
  --color-ring: oklch(14.5% 0.025 264);
  --color-card: oklch(100% 0 0);
  --color-card-foreground: oklch(14.5% 0.025 264);
  --color-ring-offset: oklch(100% 0 0);

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Animations */
  --animate-fade-in: fade-in 0.2s ease-out;
  --animate-fade-out: fade-out 0.2s ease-in;
  --animate-slide-in: slide-in 0.3s ease-out;
  --animate-slide-out: slide-out 0.3s ease-in;

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes slide-in {
    from {
      transform: translateY(-0.5rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-0.5rem);
      opacity: 0;
    }
  }
}

@custom-variant dark (&:where(.dark, .dark *));

.dark {
  --color-background: oklch(14.5% 0.025 264);
  --color-foreground: oklch(98% 0.01 264);
  --color-primary: oklch(98% 0.01 264);
  --color-primary-foreground: oklch(14.5% 0.025 264);
  --color-secondary: oklch(22% 0.02 264);
  --color-secondary-foreground: oklch(98% 0.01 264);
  --color-muted: oklch(22% 0.02 264);
  --color-muted-foreground: oklch(65% 0.02 264);
  --color-accent: oklch(22% 0.02 264);
  --color-accent-foreground: oklch(98% 0.01 264);
  --color-destructive: oklch(42% 0.15 27);
  --color-destructive-foreground: oklch(98% 0.01 264);
  --color-border: oklch(22% 0.02 264);
  --color-ring: oklch(83% 0.02 264);
  --color-card: oklch(14.5% 0.025 264);
  --color-card-foreground: oklch(98% 0.01 264);
  --color-ring-offset: oklch(14.5% 0.025 264);
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

---

## Component Patterns

### Utilities (lib/utils.ts)

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const focusRing = cn(
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-ring focus-visible:ring-offset-2",
);

export const disabled = "disabled:pointer-events-none disabled:opacity-50";
```

### Button — CVA (Class Variance Authority)

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
}
```

### Card — Compound Component (React 19)

```tsx
export function Card({ className, ref, ...props }) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  );
}
export function CardHeader({ className, ref, ...props }) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}
export function CardTitle({ className, ref, ...props }) {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
export function CardDescription({ className, ref, ...props }) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
export function CardContent({ className, ref, ...props }) {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
}
export function CardFooter({ className, ref, ...props }) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}
```

### Input with error handling

```tsx
export function Input({ className, type, error, ref, ...props }) {
  return (
    <div className="relative">
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${props.id}-error`}
          className="mt-1 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
```

### Responsive Grid

```tsx
const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
    gap: { none: "gap-0", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" },
  },
  defaultVariants: { cols: 3, gap: "md" },
});

export function Grid({ className, cols, gap, ...props }) {
  return (
    <div className={cn(gridVariants({ cols, gap, className }))} {...props} />
  );
}
```

---

## Native Animations (v4)

```css
/* Popover with @starting-style */
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

---

## Advanced Patterns

### Custom utilities with `@utility`

```css
@utility line-t {
  @apply relative before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 dark:before:bg-white/10;
}

@utility text-gradient {
  @apply bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent;
}
```

### Theme modifiers

```css
@theme inline {
  --font-sans: var(--font-inter), system-ui;
} /* references other CSS variables */
@theme static {
  --color-brand: oklch(65% 0.15 240);
} /* always output even if unused */
```

### Namespace reset

```css
@theme {
  --color-*: initial; /* clears all default colors */
  --color-white: #fff;
  --color-black: #000;
  --color-primary: oklch(45% 0.2 260);
}
```

### Semi-transparent variants via `color-mix()`

```css
@theme {
  --color-primary-50: color-mix(in oklab, var(--color-primary) 5%, transparent);
  --color-primary-100: color-mix(
    in oklab,
    var(--color-primary) 10%,
    transparent
  );
  --color-primary-200: color-mix(
    in oklab,
    var(--color-primary) 20%,
    transparent
  );
}
```

### Container queries

```css
@theme {
  --container-xs: 20rem;
  --container-sm: 24rem;
  --container-md: 28rem;
  --container-lg: 32rem;
}
```

---

## Logical Properties (RTL/LTR)

Prefer logical properties over physical ones for bidirectional support.

### Spacing

| Physical | Logical | Description          |
| -------- | ------- | -------------------- |
| `pt-4`   | `pbs-4` | padding block start  |
| `pb-4`   | `pbe-4` | padding block end    |
| `pl-4`   | `pis-4` | padding inline start |
| `pr-4`   | `pie-4` | padding inline end   |
| `mt-4`   | `mbs-4` | margin block start   |
| `mb-4`   | `mbe-4` | margin block end     |
| `ml-4`   | `mis-4` | margin inline start  |
| `mr-4`   | `mie-4` | margin inline end    |

### Sizing, Borders & Position

| Physical                | Logical                                            |
| ----------------------- | -------------------------------------------------- |
| `w-*` / `h-*`           | `size-*`                                           |
| `border-t/b/l/r`        | `border-bs/be/is/ie`                               |
| `rounded-tl/tr/bl/br`   | `rounded-ss/se/es/ee`                              |
| `top/bottom/left/right` | `inset-block-start/end` / `inset-inline-start/end` |
| `text-left/right`       | `text-start/end`                                   |

```html
<!-- ❌ Physical — breaks in RTL -->
<div class="pl-4 border-l-2 rounded-tl-lg text-left">
  <!-- ✅ Logical — works in both LTR and RTL -->
  <div class="pis-4 border-is-2 rounded-ss-lg text-start"></div>
</div>
```

---

## Best Practices

**Do:**

- Use `@theme` for all CSS configuration
- Use OKLCH colors for better perceptual uniformity
- Compose with CVA for type-safe variants
- Use semantic tokens: `bg-primary` not `bg-blue-500`
- Use `size-*` instead of `w-* h-*`
- Add ARIA attributes and focus states for accessibility
- Default to logical properties (except for edge cases)

**Don't:**

- Use `tailwind.config.ts`
- Use `@tailwind` directives
- Use `forwardRef` (React 19)
- Use arbitrary values — extend `@theme` instead
- Hardcode colors
- Forget to test dark mode
