<script lang="ts">
  import { Button } from "@sv0/components/interactives/buttons/button";
  import { Popover } from "./index";
</script>

<div class="p-8">
  <h2 class="mb-4 text-xl font-bold">Declarative Popover</h2>
  <Popover.Root open={true}>
    <Popover.Trigger>
      <Button>Open Declarative</Button>
    </Popover.Trigger>
    <Popover.Content>
      <div class="rounded-xl border bg-white p-4 shadow-xl">
        <p class="text-sm text-sky-500">Hello from popover!</p>
        <p class="text-pink-500">Clicking anywhere outside the popover will close it..</p>
      </div>
    </Popover.Content>
  </Popover.Root>
</div>
