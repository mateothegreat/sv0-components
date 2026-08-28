<script lang="ts">
  import { Popover } from "../../interactives/popover/index";

  export let testType = "basic";
  export let isOpen = false;
  export let side = "bottom";
  export let align = "center";
  export let customClass = "";
  export let onOpen = () => {};
  export let onClose = () => {};
</script>

{#if testType === "basic"}
  <Popover.Root open={isOpen} {onOpen} {onClose}>
    {#snippet children()}
      <Popover.Trigger>
        {#snippet children()}
          <button data-testid="trigger-button">Test Trigger</button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content {side} {align} class={customClass} portal={false}>
        {#snippet children()}
          <div data-testid="popover-content">Test Content</div>
        {/snippet}
      </Popover.Content>
    {/snippet}
  </Popover.Root>
{:else if testType === "trigger-only"}
  <Popover.Root>
    {#snippet children()}
      <Popover.Trigger>
        {#snippet children()}
          <button data-testid="trigger-only-button">Trigger Only</button>
        {/snippet}
      </Popover.Trigger>
    {/snippet}
  </Popover.Root>
{:else if testType === "content-only"}
  <Popover.Root open={isOpen}>
    {#snippet children()}
      <Popover.Content {side} {align} class={customClass} portal={false}>
        {#snippet children()}
          <div data-testid="content-only">Content Only</div>
        {/snippet}
      </Popover.Content>
    {/snippet}
  </Popover.Root>
{/if}
