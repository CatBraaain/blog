<script lang="ts">
  import type { ClassValue } from "svelte/elements";
  import { buildPageHref } from "$lib/hooks/use-pagination";
  import { clickableVariants } from "$style/variants";
  import LucideChevronLeft from "~icons/lucide/chevron-left";
  import LucideChevronRight from "~icons/lucide/chevron-right";
  import LucideMoreHorizontal from "~icons/lucide/more-horizontal";
  import { isMobile } from "$lib/hooks/is-mobile";

  type PaginationProps = {
    totalPage: number;
    currentPage: number;
    class?: ClassValue;
  };

  let { totalPage, currentPage, class: className }: PaginationProps = $props();

  const firstPage = 1;
  const siblingCount = $derived(isMobile.current ? 0 : 2);

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
      class={clickableVariants({ type: "cardIcon" })}
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
      class={clickableVariants({ type: "cardIcon" })}
      aria-label="Go to previous page"
      aria-disabled={currentPage <= firstPage}
      href={buildPageHref(currentPage - 1)}
    >
      <LucideChevronLeft class="size-6" />
    </a>
  </li>
{/snippet}

{#snippet PageNext()}
  <li>
    <a
      class={clickableVariants({ type: "cardIcon" })}
      aria-label="Go to next page"
      aria-disabled={currentPage >= totalPage}
      href={buildPageHref(currentPage + 1)}
    >
      <LucideChevronRight class="size-6" />
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

<nav
  aria-label="pagination"
  class={["mx-auto flex w-full justify-center", className]}
  data-slot="pagination"
>
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
