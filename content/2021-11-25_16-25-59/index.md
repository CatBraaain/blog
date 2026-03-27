---
title: 【未解決】ahkでスクリーンショットソフトを作る
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-25 16:25:59
updatedAt: 2021-11-25 16:25:59
noteLink: https://note.com/optim/n/n10c6a3722bc1
---

## 目的

こだわりのスクリーンショットソフトが欲しい
条件
・アクティブウィンドウ、範囲クリック指定、範囲数字指定の3つのキャプチャ方法
・範囲クリック指定時には、カーソル周りの拡大図を表示
・矢印キーでカーソルを1pxずつ動かす

スクリーンショットソフトが無限にありすぎて、自分の理想の条件に当てはまるものが見つからない、探すのが大変なので自分の作りたい

## 参考になるサイト

[https://www.autohotkey.com/board/topic/119215-looking-for-screen-capture-script/](https://www.autohotkey.com/board/topic/119215-looking-for-screen-capture-script/)
[https://www.autohotkey.com/board/topic/16677-screen-capture-with-transparent-windows-and-mouse-cursor/](https://www.autohotkey.com/board/topic/16677-screen-capture-with-transparent-windows-and-mouse-cursor/)
[https://www.autohotkey.com/board/topic/29449-gdi-standard-library-145-by-tic/](https://www.autohotkey.com/board/topic/29449-gdi-standard-library-145-by-tic/)

## スクリプト

どうやらGdip.ahkというものを使って作れるみたい

ダウンロードしたら、チュートリアルファイルがあるので読み込んで学んでみようとしたけど、圧倒的理解不能だったので断念
勉強不足か

どうしようかと、フリーソフト探してみたところ、条件に合うものがあっさり発見

## スクリーンキャプチャソフト：PicPick

[https://picpick.app/en/](https://picpick.app/en/)

最初の条件は全て満たしており
付属のエディターも満足のいく機能がついていて良い！

## あとがき

自分で作れたらかっこいいなと思ったけど、難しいんだな
