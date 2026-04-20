import type { Component } from "svelte";
import type { PostMeta } from "./post-meta";

export const postModules = Object.values(
  import.meta.glob("$content/**/index.md", { eager: true }),
) as {
  default: Component;
  meta: PostMeta;
}[];

export const postMetas = (
  Object.values(
    import.meta.glob("$content/**/index.md", { eager: true, import: "meta" }),
  ) as PostMeta[]
)
  .filter((m) => !m.isDraft)
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
