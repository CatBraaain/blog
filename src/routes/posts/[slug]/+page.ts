import type { Component } from "svelte";
import type { PostMeta } from "$/lib/post-meta";

const modules = Object.values(import.meta.glob("$content/**/index.md"));

export async function load({ params }) {
  const module = (await Promise.all(modules.map((m) => m()))).find(
    (m) => m.meta.slug === params.slug,
  )!;

  return {
    PostContent: module.default as Component,
    postMeta: module.meta as PostMeta,
  };
}
