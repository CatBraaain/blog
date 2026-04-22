<script lang="ts">
  import SearchResult from "$/lib/components/search/SearchResult.svelte";
  import {
    pagefindHydrated,
    setupReactiveSearchResult,
  } from "$/lib/hooks/use-search-result.svelte";
  import BaseLayout from "$lib/components/BaseLayout.svelte";
  import Search from "$lib/components/search/Search.svelte";

  setupReactiveSearchResult();
</script>

<BaseLayout title="Home" description="Svelte demo app">
  <div
    class={["flex gap-5", !$pagefindHydrated && "skeleton"]}
    data-pagefind-ignore="all"
  >
    <section class={"w-1/3"}>
      <Search />
    </section>
    <section class={"w-2/3"}>
      <SearchResult />
    </section>
  </div>
</BaseLayout>
