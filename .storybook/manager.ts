import { addons } from "storybook/manager-api";

addons.setConfig({
  // Hide the addon panel
  layoutCustomisations: {
    showPanel: () => false,
  },
  // Hide the Storybook title in the toolbar
  toolbar: {
    title: { hidden: true },
  },
  // Hide the root heading in the sidebar
  sidebar: {
    showRoots: false,
  },
});
