import { building } from "$app/environment";
import { page } from "$app/state";

export function buildPageHref(targetPage: number): string {
  if (building) return `/?page=${targetPage}`;
  const params = new URLSearchParams(page.url.searchParams);
  if (targetPage > 1) {
    params.set("page", targetPage.toString());
  } else {
    params.delete("page");
  }
  const paramString = params.toString().replaceAll("%3A", ":");
  return paramString ? `/?${paramString}` : "/";
}

export function useCurrentPage(): number {
  if (building) return 1;
  return parseInt(page.url.searchParams.get("page") ?? "", 10) || 1;
}
