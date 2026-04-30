---
title: vba DoEventsの代わりにOnTime()
category: Tech
tags: ["VisualBasic"]
createdAt: 2023-01-02 22:53:25
updatedAt: 2023-01-02 22:53:25
noteLink: https://note.com/optim/n/n6d162b9c1dcc
---

## 目的

DoEventsを使用するとマクロ実行した後にCtrl+Zが効かなくなる（一つの原因として）
なので、DoEventsを使用せずに制御を戻したい

## スクリプト

```vb
Sub InsertRowAbove()
    Set rng = ActiveCell
    Selection.EntireRow.Select
    makeKeyEvent "^{+}"
    rng.Activate

    Call Application.OnTime([Now()+0.01/86400], "InsertRowAbove2")
End Sub

Sub InsertRowAbove2()
    ActiveCell.Offset(Selection.Rows.Count).Activate
End Sub
```

本当はプロシージャを2つに分けずDoEventsでつなぎたいところだが
DoEventsが目的を邪魔するので、OnTimeで実現した

## あとがき

順調
