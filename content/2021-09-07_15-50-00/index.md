---
title: numpy uint型の減算結果がマイナスにならないわけ
category: Tech
tags: ["Python"]
createdAt: 2021-09-07 15:50:00
updatedAt: 2021-09-07 15:50:00
noteLink: https://note.com/optim/n/n39fbe38e3a71
---

```python
print(np.array((1,1,1), dtype='int8')-np.array((5,5,5), dtype='int8'))
# [-4 -4 -4]
print(np.array((1,1,1), dtype='uint8')-np.array((5,5,5), dtype='uint8'))
# [252 252 252]
```

1-5=-4に決まってんだろ！
なんで252なんだよっていう疑問の答え

[https://stackoverflow.com/questions/26678132/python-numpy-subtraction-no-negative-numbers-4-6-gives-254](https://stackoverflow.com/questions/26678132/python-numpy-subtraction-no-negative-numbers-4-6-gives-254)

> dtypeがuint8の場合、すべての数値は、0〜255の範囲の整数として解釈されます。

つまり-4になるはずのものは、

```python
uint8_array=[0,1,2,3,4....251,252,253,254,255]
unit8_array[-4]
# 252
```

こういうことだった
こんなことが2時間ぐらい訳わかんなくて困ってた
質問サイトと質問者と回答者に感謝
