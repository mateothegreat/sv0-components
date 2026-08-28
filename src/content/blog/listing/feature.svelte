<script lang="ts">
  import type { Types } from "@sv0/components/content/blog";
  import { Link } from "@sv0/components/navigation/link";
  import { usePropsBuilder, type WithOptionalChildren } from "@sv0/components/utils/props";

  type Props = {
    post: Types.Post;
    href: string;
  } & WithOptionalChildren;

  const { ...rest }: Props = $props();

  const built = usePropsBuilder(rest).withClassMerge("");
</script>

<div class={built.class} {...rest}>
  {#if built.post.cover}
    <img
      class="w-full rounded-md object-cover"
      src={built.post.cover.src}
      alt={built.post.cover.alt} />
  {/if}
  <div class="mt-4">
    <h1 id="featured-post-title" class="text-foreground text-2xl font-bold md:text-3xl lg:text-4xl">
      <Link href={built.href}>{built.post.title}</Link>
    </h1>
  </div>
</div>
