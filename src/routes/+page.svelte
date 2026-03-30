<script lang="ts">
  import BaseLayout from "$lib/components/BaseLayout.svelte";
</script>

<BaseLayout title="Home" description="Svelte demo app">
  <div class={"flex gap-5"} data-pagefind-ignore="all">
    <section class={"w-1/3"}>
      <!-- <Search client:load {posts} /> -->
    </section>
    <section class={"w-2/3"}>
      <!-- <PostList client:load {posts} /> -->
    </section>
  </div>
</BaseLayout>
