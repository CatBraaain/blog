<script lang="ts">
  import { SearchQuery } from "$/lib/hooks/use-search-query";
  import { goto } from "$app/navigation";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import { clickableVariants, headingVariants } from "$style/variants";
  import IonSearchSharp from "~icons/ion/search-sharp";

  let composing: boolean = false;
  function searchInputHandler(e: Event): void {
    if (composing) return;

    const target = e.target as HTMLInputElement;
    const href = SearchQuery.buildMergedHref({ word: target.value });
    goto(href, {
      replaceState: true,
      keepFocus: true,
      noScroll: true,
    });
  }
</script>

<Field class="gap-4">
  <FieldLabel class={headingVariants({ type: "label" })} for="search">
    Search
  </FieldLabel>
  <InputGroup class={clickableVariants({ type: "input", class: "px-1 gap-0" })}>
    <InputGroupInput
      placeholder="Search..."
      value={SearchQuery.word}
      oninput={searchInputHandler}
      oncompositionstart={(e) => {
        composing = true;
      }}
      oncompositionend={(e) => {
        composing = false;
        searchInputHandler(e);
      }}
    />
    <InputGroupAddon>
      <IonSearchSharp />
    </InputGroupAddon>
  </InputGroup>
</Field>
