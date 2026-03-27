---
title: ahk 集中モードの切り替えショートカット
category: Tech
tags: ["AutoHotkey"]
createdAt: 2023-06-30 18:46:16
updatedAt: 2023-06-30 18:46:16
noteLink: https://note.com/optim/n/n72def1639419
---

## 目的

ahk で集中モード切替ショートカットを作る

## スクリプト

```ahk
!F:: GoSub FocusAssistOn
!+F:: GoSub FocusAssistOff

FocusAssistOn:
	If(!WinActive("アクション センター")){
		Send #a
	}
    WinWaitActive, アクション センター,, 2
    Send +{Tab}{Left 3}{Up 3}{Right 3}{Down 2}{Space}{Esc}
	return

FocusAssistOff:
	If(!WinActive("アクション センター")){
		Send #a
	}
    WinWaitActive, アクション センター,, 2
    Send +{Tab}{Left 3}{Up 3}{Right 3}{Down 2}{Space 2}{Esc}
	return
```

## スクリプト解説

標準のキーボードショートカットを使ってがんばってるだけ

## あとがき

いい加減ahkv2に変えないと…
