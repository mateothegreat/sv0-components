import type { Author, Feature as FeatureType, Image } from "@sv0/components/content/blog/types";
import type { Snippet } from "svelte";

export interface Feature extends FeatureType {
  title: string | Snippet;
  description: string | Snippet;
  cover: Image;
  author?: Author;
}
