<script module lang="ts">
  import { postMetas, postModules } from "$/lib/post-module";
  import BaseLayout from "$lib/components/BaseLayout.svelte";
  import Post from "$lib/components/post/Post.svelte";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const { Story } = defineMeta({
    title: "Pages/Post",
    tags: ["autodocs"],
  });

  // Render the latest published post so typography is reviewed with real content.
  const { default: PostContent, meta: postMeta } = postModules.find(
    (m) => m.meta.slug === postMetas[0].slug,
  )!;
</script>

<!-- Same composition as routes/posts/[slug]/+page.svelte. -->
<Story name="Default">
  <BaseLayout title={postMeta.title} description={postMeta.description} {postMeta}>
    <Post {postMeta} {PostContent} titleLink={false} showDescription={false} showImage={true} />
  </BaseLayout>
</Story>
