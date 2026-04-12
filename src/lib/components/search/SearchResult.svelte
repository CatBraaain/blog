<script lang="ts">
  import { SearchQuery } from "$/lib/hooks/use-search-query";
  import Post from "$lib/components/post/Post.svelte";
  import type { PostMeta } from "$lib/post-meta";
  import { cn } from "$lib/utils";

  let {
    postMetas,
    className,
  }: {
    postMetas: PostMeta[];
    className?: string;
  } = $props();

  const filteredPosts = postMetas.filter(
    (post) =>
      (SearchQuery.category === undefined ||
        post.category === SearchQuery.category) &&
      (SearchQuery.tag === undefined || post.tags.includes(SearchQuery.tag)),
  );
</script>

<div class={cn("flex flex-col gap-5", className)}>
  {#if filteredPosts.length > 0}
    <ul class="flex flex-col gap-5">
      <!-- {#each filteredPosts as post (post.pagePath)} -->
      {#each filteredPosts as post (post.title)}
        <li>
          <Post
            postMeta={post}
            titleLink={post.pagePath}
            showDescription={true}
            showImage={false}
          />
        </li>
      {/each}
    </ul>
  {:else}
    <div
      class="flex flex-col items-center justify-center gap-4 py-12 text-center"
    >
      <div class="icon-set">
        <span class="text-muted-foreground">No articles found</span>
      </div>
      <p class="text-muted-foreground">
        Oops! No articles found. Try another search.
      </p>
    </div>
  {/if}
</div>
