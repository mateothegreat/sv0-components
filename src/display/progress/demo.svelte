<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Progress } from ".";

  let value = $state(60);
</script>

<Demo.Root title="Progress" description="A progress bar component.">
  <Demo.Section title="Default" description="A progress bar showing completion." class="space-y-2">
    <Progress {value} class="w-[60%]" />
    <p class="text-muted-foreground text-sm">{value}% complete</p>
  </Demo.Section>
</Demo.Root>
