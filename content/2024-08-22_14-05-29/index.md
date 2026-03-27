---
title: seleniumで`Created TensorFlow Lite XNNPACK delegate for CPU.`を表示させない
category: Tech
tags: ["Python"]
createdAt: 2024-08-22 14:05:29
updatedAt: 2024-08-22 14:05:29
noteLink: https://note.com/optim/n/n9f0ffdebb708
---

## seleniumを使っていると変なメッセージが出る

```console
Created TensorFlow Lite XNNPACK delegate for CPU.
```

## 解決方法

```python
options.add_argument("--log-level=1")
```

を追加する

## サンプル

selenium4

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--log-level=1")
options.add_experimental_option("detach", True)
driver = webdriver.Chrome(options=options)
driver.get("https://www.google.com/")
```

[https://stackoverflow.com/questions/78385667/why-do-i-keep-getting-this-tensorflow-related-message-in-selenium-errors](https://stackoverflow.com/questions/78385667/why-do-i-keep-getting-this-tensorflow-related-message-in-selenium-errors)
