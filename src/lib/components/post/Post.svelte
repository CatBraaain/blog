<script lang="ts">
  import type { Component } from "svelte";
  import BaseLayout from "$lib/components/BaseLayout.svelte";
  import CardBase from "$lib/components/CardBase.svelte";
  import type { PostMeta } from "$lib/post-meta";
  import { clickableVariants, headingVariants } from "$style/variants";
  import MetaBelt from "./MetaBelt.svelte";

  let {
    postMeta,
    PostContent,
    titleLink,
    showDescription,
    showImage,
  }: {
    postMeta: PostMeta;
    PostContent?: Component;
    titleLink?: string | false;
    showDescription: boolean;
    showImage: boolean;
  } = $props();
  const description = $derived(postMeta.description || postMeta.excerpt || "");
</script>

<CardBase>
  <article class="flex flex-col">
    <div class={["flex flex-col gap-4", { "mb-5": !!PostContent }]}>
      <h1 class={headingVariants({ variant: "h1" })}>
        {#if titleLink}
          <a href={titleLink} class={clickableVariants({ variant: "link" })}>
            {postMeta.title}
          </a>
        {:else}
          {postMeta.title}
        {/if}
      </h1>
      <MetaBelt {postMeta} showUpdatedAt={false} />
      {#if showDescription && description}
        <div class="m-0">
          {@html description}
        </div>
      {/if}
      {#if showImage && postMeta.image}
        <div class="not-prose">
          <img
            class="w-full rounded-lg shadow-sm"
            src={postMeta.image}
            alt=""
          />
        </div>
      {/if}
    </div>
    <PostContent class="mt-5" />
  </article>
</CardBase>
