export type PostData = {
  title?: string;
  description?: string;
  date?: string;
  tags?: PostTag[];
  href?: string;
};

export type PostTag = {
  label: string;
  href: string;
  variant?: "outline" | "default";
};
