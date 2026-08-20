import { articles } from "./articles";
import { catalogItems } from "./catalog";
import type { ContentRepository } from "./types";

class LocalContentRepository implements ContentRepository {
  async getCatalogItems() { return catalogItems; }
  async getCatalogItem(slug: string) { return catalogItems.find((item) => item.slug === slug) ?? null; }
  async getArticles() { return articles; }
  async getArticle(slug: string) { return articles.find((article) => article.slug === slug) ?? null; }
}

export const contentRepository: ContentRepository = new LocalContentRepository();
