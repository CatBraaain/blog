---
title: ahk AltTabでタブ切替えするとMinecraftのメニュー画面が開いてしまう回避
category: Tech
tags: ["AutoHotkey"]
createdAt: 2022-01-16 19:47:57
updatedAt: 2022-01-16 19:47:57
noteLink: https://note.com/optim/n/n3776937bf9fe
---

```ahk
#If WinActive("Minecraft")
	~Tab Up::Send {Esc}
```

これでAltTabでMinecraftに戻った時にメニュー画面に対してEscapeで抜けられる
