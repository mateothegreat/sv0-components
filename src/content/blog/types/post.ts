import type { Author } from "@sv0/components/content/blog/types/author";
import type { Image } from "@sv0/components/content/blog/types/image";
import type { TableOfContentsItem } from "@sv0/components/content/blog/types/table-of-contents";

export interface Post {
  title: string;
  description?: string;
  author: Author | Author[];
  publishDate: Date;
  readingTime: number;
  category?: string;
  content?: string;
  tags?: string[];
  tableOfContents?: TableOfContentsItem[];
  cover?: Image;
}
