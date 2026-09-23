<script module lang="ts">
  import { searchResult } from "$/lib/hooks/use-search-result.svelte";
  import type { PostMeta } from "$/lib/post-meta";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import SearchResult from "./SearchResult.svelte";

  const { Story } = defineMeta({
    title: "Blocks/SearchResult",
    component: SearchResult,
    tags: ["autodocs"],
  });

  function createPostMetas(count: number): PostMeta[] {
    return Array.from({ length: count }, (_, index) => ({
      title: `Sample article ${index + 1}`,
      description: `Description of sample article ${index + 1}.`,
      category: "Tech",
      tags: ["Git"],
      createdAt: new Date(Date.UTC(2024, 0, 1 + index, 1, 30, 0)),
      updatedAt: new Date(Date.UTC(2024, 0, 1 + index, 1, 30, 0)),
      isDraft: false,
      slug: `202401010130${String(10 + index)}`,
    }));
  }
</script>

<Story
  name="Default"
  beforeEach={() => {
    searchResult.set(createPostMetas(3));
  }}
>
  <SearchResult />
</Story>

<Story
  name="SecondPage"
  beforeEach={() => {
    searchResult.set(createPostMetas(11));
  }}
  parameters={{
    sveltekit_experimental: {
      state: {
        page: { url: new URL("http://localhost:6006/?page=2") },
      },
    },
  }}
>
  <SearchResult />
</Story>

<Story
  name="Empty"
  beforeEach={() => {
    searchResult.set([]);
  }}
>
  <SearchResult />
</Story>
