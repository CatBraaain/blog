<script lang="ts">
  import PostComponent, { meta } from "$content/2026-02-07_01-06-38/index.md";
  import BaseLayout from "$lib/components/BaseLayout.svelte";
  import Search from "$lib/components/search/Search.svelte";
</script>

<BaseLayout title="Home" description="Svelte demo app">
  <div class={"flex gap-5"} data-pagefind-ignore="all">
    <section class={"w-1/3"}>
      <Search></Search>
    </section>
    <section class={"w-2/3"}>
      <!-- <PostList client:load {posts} /> -->
    </section>
    <article>
      {JSON.stringify(meta, null, 2)}
      <PostComponent></PostComponent>
    </article>
  </div>
</BaseLayout>
