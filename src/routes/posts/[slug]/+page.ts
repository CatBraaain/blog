import type { PostMeta } from "$lib/post-meta";
import { postModules } from "$lib/post-module";
import type { Component } from "svelte";

export function load({ params }) {
  const module = postModules.find((m) => m.meta.slug === params.slug)!;

  return {
    PostContent: module.default as Component,
    postMeta: module.meta as PostMeta,
  };
}
