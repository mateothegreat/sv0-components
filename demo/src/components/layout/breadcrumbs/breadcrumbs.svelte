<script lang="ts">
  import { Breadcrumbs } from "@sv0/components/display/breadcrumbs";

  let { path } = $props();
</script>

{path}
<Breadcrumbs.Root>
  <Breadcrumbs.List>
    <Breadcrumbs.Item class="hidden md:block">
      <Breadcrumbs.Link href="#">Building Your Application</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Separator class="hidden md:block" />
    <Breadcrumbs.Item>
      <Breadcrumbs.Page>Data Fetching</Breadcrumbs.Page>
    </Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs.Root>
