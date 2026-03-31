<script lang="ts">
  import { SearchQuery } from "$/lib/hooks/use-search-query";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import {
    ToggleGroup,
    ToggleGroupItem,
  } from "$lib/components/ui/toggle-group";
  import { TAG_KINDS } from "$lib/config";
  import { linkVariants } from "$lib/style/variants";
  import HeroiconsHashtag16Solid from "~icons/heroicons/hashtag-16-solid";
</script>

<Field>
  <FieldLabel for="tags">Tags</FieldLabel>
  <ToggleGroup
    type="single"
    value={SearchQuery.tag}
    variant={"default"}
    size={"default"}
    spacing={1}
    class="flex flex-col items-start gap-2"
  >
    {#each TAG_KINDS as tag}
      <ToggleGroupItem value={tag}>
        {#snippet child({ props })}
          <a
            href={SearchQuery.buildMergedHref({
              tag: SearchQuery.tag === tag ? "" : tag,
              category: undefined,
            })}
            data-active={SearchQuery.tag === tag}
            {...props}
            class={linkVariants({
              variant: "button",
              size: "auto",
              class:
                "flex w-full items-center justify-between text-foreground/90",
            })}
          >
            <div class="icon-set">
              <HeroiconsHashtag16Solid className="accent-icon-8" />
              {tag}
            </div>
            <!-- <div class="normal-icon-8">
              {(query?.word ? searchResult : posts).filter(
                (post) => post.tag === tag,
              ).length}
            </div> -->
          </a>
        {/snippet}
      </ToggleGroupItem>
    {/each}
  </ToggleGroup>
</Field>
