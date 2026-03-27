---
title: autohotkeyでchromeアドレスバー入力開始時に自動でIMEをオフにし、毎回半角で打ち始める方法
category: Tech
tags: ["AutoHotkey", "Windows"]
createdAt: 2021-11-10 18:46:45
updatedAt: 2021-11-10 18:46:45
noteLink: https://note.com/optim/n/n16fefa1a9eb1
---

## 目的

a+enter → amazon.co.jp
y+enter → youtube.com
のようにchromeのURLオートコンプリート機能を多用するので
常に半角英語から打ち始められるようにしたい

## スクリプト

```ahk
#IfWinActive Google Chrome
	^t::
	^l::
	^n::
	^+n::
		Send %A_ThisHotkey%
		Send {F13} ;任意のIMEオフボタン
		return
```

## 解説

```ahk
#IfWinActive Google Chrome
```

GoogleChromeウィンドウがアクティブの時

```ahk
	^t::
	^l::
	^n::
	^+n::
```

新規タブ：：
アドレスバーフォーカス：：
新規ウィンドウ：：
新規シークレットウィンドウ：：
の４つのChromeショートカット入力をトリガーとして

```ahk
		Send %A_ThisHotkey%
		Send {F13}
		return
```

その入力元のショートカットの送信と
IMEオフを送信
（IMEのキー割り当て設定でF13をIMEオフに割り当ててる）

## ダメスクリプト

```ahk
;ダメスクリプト
#IfWinActive Google Chrome
	~^t::
	~^l::
	~^n::
	~^+n::
		Send {F13}
		return
```

入力元ショートカットも送信するなら上記の様にチルダを使う発想になるが
IMEオフは、アドレスバーにフォーカスが当たった後に、送信されないといけない（IMEがそういう仕組みだから）
それに対してチルダを使うと順序が不安定になり、アドレスバーでIMEオフが効かないことがある（アドレスバーにフォーカスがあたってない状態からのctrl+Lのテストでは毎回効かなかった）
だから、順番を明確化するために、わざわざsendを2回打つ必要がある

## ​メモ

もちろんショートカットではなく、クリックでアドレスバーにフォーカスしたときは、トリガーが発火せずIMEオフは実行されない

## おまけ

```ahk
    F7::return
```

F7で有効化されるカーソルブラウジングが、鬱陶しいのでF7入力自体も無効化させておくと楽
