<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Search from "./Search.svelte";

  const { Story } = defineMeta({
    title: "Blocks/Search",
    component: Search,
    tags: ["autodocs"],
  });
</script>

<Story name="Default">
  <Search />
</Story>

<Story
  name="With query"
  parameters={{
    sveltekit_experimental: {
      state: {
        page: { url: new URL("http://localhost:6006/?q=storybook%20c:Tech%20t:Git") },
      },
    },
  }}
>
  <Search />
</Story>

<Story name="Mobile" parameters={{ viewport: { defaultViewport: "mobile1" } }}>
  <Search />
</Story>
