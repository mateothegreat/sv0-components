<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import type { ToolbarAvatarProps } from "./types.js";

  let {
    src = "",
    alt = "User",
    onclick,
    class: className,
    ...restProps
  }: ToolbarAvatarProps = $props();

  const buttonClasses = $derived(
    cn(
      "flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
      className
    )
  );

  function handleClick() {
    if (onclick) {
      onclick();
    }
  }
</script>

<button type="button" onclick={handleClick} class={buttonClasses} {...restProps}>
  <div class="flex h-6 w-6 items-center justify-center">
    <img
      {alt}
      loading="lazy"
      width="24"
      height="24"
      decoding="async"
      data-nimg="1"
      class="h-6 min-h-[24px] w-6 min-w-[24px] rounded-full"
      {src}
      style="color: transparent" />
  </div>
</button>
