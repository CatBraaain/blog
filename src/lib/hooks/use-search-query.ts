import { building } from "$app/environment";
import { goto } from "$app/navigation";
import { page } from "$app/state";

export type SearchQueryStruct = {
  word?: string;
  category?: string;
  tag?: string;
};

export class SearchQuery {
  static get word() {
    return SearchQuery.getSearchQuery().word;
  }
  static get category() {
    return SearchQuery.getSearchQuery().category;
  }
  static get tag() {
    return SearchQuery.getSearchQuery().tag;
  }

  static set word(value) {
    const href = SearchQuery.buildMergedHref({ word: value });
    goto(href, {
      replaceState: true,
      keepFocus: true,
      noScroll: true,
    });
  }

  public static getSearchQuery(): SearchQueryStruct {
    const queryParam = !building ? (page.url.searchParams.get("q") ?? "") : "";
    const tokens = (decodeURIComponent(queryParam) || undefined)?.split(" ") ?? [];
    const categoryTokens = tokens.filter((e) => e.startsWith("c:"));
    const tagTokens = tokens.filter((e) => e.startsWith("t:"));
    const word = tokens.filter((e) => ![...categoryTokens, ...tagTokens].includes(e)).join(" ");
    return {
      word,
      category: categoryTokens.at(0)?.slice(2),
      tag: tagTokens.at(0)?.slice(2),
    };
  }

  public static buildMergedHref(query: SearchQueryStruct): string {
    const searchQueryString = SearchQuery.serializeSearchQuery({
      ...SearchQuery.getSearchQuery(),
      ...query,
    });
    const newUrl = new URL(page.url.toString());
    if (searchQueryString) {
      newUrl.searchParams.set("q", searchQueryString);
    } else {
      newUrl.searchParams.delete("q");
    }
    return newUrl.toString().replaceAll("%3A", ":");
  }

  private static serializeSearchQuery(query: SearchQueryStruct): string | null {
    const parts = [
      query.word,
      query.category ? `c:${encodeURIComponent(query.category)}` : "",
      query.tag ? `t:${encodeURIComponent(query.tag)}` : "",
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : null;
  }
}
