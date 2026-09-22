import { cp, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

import { $ } from "bun";

const clientDir = ".pagefind-client";

// Build the site-independent pagefind client from a seed page,
// so vite can bundle it as part of the site JS.
if (process.argv[2] === "client") {
  await $`pagefind --site scripts/pagefind-seed --output-path ${clientDir}`.quiet();
} else {
  // Build the search index from the built pages and place only index
  // data files; the client JS is bundled into the site instead.
  await $`pagefind -s .svelte-kit`.quiet();
  for (const dest of ["static/pagefind", "dist/pagefind"]) {
    await rm(dest, { recursive: true, force: true });
    await cp(".svelte-kit/pagefind", dest, { recursive: true });
    for (const entry of await readdir(dest)) {
      const isData =
        entry === "pagefind-entry.json" ||
        entry === "index" ||
        entry === "fragment" ||
        entry.startsWith("wasm") ||
        entry.endsWith(".pf_meta");
      if (!isData) await rm(join(dest, entry), { recursive: true, force: true });
    }
  }
}
