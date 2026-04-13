<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import Header from "$lib/components/Header.svelte";
  import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "$lib/config";
  import type { PostMeta } from "$lib/post-meta";

  import "$lib/style/global.css";
  import "overlayscrollbars/overlayscrollbars.css";

  let {
    title = SITE_TITLE,
    description = SITE_DESCRIPTION,
    postMeta,
    children,
  }: {
    title?: string;
    description?: string;
    postMeta?: PostMeta;
    children?: any;
  } = $props();

  const canonicalUrl = $derived(new URL(page.url.pathname, SITE_URL).href);
  const url = $derived(new URL(page.url.href, SITE_URL).href);

  const pageTitle = $derived(
    title && title !== SITE_TITLE ? `${title} | ${SITE_TITLE}` : SITE_TITLE,
  );

  onMount(async () => {
    const { OverlayScrollbars, ClickScrollPlugin } =
      await import("overlayscrollbars");
    OverlayScrollbars.plugin(ClickScrollPlugin);
    OverlayScrollbars(document.body, {
      scrollbars: {
        clickScroll: true,
      },
    });
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="title" content={pageTitle} />
  {#if description}
    <meta name="description" content={description} />
  {/if}

  <link rel="canonical" href={canonicalUrl} />

  <!-- OG -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={pageTitle} />
  {#if description}
    <meta property="og:description" content={description} />
  {/if}
  <!-- TODO: add image -->

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={pageTitle} />
  {#if description}
    <meta property="twitter:description" content={description} />
  {/if}
  <!-- TODO: add image -->

  {#if postMeta}
    <meta
      data-pagefind-meta={`createdAt:${postMeta.createdAt.toISOString()}`}
    />
    <meta data-pagefind-meta={`slug:${postMeta.slug}`} />
  {/if}
</svelte:head>

<div class="max-w-5xl mx-auto flex flex-col gap-5 px-5 pb-5">
  <Header />
  <main>
    {@render children()}
  </main>
</div>
