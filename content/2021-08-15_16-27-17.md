---
title: PythonからSoftalkいじるならsubprocess.runはダメだった
category: Tech
tags: ["Python"]
createdAt: 2021-08-15 16:27:17
updatedAt: 2021-08-15 16:27:17
noteLink: https://note.com/optim/n/nefc461376d69
---

subprocess.runは同期実行
subprocess.Popenは非同期実行

同期実行の場合は、終了を確認してからプロセスを終了するが
softalkの場合、手動でコマンド打たない限り自動で終了してくれないので同期実行だといつまでも終了できない

下記コード

```python
import subprocess
subprocess.Popen(rf'"C:\Program Files\softalk\SofTalk.exe" /R:D:\Downloads\test.wav /X:1 /W:おはようございます')
subprocess.Popen(rf'"C:\Program Files\softalk\SofTalk.exe" /close')
```
