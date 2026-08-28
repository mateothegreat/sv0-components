<script lang="ts">
  import Tour from "./tour.svelte";

  let open = $state(false);
  let steps = $state([
    {
      id: "step1",
      title: "Step 1",
      description: "Step 1 description"
    }
  ]);

  function onStepChange(step: number) {
    console.log(`Step ${step} changed`);
  }

  function onClose() {
    console.log("Tour closed");
  }
</script>

<Tour {open} {steps} {onStepChange} {onClose} />
