<script lang="ts">
  const randomText = (words: number) => {
    const text = [];
    for (let i = 0; i < words; i++) {
      text.push(Math.random().toString(36).substring(2, 15));
    }
    return text.join(" ");
  };
</script>

<div class="m-2 flex flex-col gap-2">
  <p class="text-xs">text-xs: {randomText(5)}</p>
  <p class="text-sm">text-sm: {randomText(5)}</p>
  <p class="text-base">text-base: {randomText(5)}</p>
  <p class="text-md">text-md: {randomText(5)}</p>
  <p class="text-lg">text-lg: {randomText(5)}</p>
  <p class="text-xl">text-xl: {randomText(5)}</p>
  <p class="text-2xl">text-2xl: {randomText(5)}</p>
  <p class="text-3xl">text-3xl: {randomText(5)}</p>
  <p class="text-4xl">text-4xl: {randomText(5)}</p>
  <p class="text-5xl">text-5xl: {randomText(5)}</p>
</div>
