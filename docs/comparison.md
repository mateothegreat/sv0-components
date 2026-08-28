# Instructions

Apply these rules if you are working on shadcn in any of the following file
extensions:

- `.svelte`
- `.svelte.ts`
- `.ts`

## Project Description

This project is an opinionated svelte component library that provides a set of
reusable components for building web applications.

It is built similar to shadcn-svelte and bits-ui in style, structure, and
functionality.

## Pre-requisites

Ingest and synthesize the documentation at the following links:

| Library       | Human Readable                  | LLM                                                               |
| ------------- | ------------------------------- | ----------------------------------------------------------------- |
| shadcn-svelte | @https://shadcn-svelte.com/docs | [llms.txt](https://context7.com/huntabyte/shadcn-svelte/llms.txt) |
| bits-ui       | @https://bitsui.com/docs        | [llms.txt](https://context7.com/huntabyte/bits-ui/llms.txt)       |

## Component Creation

When creating new components, abide by the following rules:

Before creating custom components, check if the component is already available
in the following libraries.

If it is available then use the component from the library and place the source
code and dependencies under @src/ so that it can be distributed from this
library.

### Component Availability Matrix

| Category     | Component         | My Library | bits-ui | shadcn-svelte |
| ------------ | ----------------- | ---------- | ------- | ------------- |
| Display      | Accordion         | ❌         | ✅      | ✅            |
| Feedback     | Alert             | ❌         | ❌      | ❌            |
| Modals       | Alert Dialog      | ❌         | ✅      | ✅            |
| Display      | Aspect Ratio      | ❌         | ✅      | ✅            |
| User         | Avatar            | ✅         | ✅      | ✅            |
| Display      | Badge             | ✅         | ❌      | ✅            |
| Navigation   | Breadcrumb        | ✅         | ❌      | ✅            |
| Actions      | Button            | ✅         | ✅      | ✅            |
| Dates        | Calendar          | ❌         | ✅      | ✅            |
| Display      | Card              | ✅         | ❌      | ✅            |
| Display      | Carousel          | ❌         | ❌      | ✅            |
| Display      | Chart             | ✅         | ❌      | ✅            |
| Forms        | Checkbox          | ✅         | ✅      | ✅            |
| Display      | Collapsible       | ✅         | ✅      | ✅            |
| Forms        | Combobox          | ❌         | ✅      | ✅            |
| Actions      | Command           | ❌         | ✅      | ✅            |
| Navigation   | Context Menu      | ✅         | ✅      | ✅            |
| Display      | Data Table        | ✅         | ❌      | ✅            |
| Dates        | Date Field        | ❌         | ✅      | ❌            |
| Dates        | Date Picker       | ❌         | ✅      | ✅            |
| Dates        | Date Range Field  | ❌         | ✅      | ❌            |
| Dates        | Date Range Picker | ❌         | ✅      | ❌            |
| Modals       | Dialog            | ✅         | ✅      | ✅            |
| Modals       | Drawer            | ✅         | ❌      | ✅            |
| Navigation   | Dropdown Menu     | ✅         | ✅      | ✅            |
| Forms        | Editable Input    | ✅         | ❌      | ❌            |
| Display      | Empty State       | ✅         | ❌      | ❌            |
| Display      | Hover Card        | ❌         | ❌      | ✅            |
| Forms        | Input             | ✅         | ❌      | ✅            |
| Forms        | Input OTP         | ❌         | ❌      | ✅            |
| Forms        | Label             | ✅         | ✅      | ✅            |
| Display      | Link Preview      | ❌         | ✅      | ❌            |
| Navigation   | Menubar           | ✅         | ✅      | ✅            |
| Display      | Meter             | ❌         | ✅      | ❌            |
| Navigation   | Navigation Menu   | ❌         | ✅      | ✅            |
| Navigation   | Pagination        | ❌         | ✅      | ✅            |
| Forms        | PIN Input         | ❌         | ✅      | ❌            |
| Modals       | Popover           | ❌         | ✅      | ✅            |
| Display      | Progress          | ❌         | ✅      | ✅            |
| Forms        | Radio Group       | ❌         | ✅      | ✅            |
| Dates        | Range Calendar    | ❌         | ✅      | ✅            |
| Forms        | Rating Group      | ❌         | ✅      | ❌            |
| Display      | Resizable         | ❌         | ❌      | ✅            |
| Display      | Scroll Area       | ❌         | ✅      | ✅            |
| Forms        | Select            | ❌         | ✅      | ✅            |
| Organization | Separator         | ✅         | ✅      | ✅            |
| Modals       | Sheet             | ✅         | ❌      | ✅            |
| Navigation   | Sidebar           | ✅         | ❌      | ✅            |
| Display      | Skeleton          | ✅         | ❌      | ✅            |
| Forms        | Slider            | ❌         | ✅      | ✅            |
| Feedback     | Sonner            | ❌         | ❌      | ✅            |
| Actions      | Stepper           | ✅         | ❌      | ❌            |
| Forms        | Switch            | ❌         | ✅      | ✅            |
| Display      | Table             | ✅         | ❌      | ✅            |
| Display      | Tabs              | ✅         | ✅      | ✅            |
| Forms        | Textarea          | ❌         | ❌      | ✅            |
| Dates        | Time Field        | ❌         | ✅      | ❌            |
| Dates        | Time Range Field  | ❌         | ✅      | ❌            |
| Forms        | Toggle            | ❌         | ✅      | ✅            |
| Forms        | Toggle Group      | ❌         | ✅      | ✅            |
| Navigation   | Toolbar           | ❌         | ✅      | ❌            |
| Display      | Tooltip           | ✅         | ✅      | ✅            |
| Typography   | Typography        | ❌         | ❌      | ✅            |

## Component Requirements

Create the Svelte and TypeScript code using best practices and follow idiomatic
principles.

### State Management

Follow a rune-first approach:

- Use `$state` for all component-level reactive state.
- Use `$props()` to define and access component properties.
- Use `$derived` for computed values derived from state or props.
- Use `$effect` for side effects that need to react to state changes (e.g.
  lifecycle events, data fetching).
- Apply Tailwind CSS utility classes directly in the markup at the element
  levels.
- Any non-trivial business logic should be extracted into pure TypeScript
  functions in `src/lib/utils` and tested independently.
- Declare component props using the `$props` rune and handle events as props.
  Example: `let { greeting = 'Hello!' } = $props()`. Events are now passed as
  props: `<Child doSomething={() => {}} />`.
- **Strict Mode:** The `any` type is forbidden. Assess viability for separate
  `type` or `interface` definitions. Otherwise, use `unknown` first and then the
  final type if applicable. `@ts-ignore` is strictly forbidden.

### Performance and Optimization

- Embrace SvelteKit's Server-Side Rendering (SSR) for fast initial loads.
- Use `$derived` extensively. It's memoized by default, preventing expensive
  re-computations.
- Use Svelte 5 **Snippets** (`{#snippet ...}`) for performance-critical UI that
  can be passed down as props, avoiding re-rendering of large component trees.
- Leverage SvelteKit's file-based routing and `+server.ts` files for efficient
  API endpoints.

### Component Design

- Keep components small and focused on a single responsibility.
- Do not use the now legacy API for slots. Instead use the new snippets and
  render tag feature.
- Define component props explicitly with JSDoc comments for type inference and
  editor support, even when using `$props()`.

### Prohibited Practices

- **FORBIDDEN: Direct DOM Manipulation.** Never use `document.getElementById` or
  similar APIs to interact with the DOM. Use Svelte's `bind:this` as a last
  resort and with clear documentation.
- **FORBIDDEN: Legacy usage below Svelte 5.** Do not use `let` for reactive
  assignments or `export` in components. All reactivity must flow through runes.
- **FORBIDDEN: Prop Drilling.** For state needed across many nested components,
  use a shared store or context API instead of passing props through every
  layer.
- **FORBIDDEN: Ignoring Linting/Formatting.** All code must adhere to the
  configured ESLint and Prettier rules.

## Tasks

- Sythesize the users request and notify the user of your plan to implement.
- To install shadcn-svelte components, use the following command:
  `npx shadcn-svelte@latest add --yes <component-name>`
- Create the required components and functionality.
- Add the component to the component availability matrix in this document
  (@CLAUDE.md).
- Add the component to the @src/index.ts file.
- Add the component to the @package.json file.
