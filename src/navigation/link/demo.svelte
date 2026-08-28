<script>
  import { Demo } from "@sv0/components/demos";
  import { Link } from "@sv0/components/navigation/link";

  // TODO: Add type for attachment.
  const route = () => {
    return {
      href: "/",
      target: "_blank"
    };
  };
</script>

<Demo.Root title="Link" description="Link component">
  <Demo.Section title="Page Routing" description="Using href attribute.">
    <div class="">
      The future belongs to those who believe in the beauty of their dreams, whether they're
      searching on
      <Link href="https://www.google.com">Google</Link>, connecting on
      <Link href="https://www.linkedin.com" class="text-indigo-500">LinkedIn</Link>, or building the
      next big thing on
      <Link href="https://github.com">GitHub</Link>."
      <footer class="mt-2 text-sm text-gray-500">— Eleanor Roosevelt (adapted)</footer>
    </div>
  </Demo.Section>
  <Demo.Section title="SPA Routing" description="Using attachment prop.">
    <div class="space-y-4">
      <p class="text-lg font-semibold">
        “One small <em>click</em> for a dev, one giant leap for appkind.”
      </p>

      <p class="text-gray-600 italic">
        In the grand tradition of explorers, poets, and people who click buttons just to see what
        happens, we present to you: the routes that will change your life. Or at least your
        afternoon.
      </p>

      <div
        class="font-handwriting flex w-fit items-center rounded-md bg-zinc-900 px-2 py-1 text-2xl text-white">
        Choose wisely (or recklessly 😅)...
        <p
          class="ml-8 w-fit rounded-md bg-black px-2 py-1 font-mono text-xs font-light text-slate-500">
          We're not your build system™
        </p>
      </div>

      <ul class="ml-2 list-inside list-disc space-y-1 text-gray-500">
        <li>
          For when you absolutely must press <em>something</em> there is the
          <Link href="/button" attachment={route}>Button Demo</Link>
        </li>
        <li>
          Because reading is fundamental… and scrollable:
          <Link href="/blog-listing" attachment={route}>Blog Listing</Link> demo..
        </li>
        <li>
          <Link href="/input" attachment={route} class="text-pink-500">Input Demo</Link>
          <span class="text-gray-500"> — Type like nobody's linting.</span>
        </li>
        <li>
          Pop-ups that actually want to help (no,
          <Link href="/dialog" attachment={route} class="italic">really</Link>
          ).
        </li>
        <li>
          <Link href="/tag" attachment={route}>Taaagggg</Link>, you're it! (No refunds)
        </li>
      </ul>

      <p class="text-xs tracking-wide text-gray-400 uppercase">
        *No actual astronauts were harmed in the making of these routes.
      </p>
    </div>
  </Demo.Section>
</Demo.Root>
