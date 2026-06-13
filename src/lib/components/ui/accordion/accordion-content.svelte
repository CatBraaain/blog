<script lang="ts">
  import { cn, type WithoutChild } from "$lib/utils.js";
  import { Accordion as AccordionPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.ContentProps> = $props();
</script>

<AccordionPrimitive.Content
  bind:ref
  data-slot="accordion-content"
  class="data-open:animate-accordion-down data-closed:animate-accordion-up text-sm"
  {...restProps}
>
  <div class={cn("", className)}>
    {@render children?.()}
  </div>
</AccordionPrimitive.Content>
