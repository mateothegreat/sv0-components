<script lang="ts">
  import { cn } from "@sv0/components/utils/shadcn";
  import { Tag } from "../../tag";
  import Content from "./content.svelte";
  import Header from "./header.svelte";
  import Root from "./root.svelte";
  import Tags from "./tags.svelte";
  import Title from "./title.svelte";
  import type { PostData } from "./types";

  let {
    posts = [],
    title = "Blog",
    linker,
    class: className,
    ...restProps
  }: {
    posts?: PostData[];
    title?: string;
    linker?: (node: HTMLElement) => void;
    class?: string;
  } = $props();
</script>

<section class={cn("mb-4 space-y-6", className)} {...restProps}>
  {#each posts as post, index}
    <Root class="mb-6">
      <Header>
        <Title>{post.title}</Title>
      </Header>
      <Content>
        {post.description}
      </Content>
      <Tags>
        {#each post.tags as tag}
          <Tag {linker} href={tag.href} variant={tag.variant || "outline"}>
            {tag.label}
          </Tag>
        {/each}
      </Tags>
    </Root>
  {/each}
</section>
