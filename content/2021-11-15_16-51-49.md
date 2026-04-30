---
title: autohotkey altキーをwinキーに入れ替え alt+tabはそのまま alt単発で無変換キー
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-15 16:51:49
updatedAt: 2021-11-15 16:51:49
noteLink: https://note.com/optim/n/nc13206c02cff
---

```ahk
LAlt::Send {LWin Down}{vk1Dsc07B} ;無変換
LAlt & Tab::Send {Alt Down}{Tab}
LAlt Up::Send {LWin Up}{LAlt Up}
```

LAlt押下でLWinDownと無変換を送信
無変換も一緒に送信されるので単発押しでスタートメニューが開くこともない

AltTabでAltDownとTab

最後のAltを離したらWinもAltもUp

これ昨日は押しっぱなし病が出たと思ったけど今日は大丈夫だった
何か設定を変えたせいか、要因は不明だが様子見していく
