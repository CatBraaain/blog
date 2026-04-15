import type { Component } from "svelte";
import type { PostMeta } from "$/lib/post-meta";

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
).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
