<script lang="ts">
  import type { Step } from "./types";

  let { step }: { step: Step } = $props();
</script>

<div>
  <h1>{step.title}</h1>
</div>
