---
title: ahk エクスプローラーの指定はahk_exe explorer.exeじゃだめ
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-12-20 12:47:36
updatedAt: 2021-12-20 12:47:36
noteLink: https://note.com/optim/n/n930b7f1d2111
---

ファイルエクスプローラーを開いていなくても
タスクバーがexplorer.exeに関連してるせいで、
起動中として認識されてしまうみたい

```ahk
IfWinExist, ahk_exe explorer.exe
```

これじゃだめで

```ahk
IfWinExist, ahk_class CabinetWClass
```

こうしないといけないみたい

## 参考

[https://www.autohotkey.com/boards/viewtopic.php?t=14541](https://www.autohotkey.com/boards/viewtopic.php?t=14541)
