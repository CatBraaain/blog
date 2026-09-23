<script module lang="ts">
  import type { PostMeta } from "$/lib/post-meta";
  import BaseLayout from "$lib/components/BaseLayout.svelte";
  import Post from "$lib/components/post/Post.svelte";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import type { Component } from "svelte";

  const { Story } = defineMeta({
    title: "Pages/Post",
    tags: ["autodocs"],
  });

  // Typography sample covering every markdown feature the pipeline supports,
  // so page composition can be reviewed without depending on real posts.
  const sampleModule = import.meta.glob<{
    default: Component;
    meta: PostMeta;
  }>("./sample-post-content.md", { eager: true })["./sample-post-content.md"]!;
  const PostContent = sampleModule.default;
  const postMeta = sampleModule.meta;
</script>

<!-- Same composition as routes/posts/[slug]/+page.svelte. -->
<Story name="Default">
  <BaseLayout title={postMeta.title} description={postMeta.description} {postMeta}>
    <Post {postMeta} {PostContent} titleLink={false} showDescription={false} showImage={true} />
  </BaseLayout>
</Story>
