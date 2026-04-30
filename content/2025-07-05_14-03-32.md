---
title: "[uv run] 勝手にuv.lockが上書きされる"
category: Tech
tags: ["Python"]
createdAt: 2025-07-05 14:03:32
updatedAt: 2025-07-05 14:03:32
noteLink: https://note.com/optim/n/nd8698c6d516f
---

## uv runが上書きする

uv syncの引数で扱うパッケージを一生懸命調整してるのに
uv runの実行後は、全てのパッケージがインストールされてしまう

```console
uv sync --locked --no-install-project --no-dev
uv run fastapi run
```

バグかと思ったら、そういう仕様みたい

[https://docs.astral.sh/uv/concepts/projects/sync/#automatic-lock-and-sync](https://docs.astral.sh/uv/concepts/projects/sync/#automatic-lock-and-sync)
