<script lang="ts">
  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type Props = {
    href?: string;
    // TODO: Add type for attachment.
    attachment?: any;
  } & WithChildren &
    HTMLAnchorAttributes;

  const { attachment, ...rest }: Props = $props();

  const builder = usePropsBuilder(rest).withClassMerge(
    "text-foreground hover:text-accent-foreground font-medium underline underline-offset-4"
  );
</script>

{#if attachment}
  <a {...rest} class={builder.className} use:attachment>
    {@render builder.children?.()}
  </a>
{:else}
  <a {...rest} class={builder.className}>
    {@render builder.children?.()}
  </a>
{/if}
