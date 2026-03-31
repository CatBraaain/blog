import { goto } from "$app/navigation";
import { page } from "$app/state";

export type SearchQuery = {
  word?: string;
  category?: string;
  tag?: string;
};

export function getSearchQuery(): SearchQuery {
  const tokens = page.url.searchParams.get("q")?.split(" ") ?? [];
  const categoryTokens = tokens.filter((e) => e.startsWith("c:"));
  const tagTokens = tokens.filter((e) => e.startsWith("t:"));
  const word = tokens
    .filter((e) => ![...categoryTokens, ...tagTokens].includes(e))
    .join(" ");
  return {
    word,
    category: categoryTokens.at(0)?.slice(2),
    tag: tagTokens.at(0)?.slice(2),
  };
}

export function mergeSearchQuery(
  update: SearchQuery,
  history: "push" | "replace" = "push",
) {
  const current = getSearchQuery();
  const merged = { ...current, ...update };
  const serialized = serializeSearchQuery(merged);
  if (serialized) {
    page.url.searchParams.set("q", serialized);
  } else {
    page.url.searchParams.delete("q");
  }
  goto(`?${page.url.searchParams.toString().replaceAll("%3A", ":")}`, {
    replaceState: history === "replace",
    keepFocus: true,
    noScroll: true,
  });
}

export function serializeSearchQuery(query: SearchQuery): string | null {
  const parts = [
    query.word,
    query.category ? `c:${encodeURIComponent(query.category)}` : "",
    query.tag ? `t:${encodeURIComponent(query.tag)}` : "",
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : null;
}
