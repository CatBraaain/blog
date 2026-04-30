---
title: vscode python ターミナル立ち上げ時に.envファイルが勝手に読み込まれる
category: Tech
tags: ["Python", "VSCode"]
createdAt: 2025-03-02 17:04:16
updatedAt: 2025-03-02 17:04:16
noteLink: https://note.com/optim/n/n46080562b660
---

## 現象

vscodeで新しいターミナルを立ち上げるタイミングで.envファイルの中身が勝手に読み込まれる

## 確認

```python
import os

# from dotenv import load_dotenv
# load_dotenv()

print(f"環境変数: {os.getenv('OPENAI_API_KEY')}")
```

load_dotenv()してないのに、.envファイルの値を出力される

## 原因

vscodeのおせっかい機能なのかバグなのか不明

[https://github.com/microsoft/vscode-python/issues/24209](https://github.com/microsoft/vscode-python/issues/24209)

[https://github.com/microsoft/vscode-python/issues/23856](https://github.com/microsoft/vscode-python/issues/23856)

## 解決方法

```json title="settings.json"
  "python.experiments.optOutFrom": ["pythonTerminalEnvVarActivation"]
```

を設定してからコマンドパレットで"Python: Clear Cache reload".する

という解決策が先のリンク先に書かれていて確かに機能したけど
まったくもって意味が分からないので

```json title="settings.json"
  "python.envFile": ""
```

で対応する

## 所感

エディタの謎の機能にに依存して環境変数を設定させちゃだめでしょ
って感じ
