---
title: pre-commitがruffのinclude設定を無視する
category: Tech
tags: ["Python"]
createdAt: 2025-09-12 15:16:11
updatedAt: 2025-09-12 15:16:11
noteLink: https://note.com/optim/n/n7508fcd13ada
---

## 目的

pre-commitでruffのリント、フォーマットをする

## pyproject.tomlの設定が無視される

```toml title="pyproject.toml"
[tool.ruff]
include = [ "pyproject.toml", "src/**/*.py", "tests/**/*.py" ]
```

```yaml title=".pre-commit-config.yaml"
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.13.0
    hooks:
      - id: ruff-format
        args: [--check]
      - id: ruff-check
```

このように設定しているのに、
uvx pre-commit run --hook-stage pre-commit
を実行すると、includeに含まれないファイルでエラー検出される

## 解決方法

```yaml title=".pre-commit-config.yaml"
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.13.0
    hooks:
      - id: ruff-format
        pass_filenames: false
      - id: ruff-check
        pass_filenames: false
# ref: https://github.com/astral-sh/ruff-pre-commit/issues/54#issuecomment-1916561394
```

もしくは

```yaml title=".pre-commit-config.yaml"
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.13.0
    hooks:
      - id: ruff-format
        args: [--config=pyproject.toml]
      - id: ruff-check
        args: [--config=pyproject.toml]
# ref: https://github.com/astral-sh/ruff-pre-commit/issues/54#issuecomment-2184965689
```
