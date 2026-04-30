---
title: ahk hotkeyをループで動的に割り当てる
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-23 09:45:05
updatedAt: 2021-11-23 09:45:05
noteLink: https://note.com/optim/n/n7ce990250468
---

## 目的

数字キーなどを使ったホットキーをループで動的に割り当てたい

## スクリプト

```ahk
Loop, 9
{
	Hotkey, ^%A_index%, Paste
}
return
Paste:
	msgbox % "Ctrl + " . SubStr(A_ThisHotkey,2) . " が押されました。"
	return
```

Hotkeyコマンドでの割り当ては、関数が使えずラベルしか使えないため、引数を渡せないのがネック
