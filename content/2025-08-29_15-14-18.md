---
title: '[vscode] python sort-import "as"が別グループになってしまう'
category: Tech
tags: ["Python", "VSCode"]
createdAt: 2025-08-29 15:14:18
updatedAt: 2025-08-29 15:14:18
noteLink: https://note.com/optim/n/n63ccc588e04d
---

## 状況

settings.jsonは下記の通り

```json
{
  "[python]": {
    "diffEditor.ignoreTrimWhitespace": false,
    "editor.codeActionsOnSave": {
      "source.fixAll": "explicit",
      "source.organizeImports": "explicit"
    },
    "editor.defaultFormatter": "charliermarsh.ruff"
  }
}
```

test.pyのsort前

```python
from datetime import datetime as dt, time
```

test.pyのsort後

```python
from datetime import datetime as dt
from datetime import time
```

asエイリアスを使うと複数行に分かれてしまうのを単一行にまとめたい

## 解決方法

pyproject.tomlに下記の設定を加える

拡張機能isortの場合([ドキュメント](https://pycqa.github.io/isort/docs/configuration/options.html#combine-as-imports))

```toml
[tool.isort]
combine_as_imports = true
```

拡張機能ruffの場合([ドキュメント](https://docs.astral.sh/ruff/settings/#lint_isort_combine-as-imports))

```toml
[tool.ruff.lint.isort]
combine-as-imports = true
```

## tips

organizeImportsは、ruffとisortの2つの拡張機能が対応している([ドキュメント](https://code.visualstudio.com/docs/python/formatting?originUrl=%2Fdocs%2Fpython%2Flinting#_choose-a-formatter))

おそらくデフォルトではisortが優先で、ruffを優先する場合はsettings.jsonを下記を追加する

```json
{
  "[python]": {
    "editor.codeActionsOnSave": {
      "source.organizeImports.ruff": "explicit"
    }
  }
}
```

## 参考

- [SO](https://stackoverflow.com/questions/72158600/how-can-i-keep-grouped-imports-by-module-with-isort-for-renamed-imports)
