<script lang="ts">
  import { SearchQuery } from "$/lib/hooks/use-search-query";
  import Post from "$lib/components/post/Post.svelte";
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
  } from "$lib/components/ui/empty/index.js";
  import type { PostMeta } from "$lib/post-meta";
  import { cn } from "$lib/utils";
  import IonSearchSharp from "~icons/ion/search-sharp";

  let {
    postMetas,
    className,
  }: {
    postMetas: PostMeta[];
    className?: string;
  } = $props();

  const filteredPosts = $derived(() =>
    postMetas.filter(
      (post) =>
        (SearchQuery.category === undefined ||
          post.category === SearchQuery.category) &&
        (SearchQuery.tag === undefined || post.tags.includes(SearchQuery.tag)),
    ),
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
            titleLink={`/posts/${post.slug}`}
            showDescription={true}
            showImage={false}
          />
        </li>
      {/each}
    </ul>
  {:else}
    <Empty class="border border-muted border-dashed bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IonSearchSharp />
        </EmptyMedia>
        <EmptyTitle>No articles found</EmptyTitle>
        <EmptyDescription>
          Oops! No articles found. Try another search.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  {/if}
</div>
