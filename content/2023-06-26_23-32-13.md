---
title: js アロー関数のreturn省略でハマった
category: Tech
tags: ["js/ts"]
createdAt: 2023-06-26 23:32:13
updatedAt: 2023-06-26 23:32:13
noteLink: https://note.com/optim/n/n07bdfe9fcba8
---

## 省略しようと思ったら…

## returnと中かっこを両方省略しなきゃいけない

```js
console.log(
  (() => {
    return true;
  })(),
);
// true

console.log((() => true)());
// true
```

## returnと中かっこをどちらか片方だけ省略するとダメ

```js
console.log((()=>{true})());
// undefined

console.log((()=>return true)());
// 構文エラー
```
