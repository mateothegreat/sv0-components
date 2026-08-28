<script lang="ts">
  import { ShareVisibility } from "./types";

  interface Props {
    visibility: ShareVisibility;
  }

  let { visibility }: Props = $props();
</script>

<div class="flex gap-3 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
  <div class="space-y-1">
    <h3 class="font-medium text-blue-900 dark:text-blue-100">
      {visibility === ShareVisibility.PUBLIC ? "Public" : "Private"} Share Access
    </h3>
    <p class="text-sm text-blue-700 dark:text-blue-300">
      {visibility === ShareVisibility.PUBLIC
        ? "Anyone with the link can view this content"
        : "Only people with the password can access this content"}
    </p>
  </div>
</div>
