# Contributor Style Guide

This document provides a comprehensive guide for contributing to this project.
Adhering to these standards ensures code quality, consistency, and
maintainability.

## 1. Guiding Philosophy

We strive for clean, efficient, and well-documented code. Our goal is to create
a component library that is not only powerful and easy to use but also a
pleasure to contribute to. We follow a mentorship-driven approach where
documentation is a first-class citizen, enabling developers to understand not
just the "how" but the "why" behind our code.

## 2. General Principles

### Tone and Voice

All contributions, including code, documentation, and discussions, should adopt
the following tone:

- **Confident and Technical:** Be precise and knowledgeable.
- **Mentorship-driven:** Be welcoming, inviting, and aim to educate the reader.
- **Active Voice, Present Tense:** Use an active voice and present tense (e.g.,
  "This function returns..." instead of "This function will return...").
- **First Person, Imperative Mood:** Address the reader directly using "you" and
  use the imperative mood for instructions.

### Adult Learning Principles

Our documentation follows adult learning principles to maximize comprehension:

1.  **Build Context First:** Explain why a concept exists before diving into
    details.
2.  **Progressive Disclosure:** Introduce concepts in a logical, ordered
    sequence.
3.  **Concrete Examples:** Use real-world examples with actual values and
    scenarios.
4.  **Practical Guidance:** Offer tips on typical usage patterns and best
    practices.
5.  **Highlight Pitfalls:** Always indicate edge cases and potential pitfalls.

## 3. File Naming and Project Structure

- **File Naming:** All filenames should be in `kebab-case` (e.g.,
  `my-component.svelte`, `utility-functions.ts`).
- **Component Structure:** Components should be self-contained within their own
  directory, including the Svelte component, an `index.ts` for exports, and any
  related types or styles.

## 4. TypeScript Style Guide

This guide outlines our standards for writing clean, consistent, and
maintainable TypeScript code. By adhering to these practices, you contribute to
the overall quality and readability of the codebase.

### Formatting

- **Indentation:** Use 2 spaces for indentation.
- **Line Length:** Maximum line length is 100 characters.
- **Casing:**
  - `camelCase` for variables, functions, and properties.
  - `PascalCase` for types, interfaces, classes, and enums.

### Type Safety

- **No `any`:** The `any` type is strictly forbidden. Use `unknown` for values
  whose type is not known at compile time and perform necessary type checks.
- **No `@ts-ignore`:** Do not use `// @ts-ignore` or `// @ts-expect-error`.
  Address the underlying type issue.
- **Optional Properties:** Avoid optional properties (`?`) unless absolutely
  necessary. Prefer explicit `null` or `undefined` in type unions.

### Modules

- **ESM Syntax:** Use ES modules (`import`/`export`) syntax.
- **Import Paths:** Do not include file extensions in import paths.

## 5. Svelte Style Guide (Svelte 5+)

This project uses Svelte 5 and its rune-based reactivity model.

### Reactivity and State Management

- **Runes First:** All reactivity must be managed through runes.
  - `$state`: Use for all component-level reactive state.
  - `$props`: Use to define and access component properties.
  - `$derived`: Use for computed values derived from state or props. It's
    memoized by default.
  - `$effect`: Use for side effects that need to react to state changes.
- **No Legacy Reactivity:** Do not use `let` for reactive assignments (`$:`) or
  `export let` for props.

### Component Design

- **Small and Focused:** Keep components small and focused on a single
  responsibility.
- **Snippets for Slots:** Use Svelte 5 snippets (`{#snippet ...}`) for slotting
  content. Do not use the legacy `<slot>` element.
- **Styling:** Use Tailwind CSS utility classes directly in the markup.
- **Logic Extraction:** Extract any non-trivial business logic into pure
  TypeScript functions in `src/utils`.

### Performance

- **SSR:** Embrace SvelteKit's Server-Side Rendering (SSR).
- **Snippets:** Use snippets to pass complex UI as props, avoiding re-rendering
  of large component trees.

## 6. Documentation Standards

Comprehensive documentation is mandatory for all code. We use TSDoc, a
standardized documentation comment format for TypeScript, which is then
processed by TypeDoc to generate our project's documentation website. Adhering
to these standards is critical for maintaining high-quality, browsable
documentation.

### File Header Documentation

Every `.ts` file must begin with a file header comment that explains its purpose
and context.

```typescript
/**
 * @file
 *
 *   This module provides utilities for [purpose of the file].
 *
 *   A more detailed explanation of what the module does, its core concepts, and why it's
 *   important for the project.
 *
 *   ## Core Concepts
 *
 *   1. **Concept One:** Description of the first core concept.
 *   2. **Concept Two:** Description of the second core concept.
 */
```

### Function and Method Documentation

All exported functions and methods must have a TSDoc block that clearly explains
their purpose, parameters, and return values.

````typescript
/**
 * A detailed description of the function, explaining its purpose, why it's needed, and
 * how it works. This section should provide enough context for another developer to
 * understand the function's role without reading the implementation.
 *
 * @param {string} paramName A detailed description of the parameter, including its
 *   expected format, constraints, and how it's used within the function.
 *
 * @returns {string} A detailed description of the return value, what it represents, and
 *   any important characteristics of the returned data.
 *
 * @example
 *
 * ```ts
 * // A clear and practical usage example that demonstrates a common use case.
 * const result = myFunction('foo');
 * console.log(result); // bar
 * ```
 *
 * @category A category for grouping in documentation (e.g., Utilities, Components).
 *
 * @see {@link anotherFunction} for related functionality or alternative approaches.
 */
const myFunction = (paramName: string): string => {
  // ... implementation
};
````

### Class, Interface, and Type Documentation

All exported classes, interfaces, and type aliases must be documented.

```typescript
/**
 * Describes the structure of a User object. This interface is used throughout the
 * application to represent user data.
 *
 * @property {string} id The unique identifier for the user.
 * @property {string} email The user's email address.
 */
export interface User {
  id: string;
  email: string;
}
```

### Variable and Constant Documentation

All exported variables and constants must be documented.

```typescript
/**
 * The default configuration for the component.
 *
 * @category Configuration
 */
export const DEFAULT_CONFIG = {
  // ...
};
```

### Inline Documentation

Significant or complex blocks of code inside functions or methods must have
explanatory comments using `//` for single-line or `/* ... */` for multi-line
comments. These comments should clarify the "why" behind a specific
implementation choice, not just restate what the code does. This practice is
crucial for maintainability and for helping other developers understand complex
logic.

```typescript
const processData = (data: string[]) => {
  // This transformation is necessary to align with the legacy API's data format.
  // Without it, the downstream service would reject the payload.
  const transformedData = data.map((item) => {
    /*
     * Complex logic explanation here.
     * More details about the multi-step process.
     */
    return item.toUpperCase();
  });

  return transformedData;
};
```

### Recommended TSDoc Tags

To ensure our documentation is rich, consistent, and easily parsed by TypeDoc,
it is essential to use a standardized set of TSDoc tags. The following table
organizes the most critical tags by the type of code they document, providing
guidance on their proper application.

Using these tags correctly will significantly improve the quality and usability
of our generated documentation.

### TSDoc Tag Reference

To ensure consistency, please use the following TSDoc tags according to the
level of the code you are documenting.

| Level                   | Required Tags                     | Optional Tags                                                                                   | Best Practices                                                                                                   |
| :---------------------- | :-------------------------------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **File / Module**       | File-level comment block          | `@module`, `@see`                                                                               | The first comment in a file is the module documentation. The `@file` tag is from JSDoc but is widely understood. |
| **Class**               | Description                       | `@see`, `@template`, `@category`, `@deprecated`, `@internal`, `@remarks`                        | Use `@remarks` for extended explanations. Use `@virtual` for base classes designed for extension.                |
| **Interface / Type**    | Description                       | `@see`, `@template`, `@category`, `@deprecated`, `@internal`, `@property`                       | Use `@property` for properties of complex type aliases. `@remarks` can provide deeper context.                   |
| **Function / Method**   | Description, `@param`, `@returns` | `@example`, `@see`, `@template`, `@category`, `@throws`, `@deprecated`, `@internal`, `@remarks` | `@returns` is not needed for `void` functions. Use `@remarks` for implementation details or rationale.           |
| **Property / Variable** | Description                       | `@see`, `@category`, `@deprecated`, `@internal`, `@defaultValue`                                | Include `@defaultValue` when a variable has a default value that isn't obvious from its declaration.             |

### Complete TypeDoc Tag Reference

The following table provides a comprehensive list of all tags supported by
TypeDoc. While you may not use all of these regularly, it is a useful reference
for advanced documentation scenarios.

| Tag                     | Description                                               |
| :---------------------- | :-------------------------------------------------------- |
| `@abstract`             | Indicates that a class or method is abstract.             |
| `@alpha`                | Marks an API as being in the alpha stage.                 |
| `@author`               | Specifies the author of the code.                         |
| `@beta`                 | Marks an API as being in the beta stage.                  |
| `@category`             | Groups elements in the documentation.                     |
| `@class`                | Documents a class.                                        |
| `@defaultValue`         | Specifies the default value of a property.                |
| `@deprecated`           | Marks an API as deprecated.                               |
| `@document`             | Includes an external markdown file.                       |
| `@enum`                 | Documents an enumeration.                                 |
| `@event`                | Documents an event.                                       |
| `@eventProperty`        | Documents a property of an event.                         |
| `@example`              | Provides an example of how to use the code.               |
| `@expand`               | Expands a type alias in the documentation.                |
| `@experimental`         | Marks an API as experimental.                             |
| `@function`             | Documents a function.                                     |
| `@group`                | Assigns an element to a custom group.                     |
| `@hidden`               | Hides an element from the documentation.                  |
| `@hideconstructor`      | Hides the constructor of a class.                         |
| `@ignore`               | Excludes an element from the documentation.               |
| `@import`               | Documents an import declaration.                          |
| `{@include}`            | Includes a file content inline.                           |
| `{@inheritDoc}`         | Inherits documentation from a base class or interface.    |
| `@inline`               | Inlines the documentation of a referenced symbol.         |
| `@interface`            | Documents an interface.                                   |
| `@internal`             | Marks an API as internal.                                 |
| `{@label}`              | Provides a custom label for a link.                       |
| `@license`              | Specifies the license of the code.                        |
| `{@link}`               | Creates a link to another symbol.                         |
| `@mergeModuleWith`      | Merges the current module with another one.               |
| `@module`               | Documents a module.                                       |
| `@namespace`            | Documents a namespace.                                    |
| `@overload`             | Documents a function overload.                            |
| `@override`             | Indicates that a method overrides a base method.          |
| `@packageDocumentation` | Provides documentation for the entire package.            |
| `@param`                | Documents a function parameter.                           |
| `@primaryExport`        | Marks the primary export of a module.                     |
| `@private`              | Marks a member as private.                                |
| `@privateRemarks`       | Provides remarks that are only visible internally.        |
| `@property`             | Documents a property of an object.                        |
| `@protected`            | Marks a member as protected.                              |
| `@public`               | Marks a member as public.                                 |
| `@readonly`             | Marks a property as read-only.                            |
| `@remarks`              | Provides additional remarks about the code.               |
| `@returns`              | Documents the return value of a function.                 |
| `@sealed`               | Prevents a class from being extended.                     |
| `@see`                  | Provides a "see also" reference.                          |
| `@since`                | Specifies the version when an API was introduced.         |
| `@sortStrategy`         | Defines a custom sorting strategy for members.            |
| `@summary`              | Provides a summary of the documentation.                  |
| `@template`             | Documents a generic type parameter.                       |
| `@throws`               | Documents an error that a function may throw.             |
| `@typeParam`            | Documents a generic type parameter (alias for @template). |
| `@useDeclaredType`      | Forces TypeDoc to use the declared type.                  |
| `@virtual`              | Indicates that a method is intended to be overridden.     |
| `@augments`             | Indicates that a class extends another class.             |
| `@callback`             | Documents a callback function.                            |
| `@extends`              | Indicates that a class or interface extends another.      |
| `@jsx`                  | Specifies the JSX factory.                                |
| `@type`                 | Specifies the type of a variable.                         |
| `@typedef`              | Documents a custom type definition.                       |
| `@yields`               | Documents the value yielded by a generator function.      |
| `@satisfies`            | Asserts that a value satisfies a type.                    |

## 7. Testing

- **100% Coverage:** All new code (components, utilities, stores, etc.) must
  have 100% test coverage as reported by Vitest.
- **No Skipped Tests:** Do not use `test.skip` or `describe.skip`. All tests
  must pass.
- **No Mocks:** Write tests without using mocks. Use the underlying
  implementations instead.

## 8. Prohibited Practices

- **Direct DOM Manipulation:** Do not use `document.getElementById` or similar
  APIs. Use Svelte's `bind:this` only as a last resort.
- **Prop Drilling:** For state needed across many nested components, use a
  shared store or Svelte's context API.
- **Ignoring Linting/Formatting:** All code must adhere to the configured ESLint
  and Prettier rules.
- **Legacy Svelte APIs:** Do not use pre-rune reactivity (`$:`, `export let`) or
  legacy slots.
