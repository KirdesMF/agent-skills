---
name: kirdes
description: KirdesMF opinionated tooling and conventions for JavaScript/TypeScript projects. Use when setting up new projects, monorepos, library publishing.
metadata:
  author: Cédric gourville
---

## Coding Practices

### Code style

- use function declaration over const
- if a function has more than 3 params, use a single object param.

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
