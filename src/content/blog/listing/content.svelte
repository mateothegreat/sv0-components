<script lang="ts">
  import type { BlogListingContentProps } from "@sv0/components/content/blog/listing/types";
  import { cn } from "@sv0/components/utils/shadcn";

  let {
    featuredPost,
    sidebarPosts = [],
    author,
    class: className,
    ...restProps
  }: BlogListingContentProps = $props();
</script>

<div class={cn("mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12", className)} {...restProps}>
  {#if featuredPost}
    <div class="mb-4">
      {#if featuredPost.cover}
        <img
          class="w-full rounded-lg object-cover"
          src={featuredPost.cover.src}
          alt={featuredPost.title}
          aria-describedby="featured-post-title" />
      {/if}
      <div class="mt-4">
        <h1
          id="featured-post-title"
          class="text-foreground text-2xl font-bold md:text-3xl lg:text-4xl">
          {featuredPost.title}
        </h1>
      </div>
      <div class="mt-6 md:mt-8">
        {@render author?.()}
      </div>
    </div>
  {/if}

  <div class="text-foreground space-y-6 md:space-y-8">
    {#each sidebarPosts as post}
      <article class="flex items-start gap-4 border-b pb-6 last:border-b-0">
        <div class="w-1/4 shrink-0 md:w-1/5">
          <img class="rounded-md" src={post.cover.src} alt={post.title} />
        </div>
        <div class="w-3/4 md:w-4/5">
          <p class="text-sm leading-relaxed md:text-base">
            {post.description}
          </p>
        </div>
      </article>
    {/each}
  </div>
</div>
