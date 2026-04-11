import type { Component } from "svelte";
import type { PostMeta } from "$/lib/post-meta";

export async function load({ params }) {
  const module = await import(`$content/${params.slug}/index.md`);

  return {
    PostContent: module.default as Component,
    meta: module.meta as PostMeta,
  };
}
