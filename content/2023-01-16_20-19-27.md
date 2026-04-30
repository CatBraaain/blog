---
title: タスクマネージャーをスタートアップ起動してタスクトレイにしまう方法 Powershell
category: Tech
tags: ["PowerShell"]
createdAt: 2023-01-16 20:19:27
updatedAt: 2023-01-16 20:19:27
noteLink: https://note.com/optim/n/n28516477d6ac
---

```powershell
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

Start-Process -FilePath "Taskmgr.exe"

$Signature = @"
[DllImport("user32.dll")]public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
"@

$ShowWindowAsync = Add-Type -MemberDefinition $Signature -Name "Win32ShowWindowAsync" -Namespace Win32Functions -PassThru
$ShowWindowAsync::ShowWindowAsync((Get-Process|Where-Object {$_.MainWindowTitle -like "*タスク マネージャー*"}).MainWindowHandle, 6)
#pause
```

上記のPowershellスクリプトをタスクスケジューラで管理者権限付きで実行する
タスクマネージャーは管理者権限がないとウィンドウを最小化できない
Start-Processで最初から最小化で起動する方法もあるけどそれだとタスクトレイに隠れない
