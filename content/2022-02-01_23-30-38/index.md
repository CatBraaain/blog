---
title: AHK - 画像認識＆マウスを動かさずに瞬時にクリック
category: Tech
tags: ["AutoHotkey"]
createdAt: 2022-02-01 23:30:38
updatedAt: 2022-02-01 23:30:38
noteLink: https://note.com/optim/n/n6e97f4ae66c3
---

## 目的

ゲーム内の特定ボタンクリックの独自ホットキーを作る

## スクリプト

```ahk
n::
	ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, *0 Materials\Image 002.bmp
	MouseGetPos mouseX, mouseY, 0
	MouseMove FoundX, FoundY, 0
	Click, %FoundX% %FoundY%
	MouseMove mouseX, mouseY, 0
	return
```

## スクリプト解説

```ahk
ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, *0 Materials\Image 002.bmp
```

画像は圧縮で色変わる可能性があるので圧縮なしのBMP拡張子が良い
`ImageSearch [, OutputVarX, OutputVarY], X1, Y1, X2, Y2, ImageFile`
`OutputVarX, OutputVarY`: 一致場所のX座標変数, 一致場所のY座標変数
`X1, Y1, X2, Y2`: このエリア内を探す

```ahk
	MouseGetPos mouseX, mouseY, 0
	MouseMove FoundX, FoundY, 0
	Click, %FoundX% %FoundY%
	MouseMove mouseX, mouseY, 0
```

Clickのみだとマウスの動きが遅くて時間かかるので
MouseMoveの速さオプションを0にすることで最速でClickできる
あらかじめMouseGetPosで元のマウス位置を記憶しておいてまた戻すことで、マウスを動かさずにクリックしたみたいにできる

## あとがき

JavaScriptでChrome内のボタンをクリックしたかったけど、（多分ゲーム内の画面だからか）どうにもうまくできなかったので、AHKで実装
とても便利だな～
