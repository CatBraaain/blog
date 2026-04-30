---
title: ahk エクスプローラーで新規テキストファイル作成のショートカット
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-12-18 15:14:01
updatedAt: 2021-12-18 15:14:01
noteLink: https://note.com/optim/n/nce4eb7e4ea4a
---

## 目的

新規テキストファイル作成の独自ショートカットが欲しかった

（今はQTTabBarを使っているのでこのスクリプトは不要）

## スクリプト

```ahk
;Explorer
#IfWinActive ahk_exe explorer.exe
	^t::Send !{1}{Up}{Up}{Enter}
	^+t::Send ^+{n}
#If
```

エクスプローラーのウィンドウがアクティブなとき
Ctrl+Tで新規テキスト作成
Ctrl+Shift+Tで新規フォルダ作成

新規テキストファイルの作成はツールバーみたいなところをキーボード操作でごり押ししてる

## あとがき

なかなか使いやすかった
