<script lang="ts">
  import { Progress } from "@sv0/components/display/progress";
  import { usePropsBuilder } from "@sv0/components/utils/props";

  const {
    ...rest
  }: {
    current: number;
    total: number;
  } = $props();

  const built = usePropsBuilder(rest).withClassMerge("");

  const progress = $derived(Math.round((built.current / built.total) * 100));
</script>

<div class="space-y-2">
  <div class="text-muted-foreground flex justify-between text-sm">
    <span>Question {built.current} of {built.total}</span>
    <span>{progress}% Complete</span>
  </div>
  <Progress value={progress} class="h-2" />
</div>
