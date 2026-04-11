import type { EntryGenerator } from "./$types";

const modules = import.meta.glob("$content/**/index.md");

export const entries: EntryGenerator = () => {
  return Object.keys(modules).map((path) => ({ slug: path.split("/").at(-2)! }));
};
