---
title: ahkでタイマーを作る
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-23 18:15:23
updatedAt: 2021-11-23 18:15:23
noteLink: https://note.com/optim/n/n507f2deadbf2
---

## 目的

ワンフリックであらかじめ指定時間のタイマーを起動させたい

お鍋の時間測るタイマーはWindows標準のアラームクロックを使っているけど、GUI操作が非常に面倒

年中お鍋食べるので、より便利なタイマーが欲しい

沸騰後10分弱火でその20分蓋しめる
それぞれの時間を知らせるタイマー

## スクリプト

```ahk
Label:
	ScdCnt += 1
	Mnt := ScdCnt//60
	Scd := SubStr("0" . Mod(ScdCnt,60), -1)
	If(ScdCnt==600){
		ToolTip % Mnt . ":" . Scd
	}
	If(ScdCnt==1800){
		ToolTip % Mnt . ":" . Scd
		SetTimer, Label, Off
	}
	return

F6::ToolTip, % Mnt . ":" . Scd,  A_ScreenWidth//2, A_ScreenHeight//2
F6 Up::ToolTip
Esc::ExitApp
```

## スクリプト解説

```ahk
SetTimer, Label, 1000
```

一秒ごとにLabelを実行

```ahk
ScdCnt := 0
Label:
	ScdCnt += 1
	Mnt := ScdCnt//60
	Scd := SubStr("0" . Mod(ScdCnt,60), -1)
```

秒数カウントとしてScdCnt変数を作り0からスタート
毎秒カウントを1あげていく
割り算で分と秒を計算する

```ahk

	If(ScdCnt==600){
		ToolTip % Mnt . ":" . Scd
		msgbox 10min
	}
	If(ScdCnt==1800){
		ToolTip % Mnt . ":" . Scd
		msgbox 30min
		SetTimer, Label, Off
	}
```

それぞれ10分と30分でMsgbox通知出す
30分経ったらSetTimerはオフにする

```ahk
F6::ToolTip, % Mnt . ":" . Scd,  A_ScreenWidth//2, A_ScreenHeight//2
F6 Up::ToolTip
Esc::ExitApp
```

F6で経過のToolTipをモニターの真ん中に表示
F6を離すと消える
Escでタイマーアプリを終了する

## 参考

[https://pouhon.net/ahk-simpletimer/4190/](https://pouhon.net/ahk-simpletimer/4190/)

[https://www.autohotkey.com/board/topic/113024-simple-countdown-timer/](https://www.autohotkey.com/board/topic/113024-simple-countdown-timer/)

## あとがき

ワンフリックタイマー意外と便利！

通知音もつけようかな
