---
title: "vite: (!) outDir xxx is not inside project root and will not be emptied.Use --emptyOutDir to override."
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-14 17:08:38
updatedAt: 2024-10-14 17:08:38
noteLink: https://note.com/optim/n/n3e564cc3aaa7
---

viteコマンドうったら

```console
vite build
```

なんか出てきた

```console
vite: (!) outDir xxx is not inside project root and will not be emptied.Use --emptyOutDir to override.
```

## 原因

viteは、ourdirの中身を一度空にしてからビルドするという標準仕様があるが、例外として、outdirをproject root の外にあるときは警告を行っている

### outDirをproject rootの外に設定している例

```js
export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
  },
});
```

## 解決方法

build.emptyOutDir = true に設定すれば警告を抑制できる

```js
export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
```

## 所感

tscだと出力先の古いファイルを削除したりしないので、その点バンドルツールというものはすごいんだなあと思った

# tscの場合

## ファイル名変更前

```text
└── 📁dist
    └── oldname.js
└── 📁src
    └── oldname.ts
```

## ファイル変更後

rename src/oldname.ts => src/newname.ts
dist/oldname.jsは残ったまま

```text
└── 📁dist
    └── newname.js
    └── oldname.js
└── 📁src
    └── newname.ts
```
