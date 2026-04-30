---
title: 特定行でflake8とmypyの両方をignoreしたい
category: Tech
tags: ["Python"]
createdAt: 2024-08-09 23:38:50
updatedAt: 2024-08-09 23:38:50
noteLink: https://note.com/optim/n/n384348a91c3c
---

## flake8

```py
対象行の最後に  # noqa: E402
```

## mypy

```py
対象行の最後に  # type: ignore
```

## 両方の場合

```py
これはうまくいかず  # noqa: E402 # type: ignore
これがうまくいく   # type: ignore # noqa: E402
```

順番が重要なのね

## ファイル全体の場合は先頭に二行に分けて書く

```py
# type: ignore
# flake8: noqa
```

## 参考

[https://stackoverflow.com/questions/51179109/set-pyflake-and-mypy-ignore-same-line](https://stackoverflow.com/questions/51179109/set-pyflake-and-mypy-ignore-same-line)
