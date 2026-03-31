<script lang="ts">
  import {
    getSearchQuery,
    mergeSearchQuery,
  } from "$/lib/hooks/use-search-query";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import IonSearchSharp from "~icons/ion/search-sharp";

  const { word } = getSearchQuery();
</script>

<Field>
  <FieldLabel for="search">Search</FieldLabel>
  <InputGroup>
    <InputGroupInput
      value={word}
      placeholder="Search..."
      oninput={(e) =>
        mergeSearchQuery({ word: e.currentTarget.value || undefined })}
    />
    <InputGroupAddon>
      <IonSearchSharp />
    </InputGroupAddon>
  </InputGroup>
</Field>
