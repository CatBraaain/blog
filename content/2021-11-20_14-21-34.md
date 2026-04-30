---
title: ahk マウスポインタ―の軌跡を表示する
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-20 14:21:34
updatedAt: 2021-11-20 14:21:34
noteLink: https://note.com/optim/n/n74dd9066bd9c
---

## 表示

```ahk
DllCall("SystemParametersInfo", UInt, SETMOUSETRAILS:=0x005D, UInt, 5, Str, 0, UInt, 0)
```

## 非表示

```ahk
DllCall("SystemParametersInfo", UInt, SETMOUSETRAILS:=0x005D, UInt, 0, Str, 0, UInt, 0)
```
