<script lang="ts">
  import { mode, toggleMode } from "mode-watcher";
  import { clickableVariants } from "$style/variants";
  import MaterialSymbolsDarkModeOutlineRounded from "~icons/material-symbols/dark-mode-outline-rounded";
  import MaterialSymbolsLightModeOutlineRounded from "~icons/material-symbols/light-mode-outline-rounded";

  const isDarkMode = $derived(mode.current !== "light");
</script>

<button
  type="button"
  class={clickableVariants({ type: "icon" })}
  onclick={toggleMode}
>
  <MaterialSymbolsDarkModeOutlineRounded
    class={["size-8", { hidden: isDarkMode }]}
  />
  <MaterialSymbolsLightModeOutlineRounded
    class={["size-8", { hidden: !isDarkMode }]}
  />
</button>
