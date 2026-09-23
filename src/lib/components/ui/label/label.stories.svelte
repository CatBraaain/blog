<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Label from "./label.svelte";

  const { Story } = defineMeta({
    title: "UI/Label",
    component: Label,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" args={{ for: "email" }}>Email</Story>
