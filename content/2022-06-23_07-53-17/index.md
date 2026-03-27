---
title: AHK BackSpace長押しで単語ごとに削除する
category: Tech
tags: ["AutoHotkey"]
createdAt: 2022-06-23 07:53:17
updatedAt: 2022-06-23 07:53:17
noteLink: https://note.com/optim/n/n73965c956aea
---

## 目的

Backspace長押しの動作が気に入らないので改善したい
・長押しで連打ではなく長押しで単語ごとに消したい
・長押しまでの時間と単語削除リピートの間隔をカスタマイズしたい

## スクリプト

```ahk
Backspace::
    Send {Backspace}
    KeyWait, Backspace, T0.2
    while ErrorLevel {
        Send +^{Left}{Backspace}
        KeyWait, Backspace, T0.2
    }
    KeyWait, Backspace
    return
```

## スクリプト解説

```ahk
Backspace:: ;Backspaceトリガー
    Send {Backspace} ;Backspace単体押しに対応できるように1個だけSend
    KeyWait, Backspace, T0.2 ;0.2秒Backspaceキーが離されるのを待つ
    while ErrorLevel { ;0.2秒以内に離されなかったら
        Send +^{Left}{Backspace} ;単語削除（ShiftCtrlLeftで単語選択できる）
        KeyWait, Backspace, T0.2 ;0.2秒Backspaceキーが離されるのを待つ
    } ;ループ
    KeyWait, Backspace ;Backspace長押し時のキーリピート対策
    return
```

## 感想

日本語入力の全角半角の打ち間違えや漢字入力の変換間違えで単語単位で修正することタイミングも多いし、Ahkアイデアとしてはいいんじゃないかと思う
けど、これ慣れるの大変だろうなあ

一応
・長押しまでの時間と単語削除リピートの間隔をカスタマイズしたい
の希望に対してはWindowsOS設定もあるのでAhkを使わないで済むのならそうしたい
