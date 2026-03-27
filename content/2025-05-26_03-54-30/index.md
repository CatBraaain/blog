---
title: "[uv] pip install -e . を自動でやる"
category: Tech
tags: ["Python"]
createdAt: 2025-05-26 03:54:30
updatedAt: 2025-05-26 03:54:30
noteLink: https://note.com/optim/n/ndffbcf040327
---

## 目的

uv sync + uv pip install -e . ではなくて
uv sync だけでinstall editableされてほしい

## できそうでできない uv add

add editableでインストールしてみる

```console
uv add --editable . --dev
```

pyproject.tomlに下記の自動生成が追加される

```toml
# pyproject.toml

[tool.uv.sources]
my-project = { workspace = true }

[dependency-groups]
dev = [
    "my-project",
]
```

しかし、pip installされてない

```console
> uv pip show my-project
warning: Package(s) not found for: my-project
```

uv syncしてみても変わらず

```console
> uv sync
> uv pip show my-project
warning: Package(s) not found for: my-project
```

こんな風にも変えてみたけど、状況変わらず

```toml
# pyproject.toml

[tool.uv.sources]
my-project = { path = ".", editable = true }

[dependency-groups]
dev = [
    "my-project",
]
```

調べてみる

## ググって出てきたドキュメント

> To install the current project as an editable package
> $ uv pip install -e .

[https://docs.astral.sh/uv/pip/packages/#editable-packages](https://docs.astral.sh/uv/pip/packages/#editable-packages)

手動のやり方しか書いてないけど、どうしても自動でやりたいのでさらに調べる

## ドキュメントの深いところ

> uvはビルドシステムの有無に基づいて、プロジェクトにプロジェクト仮想環境にインストールする必要があるパッケージが含まれているかどうかを判断します。
>
> ビルドシステムが定義されている場合、uvはプロジェクトをビルドし、プロジェクト環境にインストールします。

[https://docs.astral.sh/uv/concepts/projects/config/#build-systems](https://docs.astral.sh/uv/concepts/projects/config/#build-systems)

おや？

> tool.uv.package = true の設定によりプロジェクトは強制的にビルドされ、プロジェクト環境にインストールされます。

[https://docs.astral.sh/uv/reference/settings/#package](https://docs.astral.sh/uv/reference/settings/#package)

これだね

```toml
[tool.uv]
package = false
```

[https://docs.astral.sh/uv/reference/settings/#override-dependencies](https://docs.astral.sh/uv/reference/settings/#override-dependencies)

## 結論

できる
しかも、下記2行を追加するだけなので簡単

```toml
# pyproject.toml

[tool.uv]
package = true
```

## uv syncだけでビルド&インストールされる

```console
> uv sync
> uv pip show my-project
Name: my-project
Version: 0.1.0
...
```

ちゃんと`[project.scripts]`に定義したコマンドもビルドされてた
