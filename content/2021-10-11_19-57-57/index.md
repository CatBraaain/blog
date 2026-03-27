---
title: autohotkey リマップ元のキーでホットキーを作ってると出てくる不具合回避方法
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-10-11 19:57:57
updatedAt: 2021-10-11 19:57:57
noteLink: https://note.com/optim/n/n719a6d4cba2c
---

```ahk
LShift::LCtrl
<+Right::Send {End}
```

左シフトと左コントロールにリマップ
そして、左シフトを作った何かしらのホットキー
このふたつが同時に存在してると

左シフトを長押ししても左コントロールが出力されず
左シフトを離したときにやっと左コントロールがdownupする

という不具合があったけど回避方法がこれ

```ahk
LShift::LCtrl
Right & LShift::Send {End}
```

ホットキーの順番を変えたら、なおった
ホットキーが装飾キーをいくつも使う場合、めんどくさくなるなこれ
