---
title: inputイベントにInputEventのタイプヒントを使うと怒られる理由
category: Tech
tags: ["js/ts"]
createdAt: 2025-03-05 12:09:39
updatedAt: 2025-03-05 12:09:39
noteLink: https://note.com/optim/n/n042ae6bae9f4
---

```ts
// この書き方だとなんかエディタに怒られる
textArea.addEventListener("input", (event: InputEvent) => {

// こう書かなきゃならない
textArea.addEventListener("input", (event: Event) => {
  const inputEvent = event as InputEvent;
```

## 理由

実験的技術だから？いまだに？

[https://github.com/microsoft/TypeScript/issues/39925](https://github.com/microsoft/TypeScript/issues/39925)
