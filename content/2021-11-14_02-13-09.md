---
title: "ahk #includeが最初のホットキーを実行してしまう"
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-14 02:13:09
updatedAt: 2021-11-14 02:13:09
noteLink: https://note.com/optim/n/n962ac689a868
---

[https://www.autohotkey.com/boards/viewtopic.php?t=23370](https://www.autohotkey.com/boards/viewtopic.php?t=23370)

[https://qiita.com/catfist/items/7186d2b7fd56225b57b9](https://qiita.com/catfist/items/7186d2b7fd56225b57b9)

バグではなく仕様らしい

ホットキーの含まれるファイルをincludeする前にexitかreturnをつけとくと解決する
