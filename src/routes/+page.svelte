<script lang="ts">
  import SearchResult from "$/lib/components/search/SearchResult.svelte";
  import BaseLayout from "$lib/components/BaseLayout.svelte";
  import Search from "$lib/components/search/Search.svelte";
  import { postMetas } from "$lib/post";
</script>

<BaseLayout title="Home" description="Svelte demo app">
  <div class={"flex gap-5"} data-pagefind-ignore="all">
    <section class={"w-1/3"}>
      <Search></Search>
    </section>
    <section class={"w-2/3"}>
      <SearchResult {postMetas} />
    </section>
  </div>
</BaseLayout>
