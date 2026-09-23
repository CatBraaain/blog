<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import MetaBelt from "./MetaBelt.svelte";

  const { Story } = defineMeta({
    title: "Parts/MetaBelt",
    component: MetaBelt,
    tags: ["autodocs"],
  });

  const postMeta = {
    title: "Getting Started with SvelteKit",
    category: "Tech",
    tags: ["js/ts", "Git"],
    createdAt: new Date("2024-05-01T10:30:00+09:00"),
    updatedAt: new Date("2024-06-15T08:00:00+09:00"),
    isDraft: false,
    slug: "20240501103000",
  };
</script>

<Story name="Default" args={{ postMeta }} />

<Story
  name="Unmodified"
  args={{
    postMeta: {
      ...postMeta,
      updatedAt: new Date("2024-05-01T10:30:00+09:00"),
    },
  }}
/>

<Story name="OnlyDates" args={{ postMeta, showCategory: false, showTags: false }} />
