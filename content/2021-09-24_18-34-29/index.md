---
title: libraqmをwindowsにインストールする方法
category: Tech
tags: ["Python", "Windows"]
createdAt: 2021-09-24 18:34:29
updatedAt: 2021-09-24 18:34:29
noteLink: https://note.com/optim/n/n93c561cd098b
---

pillowの縦書きに必要なlibraqm

## インストール手順

①pip install pillowでpillowを普通にいれる
②libraqm‑0.7.1.dll.zipを下記URLからダウンロードする
[https://www.lfd.uci.edu/~gohlke/pythonlibs/#pillow](https://www.lfd.uci.edu/~gohlke/pythonlibs/)
③zipを解凍する
④x64フォルダの中からfribidi-0.dllとlibraqm.dllをコピーする
pythonが64bitならx64フォルダ。32bitならx86フォルダ
⑤python.exeと同じ場所に張り付ける`C:\Users\USERNAME\AppData\Local\Programs\Python\Python39\`
⑥下記コードでtrueが出力されるのを確認して終わり

```python
from PIL import features
print(features.check('raqm'))
```

たった3分で終わる作業なのになぜか情報が全然なくて、探すのが大変だった

## 参照URL

[https://stackoverflow.com/questions/62939101/how-to-install-pre-built-pillow-wheel-with-libraqm-dlls-on-windows](https://stackoverflow.com/questions/62939101/how-to-install-pre-built-pillow-wheel-with-libraqm-dlls-on-windows)

[https://github.com/python-pillow/Pillow/issues/4859](https://github.com/python-pillow/Pillow/issues/4859)
