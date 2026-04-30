---
title: autohotkeyでnoteのキーボードショートカットをカスタマイズ
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-11 13:12:41
updatedAt: 2021-11-11 13:12:41
noteLink: https://note.com/optim/n/nbf33b18f988b
---

## 目的

noteのショートカットが少なすぎてはかどらないのでautohotkeyを使って自分で作る

[https://www.help-note.com/hc/ja/articles/900006999563-%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88](https://www.help-note.com/hc/ja/articles/900006999563-%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88)

## スクリプト

```ahk
SendJs(JsStr){
	originalclipboard = %clipboard%
	Send ^l
	Sleep (100)
	clipboard := "javascript"
	Send ^v
	clipboard := ": " . JsStr
	Send ^v
	Send {Enter}
	clipboard = %originalclipboard%
}

;Note ショートカット
#IfWinActive note - Google Chrome
	^1::SendJs("document.querySelector('button[aria-label=""見出し""]').click()")
	^2::SendJs("document.querySelector('button[aria-label=""中央寄せ""]').click()")
	^3::SendJs("document.querySelector('button[aria-label=""リンク""]').click()")
	^4::SendJs("document.querySelector('button[aria-label=""引用""]').click()")
	^5::SendJs("document.querySelector('button[aria-label=""コード""]').click()")
```

## 解説

```ahk
SendJs(JsStr){
}
```

javascriptをchromeに送る自作関数を作成

```ahk
    originalclipboard = %clipboard%
```

このスクリプトでは高速化のためにクリップボードを使うので
もとのクリップボード内容をいったん変数に入れて避難させておく

```ahk

	Send ^l
	Sleep (100)
	clipboard := "javascript"
	Send ^v
	clipboard := ": " . JsStr
	Send ^v
	Send {Enter}
```

Ctrl+Lでアドレスバーにフォーカス
フォーカスが完了するまで0.1秒待機
クリップボードに"javascript"の文字列を入れて
Ctrl+Vで貼り付け
クリップボードに続きのスクリプトを入れて
Ctrl+Vで貼り付け
Enterで実行

```ahk
	clipboard = %originalclipboard%
```

避難していた元のクリップボード内容をクリップボードに戻す

```ahk
SendJs(JsStr){
	originalclipboard = %clipboard%
	Send ^l
	Sleep (100)
	clipboard := "javascript"
	Send ^v
	clipboard := ": " . JsStr
	Send ^v
	Send {Enter}
	clipboard = %originalclipboard%
}
```

自作関数SendJs完成

```ahk title="Note ショートカット"
#IfWinActive note - Google Chrome
```

chromeでnoteを開いているウィンドウがアクティブなとき

```ahk
	^1::SendJs("document.querySelector('button[aria-label=""見出し""]').click()")
```

Ctrl+1で自作関数SendJsに引数を加えて実行
CSSセレクタ―で`('button[aria-label=""見出し""]')`に該当する要素をclick()
Ctrl+1~5まで設定

## 注意

"javascript:"という文字列はアドレスバーにコピペできないので二回にわけて貼り付けしてる

## 完成

```ahk
SendJs(JsStr){
	originalclipboard = %clipboard%
	Send ^l
	Sleep (100)
	clipboard := "javascript"
	Send ^v
	clipboard := ": " . JsStr
	Send ^v
	Send {Enter}
	clipboard = %originalclipboard%
}

;Note ショートカット
#IfWinActive note - Google Chrome
	^1::
	!1::
		; SendJs("document.querySelector('button[aria-label=""見出し""]').click()")
		Send ^2
		return
	^2::
	!2::
		; SendJs("document.querySelector('button[aria-label=""強調""]').click()")
		Send ^b
		return
	^3::
	!3::
		; SendJs("document.querySelector('button[aria-label=""リンク""]').click()")
		Send ^k
		return
	^4::
	!4::
		; SendJs("document.querySelector('button[aria-label=""引用""]').click()")
		Send ^5
		return
	^5::
	!5::
		SendJs("document.querySelector('button[aria-label=""コード""]').click()")
		return
```

コードのショートカットはなかったのでjs実行だが
それ以外は、標準のショートカットを有効活用してキー割り当て変更みたいに使うのが安定してよさそう
あとctrl+1は押しにくいのでalt+数字も併用して使えるようにしてみて様子みてみる

## 課題

・ギリギリ使えるけどアドレスバーでJavascript実行はやはり少し時間がかかる。せめてペーストを1回にできたら文句なしなんだけど・・・。

・他にAHKからChrome操作する方法がないなら、Chrome拡張機能を作るべきか。

・アドレスバー入力時に下に過去の検索履歴が一瞬表示されるのが不愉快。直し方を調べても古いのしかヒットしない。
