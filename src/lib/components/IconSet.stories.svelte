<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import IconSet from "./IconSet.svelte";

  const { Story } = defineMeta({
    title: "Parts/IconSet",
    component: IconSet,
    tags: ["autodocs"],
  });

  // Stand-in for the icon components normally provided by ~icons at build time.
  const calendarIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>`;
</script>

<Story name="Default">
  <IconSet>
    <span class="text-primary">{@html calendarIcon}</span>
    <span>2024-05-01</span>
  </IconSet>
</Story>

<Story name="Compact">
  <IconSet class="text-sm">
    <span class="text-primary">{@html calendarIcon}</span>
    <span>2024-05-01</span>
  </IconSet>
</Story>
