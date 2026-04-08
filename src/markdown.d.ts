declare module "*.md" {
  import type { Component } from "svelte";
  const component: Component;
  export default component;
  export const meta: Record<string, any>;
}
