<script lang="ts">
  import Code2 from "~icons/lucide/code2";
  import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
  import { createHighlighter, type Highlighter } from "shiki";
  import { onMount, type Snippet } from "svelte";
  import FileLink from "./file-link.svelte";

  let {
    title,
    file,
    class: className,
    children,
    language = "typescript",
    theme = "github-dark-dimmed"
  }: {
    title?: string;
    file?: string;
    class?: string;
    children?: Snippet;
    language?: string;
    theme?: string;
  } = $props();

  // State for the highlighted HTML content
  let highlightedContent = $state<string>("");
  // State for the reference to the hidden temporary element
  let tempElement: HTMLElement | undefined = $state(undefined);
  // State for the Shiki highlighter instance
  let shikiHighlighter: Highlighter | null = $state(null);

  /**
   * Initializes the Shiki highlighter instance once when the component mounts.
   */
  onMount(async () => {
    shikiHighlighter = await createHighlighter({
      themes: [theme],
      langs: ["typescript", "svelte", "html", "css", "json"]
    });
  });

  /**
   * Reactive effect that updates the syntax highlighting whenever the children, language, or
   * highlighter instance changes.
   */
  $effect(() => {
    if (!shikiHighlighter || !children || !tempElement) {
      if (!children) {
        highlightedContent = "";
      }
      return;
    }

    /**
     * At this point, Svelte has rendered the output of `children()` into `tempElement` due to the
     * `{@render children()}` directive in the hidden div. We can now extract the raw text content
     * from it.
     */
    const codeContent = (tempElement.textContent || "").trim();

    if (codeContent) {
      try {
        // Convert the raw code string to HTML using Shiki.
        highlightedContent = shikiHighlighter.codeToHtml(codeContent, {
          lang: language,
          theme: theme,
          transformers: [transformerColorizedBrackets()]
        });
      } catch (error) {
        console.error("Shiki highlighting error:", error, { language, codeContent });
        // Fallback to showing raw code (escaped) if highlighting fails.
        highlightedContent = `<pre class="shiki-fallback"><code>${escapeHtml(codeContent)}</code></pre>`;
      }
    } else {
      // Clear highlighted content if there's no text content.
      highlightedContent = "";
    }
  });

  /**
   * Helper function to escape HTML special characters. Used for the fallback when Shiki
   * highlighting fails.
   */
  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };
</script>

<div
  class="code-block-container flex flex-col rounded-md border-2 border-slate-700 bg-black/80 {className}">
  <div
    class="header flex flex-shrink-0 items-center justify-between bg-zinc-900/70 p-1.5 px-3 text-sm">
    <p class="flex items-center gap-1.5 font-mono text-xs text-slate-300">
      <Code2 class="h-4 w-4 shrink-0 text-orange-500" />
      {#if title}
        <span>{title}</span>
      {:else}
        <span>Code</span>
      {/if}
    </p>
    {#if file}
      <FileLink {file} />
    {/if}
  </div>

  <!--
    Temporary hidden element.
    The `children` snippet is rendered here by Svelte using `{@render children()}`.
    This component's `$effect` then reads `tempElement.textContent` to get the
    raw string representation of the rendered children for Shiki to process.
  -->
  <div bind:this={tempElement} style="display: none;" aria-hidden="true">
    {#if children}
      {@render children()}
    {/if}
  </div>

  {#if highlightedContent}
    <div class="min-h-0 flex-1 overflow-auto bg-[#0a0a0a] p-2.5 text-[13px] leading-[18px]">
      {@html highlightedContent}
    </div>
  {:else if children}
    <pre class="fallback-pre min-h-0 flex-1 overflow-auto p-3 font-mono text-sm text-slate-200">
      {@render children()}
    </pre>
  {:else}
    <div class="p-3 font-mono text-sm text-slate-500">Loading syntax highlighter...</div>
  {/if}
</div>

<style>
  :global(.shiki) {
    background: #090909 !important;
  }
</style>
