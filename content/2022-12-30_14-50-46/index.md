---
title: VBAでRegisterHotkey
category: Tech
tags: ["VisualBasic"]
createdAt: 2022-12-30 14:50:46
updatedAt: 2022-12-30 14:50:46
noteLink: https://note.com/optim/n/n8e5edb07caed
---

## 目的

Application.Onkeyにはない可能性を求めてRegisterHotkeyを学んでみた

## スクリプト

```vb
Private Declare PtrSafe Function CallWindowProc Lib "user32" Alias "CallWindowProcA" (ByVal lpPrevWndFunc As Long, ByVal hWnd As Long, ByVal Msg As Long, ByVal wParam As Long, ByVal lParam As LongPtr) As Long
Private Declare PtrSafe Function GlobalAddAtom Lib "kernel32" Alias "GlobalAddAtomA" (ByVal lpString As String) As Integer
Private Declare PtrSafe Function GlobalDeleteAtom Lib "kernel32" (ByVal nAtom As Integer) As Integer
Private Declare PtrSafe Function RegisterHotKey Lib "user32" (ByVal hWnd As Long, ByVal id As Long, ByVal fsModifiers As Long, ByVal vk As Long) As Long
Private Declare PtrSafe Function SetWindowLongPtr Lib "user32" Alias "SetWindowLongPtrA" (ByVal hWnd As Long, ByVal nIndex As Long, ByVal dwNewLong As LongPtr) As Long
Private Declare PtrSafe Function UnregisterHotKey Lib "user32" (ByVal hWnd As Long, ByVal id As Long) As Long

Private Const GWL_WNDPROC = (-4)
Private Const WM_HOTKEY = &H312

Private Const MOD_ALT = &H1
Private Const MOD_CONTROL = &H2
Private Const MOD_SHIFT = &H4
Private Const MOD_WIN = &H8
Private Const MOD_NOREPEAT = &H4000

Private hWndProc As Long
Private iAtom1 As Integer
Private iAtom2 As Integer

Sub Macro1()
    Debug.Print 1
End Sub
Sub Macro2()
    Debug.Print 2
End Sub

Public Sub StartHook()
  If hWndProc <> 0 Then Exit Sub

  iAtom1 = GlobalAddAtom("HOTKEY1")
  iAtom2 = GlobalAddAtom("HOTKEY2")
  'RegisterHotKey Application.hWnd, iAtom1, MOD_ALT Or MOD_NOREPEAT, vbKeyQ
  RegisterHotKey Application.hWnd, iAtom1, 0, vbKeyQ
  RegisterHotKey Application.hWnd, iAtom2, 0, vbKeyZ

  hWndProc = SetWindowLongPtr(Application.hWnd, GWL_WNDPROC, AddressOf WndProc)
End Sub

Public Sub EndHook()
  If hWndProc = 0 Then Exit Sub

  SetWindowLongPtr Application.hWnd, GWL_WNDPROC, hWndProc

  UnregisterHotKey Application.hWnd, iAtom1
  UnregisterHotKey Application.hWnd, iAtom2
  GlobalDeleteAtom iAtom1
  GlobalDeleteAtom iAtom2

  hWndProc = 0
End Sub

Private Function WndProc(ByVal hWnd As Long, ByVal uMsg As Long, ByVal wParam As Long, ByVal lParam As LongPtr) As Long

  If uMsg = WM_HOTKEY Then
    Select Case wParam
      Case iAtom1: Macro1
      Case iAtom2: Macro2
    End Select
  End If
  WndProc = CallWindowProc(hWndProc, hWnd, uMsg, wParam, lParam)

End Function
```

## スクリプト解説

理解不十分のため解説不可

## スタックしたところ

参考にしたのが32bit用のコードだったらしく、64bitだとうまくいかない点がいくつかあった
・64bitはDeclareの後にPtrSafeをつける
・AddressOfの戻り値がLongではなくLongPtr

RegisterHotkeyの第三引数のモディファイアキーはORを使って複数渡せる

## 参考

[https://www.mrexcel.com/board/threads/block-disable-windows-key-and-prtsc-key-in-excel-vba-7-1-tried-registerhotkey.1188987/](https://www.mrexcel.com/board/threads/block-disable-windows-key-and-prtsc-key-in-excel-vba-7-1-tried-registerhotkey.1188987/)

[https://www.ka-net.org/blog/?p=10800](https://www.ka-net.org/blog/?p=10800)

日本語情報は本当に助かった

他にも10くらいのサイトを参考にしたが、主に上記2つを使った

## あとがき

WndProc内でエラーが起きるとフリーズするのがとてつもなくやっかいで時間がかかった
またRegisterHotkeyは難しかっただけでExcel上ではOnKeyとの違いは感じられなかった
多分Application.Onkeyを使えないOutlookとかPowerpointとかでしか使わないやつなのかもしれない
15時間くらい使っちゃったけど、結局Application.Onkeyに戻す
