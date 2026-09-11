import type { SiteImageData } from "./image-registry";

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
  gallery: SiteImageData[];
  seo: SeoData;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
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
