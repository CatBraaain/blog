---
title: PowerShellでdateがGet-Dateみたいに扱われる件
category: Tech
tags: ["PowerShell"]
createdAt: 2023-08-06 21:17:29
updatedAt: 2023-08-06 21:17:29
noteLink: https://note.com/optim/n/n3ccf9dea7f4c
---

## dateが現在日時を返す

```ps1
PS > date

2023年8月6日 21:13:08
```

## でも、そんな関数は存在しない

```ps1
PS > Get-Command date
Get-Command : 用語 'date' は、コマンドレット、関数、スクリプト ファイル、または操作可能なプログラムの名前として認識され
ません。名前が正しく記述されていることを確認し、パスが含まれている場合はそのパスが正しいことを確認してから、再試行して
ください。
発生場所 行:1 文字:1
+ Get-Command date
+ ~~~~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (date:String) [Get-Command], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException,Microsoft.PowerShell.Commands.GetCommandCommand
```

## エイリアスでもない

```ps1
PS > Get-Alias date
Get-Alias : name 'date' を含むエイリアスは存在しないため、このコマンドは一致するエイリアスを見つけられません。
発生場所 行:1 文字:1
+ Get-Alias date
+ ~~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (date:String) [Get-Alias], ItemNotFoundException
    + FullyQualifiedErrorId : ItemNotFoundException,Microsoft.PowerShell.Commands.GetAliasCommand
```

## 一体こいつは何なんだ？

正解は、Date → Get-Date と解決されていた
ロジックは下記の通り

## コマンドの解決順序

1.  Alias
2.  Function
3.  Cmdlet (see [Cmdlet name resolution](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_command_precedence?view=powershell-7.3#cmdlet-name-resolution))
4.  External executable files (including PowerShell script files)

[https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_command_precedence?view=powershell-7.3#:~:text=PowerShell%20uses%20the%20following%20precedence%20order%20when%20it%20runs%20commands.](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_command_precedence?view=powershell-7.3#:~:text=PowerShell%20uses%20the%20following%20precedence%20order%20when%20it%20runs%20commands.)

## 上記で解決しなかった場合

先頭に"Get-"をつけてコマンドを再度探す[https://github.com/PowerShell/PowerShell/blob/02b5f357a20e6dee9f8e60e3adb9025be3c94490/src/System.Management.Automation/engine/CommandDiscovery.cs#L1193](https://github.com/PowerShell/PowerShell/blob/02b5f357a20e6dee9f8e60e3adb9025be3c94490/src/System.Management.Automation/engine/CommandDiscovery.cs#L1193)

## 参考

[https://stackoverflow.com/questions/44476159/what-is-date-get-command-date-throws-commandnotfoundexception](https://stackoverflow.com/questions/44476159/what-is-date-get-command-date-throws-commandnotfoundexception)

## あとがき

勝手に "Get-" つけちゃダメでしょ・・・

[https://github.com/PowerShell/PowerShell/blob/02b5f357a20e6dee9f8e60e3adb9025be3c94490/src/System.Management.Automation/engine/CommandDiscovery.cs#L1193](https://github.com/PowerShell/PowerShell/blob/02b5f357a20e6dee9f8e60e3adb9025be3c94490/src/System.Management.Automation/engine/CommandDiscovery.cs#L1193)
