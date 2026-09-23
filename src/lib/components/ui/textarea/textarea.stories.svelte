<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Textarea from "./textarea.svelte";

  const { Story } = defineMeta({
    title: "UI/Textarea",
    component: Textarea,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" args={{ placeholder: "Enter your message..." }} />

<Story name="WithValue" args={{ value: "Hello world" }} />

<Story name="Disabled" args={{ placeholder: "Disabled textarea", disabled: true }} />
