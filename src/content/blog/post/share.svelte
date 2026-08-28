<script lang="ts">
  let {
    url,
    title,
    description = ""
  }: { url: string; title: string; description?: string } = $props();

  const shareUrl = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      case "copy":
        navigator.clipboard.writeText(url);
        return "#";
      default:
        return "#";
    }
  };
</script>

<!-- Share Buttons -->
<div class="space-y-3">
  <h3 class="text-foreground text-sm font-semibold">Share</h3>
  <div class="flex flex-col space-y-2">
    <a
      href={shareUrl("copy")}
      class="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors duration-200"
      onclick={(e) => {
        e.preventDefault();
        shareUrl("copy");
      }}>
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M13.887 3.182c.396-.037.79.081 1.091.382.3.3.419.695.382 1.091L14.997 8H16a1 1 0 110 2h-1.003l-.363 3.645c-.037.396-.082.79-.382 1.091-.3.3-.695.419-1.091.382L9.816 13.755a1.5 1.5 0 01-1.091-.382L5.362 9.91a1.5 1.5 0 010-2.121l3.363-3.364a1.5 1.5 0 011.091-.382l3.345.363 3.345.363z"
          clip-rule="evenodd"></path>
      </svg>
      Copy link
    </a>

    <a
      href={shareUrl("twitter")}
      target="_blank"
      rel="noopener noreferrer"
      class="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors duration-200">
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path
          d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
        ></path>
      </svg>
      Twitter
    </a>

    <a
      href={shareUrl("linkedin")}
      target="_blank"
      rel="noopener noreferrer"
      class="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors duration-200">
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
          clip-rule="evenodd"></path>
      </svg>
      LinkedIn
    </a>
  </div>
</div>
