---
title: pythonのコンストラクターに型付けするべきか
category: Tech
tags: ["Python"]
createdAt: 2024-08-09 17:47:56
updatedAt: 2024-08-09 17:47:56
noteLink: https://note.com/optim/n/nb5a3267b1d76
---

## Noneが戻るのは当然だが明示すべきか

```py
__init__(self)
vs
__init__(self) -> None
```

PEP484によると

>  `__init__` メソッドの戻り値の型は -> None としてアノテートすべきです。この理由は微妙ですが重要です。もし `__init__` メソッドが -> None という戻り値のアノテーションをデフォルトで持っていると仮定した場合、引数がなく、アノテーションもされていない `__init__` メソッドが依然として型チェックされるべきかどうかという疑問が生じます。この曖昧さを避け、例外に対するさらに別の例外を導入しないために、単に `__init__` は戻り値のアノテーションを持つべきだとしています。その結果、デフォルトの振る舞いは他のメソッドと同じになります。

## 結論

**つけるべき**

[https://peps.python.org/pep-0484/#the-meaning-of-annotations](https://peps.python.org/pep-0484/#the-meaning-of-annotations)
