import type { Component } from "svelte";
import type { PostMeta } from "./post-meta";

export const postModules = Object.values<{
  default: Component;
  meta: PostMeta;
}>(import.meta.glob("$content/**/*.md", { eager: true }));

export const postMetas = Object.values<PostMeta>(
  import.meta.glob("$content/**/*.md", { eager: true, import: "meta" }),
)
  .filter((m) => !m.isDraft)
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
