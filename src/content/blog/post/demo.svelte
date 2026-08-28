<script lang="ts">
  import { Avatar } from "@sv0/components/display/avatar";
  import { Blog } from "@sv0/components/content/blog";
  import type { Types } from "@sv0/components/content/blog";
  import { textTransformer } from "@sv0/components/utils/text";

  const sampleBlogPostData: Types.Post = {
    title: "The Complete Guide to Building Modern Web Applications",
    author: [
      {
        name: "mateothegreat",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=128&h=128&fit=crop&crop=face"
      },
      {
        name: "gibson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=128&h=128&fit=crop&crop=face"
      }
    ],
    publishDate: new Date("2024-03-15"),
    readingTime: 8,
    // breadcrumbs: [
    //   { label: "Home", href: "/" },
    //   { label: "Blog", href: "/blog" },
    //   { label: "Web Development", href: "/blog/web-development" },
    //   { label: "Complete Guide to Modern Web Apps" }
    // ],
    tableOfContents: [
      { id: "introduction", title: "Introduction", level: 1 },
      { id: "getting-started", title: "Getting Started", level: 1 },
      { id: "framework-selection", title: "Choosing a Framework", level: 2 },
      { id: "project-structure", title: "Project Structure", level: 2 },
      { id: "best-practices", title: "Best Practices", level: 1 },
      { id: "testing", title: "Testing Strategies", level: 2 },
      { id: "deployment", title: "Deployment", level: 1 }
    ],
    content: `
      <div class="space-y-2.5">
        <h2 id="introduction">Introduction</h2>
        <p>Building modern web applications requires careful consideration of many factors, from choosing the right technology stack to implementing best practices that ensure scalability and maintainability.</p>
        
        <p>In this comprehensive guide, we'll explore the essential concepts and techniques you need to know to build robust web applications that can handle the demands of today's users.</p>
        
        <h2 id="getting-started">Getting Started</h2>
        <p>Before diving into code, it's crucial to understand the landscape of modern web development. The ecosystem has evolved significantly over the past few years, with new tools and frameworks emerging regularly.</p>
        
        <blockquote>
          "The best way to predict the future is to invent it." - Alan Kay
        </blockquote>
        
        <h3 id="framework-selection">Choosing a Framework</h3>
        <p>When selecting a framework for your project, consider factors such as:</p>
        <ul>
          <li>Team expertise and learning curve</li>
          <li>Project requirements and constraints</li>
          <li>Community support and ecosystem</li>
          <li>Performance characteristics</li>
          <li>Long-term maintenance considerations</li>
        </ul>
        
        <h3 id="project-structure">Project Structure</h3>
        <p>A well-organized project structure is fundamental to maintainable code. Here's a recommended structure for most modern web applications:</p>
        
        <table>
          <thead>
            <tr>
              <th>Directory</th>
              <th>Purpose</th>
              <th>Files</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>src/components</td>
              <td>Reusable UI components</td>
              <td>Button.tsx, Modal.tsx, etc.</td>
            </tr>
            <tr>
              <td>src/pages</td>
              <td>Page-level components</td>
              <td>Home.tsx, About.tsx, etc.</td>
            </tr>
            <tr>
              <td>src/utils</td>
              <td>Utility functions</td>
              <td>api.ts, helpers.ts, etc.</td>
            </tr>
            <tr>
              <td>src/styles</td>
              <td>CSS and styling files</td>
              <td>global.css, variables.css</td>
            </tr>
          </tbody>
        </table>
        
        <h2 id="best-practices">Best Practices</h2>
        <p>Following established best practices helps ensure your application is maintainable, performant, and secure. Some key areas to focus on include:</p>
        
        <h3 id="testing">Testing Strategies</h3>
        <p>Implementing a comprehensive testing strategy is crucial for maintaining code quality:</p>
        <ul>
          <li><strong>Unit Tests</strong>: Test individual functions and components in isolation</li>
          <li><strong>Integration Tests</strong>: Verify that different parts of your application work together</li>
          <li><strong>End-to-End Tests</strong>: Test complete user workflows</li>
        </ul>
        
        <h2 id="deployment">Deployment</h2>
        <p>The deployment process should be automated and reliable. Consider using continuous integration and deployment (CI/CD) pipelines to ensure consistent and error-free deployments.</p>
        
        <p>Popular deployment platforms include:</p>
        <ul>
          <li>Vercel - Great for React and Next.js applications</li>
          <li>Netlify - Excellent for static sites and JAMstack apps</li>
          <li>Railway - Simple deployment for full-stack applications</li>
          <li>AWS - Comprehensive cloud platform for enterprise applications</li>
        </ul>
        
        <p>Remember to configure proper monitoring and logging to track your application's performance and quickly identify any issues in production.</p>
      </div>
    `
  };
</script>

<div></div>
<div class="mx-auto max-w-screen-lg">
  <Blog.Post.Root>
    <Blog.Post.Body>
      <Blog.Post.Header>
        <Blog.Post.Title>{sampleBlogPostData.title}</Blog.Post.Title>
        <Blog.Post.Author>
          <div class="*:data-[slot=avatar]:ring-ring flex -space-x-2 *:data-[slot=avatar]:ring-2">
            <Avatar.Root>
              <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
              <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
            <Avatar.Root>
              <Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
              <Avatar.Fallback>LR</Avatar.Fallback>
            </Avatar.Root>
          </div>
          {textTransformer(
            Array.isArray(sampleBlogPostData.author)
              ? sampleBlogPostData.author.map((a) => a.name)
              : [sampleBlogPostData.author.name]
          ).plus()}
        </Blog.Post.Author>
        <Blog.Post.Tagline
          date={sampleBlogPostData.publishDate}
          time={sampleBlogPostData.readingTime} />
      </Blog.Post.Header>
      <Blog.Post.Content>
        {@html sampleBlogPostData.content}
      </Blog.Post.Content>
    </Blog.Post.Body>
    <Blog.Post.Sidenav>
      <Blog.Post.TableOfContents tableOfContents={sampleBlogPostData.tableOfContents ?? []} />
    </Blog.Post.Sidenav>
  </Blog.Post.Root>
</div>
