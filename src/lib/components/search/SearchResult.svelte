<script lang="ts">
  import { searchResult } from "$/lib/hooks/use-search-result.svelte";
  import Post from "$lib/components/post/Post.svelte";
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
  } from "$lib/components/ui/empty/index.js";
  import { cn } from "$lib/utils";
  import IonSearchSharp from "~icons/ion/search-sharp";
</script>

<div class={cn("flex flex-col gap-5")}>
  {#if $searchResult.length > 0}
    <ul class="flex flex-col gap-5">
      {#each $searchResult as postMeta (postMeta.slug)}
        <li>
          <Post
            {postMeta}
            titleLink={`/posts/${postMeta.slug}`}
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
