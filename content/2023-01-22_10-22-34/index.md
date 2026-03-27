---
title: HSHELL_WINDOWACTIVATED と HSHELL_RUDEAPPACTIVATED の違い
category: Tech
tags: ["AutoHotkey", "C#"]
createdAt: 2023-01-22 10:22:34
updatedAt: 2023-01-22 10:22:34
noteLink: https://note.com/optim/n/nb2aa31daa26f
---

## RegisterShellHookWindow 関数

wParamに使われている
HSHELL_WINDOWACTIVATEDと
HSHELL_RUDEAPPACTIVATED の違いを調べた

[https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-registershellhookwindow](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-registershellhookwindow)

## 意味の違い結論

意味の違いは不明だが
全画面アプリに関係しているかもしれないという情報が1つだけあった

[https://stackoverflow.com/questions/1178020/does-anybody-know-what-means-shellhook-message-hshell-rudeappactivated](https://stackoverflow.com/questions/1178020/does-anybody-know-what-means-shellhook-message-hshell-rudeappactivated)

[https://stackoverflow.com/questions/49610663/how-to-activate-a-function-everytime-the-target-window-becomes-active-in-autohot](https://stackoverflow.com/questions/49610663/how-to-activate-a-function-everytime-the-target-window-becomes-active-in-autohot)

## 使い方の結論

使い方としては、WindowsActivatedイベントを補足したかったら、
HSHELL_WINDOWACTIVATEDとHSHELL_RUDEAPPACTIVATEDを両方とも見ればOK

```csharp
protected override void WndProc(ref Message m) {
  if (m.Msg == _wmShellHook) {
    switch ((User32.ShellEvents)m.WParam) {
      ...

      case User32.ShellEvents.HSHELL_RUDEAPPACTIVATED: // < line added
      case User32.ShellEvents.HSHELL_WINDOWACTIVATED:
        if (WindowActivated != null) {
          WindowActivated.Invoke(this, m.LParam);
        }
        break;
    }
  }

  base.WndProc(ref m);
}
```

[https://stackoverflow.com/questions/74439314/c-get-informed-when-any-new-process-is-started-any-new-window-is-opened](https://stackoverflow.com/questions/74439314/c-get-informed-when-any-new-process-is-started-any-new-window-is-opened)

```ahk
ShellMessage(wParam, lParam)
{
    static HSHELL_WINDOWACTIVATED := 0x04
         , HSHELL_HIGHBIT := 0x8000
         , HSHELL_RUDEAPPACTIVATED := HSHELL_WINDOWACTIVATED | HSHELL_HIGHBIT

    if (wParam == HSHELL_RUDEAPPACTIVATED || wParam == HSHELL_WINDOWACTIVATED)
    {
        WinGetTitle, title, % "ahk_id " lParam
        ToolTip, % (wParam == HSHELL_WINDOWACTIVATED ? "HSHELL_WINDOWACTIVATED" : "HSHELL_RUDEAPPACTIVATED") " message received!`nWindow activated: " title "`nHWND: " lParam
    }
}
```

[https://stackoverflow.com/questions/70258508/how-to-winwait-for-two-or-more-different-windows-in-autohotkey](https://stackoverflow.com/questions/70258508/how-to-winwait-for-two-or-more-different-windows-in-autohotkey)

## あとがき

そもそもRUDEAPPACTIVATEDってどういう命名なんだろう
作りが雑なアプリってこと・・・？
