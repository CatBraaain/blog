---
title: vba keybd_event
category: Tech
tags: ["VisualBasic"]
createdAt: 2022-12-30 10:33:36
updatedAt: 2022-12-30 10:33:36
noteLink: https://note.com/optim/n/n6e9a3f33d5a6
---

vbaでkeybd_eventでキーを押す離すができる

## サンプル

```vb
Private Declare PtrSafe Sub keybd_event Lib "user32.dll" (ByVal bVk As Byte, ByVal bScan As Byte, ByVal dwFlags As Integer, ByVal dwExtraInfo As Integer)
Private Declare PtrSafe Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Integer, ByVal wMapType As Integer) As Integer

Private Declare PtrSafe Function SystemParametersInfo Lib "user32" Alias "SystemParametersInfoA" (ByVal uAction As Integer, ByVal uParam As Integer, ByRef lpvParam As Integer, ByVal fuWinIni As Integer) As Integer

Sub CtrlA()
    keybd_event vbKeyControl, MapVirtualKey(vbKeyControl, 0), 0, 0
    keybd_event vbKeyA, MapVirtualKey(vbKeyA, 0), 0, 0
    keybd_event vbKeyA, MapVirtualKey(vbKeyA, 0), 2, 0
    keybd_event vbKeyControl, MapVirtualKey(vbKeyControl, 0), 2, 0
    'keybd_event(vbKeyA, MapVirtualKey(vbKeyA, 0), 2, 0)
End Sub
```
