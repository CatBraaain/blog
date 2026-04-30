---
title: ahk 管理者権限でリロードする方法
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-24 10:37:07
updatedAt: 2021-11-24 10:37:07
noteLink: https://note.com/optim/n/n9bb999688510
---

## 目的

スタートアップはタスクスケジューラで管理者権限つけてるけど、ファイルをいじってリロードすると管理者権限がとれてしまっているので、リロード後も管理者権限をつけ続けたい

## スクリプト

```ahk
full_command_line := DllCall("GetCommandLine", "str")

if not (A_IsAdmin or RegExMatch(full_command_line, " /restart(?!\S)"))
{
   try
   {
       if A_IsCompiled
           Run *RunAs "%A_ScriptFullPath%" /restart
       else
           Run *RunAs "%A_AhkPath%" /restart "%A_ScriptFullPath%"
   }
   ExitApp
}

MsgBox A_IsAdmin: %A_IsAdmin%`nCommand line: %full_command_line%
```

## スクリプト解説

ダイアログキャンセルしたらExitAppになる

## 参考

[https://www.autohotkey.com/docs/commands/Run.htm#RunAs](https://www.autohotkey.com/docs/commands/Run.htm)
[https://stackoverflow.com/questions/43298908/how-to-add-administrator-privileges-to-autohotkey-script](https://stackoverflow.com/questions/43298908/how-to-add-administrator-privileges-to-autohotkey-script)
[https://www.autohotkey.com/boards/viewtopic.php?t=63535](https://www.autohotkey.com/boards/viewtopic.php?t=63535)

## あとがき
