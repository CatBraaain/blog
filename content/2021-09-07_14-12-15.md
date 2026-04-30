---
title: numpyのaxisは0,1だけじゃなかったのか
category: Tech
tags: ["Python"]
createdAt: 2021-09-07 14:12:15
updatedAt: 2021-09-07 14:12:15
noteLink: https://note.com/optim/n/nedc64422716c
---

2があった

デフォルトは横だけど、axisは縦という意味で引数の0,1はFalse,Trueの意味で設定すると思ってた。
だからnp.allとかは縦横二次元までしか扱えないとか壮大な勘違いしてた。

axisは軸という意味で、数値はbool値としてではなく、方向を表す数字としてだった

axis=2の引数を入れれば奥行きも扱えるとのこと

基礎知らなすぎは自覚してるが先人のサンプルコードの読みとき以外からの学び方が分からない
