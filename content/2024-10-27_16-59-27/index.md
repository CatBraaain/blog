---
title: vite.config の library mode のタイプエラー
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-27 16:59:27
updatedAt: 2024-10-27 16:59:27
noteLink: https://note.com/optim/n/nbb13d8239499
---

## 状況

multiple configs を modeを使って1つのファイルにまとめたい

```ts
export default defineConfig(({ mode }) => {
```

の中で

```ts
  build: {
    lib: {
      entry: "src/preload/index.ts",
      formats: ["cjs"],
      fileName: () => "index.cjs",
    },
```

library mode を使おうとするとエラーになった

## エラー内容

```console
Type 'string' is not assignable to type 'LibraryFormats'.
```

string型ではなくLibraryFormats型を使えとのこと

LibraryFormatsの定義場所

[https://github.com/vitejs/vite/blob/0c497d9cb63bd4a6bb8e01c0e3b843890a239d23/packages/vite/src/node/build.ts#L301](https://github.com/vitejs/vite/blob/0c497d9cb63bd4a6bb8e01c0e3b843890a239d23/packages/vite/src/node/build.ts#L301)

## 解決方法

```ts
   build: {
     lib: {
       entry: "src/preload/index.ts",
-      formats: ["cjs"],
+      formats: ["cjs"] as any[],
       fileName: () => "index.cjs",
     },
```

or

```ts
import type { LibraryFormats } from "vite";

...

   build: {
     lib: {
       entry: "src/preload/index.ts",
-      formats: ["cjs"],
+      formats: ["cjs"] as LibraryFormats[],
       fileName: () => "index.cjs",
     },
```

satisfiesを使ってもいい
