---
title: numpy.array のデフォルトdtypeがint32なわけ
category: Tech
tags: ["Python"]
createdAt: 2021-09-15 22:33:16
updatedAt: 2021-09-15 22:33:16
noteLink: https://note.com/optim/n/n49c23dfd5403
---

OSが64bitで、Pythonも64bitなのに、numpyのデフォルトdtypeがint32になるのは、numpyがpythonじゃなくてC言語で動いてるとかなんとか

[https://qiita.com/gomasa/items/f6337087988685d00ebb](https://qiita.com/gomasa/items/f6337087988685d00ebb)

[https://chiyoh.hatenablog.com/entry/2019/05/05/183705](https://chiyoh.hatenablog.com/entry/2019/05/05/183705)

うちのパソコンが異常なのかと心配していたが正常なようだ
