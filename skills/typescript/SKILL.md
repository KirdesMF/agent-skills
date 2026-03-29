---
name: typescript-best-practices
description: Use when reading or writing TypeScript or JavaScript files (.ts, .tsx, .js, tsconfig.json).
---

# TypeScript Best Practices

Follows type-first, functional, and error handling patterns from CLAUDE.md. This skill covers language-specific idioms only.

## Pair with React Best Practices

When working with React components (`.tsx`, `.jsx` files or `@react` imports), always load `react-best-practices` alongside this skill. This skill covers TypeScript fundamentals; React-specific patterns (effects, hooks, refs, component design) are in the dedicated React skill.

## Make Illegal States Unrepresentable

Use the type system to prevent invalid states at compile time.

**Discriminated unions for mutually exclusive states:**

```ts
// Good: only valid combinations possible
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

// Bad: allows invalid combinations like { loading: true, error: Error }
type RequestState<T> = {
  loading: boolean;
  data?: T;
  error?: Error;
};
```

**Branded types for domain primitives:**

```ts
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };

// Compiler prevents passing OrderId where UserId expected
function getUser(id: UserId): Promise<User> {
  /* ... */
}
```

**Const assertions for literal unions:**

```ts
const ROLES = ["admin", "user", "guest"] as const;
type Role = (typeof ROLES)[number]; // 'admin' | 'user' | 'guest'

// Array and type stay in sync automatically
function isValidRole(role: string): role is Role {
  return ROLES.includes(role as Role);
}
```

**Exhaustive switch with never check:**

```ts
type Status = "active" | "inactive";

function processStatus(status: Status): string {
  switch (status) {
    case "active":
      return "processing";
    case "inactive":
      return "skipped";
    default: {
      const _exhaustive: never = status;
      throw new Error(`unhandled status: ${_exhaustive}`);
    }
  }
}
```

## Module Structure

Prefer smaller, focused files: one component, hook, or utility per file. Split when a file handles multiple concerns or exceeds ~200 lines. Colocate tests with implementation (foo.test.ts alongside foo.ts). Group related files by feature rather than by type.

## Functional Patterns

- Prefer const over let; use readonly and Readonly<T> for immutable data.
- Use array.map/filter/reduce over for loops; chain transformations in pipelines. Only use for loops if performance is a concern.
- Write pure functions for business logic; isolate side effects in dedicated modules.
- Avoid mutating function parameters; return new objects/arrays instead.

## Instructions

- Enable strict mode; model data with interfaces and types. Strong typing catches bugs at compile time.
- Every code path returns a value or throws; use exhaustive switch with never checks in default. Unhandled cases become compile errors.
- Propagate errors with context; catching requires re-throwing or returning a meaningful result. Hidden failures delay debugging.
- Handle edge cases explicitly: empty arrays, null/undefined inputs, boundary values. Defensive checks prevent runtime surprises.
- Use await for async calls; wrap external calls with contextual error messages. Unhandled rejections crash Node processes.
- Add or update focused tests when changing logic; test behavior, not implementation details.

## Runtime Validation with Zod

- Define schemas as single source of truth; infer TypeScript types with `z.infer<>`. Avoid duplicating types and schemas.
- Use `safeParse` for user input where failure is expected; use `parse` at trust boundaries where invalid data is a bug.
- Compose schemas with `.extend()`, `.pick()`, `.omit()`, `.merge()` for DRY definitions.
- Add `.transform()` for data normalization at parse time (trim strings, parse dates).

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.string().transform((s) => new Date(s)),
});

type User = z.infer<typeof UserSchema>;

// Strict parsing at trust boundaries — throws if API contract violated
export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`fetch user ${id} failed: ${response.status}`);
  }
  return UserSchema.parse(await response.json());
}

// Caller handles both success and error from user input
const result = UserSchema.safeParse(formData);
if (!result.success) {
  setErrors(result.error.flatten().fieldErrors);
  return;
}
```
