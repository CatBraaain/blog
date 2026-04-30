---
title: Pythonで動画ファイルをデフォルトアプリで再生する方法
category: Tech
tags: ["Python"]
createdAt: 2021-09-01 14:09:58
updatedAt: 2021-09-01 14:09:58
noteLink: https://note.com/optim/n/n1379f9ad8009
---

os.startfile(filepath)
パスを指定して、ファイルに関連付けられたアプリケーションで開く(windowsのみ利用可能な関数）

```python
import os
os.startfile(filepath)
```

Linuxは

```python
import subprocess
subprocess.Popen(filepath)
```

動画作成後のプレビューに使えるので便利
