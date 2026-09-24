<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-slot="card" class={cn("rounded-lg bg-card p-6", className)} {...restProps}>
  {@render children?.()}
</div>
