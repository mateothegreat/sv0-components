<!--
@file

  Footer component for the site.

  This component provides the site footer with links, copyright information,
  and social media connections. It maintains consistency across all pages
  and provides important site-wide information.

  ## Core Concepts

  1. **Site Links:** Quick access to major site sections.
  2. **Contact Information:** Professional contact details.
  3. **Copyright:** Legal and attribution information.
-->

<script lang="ts">
  import { Badge } from "@sv0/components/display/badge";

  /**
   * Current year for copyright display. Dynamically calculated to stay current.
   */
  const currentYear = new Date().getFullYear();

  /**
   * Footer navigation links. Provides quick access to key site sections.
   */
  const footerLinks = [
    { href: "/toolbox", label: "Toolbox" },
    { href: "/docs", label: "Documentation" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];
</script>

<footer class=" bg-black px-4 py-12">
  <div class="flex gap-4">
    <!-- Left Side: Brand Section -->
    <div class="w-125 space-y-4">
      <Badge variant="outline" class="font-mono text-sm text-emerald-500">@sv0</Badge>
      <p class="text-muted-foreground text-sm">
        Software engineer, mentor, and consultant sharing knowledge through tutorials, tools, and
        technical insights.
      </p>
    </div>
    <!-- Right Side: Links and Services -->
    <div class="grid grid-cols-3 gap-8">
      <!-- Quick Links -->
      <div class="space-y-4">
        <Badge variant="secondary" class="w-full text-left font-mono text-sm text-slate-500">
          Quick Links
        </Badge>
        <ul class="space-y-2">
          {#each footerLinks as link}
            <li>
              <a
                href={link.href}
                class="text-muted-foreground text-sm transition-colors hover:text-gray-900">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Services -->
      <div class="space-y-4">
        <Badge variant="outline" class="w-full text-left font-mono text-sm text-slate-500">
          Services
        </Badge>
        <ul class="text-muted-foreground space-y-2 text-sm">
          <li>Free Mentoring</li>
          <li>Technical Consulting</li>
          <li>Code Reviews</li>
          <li>Architecture Guidance</li>
        </ul>
      </div>

      <!-- Services -->
      <div class="space-y-4">
        <Badge variant="outline" class="w-full text-left font-mono text-sm text-slate-500">
          Services
        </Badge>
        <ul class="text-muted-foreground space-y-2 text-sm">
          <li>Free Mentoring</li>
          <li>Technical Consulting</li>
          <li>Code Reviews</li>
          <li>Architecture Guidance</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Copyright -->
  <div class="">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <p class="text-muted-foreground text-sm">
        &copy; {currentYear} Matthew Davis. All rights reserved.
      </p>
      <p class="text-muted-foreground mt-2 text-sm md:mt-0">Built with SvelteKit and TailwindCSS</p>
    </div>
  </div>
</footer>
