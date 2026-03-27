---
title: 'vite: Module "fs" has been externalized for browser compatibility, imported by "electron/index.js"'
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-14 19:42:04
updatedAt: 2024-10-14 19:42:04
noteLink: https://note.com/optim/n/n0c60b7e659bb
---

```console
vite build
```

したら

```console
[plugin vite:resolve] Module "fs" has been externalized for browser compatibility, imported by
```

なんか出てきた

## 原因

electronのmain.tsをバンドルする際に

```ts
// main.ts
import { app, BrowserWindow, screen } from "electron";
```

main.tsの中でelectronモジュールをimportしており
electron/index.jsの中で

```js
const fs = require("fs");
const path = require("path");
```

fs, path をimportしている
そして、fs, path はブラウザでサポートされないため、強制的に両モジュールはexternalしました。という警告が出ている

## 解決方法

```js
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["electron"],
    },
  },
});
```

そもそもelectronモジュールをバンドルする必要もないのでexternalに明示的に加える
