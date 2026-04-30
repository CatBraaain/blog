---
title: AHK 右Alt長押しで任意の画像を半透明で表示させる 独自キー配列学習支援ツール
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-23 14:16:09
updatedAt: 2021-11-23 14:16:09
noteLink: https://note.com/optim/n/ne30ea75546f9
---

## 目的

キースワップして何がどこにあるか分からなくなったときに
RAlt長押しで配列画像を半透明でうっすら表示させたい

## スクリプト

```ahk
RAlt::
	Gui, +LastFound -Caption +E0x20
	Gui,Color,888888
	WinSet,Transcolor, 888888 126
	Gui,Margin,0,0
	Gui, Add, Picture, w1200 h800 BackGroundTrans, D:\Downloads\Qwerty Semicolon Shift Mod.png
	Gui, Show,, Window
	KeyWait RAlt
	return
RAlt Up::Gui, Show, Hide, Window
```

## スクリプト解説

ウィンドウの背景、透明度の設定、サイズなどのオプションを色々設定して

Gui,Showで表示

Gui,Show,Hideで非表示（タスクバーからもなくなるのでウィンドウを閉じてるのと同じ感覚）

keywaitは長押しの連打扱いを防ぐため

## 感想

こんなこともできるのか・・・！

独自配列の学習段階の人には重宝すると思う
