---
title: "Cannot find module 'electron/renderer'の解決方法"
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-26 23:56:16
updatedAt: 2024-10-26 23:56:16
noteLink: https://note.com/optim/n/n39ca807ea702
---

## 状況

typescript+electronで開発中
ディレクトリ構成を変更し、preload scriptファイルを移動させたらtscでエラーになった

## エラー内容

```console
src/preload/index.ts:3:44 - error TS2307: Cannot find module 'electron/renderer' or its corresponding type declarations.
3 import { contextBridge, ipcRenderer } from "electron/renderer";
```

## 解決方法

```console
npm i -D @types/electron
```

型の利用ができてなかったみたい
