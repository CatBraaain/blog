import type { EntryGenerator } from "./$types";

const modules = Object.values(import.meta.glob("$content/**/index.md"));

export const entries: EntryGenerator = async () => {
  return (await Promise.all(modules.map((m) => m()))).map((m) => ({ slug: m.meta.slug }));
};
