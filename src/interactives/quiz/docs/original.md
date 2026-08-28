---
title: ""
tags: []
aliases: original
created: Thursday, September 18th 2025, 2:57:12 pm
date: 2025-09-18T09:07:36.587Z
description: A highly customizable quiz component.
draft: true
linter-yaml-title-alias: original
modified: Thursday, September 18th 2025, 6:24:25 pm
---

## Quiz

Highly customizable quiz component that lets you programatically control the

quiz lifecycle using the api.

### Demos

### Installation

```sh
npm add sv0 /components/interactives/quiz
```

### Usage

Example usage of this component:

#### Template (Declarative, Markup-Driven) Example

```html
<script lang="ts">
  import { Quiz, type Types } from "@sv0/components/interactives/quiz";
  import { QuestionType } from "@sv0/components/interactives/quiz/types";

  const config: Types.ConfigProps = {
    title: "Sample Quiz",
    description: "Test your knowledge with this sample quiz.",
    grade: {
      min: 75,
      max: 100,
      attempts: 3
    },
    timed: 60,
    questions: [
      {
        id: "q1",
        title: "What is the capital of France?",
        description: "This is a sample question",
        hint: "This is a sample hint.",
        type: QuestionType.MultipleChoice,
        explanation: "This is a sample explanation",
        options: [
          {
            value: "Paris",
            correct: true
          },
          {
            value: "London"
          },
          {
            value: "Berlin"
          },
          {
            value: "Madrid"
          }
        ]
      },
      {
        id: "q2",
        title: "Which planet is known as the Red Planet?",
        description: "This is a sample question",
        type: QuestionType.SingleChoice,
        options: [
          {
            value: "Venus",
            correct: false
          },
          {
            value: "Mars",
            correct: true
          },
          {
            value: "Jupiter",
            correct: false
          },
          {
            value: "Saturn",
            correct: false
          }
        ]
      }
    ]
  };
</script>

<Quiz.Root {config}>
  <Quiz.Header title="Quiz Demo" description="This is a demo quiz." />
  <Quiz.Question question="{0}" />
  <Quiz.Controls />
</Quiz.Root>
```

#### Programmatic (Imperative, API-Driven) Example

```HTML
<script lang="ts">
  import { Quiz } from "sv0/interactives/quiz";
  import { Button } from "sv0/display/button";

  /**
   * This allows you to programatically control the quiz lifecycle using the api.
   *
   * When you use the api, the quiz constructs the atoms internally for you and
   * you can then instrument them through snippets or component references.
   *
   * You can then use the api via the instance reference to further instrument
   * the quiz (e.g. when clicking a button to open or close it).
   */
  const open = () => {
    // Create a new quiz instance and control it via the reference next.
    const instance = createQuiz({
      class: "bg-fuschia-500 text-white text-sm"
    });

    // Close the quiz programmatically after 60 seconds no matter what.
    setTimeout(() => {
      instance.close();
    }, 60000);
  };
</script>

<!-- This is the button that will be used to programmatically open the quiz. -->
<Button onclick={open}>Open</Button>

<!-- This is the snippet that will be rendered inside the quiz. -->
{#snippet content(instance: QuizInstance)}
  <div class="rounded-xl border bg-white p-4 shadow-xl">
    <p class="text-sm text-sky-500">
      This is a snippet that will be rendered inside the quiz.
    </p>
    <p class="text-pink-500">
      I will close automatically after 60 seconds from the outside.
    </p>
    <Button onclick={instance.close}>Close from inside.</Button>
  </div>
{/snippet}
```

### Declarative (Markup-Driven Atom Composition) Reference

This component is composed of these markup-driven atoms:

| Atom                             | Description                                    |  Required  |
| -------------------------------- | ---------------------------------------------- | :--------: |
| [`Quiz.Root`](#quizroot)         | Provides context and manages open/close state. | **✅ Yes** |
| [`Quiz.Trigger`](#quiztrigger)   | Wraps an element that toggles the quiz.        |            |
| [`Quiz.Header`](#quizheader)     | The header element of the quiz.                |            |
| [`Quiz.Question`](#quizquestion) | The question element of the quiz.              | **✅ Yes** |
| [`Quiz.Controls`](#quizcontrols) | The controls element of the quiz.              |            |

#### `Quiz.Root`

This atom is the root provider of quiz state. It manages open/close state and

makes it available to other atoms via context.

| Prop       | Description                                        | Type                   | Default |  Required  |
| ---------- | -------------------------------------------------- | ---------------------- | ------- | :--------: |
| `config`   | Quiz configuration object.                         | `Config`               |         | **✅ Yes** |
| `open`     | Controlled open state.                             | `boolean`              | `true`  |            |
| `class`    | Additional class names to style the container.     | `string \| string[]`   | `""`    |            |
| `children` | Additional content to render inside the quiz root. | `Component \| Snippet` |         |            |

#### `Quiz.Trigger`

This atom defines the interactive element that toggles the quiz. A slot prop

`toggle` is provided for convenience. This is the element that will be used to

open (`mount`) and close (`unmount`) the quiz component instance.

| Prop       | Description                                    | Type                   | Default | Required |
| ---------- | ---------------------------------------------- | ---------------------- | ------- | :------: |
| `class`    | Additional class names to style the container. | `string \| string[]`   | `""`    |          |
| `children` | The trigger element(s).                        | `Component \| Snippet` |         |          |

#### `Quiz.Header`

This atom renders the quiz header that is used to display the quiz title and

description.

| Prop          | Description                                     | Type                   | Default | Required |
| ------------- | ----------------------------------------------- | ---------------------- | ------- | :------: |
| `title`       | Title to render.                                | `string`               | `""`    |          |
| `description` | Description to render.                          | `string`               | `""`    |          |
| `class`       | Additional class names to style the container.  | `string \| string[]`   | `""`    |          |
| `children`    | Additional content to render inside the header. | `Component \| Snippet` |         |          |

#### `Quiz.Question`

This atom renders the **_active_** quiz question.

| Prop       | Description                                              | Type                   | Default | Required |
| ---------- | -------------------------------------------------------- | ---------------------- | ------- | :------: |
| `question` | Index of the question to render of `config.questions[]`. | `number`               | `0`     |          |
| `class`    | Additional class names to style the container.           | `string \| string[]`   | `""`    |          |
| `children` | Additional content to render inside the question.        | `Component \| Snippet` |         |          |

#### `Quiz.Controls`

This atom renders the quiz controls that are used to navigate between questions.

| Prop       | Description                                              | Type                   | Default | Required |
| ---------- | -------------------------------------------------------- | ---------------------- | ------- | :------: |
| `question` | Index of the question to render of `config.questions[]`. | `number`               | `0`     |          |
| `class`    | Additional class names to style the container.           | `string \| string[]`   | `""`    |          |
| `children` | Additional content to render inside the question.        | `Component \| Snippet` |         |          |

### Imperative (Programmatic, API-Driven) Reference

#### `Instance`

This type is for defining the shape of the quiz instance reference. This

reference allows you to programmatically control the quiz lifecycle and other

instrumentation.

You can get a reference to the instance by using the return value from the

`createQuiz` function or by using the `Quiz.Root` component:

```HTML
<script lang="ts">
  import { Quiz, type Types } from "@sv0/components/interactives/quiz";
  import { QuestionType } from "@sv0/components/interactives/quiz/types";

  const config: Types.ConfigProps = {
    title: "Sample Quiz",
    description: "Test your knowledge with this sample quiz.",
    ...
    questions: [
      {
        id: "q1",
        title: "What is the capital of France?",
        ...
      }
    ]
  };

  // Declare your instance variable here.
  let instance: Types.Instance;
</script>

<!-- Bind your instane variable to the instance property of the Quiz.Root component like below. -->
<Quiz.Root bind:instance {config}>
  <Quiz.Header title="Quiz Demo" description="This is a demo quiz." />
  <Quiz.Question question={0} />
  <Quiz.Controls />
</Quiz.Root>
```

> [!IMPORTANT] Properties of the instance are reactive using `$state()` runes.

##### `Instance` Shape

```TypeScript
export type Instance = {
  config: Config;
  state: State;
  status: Status;
  open: () => void;
  toggle: () => void;
  close: () => void;
};
```

##### `Instance` Properties and Methods

| Name             | Description                              | Type                                  | Default              |
| ---------------- | ---------------------------------------- | ------------------------------------- | -------------------- |
| `config: Config` | The quiz configuration object.           | [`Config`](../types/config.svelte.ts) | _User Provided_      |
| `state: State`   | Current state of the quizzes visibility. | [`State`](../types/quiz.ts)           | `State.CLOSED`       |
| `status: Status` | Current status of the quizzes.           | [`Status`](../types/quiz.ts)          | `Status.INITIALIZED` |
| `open(): void`   | Opens the quiz.                          | `void`                                |                      |
| `toggle(): void` | Toggles the quizzes visibility.          | `void`                                |                      |
| `close(): void`  |
| Closes the quiz. | `void`                                   |                                       |

### Best Practices

- **Use portals** when the quiz is inside scrollable/overflow-hidden containers
  or when dealing with stacking context/z-index issues.

- **Avoid portals** when the quiz must remain constrained to its parent
  container (e.g., table cell overlays).

- **Accessibility**:
  - Use `role="dialog"` or `role="tooltip"` depending on semantics.
  - Ensure Escape key closes the popover.
  - Manage focus when necessary for interactive content.
- **Animations**: Prefer `usal`'s `fade` + `scale` combination for performant
  open/close transitions.
