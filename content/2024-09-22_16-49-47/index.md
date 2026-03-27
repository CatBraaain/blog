---
title: mypy '自作パッケージが becomes "Any" due to an unfollowed import の場合'
category: Tech
tags: ["Python"]
createdAt: 2024-09-22 16:49:47
updatedAt: 2024-09-22 16:49:47
noteLink: https://note.com/optim/n/nf9dd03672a4e
---

## 現状

```text
└── 📁pkg
    └── 📁src
        └── 📁pkg
            └── __init__.py
            └── xxx.py
            └── yyy.py
    └── pyproject.toml
```

## エラー発生

becomes "Any" due to an unfollowed import

## あーはいはいpy.typed足せばいいんでしょ

```text
└── 📁pkg
    └── 📁src
        └── 📁pkg
            └── __init__.py
            └── xxx.py
            └── yyy.py
    └── py.typed
    └── pyproject.toml
```

再度エラー発生
becomes "Any" due to an unfollowed import

あ...
py.typedの位置が間違ってる
不覚...

```text
└── 📁pkg
    └── 📁src
        └── 📁pkg
            └── __init__.py
            └── xxx.py
            └── yyy.py
            └── py.typed
    └── pyproject.toml
```

なおった
