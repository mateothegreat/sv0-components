<script lang="ts">
  import IconifyIcon from "@iconify/svelte";

  let { icon, size, class: className }: { icon: string; size: number; class: string } = $props();
</script>

<div class="icon">
  <IconifyIcon {icon} width={size} height={size} class={className} />
</div>
