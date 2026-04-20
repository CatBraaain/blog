<script lang="ts">
  import { SearchQuery } from "$/lib/hooks/use-search-query";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import { clickableVariants, headingVariants } from "$style/variants";
  import IonSearchSharp from "~icons/ion/search-sharp";
</script>

<Field class="gap-4">
  <FieldLabel class={headingVariants({ type: "label" })} for="search"
    >Search</FieldLabel
  >
  <InputGroup class={clickableVariants({ type: "input", class: "px-1 gap-0" })}>
    <InputGroupInput bind:value={SearchQuery.word} placeholder="Search..." />
    <InputGroupAddon>
      <IonSearchSharp />
    </InputGroupAddon>
  </InputGroup>
</Field>
