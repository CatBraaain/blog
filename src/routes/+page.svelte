<script lang="ts">
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class:list={["flex", "gap-5"]} data-pagefind-ignore="all">
  <section class:list={["w-1/3"]}>
    <!-- <Search client:load {posts} /> -->
  </section>
  <section class:list={["w-2/3"]}>
    <!-- <PostList client:load {posts} /> -->
  </section>
</div>
