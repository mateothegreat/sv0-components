<script lang="ts">
  import Calendar1 from "~icons/lucide/calendar1";
import Eye from "~icons/lucide/eye";
  import type { TagLineProps } from "@sv0/components/blog/post/types";
  import { formatDate } from "@sv0/components/utils/dates";
  import { cn } from "@sv0/components/utils/shadcn";

  let { date: publishDate, time: readingTime, children, class: className }: TagLineProps = $props();
</script>

<div class={cn("text-muted-foreground flex items-center gap-2.5 text-sm", className)}>
  {#if children}
    {@render children()}
  {:else}
    <div class="flex items-center gap-1">
      <Calendar1 class="h-4 w-4" />
      <time datetime={publishDate}>
        {formatDate(publishDate)}
      </time>
    </div>
    <div class="flex items-center gap-1">
      <Eye class="h-4 w-4" />
      {readingTime}
    </div>
  {/if}
</div>
