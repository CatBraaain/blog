<script lang="ts">
  import CardBase from "$lib/components/CardBase.svelte";
  import {
    FieldGroup,
    FieldSeparator,
    FieldSet,
  } from "$lib/components/ui/field";
  import SearchCategoryField from "./SearchCategoryField.svelte";
  import SearchInputField from "./SearchInputField.svelte";
  import SearchTagField from "./SearchTagField.svelte";
</script>

<CardBase>
  <FieldSet>
    <FieldGroup>
      <SearchInputField />
      <FieldSeparator />
      <SearchCategoryField />
      <FieldSeparator />
      <SearchTagField />
    </FieldGroup>
  </FieldSet>
</CardBase>
