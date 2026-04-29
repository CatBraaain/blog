import { metaCategories, metaTags } from "./meta-rules";

export const SITE_TITLE = "CatBraaain's Blog";
export const SITE_URL = "https://CatBraaain.com";

export const CATEGORY_KINDS = metaCategories;
export const TAG_KINDS = metaTags;
export const COLLECTION_NAME = {
  posts: "posts" as const,
};
