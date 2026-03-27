---
title: AutoHotkeyでYouTubeのボリュームを1%にするショートカット
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-10-15 15:49:13
updatedAt: 2021-10-15 15:49:13
noteLink: https://note.com/optim/n/n31818c0fafbb
---

## 理由と目的

・Netflixの音量が小さすぎてマスターボリュームを80とかにしてるからYoutubeで作業用BGM聞くには音量を1%にしたい
・Youtubeno音量をマウスでちまちま1%に合わせるのが難しい、ほぼ無理
・キーボードの矢印キーで5%ずつしか変更できない
・音量を1%にするショートカットが欲しい

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

#IfWinActive YouTube - Google Chrome
	<!1::
		Send {LAlt up}
		SendJs("document.querySelector('#movie_player').setVolume(1)")
		return
#IfWinActive
```

## スクリプト解説

```ahk
#IfWinActive YouTube - Google Chrome
```

ChromeでYoutubeウィンドウがアクティブなとき

```ahk
    <!1::
		Send {LAlt up}
		SendJs("document.querySelector('#movie_player').setVolume(1)")
		return
```

Alt+1のショートカットをトリガーにして
ショートカットに押したAltが抜けなくなることがあるので
{LAlt up}でAltを離してから
SendJsという自作関数にスクリプト文字列を送信する

```ahk
SendJs(JsStr){
	originalclipboard = %clipboard%
```

まずは、元のクリップボードの内容を変数originalclipboardに避難させておく

```ahk
    Send ^l
	Sleep (100)
```

Ctrl+Lでアドレスバーにフォーカスして0.1秒待機

```ahk

	clipboard := "javascript"
	Send ^v
	clipboard := ": " . JsStr
	Send ^v
```

javascriptのスクリプト文字列を一度クリップボードに移してからCtrl+Vでアドレスバーに貼り付け

```ahk
	Send {Enter}
	clipboard = %originalclipboard%
}
```

エンターでjavasciptを実行してから
元のクリップボードの中身を戻して終わり

## 参考

[https://stackoverflow.com/questions/53154863/change-volume-of-a-youtube-video-while-playing](https://stackoverflow.com/questions/53154863/change-volume-of-a-youtube-video-while-playing)

[https://chrome.google.com/webstore/detail/youtube-volume-adjustment/copionjahkifijekfohaamkjaiibcnpp/related?hl=ja](https://chrome.google.com/webstore/detail/youtube-volume-adjustment/copionjahkifijekfohaamkjaiibcnpp/related?hl=ja)
