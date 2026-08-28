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

## Component Reusability

Before creating custom components from scratch, check if the component is
already available to minimize the amount of new code to create.

## Component Catalog

| Available | Category     | Component         | Path                                                                           |
| --------- | ------------ | ----------------- | ------------------------------------------------------------------------------ |
|           | Display      | Accordion         | [@../src/accordion/](../src/accordion/)                                        |
|           | Feedback     | Alert             | [@../src/alert/](../src/alert/)                                                |
|           | Modals       | Alert Dialog      | [@../src/alert-dialog/](../src/alert-dialog/)                                  |
|           | Display      | Aspect Ratio      | [@../src/aspect-ratio/](../src/aspect-ratio/)                                  |
| Available | User         | Avatar            | [@../src/avatar/](../src/display/avatar)                                       |
| Available | Display      | Badge             | [@../src/badge/](../src/display/badge)                                         |
| Available | Navigation   | Breadcrumb        | [@../src/breadcrumb/](../src/breadcrumb/)                                      |
| Available | Actions      | Button            | [@../src/button/](../src/button/)                                              |
|           | Dates        | Calendar          | [@../src/calendar/](../src/calendar/)                                          |
| Available | Display      | Card              | [@../src/card/](../src/display/card)                                           |
|           | Display      | Carousel          | [@../src/carousel/](../src/carousel/)                                          |
| Available | Display      | Chart             | [@../src/chart/](../src/display/chart)                                         |
| Available | Forms        | Checkbox          | [@../src/checkbox/](../src/forms/checkbox)                                     |
| Available | Display      | Collapsible       | [@../src/collapsible/](../src/display/collapsible)                             |
|           | Forms        | Combobox          | [@../src/combobox/](../src/combobox/)                                          |
|           | Actions      | Command           | [@../src/command/](../src/command/)                                            |
| Available | Navigation   | Context Menu      | [@../src/context-menu/](../src/display/context-menu)                           |
| Available | Display      | Data Table        | [@../src/data-table/](../src/display/data-table)                               |
|           | Dates        | Date Field        | [@../src/date-field/](../src/date-field/)                                      |
|           | Dates        | Date Picker       | [@../src/date-picker/](../src/date-picker/)                                    |
|           | Dates        | Date Range Field  | [@../src/date-range-field/](../src/date-range-field/)                          |
|           | Dates        | Date Range Picker | [@../src/date-range-picker/](../src/date-range-picker/)                        |
| Available | Modals       | Dialog            | [@../src/dialog/](../src/dialog/)                                              |
| Available | Modals       | Drawer            | [@../src/drawer/](../src/display/drawer)                                       |
| Available | Navigation   | Dropdown Menu     | [@../src/dropdown-menu/](../src/display/dropdown-menu)                         |
| Available | Forms        | Editable Input    | [@../src/editable-input/](../src/forms/editable-input)                         |
| Available | Display      | Empty State       | [@../src/empty-state/](../src/display/empty-state)                             |
|           | Display      | Hover Card        | [@../src/hover-card/](../src/hover-card/)                                      |
| Available | Forms        | Input             | [@../src/input/](../src/forms/input)                                           |
|           | Forms        | Input OTP         | [@../src/input-otp/](../src/input-otp/)                                        |
| Available | Forms        | Label             | [@../src/label/](../src/display/label)                                         |
|           | Display      | Link Preview      | [@../src/link-preview/](../src/link-preview/)                                  |
| Available | Navigation   | Menubar           | [@../src/menubar/](../src/navigation/menubar)                                  |
|           | Display      | Meter             | [@../src/meter/](../src/meter/)                                                |
|           | Navigation   | Navigation Menu   | [@../src/navigation-menu/](../src/navigation-menu/)                            |
|           | Navigation   | Pagination        | [@../src/pagination/](../src/pagination/)                                      |
|           | Forms        | PIN Input         | [@../src/pin-input/](../src/pin-input/)                                        |
|           | Modals       | Popover           | [@../src/popover/](../src/popover/)                                            |
|           | Display      | Progress          | [@../src/progress/](../src/progress/)                                          |
|           | Forms        | Radio Group       | [@../src/radio-group/](../src/radio-group/)                                    |
|           | Dates        | Range Calendar    | [@../src/range-calendar/](../src/range-calendar/)                              |
|           | Forms        | Rating Group      | [@../src/rating-group/](../src/rating-group/)                                  |
|           | Display      | Resizable         | [@../src/resizable/](../src/resizable/)                                        |
|           | Display      | Scroll Area       | [@../src/scroll-area/](../src/scroll-area/)                                    |
|           | Forms        | Select            | [@../src/select/](../src/forms/select)                                         |
| Available | Organization | Separator         | [@../src/separator/](../src/display/separator)                                 |
| Available | Modals       | Sheet             | [@../src/sheet/](../src/display/sheet)                                         |
| Available | Navigation   | Sidebar           | [@../src/sidebar/](../src/layout/sidebar)                                      |
| Available | Display      | Skeleton          | [@../src/skeleton/](../src/display/skeleton)                                   |
|           | Forms        | Slider            | [@../src/slider/](../src/slider/)                                              |
|           | Feedback     | Sonner            | [@../src/sonner/](../src/sonner/)                                              |
| Available | Actions      | Stepper           | [@../src/stepper/](../src/stepper/)                                            |
|           | Forms        | Switch            | [@../src/switch/](../src/switch/)                                              |
| Available | Display      | Table             | [@../src/table/](../src/display/table)                                         |
| Available | Display      | Tabs              | [@../src/tabs/](../src/display/tabs)                                           |
|           | Forms        | Textarea          | [@../src/textarea/](../src/textarea/)                                          |
|           | Dates        | Time Field        | [@../src/time-field/](../src/time-field/)                                      |
|           | Dates        | Time Range Field  | [@../src/time-range-field/](../src/time-range-field/)                          |
|           | Forms        | Toggle            | [@../src/toggle/](../src/forms/toggle)                                         |
|           | Forms        | Toggle Group      | [@../src/toggle-group/](../src/toggle-group/)                                  |
|           | Navigation   | Toolbar           | [@../src/toolbar/](../src/toolbar/)                                            |
| Available | Display      | Tooltip           | [@../src/tooltip/](../src/display/tooltip)                                     |
|           | Typography   | Typography        | [@../demo/src/routes/typography.svelte](../demo/prev-routes/typography.svelte) |

### Accordion

| Component                       | Category | Status    | Demo                            |
| ------------------------------- | -------- | --------- | ------------------------------- |
| [@../src/accordion/](accordion) | Display  | Available | http://localhost:5173/accordion |

A vertically stacked set of interactive headings that each reveal a section of
content, organizing content into collapsible sections and allowing users to
focus on one or more sections at a time.

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
