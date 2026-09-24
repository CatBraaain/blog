<script lang="ts">
  import { page } from "$app/state";
  import CardBase from "$lib/components/CardBase.svelte";
  import { clickableIcon } from "$lib/style/styles";
  import LaHome from "~icons/la/home";
  import SimpleIconsGithub from "~icons/simple-icons/github";

  import ThemeSwitch from "./ThemeSwitch.svelte";
</script>

<header data-pagefind-ignore="all">
  <CardBase class="rounded-t-none px-6 py-4">
    <nav class="grid grid-cols-3 items-center text-xl">
      <div class="justify-self-start">
        <a
          href="/"
          aria-label="Home"
          aria-current={page.url.pathname === "/" ? "page" : undefined}
          class={clickableIcon}
        >
          <LaHome class="size-8" />
        </a>
      </div>

      <div class="col-start-3 flex items-center gap-5 justify-self-end">
        <ThemeSwitch />
        <a
          href="https://github.com/CatBraaain/blog"
          aria-label="GitHub repo of this blog"
          target="_blank"
          rel="noopener"
          class={clickableIcon}
        >
          <SimpleIconsGithub class="size-8" />
        </a>
      </div>
    </nav>
  </CardBase>
</header>
