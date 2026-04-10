<script lang="ts">
  import { SearchQuery } from "$/lib/hooks/use-search-query";
  import CardBase from "$lib/components/CardBase.svelte";
  import {
    FieldGroup,
    FieldSeparator,
    FieldSet,
  } from "$lib/components/ui/field";
  import { CATEGORY_KINDS, TAG_KINDS } from "$lib/config";
  import HeroiconsHashtag16Solid from "~icons/heroicons/hashtag-16-solid";
  import MdiFolderOutline from "~icons/mdi/folder-outline";
  import SearchFilterField from "./SearchFilterField.svelte";
  import SearchInputField from "./SearchInputField.svelte";
</script>

<CardBase>
  <FieldSet>
    <FieldGroup>
      <SearchInputField />
      <FieldSeparator />
      <SearchFilterField
        queryKey="category"
        label="Categories"
        itemNames={CATEGORY_KINDS}
        activeItemName={SearchQuery.category}
        icon={MdiFolderOutline}
      />
      <FieldSeparator />
      <SearchFilterField
        queryKey="tags"
        label="Tags"
        itemNames={TAG_KINDS}
        activeItemName={SearchQuery.tag}
        icon={HeroiconsHashtag16Solid}
      />
    </FieldGroup>
  </FieldSet>
</CardBase>
