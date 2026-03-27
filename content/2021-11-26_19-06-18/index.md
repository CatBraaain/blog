---
title: "ahk #UseHook と #InstallKeybdHook の違い"
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-26 19:06:18
updatedAt: 2021-11-26 19:06:18
noteLink: https://note.com/optim/n/n7100683d9edc
---

## フックとは

キーボードの入力をAHKが認識すること
フックとして認識されたキー入力はKeyhistoryで入力履歴

## どっちもオフの場合

OSの機能であるRegisterHotkeyでホットキーを実装し
一部のRegisterHotkey対応範囲外でのみフックを利用する

## ＃UseHookの効果

定義された全てのホットキーのキー入力をAHKがフックとして認識する

## ＃InstallKeybdHookの効果

全てのキー入力をAHKがフックとして認識する

## さらに

＃InstallKeybdHookを入れておけば
＃UseHook Onは必要ない
デフォルトでOnになっているから
もし、＃UseHook Offなどのコマンドを入力することがれば
またOnに戻すためには＃UseHook Onが必要になることはある

## 正しいスクリプト

```ahk
#InstallKeybdHook
brabrabra
```

```ahk
#InstallKeybdHook
brabrabra
#UseHook Off
brabrabra
#UseHook On
brabrabra
```

## 誤ったスクリプト

```ahk
#UseHook On
#InstallKeybdHook
brabrabra
```

```ahk
#InstallKeybdHook
#UseHook On
brabrabra
```

## 参考

## あとがき

多分こういう
