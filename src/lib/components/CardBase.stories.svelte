<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import CardBase from "./CardBase.svelte";

  const { Story } = defineMeta({
    title: "Parts/CardBase",
    component: CardBase,
    tags: ["autodocs"],
  });
</script>

<Story name="Default">
  <CardBase>
    <h3 class="text-lg font-bold">Card title</h3>
    <p class="mt-2 text-sm">A short description of the card content goes here.</p>
  </CardBase>
</Story>

<Story name="WithClassName">
  <CardBase class="w-80">
    <h3 class="text-lg font-bold">Fixed width card</h3>
    <p class="mt-2 text-sm">Uses the class prop to constrain the card width.</p>
  </CardBase>
</Story>
