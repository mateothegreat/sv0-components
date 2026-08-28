<script lang="ts">
  import type { DropdownContent } from "./types";

  interface Props {
    content: DropdownContent;
  }

  let { content }: Props = $props();
</script>

<div
  class="
    border-border bg-background fixed
    inset-0
    flex-col overflow-auto
    border-t
  ">
  <div class="mt-3">
    <button
      data-slot="button"
      class="
        text-primary focus-visible:border-ring
        focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive
        dark:aria-invalid:ring-destructive/40 relative -left-4
        inline-flex h-9 shrink-0
        items-center justify-center
        gap-2
        rounded-md
        px-4
        py-2
        text-sm
        font-medium
        whitespace-nowrap underline-offset-4 transition-all
        outline-none hover:underline
        focus-visible:ring-[3px] disabled:pointer-events-none
        disabled:opacity-50
        has-[>svg]:px-3
        [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
      ">
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
        class="lucide lucide-arrow-left size-4 text-xs"
        aria-hidden="true">
        <path d="m12 19-7-7 7-7"></path>
        <path d="M19 12H5"></path>
      </svg>
      Go back
    </button>
  </div>

  <div>
    {#if content.featured}
      <h2 class="pt-4 pb-6 text-lg font-medium">{content.featured.title}</h2>
      <div class="grid gap-8 sm:grid-cols-2">
        <a
          href={content.featured.href}
          class="
            group
            bg-primary
            text-primary-foreground relative flex
            h-full
            flex-row overflow-hidden rounded-lg
            px-0
            pt-8
            lg:rounded-xl lg:px-6
          ">
          <div
            class="
              relative
              flex w-full flex-col
              space-y-12
              text-left
              md:space-y-8
              lg:w-full lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-6
              xl:space-x-8
            ">
            <div class="relative flex flex-col px-6 lg:mb-6 lg:px-0">
              <span class="mb-6 text-xs font-medium tracking-wider uppercase md:mb-8">
                Transform Your Workflow
              </span>
              <div class="mt-auto flex items-center space-x-1 text-xs">
                Discover Our Platform
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
                  class="
                    lucide lucide-arrow-right
                    ml-1 size-4
                    transition-transform
                    group-hover:translate-x-1
                  "
                  aria-hidden="true">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
              <p class="text-primary-foreground/85 mt-2 text-xs">
                {content.featured.description}
              </p>
            </div>
            {#if content.featured.image}
              <div
                class="
                  relative
                  aspect-2/1
                  overflow-clip
                  rounded-t pl-6
                  lg:max-w-64 lg:pl-0
                  xl:max-w-96
                ">
                <img
                  alt="Featured content"
                  class="aspect-2/1 h-full w-full translate-y-px object-cover object-center"
                  src={content.featured.image} />
              </div>
            {/if}
          </div>
        </a>

        <div class="order-last mt-3 sm:order-none sm:mt-0 sm:py-2 md:p-6">
          {#each content.sections as section}
            <div class="mb-4 text-left leading-none md:col-span-2 lg:col-span-4 lg:mb-6">
              <strong
                class="
                  text-muted-foreground text-left text-xs
                  font-medium tracking-wider
                  uppercase
                ">
                {section.title}
              </strong>
            </div>
            <div class="grid gap-4 lg:grid-cols-2">
              {#each section.items as item}
                <a
                  data-slot="navigation-menu-link"
                  class="
                    group
                    hover:bg-accent hover:text-accent-foreground
                    focus:bg-accent focus:text-accent-foreground
                    focus-visible:ring-ring/50 data-[active=true]:bg-accent/50
                    data-[active=true]:text-accent-foreground
                    data-[active=true]:hover:bg-accent
                    data-[active=true]:focus:bg-accent
                    [&_svg:not([class*='text-'])]:text-muted-foreground flex
                    flex-row items-center
                    gap-4 rounded-sm p-2
                    text-sm transition-all
                    outline-none focus-visible:ring-[3px]
                    focus-visible:outline-1
                    [&_svg:not([class*='size-'])]:size-4
                  "
                  href={item.href}>
                  {#if item.icon}
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
                      class="lucide size-4"
                      aria-hidden="true">
                      <!-- Icon path would be dynamically rendered based on icon type -->
                      <path
                        d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"
                      ></path>
                    </svg>
                  {/if}
                  <div class="flex-1 text-sm font-medium">{item.label}</div>
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
                    class="
                      lucide lucide-arrow-right
                      size-4
                      transition-transform
                      group-hover:translate-x-1
                      lg:hidden
                    "
                    aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if content.sections && !content.featured}
      <div class="col-span-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {#each content.sections as section}
          <div class="border-border rounded-md border p-5">
            <div class="border-border border-b pb-4">
              <a href="#" class="group flex flex-col text-left">
                <div class="flex items-center">
                  <strong class="text-sm font-medium">{section.title}</strong>
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
                    class="
                      lucide lucide-arrow-right
                      ml-1 size-4
                      transition-transform
                      group-hover:translate-x-1
                    "
                    aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
                <p class="text-muted-foreground mt-1 text-xs">
                  {section.description}
                </p>
              </a>
            </div>
            <menu class="mt-6 grid gap-y-4">
              {#each section.items as item}
                <a
                  data-slot="navigation-menu-link"
                  class="
                    group
                    text-foreground/85 hover:bg-accent
                    hover:text-foreground focus:bg-accent
                    focus:text-accent-foreground
                    focus-visible:ring-ring/50 data-[active=true]:bg-accent/50
                    data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent
                    data-[active=true]:focus:bg-accent
                    [&_svg:not([class*='text-'])]:text-muted-foreground
                    flex
                    flex-row items-center
                    gap-1 space-x-4
                    rounded-sm p-2 text-left
                    text-sm transition-all
                    outline-none focus-visible:ring-[3px]
                    focus-visible:outline-1 lg:space-x-4
                    lg:border-0
                    [&_svg:not([class*='size-'])]:size-4
                  "
                  href={item.href}>
                  {#if item.icon}
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
                      class="lucide size-4"
                      aria-hidden="true">
                      <!-- Icon path would be dynamically rendered based on icon type -->
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    </svg>
                  {/if}
                  <div class="flex-1 text-sm font-medium">{item.label}</div>
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
                    class="
                      lucide lucide-arrow-right
                      size-4
                      transition-transform
                      group-hover:translate-x-1
                      lg:hidden
                    "
                    aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              {/each}
            </menu>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="mx-[2rem] mt-auto flex flex-col items-center gap-8 py-24">
    <button
      data-slot="button"
      class="
        bg-primary text-primary-foreground hover:bg-primary/90
        focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20
        aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 inline-flex
        h-9 shrink-0
        items-center
        justify-center
        gap-2
        rounded-md
        px-4
        py-2
        text-sm
        font-medium whitespace-nowrap shadow-xs
        transition-all outline-none
        focus-visible:ring-[3px] disabled:pointer-events-none
        disabled:opacity-50
        has-[>svg]:px-3
        [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
      ">
      Login
    </button>
  </div>
</div>
