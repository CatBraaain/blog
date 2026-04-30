---
title: "[vscode-ruff] 特定ルールのみをauto-fixingから除外する"
category: Tech
tags: ["Python", "VSCode"]
createdAt: 2025-08-29 16:51:23
updatedAt: 2025-08-29 16:51:23
noteLink: https://note.com/optim/n/n1a9cd63d7682
---

## 状況

`[F401]unused-import`
は、未使用のimportを検出して警告を出してくれる便利なルールだが
onSaveの自動修正を適用する設定にしていると、作業途中にファイルを保存したときに、これから使おうと思っていたimport文が消されたりしてしまうため

F401以外のルールは自動修正を適用したいため、自動修正を無効化することはできなくて。
F401はリントだけはして欲しいので、F401をruff.ignoreで無効化することもできない。

F401は、リントはして欲しいが、自動修正はしてほしくない。

## 古いやり方

```json
{
  "ruff.args": ["--unfixable=F401"]
}
```

```json
{
  "ruff.lint.args": ["--unfixable=F401"]
}
```

## 新しいやり方

```json
{
  "ruff.configuration": {
    "lint": {
      "unfixable": ["F541"]
    }
  }
}
```

## 参考

[https://github.com/astral-sh/ruff-vscode/issues/260](https://github.com/astral-sh/ruff-vscode/issues/260)
