<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Input from "./input.svelte";

  const { Story } = defineMeta({
    title: "UI/Input",
    component: Input,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" args={{ placeholder: "Enter text..." }} />

<Story name="WithValue" args={{ value: "Hello world" }} />

<Story name="Disabled" args={{ placeholder: "Disabled input", disabled: true }} />

<Story name="File" args={{ type: "file" }} />
