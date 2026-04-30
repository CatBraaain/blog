---
title: ahk スクリプトが実行されているか確認する
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-25 18:48:33
updatedAt: 2021-11-25 18:48:33
noteLink: https://note.com/optim/n/nb77b676e519f
---

## 目的

実行されていたらそのまま
されていなかったら実行
をしたい

## スクリプト

```ahk
DetectHiddenWindows, On
IfWinExist foo.ahk
   msgbox exist
IfWinNotExist foo.ahk
   msgbox notexist
```

## スクリプト解説

```ahk
DetectHiddenWindows, On
```

非表示になってるウィンドウも検索できるようにする
スクリプトは見えないながらもウィンドウを持ってるらしいので
これで検索できるようになる

```ahk
IfWinExist foo.ahk
   msgbox exist
```

foo.ahkというスクリプトが実行されているならmsgbox exist

```ahk
IfWinNotExist foo.ahk
   msgbox notexist
```

foo.ahkというスクリプトが実行されていないならmsgbox notexist

## 参考

[https://www.autohotkey.com/board/topic/53689-check-if-another-ahk-script-is-running/](https://www.autohotkey.com/board/topic/53689-check-if-another-ahk-script-is-running/)

## あとがき

ifwinexistなのかwingetなのかいろいろありすぎて何を使うべきなのか迷う
