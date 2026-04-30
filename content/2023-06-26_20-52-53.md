---
title: excelでセル内文字に対してCtrl+Aが効かないのでahkで対策
category: Tech
tags: ["AutoHotkey", "Windows"]
createdAt: 2023-06-26 20:52:53
updatedAt: 2023-06-26 20:52:53
noteLink: https://note.com/optim/n/n5b508d067ac8
---

## 目的

セルをダブルクリックしてCtrl+Aでセル内の値を全選択したい

## Excelのみでの解決方法

調べたけど見つからなかった

## ahkでの解決方法

```ahk
#If WinActive("- Excel")
	^a::Send {End}+{Home}
```

ugly hackだけどとりま使える
他にいい方法はないのか？
