---
title: ahk 長押し中にキーリピート（連打）扱いされるを回避する方法
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-20 14:25:43
updatedAt: 2021-11-20 14:25:43
noteLink: https://note.com/optim/n/ndecd48395c25
---

## 回避

```ahk
Shift::
	SendEvent {m Down}
	keywait, Shift
	return

Shift Up::
	SendEvent {m Up}
```

これでシフトを長押ししてもmボタンは連打されず、ただの長押しになる

## これも同じ

```ahk
Shift::SendEvent {m Down}
```

```ahk
Shift::m
```

これでも連打されない扱いにはなるが、この場合1行に納めないといけないので2行以上書く場合はkeywaitが必要になる
