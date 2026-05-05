---
name: core-component-patterns
description: Tailwind v4 component conventions with cn(), CVA variants, semantic tokens, and accessible states.
---

# Component Patterns

Use existing project components first. If shadcn/ui exists, prefer its variants. If not, use same semantic tokens with custom components.

## `cn()` Helper

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Use `cn()` for conditional classes. Avoid template-literal class conditionals.

## CVA Button

```tsx
import type { ComponentPropsWithRef } from "react";
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
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

## Form Error State

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

## Rules

- `className` for layout/spacing/sizing, not repeated visual variants.
- Repeated visual pattern -> CVA variant or project variant mechanism.
- Preserve focus-visible rings, disabled styles, ARIA invalid/error wiring.
- React 19 projects may use `ref` as prop if project already does. Older projects preserve `forwardRef`.

<!--
Source references:
- https://tailwindcss.com/docs/styling-with-utility-classes
- https://ui.shadcn.com/docs/components/button
-->
