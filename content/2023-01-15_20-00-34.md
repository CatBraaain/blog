---
title: powershellで特定ウィンドウを非表示にする
category: Tech
tags: ["PowerShell"]
createdAt: 2023-01-15 20:00:34
updatedAt: 2023-01-15 20:00:34
noteLink: https://note.com/optim/n/n99a8d485694f
---

## 目的

Chromeを非表示にしたい

## Chromeを非表示にするスクリプト

```powershell
$Signature = @"
[DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
"@

$ShowWindowAsync = Add-Type -MemberDefinition $Signature -Name "Win32ShowWindowAsync" -Namespace Win32Functions -PassThru
$ShowWindowAsync::ShowWindowAsync((Get-Process|Where-Object {$_.MainWindowTitle -like "* - Google Chrome"}).MainWindowHandle, 2)
```

## タスクマネージャーを非表示にするスクリプト

```powershell
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

$Signature = @"
[DllImport("user32.dll")]public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
"@

$ShowWindowAsync = Add-Type -MemberDefinition $Signature -Name "Win32ShowWindowAsync" -Namespace Win32Functions -PassThru
$ShowWindowAsync::ShowWindowAsync(2231972, 6)
$ShowWindowAsync::ShowWindowAsync((Get-Process|Where-Object {$_.MainWindowTitle -like "*タスク マネージャー*"}).MainWindowHandle, 6)
```

## スクリプト解説

タスクマネージャーは管理者権限でShowWindowAsyncしないと非表示になってくれない

## 参考

[https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/add-type?view=powershell-7.3&viewFallbackFrom=powershell-7.1#:~:text=Example%204%3A%20Call%20native%20Windows%20APIs](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/add-type?view=powershell-7.3&viewFallbackFrom=powershell-7.1#:~:text=Example%204%3A%20Call%20native%20Windows%20APIs)

[https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-showwindowasync](https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-showwindowasync)

## あとがき

AddTypeのところが何やってるかさっぱり分からない
