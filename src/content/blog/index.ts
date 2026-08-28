import Author from "./author/author.svelte";
import { Listing } from "./listing";
import { Post } from "./post";
import type * as Types from "./types";

export const Blog = {
  Author,
  Listing,
  Post
} as const;

export type { Types };
