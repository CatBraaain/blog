<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { ModeWatcher } from "mode-watcher";

  import ThemeSwitch from "./ThemeSwitch.svelte";

  const { Story } = defineMeta({
    title: "Parts/ThemeSwitch",
    component: ThemeSwitch,
    tags: ["autodocs"],
  });
</script>

<!-- ThemeSwitch only reads mode/toggleMode; ModeWatcher is required to initialize
     the mode state and apply the `dark` class to <html> inside Storybook. -->
<Story name="Default" asChild>
  <div class="p-4">
    <ModeWatcher defaultMode="dark" />
    <ThemeSwitch />
  </div>
</Story>
