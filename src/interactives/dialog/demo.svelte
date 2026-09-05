<script lang="ts">
  import XIcon from "~icons/lucide/x";
  import { Dialog } from ".";
</script>

<div class="mb-6 w-full space-y-4">
  <h1 class="text-muted-foreground text-lg font-bold tracking-tighter">Popup</h1>
  <div class="flex justify-center">
    <Dialog.Root class="w-150 bg-black">
      <Dialog.Header>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Close>
          <XIcon />
        </Dialog.Close>
      </Dialog.Header>
      <Dialog.Content>
        <p>Dialog main content goes here.</p>
      </Dialog.Content>
      <Dialog.Footer>Dialog footer content goes here.</Dialog.Footer>
    </Dialog.Root>
  </div>
</div>
