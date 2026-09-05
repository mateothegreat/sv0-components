<script lang="ts">
  import ArrowRight from "~icons/lucide/arrow-right";
  import { Avatar } from "../../avatar";
  import { Button } from "../../interactives/button";
  import type { HeroData } from "./types";

  interface Props {
    data: HeroData;
  }

  let { data }: Props = $props();
</script>

<section class="bg-background relative py-32">
  <div class="container">
    <div class="mb-8">
      <h1 class="text-foreground text-3xl font-bold md:text-4xl lg:text-5xl">
        {data.title}
      </h1>
      <div class="mt-4 flex justify-start">
        <span class="text-muted-foreground mt-2 block text-sm md:text-base">
          {data.subtitle}
        </span>
        {#if data.readMoreUrl}
          <Button
            variant="outline"
            size="sm"
            class="border-foreground text-foreground ml-auto rounded-full has-[>svg]:px-3"
            href={data.readMoreUrl}>
            Read More
            <ArrowRight class="h-4 w-4 md:h-6 md:w-6" />
          </Button>
        {/if}
      </div>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
      <!-- Main featured article -->
      <div class="mb-4">
        <img
          class="w-full rounded-lg object-cover"
          src={data.featured.image}
          alt={data.featured.title} />
        <div class="mt-4">
          <h1 class="text-foreground text-2xl font-bold md:text-3xl lg:text-4xl">
            {data.featured.title}
          </h1>
        </div>
        <div class="mt-6 flex items-center gap-3 md:mt-8 md:gap-4">
          <Avatar
            src={data.featured.author.avatar}
            alt={data.featured.author.name}
            class="h-8 w-8 rounded-md md:h-12 md:w-12" />
          <span class="text-sm md:text-base">
            <span class="text-foreground block">{data.featured.author.name}</span>
            <span class="text-muted-foreground text-xs md:text-sm">
              {data.featured.author.title}
            </span>
          </span>
        </div>
      </div>

      <!-- Article list -->
      <div class="text-foreground space-y-6 md:space-y-8">
        {#each data.items as item}
          <div class="flex items-start gap-4 border-b pb-6 last:border-b-0">
            <div class="w-1/4 shrink-0 md:w-1/5">
              <img class="rounded-md" src={item.image} alt={item.title} />
            </div>
            <div class="w-3/4 md:w-4/5">
              <p class="text-sm leading-relaxed md:text-base">
                {item.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
