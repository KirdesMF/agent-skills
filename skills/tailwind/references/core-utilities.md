---
name: tailwind-utilities
description: Overview of utility classes in Tailwind CSS v4
---

# Utility Classes Overview

Tailwind provides low-level utilities for building custom designs.

## Layout

| Category | Classes |
|----------|---------|
| Display | `block`, `inline`, `flex`, `grid`, `hidden`, `inline-block`, `inline-flex`, `inline-grid` |
| Position | `static`, `relative`, `absolute`, `fixed`, `sticky` |
| Overflow | `overflow-auto`, `overflow-hidden`, `overflow-visible`, `overflow-scroll` |
| Box Model | `w-*`, `h-*`, `min-w-*`, `max-w-*`, `min-h-*`, `max-h-*` |
| Padding | `p-*`, `px-*`, `py-*`, `pt-*`, `pr-*`, `pb-*`, `pl-*` |
| Margin | `m-*`, `mx-*`, `my-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*` |
| Gap | `gap-*`, `row-gap-*`, `column-gap-*` |

## Flexbox

| Category | Classes |
|----------|---------|
| Direction | `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse` |
| Wrap | `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse` |
| Grow/Shrink | `flex-1`, `flex-auto`, `flex-none`, `grow`, `shrink`, `shrink-0` |
| Justify | `justify-start`, `justify-end`, `justify-center`, `justify-between`, `justify-around`, `justify-evenly` |
| Align Items | `items-start`, `items-end`, `items-center`, `items-stretch`, `items-baseline` |
| Align Self | `self-auto`, `self-start`, `self-end`, `self-center`, `self-stretch` |

## Grid

| Category | Classes |
|----------|---------|
| Columns | `grid-cols-1` through `grid-cols-12`, `grid-cols-[...]` |
| Rows | `grid-rows-1` through `grid-rows-12` |
| Span | `col-span-*`, `row-span-*`, `col-start-*`, `row-start-*` |
| Auto | `auto-cols-*`, `auto-rows-*` |

## Typography

| Category | Classes |
|----------|---------|
| Font Family | `font-sans`, `font-serif`, `font-mono` |
| Font Size | `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, etc. |
| Font Weight | `font-thin`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold` |
| Letter Spacing | `tracking-tighter`, `tracking-tight`, `tracking-normal`, `tracking-wide`, `tracking-wider` |
| Line Height | `leading-none`, `leading-tight`, `leading-normal`, `leading-loose` |
| Text Align | `text-left`, `text-center`, `text-right`, `text-justify` |
| Text Color | `text-*` (50-950), `text-transparent`, `text-current` |
| Text Decoration | `underline`, `overline`, `line-through`, `no-underline` |

## Colors

### Background

- `bg-*` - Background colors (50-950)
- `bg-transparent`, `bg-current`, `bg-[...]`
- Opacity: `bg-red-500/50` (alpha modifier)

### Text

- `text-*` - Text colors
- `text-transparent`, `text-current`

### Borders

- `border-*` - Border colors
- `border-x-*`, `border-y-*`
- `border-t-*`, `border-r-*`, `border-b-*`, `border-l-*`

## Borders

| Category | Classes |
|----------|---------|
| Width | `border`, `border-0`, `border-2`, `border-4`, `border-8` |
| Color | `border-*`, `border-t-*`, etc. |
| Style | `border-solid`, `border-dashed`, `border-dotted`, `border-hidden` |
| Radius | `rounded`, `rounded-*`, `rounded-t-*`, `rounded-tr-*`, etc. |

## Effects

| Category | Classes |
|----------|---------|
| Shadow | `shadow-*`, `shadow-none`, `shadow-inner` |
| Opacity | `opacity-*` (0-100) |
| Mix Blend | `mix-blend-multiply`, `mix-blend-screen`, etc. |
| Background Blend | `bg-blend-multiply`, `bg-blend-screen`, etc. |

## Transitions

| Category | Classes |
|----------|---------|
| Property | `transition-none`, `transition-all`, `transition-colors`, `transition-opacity`, `transition-transform` |
| Duration | `duration-*` (75, 100, 150, 200, 300, 500, 700, 1000ms) |
| Timing | `ease-*` (linear, in, out, in-out) |
| Delay | `delay-*` (75, 100, 150, 200, 300, 500, 700, 1000ms) |

## Animations

- `animate-none`
- `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce`
- Custom: `animate-*` (defined in @theme)

## Responsive Variants

| Breakpoint | Prefix |
|------------|--------|
| 640px+ | `sm:` |
| 768px+ | `md:` |
| 1024px+ | `lg:` |
| 1280px+ | `xl:` |
| 1536px+ | `2xl:` |

```html
<div class="flex flex-col md:flex-row">
```

## State Variants

| Variant | Syntax | Description |
|---------|--------|-------------|
| Hover | `hover:` | On hover |
| Focus | `focus:` | When focused |
| Active | `active:` | When active/clicked |
| Group Hover | `group-hover:` | Parent has `group` class |
| Peer | `peer-hover:` | Previous sibling has `peer` class |
| Disabled | `disabled:` | When disabled |
| Required | `required:` | When required |
| Read-only | `readonly:` | When readonly |

```html
<button class="bg-blue-500 hover:bg-blue-600 focus:ring-2">
```

## Dark Mode

Add to CSS:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

```html
<div class="text-gray-900 dark:text-white">
```

## Arbitrary Values

For one-off values:

```html
<div class="w-[calc(100%-2rem)] text-[#ff0000]">
```

<!--
Source references:
- https://tailwindcss.com/docs Utility Classes
-->
