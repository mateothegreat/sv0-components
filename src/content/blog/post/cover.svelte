<script lang="ts">
  import type { Image } from "@sv0/components/content/blog/types";
  import { Link } from "@sv0/components/navigation/link";
  import { usePropsBuilder, type WithOptionalChildren } from "@sv0/components/utils/props";

  type Props = {
    cover?: Image;
    title: string;
    href: string;
    // TODO: Add type.
    attachment?: any;
  } & WithOptionalChildren;

  const { cover, title, href, attachment, ...rest }: Props = $props();

  const built = usePropsBuilder(rest).withClassMerge("space-y-2");
</script>

<div class={built.class}>
  {#if cover}
    <img class="w-full rounded-md object-cover" src={cover.src} alt={title} />
  {/if}
  <h3>
    <Link {href} {attachment}>{title}</Link>
  </h3>
</div>
