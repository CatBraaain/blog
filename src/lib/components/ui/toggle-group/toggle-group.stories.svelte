<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import ToggleGroupItem from "./toggle-group-item.svelte";
  import ToggleGroup from "./toggle-group.svelte";

  const { Story } = defineMeta({
    title: "UI/ToggleGroup",
    component: ToggleGroup,
    tags: ["autodocs"],
    argTypes: {
      type: { control: "radio", options: ["single", "multiple"] },
      orientation: { control: "radio", options: ["horizontal", "vertical"] },
    },
  });
</script>

<Story name="SingleSelect" args={{ type: "single", value: "left", spacing: 1 }}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</Story>

<Story name="Multiple" args={{ type: "multiple", value: ["bold", "italic"] }}>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</Story>

<Story name="Outline" args={{ type: "single", variant: "outline", spacing: 1 }}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</Story>

<Story name="Small" args={{ type: "single", size: "sm", spacing: 1 }}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</Story>

<Story name="Large" args={{ type: "single", size: "lg", spacing: 1 }}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</Story>

<Story name="Vertical" args={{ type: "single", orientation: "vertical", spacing: 1 }}>
  <ToggleGroupItem value="top">Top</ToggleGroupItem>
  <ToggleGroupItem value="middle">Middle</ToggleGroupItem>
  <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
</Story>

<Story name="Disabled" args={{ type: "single", disabled: true, spacing: 1 }}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</Story>
