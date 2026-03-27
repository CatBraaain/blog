---
title: AHK 電卓でテンキーが効かない
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-12-16 17:40:02
updatedAt: 2021-12-16 17:40:02
noteLink: https://note.com/optim/n/nc61d0a8ed2b5
---

## 問題

電卓でテンキーが効かず、マウスでクリックしないと使えなかった

## 試したこと

[https://answers.microsoft.com/en-us/windows/forum/all/windows-10-calculator-doesnt-accept-keyboard-entry/d1911586-5c20-44b8-9d65-209d1be1a5da](https://answers.microsoft.com/en-us/windows/forum/all/windows-10-calculator-doesnt-accept-keyboard-entry/d1911586-5c20-44b8-9d65-209d1be1a5da)

設定アプリ>システム>アプリと機能>電卓を選択>詳細オプションをクリック>リセット。

解決せず

## 原因

NumberLockがオフになってた

## 勘違い

CapsLockはオンにすると大文字固定になってしまう
なのでNumLockもオンにすると変な風になるからオフにしておくべきと思ってた

[https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1123097786](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1123097786)

> オンにするとテンキー（数字キー）が打てます
> オフにするとテンキーが矢印キーになります。
> 普段はオンにしていれば数字が打てるので便利かと

オーマイガ

## AHKスクリプト

```ahk
SetNumLockState AlwaysOn
SetCapsLockState AlwaysOff
```

NumLockをオフにしていたからOnになおした
電卓使えるようになった

## あとがき

過去にあげたスクリプトの中でも
NumLockState AlwaysOffを使ってた気がする
ジーザスぅ
