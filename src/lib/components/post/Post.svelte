<script lang="ts">
  import type { Component } from "svelte";
  import type { PostMeta } from "$/lib/post-meta";
  import BaseLayout from "$lib/components/BaseLayout.svelte";
  import CardBase from "$lib/components/CardBase.svelte";

  let {
    postMeta,
    PostContent,
  }: { postMeta: PostMeta; PostContent: Component } = $props();
</script>

<CardBase>
  <article class="flex flex-col">
    <div class="flex flex-col gap-4">
      <h1>
        {postMeta.title}
      </h1>
      <!-- <MetaBelt {post} showUpdatedAt={false} /> -->
    </div>
    <div class="m-0"></div>
    <PostContent />
  </article>
</CardBase>
