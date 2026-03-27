---
title: ahk カーソルのアイコンを変える
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-20 15:00:13
updatedAt: 2021-11-20 15:00:13
noteLink: https://note.com/optim/n/ne74229a47d68
---

```ahk
	~Shift::
		CursorHandle := DllCall("LoadCursor", Uint, 0, Int, IDC_CROSS := 32515)
		Cursors = 32512,32513,32514,32515,32516,32640,32641,32642,32643,32644,32645,32646,32648,32649,32650,32651
		Loop, Parse, Cursors, `,
			DllCall("SetSystemCursor", Uint, CursorHandle, Int, A_Loopfield )
		keywait Shift
		return

	~Shift Up::
		DllCall("SystemParametersInfo", UInt, 0x57, UInt, 0, UInt, 0, UInt, 0 )
		return
```

二行目の最後の引数の数字を変えるとカーソルが変わる
今回は十字カーソルに設定してる

## 課題・分からないこと

・4行目のループは必要のようだけど、なぜ必要なのか分からなかった

・元からＩ字アイコンのときは、十字にならずに標準アイコンになった。なぜだ。

・今更だけど、そもそもDllCallがなんなのか分かってない

## 参考

どの書き込みをみてもここを参照しろと書いてあるけど、
正直難しくて理解できない。
けど、コピペはできる！( ｡•̀\_•́｡)ｷﾘｯ

[https://www.autohotkey.com/board/topic/32608-changing-the-system-cursor/](https://www.autohotkey.com/board/topic/32608-changing-the-system-cursor/)
