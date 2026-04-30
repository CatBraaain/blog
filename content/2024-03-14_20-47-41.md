---
title: pythonの`pyproject.tomlのpip._vendor.tomli.TOMLDecodeError`の解決方法
category: Tech
tags: ["Python"]
createdAt: 2024-03-14 20:47:41
updatedAt: 2024-03-14 20:47:41
noteLink: https://note.com/optim/n/nce7a0f76e917
---

## 経緯

pythonの初めてのパッケージ作成
ローカルにパッケージ作って、`pyproject.toml`作って
`pip install src\mypackage`
を実行したらこうなった

```console
pip._vendor.tomli.TOMLDecodeError: Invalid statement (at line 1, column 1)
```

## 解決方法

tomlファイルの文字コードを utf-8 with bom から utf-8 に変更する

## 参考

[https://paper.hatenadiary.jp/entry/2021/02/21/224455](https://paper.hatenadiary.jp/entry/2021/02/21/224455)

## 所感

こんなしょうもないところで時間かけてられないのだが
英語で検索してもなかなか出てこなくて
日本語で検索したら出てきた（感謝）
た、助かったー
