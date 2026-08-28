<script lang="ts">
  import { CheckIcon, CopyIcon, XIcon } from "@lucide/svelte";
  import { UseClipboard } from "@sv0/components/attachments/clipboard.svelte";
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import { fade } from "svelte/transition";
  import type { CopyButtonProps } from "./types";

  let { ...rest }: CopyButtonProps = $props();

  const built = usePropsBuilder(rest).withClassMerge();

  const clipboard = new UseClipboard();
</script>

<button
  class={built.class}
  tabindex={built.tabindex ?? -1}
  onclick={async () => {
    const status = await clipboard.copy(built.text);
    built.onCopy?.(status);
  }}
  {...rest}>
  {#if clipboard.status === "success"}
    <div in:fade={{ duration: 400 }}>
      <CheckIcon
        tabindex={-1}
        class="size-{built.size ??
          4.5} stroke-muted-foreground text-green-500 hover:text-green-600" />
      <span class="sr-only">Copied</span>
    </div>
  {:else if clipboard.status === "failure"}
    <div in:fade={{ duration: 400 }}>
      <XIcon
        tabindex={-1}
        class="size-{built.size ?? 4.5} stroke-muted-foreground hover:text-red-500" />
      <span class="sr-only">Failed to copy</span>
    </div>
  {:else}
    {#if built.icon}
      {@render built.icon()}
    {:else}
      <CopyIcon
        tabindex={-1}
        class="size-{built.size ?? 4.5} stroke-muted-foreground hover:!text-green-500" />
    {/if}
    <span class="sr-only">Copy</span>
  {/if}
  {#if built.children}
    {@render built.children()}
  {/if}
</button>
