import type { Component } from "svelte";
import type { PostMeta } from "$/lib/post";
import { postModules } from "$lib/post";

export function load({ params }) {
  const module = postModules.find((m) => m.meta.slug === params.slug)!;

  return {
    PostContent: module.default as Component,
    postMeta: module.meta as PostMeta,
  };
}
