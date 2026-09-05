<script lang="ts">
  import Clock from "~icons/lucide/clock";
  import { cn } from "@sv0/components/utils/shadcn";

  let {
    timeLimit,
    onTimeUp,
    class: className
  }: {
    timeLimit: number;
    onTimeUp: () => void;
    class?: string;
  } = $props();

  let timeRemaining = $state(timeLimit);

  $effect(() => {
    const timer = setInterval(() => {
      timeRemaining -= 1;
      if (timeRemaining <= 0) {
        onTimeUp();
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
</script>

<div class={cn("flex items-center gap-2", className)}>
  <Clock class="h-4 w-4" />
  <span
    class={`
    font-mono
    ${timeRemaining < 60 ? "text-red-600" : ""}
  `}>
    {formatTime(timeRemaining)}
  </span>
</div>
