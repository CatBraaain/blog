---
title: python datetime.now をミリ秒なしにする
category: Tech
tags: ["Python"]
createdAt: 2024-08-30 22:39:47
updatedAt: 2024-08-30 22:39:47
noteLink: https://note.com/optim/n/n694dd982a941
---

## datetime型のままミリ秒なしにする

```python
from datetime import datetime

now_without_microseconds = datetime.now().replace(microsecond=0)
```

## ミリ秒なしの文字列にする

```python
datetime.now().isoformat(sep=" ", timespec="seconds")
```
