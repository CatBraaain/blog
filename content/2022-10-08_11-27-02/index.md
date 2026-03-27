---
title: js sleep memo
category: Tech
tags: ["js/ts"]
createdAt: 2022-10-08 11:27:02
updatedAt: 2022-10-08 11:27:02
noteLink: https://note.com/optim/n/na3989a5e5e80
---

## 目的

javascriptでsleepさせる

## コード

```js
(async () => {
  console.log("start");
  await new Promise((s) => setTimeout(s, 1000));
  console.log("done");
})();
```

## 学んだこと必要知識

settimeoutは非同期処理なのでsleepの代わりにはならないこと
awaitはasyncの関数内でしか使えないこと
関数即時実行する方法があること

## promiseについての理解

・promiseはサンプルコードではresolveとrejectの2つの引数を使っているが、第一引数だけあればOK
・第一引数が"resolve"でなくとも"s"でもなんでもよさそう
・引数がそれぞれ関数になってる？
・第一引数を実行するとresolved
・第二引数を実行するとrejectedになる
（これは解説サイトが見つからなかったので自分でいじってみてなんとなく理解した気になった）
むずかしすぎ

## 関数即時実行について分かりやすかったサイト

[https://ginpen.com/2014/12/01/large-function/](https://ginpen.com/2014/12/01/large-function/)

8年も前の記事だけどこれでようやく理解した
先人に感謝
