<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Pagination from "./pagination.svelte";

  const { Story } = defineMeta({
    title: "UI/Pagination",
    component: Pagination,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" args={{ totalPage: 10, currentPage: 5 }} />

<Story name="FirstPage" args={{ totalPage: 10, currentPage: 1 }} />

<Story name="LastPage" args={{ totalPage: 10, currentPage: 10 }} />
