<script lang="ts">
  import { clickOutside } from "@sv0/components/attachments/outside-old";
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";
  import type { PopoverContext } from "./types";

  let {
    children,
    portal = true,
    side = "bottom",
    align = "center",
    class: classNames = "",
    motion = fade
  } = $props();

  const context = getContext<PopoverContext>("popover");

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2"
  };

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  };

  const combinedClasses = [
    "absolute z-10",
    "w-screen max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
    "bg-white dark:bg-gray-800",
    "border border-gray-200 dark:border-gray-700",
    "rounded-lg shadow-lg",
    positionClasses[side],
    alignmentClasses[align],
    ...(Array.isArray(classNames) ? classNames : [classNames])
  ]
    .join(" ")
    .trim();

  console.log(context);
</script>

{#if context.state === "open"}
  {#if portal}
    <!-- <svelte:portal>
			<div
				class={combinedClasses}
				use:clickOutside={context.close}
				transition:motion
				role="dialog"
				aria-modal="true"
			>
				{@render children()}
			</div>
		</svelte:portal> -->
  {:else}
    <div
      class={combinedClasses}
      use:clickOutside={context.close}
      transition:motion
      role="dialog"
      aria-modal="true">
      {@render children()}
    </div>
  {/if}
{/if}
