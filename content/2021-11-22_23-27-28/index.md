---
title: AHK ダブルクリック単語選択のキーボードショートカット
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-22 23:27:28
updatedAt: 2021-11-22 23:27:28
noteLink: https://note.com/optim/n/n081dc5a8095c
---

## 目的

マウスに手を伸ばさずに単語選択をしたい

## 専用ショートカット

なし

## カーソル操作

①Ctrl+Left
②Ctrl+Shift+Right
の二段階操作で再現可能

## AutoHotkeyで専用ショートカット作成

```ahk
RShift & Space:: Send ^{Left}+^{Right}
```

右シフトとスペースを同時押しで単語選択できるようにした
