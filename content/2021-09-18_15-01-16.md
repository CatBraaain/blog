---
title: webdriver_managerのdriverの保存先を指定する方法
category: Tech
tags: ["Python"]
createdAt: 2021-09-18 15:01:16
updatedAt: 2021-09-18 15:01:16
noteLink: https://note.com/optim/n/nd819304784c1
---

webdriver_managerの.wdmフォルダが邪魔なので動かしたい

seleniumのchromedriverとかの管理を自動で行ってくれるwebdrivermanagerのpython版のwebdriver_manager

これのdriverのダウンロード先がデフォルトで
`C:\Users\USERNAME\.wdm` になってる

そして下記の通りにするとプロジェクトフォルダの直下に指定できる

```python
import os
os.environ['WDM_LOCAL'] = '1'
```

[https://github.com/SergeyPirogov/webdriver_manager](https://github.com/SergeyPirogov/webdriver_manager)

でも、指定のフォルダにダウンロードするオプションなどは見当たらなかったのでライブラリを直接いじった

`\site-packages\webdriver_manager\driver_cache.py`

webdriver_managerライブラリのdriver_chache.pyファイルの１７行目あたり

```python
if self._root_dir is None:
   self._root_dir = os.path.join(os.path.expanduser("~"), ".wdm")
```

これを下記の通りに修正

```python
if self._root_dir is None:
   self._root_dir = r"指定フォルダ"
```

そして最後に
今まで使ってた
`C:\Users\USERNAME\.wdm`これの中身を新しい指定フォルダに手動で移し替えたら完了

ファイルいじってみて、今のところ問題ないけど
合ってるか不安
