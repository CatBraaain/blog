<script lang="ts">
  import BaseLayout from "$lib/components/BaseLayout.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let { PostContent, meta } = $derived(data);
</script>

<BaseLayout title="Home" description="Svelte demo app">
  <article>
    {JSON.stringify(meta, null, 2)}
    <PostContent></PostContent>
  </article>
</BaseLayout>
