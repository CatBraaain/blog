---
title: Autohotkey Capslockを空打ちでIME切り替え、長押しでCtrlキー
category: Tech
tags: ["AutoHotkey", "Windows"]
createdAt: 2021-10-11 18:05:54
updatedAt: 2021-10-11 18:05:54
noteLink: https://note.com/optim/n/n3bed8051cfa2
---

```ahk
;全角半角{vkF3sc029}
*F13::
	Send {Blind}{LCtrl DownTemp}
	return
*F13 Up::
	Send {Blind}{Ctrl Up}
	If (A_Priorkey=="F13"){
		Send {vkF3sc029}
	}
	return
```

多分できた

まずCapslockはレジストリでF13にキー変更してる
いろんなサイトにCapslockは安定しないからF13に変えないと使えたもんじゃないと書いてあって
実際テストしたけどその通りだった
指離してもCtrl押しっぱなしの認識で戻ってこなくなる

```ahk
*F13::
	Send {Blind}{LCtrl DownTemp}
	return
```

F13を押してる間は、ずっと左コントロールを押しっぱなし
F13の前の`*`は、他のキーと同時押しも反応するとかなんとかよくわからない
Blindは、他にShiftキーとか押してた場合、そのキーも受け継ぐ
DownTempは押しっぱなしに対応。これがないといくら長く押しても最初の瞬間だけしかDownしてくれない

```ahk
*F13 Up::
	Send {Blind}{Ctrl Up}
	If (A_Priorkey=="F13"){
		Send {vkF3sc029}
	}
	return
```

F13を離したときコントロールも離す

もし、F13離す直前のキーがF13だったら
つまり、他のキーとの同時押しとかのショートカットじゃなくてF13空打ちだったら、全角半角キー{vkF3sc029}を送る
