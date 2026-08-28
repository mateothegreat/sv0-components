<!--
  @component
  
  EmptyState Component
  
  Displays a placeholder when there's no content to show, typically used for onboarding 
  experiences, empty search results, or initial setup flows. It provides an intuitive way 
  to guide users toward their next action with visually appealing option cards.
  
  @example
  ```svelte
  <EmptyState
    title="Create your first project"
    description="Start by selecting a template or begin with a blank canvas."
    options={[
      {
        id: 'marketing',
        title: 'Marketing Campaign',
        description: 'Plan and launch engaging campaigns.',
        icon: '<svg>...</svg>',
        iconColor: 'bg-pink-500',
        onClick: () => console.log('Marketing selected')
      }
    ]}
    emptyProjectHref="/new-project"
    emptyProjectText="or start from scratch"
  />
  ```
-->
<script lang="ts">
  import type { EmptyStateProps } from "./types.js";

  /**
   * Component props with default values for optional properties.
   */
  let {
    title,
    description,
    options,
    emptyProjectHref = "#",
    emptyProjectText = "or start from an empty project"
  }: EmptyStateProps = $props();

  /**
   * Handles click events on option cards. Calls the onClick handler if provided for the specific option.
   *
   * @param option - The option card that was clicked.
   */
  function handleOptionClick(option: (typeof options)[0]) {
    if (option.onClick) {
      option.onClick();
    }
  }

  /**
   * Handles keyboard events on option cards for accessibility. Responds to Enter and Space keys to trigger the option's onClick handler.
   *
   * @param e - The keyboard event.
   * @param option - The option card that received the keyboard event.
   */
  function handleKeydown(e: KeyboardEvent, option: (typeof options)[0]) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOptionClick(option);
    }
  }
</script>

<div class="mx-auto max-w-md text-center">
  <!-- Header section with title and description -->
  <header class="space-y-2">
    <h2 class="text-2xl font-bold">{title}</h2>
    <p class="text-muted-foreground">{description}</p>
  </header>

  <!-- Options section - renders interactive cards for each option -->
  {#if options.length > 0}
    <div class="mt-8 space-y-4">
      {#each options as option}
        <div
          data-slot="card"
          class="bg-card text-card-foreground hover:bg-muted flex cursor-pointer flex-row items-center gap-4 rounded-xl border p-4 transition-colors"
          role="button"
          tabindex="0"
          onclick={() => handleOptionClick(option)}
          onkeydown={(e) => handleKeydown(e, option)}
          aria-label={`Select ${option.title}`}>
          <!-- Icon container with custom background color -->
          <div class="flex-shrink-0 rounded-full p-3 {option.iconColor}">
            {@html option.icon}
          </div>

          <!-- Text content section -->
          <div class="flex-grow text-left">
            <h3 class="text-base font-medium">{option.title}</h3>
            <p class="text-muted-foreground text-sm">{option.description}</p>
          </div>

          <!-- Chevron icon indicating clickable action -->
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
            class="lucide lucide-chevron-right text-muted-foreground ml-auto size-4 shrink-0"
            aria-hidden="true">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Empty project link - alternative action below the main options -->
  <div class="mt-8">
    <a
      class="text-primary inline-flex items-center text-sm font-medium hover:underline"
      href={emptyProjectHref}
      aria-label={emptyProjectText}>
      {emptyProjectText}
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
        class="lucide lucide-arrow-right ml-2 h-4 w-4"
        aria-hidden="true">
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    </a>
  </div>
</div>
