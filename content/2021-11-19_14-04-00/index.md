---
title: ahk 新規テキストファイル作成のショートカット
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-19 14:04:00
updatedAt: 2021-11-19 14:04:00
noteLink: https://note.com/optim/n/n6e82b20879d7
---

## 目的

ブラウザではCtrl＋Tで新規タブを開く
それと同じようにCtrl+Tで新規ファイルを作成したい

ついでに新規フォルダを作るCtrl+Shift＋Nも遠くて指がつりそうになるのでCtrl+Shift+Tで代用しておく

## スクリプト

```ahk title="Explorer.ahk"
#IfWinActive ahk_exe explorer.exe
	^t::Send !{1}{Up}{Up}{Enter}
	^+t::Send ^+{n}
```

## エクスプローラーの設定

![画像1](./n6e82b20879d7_picture_pc_0eed8b7d1d9e67d2bd497068f4f55f16.jpg)

クイックアクセスツールバーの一番目に新規ファイル作成ツールを置いてる
