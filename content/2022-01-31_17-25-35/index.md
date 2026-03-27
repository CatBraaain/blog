---
title: AHK - GIMP 画像タブの切り替えをCtrlTabで行う方法
category: Tech
tags: ["AutoHotkey"]
createdAt: 2022-01-31 17:25:35
updatedAt: 2022-01-31 17:25:35
noteLink: https://note.com/optim/n/nabba68ef9a55
---

## 目的

GIMPの画像タブ切り替えをCtrlTabでできるようにして、馴染みやすくさせる

## GIMPの設定

![](./nabba68ef9a55_1643617435340-o2zCbN1y1C.png)

GIMPのキーバインド設定では、直接CtrlTabを使えないので適当なキーを設定しておく
今回は、仮でカンマとドットに設定してみた

## AHKスクリプト

```ahk
#If WinActive(" – GIMP")
	^Tab::Send {.}
	^+Tab::Send {,}
```

## あとがき

ソフトの設定じゃどうしようもないときにこうやってAHKでキーハックできるのホントに便利
