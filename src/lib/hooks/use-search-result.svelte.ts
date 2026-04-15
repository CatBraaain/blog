import { onMount } from "svelte";
import { writable } from "svelte/store";
import type { Pagefind } from "vite-plugin-pagefind/types";
import { postMetas } from "$lib/post";
import type { PostMeta } from "$lib/post-meta";
import { SearchQuery } from "./use-search-query";

export const searchResult = writable<PostMeta[]>(postMetas);

export function setupReactiveSearchResult() {
  let pagefind = $state<Pagefind | null>(null);
  onMount(async () => {
    const mod = (await import(
      // @ts-expect-error
      "/pagefind/pagefind.js"
    )) as Pagefind;
    await mod.init();
    pagefind = mod;
  });

  $effect(() => {
    (async () => {
      const query = SearchQuery.getSearchQuery();
      const pagefindResult = await (async () => {
        if (!pagefind) return postMetas;
        const pagefindResultPromise = await pagefind.search(query?.word || null, {
          sort: {
            ...(query?.word ? {} : { createdAt: "desc" }),
          },
        });
        const pagefindResult = await Promise.all(
          pagefindResultPromise.results.map((r) => r.data()),
        );
        return pagefindResult.map((r) => {
          const post = postMetas.find((m) => m.slug === r.meta.slug)!;
          return {
            ...post,
            excerpt: query?.word ? r.excerpt || "" : "",
          } satisfies PostMeta;
        });
      })();
      const filteredResult = pagefindResult
        .filter((post) => query.category === undefined || post.category === query.category)
        .filter((post) => query.tags === undefined || post.tags.includes(query.tags));
      searchResult.set(filteredResult);
    })();
  });
}
