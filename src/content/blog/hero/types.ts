export interface HeroAuthor {
  name: string;
  title: string;
  avatar: string;
}

export interface HeroFeatured {
  title: string;
  image: string;
  author: HeroAuthor;
}

export interface HeroItem {
  title: string;
  description: string;
  image: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  readMoreUrl?: string;
  featured: HeroFeatured;
  items: HeroItem[];
}