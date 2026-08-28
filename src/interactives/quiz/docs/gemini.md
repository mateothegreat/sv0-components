---
title: ""
tags:
  - composable-ui
  - developer-experience
  - interactive-assessments
  - svelte-quiz
  - web-component
aliases: [readme, gemini, interactive-quiz, composable-quiz, gpt, copilot]
created: Thursday, September 18th 2025, 2:05:58 pm
date: 2025-09-18
description: "QuizKit is a fast, composable, and extensible interactive quiz system for Svelte 5. Build assessments like Lego blocks — declarative when you want, fully programmable when you need it."
linter-yaml-title-alias: gemini
modified: Thursday, September 18th 2025, 6:47:45 pm
---

## QuizKit — The Last Quiz Component You'll Ever Need

Forget rigid, pre-built widgets. **QuizKit** is a complete system for building assessments, powered by **interoperable atoms** you can assemble into anything from a micro-quiz to a proctored exam. It's portable, composable, and engineered for production.

- 🚀 **Fast setup** — get a working quiz in minutes.
- 🧩 **Composable atoms** — assemble like Lego, extend endlessly.
- ⚡ **Programmatic control** — open, close, grade, and persist with a clean API.
- 🔒 **Enterprise-ready** — accessibility, security, and performance baked in.

> Build assessments, not just forms.
>
> Your logic, your layout, our engine.

---

### Why QuizKit?

Traditional quiz components lock you into rigid UI flows. QuizKit takes a different approach: it provides a **library of atoms** — `Root`, `Trigger`, `Header`, `Question`, `Controls`, and `Instance` — that you compose into the flow and UX you need.

This atomic design ensures:

- Predictable lifecycle.
- Full programmatic access.
- Extensibility for new question types, graders, and layouts.

---

### Guided Assembly in 5 Simple Steps

Instead of memorizing dozens of props, follow a guided build process:

1. **Define your `config`** — title, timing, grading rules, and question set.
2. **Wrap everything in `Quiz.Root`** — owns context, lifecycle, and state.
3. **Add a `Quiz.Trigger`** — the entry point for launching quizzes.
4. **Render UI atoms** like `Quiz.Header` and `Quiz.Question`.
5. **Wire up `Quiz.Controls`** — navigation and submit behaviors.

That's it. You now have a working quiz. From there, extend with timers, custom question renderers, AI-powered grading, or analytics.

---

### Example: Declarative Assembly

```svelte
<script lang="ts">
  import { Quiz, type Types } from "@sv0/components/interactives/quiz";

  const config: Types.ConfigProps = {
    title: "Compliance Basics",
    description: "Quick awareness check",
    grade: { min: 70, attempts: 2 },
    timed: 300,
    questions: [
      { id: "q1", title: "Policy owner?", type: "SingleChoice", options: [{value:"A", correct:true},{value:"B"}] },
      { id: "q2", title: "Describe a violation.", type: "Text" }
    ]
  };

  let instance: Types.Instance;
</script>

<Quiz.Root {config} bind:instance>
  <Quiz.Trigger>
    <button>Start Quiz</button>
  </Quiz.Trigger>

  <Quiz.Header />
  <Quiz.Question question={0} />
  <Quiz.Controls />
</Quiz.Root>
```

---

### Example: Imperative Control

Prefer a fully programmatic flow? Use the instance API directly:

```ts
import { createQuiz } from "@sv0/components/interactives/quiz";

const inst = createQuiz({ config });

inst.open();
await inst.saveDraft();
const result = await inst.submit();

if (result.passed) {
  // reward the user
}
```

---

## Building a Quiz: Atom-by-Atom

Think of the `Quiz` component as a set of precision-engineered parts. You assemble them in sequence, each one adding a layer of capability. Follow this order to get a working `Quiz` fast — then customize at will.

### 1. `Quiz.Root` — The State & Context Provider

Start here. `Quiz.Root` owns the quiz lifecycle: open/close state, configuration, and context for all child atoms. Without it, nothing else works.

**You must:**

- Pass a `config` object that defines title, questions, grading, timing, and more.
- Wrap all other quiz atoms inside it.

| Prop       | Description                           | Type                 | Default | Required |
| ---------- | ------------------------------------- | -------------------- | ------- | -------- |
| `config`   | The complete quiz configuration object. | `Config`             | —       | **Yes**  |
| `open`     | A controlled open state for the quiz. | `boolean`            | `false` |          |
| `instance` | Bound instance reference.           | `Instance`           | —       | No       |
| `class`    | Additional class names for the container. | `string \| string[]` | `""`    |          |
| `children` | The Quiz atoms or custom content inside the root. | `Component`          | —       | Yes      |

### 2. `Quiz.Trigger` — The Launch Mechanism

This is how users start the quiz. Wrap any clickable element and wire it to toggle the quiz open or closed. Use it for buttons, links, or icons that open the quiz. Style it freely — it's just a wrapper with a toggle function.

| Prop     | Description                       | Type                 | Default | Required |
| -------- | --------------------------------- | -------------------- | ------- | -------- |
| `class`  | Additional class names for the trigger. | `string \| string[]` | `""`    |          |
| `onOpen` | Callback before open.             | `() => void \| Promise<void>` | —       | No       |
| `children` | The trigger element(s).          | `Component`          | —       | Yes      |

**Implementation note:** Call `instance.open()` in `onOpen` if you want to gate by async checks or remote flags.

### 3. `Quiz.Header` — The Context Setter

Give your quiz a title and optional description. This is the first thing users see, so make it count. You can pull `title` and `description` from your config or add extra content (icons, timers, progress bars) via `children`.

| Prop        | Description             | Type                 | Default | Required |
| ----------- | ----------------------- | -------------------- | ------- | -------- |
| `title`     | Title text.             | `string`             | `""`    |          |
| `description` | Description text.       | `string`             | `""`    |          |
| `meta`      | Small metadata nodes.   | `Component \| string`| —       | No       |
| `class`     | Additional class names for the header. | `string \| string[]` | `""`    |          |
| `children`  | Extra content inside the header. | `Component`          | —       | No       |

### 4. `Quiz.Question` — The Active Question Renderer

Displays the current question from your config. You control which question is active via the `question` index. You can render any question type supported by your config and style per question or globally.

| Prop       | Description                               | Type                 | Default | Required |
| ---------- | ----------------------------------------- | -------------------- | ------- | -------- |
| `question` | Index of the question to render from `config.questions`. | `number \| string`            | `0`       | **Yes**  |
| `renderer` | Optional custom renderer component.       | `Component`          | —       | No       |
| `class`    | Additional class names for the question container. | `string \| string[]` | `""`    |          |
| `children` | Extra content inside the question.        | `Component`          | —       | No       |

**Feature catalog entries for question types.**

|Type|Capabilities|Notes|
|---|---|---|
|`SingleChoice`|Single answer, immediate feedback, shuffling.|Use for quizzes and quick polls.|
|`MultipleChoice`|Multi answer, partial credit, weight per option.|Enable partial grading via `weights`.|
|`Text`|Short or long text responses, regex grading.|Use `scorer` for custom logic.|
|`Code`|Code editor, language selection, autograde hooks.|Provide sandboxed runner server for execution.|
|`Upload`|File attachments with size/type validation.|Use server side scanning for security.|

### 5. `Quiz.Controls` — Navigation & Actions

This atom handles moving between questions and submitting answers. It connects to the `Quiz.Root` context to provide seamless navigation.

You can use the default implementation for simple next/previous/submit actions or add your own custom buttons, progress indicators, or timers.

| Prop       | Description                           | Type                 | Default | Required |
| ---------- | ------------------------------------- | -------------------- | ------- | -------- |
| `showNext` | Show next button.                     | `boolean`            | `true`  | No       |
| `showPrev` | Show previous button.                     | `boolean`            | `true`  | No       |
| `showSubmit`| Show submit button.                   | `boolean`            | `true`  | No       |
| `class`    | Additional class names for the controls container. | `string \| string[]` | `""`    |          |
| `children` | Extra content inside the controls.        | `Component`          | —       | No       |

**Behavioral hooks.**

- Use `onBeforeSubmit()` to validate or save drafts.
- Use `onSubmit()` to call remote grading and update `instance.status`.

---

### Instance API

#### `Instance`

This type is for defining the shape of the quiz instance reference. This reference allows you to programmatically control the quiz lifecycle and other instrumentation.

You can get a reference to the instance by using the return value from the `createQuiz` function or by using the `Quiz.Root` component:

```svelte
<script lang="ts">
  import { Quiz, type Types } from "@sv0/components/interactives/quiz";

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
        type: "MultipleChoice",
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
        type: "SingleChoice",
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

  // Declare your instance variable here.
  let instance: Types.Instance;
</script>

<!-- Bind your instance variable to the instance property of the Quiz.Root component like below. -->
<Quiz.Root bind:instance {config}>
  <Quiz.Header title="Quiz Demo" description="This is a demo quiz." />
  <Quiz.Question question={0} />
  <Quiz.Controls />
</Quiz.Root>
```

> [!IMPORTANT]
> Properties of the instance are reactive using `$state()` runes.

##### `Instance` Shape

```ts
export type Instance = {
  config: Config;
  state: State;
  status: Status;
  open: () => void;
  toggle: () => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  submit: () => Promise<Result>;
  saveDraft: () => Promise<void>;
};
```

##### `Instance` Properties and Methods

| Name        | Description                            | Type                 | Default        |
| ----------- | -------------------------------------- | -------------------- | -------------- |
| `config`    | The quiz configuration object.         | `Config`             | *User Provided*|
| `state`     | Current state of the quiz's visibility. | `State`              | `State.CLOSED` |
| `status`    | Current status (draft, grading, completed).| `Status`             |                |
| `open()`    | Opens the quiz.                        | `() => void`         |                |
| `toggle()`  | Toggles the quiz's visibility.         | `() => void`         |                |
| `close()`   | Closes the quiz.                       | `() => void`         |                |
| `next()`    | Advance to next question.              | `() => void`         |                |
| `prev()`    | Go to previous question.               | `() => void`         |                |
| `submit()`  | Submit answers.                        | `() => Promise<Result>`|                |
| `saveDraft()` | Save current progress.                 | `() => Promise<void>`|                |

---

### Best Practices & Migration Tips

- Use `saveDraft()` for long or timed assessments.
- Keep question IDs stable between releases.
- Offload expensive grading (e.g., code execution, ML scoring) to secure server hooks.
- Prefer the `Instance` API over DOM queries for deterministic UX.
- When placing the quiz in constrained or overflow containers, use portals.

---

### Accessibility, Performance, and Security Notes

- Manage focus when opening and closing.
- Ensure Escape closes the modal and returns focus to the trigger.
- Use `role="dialog"` for interactive assessments and ARIA labelling for questions.
- Keep heavy grading tasks server-side to avoid client CPU spikes.
- Sanitize and scan any file uploads before grading or storage.

---

### Ship with Confidence

Before deploying, run through this quick checklist:

- ✅ Validate your `config` early to fail fast.
- ✅ Add telemetry hooks for `open`, `submit`, and `timeout`.
- ✅ Implement server-side graders for non-deterministic scoring.
- ✅ Write tests atom-by-atom and end-to-end.
- ✅ Audit all user input for security.

---

### Appendix: Config Schema Snapshot

```ts
type Config = {
  id?: string;
  title: string;
  description?: string;
  timed?: number; // seconds
  grade?: { min: number; max?: number; attempts?: number; mode?: 'auto'|'manual'|'partial' };
  questions: Array<Question>;
  ui?: { theme?: string; showProgress?: boolean };
};

type Question = {
  id: string;
  title: string;
  description?: string;
  type: 'SingleChoice'|'MultipleChoice'|'Text'|'Code'|'Upload'|'Custom';
  options?: Array<{ id?: string; value: string; correct?: boolean; weight?: number }>;
  hint?: string;
  explanation?: string;
  metadata?: Record<string, any>;
};

type State = 'OPEN' | 'CLOSED';

type Status = 'DRAFT' | 'GRADING' | 'COMPLETED';

type Result = {
  passed: boolean;
  score: number;
  total: number;
};
```

---

QuizKit is more than a quiz widget — it's a **system**. Assemble it declaratively, drive it programmatically, and extend it however your product demands.

👉 Ready to replace brittle forms with robust assessments? **Start building with QuizKit today.**
