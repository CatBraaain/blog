---
title: python tox で batコマンドが実行できない
category: Tech
tags: ["Python"]
createdAt: 2024-08-11 22:40:34
updatedAt: 2024-08-11 22:40:34
noteLink: https://note.com/optim/n/nf7607283ba23
---

## 解決法

cmdをallowlistに加えて
commandsでは、cmd /c から書く

```ini title="tox.ini"
allowlist_externals = cmd
commands =
    cmd /c if exist dist rmdir dist /q /s
```

[https://stackoverflow.com/questions/53395319/tox-could-not-find-executable-rmdir](https://stackoverflow.com/questions/53395319/tox-could-not-find-executable-rmdir)
