<script lang="ts">
  import { page } from "$app/state";
  import CardBase from "$lib/components/CardBase.svelte";
  import { clickableVariants } from "$style/variants";
  import LaHome from "~icons/la/home";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import ThemeSwitch from "./ThemeSwitch.svelte";
</script>

<header data-pagefind-ignore="all">
  <CardBase class="rounded-t-none px-5 py-4">
    <nav class="grid grid-cols-3 items-center text-xl">
      <div class="justify-self-start">
        <a
          href="/"
          class={clickableVariants({ type: "icon" })}
          aria-label="Home"
          aria-current={page.url.pathname === "/" ? "page" : undefined}
        >
          <LaHome class="size-8" />
        </a>
      </div>

      <div class="flex items-center gap-5 justify-self-center"></div>

      <div class="flex items-center gap-5 justify-self-end">
        <ThemeSwitch />
        <a
          href="https://github.com/withastro/astro"
          class={clickableVariants({ type: "icon" })}
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
