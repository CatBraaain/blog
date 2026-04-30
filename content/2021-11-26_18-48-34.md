---
title: ahk 別のスクリプトを実行するとCapsLockのホットキーが効かなくなる
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-26 18:48:34
updatedAt: 2021-11-26 18:48:34
noteLink: https://note.com/optim/n/n07cdd34fd11a
---

## スクリプト

```ahk
F6::Run, Timer.ahk
Capslock::Send {vkF3} ;全角半角
```

F6でタイマースクリプトを動かすと
CapsLockでのIME切り替えができなくなった

## 原因

```ahk
SetCapsLockState AlwaysOff
```

Timerスクリプトの中にこれがあった

Timerスクリプト実行前
①CapsLockボタン押す
②それをメインスクリプトがキャッチ
③全角半角キーに置き換え
という流れだったのが

Timerスクリプト実行後
①CapsLockボタンを押す
②それをTimerスクリプトがキャッチし無効化
③メインスクリプトでイベントをキャッチできないので何も起こらない
という流れになってしまったのだと思う
