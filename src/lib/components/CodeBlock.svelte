<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  let {
    class: className,
    title,
    style,
    lang,
    icon,
    children,
    ...restProps
  }: {
    class?: string;
    title?: string;
    style?: string;
    lang?: string;
    icon?: string;
    children?: Snippet;
  } = $props();
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
      {#if icon}
        {@html icon}
      {/if}
      <span class="text-sm text-white">{title}</span>
    </div>
  {/if}
  {@render children?.()}
</div>
