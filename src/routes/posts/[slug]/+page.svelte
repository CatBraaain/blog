<script lang="ts">
  import Post from "$/lib/components/post/Post.svelte";
  import BaseLayout from "$lib/components/BaseLayout.svelte";

  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let { PostContent, postMeta } = $derived(data);
</script>

<BaseLayout title={postMeta.title} description={postMeta.description} {postMeta}>
  <Post {postMeta} {PostContent} titleLink={false} showDescription={false} showImage={true} />
</BaseLayout>
