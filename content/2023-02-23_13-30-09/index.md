---
title: keybd_event関数でRAltがLAltとして機能してしまう件
category: Tech
tags: ["VisualBasic"]
createdAt: 2023-02-23 13:30:09
updatedAt: 2023-02-23 13:30:09
noteLink: https://note.com/optim/n/n1ab0ce1863ee
---

## 目的

VBAからkeybd_eventでRAltを送信したい

## 誤ったスクリプト

```vb
Sub SendRAlt()
    RAlt = 165
    vk = RAlt
    keybd_event vk, MapVirtualKey(vk, 0), 0, 0
    keybd_event vk, MapVirtualKey(vk, 0), 2, 0
End Sub
```

これだとLAltが送信されてしまう

## 正しいスクリプト

```vb
Sub SendRAlt()
    RAlt = 165
    vk = RAlt
    keybd_event vk, MapVirtualKey(vk, 0), 1, 0
    keybd_event vk, MapVirtualKey(vk, 0), 2, 0
End Sub
```

keybd_eventの第3引数を0から1に変えたらうまくいった

## 参考

[https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-keybd_event](https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-keybd_event)

[https://stackoverflow.com/questions/31897051/alt-key-keyboard-event-is-not-working-in-all-keyboard-layout](https://stackoverflow.com/questions/31897051/alt-key-keyboard-event-is-not-working-in-all-keyboard-layout)

## あとがき

過去に2度調べたけど、情報見つからなくて諦めたんだけど
3度目の正直でようやく解決した
情報量が少なくてぷんぷん
