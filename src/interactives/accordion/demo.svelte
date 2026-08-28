<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Accordion } from "@sv0/components/interactives/accordion";

  const features: { text: string; content: string }[] = [
    {
      text: "Advanced TypeScript Patterns",
      content:
        "Master advanced TypeScript patterns to build type-safe React components. Learn about conditional types, mapped types, and utility types that make your component APIs more robust and developer-friendly."
    },
    {
      text: "Accessible Forms with Validation",
      content:
        "Create inclusive form experiences that work for everyone. Explore ARIA patterns, screen reader compatibility, and validation techniques that provide clear feedback without compromising accessibility."
    },
    {
      text: "State Management",
      content:
        "Navigate the landscape of state management solutions for React. Compare Zustand, Jotai, and Redux Toolkit to find the right approach for your application's complexity and team preferences."
    },
    {
      text: "CSS-in-JS vs Utility-First",
      content:
        "Examine the trade-offs between CSS-in-JS solutions and utility-first frameworks like Tailwind CSS. Learn when to choose each approach based on team size, project requirements, and performance considerations."
    }
  ];
</script>

<Demo.Root title="Accordion" description="A accordion component.">
  <Demo.Section title="Single" description="A default accordion component.">
    <Accordion.Root type="single">
      <Accordion.Item>
        <Accordion.Trigger>Trigger</Accordion.Trigger>
        <Accordion.Content>Content</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </Demo.Section>
  <Demo.Section title="Multiple" description="A default accordion component.">
    <Accordion.Root type="multiple">
      {#each features as feature}
        <Accordion.Item>
          <Accordion.Trigger>{feature.text}</Accordion.Trigger>
          <Accordion.Content>{feature.content}</Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  </Demo.Section>
</Demo.Root>
