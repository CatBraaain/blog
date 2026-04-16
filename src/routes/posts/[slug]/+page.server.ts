import { postMetas } from "$lib/post-module";
import type { EntryGenerator } from "./$types";

export const entries: EntryGenerator = () => {
  return postMetas.map((m) => ({ slug: m.slug }));
};
