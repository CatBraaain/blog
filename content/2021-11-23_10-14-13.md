---
title: AutoHotkeyでクリップボード履歴ツールを作る
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-23 10:14:13
updatedAt: 2021-11-23 10:14:13
noteLink: https://note.com/optim/n/nc218f42ae033
---

## 目的

Win+VのようなGUIツールの操作なしで
キーボードショートカットのみで履歴をさかのぼって利用したい

## 使い方

Ctrl+Shift+Vで、2番目3番目と古いのにどんどん遡って貼り付けをする
Ctrl+数字で、その順番のクリップボードを貼りつける
Ctrl+Vは最後に貼りつけたものを貼りつける
ただし、何か新たにコピーした際には、上記ショートカットにおいて使われる順番は全て1にリセットされる

## スクリプト

```ahk
OnClipboardChange("ClipChanged",1)
ClipArray := []
ClipChanged(Type) {
    global PasteCnt, ClipArray
	PasteCnt := 1
	ClipArray.Insert(1,Clipboard)
	; For index, element in ClipArray
	; {
		; cliparraystr .= element . "`n"
	; }
	; tooltip % cliparraystr
	ClipCount := ClipArray.MaxIndex()
	If (ClipArray.MaxIndex() > 50)
		ClipArray.Remove(51)
	return
}

Loop, 9
{
	Hotkey, ^%A_index%, CtrlNumPaste
}
return

^+v::
	PasteCnt += 1
	Paste(PasteCnt)
	return

CtrlNumPaste:
	PasteCnt := SubStr(A_ThisHotkey,2)
	Paste(PasteCnt)
	return

Paste(PasteCnt){
	global ClipArray
	OnClipboardChange("ClipChanged",0)
	tooltip % ClipArray.MaxIndex() . "`n" . PasteCnt . "`n" . (ClipArray.MaxIndex() >= PasteCnt)
	If (ClipArray.MaxIndex() >= PasteCnt){
		ClipBoard := ClipArray[PasteCnt]
		ClipWait
		Send ^v
		; sleep 100
		; ClipBoard := ClipArray[1]
		; ClipWait
	}
	OnClipboardChange("ClipChanged",1)
}
```

## スクリプト解説

```ahk
OnClipboardChange("ClipChanged",1)
```

クリップボードに変化があった際にClipChangedという関数を実行する
（OnClipboardChangeは、クリップボード監視の専用関数、古い情報ではラベルの方が紹介されていることが多いが、こちらの関数の方が上位互換）

```ahk
ClipArray := []
ClipChanged(Type) {
    global PasteCnt, ClipArray
	PasteCnt := 1
	ClipArray.Insert(1,Clipboard)
	; For index, element in ClipArray
	; {
		; cliparraystr .= element . "`n"
	; }
	; tooltip % cliparraystr
	ClipCount := ClipArray.MaxIndex()
	If (ClipArray.MaxIndex() > 50)
		ClipArray.Remove(51)
	return
}
```

ClipArrayの配列宣言
globalは関数内から関数外の変数を扱うのに必要
コメント欄はデバッグ用
ClipArrayに過去のクリップボード内容を格納していくが
50個まで保存し、それ以上は削除していく

```ahk
Loop, 9
{
	Hotkey, ^%A_index%, CtrlNumPaste
}
return
```

ループで動的ホットキー作成

```ahk
^+v::
	PasteCnt += 1
	Paste(PasteCnt)
	return
```

Ctrl+Shift+Vのときの処理

```ahk
CtrlNumPaste:
	PasteCnt := SubStr(A_ThisHotkey,2)
	Paste(PasteCnt)
	return
```

ループで作成したホットキーたちの行き先
押した番号をPasteCntに格納

```ahk
Paste(PasteCnt){
	global ClipArray
	OnClipboardChange("ClipChanged",0)
	; tooltip % ClipArray.MaxIndex() . "`n" . PasteCnt . "`n" . (ClipArray.MaxIndex() >= PasteCnt)
	If (ClipArray.MaxIndex() >= PasteCnt){
		ClipBoard := ClipArray[PasteCnt]
		ClipWait
		Send ^v
	}
	OnClipboardChange("ClipChanged",1)
}
```

貼りつけの自作関数

コメント欄はデバッグ用

OnClipboardChange("ClipChanged",0)は、スクリプト上でクリップボードを操作する際に一時的にClipChanged関数を無効化させておく

ClipWaitは、クリップボードが反映されるのを待つコマンド
これがないと反映される前に貼りつけられることがあるとのことなので、安定性向上のため使っておく

## 参考

[https://gist.github.com/Pulover/6088602](https://gist.github.com/Pulover/6088602)

## 感想

過去のクリップボード履歴のフリーソフトをいくつか使ったことがあるけど、自分の欲しい機能がなかったり、無駄に高機能で操作が直感的でなかったりとなかなか自分に合うものがなかったということがある

今回、AutoHotkeyを使って完全に自分の思い通りの最適なツールが出来上がってうれしい

次は、スクリーンキャプチャソフトを作りたいが、果たしてできるかな
