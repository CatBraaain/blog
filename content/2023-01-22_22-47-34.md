---
title: vba 現在日時をミリ秒まで取得する方法
category: Tech
tags: ["VisualBasic"]
createdAt: 2023-01-22 22:47:34
updatedAt: 2023-01-22 22:47:34
noteLink: https://note.com/optim/n/n174f508d58a2
---

## ワンライナー3選

```vb
Debug.Print Now() & Right(Format(Timer, "0.00"), 3)
Debug.Print Format(Now(), "YYYY/MM/DD HH:MM:SS") & Right(Format(Timer, "0.00"), 3)
Debug.Print [=TEXT(Now(),"yyyy/mm/dd hh:mm:ss.00")]
```

調べるとやたら長いやつが出てくるけどこれで十分

## 処理時間を計測するならクラスが便利

[https://gist.github.com/CatBraaain/86d09c3589b89dd17aeb2fbf5c8e9186](https://gist.github.com/CatBraaain/86d09c3589b89dd17aeb2fbf5c8e9186)
