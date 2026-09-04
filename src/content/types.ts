export type SeoData = {
  title: string;
  description: string;
  keywords?: string[];
};

export type CatalogItem = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  features: string[];
  gallery: string[];
  seo: SeoData;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  image: string;
  paragraphs: string[];
  seo: SeoData;
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  features: string[];
  seo: SeoData;
};

export interface ContentRepository {
  getCatalogItems(): Promise<CatalogItem[]>;
  getCatalogItem(slug: string): Promise<CatalogItem | null>;
  getArticles(): Promise<Article[]>;
  getArticle(slug: string): Promise<Article | null>;
}
