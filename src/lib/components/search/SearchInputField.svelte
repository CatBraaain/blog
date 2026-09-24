<script lang="ts">
  import { SearchQuery } from "$/lib/hooks/use-search-query";
  import { goto } from "$app/navigation";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group";
  import { headingLabel } from "$lib/style/styles";
  import IonSearchSharp from "~icons/ion/search-sharp";

  let composing: boolean = false;
  function searchInputHandler(e: Event): void {
    if (composing) return;

    const target = e.target as HTMLInputElement;
    const href = SearchQuery.buildMergedHref({ word: target.value });
    goto(href, {
      replaceState: SearchQuery.word !== "",
      keepFocus: true,
      noScroll: true,
    });
  }
</script>

<Field class="gap-4">
  <FieldLabel class={headingLabel} for="search">Search</FieldLabel>
  <InputGroup
    class="inline-flex shrink-0 items-center justify-center rounded-md text-sm outline-none transition-all border-0 shadow-none ring-0 hover:border-0 hover:shadow-none hover:ring-0 hover:bg-muted-strong disabled:cursor-not-allowed bg-muted has-focus-visible:border-0 has-focus-visible:bg-muted-strong has-[[data-slot=input-group-control]:focus-visible]:ring-0 px-1 gap-0"
  >
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
