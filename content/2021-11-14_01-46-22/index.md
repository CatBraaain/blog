---
title: ahk ファイルを消さずに中身を空にする方法
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-14 01:46:22
updatedAt: 2021-11-14 01:46:22
noteLink: https://note.com/optim/n/nfa3ba29cddfe
---

```ahk
FileRead, MyContents, C:\MyTextFile.txt ;read the contents of the text file
file := FileOpen("C:\MyTextFile.txt", "w") ;this wipes out all text in the file and overwrites it as a blank .txt file
file.close() ;this closes the file
```

fileopenのオプションをrwにすると中身を消さずに追記できるが
編集したい場合は、オプションwにして中身をなくしてから１からまた書き直すしかない

[https://www.autohotkey.com/boards/viewtopic.php?t=62917](https://www.autohotkey.com/boards/viewtopic.php?t=62917)
