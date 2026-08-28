<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Callout } from "@sv0/components/display/callout";
</script>

<Demo.Root
  title="Callout"
  description="A versatile callout component for displaying important information with different variants.">
  <Demo.Controls />
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <Demo.Section
      title="Info"
      description="Informational callout variant."
      variants={[
        { name: "size", value: "xs" },
        { name: "intent", value: "info" }
      ]}>
      <Callout intent="info" size="xs">
        This is an informational message. It provides helpful context to the user.
      </Callout>
    </Demo.Section>
    <Demo.Section title="Success" description="Success callout variant.">
      <Callout intent="success">
        Your changes have been saved successfully! All data has been updated.
      </Callout>
    </Demo.Section>
    <Demo.Section title="Warning" description="Warning callout variant.">
      <Callout intent="warning">
        Please be careful! This action may have unintended consequences.
      </Callout>
    </Demo.Section>
    <Demo.Section title="Error" description="Error callout variant.">
      <Callout intent="error">
        An error occurred while processing your request. Please try again later.
      </Callout>
    </Demo.Section>
    <Demo.Section title="Note" description="Note callout variant.">
      <Callout intent="note">
        Note: This feature is currently in beta and may change in future releases.
      </Callout>
    </Demo.Section>
    <Demo.Section title="Tip" description="Tip callout variant.">
      <Callout intent="tip">
        Pro tip: You can use keyboard shortcuts to speed up your workflow!
      </Callout>
    </Demo.Section>
    <Demo.Section
      title="All Variants"
      description="All callout variants displayed together."
      class="flex flex-col gap-4">
      <Callout intent="info">Information callout</Callout>
      <Callout intent="success">Success callout</Callout>
      <Callout intent="warning">Warning callout</Callout>
      <Callout intent="error">Error callout</Callout>
      <Callout intent="note">Note callout</Callout>
      <Callout intent="tip">Tip callout</Callout>
    </Demo.Section>
    <Demo.Section
      title="All Variants (Dismissible)"
      description="All callout variants with dismiss functionality."
      class="flex flex-col gap-4">
      <Callout intent="info" dismissible>Dismissible information callout</Callout>
      <Callout intent="success" dismissible>Dismissible success callout</Callout>
      <Callout intent="warning" dismissible>Dismissible warning callout</Callout>
      <Callout intent="error" dismissible>Dismissible error callout</Callout>
      <Callout intent="note" dismissible>Dismissible note callout</Callout>
      <Callout intent="tip" dismissible>Dismissible tip callout</Callout>
    </Demo.Section>
  </div>
</Demo.Root>
