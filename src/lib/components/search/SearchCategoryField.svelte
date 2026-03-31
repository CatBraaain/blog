<script lang="ts">
  import {
    buildQueryHref,
    getSearchQuery,
    mergeSearchQuery,
  } from "$/lib/hooks/use-search-query";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import {
    ToggleGroup,
    ToggleGroupItem,
  } from "$lib/components/ui/toggle-group";
  import { CATEGORY_KINDS } from "$lib/config";
  import { linkVariants } from "$lib/style/variants";
  import MdiFolderOutline from "~icons/mdi/folder-outline";

  const query = getSearchQuery();
</script>

{#if CATEGORY_KINDS.length > 0}
  <Field>
    <FieldLabel for="categories">Categories</FieldLabel>
    <ToggleGroup
      type="single"
      value={query.category ?? ""}
      onValueChange={(newValue) => {
        mergeSearchQuery({
          category: newValue || undefined,
          tag: undefined,
        });
      }}
      variant={"default"}
      size={"default"}
      spacing={1}
      class="flex flex-col items-start gap-2"
    >
      {#each CATEGORY_KINDS as category}
        <ToggleGroupItem value={category}>
          {#snippet child({ props })}
            <a
              href={buildQueryHref({
                category: query?.category === category ? "" : category,
                tag: "",
              })}
              data-active={query?.category === category}
              {...props}
              class={linkVariants({
                variant: "button",
                size: "auto",
                class:
                  "flex w-full items-center justify-between text-foreground/90",
              })}
            >
              <div class="icon-set">
                <MdiFolderOutline className="accent-icon-8" />
                {category}
              </div>
              <!-- <div class="normal-icon-8">
                {
                  (query?.word ? searchResult : posts).filter(
                    (post) => post.category === category,
                  ).length
                }
              </div> -->
            </a>
          {/snippet}
        </ToggleGroupItem>
      {/each}
    </ToggleGroup>
  </Field>
{/if}
