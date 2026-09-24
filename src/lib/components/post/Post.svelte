<script lang="ts">
  import BaseLayout from "$lib/components/BaseLayout.svelte";
  import CardBase from "$lib/components/CardBase.svelte";
  import type { PostMeta } from "$lib/post-meta";
  import { clickableVariants, headingVariants } from "$style/variants";
  import type { Component } from "svelte";
  import type { ClassValue } from "svelte/elements";

  import MetaBelt from "./MetaBelt.svelte";

  let {
    postMeta,
    PostContent,
    titleLink,
    showDescription,
    showImage,
    class: className,
  }: {
    postMeta: PostMeta;
    PostContent?: Component;
    titleLink?: string | false;
    showDescription: boolean;
    showImage: boolean;
    class?: ClassValue;
  } = $props();
  const description = $derived(postMeta.description || postMeta.excerpt || "");
</script>

<CardBase data-slot="post-card" class={className}>
  <article class="flex flex-col">
    <div class="border-b border-border pb-3">
      <h1 class={headingVariants({ type: "h1" })}>
        {#if titleLink}
          <a href={titleLink} class={clickableVariants({ type: "link" })}>
            {postMeta.title}
          </a>
        {:else}
          {postMeta.title}
        {/if}
      </h1>
      <div class="mt-2">
        <MetaBelt {postMeta} showUpdatedAt={false} />
      </div>
    </div>
    <div class="mt-3 flex flex-col gap-3">
      {#if showDescription && description}
        <div class="not-prose m-0 text-sm text-content-foreground">
          {@html description}
        </div>
      {/if}
      {#if showImage && postMeta.image}
        <div class="not-prose">
          <img class="w-full rounded-lg shadow-sm" src={postMeta.image} alt="" />
        </div>
      {/if}
      <PostContent />
    </div>
  </article>
</CardBase>
