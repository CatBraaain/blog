import type { Component } from "svelte";
import type { PostMeta } from "$/lib/post-meta";

export function load({ params }) {
  const module = Object.values(import.meta.glob("$content/**/index.md", { eager: true })).find(
    (m) => m.meta.slug === params.slug,
  )!;

  return {
    PostContent: module.default as Component,
    postMeta: module.meta as PostMeta,
  };
}
