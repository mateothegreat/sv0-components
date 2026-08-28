<script lang="ts">
  import { useRandomColor } from "@sv0/components/actions/use-random-color.svelte";
  import { Tag } from "@sv0/components/display/tag";
  import { onDestroy } from "svelte";
  import Content from "./content.svelte";
  import Header from "./header.svelte";
  import Root from "./root.svelte";
  import Tags from "./tags.svelte";
  import Title from "./title.svelte";
  import type { PostData } from "./types";

  const mockPosts: PostData[] = [
    {
      date: "March 15, 2024",
      title: "Building a Design System with Shadcn UI",
      description:
        "Learn how to create a scalable design system using Shadcn UI components. We'll explore component composition, theming, and best practices for maintaining consistency across your application. Discover how to leverage the power of Radix UI primitives while keeping your codebase clean and maintainable.",
      tags: ["Design Systems", "Shadcn UI", "React", "Tailwind CSS", "UI Development"],
      href: "#"
    },
    {
      date: "March 10, 2024",
      title: "The Rise of Headless UI Components",
      description:
        "Explore the benefits of headless UI components and how they're revolutionizing web development. We'll compare popular headless libraries, discuss accessibility considerations, and show how to build flexible, unstyled components that can be customized to match any design system.",
      tags: ["Headless UI", "Accessibility", "Component Architecture", "React", "Web Development"],
      href: "#"
    },
    {
      date: "March 5, 2024",
      title: "Optimizing Component Libraries for Performance",
      description:
        "Discover techniques for building performant component libraries that scale. From code splitting and tree shaking to optimizing bundle size and implementing lazy loading, learn how to ensure your UI components deliver a smooth user experience without compromising on functionality.",
      tags: ["Performance", "Bundle Size", "Code Splitting", "React", "Web Performance"],
      href: "#"
    },
    {
      date: "February 28, 2024",
      title: "Advanced TypeScript Patterns for Component Libraries",
      description:
        "Deep dive into sophisticated TypeScript techniques that make component libraries more robust and developer-friendly. Learn about conditional types, template literal types, and utility types that enable powerful API design patterns.",
      tags: ["TypeScript", "Component Libraries", "Type Safety", "Developer Experience"],
      href: "#"
    },
    {
      date: "February 20, 2024",
      title: "Implementing Dark Mode with CSS Variables",
      description:
        "A comprehensive guide to implementing dark mode in your applications using CSS custom properties. We'll cover theme switching, system preference detection, and maintaining state across page reloads while ensuring accessibility standards.",
      tags: ["CSS", "Dark Mode", "Theming", "Accessibility", "User Experience"]
    }
  ];

  // Create a color binding for each tag once
  const tagColors = mockPosts.map((post) =>
    post.tags.map(() => {
      const color = useRandomColor();
      color.schedule();
      return color;
    })
  );

  onDestroy(() => {
    tagColors.forEach((postColors) => {
      postColors.forEach((colorBinding) => {
        colorBinding.stop();
      });
    });
  });
</script>

<div class="mb-6 space-y-4">
  <h1 class="text-muted-foreground text-lg font-bold tracking-tighter">Single Post</h1>
  <Root class="mb-6 bg-black">
    <Header>
      <Title>{mockPosts[0].title}</Title>
    </Header>
    <Content>
      {mockPosts[0].description}
    </Content>
    <Tags>
      {#each mockPosts[0].tags as tag, tagIndex}
        <Tag
          href={tag.href}
          variant={tag.variant || "outline"}
          class={`text-muted-foreground ${`text-${tagColors[0][tagIndex].binding.value}`}`}>
          {tag.label}
        </Tag>
      {/each}
    </Tags>
  </Root>
</div>

<div class="mb-6 space-y-4">
  <h1 class="text-muted-foreground text-lg font-bold tracking-tighter">Post List</h1>
  <section class="mb-4 space-y-6">
    {#each mockPosts as post, postIndex}
      <Root class="mb-6 bg-black">
        <Header>
          <Title>{post.title}</Title>
        </Header>
        <Content>
          {post.description}
        </Content>
        <Tags>
          {#each post.tags as tag, tagIndex}
            <Tag
              href={tag}
              variant="outline"
              class={`text-${tagColors[postIndex][tagIndex].binding.value}`}>
              {tag}
            </Tag>
          {/each}
        </Tags>
      </Root>
    {/each}
  </section>
</div>
