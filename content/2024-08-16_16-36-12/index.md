---
title: mypy 特定のエラーのみ黙らせる
category: Tech
tags: ["Python"]
createdAt: 2024-08-16 16:36:12
updatedAt: 2024-08-16 16:36:12
noteLink: https://note.com/optim/n/n6a5e7f7aa578
---

## 特定行において単一エラーを黙らせる

```python
from foolib import foo  # type: ignore[attr-defined]
```

## 特定行において複数エラーを黙らせる

カンマ区切りにするだけ

```python
a = None.get("a") or b.get("a")  # type: ignore[attr-defined,name-defined]
```

[https://mypy.readthedocs.io/en/stable/error_codes.html#silencing-errors-based-on-error-codes](https://mypy.readthedocs.io/en/stable/error_codes.html#silencing-errors-based-on-error-codes)
