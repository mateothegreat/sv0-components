<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Badge } from "@sv0/components/display/badge";
</script>

<Demo.Root title="Badge" description="A badge component for displaying status or labels.">
  <Demo.Section
    title="Default"
    description="Default badge."
    variants={[
      { name: "size", value: "xs" },
      { name: "intent", value: "primary" }
    ]}>
    <Badge size="xs" intent="primary">Badge</Badge>
  </Demo.Section>
  <Demo.Section
    title="Extra Small Badges"
    description="All small badge variants."
    variants={[
      { name: "size", value: "xs" },
      { name: "intent", value: ["primary", "secondary", "destructive", "outline"] }
    ]}
    class="flex items-center gap-2">
    <Badge size="xs" intent="primary">Default</Badge>
    <Badge size="xs" intent="secondary">Secondary</Badge>
    <Badge size="xs" intent="destructive">Destructive</Badge>
    <Badge size="xs" intent="outline">Outline</Badge>
  </Demo.Section>
  <Demo.Section
    title="Small Badges"
    description="All small badge variants."
    class="flex items-center gap-2"
    variants={[
      { name: "size", value: "sm" },
      { name: "intent", value: ["primary", "secondary", "destructive", "outline"] }
    ]}>
    <Badge size="sm" intent="primary">Default</Badge>
    <Badge size="sm" intent="secondary">Secondary</Badge>
    <Badge size="sm" intent="destructive">Destructive</Badge>
    <Badge size="sm" intent="outline">Outline</Badge>
  </Demo.Section>
  <Demo.Section
    title="Medium Badges"
    description="All medium badge variants."
    class="flex items-center gap-2"
    variants={[
      { name: "size", value: "md" },
      { name: "intent", value: ["primary", "secondary", "destructive", "outline"] }
    ]}>
    <Badge size="md" intent="primary">Default</Badge>
    <Badge size="md" intent="secondary">Secondary</Badge>
    <Badge size="md" intent="destructive">Destructive</Badge>
    <Badge size="md" intent="outline">Outline</Badge>
  </Demo.Section>
  <Demo.Section
    title="Large Badges"
    description="All medium badge variants."
    class="flex items-center gap-2"
    variants={[
      { name: "size", value: "lg" },
      { name: "intent", value: ["primary", "secondary", "destructive", "outline"] }
    ]}>
    <Badge size="lg" intent="primary">Default</Badge>
    <Badge size="lg" intent="secondary">Secondary</Badge>
    <Badge size="lg" intent="destructive">Destructive</Badge>
    <Badge size="lg" intent="outline">Outline</Badge>
  </Demo.Section>
</Demo.Root>
