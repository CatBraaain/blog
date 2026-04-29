<script lang="ts">
  import type { ClassValue } from "svelte/elements";
  import { SearchQuery } from "$/lib/hooks/use-search-query";
  import CardBase from "$lib/components/CardBase.svelte";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "$lib/components/ui/accordion";
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
  import { isMobile } from "$lib/hooks/is-mobile";

  let { class: className }: { class?: ClassValue } = $props();
  let openFilter = $state<string | undefined>(undefined);
</script>

{#snippet AdvancedSearch()}
  <FieldSeparator />
  <SearchFilterField
    label="Categories"
    itemNames={CATEGORY_KINDS}
    activeItemName={SearchQuery.category}
    icon={MdiFolderOutline}
  />
  <FieldSeparator />
  <SearchFilterField
    label="Tags"
    itemNames={TAG_KINDS}
    activeItemName={SearchQuery.tag}
    icon={HeroiconsHashtag16Solid}
  />
{/snippet}

<CardBase class={className} data-slot="search">
  <FieldSet>
    <FieldGroup class="gap-5">
      <SearchInputField />
      {#if !isMobile.current}
        <div class="hidden md:flex md:flex-col md:gap-5">
          {@render AdvancedSearch()}
        </div>
      {:else}
        <Accordion class="md:hidden" type="single" value={openFilter}>
          <AccordionItem>
            <AccordionTrigger class="text-muted-foreground">
              Advanced Search
            </AccordionTrigger>
            <AccordionContent>
              <div class="flex flex-col gap-5 pt-5">
                {@render AdvancedSearch()}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      {/if}
    </FieldGroup>
  </FieldSet>
</CardBase>
