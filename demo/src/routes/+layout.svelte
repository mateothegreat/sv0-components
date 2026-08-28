<script lang="ts">
  import "../themes/app.css";

  import { browser } from "$app/environment";
  import favicon from "../assets/favicon.svg";
  import Header from "../components/header.svelte";
  import { themeState } from "$lib/theme-store.svelte";

  let { children } = $props();

  $effect(() => {
    if (browser) {
      document.documentElement.classList.toggle("dark", themeState.isDark);
    }
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex h-screen flex-col">
  <Header />
  <div class="flex-1">
    {@render children?.()}
  </div>
  <!-- <Footer /> -->
</div>
