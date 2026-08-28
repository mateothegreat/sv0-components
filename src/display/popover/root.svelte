<script lang="ts">
  import { setContext } from "svelte";
  import type { PopoverContext } from "./types";

  let { children, open = false, onOpen, onClose } = $props();

  let state = $state<"open" | "closed">(open ? "open" : "closed");

  const openPopover = () => {
    state = "open";
    onOpen?.();
  };

  const closePopover = () => {
    state = "closed";
    onClose?.();
  };

  const togglePopover = () => {
    if (state === "open") {
      closePopover();
    } else {
      openPopover();
    }
  };

  setContext<PopoverContext>("popover", {
    state: state,
    open: openPopover,
    close: closePopover,
    toggle: togglePopover
  });

  $effect(() => {
    if (open) {
      openPopover();
    } else {
      closePopover();
    }
  });
</script>

{@render children()}
