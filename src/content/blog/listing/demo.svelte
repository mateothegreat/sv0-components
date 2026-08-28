<script lang="ts">
  import { Blog, type Types } from "@sv0/components/content/blog";
  import { textTransformer } from "@sv0/components/utils/text";

  const posts: Types.Post[] = [
    {
      title: "The Future of Web Development: Trends to Watch in 2024",
      description:
        "Explore the cutting-edge technologies and methodologies that are shaping the future of web development.",
      cover: {
        src: "https://via.placeholder.com/150",
        alt: "The Future of Web Development: Trends to Watch in 2024"
      },
      author: {
        name: "Sarah Chen",
        role: "Senior Frontend Developer",
        avatar: "https://via.placeholder.com/150"
      },
      publishDate: new Date("2024-01-15"),
      readingTime: 8,
      category: "Technology"
    },
    {
      title: "Understanding TypeScript Generics",
      description:
        "A comprehensive guide to mastering TypeScript generics for better type safety and code reusability.",
      cover: {
        src: "https://via.placeholder.com/150",
        alt: "Understanding TypeScript Generics"
      },
      author: {
        name: "Alex Rodriguez",
        role: "TypeScript Expert",
        avatar: "https://via.placeholder.com/150"
      },
      publishDate: new Date("2024-01-12"),
      readingTime: 6,
      category: "Programming"
    },
    {
      title: "Building Responsive Components with Tailwind CSS",
      description:
        "Learn how to create flexible, mobile-first components using Tailwind CSS utility classes.",
      cover: {
        src: "https://via.placeholder.com/150",
        alt: "Building Responsive Components with Tailwind CSS"
      },
      author: {
        name: "Maria Santos",
        role: "UI/UX Designer",
        avatar: "https://via.placeholder.com/150"
      },
      publishDate: new Date("2024-01-10"),
      readingTime: 4,
      category: "Design"
    },
    {
      title: "Performance Optimization in Modern Web Apps",
      description:
        "Discover techniques and best practices for optimizing web application performance and user experience.",
      cover: {
        src: "https://via.placeholder.com/150",
        alt: "Performance Optimization in Modern Web Apps"
      },
      author: {
        name: "David Kim",
        role: "Performance Engineer",
        avatar: "https://via.placeholder.com/150"
      },
      publishDate: new Date("2024-01-08"),
      readingTime: 11,
      category: "Performance"
    }
  ];
</script>

<!-- <Blog.Listing.Header
          title="Tech Insights"
          subtitle="Exploring cutting-edge technologies shaping tomorrow's digital landscape" />
        <Blog.Listing.Content featuredPost={sampleFeaturedPost} sidebarPosts={sampleSidebarPosts}>
          {#snippet author()}
            <Blog.Author id={1} bool={true} data-author="joe" data-bool={true}>
              @mateothegreat
            </Blog.Author>
          {/snippet}
        </Blog.Listing.Content> -->
<div class="">
  <h2>Blog Listing Component</h2>
  <div class="space-y-12">
    <!-- Default Example -->
    <h2 class="mb-4 text-xl font-semibold">Default</h2>
    <div class="rounded-lg border-2 border-slate-800 bg-zinc-900/50 p-8">
      <Blog.Listing.Root>
        <Blog.Listing.Feature post={posts[0]} href="/blog/post" />
      </Blog.Listing.Root>
    </div>
    {textTransformer(
      Array.isArray(posts[0].author) ? posts[0].author?.map((a) => a.name) : [posts[0].author?.name]
    ).plus()}
    <!-- Custom Title and Subtitle -->
    <div>
      <h2 class="mb-4 text-xl font-semibold">Custom Title and Subtitle</h2>
      <Blog.Listing.Root>
        {#snippet children()}
          <Blog.Listing.Header
            title="Developer Resources"
            subtitle="Essential guides and tutorials for modern web development" />
          <Blog.Listing.Content featuredPost={posts[0]} sidebarPosts={posts} />
        {/snippet}
      </Blog.Listing.Root>
    </div>

    <!-- Without Read More Button -->
    <div>
      <h2 class="mb-4 text-xl font-semibold">Without Read More Button</h2>
      <Blog.Listing.Root>
        {#snippet children()}
          <Blog.Listing.Header
            title="Developer Resources"
            subtitle="Essential guides and tutorials for modern web development"
            showReadMoreButton={false} />
          <Blog.Listing.Content sidebarPosts={posts} />
        {/snippet}
      </Blog.Listing.Root>
    </div>

    <!-- Only Sidebar Posts -->
    <div>
      <h2 class="mb-4 text-xl font-semibold">Sidebar Posts Only</h2>
      <Blog.Listing.Root>
        {#snippet children()}
          <Blog.Listing.Header title="Quick Reads" subtitle="Short articles and tutorials" />
          <Blog.Listing.Content sidebarPosts={posts} />
        {/snippet}
      </Blog.Listing.Root>
    </div>
  </div>
</div>
