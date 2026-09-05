<script lang="ts">
  import Eye from "~icons/lucide/eye";
import EyeOff from "~icons/lucide/eye-off";
import Link from "~icons/lucide/link";
  import { Password } from "@sv0/components/forms/password";
  import type { Share } from "./types";
  import { ShareVisibility } from "./types";

  let {
    data = $bindable(),
    onOptionsChange
  }: {
    data: Share;
    onOptionsChange: (data: Share) => void;
  } = $props();

  const handleOptionsChange = (newOptions: Partial<Share>) => {
    data = { ...data, ...newOptions };
    onOptionsChange?.($state.snapshot(data));
  };
</script>

<div class="space-y-3">
  <label class="flex cursor-pointer items-center justify-between">
    <div class="flex items-center gap-3">
      {#if data.visibility === ShareVisibility.PUBLIC}
        <Eye class="h-5 w-5 text-green-600 dark:text-green-400" />
        <span class="font-medium text-gray-900 dark:text-gray-100">Public sharing</span>
      {:else}
        <EyeOff class="h-5 w-5 text-orange-600 dark:text-orange-400" />
        <span class="font-medium text-gray-900 dark:text-gray-100">Private sharing</span>
      {/if}
    </div>
    <button
      onclick={() =>
        handleOptionsChange({
          visibility:
            data.visibility === ShareVisibility.PUBLIC
              ? ShareVisibility.PRIVATE
              : ShareVisibility.PUBLIC
        })}
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none {data.visibility ===
      ShareVisibility.PUBLIC
        ? 'bg-green-600'
        : 'bg-gray-300 dark:bg-gray-600'}"
      role="switch"
      aria-checked={data.visibility === ShareVisibility.PUBLIC}
      aria-label="Toggle between public and private sharing">
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {data.visibility ===
        ShareVisibility.PUBLIC
          ? 'translate-x-6'
          : 'translate-x-1'}"></span>
    </button>
  </label>

  {#if data.visibility === ShareVisibility.PRIVATE}
    <div class="space-y-2">
      <label
        for="share-password"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Password Protection
      </label>
      <div class="relative">
        <div class="flex w-full max-w-3xs flex-col gap-2">
          <Password.Root placeholder="Enter password for private access">
            <Password.Input disablePasswordAutofill>
              <Password.Copy />
              <Password.ToggleVisibility />
            </Password.Input>
            <Password.Strength />
          </Password.Root>
        </div>
      </div>
    </div>
  {/if}

  <div class="space-y-2">
    <label for="share-url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Share Link
    </label>
    <div class="relative">
      <Link class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        id="share-url"
        type="url"
        bind:value={data.url}
        placeholder="https://example.com/page"
        class="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400" />
    </div>
  </div>
</div>
