<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import AccordionContent from "./accordion-content.svelte";
  import AccordionItem from "./accordion-item.svelte";
  import AccordionTrigger from "./accordion-trigger.svelte";
  import Accordion from "./accordion.svelte";

  const items = [
    {
      value: "item-1",
      trigger: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      value: "item-2",
      trigger: "Is it styled?",
      content: "Yes. It ships with default styles that match the other components.",
    },
    {
      value: "item-3",
      trigger: "Is it animated?",
      content: "Yes. It opens and closes with the accordion animations.",
    },
  ];

  const { Story } = defineMeta({
    title: "UI/Accordion",
    component: Accordion,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" asChild>
  <Accordion type="single" value="item-1">
    {#each items as item (item.value)}
      <AccordionItem value={item.value}>
        <AccordionTrigger>{item.trigger}</AccordionTrigger>
        <AccordionContent value={item.value}>{item.content}</AccordionContent>
      </AccordionItem>
    {/each}
  </Accordion>
</Story>

<Story name="Multiple" asChild>
  <Accordion type="multiple" value={["item-1", "item-3"]}>
    {#each items as item (item.value)}
      <AccordionItem value={item.value}>
        <AccordionTrigger>{item.trigger}</AccordionTrigger>
        <AccordionContent value={item.value}>{item.content}</AccordionContent>
      </AccordionItem>
    {/each}
  </Accordion>
</Story>

<Story name="Disabled" asChild>
  <Accordion type="single" value="item-2" disabled>
    {#each items as item (item.value)}
      <AccordionItem value={item.value}>
        <AccordionTrigger>{item.trigger}</AccordionTrigger>
        <AccordionContent value={item.value}>{item.content}</AccordionContent>
      </AccordionItem>
    {/each}
  </Accordion>
</Story>
