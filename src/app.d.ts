import "unplugin-icons/types/svelte";

// The generated pagefind client is minified JS, kept out of type checking;
// its API is described by the Pagefind type from vite-plugin-pagefind/types.
declare module "*/.pagefind-client/pagefind.js";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}
