<script lang="ts">
  import { usePropsBuilder } from "@sv0/components/utils/props";
  import type { Component } from "svelte";
  import Loader from "~icons/lucide/loader";

  let {
    ...rest
  }: {
    icon?: Component;
    message?: string;
  } = $props();

  const built = usePropsBuilder(rest).withClassMerge();
</script>

<p
  class="flex h-full w-full items-center justify-center gap-1 rounded-md border border-zinc-900 py-2.5 text-sm text-indigo-500">
  {#if built.icon}
    <built.icon />
  {:else}
    <Loader class="size-4 animate-spin text-lime-400" />
  {/if}
  <span>{built.message || "Waiting for DOM to be ready"}</span>
</p>
