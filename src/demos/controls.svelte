<script lang="ts">
  import { Select } from "@sv0/components/forms/select";
  import { usePropsBuilder, type WithChildren } from "@sv0/components/utils/props";

  const {
    ...rest
  }: {
    title: string;
    description?: string;
    selects?: {
      label: string;
      value: string;
    }[];
  } & WithChildren = $props();

  const built = usePropsBuilder(rest).withClassMerge("flex-1 space-y-4");

  let value = $state();

  $effect(() => {
    console.log(value);
  });

  const sizes = [
    { label: "Extra Small (XS)", value: "xs" },
    { label: "Small (SM)", value: "sm" },
    { label: "Medium (MD)", value: "md" },
    { label: "Large (LG)", value: "lg" }
  ];
</script>

<div class={built.class}>
  <Select.Root bind:value>
    <Select.Trigger>Select a fruit</Select.Trigger>
    <Select.Content>
      <Select.Group label="Citrus">
        <Select.Item value="orange">Orange</Select.Item>
        <Select.Item value="lemon">Lemon</Select.Item>
      </Select.Group>
      <Select.Separator />
      <Select.Group label="Berries">
        <Select.Item value="strawberry">Strawberry</Select.Item>
        <Select.Item value="blueberry">Blueberry</Select.Item>
      </Select.Group>
    </Select.Content>
  </Select.Root>
</div>
