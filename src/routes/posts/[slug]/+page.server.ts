import type { EntryGenerator } from "./$types";

export const entries: EntryGenerator = () => {
  return Object.values(
    import.meta.glob("$content/**/index.md", { eager: true, import: "meta" }),
  ).map((m) => ({
    slug: m.slug,
  }));
};
