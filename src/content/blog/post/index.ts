import Author from "../author/author.svelte";
import Body from "./body.svelte";
import Content from "./content.svelte";
import Cover from "./cover.svelte";
import Header from "./header.svelte";
import Root from "./root.svelte";
import Share from "./share.svelte";
import Sidenav from "./sidenav.svelte";
import TableOfContents from "./table-of-contents.svelte";
import Tagline from "./tagline.svelte";
import Title from "./title.svelte";

export type * from "./types";

export const Post = {
  Author,
  Cover,
  Title,
  Body,
  Header,
  Content,
  Tagline,
  Root,
  Sidenav,
  Share,
  TableOfContents
};
