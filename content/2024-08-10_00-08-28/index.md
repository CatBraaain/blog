---
title: python TypeAliasは使わずtypeを使え とのこと
category: Tech
tags: ["Python"]
createdAt: 2024-08-10 00:08:28
updatedAt: 2024-08-10 00:08:28
noteLink: https://note.com/optim/n/nc33dc2733e27
---

python type hintにデビューしたが、古い情報が入り混じって分かりにくかったのでメモ

> バージョン 3.12 以降で非推奨: TypeAlias は非推奨となり、TypeAliasType のインスタンスを作成し、ネイティブで前方参照をサポートする type ステートメントが推奨されます。TypeAlias と TypeAliasType は同様の目的を果たし、同様の名前を持ちますが、これらは別物であり、後者は前者の型ではないことに注意してください。TypeAlias の削除は現在計画されていませんが、ユーザーは type ステートメントに移行することをお勧めします。

[https://docs.python.org/3/library/typing.html#typing.TypeAlias](https://docs.python.org/3/library/typing.html#typing.TypeAlias)
