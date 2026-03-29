---
name: kirdes
description: KirdesMF opinionated tooling and conventions for JavaScript/TypeScript projects. Use when setting up new projects, monorepos, library publishing.
metadata:
  author: Cédric gourville
---

## Coding Practices

# Code style

Apply these rules to all new or edited code. When in doubt, match the existing
file style first, then run the formatter.

## Function forms

- Prefer function declarations for named, reusable functions.
- Use arrow functions for callbacks and inline handlers.
- Use object method shorthand for multi-line object methods.

## Array types

- Prefer `Array<T>` and `ReadonlyArray<T>` over `T[]`.
- This avoids precedence pitfalls in union types and keeps type reads clearer.

## Exports

- Prefer named exports.
- Use default exports only when a framework contract requires them.

## Imports

- Prefer repo-root `#...` imports (configured via `package.json` `"imports"`)
  over parent-relative `../...` paths.
- Keep `./...` imports for same-folder files.
- Generated files (for example `types/worker-configuration.d.ts`) are allowed to
  be exceptions; do not edit them by hand.

## Type conventions

- Prefer `type` aliases for object shapes and unions.
- Use `interface` only when you need declaration merging or public extension
  points.
- Prefer inline type definitions in parameters over named types unless sharing
  is necessary. When a one-off named type is useful, consider `Parameters<>` (or
  similar utility types) instead.
- Use `satisfies` when exporting objects that must match framework contracts.

## Absence values

- Use `null` for explicit "no value" in local state or API responses.
- Use `undefined` for optional or omitted fields, and avoid mixing within one
  API.

## References

- https://kentcdodds.com/blog/function-forms
- https://tkdodo.eu/blog/array-types-in-type-script

### Code Organization

- **Single responsibility**: Each source file should have a clear, focused scope/purpose
- **Split large files**: Break files when they become large or handle too many concerns
- **Type separation**: Always separate types and interfaces into `types.ts` or `types/*.ts`
- **Constants extraction**: Move constants to a dedicated `constants.ts` file
-

### Runtime Environment

- **Prefer isomorphic code**: Write runtime-agnostic code that works in Node, browser, and workers whenever possible
- **Clear runtime indicators**: When code is environment-specific, add a comment at the top of the file:

```ts
// @env node
// @env browser
```

### TypeScript

- **Explicit return types**: Declare return types explicitly when possible
- **Avoid complex inline types**: Extract complex types into dedicated `type` or `interface` declarations

### Comments

- **Avoid unnecessary comments**: Code should be self-explanatory
- **Explain "why" not "how"**: Comments should describe the reasoning or intent, not what the code does

### Testing (Vitest)

- Test files: `foo.ts` → `foo.test.ts` (same directory)
- Use `describe`/`it` API (not `test`)
- Use `toMatchSnapshot` for complex outputs
- Use `toMatchFileSnapshot` with explicit path for language-specific snapshots

---

## Tooling Choices

### TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  }
}
```

---

## References

| Topic               | Description                                    | Reference                                                |
| ------------------- | ---------------------------------------------- | -------------------------------------------------------- |
| Project Setup       | .gitignore, GitHub Actions, VS Code extensions | [setting-up](references/setting-up.md)                   |
| Library Development | tsdown bundling, pure ESM publishing           | [library-development](references/library-development.md) |
| Monorepo            | pnpm workspaces, centralized alias, Turborepo  | [monorepo](references/monorepo.md)                       |
