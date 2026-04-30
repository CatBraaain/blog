---
title: AutoHotkey Windowsキーでスタートメニューが開く機能を無効にする方法（ショートカットは有効）
category: Tech
tags: ["AutoHotkey", "Windows"]
createdAt: 2021-10-11 14:08:52
updatedAt: 2021-10-11 14:08:52
noteLink: https://note.com/optim/n/nd5e88bb722a2
---

```ahk
~LWin::Send {Blind}{vkE8}
```

[https://stackoverflow.com/questions/69143107/how-to-disable-the-win-key-if-its-the-only-key-being-pressed-using-autohotkey](https://stackoverflow.com/questions/69143107/how-to-disable-the-win-key-if-its-the-only-key-being-pressed-using-autohotkey)

vke8は、何の意味も持たない無害なvirtul key
Winキー単体で押すと、スタートメニューが開いてしまうので、
適当な意味ないキーと同時押しということにして、単体押しを実現できなくさせる方法

一緒に押すキーは無害キーならなんでもいいので
vke8じゃなくてvk07とかでも大丈夫
