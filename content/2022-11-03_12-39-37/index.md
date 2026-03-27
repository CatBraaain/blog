---
title: ahk gui タイトルバーのボタンを消す
category: Tech
tags: ["AutoHotkey"]
createdAt: 2022-11-03 12:39:37
updatedAt: 2022-11-03 12:39:37
noteLink: https://note.com/optim/n/ned5cefb86d34
---

## 目的

GUIウィンドウの横幅が小さい時
タイトルバーのボタンのせいでタイトル文字が見えないので
タイトルバーのボタンを消す

## スクリプト

```ahk
Gui, +ToolWindow
```

これ加えたら最大化ボタンと最小化ボタンがなくなった

![](./ned5cefb86d34_1667446616330-FdfgsZ1Wzb.png)

## 参考

[http://ahkwiki.net/Gui,Option](http://ahkwiki.net/Gui,Option)

## あとがき

数行でGUI作れて便利
