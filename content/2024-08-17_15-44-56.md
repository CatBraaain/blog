---
title: pymysql has not attribute エラー
category: Tech
tags: ["Python"]
createdAt: 2024-08-17 15:44:56
updatedAt: 2024-08-17 15:44:56
noteLink: https://note.com/optim/n/nf8346b8947f6
---

突然現れた謎のエラー

```console
Module has no attribute "connect"; maybe "connection"? (mypy)
```

```console
ModuleNotFoundError: No module named 'pymysql.cursors'; 'pymysql' is not a package
```

## 原因

pymysql.pyというファイルを作ってしまったこと

## 参考

[https://www.quora.com/How-do-I-solve-the-attribute-error-MySQL-that-has-no-attribute-connector-in-Python](https://www.quora.com/How-do-I-solve-the-attribute-error-MySQL-that-has-no-attribute-connector-in-Python)
