<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Input } from "@sv0/components/forms/input";
  import { Label } from "@sv0/components/forms/label";
</script>

<Demo.Root
  title="Input"
  description="A humble text box that accepts user input. Revolutionary, we know.">
  <Demo.Section
    title="Default"
    description="Just a regular input, doing input things."
    class="space-y-2">
    <Label for="email">Email</Label>
    <Input />
  </Demo.Section>
  <Demo.Section
    title="Disabled"
    description="When you need to show an input but don't want anyone touching it."
    class="space-y-2">
    <Label for="email">Email</Label>
    <Input disabled />
  </Demo.Section>
  <Demo.Section
    title="File"
    description="For when you trust users to upload their 'totally-not-a-virus.exe' files."
    class="space-y-2">
    <Label for="email">Email</Label>
    <Input type="file" />
  </Demo.Section>
</Demo.Root>
