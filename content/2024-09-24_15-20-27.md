---
title: "__ini__.py で improted but unused (Flake8:F401) の対策方法3つ"
category: Tech
tags: ["Python"]
createdAt: 2024-09-24 15:20:27
updatedAt: 2024-09-24 15:20:27
noteLink: https://note.com/optim/n/n1630753cd721
---

## エラー内容

```console
Flake8(F401)
'xxx.XXX' imported but unused
```

## ignore entire file

エラーコードの指定ができないので、全てのエラーが無視されてしまう

```python
# flake8: noqa
from .xxx import XXX
from .yyy import YYY
```

## ignore each line

エラーコードの指定はできるが、行ごとに書かないといけない

```python
from .xxx import XXX  # noqa: F401
from .yyy import YYY  # noqa: F401
```

## explicit export

これもアリ

```python
from .xxx import XXX
from .yyy import YYY

__all__ = ["XXX", "YYY"]
```

## あとがき

ignoring entire file のやり方いつも覚えられなくて調べるのめんどくさい
独自のsnippetsに登録保存するべきなのかと思うが、何のツールを使ってどこで管理するのかとかが不安定なので、困り
