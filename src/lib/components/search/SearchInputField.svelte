<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
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
      value={page.url.searchParams.get("q")}
      placeholder="Search..."
      oninput={(e) => {
        page.url.searchParams.set("q", e.currentTarget.value);
        goto(`?${page.url.searchParams}`, {
          replaceState: true,
          keepFocus: true,
          noScroll: true,
        });
      }}
    />
    <InputGroupAddon>
      <IonSearchSharp />
    </InputGroupAddon>
  </InputGroup>
</Field>
