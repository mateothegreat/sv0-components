<script lang="ts">
  import Eye from "~icons/lucide/eye";
import EyeOff from "~icons/lucide/eye-off";
import Info from "~icons/lucide/info";
import Link from "~icons/lucide/link";
import XIcon from "~icons/lucide/x";
  import { Dialog } from "@sv0/components/interactives/dialog";
  import { Password } from "@sv0/components/password";
  import { ShareVisibility, type Share, type ShareProps } from "@sv0/components/share/types";

  let {
    data = $bindable(),
    opened,
    complete,
    open = $bindable(true)
  }: ShareProps & { open?: boolean } = $props();

  let copySuccess = $state(false);
  let copyTimeout: ReturnType<typeof setTimeout>;

  const handleOpenChange = (isOpen: boolean) => {
    open = isOpen;
    opened?.(isOpen);
  };

  const handleOptionsChange = (newOptions: Partial<Share>) => {
    data = { ...data, ...newOptions };
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      copySuccess = true;

      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }
      copyTimeout = setTimeout(() => {
        copySuccess = false;
      }, 2000);

      complete?.(data);
    } catch (error) {
      throw new Error("failed to copy link:", error);
    }
  };

  $effect(() => {
    console.log("dialog.svelte open", open);
  });

  const handleShare = () => {
    complete?.(data);
  };
</script>

<!-- <div
    class="ring-offset-background focus:ring-ring rounded-xs focus:outline-hidden [&_svg:not([class*='size-'])]:size-4.5 absolute end-3.5 top-3.5 opacity-50 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0">
    <XIcon />
    <span class="sr-only">Close</span>
  </div> -->
<Dialog.Root bind:open onOpenChange={handleOpenChange}>
  <Dialog.Header>
    <Dialog.Title>{data.title}</Dialog.Title>
    <Dialog.Close>
      <XIcon class="h-4 w-4" />
    </Dialog.Close>
  </Dialog.Header>
  <Dialog.Content>
    <div class="space-y-6">
      Info Section
      <div class="flex gap-3 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
        <Info class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
        <div class="space-y-1">
          <h3 class="font-medium text-blue-900 dark:text-blue-100">
            {data.visibility === ShareVisibility.PUBLIC ? "Public" : "Private"} Share Access
          </h3>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            {data.visibility === ShareVisibility.PUBLIC
              ? "Anyone with the link can view this content"
              : "Only people with the password can access this content"}
          </p>
        </div>
      </div>
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
      </div>
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
    <Dialog.Footer>
      <button
        onclick={handleCopy}
        class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        disabled={!data.url}>
        <Link class="h-4 w-4" />
        {copySuccess ? "Copied!" : "Copy Link"}
      </button>
      <button
        onclick={handleShare}
        class="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!data.url || (data.visibility === ShareVisibility.PRIVATE && !data.password)}>
        Share
      </button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
