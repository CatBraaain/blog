<script module lang="ts">
  import type { PostMeta } from "$/lib/post-meta";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Post from "./Post.svelte";

  const { Story } = defineMeta({
    title: "Blocks/Post",
    component: Post,
    tags: ["autodocs"],
  });

  const SAMPLE_IMAGE = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400"><rect width="800" height="400" fill="#94a3b8"/><text x="400" y="210" font-size="32" text-anchor="middle" fill="#fff">Sample image</text></svg>',
  )}`;

  const postMeta: PostMeta = {
    title: "Getting Started with SvelteKit",
    description: "A short description shown in the article list.",
    category: "Tech",
    tags: ["js/ts", "Git"],
    createdAt: new Date("2024-05-01T10:30:00+09:00"),
    updatedAt: new Date("2024-06-15T08:00:00+09:00"),
    isDraft: false,
    slug: "20240501103000",
  };
</script>

<Story
  name="List item"
  args={{
    postMeta,
    titleLink: "/posts/getting-started-with-sveltekit",
    showDescription: true,
    showImage: false,
  }}
/>

<Story
  name="List item without description"
  args={{
    postMeta: { ...postMeta, description: undefined },
    titleLink: "/posts/getting-started-with-sveltekit",
    showDescription: true,
    showImage: false,
  }}
/>

<Story
  name="List item with excerpt"
  args={{
    postMeta: { ...postMeta, description: undefined, excerpt: "A search result excerpt." },
    titleLink: "/posts/getting-started-with-sveltekit",
    showDescription: true,
    showImage: false,
  }}
/>

<Story
  name="List item with image"
  args={{
    postMeta: { ...postMeta, image: SAMPLE_IMAGE },
    titleLink: "/posts/getting-started-with-sveltekit",
    showDescription: true,
    showImage: true,
  }}
/>

<Story
  name="Standalone title"
  args={{ postMeta, titleLink: false, showDescription: false, showImage: false }}
/>
