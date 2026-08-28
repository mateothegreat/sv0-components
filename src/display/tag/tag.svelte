<script lang="ts">
  import { cn, type WithElementRef } from "@sv0/components/utils/shadcn";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { variants, type TagVariant } from "./variants";

  let {
    ref = $bindable(null),
    href,
    linker,
    class: className,
    variant = "default",
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    variant?: TagVariant;
    linker?: (node: HTMLAnchorElement) => void;
  } = $props();
</script>

<a {href} use:linker class={cn(variants({ variant }), className)} {...restProps}>
  {@render children?.()}
</a>
