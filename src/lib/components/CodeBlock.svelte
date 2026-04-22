<script lang="ts">
  import type { Snippet } from "svelte";
  import { clickableVariants } from "$lib/style/variants";
  import { cn } from "$lib/utils";
  import LucideCopy from "~icons/lucide/copy";
  import LucideCopyCheck from "~icons/lucide/copy-check";
  import LucideCopyX from "~icons/lucide/copy-x";

  let {
    class: className,
    title,
    style,
    lang,
    icon,
    source,
    children,
    ...restProps
  }: {
    class?: string;
    title?: string;
    style?: string;
    lang?: string;
    icon?: string;
    source?: string;
    children?: Snippet;
  } = $props();

  let copyButtonState = $state<"idle" | "success" | "error">("idle");
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
  {#if title || icon}
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
        {#if title}
          <span class="text-white leading-none">{title}</span>
        {/if}
      </div>
      <div class="bg-black flex-1 border-l border-b border-white/15"></div>
    </div>
  {/if}
  <div class="relative">
    <button
      type="button"
      class={clickableVariants({
        type: "icon",
        class: [
          "absolute top-2 right-2",
          copyButtonState === "success" && "animate-pop",
          copyButtonState === "error" && "animate-shake",
        ],
      })}
      aria-label="Copy code"
      onclick={async () => {
        try {
          await navigator.clipboard.writeText(source || "");
          copyButtonState = "idle";
          requestAnimationFrame(() => {
            copyButtonState = "success";
          });
        } catch {
          copyButtonState = "idle";
          requestAnimationFrame(() => {
            copyButtonState = "error";
          });
        }
      }}
      onpointerleave={() => {
        copyButtonState = "idle";
      }}
    >
      {#if copyButtonState === "idle"}
        <LucideCopy class="size-6" />
      {/if}
      {#if copyButtonState === "success"}
        <LucideCopyCheck class="size-6" />
      {/if}
      {#if copyButtonState === "error"}
        <LucideCopyX class="size-6" />
      {/if}
    </button>
    {@render children?.()}
  </div>
</div>
