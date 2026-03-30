<script lang="ts">
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import IonSearchSharp from "~icons/ion/search-sharp";
</script>

<Field>
  <FieldLabel for="search">Search</FieldLabel>
  <InputGroup>
    <InputGroupInput
      // value={query?.word || ""}
      placeholder="Search..."
    />
    <InputGroupAddon>
      <IonSearchSharp />
    </InputGroupAddon>
  </InputGroup>
</Field>
