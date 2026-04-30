---
title: ahk メモ帳を起動するショートカットを作る
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-22 23:39:39
updatedAt: 2021-11-22 23:39:39
noteLink: https://note.com/optim/n/n398c23244e44
---

## 目的

ブラウザを閲覧しながら小さいウィンドウでテキストを入力したいときに何かとメモ帳を使うので、ワンフリックで起動できるショートカットが欲しい

### スクリプト

```ahk
F4::Run, notepad.exe
```

## 感想

ファンクションキーをマクロ化していくの本当に便利

今のところ

F1::BackSpace
F2::Enter
F3::Delete
F4::メモ帳を開く
F10::AirPods Pro をつなぐ

にしてる

F11とF12は日常で使うので、残るF6~F9を埋めていきたい
