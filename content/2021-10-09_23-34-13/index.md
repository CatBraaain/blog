---
title: autohotkey 編集したスクリプトを保存と同時に自動再実行するスクリプト
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-10-09 23:34:13
updatedAt: 2021-10-09 23:34:13
noteLink: https://note.com/optim/n/n8a3b2fd27c4e
---

```ahk
#SingleInstance FORCE
SetTitleMatchMode,2
#IfWinActive Notepad++
	~^s::Run %A_ScriptFullPath%
#IfWinActive
```

編集中のスクリプトは一度手動で実行しておく

#SingleInstance FORCE
はもう既に実行されてますが古いの閉じて新しいの実行しますかYESNO
のダイアログを強制YESにするためにやつ

SetTitleMatchMode,2
でアクティブウィンドウのタイトル検索を完全一致ではなく部分一致に変更

#IfWinActive Notepad++
ここは、私がNotepad++というエディターで編集しているので
タイトルにNotepad+という文字を含むウィンドウがアクティブになっている条件分岐

~^s::
内容を保存するときは必ずCtrl+Sを使ってるのでそれをトリガーにしてる

Run %A_ScriptFullPath%
これで、実行中のスクリプトを再実行

二度目のIfWinActiveでEndIfみたいな役割を果たす

## 関数あった

その後調べてたらリロード用関数あった
リロード関数使ったら確認ダイアログも出てこないので楽ちん！

```ahk
SetTitleMatchMode,2
#IfWinActive Notepad++
	~^s::Reload
#IfWinActive
```

[https://www.autohotkey.com/docs/commands/Reload.htm](https://www.autohotkey.com/docs/commands/Reload.htm)

## メモ

Runしたらそのインスタンスが消されて新しいのが作られるので
Run以降の文は実行されない?

reloadの場合は、reloadによってインスタンスが消されるまでのほんの瞬間だけ続きが実行される
