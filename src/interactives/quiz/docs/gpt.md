---
title: ""
tags: []
aliases: gpt
created: Thursday, September 18th 2025, 2:58:16 pm
linter-yaml-title-alias: gpt
modified: Thursday, September 18th 2025, 6:45:53 pm
---

## Quiz — Fast, Composable, Enterprise-Ready Interactive Quiz Component

**Summary.** Ship high-quality assessments that scale. Build quizzes as composable engineering primitives that you assemble like Lego, then customize at will for timed exams, training micro-modules, or interactive product tours. This documentation shows you how to assemble the system atom-by-atom, operate it programmatically, and extend it cleanly for production use.

- Build assessments like infrastructure.
- Compose quizzes from small, testable building blocks.
- Control lifecycle programmatically and ship reliable UX.

### SEO Tags

- interactive quiz component.
- composable UI atoms.
- quiz API reference.
- programmatic quiz instance.
- timed assessments library.

---

/

## Product Overview

Think of the Quiz as a small platform built from confident atoms.

Assemble the atoms in sequence to get a working quiz fast, then iterate and extend.

Follow the assembly steps to ship predictable behavior and fine-grained control.

---

### Quick Start Assembly: Get a Working Quiz in 5 Steps

1. Create a `config` object with title, timing, grading, and questions.
2. Wrap atoms in `Quiz.Root` and bind the `instance` reference.
3. Add `Quiz.Trigger` to expose a launch control.
4. Place `Quiz.Header` and `Quiz.Question` into the root for UI.
5. Add `Quiz.Controls` and wire submit/next handlers.

---

## Building a Quiz: Atom-by-Atom

Treat each atom as a featureful building block that you compose into a well-engineered product.

Assemble in this order to get predictable lifecycle and observability.

### 1. `Quiz.Root` — The State and Context Provider

Start here. `Quiz.Root` owns configuration, lifecycle, state, and the instance reference that you use to control the quiz programmatically.

**You must.**

- Pass a `config` object that defines title, questions, grading, timing, and behavior.
- Wrap all other quiz atoms inside `Quiz.Root`.

**You should.**

- Bind the returned instance for programmatic control.
- Use portals when placing the quiz in constrained or overflow containers.

|Prop|Description|Type|Default|Required|
|---|---|---|--:|:-:|
|`config`|Full quiz configuration object.|`Config`|—|**Yes**|
|`open`|Controlled open state.|`boolean`|`false`|No|
|`instance`|Bound instance reference.|`Instance`|—|No|
|`class`|Additional container class names.|`string \| string[]`|`""`|No|
|`children`|Atoms and custom content to render.|`Component`|—|Yes|

---

### 2. `Quiz.Trigger` — The Launch Mechanism

Wrap any clickable element to toggle quiz visibility.

Use it to attach analytics, pre-flight checks, or gating logic.

**You must.**

- Provide a clickable element for the trigger slot.

|Prop|Description|Type|Default|Required|
|---|---|---|--:|:-:|
|`class`|Extra classes for styling.|`string \| string[]`|`""`|No|
|`onOpen`|Callback before open.|`() => void \| Promise<void>`|—|No|
|`children`|Trigger element(s).|`Component`|—|Yes|

**Implementation note.**
Call `instance.open()` in `onOpen` if you want to gate by async checks or remote flags.

---

### 3. `Quiz.Header` — Set the Scene

Render title, subtitle, and optional metadata like time remaining or attempts left.

**You can.**

- Surface `config.title` and `config.description` automatically.
- Inject timers, progress bars, or promo badges via `children`.

|Prop|Description|Type|Default|Required|
|---|---|---|--:|:-:|
|`title`|Title text.|`string`|`""`|No|
|`description`|Subtitle or description.|`string`|`""`|No|
|`meta`|Small metadata nodes.|`Component \| string`|—|No|
|`children`|Extra content inside header.|`Component`|—|No|

---

### 4. `Quiz.Question` — Active Question Renderer

Render the active question. Support multiple input types: single choice, multiple choice, text, code, file upload, and custom renderers.

**You must.**

- Pass the `question` index or an explicit `questionId`.

**You can.**

- Provide custom renderers for new question types.
- Add per-question hints, timers, and partial grading.

|Prop|Description|Type|Default|Required|
|---|---|---|--:|:-:|
|`question`|Index or id of the active question.|`number \| string`|`0`|**Yes**|
|`renderer`|Optional custom renderer component.|`Component`|—|No|
|`class`|Additional class names.|`string \| string[]`|`""`|No|
|`children`|Supplementary content.|`Component`|—|No|

**Feature catalog entries for question types.**

|Type|Capabilities|Notes|
|---|---|---|
|`SingleChoice`|Single answer, immediate feedback, shuffling.|Use for quizzes and quick polls.|
|`MultipleChoice`|Multi answer, partial credit, weight per option.|Enable partial grading via `weights`.|
|`Text`|Short or long text responses, regex grading.|Use `scorer` for custom logic.|
|`Code`|Code editor, language selection, autograde hooks.|Provide sandboxed runner server for execution.|
|`Upload`|File attachments with size/type validation.|Use server side scanning for security.|

---

### 5. `Quiz.Controls` — Navigation & Actions

Render navigation and submit controls. Replace it entirely when you need bespoke flows.

**You should.**

- Bind `next`, `prev`, `submit`, and `saveDraft` handlers to `instance` methods.
- Show progress and attempt counters here.

|Prop|Description|Type|Default|Required|
|---|---|---|--:|:-:|
|`showNext`|Show next button.|`boolean`|`true`|No|
|`showPrev`|Show previous button.|`boolean`|`true`|No|
|`showSubmit`|Show submit button.|`boolean`|`true`|No|
|`children`|Custom controls.|`Component`|—|No|

**Behavioral hooks.**

- Use `onBeforeSubmit()` to validate or save drafts.
- Use `onSubmit()` to call remote grading and update `instance.status`.

---

### 6. `Instance` — Programmatic Control Surface

Bind to the instance returned by `Quiz.Root` to orchestrate UX, telemetry, and automation.

**You must.**

- Use `instance` to open, close, toggle, and inspect state instead of DOM hacks.

|Name|Description|Type|
|---|---|---|
|`config`|The active config object.|`Config`|
|`state`|Current state and visibility.|`State`|
|`status`|Logical status (draft, grading, completed).|`Status`|
|`open()`|Open the quiz.|`() => void`|
|`close()`|Close the quiz.|`() => void`|
|`toggle()`|Toggle the quiz.|`() => void`|
|`next()`|Advance to next question.|`() => void`|
|`prev()`|Go to previous question.|`() => void`|
|`submit()`|Submit answers.|`() => Promise<Result>`|
|`saveDraft()`|Save current progress.|`() => Promise<void>`|

**Usage pattern.**

- Bind `instance` with `bind:instance` or capture the return value from `createQuiz()`.
- Use `$state()` or your reactive runes to watch `state` changes for UX telemetry.

---

### 7. Grading and Results: Built for Extensibility

Decide grading strategy in `config.grade` and plug custom graders for complex assessments.

|Option|Capability|When to use|
|---|---|---|
|`auto`|Fully automated grading per question type.|Low friction quizzes and training paths.|
|`partial`|Weighted partial credit on multi-answer questions.|Advanced scoring.|
|`manual`|Teacher or reviewer grading workflows.|Essays and code reviews.|
|`hook`|Custom async grader hook.|Integrate ML scoring or external systems.|

**Best practice.**
Use server-side grader hooks for any non-deterministic scoring or expensive checks.

---

## Programmatic Usage Examples

### Declarative Assembly Example

```svelte
<script lang="ts">
  import { Quiz, type Types } from "@sv0/components/interactives/quiz";

  const config: Types.ConfigProps = {
    title: "Compliance Basics.",
    description: "Quick check to validate awareness.",
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
    <button>Start Compliance Check</button>
  </Quiz.Trigger>

  <Quiz.Header />
  <Quiz.Question question={0} />
  <Quiz.Controls />
</Quiz.Root>
```

### Imperative Control Example

```ts
import { createQuiz } from "@sv0/components/interactives/quiz";

const inst = createQuiz({ config });

inst.open();

await inst.saveDraft();

const result = await inst.submit();

if (result.passed) {
  // reward the user.
}
```

---

## Feature Catalog: Parts that Matter

Present each small component as a capability you can reuse in other products.

|Atom|Primary capability|Extensibility notes|
|---|---|---|
|`Root`|Lifecycle, config, instance binding.|Use as a provider for other tools and telemetry.|
|`Trigger`|Launch gating and analytics hook.|Integrate A/B flags or experiment IDs.|
|`Header`|Context and meta display.|Support banner promotions or microcopy experiments.|
|`Question`|Render and score interactive inputs.|Swap renderers for new modalities.|
|`Controls`|Navigation, submit, and pacing.|Replace to integrate proctoring or adaptive flows.|
|`Instance`|Programmatic orchestration and automation.|Use for automation and CI integration.|

---

## Accessibility, Performance, and Security Notes

- Manage focus when opening and closing.
- Ensure Escape closes the modal and returns focus to the trigger.
- Use `role="dialog"` for interactive assessments and ARIA labelling for questions.
- Keep heavy grading tasks server-side to avoid client CPU spikes.
- Sanitize and scan any file uploads before grading or storage.

---

## Best Practices and Migration Notes

- Prefer `Instance` control over DOM queries for deterministic behavior.
- Use `saveDraft()` to avoid data loss in long or timed assessments.
- Use server-side graders for code execution, file validation, and ML scoring.
- When migrating, keep your question IDs stable across releases to avoid state drift.

---

## Implementation Checklist before Shipping

- Provide server hooks for grading and persistence.
- Add telemetry on `open`, `submit`, `timeout`, and `saveDraft`.
- Validate `config` at initialization and fail fast on malformed question types.
- Add unit tests for each atom and E2E tests for the full flow.
- Audit XSS on rendered rich text and sanitize input.

---

## Appendix: Config Schema Snapshot

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
```

---

Ship it. Build on it. Iterate quickly. If you want, I can produce a production-grade `Config` TypeScript file, a test plan with exact assertions, or a checklist for integrating server graders and telemetry.
