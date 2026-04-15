<script lang="ts">
  import type { Component } from "svelte";
  import { SearchQuery } from "$/lib/hooks/use-search-query";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import {
    ToggleGroup,
    ToggleGroupItem,
  } from "$lib/components/ui/toggle-group";
  import { linkVariants } from "$lib/style/variants";

  interface Props {
    queryKey: "category" | "tags";
    label: "Categories" | "Tags";
    itemNames: string[];
    activeItemName: string | undefined;
    icon: Component<{ className?: string }>;
  }

  let { queryKey, label, itemNames, activeItemName, icon }: Props = $props();

  const postMetas = Object.values(
    import.meta.glob("$content/**/index.md", { eager: true, import: "meta" }),
  );
</script>

<Field>
  <FieldLabel for={label.toLowerCase()}>{label}</FieldLabel>
  <ToggleGroup
    type="single"
    value={activeItemName}
    variant={"default"}
    size={"default"}
    spacing={1}
    class="flex flex-col items-start gap-2"
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
            class={linkVariants({
              variant: "button",
              size: "auto",
              class:
                "flex w-full items-center justify-between text-foreground/90",
            })}
          >
            <div class="icon-set">
              <Icon className="accent-icon-8" />
              {item}
            </div>
            <div>
              {postMetas.filter((postMeta) => {
                const metaItem = postMeta[queryKey];
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
