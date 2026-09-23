<script module lang="ts">
  import { searchResult } from "$/lib/hooks/use-search-result.svelte";
  import type { PostMeta } from "$/lib/post-meta";
  import BaseLayout from "$lib/components/BaseLayout.svelte";
  import Search from "$lib/components/search/Search.svelte";
  import SearchResult from "$lib/components/search/SearchResult.svelte";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const { Story } = defineMeta({
    title: "Pages/Home",
    tags: ["autodocs"],
  });

  // Same sample factory as Blocks/SearchResult.
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

<!-- Same composition as routes/+page.svelte, without the pagefind hydration state. -->
<Story
  name="Default"
  beforeEach={() => {
    searchResult.set(createPostMetas(12));
  }}
>
  <BaseLayout title="Home" description="CatBraaain's personal blog site">
    <div class="flex flex-col md:flex-row gap-5">
      <section class="w-full md:w-1/3">
        <Search />
      </section>
      <section class="w-full md:w-2/3">
        <SearchResult />
      </section>
    </div>
  </BaseLayout>
</Story>
