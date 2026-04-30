---
title: "[cswin32] 生成されたコードがvscodeで参照できない"
category: Tech
tags: ["C#", "VSCode"]
createdAt: 2025-09-22 22:52:14
updatedAt: 2025-09-22 22:52:14
noteLink: https://note.com/optim/n/n5125cc96db43
---

## 状況

NativeMethods.txtにSTARTUPINFOWというstructを記載したが、Windows.Win32.PInvokeのところにはなくて、名前空間が分からない。生成されたコードの確認方法も分からず、アクセスできない。

## どこにコードが生成されているのか不明

## 名前空間が不明

> 定数は、p/invoke メソッドと同じクラス (デフォルトではWindows.Win32.PInvokeクラス) で定義されます。
>
> その他のサポート型は、Windows.Win32名前空間内または名前空間配下で定義されています。特定の型の名前空間を見つけるには、Visual Studio の「すべてに移動」機能 (Ctrl+T) を使用して、型名を検索クエリとして入力します。

[https://microsoft.github.io/CsWin32/docs/getting-started.html](https://microsoft.github.io/CsWin32/docs/getting-started.html)

とあるが、vscodeを利用しているので、同等の機能がなくて分からない
調べてもvisual studioで利用している情報しかヒットせず

## 名前空間を確認する方法

ランタイムで名前空間配下のクラス一覧を取得する

```csharp
System
    .Reflection.Assembly.GetExecutingAssembly()
    .GetTypes()
    .ToList()
    .ForEach(e => Console.WriteLine(e));
;
```

こんな感じになった

```console
dotnet run
```

```console
Logger
Program
Windows.Win32.FreeSidSafeHandle
Windows.Win32.PInvoke
Windows.Win32.Security.PSID
Windows.Win32.Security.SECURITY_ATTRIBUTES
Windows.Win32.Security.SECURITY_IMPERSONATION_LEVEL
Windows.Win32.Security.TOKEN_ACCESS_MASK
Windows.Win32.Security.TOKEN_INFORMATION_CLASS
Windows.Win32.Security.TOKEN_TYPE
Windows.Win32.System.Threading.PROCESS_CREATION_FLAGS
Windows.Win32.System.Threading.PROCESS_INFORMATION
Windows.Win32.System.Threading.STARTUPINFOW
Windows.Win32.System.Threading.STARTUPINFOW_FLAGS
Windows.Win32.UI.WindowsAndMessaging.MESSAGEBOX_RESULT
Windows.Win32.UI.WindowsAndMessaging.MESSAGEBOX_STYLE
Windows.Win32.UI.WindowsAndMessaging.SHOW_WINDOW_CMD
Windows.Win32.Foundation.BOOL
Windows.Win32.Foundation.HANDLE
Windows.Win32.Foundation.HWND
Windows.Win32.Foundation.PCWSTR
Windows.Win32.Foundation.PWSTR
```

Windows.Win32.System.Threading.STARTUPINFOW
これが欲しかったやつなので、名前空間はWindows.Win32.System.Threadingであることがわかった

生成コードについては、ソースコード内にWindows.Win32.System.Threading.STARTUPINFOWを入力して、Ctrl+Clickで定義元にとぶことで見れたけど
メモリ内に生成？とかなんとかで、パスは分からなかった
