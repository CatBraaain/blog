<script lang="ts">
  import type { PostMeta } from "$lib/post-meta";
  import { cn } from "$lib/utils";
  import HeroiconsHashtag16Solid from "~icons/heroicons/hashtag-16-solid";
  import LucideCalendar from "~icons/lucide/calendar";
  import LucideRefreshCw from "~icons/lucide/refresh-cw";
  import MdiFolderOutline from "~icons/mdi/folder-outline";
  import LocalTime from "./LocalTime.svelte";

  let {
    className,
    postMeta,
    showCreatedAt = true,
    showUpdatedAt = true,
    showCategory = true,
    showTags = true,
  }: {
    className?: string;
    postMeta: PostMeta;
    showCreatedAt?: boolean;
    showUpdatedAt?: boolean;
    showCategory?: boolean;
    showTags?: boolean;
  } = $props();

  const isModified = $derived(() => postMeta.updatedAt > postMeta.createdAt);
</script>

<div
  data-pagefind-ignore="all"
  class={cn("flex flex-wrap items-center gap-4", className)}
>
  {#if showCreatedAt}
    <div class="icon-set">
      <LucideCalendar class="accent-icon-8" />
      <LocalTime dt={postMeta.createdAt} />
    </div>
  {/if}
  {#if showUpdatedAt && isModified}
    <div class="icon-set">
      <LucideRefreshCw class="accent-icon-8" />
      <LocalTime dt={postMeta.updatedAt} />
    </div>
  {/if}
  {#if showCategory}
    <div class="icon-set">
      <MdiFolderOutline class="accent-icon-8" />
      {postMeta.category}
    </div>
  {/if}
  {#if showTags && postMeta.tags && postMeta.tags.length > 0}
    <div class="icon-set">
      <HeroiconsHashtag16Solid class="accent-icon-8" />
      {postMeta.tags.join(" / ")}
    </div>
  {/if}
</div>
