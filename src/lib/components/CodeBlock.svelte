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
    <div class="flex text-sm">
      <div
        class={[
          "flex gap-1 px-4 py-2 h-8",
          lang === "shellsession"
            ? "w-full border-b justify-center border-white/15"
            : "w-fit",
        ]}
      >
        {#if icon}
          <span class="translate-y-[0.075em]">
            {@html icon}
          </span>
        {/if}
        <span class="text-white leading-none">{title}</span>
      </div>
      <div class="bg-black flex-1 border-l border-b border-white/15"></div>
    </div>
  {/if}
  {@render children?.()}
</div>
