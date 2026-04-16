<script lang="ts">
  import { buildPageHref } from "$lib/hooks/use-pagination";
  import { clickableVariants } from "$style/variants";
  import LucideChevronLeft from "~icons/lucide/chevron-left";
  import LucideChevronRight from "~icons/lucide/chevron-right";
  import LucideMoreHorizontal from "~icons/lucide/more-horizontal";

  type PaginationProps = {
    totalPage: number;
    currentPage: number;
  };

  let { totalPage, currentPage }: PaginationProps = $props();

  const firstPage = 1;
  const siblingCount = 2;

  const pageRange = $derived(
    Array.from({ length: totalPage }, (_, i) => i + 1),
  );
  const buttonRangeStart = $derived(
    Math.max(currentPage - siblingCount, firstPage) - 1,
  );
  const buttonRangeEnd = $derived(
    Math.min(currentPage + siblingCount, totalPage),
  );

  const buttonRange = $derived(
    pageRange.slice(buttonRangeStart, buttonRangeEnd),
  );
  const firstRestRange = $derived(pageRange.slice(0, buttonRangeStart));
  const lastRestRange = $derived(pageRange.slice(buttonRangeEnd, totalPage));
</script>

{#snippet PageItem({ targetPage }: { targetPage: number })}
  <li>
    <a
      class={clickableVariants({ variant: "icon" })}
      data-active={targetPage === currentPage}
      href={buildPageHref(targetPage)}
    >
      {targetPage}
    </a>
  </li>
{/snippet}

{#snippet PagePrevious()}
  <li>
    <a
      class={clickableVariants({
        variant: "icon",
        class: "gap-1 px-2.5 sm:pl-2.5",
      })}
      aria-label="Go to previous page"
      aria-disabled={currentPage <= firstPage}
      href={buildPageHref(currentPage - 1)}
    >
      <LucideChevronLeft class="size-4" />
    </a>
  </li>
{/snippet}

{#snippet PageNext()}
  <li>
    <a
      class={clickableVariants({
        variant: "icon",
        class: "gap-1 px-2.5 sm:pr-2.5",
      })}
      aria-label="Go to next page"
      aria-disabled={currentPage >= totalPage}
      href={buildPageHref(currentPage + 1)}
    >
      <LucideChevronRight class="size-4" />
    </a>
  </li>
{/snippet}

{#snippet Ellipsis()}
  <li>
    <span
      // TODO: use staticStyleVariants
      class={"flex size-9 items-center justify-center"}
      aria-label="More pages"
    >
      <LucideMoreHorizontal class="size-4" />
    </span>
  </li>
{/snippet}

<nav aria-label="pagination" class="mx-auto flex w-full justify-center">
  <ul class="flex flex-row items-center gap-1 w-full justify-between">
    {@render PagePrevious()}
    <div class="flex flex-row gap-1">
      {#if firstRestRange.length > 0}
        {@render PageItem({ targetPage: firstPage })}
      {/if}
      {#if firstRestRange.length >= 2}
        {@render Ellipsis()}
      {/if}
      {#each buttonRange as targetPage}
        {@render PageItem({ targetPage })}
      {/each}
      {#if lastRestRange.length >= 2}
        {@render Ellipsis()}
      {/if}
      {#if lastRestRange.length > 0}
        {@render PageItem({ targetPage: totalPage })}
      {/if}
    </div>
    {@render PageNext()}
  </ul>
</nav>
