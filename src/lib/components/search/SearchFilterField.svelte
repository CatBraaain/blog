<script lang="ts">
  import type { Component } from "svelte";
  import { SearchQuery } from "$/lib/hooks/use-search-query";
  import { pagefindResult } from "$/lib/hooks/use-search-result.svelte";
  import IconSet from "$lib/components/IconSet.svelte";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import {
    ToggleGroup,
    ToggleGroupItem,
  } from "$lib/components/ui/toggle-group";
  import { iconVariants } from "$lib/style/variants";
  import { cn } from "$lib/utils";
  import { clickableVariants, headingVariants } from "$style/variants";

  interface Props {
    label: "Categories" | "Tags";
    itemNames: string[];
    activeItemName: string | undefined;
    icon: Component;
  }

  let { label, itemNames, activeItemName, icon }: Props = $props();
  const [queryKey, metaKey]: ["category" | "tag", "category" | "tags"] =
    (() => {
      switch (label) {
        case "Categories":
          return ["category", "category"];
        case "Tags":
          return ["tag", "tags"];
        default:
          throw new Error(`Unknown label: ${label}`);
      }
    })();
</script>

<Field class="gap-4">
  <FieldLabel
    class={headingVariants({ type: "label" })}
    for={label.toLowerCase()}
  >
    {label}
  </FieldLabel>
  <ToggleGroup
    type="single"
    value={activeItemName}
    variant={"default"}
    size={"default"}
    spacing={1}
    class="flex flex-col items-start gap-1.5"
  >
    {#each itemNames as item}
      <ToggleGroupItem value={item}>
        {#snippet child({ props })}
          {@const Icon = icon}
          <a
            href={SearchQuery.buildMergedHref({
              ...{ category: undefined, tag: undefined },
              ...{
                [queryKey]: activeItemName === item ? undefined : item,
              },
            })}
            data-active={activeItemName === item}
            {...props}
            class={clickableVariants({
              type: "icon",
              class: ["flex w-full items-center justify-between p-0.5 h-fit"],
            })}
            data-sveltekit-noscroll
          >
            <IconSet>
              <Icon class={iconVariants({ type: "accent" })} />
              {item}
            </IconSet>
            <div class={iconVariants({ type: "normal" })}>
              {$pagefindResult.filter((postMeta) => {
                const metaItem = postMeta[metaKey];
                if (Array.isArray(metaItem)) {
                  return metaItem.includes(item);
                } else {
                  return metaItem === item;
                }
              }).length}
            </div>
          </a>
        {/snippet}
      </ToggleGroupItem>
    {/each}
  </ToggleGroup>
</Field>
