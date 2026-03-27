---
title: "TypeError: text() got multiple values for argument 'fill'の原因"
category: Tech
tags: ["Python"]
createdAt: 2021-09-26 17:07:25
updatedAt: 2021-09-26 17:07:25
noteLink: https://note.com/optim/n/ncb8ee5f9e857
---

pillowで画像にテキスト挿入しようとしたときのエラー

## 誤り

```python
draw.text(x, y, text, font=font, fill='#FFF')
```

## 正しい

```python
draw.text((x, y), text, font=font, fill='#FFF')
```
