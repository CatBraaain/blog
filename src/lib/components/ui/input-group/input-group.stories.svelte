<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LucideSearch from "~icons/lucide/search";

  import InputGroupAddon from "./input-group-addon.svelte";
  import InputGroupButton from "./input-group-button.svelte";
  import InputGroupInput from "./input-group-input.svelte";
  import InputGroupText from "./input-group-text.svelte";
  import InputGroupTextarea from "./input-group-textarea.svelte";
  import InputGroup from "./input-group.svelte";

  const { Story } = defineMeta({
    title: "UI/InputGroup",
    component: InputGroup,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" asChild>
  <InputGroup>
    <InputGroupAddon>
      <LucideSearch />
    </InputGroupAddon>
    <InputGroupInput placeholder="Search..." />
  </InputGroup>
</Story>

<Story name="WithButton" asChild>
  <InputGroup>
    <InputGroupAddon>
      <LucideSearch />
    </InputGroupAddon>
    <InputGroupInput placeholder="Search documentation..." />
    <InputGroupAddon align="inline-end">
      <InputGroupButton>Go</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</Story>

<Story name="WithTextarea" asChild>
  <InputGroup>
    <InputGroupAddon align="block-start">
      <InputGroupText>Comment</InputGroupText>
    </InputGroupAddon>
    <InputGroupTextarea placeholder="Write your comment..." />
  </InputGroup>
</Story>
