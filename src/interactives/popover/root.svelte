<script lang="ts">
  import {
    usePropsBuilder,
    type WithChildren,
    type WithOptionalClass
  } from "@sv0/components/utils/props";
  import { createStyleSet, type VariantProps } from "@sv0/stylesets";
  import { setContext } from "svelte";
  import type { PopoverContext } from "./types";

  const {
    ...rest
  }: {
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
  } & WithOptionalClass &
    WithChildren &
    VariantProps<typeof styleSet> = $props();

  const built = usePropsBuilder(rest).withClassMerge();

  const styleSet = createStyleSet({
    base: "flex items-center gap-1.5",
    variants: {
      intent: {
        primary: "bg-white dark:bg-black",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
        success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
        danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
        warning: "bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800",
        ghost: "bg-transparent hover:bg-gray-100 active:bg-gray-200"
      },
      border: {
        primary: "border border-zinc-600 dark:border-zinc-900"
      },
      size: {
        xs: "h-7 px-2 text-xs rounded",
        sm: "px-2 text-sm rounded-md",
        lg: "h-12 px-6 text-lg rounded-lg",
        xl: "h-14 px-8 text-xl rounded-lg"
      },
      width: {
        compact: "relative w-fit",
        full: "w-full"
      }
    },
    defaultVariants: {
      intent: "primary",
      border: "primary",
      size: "sm",
      width: "compact"
    }
  });

  const style = styleSet(
    {
      size: built.size,
      intent: built.intent
    },
    built.class
  );

  let state = $state<"open" | "closed">(built.open ? "open" : "closed");

  const openPopover = () => {
    state = "open";
    built.onOpen?.();
  };

  const closePopover = () => {
    state = "closed";
    built.onClose?.();
  };

  const togglePopover = () => {
    if (state === "open") {
      closePopover();
    } else {
      openPopover();
    }
  };

  setContext<PopoverContext>("popover", {
    state,
    open: openPopover,
    close: closePopover,
    toggle: togglePopover
  });

  $effect(() => {
    if (built.open) {
      openPopover();
    } else {
      closePopover();
    }
  });
</script>

{@render built.children?.()}
