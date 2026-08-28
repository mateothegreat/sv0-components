```

<style>
  /* Custom prose styles for better blog post formatting */
  :global(.prose h2) {
    @apply scroll-mt-20 border-b border-border pb-2 mb-6 mt-12 first:mt-8;
  }

  :global(.prose h3) {
    @apply scroll-mt-20 mt-8 mb-4;
  }

  :global(.prose h4) {
    @apply scroll-mt-20 mt-6 mb-3;
  }

  :global(.prose p) {
    @apply mb-6 leading-relaxed;
  }

  :global(.prose a) {
    @apply text-primary hover:underline decoration-primary/30 underline-offset-4 transition-all duration-200;
  }

  :global(.prose blockquote) {
    @apply border-l-4 border-primary/30 pl-6 italic text-muted-foreground font-medium my-8;
  }

  :global(.prose table) {
    @apply w-full border-collapse;
  }

  :global(.prose th) {
    @apply border border-border bg-muted/50 px-4 py-3 text-left font-semibold;
  }

  :global(.prose td) {
    @apply border border-border px-4 py-3;
  }

  :global(.prose tbody tr:nth-child(even)) {
    @apply bg-muted/20;
  }

  :global(.prose ul) {
    @apply space-y-2;
  }

  :global(.prose li) {
    @apply leading-relaxed;
  }

  /* Callout box styles */
  :global(.callout) {
    @apply border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 p-6 my-8 rounded-r-lg;
  }

  :global(.callout-header) {
    @apply flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-200 mb-3;
  }

  :global(.callout-icon) {
    @apply h-5 w-5 text-yellow-600 dark:text-yellow-400;
  }

  :global(.callout-content) {
    @apply text-yellow-700 dark:text-yellow-300 leading-relaxed;
  }
</style>
```
