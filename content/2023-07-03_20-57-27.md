---
title: ahk blockinput抜け出す方法
category: Tech
tags: ["AutoHotkey"]
createdAt: 2023-07-03 20:57:27
updatedAt: 2023-07-03 20:57:27
noteLink: https://note.com/optim/n/n1c8c08e78873
---

## 解決法は1つだけ

ctrl alt delete を押すと blockinput off になる

> Ctrl+Alt+DeleteキーはWindowsのセキュリティ機能として特別な処理がされているため、このキーコンビネーションは例外的に通常のBlockInputよりも優先されます。

from ChatGPT

## 一部フックは効くと公式に書いてある

> BlockInput がオンの場合でも、特定のタイプのフック ホットキーをトリガーできます。例には、MButton(マウス フック) およびLWin & Space(修飾子ではなく明示的なプレフィックスを使用したキーボード フック$#) が含まれます。

https://www.autohotkey.com/docs/v1/lib/BlockInput.htm

## だが、効かない

> but it not works

https://www.autohotkey.com/boards/viewtopic.php?t=112903

> それは私にとってもうまくいきません。最初に M ボタンを押すとブロックされますが、ブロックを解除することはできません。

https://www.autohotkey.com/boards/viewtopic.php?t=112903
