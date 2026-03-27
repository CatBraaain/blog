---
title: ahk 画面を消し、パソコンにロックをかける
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-17 00:41:16
updatedAt: 2021-11-17 00:41:16
noteLink: https://note.com/optim/n/n9c85160fd40e
---

## 目的

・Win+Lの画面ロックよりも立ち上がりを早くしたい
・画面ロック中もCPUを起動させておきたい（あくまで画面を消すだけ）
・解除パスワードは文字列ではなく、同時押しなどを導入したい

## スクリプト

```ahk
#SingleInstance force
#Persistent
#Noenv
; #NoTrayIcon

CapsLock & l::SetTimer, ScreenLock, On
CapsLock & u::SetTimer, ScreenLock, Off
ScreenLock:
	SendMessage,0x112,0xF170,2,,Program Manager
	return
```

## スクリプト解説

```ahk
SendMessage,0x112,0xF170,2,,Program Manager
```

画面を消す

これをSetTimerでかけ続けるため、解除キーを押さない限り、画面は明るくならない

## メモ

Loop+SleepとSetTimerとどちらがいいの分からなかった
また、SleepとSetTimerの長さを何秒にすればいいのか分からなかった
LoopのSleep0の場合CPU負荷5%くらいあった
SetTimerはデフォルト間隔は0.2秒でCPU負荷はほぼ0%だった
デフォルトで秒数決めてくれてるのでなんとなくSetTimerにした

## 参考

[https://www.autohotkey.com/boards/viewtopic.php?t=13134](https://www.autohotkey.com/boards/viewtopic.php?t=13134)

[https://www.autohotkey.com/board/topic/105261-turn-monitor-off-even-when-using-the-computer/](https://www.autohotkey.com/board/topic/105261-turn-monitor-off-even-when-using-the-computer/)
