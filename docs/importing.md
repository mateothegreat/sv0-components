# Importing

### Importing components and types together (recommended)

```ts
<script lang="ts">
  import { Blog, Types } from "@sv0/components/blog";
</script>
```

### Importing components and types separately

```ts
<script lang="ts">
  import { Blog } from "@sv0/components/blog";
  import type * as Types from "@sv0/components/blog/types";
</script>
```
