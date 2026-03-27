---
title: "[vscode] ターミナルでpython venvの自動activateを無効化する"
category: Tech
tags: ["Python", "VSCode"]
createdAt: 2025-09-13 13:35:27
updatedAt: 2025-09-13 13:35:27
noteLink: https://note.com/optim/n/n2a0dd525fc8b
---

## 状況

uvを使っているので、ターミナルレベルでvenv activateする必要性を感じなくなった

## やり方

```json
  "python-envs.terminal.autoActivationType": "off",
  "python.terminal.activateEnvironment": false,
```

## メモ

python-envs.terminal.autoActivationTypeの方が新しい設定で
python.terminal.activateEnvironmentはレガシー設定

新しい設定の方が優先されるはずなので、

```json
  "python-envs.terminal.autoActivationType": "off",
```

だけでできると思ったけど、ターミナルを開くと勝手に有効化されるので

```json
  "python-envs.terminal.autoActivationType": "off",
  "python.terminal.activateEnvironment": false,
```

両方設定したらうまくできた
