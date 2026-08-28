# <COMPONENT-NAME>

<COMPONENT-DESCRIPTION: Generate a thoughtful and thorough description of the
component and the value proposition it provides. use a mentoring tone with a
casual and friendly style combining an elenent of humor to keep the user engaged
and interested.>.

## Features

- Declarative atom-based API (easy authoring).
- Programmatic JSON API (`DataRenderer`) for dynamic rendering.
- Semantic HTML (`table` / `thead` / `tbody` / `tr` / `th` / `td`) for
  screen-readers.
- Keyboard-accessible interactive cells (links, buttons) — focus management out
  of the box.
- Sticky-first-column support (optional).

## Installation

Using npm:

```sh
npm add sv0 display/comparator
```

or pnpm:

```sh
pnpm add sv0 display/comparator
```

# Getting started

To jumpstart your project, you can use the following examples:

### Template (Declarative, Markup-Driven)

```html
<script lang="ts">
  import { Comparator } from "sv0/display/comparator";
</script>

<Comparator.Root>
  <Comparator.Header>
    <Comparator.Cell></Comparator.Cell>
    <Comparator.Cell>Plan A</Comparator.Cell>
    <Comparator.Cell>Plan B</Comparator.Cell>
    <Comparator.Cell>Plan C</Comparator.Cell>
  </Comparator.Header>
  <Comparator.Section>
    <Comparator.Row>
      <Comparator.Cell rowHeader>Feature 1</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
    </Comparator.Row>
  </Comparator.Section>
</Comparator.Root>
```

### Programmatic (Imperative, API-Driven)

```html
<script lang="ts">
  import { Comparator } from "sv0/display/comparator";

  const model = {
    columns: [
      { id: "a", label: "Plan A" },
      { id: "b", label: "Plan B" }
    ],
    rows: [{ id: "r1", label: "Feature 1", cells: ["Yes", "✖️"] }]
  };
</script>

<DataRenderer.DataRenderer {model} />
```

## Usage

Example usage of this component:

### Template (Declarative, Markup-Driven) Example

```HTML
<script lang="ts">
  import { Comparator } from "sv0/display/comparator";
</script>

<Comparator.Root>
  <Comparator.Section>
    <Comparator.Header>
      <Comparator.Cell>Group 1</Comparator.Cell>
      <Comparator.Cell>?</Comparator.Cell>
      <Comparator.Cell>?</Comparator.Cell>
      <Comparator.Cell>?</Comparator.Cell>
    </Comparator.Header>
    <Comparator.Row>
      <Comparator.Cell>Feature 1</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
    </Comparator.Row>
    <Comparator.Row>
      <Comparator.Cell>Feature 2</Comparator.Cell>
      <Comparator.Cell>No</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
    </Comparator.Row>
  </Comparator.Section>
  <Comparator.Section>
    <Comparator.Header>
      <Comparator.Cell>Group 2</Comparator.Cell>
      <Comparator.Cell>?</Comparator.Cell>
      <Comparator.Cell>?</Comparator.Cell>
      <Comparator.Cell>?</Comparator.Cell>
    </Comparator.Header>
    <Comparator.Row>
      <Comparator.Cell>Feature 3</Comparator.Cell>
      <Comparator.Cell>No</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
    </Comparator.Row>
    <Comparator.Row>
      <Comparator.Cell>Feature 4</Comparator.Cell>
      <Comparator.Cell>No</Comparator.Cell>
      <Comparator.Cell>No</Comparator.Cell>
      <Comparator.Cell>Yes</Comparator.Cell>
    </Comparator.Row>
  </Comparator.Section>
</Comparator.Root>
```

## API reference

> [!NOTE]
>
> All components export a class prop (string | string[]) for Tailwind / CSS
> integration.

### Declarative (Markup-Driven Atom Composition) Reference

<COMPONENTS-LISTING: For each component, add it to the list of components
matching the following columns and format.>

#### `<Comparator.Root>`

<COMPONENT-DESCRIPTION: Example: Primary container and context provider that
wraps content in a scrollable container (renders semantic `<table>`) and manages
the comparator layout, state, and semantics. It serves as the mandatory parent
for all other comparator components that follow.>

<COMPONENT-PROPERTIES-TABLE: For each component property, add it to the this
table matching the following columns and format.>

| Prop     | Description                      | Type                   | Default | Required |
| -------- | -------------------------------- | ---------------------- | ------- | :------: |
| `class?` | Extra classes for wrapper div.   | `string \| string[]`   | `""`    |  ✖️ No   |
| `size`   | All padding/typography tokens.   | `"sm" \| "md" \| "lg"` | `"md"`  |  ✅ Yes  |
| `sticky` | Use sticky headers if scrolling. | `boolean`              | `true`  |  ✖️ No   |

</COMPONENT-PROPERTIES-TABLE>

</COMPONENTS-LISTING>

### API Driven (Imperative, Programmatic) Reference

This component is composed of these atoms that can be instrumented via the api.

<TABLE-OF-CONTENTS: For each component, add it to the table of contents matching
the following columns and format.>

<EXAMPLE>

| Atom                                       | Description                             | Required |
| ------------------------------------------ | --------------------------------------- | :------: |
| [`Comparator.Root`](#comparatorroot)       | Primary container to maintain children. |   Yes    |
| [`Comparator.Section`](#comparatorsection) | Grouping of rows.                       |   Yes    |
| [`Comparator.Header`](#comparatorheader)   | Header of a section.                    |          |
| [`Comparator.Row`](#comparatorrow)         | Individual row of of cells.             |   Yes    |
| [`Comparator.Cell`](#comparatorcell)       | Individual cell (column).               |   Yes    |

</EXAMPLE>

</TABLE-OF-CONTENTS>

<COMPONENT-REFERENCE: For each component, add the component reference matching
the following columns and format.>

### `<COMPONENT-NAME: Example: Comparator.Root>`

<COMPONENT-DESCRIPTION: Example: This atom is the root provider of comparator
state.>

<COMPONENT-PROPERTIES-TABLE: For each component property, add it to the this
table matching the following columns and format.>

<EXAMPLE>

| Prop    | Description             | Type                   | Default | Required |
| ------- | ----------------------- | ---------------------- | ------- | :------: |
| `class` | Additional class names. | `string \| string[]`   | `""`    |          |
| `size`  | Size of the comparator. | `"sm" \| "md" \| "lg"` | `"md"`  |          |

</EXAMPLE>

</COMPONENT-PROPERTIES-TABLE>

## Best Practices & Tips

<BEST-PRACTICES-LIST: Create at least 3 best practices items using a mentoring
tone with a casual and friendly style combining an elenent of humor to keep the
user engaged and interested.>

- <BEST-PRACTICE-ITEM: Use a mentoring tone with a casual and friendly style
  combining an elenent of humor to keep the user engaged and interested.>
