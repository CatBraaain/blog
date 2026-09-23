<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";

  import Button from "./button.svelte";

  const { Story } = defineMeta({
    title: "UI/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
      onclick: fn(),
    },
  });
</script>

<Story name="Default">Button</Story>

<Story name="Secondary" args={{ variant: "secondary" }}>Secondary</Story>

<Story name="Outline" args={{ variant: "outline" }}>Outline</Story>

<Story name="Ghost" args={{ variant: "ghost" }}>Ghost</Story>

<Story name="Destructive" args={{ variant: "destructive" }}>Destructive</Story>

<Story name="Link" args={{ variant: "link" }}>Link</Story>

<Story name="Small" args={{ size: "sm" }}>Small</Story>

<Story name="Large" args={{ size: "lg" }}>Large</Story>

<Story name="XS" args={{ size: "xs" }}>Extra small</Story>

<Story name="IconXS" args={{ size: "icon-xs", "aria-label": "Circle" }}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
</Story>

<Story name="IconSM" args={{ size: "icon-sm", "aria-label": "Circle" }}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
</Story>

<Story name="IconLG" args={{ size: "icon-lg", "aria-label": "Circle" }}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
</Story>

<Story name="Icon" args={{ size: "icon", "aria-label": "Circle" }}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
</Story>

<Story name="Disabled" args={{ disabled: true }}>Disabled</Story>

<Story name="AsLink" args={{ href: "#" }}>Anchor</Story>
