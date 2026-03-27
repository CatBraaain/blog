---
title: ahk winactiveの複数条件を正規表現でシンプルに書く
category: Tech
tags: ["AutoHotkey"]
createdAt: 2022-01-12 06:00:46
updatedAt: 2022-01-12 06:00:46
noteLink: https://note.com/optim/n/n2e2affddf66e
---

```ahk
SetTitleMatchMode, RegEx
targets:= "Google Chrome|Visual Studio Code"
Exit ;Exit Auto-Execute
#If WinActive(targets)
    a::tooltip a
#If
```

変数の格納はAutoExecuteの及ぶうちに済ます

みじかくてよい

```ahk
#If WinActive("(Google スプレッドシート|Apps Script) - Google Chrome")
	~^s::return
```

グループ化もできる
