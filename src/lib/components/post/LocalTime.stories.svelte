<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import LocalTime from "./LocalTime.svelte";

  const { Story } = defineMeta({
    title: "Parts/LocalTime",
    component: LocalTime,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" args={{ dt: new Date("2024-05-01T10:30:00+09:00") }} />
