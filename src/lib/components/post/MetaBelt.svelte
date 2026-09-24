<script lang="ts">
  import IconSet from "$lib/components/IconSet.svelte";
  import type { PostMeta } from "$lib/post-meta";
  import { iconAccent } from "$lib/style/styles";
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

  const isModified = $derived(postMeta.updatedAt > postMeta.createdAt);
</script>

<div data-pagefind-ignore="all" class={cn("flex flex-wrap items-center gap-4", className)}>
  {#if showCreatedAt}
    <IconSet>
      <LucideCalendar class={iconAccent} />
      <LocalTime dt={postMeta.createdAt} />
    </IconSet>
  {/if}
  {#if showUpdatedAt && isModified}
    <IconSet>
      <LucideRefreshCw class={iconAccent} />
      <LocalTime dt={postMeta.updatedAt} />
    </IconSet>
  {/if}
  {#if showCategory}
    <IconSet>
      <MdiFolderOutline class={iconAccent} />
      {postMeta.category}
    </IconSet>
  {/if}
  {#if showTags && postMeta.tags && postMeta.tags.length > 0}
    <IconSet>
      <HeroiconsHashtag16Solid class={iconAccent} />
      {postMeta.tags.join(" / ")}
    </IconSet>
  {/if}
</div>
