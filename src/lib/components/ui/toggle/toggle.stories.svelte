<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";

  import Toggle from "./toggle.svelte";

  const { Story } = defineMeta({
    title: "UI/Toggle",
    component: Toggle,
    tags: ["autodocs"],
    args: {
      onPressedChange: fn(),
    },
  });
</script>

<Story name="Default">Toggle</Story>

<Story name="Outline" args={{ variant: "outline" }}>Outline</Story>

<Story name="Small" args={{ size: "sm" }}>Small</Story>

<Story name="Large" args={{ size: "lg" }}>Large</Story>

<Story name="Pressed" args={{ pressed: true }}>Pressed</Story>

<Story name="Disabled" args={{ disabled: true }}>Disabled</Story>
