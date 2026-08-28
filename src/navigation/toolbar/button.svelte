<script lang="ts">
  import { Tooltip } from "@sv0/components/display/tooltip";
  import { usePropsBuilder, type WithOptionalClass } from "@sv0/components/utils/props";
  import { createStyleSet, type VariantProps } from "@sv0/stylesets";
  import type { Snippet } from "svelte";
  import { button } from "./styleset.svelte";

  const {
    ...rest
  }: {
    icon?: Snippet;
    text?: string;
    disabled?: boolean;
    tooltip?: string;
    onclick?: () => void;
  } & WithOptionalClass &
    VariantProps<typeof button> = $props();

  const built = usePropsBuilder(rest).withClassMerge();

  const styleSet = createStyleSet({
    base: "rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50 p-none active:scale-95",
    variants: {
      intent: {
        primary: `
          text-slate-100 dark:text-slate-300
          active:bg-zinc-200    
          hover:bg-zinc-100
          dark:active:bg-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-slate-500
        `,
        secondary: `
          bg-fuchsia-600 text-white 
          hover:bg-fuchsia-700 active:bg-fuchsia-800
        `
      },
      size: {
        md: "h-8 px-2 text-sm"
      }
    },
    defaultVariants: {
      intent: "primary",
      size: "md"
    }
  });

  const style = styleSet(
    {
      size: built.size,
      intent: built.intent
    },
    built.class
  );
</script>

{#snippet button()}
  <button type="button" class={style} disabled={built.disabled} onclick={built.onclick}>
    <div class="flex items-center gap-2">
      {#if built.icon}
        <div class="py-1">
          {@render built.icon()}
        </div>
      {/if}
      {#if built.text}
        <span class="hidden text-sm font-medium md:block dark:text-zinc-100">
          {built.text}
        </span>
      {/if}
    </div>
  </button>
{/snippet}

{#if built.tooltip}
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger>
        {@render button()}
      </Tooltip.Trigger>
      <Tooltip.Content>
        {built.tooltip}
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
{:else}
  {@render button()}
{/if}
