<script lang="ts">
  import CardBase from "$lib/components/CardBase.svelte";
  import {
    FieldGroup,
    FieldSeparator,
    FieldSet,
  } from "$lib/components/ui/field";
  import SearchInputField from "./SearchInputField.svelte";
</script>

<CardBase>
  <FieldSet>
    <FieldGroup>
      <SearchInputField />
      <FieldSeparator />
      <FieldSeparator />
    </FieldGroup>
  </FieldSet>
</CardBase>
