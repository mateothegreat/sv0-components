<script lang="ts">
  import { Share } from "@sv0/components/interactives/share";
  import {
    ShareVisibility,
    type Share as ShareType
  } from "@sv0/components/interactives/share/types";

  let publicShareData: ShareType = $state({
    url: "https://www.google.com",
    title: "Share this page - Public",
    visibility: ShareVisibility.PUBLIC
  });

  let privateShareData: ShareType = $state({
    url: "https://www.google.com",
    title: "Share this page - Private",
    visibility: ShareVisibility.PRIVATE,
    password: "test123"
  });

  let ghostShareData: ShareType = $state({
    url: "https://www.google.com",
    title: "Share this page - Ghost",
    visibility: ShareVisibility.PUBLIC
  });

  const handleShare = (data: ShareType) => {
    console.log("Share completed:", data);
  };
</script>

<div class="flex justify-evenly gap-2 p-4">
  <div class="flex flex-col items-center gap-5">
    <Share.Root>
      <Share.Title>
        <h1>Share</h1>
      </Share.Title>
      <Share.Content data={publicShareData} onOptionsChange={handleShare} />
      <Share.Footer>
        <button>Copy</button>
      </Share.Footer>
    </Share.Root>
  </div>
</div>
