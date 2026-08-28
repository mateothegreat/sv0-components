<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Label } from ".";
</script>

<Demo.Root title="Label" description="A label component for form fields.">
  <Demo.Section title="Default" description="A label for an input field." class="space-y-2">
    <Label for="email">Email</Label>
    <input id="email" type="email" class="rounded-md border px-3 py-2" placeholder="Email" />
  </Demo.Section>
</Demo.Root>
