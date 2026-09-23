<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Separator from "./separator.svelte";

  const { Story } = defineMeta({
    title: "UI/Separator",
    component: Separator,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" />

<Story name="Vertical" args={{ orientation: "vertical", class: "h-16" }} />
