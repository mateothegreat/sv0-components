<script lang="ts">
  import { Button } from "@sv0/components/interactives/buttons/button";
  import { Card } from "@sv0/components/display/card";
  import { Sidebar } from "@sv0/components/layout/sidebar";

  let {
    class: className
  }: {
    class: string;
  } = $props();
</script>

<Card.Root class="gap-2 py-4 shadow-none {className}">
  <Card.Header class="px-4">
    <Card.Title class="text-sm">Subscribe to our newsletter</Card.Title>
    <Card.Description>Opt-in to receive updates and news about the sidebar.</Card.Description>
  </Card.Header>
  <Card.Content class="px-4">
    <form>
      <div class="grid gap-2.5">
        <Sidebar.Input type="email" placeholder="Email" />
        <Button
          class="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
          size="sm">
          Subscribe
        </Button>
      </div>
    </form>
  </Card.Content>
</Card.Root>
