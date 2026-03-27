---
title: autohotkey win+tabでalt+tabを再現
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-10-11 21:30:37
updatedAt: 2021-10-11 21:30:37
noteLink: https://note.com/optim/n/n37a3386d5a7e
---

```ahk
;WinTab(Shift) → AltTab(Shift)
LWin & Tab::
    AltTabMenu := true
    If GetKeyState("Shift","P")
        Send {Alt Down}{Shift Down}{Tab}
    else
        Send {Alt Down}{Tab}
    return
If (AltTabMenu){
    ~*LWin Up::
        Send {Shift Up}{Alt Up}
        AltTabMenu := false
    return
}
```

先人の知恵を借りたんだけど、リンクなくしちゃった・・・。
