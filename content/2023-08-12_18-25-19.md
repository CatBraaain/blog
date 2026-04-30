---
title: "C# VSCodeでコンパイラ警告を全て非表示にする"
category: Tech
tags: ["C#", "VSCode"]
createdAt: 2023-08-12 18:25:19
updatedAt: 2023-08-12 18:25:19
noteLink: https://note.com/optim/n/n332c8c291711
---

## 目的

C#1日目だが、大量にwarning出されても1つずつ調べて処理していく時間もないし、とりあえずは、better than perfectなので、どんどん動かしたい
そのためには、dotnet runの出力結果をきれいにしたいのでwarning を非表示にする
特定warningを1つずつ非表示にしてたら埒が明かないので一括で非表示する

非推奨らしいので、ある程度落ち着いたら、警告の出さないコードになおしていきたい

## やり方

Settings.jsonにこれを加える

```json
"csharp.suppressWarnings": true
```
