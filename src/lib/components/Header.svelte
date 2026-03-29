<script lang="ts">
  import { page } from "$app/state";
  import CardBase from "$lib/components/CardBase.svelte";
  import LaHome from "~icons/la/home";
  import SimpleIconsGithub from "~icons/simple-icons/github";
</script>

<header data-pagefind-ignore="all">
  <CardBase class="rounded-t-none px-5 py-4">
    <nav class="grid grid-cols-3 items-center text-xl">
      <div class="justify-self-start">
        <a
          href="/"
          // TODO: use smartLinkVariants
          class="flex items-center justify-center rounded-sm text-accent-foreground size-9"
          aria-label="Home"
          aria-current={page.url.pathname === "/" ? "page" : undefined}
        >
          <LaHome class="size-8" />
        </a>
      </div>

      <div class="flex items-center gap-5 justify-self-center"></div>

      <div class="flex items-center gap-5 justify-self-end">
        <a
          href="https://github.com/withastro/astro"
          // TODO: use smartLinkVariants
          class="flex items-center justify-center rounded-sm text-accent-foreground size-9"
          aria-label="Go to Astro's GitHub repo"
          target="_blank"
          rel="noopener"
        >
          <SimpleIconsGithub class="size-8" />
        </a>
      </div>
    </nav>
  </CardBase>
</header>
