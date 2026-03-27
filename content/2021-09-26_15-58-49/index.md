---
title: python 戻り値の2つ目だけ受け取る方法
category: Tech
tags: ["Python"]
createdAt: 2021-09-26 15:58:49
updatedAt: 2021-09-26 15:58:49
noteLink: https://note.com/optim/n/nf2df9ca46d9c
---

```python
def modoru():
    return 1,2
_,b = modoru()
print(b)
```

これアンダーバーじゃなくてアンダースコアっていうみたい
知らなかった
