<script lang="ts">
  import { cn, type WithoutChild } from "$lib/utils.js";
  import { Accordion as AccordionPrimitive } from "bits-ui";
  import LucideChevronDown from "~icons/lucide/chevron-down";
  import LucideChevronUp from "~icons/lucide/chevron-up";

  let {
    ref = $bindable(null),
    class: className,
    level = 3,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.TriggerProps> & {
    level?: AccordionPrimitive.HeaderProps["level"];
  } = $props();
</script>

<AccordionPrimitive.Header {level} class="flex">
  <AccordionPrimitive.Trigger
    data-slot="accordion-trigger"
    bind:ref
    class={cn(
      "focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground rounded-md text-left text-sm font-medium focus-visible:ring-3 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
    <LucideChevronDown
      data-slot="accordion-trigger-icon"
      class="cn-accordion-trigger-icon pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
    />
    <LucideChevronUp
      data-slot="accordion-trigger-icon"
      class="cn-accordion-trigger-icon pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
    />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
