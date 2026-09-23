import type { Preview } from "@storybook/sveltekit";

import "../src/lib/style/global.css";
import "./docs-preview.css";

// The site defaults to the dark theme (ModeWatcher defaultMode="dark"), but the
// runtime mode falls back to the OS preference when no mode is stored. Pin
// dark mode here so stories are previewed on the production-like background
// regardless of the OS setting of whoever opens Storybook. Must run before
// mode-watcher modules are evaluated and read localStorage.
if (typeof window !== "undefined") {
  localStorage.setItem("mode-watcher-mode", "dark");
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  // Stories without BaseLayout (and therefore without ModeWatcher) still get
  // the dark theme variables this way.
  decorators: [
    (story) => {
      document.documentElement.classList.add("dark");
      return story();
    },
  ],
};

export default preview;
