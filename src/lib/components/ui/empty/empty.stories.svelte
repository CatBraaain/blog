<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LucideSearch from "~icons/lucide/search";

  import EmptyContent from "./empty-content.svelte";
  import EmptyDescription from "./empty-description.svelte";
  import EmptyHeader from "./empty-header.svelte";
  import EmptyMedia from "./empty-media.svelte";
  import EmptyTitle from "./empty-title.svelte";
  import Empty from "./empty.svelte";

  const { Story } = defineMeta({
    title: "UI/Empty",
    component: Empty,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" asChild>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <LucideSearch />
      </EmptyMedia>
      <EmptyTitle>No results found</EmptyTitle>
      <EmptyDescription>Try a different keyword or remove some search filters.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <EmptyDescription>
        Search tips can be found in the <a href="/docs">documentation</a>.
      </EmptyDescription>
    </EmptyContent>
  </Empty>
</Story>

<Story name="Minimal" asChild>
  <Empty>
    <EmptyHeader>
      <EmptyTitle>No notifications</EmptyTitle>
      <EmptyDescription>You are all caught up. New notifications will appear here.</EmptyDescription
      >
    </EmptyHeader>
  </Empty>
</Story>
