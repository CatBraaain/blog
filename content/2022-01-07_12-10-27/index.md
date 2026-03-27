---
title: ahk tooltipを画面中央に表示する
category: Tech
tags: ["AutoHotkey"]
createdAt: 2022-01-07 12:10:27
updatedAt: 2022-01-07 12:10:27
noteLink: https://note.com/optim/n/n35aeb67355f0
---

## 目的

tooltipを画面中央に表示したい

## スクリプト

```ahk
ToolTip(str) {
	ToolTip, %str%
	ToolTipSelector := "ahk_class tooltips_class32 ahk_exe ahk_exe AutoHotkey.exe"
	WinGetPos, X, Y, W, H, %ToolTipSelector%
	WinMove, %ToolTipSelector%,, (A_ScreenWidth-W)//2, (A_ScreenHeight-H)//2
}
```

## スクリプト解説

Tooltipを表示してから
WinGetPosでウィンドウサイズを取得し
WinMoveで画面中央に表示させる

## 欠点

ToolTipを一回表示してからWinMoveさせるので描画が間に合ってしまうと移動前のウィンドウがチラチラ見えてしまい鬱陶しい

## あとがき

```ahk
ToolTip, %str%, A_ScreenWidth//2, A_ScreenHeight//2
```

厳密に中央じゃないけど、これを使うのが安定かな
