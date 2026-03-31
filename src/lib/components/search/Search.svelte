<script lang="ts">
  import CardBase from "$lib/components/CardBase.svelte";
  import {
    FieldGroup,
    FieldSeparator,
    FieldSet,
  } from "$lib/components/ui/field";
  import SearchCategoryField from "./SearchCategoryField.svelte";
  import SearchInputField from "./SearchInputField.svelte";
</script>

<CardBase>
  <FieldSet>
    <FieldGroup>
      <SearchInputField />
      <FieldSeparator />
      <SearchCategoryField />
      <FieldSeparator />
    </FieldGroup>
  </FieldSet>
</CardBase>
