---
title: ""
tags:
  - composable-ui
  - developer-experience
  - interactive-assessments
  - svelte-quiz
  - web-component
aliases: [readme, quizkit, interactive-quiz, composable-quiz]
created: Thursday, September 18th 2025, 2:05:58 pm
date: 2025-09-18
description: "QuizKit is a fast, composable, and extensible interactive quiz system for Svelte 5. Think Lego blocks for assessments — declarative when you want it, fully programmable when you need it."
linter-yaml-title-alias: readme
modified: Thursday, September 18th 2025, 7:38:26 pm
---

## QuizKit — The Last Quiz Component You'll Ever Need

Forget rigid pre‑built widgets. **QuizKit** is a complete system for building assessments, powered by **interoperable atoms** you can assemble into anything from a micro‑quiz to a proctored exam. It's portable, composable, and engineered for production.

- 🚀 **Fast setup** — get a working quiz in minutes.
- 🧩 **Composable atoms** — assemble like Lego, extend endlessly.
- ⚡ **Programmatic control** — open, close, grade, and persist with a clean API.
- 🔒 **Enterprise‑ready** — accessibility, security, and performance baked in.

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

That's it. You now have a working quiz. From there, extend with timers, custom question renderers, AI‑powered grading, or analytics.

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

### Feature Catalog — Your Atoms

| Atom       | Role                               | Extensibility                               |
| ---------- | ---------------------------------- | ------------------------------------------- |
| `Root`     | Lifecycle, config, state, instance | Acts as provider for telemetry & tools      |
| `Trigger`  | Launch control, with hooks         | Perfect for analytics & gating logic        |
| `Header`   | Context: titles, metadata, timers  | Add progress bars, promos, microcopy        |
| `Question` | Input rendering + scoring          | Create new modalities with custom renderers |
| `Controls` | Navigation + actions               | Integrate adaptive flows or proctoring      |
| `Instance` | Programmatic orchestrator          | Automation and CI integration               |

---

### Built for Real‑World Needs

- **Accessibility**: focus management, ARIA roles, keyboard controls.
- **Performance**: lazy rendering, server‑side heavy grading.
- **Security**: sanitize rich text, scan uploads, avoid XSS.

---

### Best Practices & Migration Tips

- Use `saveDraft()` for long or timed assessments.
- Keep question IDs stable between releases.
- Offload expensive grading (e.g., code execution, ML scoring) to secure server hooks.
- Prefer the `Instance` API over DOM queries for deterministic UX.

---

### Ship with Confidence

Before deploying, run through this quick checklist:

- ✅ Validate your `config` early to fail fast.
- ✅ Add telemetry hooks for `open`, `submit`, and `timeout`.
- ✅ Implement server‑side graders for non‑deterministic scoring.
- ✅ Write tests atom‑by‑atom and end‑to‑end.
- ✅ Audit all user input for security.

---

### Closing Note

QuizKit is more than a quiz widget — it's a **system**. Assemble it declaratively, drive it programmatically, and extend it however your product demands.

👉 Ready to replace brittle forms with robust assessments? **Start building with QuizKit today.**
