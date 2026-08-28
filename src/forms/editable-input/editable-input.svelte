<script lang="ts">
  import { onMount } from "svelte";

  let input: HTMLInputElement;
  let {
    value = $bindable(),
    blur,
    class: className
  }: { value: string; blur: () => void; class: string } = $props();

  onMount(() => {
    input.focus();
  });
</script>

<input
  bind:this={input}
  type="text"
  onblur={blur}
  onkeydown={(e) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault(); // Prevent form submission if applicable.
        input.blur();
        break;
      case "Escape":
        input.blur();
        break;
    }
  }}
  bind:value
  class={className} />
