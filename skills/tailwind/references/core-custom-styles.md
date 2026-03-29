---
name: tailwind-custom-styles
description: Adding custom utilities, arbitrary values, and @layer in Tailwind CSS v4
---

# Custom Styles

## Arbitrary Values

Use square brackets for one-off values:

```html
<div class="w-[calc(100%-2rem)]">
<div class="bg-[#ff0000]">
<div class="text-[17px]">
<div class="grid-cols-[1fr,auto,1fr]">
```

## Arbitrary Variants

```html
<div class="[&_li]:marker:text-red-500">
<div class="[@media(screen){&:hover{opacity:0.5}}]">
```

The `&` refers to the current element.

## @apply Directive

Group utilities into reusable classes:

```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-semibold;
  }
  
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
}
```

## @layer

Organize custom CSS into Tailwind's layers:

```css
@layer base {
  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .card {
    @apply bg-white rounded-xl shadow-lg p-6;
  }
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

## Custom Utilities

```css
@utility pattern-* {
  background-image: var(--pattern);
}

@theme {
  --pattern-dots: radial-gradient(circle, currentColor 1px, transparent 1px);
}
```

Now use `pattern-dots` with arbitrary values:

```html
<div class="pattern-[--pattern-dots]">
```

## @variant

Create custom variants:

```css
@variant dark (&:where(.dark, .dark *));

@theme {
  --color-brand: #6366f1;
}

@layer base {
  body {
    background-color: var(--color-gray-100);
  }
  
  @variant dark {
    body {
      background-color: var(--color-gray-900);
    }
  }
}
```

## Important Modifier

```html
<div class="!absolute">
```

Forces the value, regardless of source order.

## Data Attributes

```html
<div data-active class="data-[active]:bg-blue-500">
<div data-state="open" class="data-[state=open]:rotate-90">
```

## CSS Variables in Arbitrary Values

```html
<div class="bg-[var(--my-color)]">
<div class="w-[var(--container-width,100%)]">
```

## Print Styles

```css
@layer base {
  @media print {
    .no-print {
      display: none;
    }
  }
}
```

## Custom Selectors

```css
@layer components {
  .card {
    /* Direct child only */
    & > * + * {
      margin-top: 1rem;
    }
  }
}
```

<!--
Source references:
- https://tailwindcss.com/docs/adding-custom-styles
- https://tailwindcss.com/docs/hover-focus-and-other-states
-->
