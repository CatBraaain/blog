import { metaCategories, metaTags } from "./meta-rules";

export const SITE_TITLE = "site title";
export const SITE_DESCRIPTION = "site description";
export const SITE_URL = "https://example.com";

export const CATEGORY_KINDS = metaCategories;
export const TAG_KINDS = metaTags;
export const COLLECTION_NAME = {
  posts: "posts" as const,
};
