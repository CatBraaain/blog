<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  let {
    class: className,
    title,
    style,
    langId,
    children,
    ...restProps
  }: {
    class?: string;
    title?: string;
    style?: string;
    langId?: string;
    children?: Snippet;
  } = $props();

  // const iconPath = $derived(
  //   langId && languageIcons[langId] ? `~icons/${languageIcons[langId]}` : null,
  // );
</script>

<div
  class={cn(
    "overflow-hidden rounded-lg my-2",
    "[&_pre]:m-0! [&_pre]:rounded-none!",
    className,
  )}
  {style}
  {...restProps}
>
  {#if title}
    <div class="flex items-center gap-2 px-4 py-2">
      <!-- {#if iconPath}
        {@const IconComponent = iconPath}
        <svelte:component this={IconComponent} class="size-4" />
      {/if} -->
      <span class="text-sm text-white">{title}</span>
    </div>
  {/if}
  {@render children?.()}
</div>
