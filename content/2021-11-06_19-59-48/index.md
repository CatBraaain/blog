---
title: ahk 確認ダイアログをスキップするショートカット ウィンドウクラスでダイアログを検知
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-06 19:59:48
updatedAt: 2021-11-06 19:59:48
noteLink: https://note.com/optim/n/nc56e57ccb8c1
---

## 目的

メモ帳やnotepad++とかをctrl+wで閉じるとき
未保存ファイルは保存しますかのダイアログが出てくる

これをいいえを押したいときはマウスクリックや遠いNまで左手を伸ばさなくてならないので億劫なので
ctrl+w連打でいいえを選択できるようにしたい

## スクリプト

```ahk
~^w::
	if(A_PriorHotkey==A_ThisHotkey or A_PriorHotkey=="~^w"){
		WinGetClass, ClassStr, A
		WinGetTitle, TitleStr, A
		If(ClassStr == "#32770"){
			Send {n}
		}else If(TitleStr == "このサイトを離れますか？"){
			Send {Enter}
		}
	}
```

## 解説

```ahk
~^w::
	if(A_PriorHotkey==A_ThisHotkey or A_PriorHotkey=="~^w"){
```

Ctrl+Wを二連打以上したとき

```ahk
		WinGetClass, ClassStr, A
		WinGetTitle, TitleStr, A
```

アクティブウィンドウの
ウィンドウクラスを変数ClassStrに
タイトルを変数TitleStrに格納

```ahk
		If(ClassStr == "#32770"){
			Send {n}
		}
```

クラスが＃32770であれば、それはダイアログウィンドウを指すので
いいえボタンのショートカットである「N」を送信

```ahk
else If(TitleStr == "このサイトを離れますか？"){
			Send {Enter}
		}
```

ダイアログではなく
タイトルが「このサイトを離れますか？」だった場合
Chromeのウェブサイト離れるときのダイアログなので
「はい」の意味でEnterを送信

以上

## あとがき

タブ式エディタのタブはctrl+w連打ですいすい閉じれる
Chromeのタブも同じくすいすい
