<script lang="ts">
  import Content from "@sv0/components/content/faq/content.svelte";
  import type { FAQItemProps } from "@sv0/components/content/faq/types";
  import { usePropsBuilder } from "@sv0/components/utils/props";

  let {
    item,
    expanded = $bindable(false),
    showIndex = true,
    index,
    onToggle,
    ...rest
  }: FAQItemProps = $props();

  const built = usePropsBuilder(rest).withClassMerge(
    "group relative border-t border-neutral-200 dark:border-neutral-800"
  );

  function handleToggle() {
    expanded = !expanded;
    onToggle?.();
  }

  const displayIndex = $derived(
    showIndex && typeof index === "number" ? `(${(index + 1).toString().padStart(3, "0")})` : null
  );
</script>

<div class={built.class} style="opacity: 1; transform: none" {...rest}>
  <button
    type="button"
    class="relative flex w-full items-center justify-between py-6"
    aria-label={expanded ? "Show less" : "Show more"}
    onclick={handleToggle}>
    <div class="flex items-center gap-6">
      {#if displayIndex}
        <span
          class="font-mono text-sm text-neutral-400 transition-colors duration-200 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-400">
          {displayIndex}
        </span>
      {/if}
      <h3
        class="text-xl font-medium transition-colors duration-200 group-hover:text-neutral-700 dark:group-hover:text-neutral-200"
        style="opacity: 1; transform: none">
        {item.question}
      </h3>
    </div>
    <div class="flex h-8 w-8 items-center justify-center">
      {#if expanded}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-minus h-5 w-5 text-neutral-400 transition-colors duration-200 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-400">
          <path d="M5 12h14"></path>
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-plus h-5 w-5 text-neutral-400 transition-colors duration-200 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-400">
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
      {/if}
    </div>
  </button>

  <Content content={item.answer} images={item.images} tags={item.tags} {expanded} />
</div>
