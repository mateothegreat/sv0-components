<script lang="ts">
  import { usePropsBuilder, type WithOptionalClass } from "@sv0/components/utils/props";
  import { createStyleSet, type VariantProps } from "@sv0/stylesets";

  const {
    ...rest
  }: {
    orientation?: "vertical" | "horizontal";
  } & WithOptionalClass &
    VariantProps<typeof styleSet> = $props();

  const built = usePropsBuilder(rest).withClassMerge();

  const styleSet = createStyleSet({
    base: "bg-zinc-700 dark:bg-zinc-700/85",
    variants: {
      orientation: {
        vertical: "h-6 w-[0.5px]",
        horizontal: "h-[0.5px] w-6"
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  });

  const style = styleSet(
    {
      orientation: built.orientation
    },
    built.class
  );

  console.log(style);
</script>

<div class={style}></div>
