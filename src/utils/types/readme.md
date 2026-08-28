# Improved and safer TypeScript Schema typing utilities

- Depth-limited recursion to protect TS compiler.
- Explicit enum representation (no string-encoded CSV).
- Explicit node types for array / optional / nullable semantics.
- Replaced broad `Function` / `any` with `unknown`-based signatures.
- Explicit default presence detection via `Defaults` generic key check.

- Support recursive schemas with full inference (e.g. for deeply nested forms),
  you can also use branded types or tagged discriminators to help TypeScript
  narrow types safely.

## Examples

Example schema and resolved output types:

```ts
export const exampleSchema = {
  id: "number",
  name: "string",
  color: { enum: ["red", "blue"] as const },
  tags: { array: "string" },
  owner: { optional: { name: "string", registeredAt: "date" } },
  maybeNote: { nullable: "string" }
} as const;

export type ExampleOutput = SchemaOutput<typeof exampleSchema>;
```
