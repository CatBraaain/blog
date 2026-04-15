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
  import { Pagination } from "$lib/components/ui/pagination";
  import { useCurrentPage } from "$lib/hooks/use-pagination";
  import { cn } from "$lib/utils";
  import IonSearchSharp from "~icons/ion/search-sharp";

  const currentPage = $derived(useCurrentPage());
  const postPerPage = 10;
  const totalPage = $derived(Math.ceil($searchResult.length / postPerPage));
  const pagedResult = $derived(
    $searchResult.slice(
      (currentPage - 1) * postPerPage,
      currentPage * postPerPage,
    ),
  );
</script>

<div class={cn("flex flex-col gap-5")}>
  {#if $searchResult.length > 0}
    <Pagination {totalPage} {currentPage}></Pagination>
    <ul class="flex flex-col gap-5">
      {#each pagedResult as postMeta (postMeta.slug)}
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
    <Pagination {totalPage} {currentPage}></Pagination>
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
