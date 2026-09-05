<script lang="ts">
  import CirclePlus from "~icons/lucide/circle-plus";
  import { Feature, type FeatureItem } from "@sv0/components/content/blog/features";
  import Features from "./features.svelte";

  const features: FeatureItem[] = [
    {
      text: "Advanced TypeScript Patterns",
      tooltip:
        "Master advanced TypeScript patterns to build type-safe React components. Learn about conditional types, mapped types, and utility types that make your component APIs more robust and developer-friendly."
    },
    {
      text: "Accessible Forms with Validation",
      tooltip:
        "Create inclusive form experiences that work for everyone. Explore ARIA patterns, screen reader compatibility, and validation techniques that provide clear feedback without compromising accessibility."
    },
    {
      text: "State Management",
      tooltip:
        "Navigate the landscape of state management solutions for React. Compare Zustand, Jotai, and Redux Toolkit to find the right approach for your application's complexity and team preferences."
    },
    {
      text: "CSS-in-JS vs Utility-First",
      tooltip:
        "Examine the trade-offs between CSS-in-JS solutions and utility-first frameworks like Tailwind CSS. Learn when to choose each approach based on team size, project requirements, and performance considerations."
    },
    {
      text: "Implementing Dark Mode",
      tooltip:
        "Build a robust dark mode system using CSS custom properties and JavaScript. Learn about color theory, contrast ratios, and user preference detection to create themes that enhance user experience."
    },
    {
      text: "Micro-Frontends",
      tooltip:
        "Explore micro-frontend architecture patterns for large-scale applications. Understand module federation, shared dependencies, and team collaboration strategies that enable independent deployment cycles."
    }
  ];
</script>

<div class="mb-6 space-y-4">
  <h1 class="text-muted-foreground text-lg font-bold tracking-tighter">Single Feature</h1>
  <Feature tooltip="Customizable Terms" class="text-indigo-400">
    <CirclePlus class="h-4 w-4" />
    Customizable Terms
  </Feature>
</div>

<div class="mb-6 space-y-4">
  <h1 class="text-muted-foreground text-lg font-bold tracking-tighter">Single Feature</h1>
  <Feature class="text-sky-400">
    <CirclePlus class="h-4 w-4" />
    Customizable Terms
  </Feature>
</div>

{#snippet item(feature: FeatureItem)}
  <Feature tooltip={feature.tooltip}>
    <CirclePlus class="h-4 w-4" />
    {feature.text}
  </Feature>
{/snippet}

<div class="mb-6 space-y-4">
  <h1 class="text-muted-foreground text-lg font-bold tracking-tighter">
    Features List (Using Snippet as Icon)
  </h1>
  <Features {features} icon={item} />
</div>

<div class="mb-6 space-y-4">
  <h1 class="text-muted-foreground text-lg font-bold tracking-tighter">
    Features List (Without Icon)
  </h1>
  <Features {features} />
</div>
