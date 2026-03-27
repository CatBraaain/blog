---
title: javascript ウェブサイト上でカーソルを十字にしてエイムをよくする 全ての要素でカーソルアイコンを変更する
category: Tech
tags: ["js/ts"]
createdAt: 2021-11-21 23:51:34
updatedAt: 2021-11-21 23:51:34
noteLink: https://note.com/optim/n/n46b1210ce582
---

## 目的

カーソルを矢印みたいなやつから十字クロスのやつに変えて、ブラウザゲームでのエイムを向上させる

## スクリプト

```js
document
  .querySelectorAll("*")
  .forEach((element) => element.setAttribute("style", "cursor: crosshair;"));
```

## スクリプト解説

HTMLはよく分からないけどとにかく十字にしたいんだっていう場合は、これを打てば、全ての要素上でカーソルが十字になるので、chrome devtoolに打ち込んでおけばOK（多分）

チーティングしやすいブラウザゲームをきっかけにプログラミング触りだすのは絶好の機会だと思う
