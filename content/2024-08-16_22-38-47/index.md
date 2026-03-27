---
title: python datetime タイムゾーンを変更
category: Tech
tags: ["Python"]
createdAt: 2024-08-16 22:38:47
updatedAt: 2024-08-16 22:38:47
noteLink: https://note.com/optim/n/n40777638fa17
---

## 標準ライブラリでできる

調べると外部ライブラリ使う情報ばかり出てくるけど
全然標準でできた
まずは標準を覚えなきゃね

## やり方

datetime.astimezone(tz=None) でローカルタイムゾーンに変換

```python
s = "2024-08-14T03:00:02.000Z"
print(datetime.fromisoformat(s).tzinfo)
print(datetime.fromisoformat(s).astimezone(tz=None))
```
