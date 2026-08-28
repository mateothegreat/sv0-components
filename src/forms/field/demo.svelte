<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Field } from "@sv0/components/forms/field";
  import { Input } from "@sv0/components/forms/input";
  import { Label } from "@sv0/components/forms/label";
</script>

<Demo.Root title="Input" description="A label component for form fields.">
  <Demo.Section title="Default" description="A label for an input field.">
    <Field>
      <Label for="email">Email</Label>
      <Input />
    </Field>
  </Demo.Section>
  <Demo.Section title="Disabled" description="A label for an input field.">
    <Field disabled>
      <Label for="email">Email</Label>
      <Input id="email" />
    </Field>
  </Demo.Section>
</Demo.Root>
