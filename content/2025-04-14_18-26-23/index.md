---
title: ahk Excelで水平スクロール
category: Tech
tags: ["AutoHotkey", "Windows"]
createdAt: 2025-04-14 18:26:23
updatedAt: 2025-04-14 18:26:23
noteLink: https://note.com/optim/n/n8b9dd0ca0068
---

過去のコードを整理してたらおもしろいコードを見つけたのでここに記しておく

## ExcelでShift+スクロール=>水平スクロール

```ahk
;Excel
#If WinActive("- Excel")
    +WheelUp::
        SetScrollLockState, On
        SendInput {Left}
        SetScrollLockState, Off
    return
    +WheelDown::
        SetScrollLockState, On
        SendInput {Right}
        SetScrollLockState, Off
    return
```

## なぜ SetScrollLockState, On にすると水平スクロールできるのか

> これは **Microsoft Excel の仕様**によるものです。
>
> Excelでは：通常、**矢印キー**はセルの移動に使われます。
> しかし、**Scroll Lock がオン**の場合、**セルは固定されて、画面全体がスクロール**する挙動になります。
> さらに、**Shift + ホイール操作**は縦スクロールではなく、**水平スクロール**として扱われます。
> ただし、このときにアクティブなウィンドウが Excel であり、Scroll Lock がオンになっていると、**矢印キーによる水平スクロールが可能**になるという動作を活用しています。

ChatGPTより

とのこと
