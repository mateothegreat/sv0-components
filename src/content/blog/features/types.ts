import type { Snippet } from "svelte";

export type FeatureItem = {
  text?: string;
  tooltip?: string;
  icon?: Snippet<[FeatureItem]>;
};

export type FeatureProps = FeatureItem & {
  children?: Snippet<[FeatureItem]>;
  class?: string;
};
