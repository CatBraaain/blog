---
title: ahk ifwinactive で エクスプローラーを検出する方法
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-10-20 15:40:07
updatedAt: 2021-10-20 15:40:07
noteLink: https://note.com/optim/n/n5f1786f335dc
---

wingettitleでは、フォルダパスがタイトルになってしまうので

WindowsSpyでクラス名やらを確認して指定する方法があるが

```ahk
#IfWinActive ahk_exe explorer.exe
```

これが一番わかりやすい
