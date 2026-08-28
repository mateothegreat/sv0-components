<script lang="ts">
  import { Accordion as AccordionPrimitive } from "bits-ui";

  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";

  let {
    value = $bindable(),
    ...rest
  }: {
    value?: string;
    type: "single" | "multiple";
  } & WithChildren = $props();

  const built = usePropsBuilder(rest).withClassMerge(
    "border-muted/35  overflow-hidden rounded-lg border bg-black"
  );
</script>

<AccordionPrimitive.Root
  bind:value={value as never}
  data-slot="accordion"
  class={built.class}
  {...rest} />
