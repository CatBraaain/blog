---
title: pyproject.tomlのrequires-pythonでpythonのマイナーバージョンを指定する方法
category: Tech
tags: ["Python"]
createdAt: 2025-04-10 17:33:08
updatedAt: 2025-04-10 17:33:08
noteLink: https://note.com/optim/n/n2366bacd8c97
---

## 目的

パッケージマネージャーuvのためにpythonのバージョンの設定を正しく行う

## 状況

```console
> uv add tensorflow

tensorflow has no wheels with a matching Python version tag (e.g., `cp313`)
hint: Wheels are available for `tensorflow` (v2.19.0) with the following Python ABI tags: `cp39`, `cp310`, `cp311`, `cp312`
```

tensorflowをインストールしようとしたら
python3.13に対応していなかった
python3.12なら対応してるとのことだったので3.12.Xにしたい

```toml
# pyproject.toml 今こうなってる

[project]
requires-python = ">=3.13.0"
```

### uv python pin で指定してみる

```console
uv python pin 3.12
uv sync
```

これで3.12に指定はできたけど、`.python-version`ファイルが作成されてしまう
pyproject.tomlだけで完結させたいので、この方法は不採用

## pyproject.tomlで指定してみる

### 下限を指定してみる

```toml
# pyproject.toml before

[project]
requires-python = ">=3.13"


# pyproject.toml after

[project]
requires-python = ">=3.12"
```

```console
uv sync
uv add tensorflow
# same error
python --version
# 3.13
```

3.12を許容範囲内としたけれど互換性の問題が起きてもuvはpythonを3.13から3.12にダウングレードしてくれなかった

uvのpythonバージョン解決順序としては
条件を満たす既にインストールされているPythonの中で一番高いバージョンが使われるらしい

つまり下限だけじゃなくて上限も指定しないと3.13から3.12にダウングレードできない

### 上限も指定してみる

```toml
# pyproject.toml

[project]
requires-python = ">=3.12, <3.13"
```

```console
uv sync
python --version
# 3.12.9
```

できたけど、上限も下限も書くのがなんか冗長

### 短く書く

```toml
# pyproject.toml

[project]
requires-python = "==3.12.*"  # ~=3.12.0でもいいんだけど前者の方が直感的
```

```console
uv sync
python --version
# 3.12.9
```

はいできた。

## pythonバージョン指定子

バージョン指定子は、以下の通り

> ~=: 互換性リリース
> \==: バージョン一致
> !=: バージョン除外
> <=, >=: 範囲指定
> <, >: 範囲指定
> \===: 完全一致

[https://packaging.python.org/en/latest/specifications/version-specifiers/#id5](https://packaging.python.org/en/latest/specifications/version-specifiers/#id5)

リンク先に十分に使い方の例が書いてあったけど
うまくイメージしきれなかったので追加例を下に記載

```text
~=3.12    # >=3.12,<4 と同じ
~=3.12.1  # >3.12.1,<3.13 と同じ
==3.12.*  # >=3.12,<3.13 と同じ
===3.12.0 # ===の中ではワイルドカードは使えない

# 3.12 にプレリリースが存在する場合
~=3.12    # 3.12.0a は含まれる
~=3.12.0  # 3.12.0a は含まれない

# メジャーバージョン指定する場合
~=3.0     # ~=3 は使っちゃいけないみたい
==3.*     # 前述の通りプレリリースも許容

# マイナーバージョンを指定する場合
==3.12.*  # ~=3.12だと
```

## 参考

[https://github.com/astral-sh/uv/issues/7429](https://github.com/astral-sh/uv/issues/7429)

[https://github.com/astral-sh/uv/issues/8247](https://github.com/astral-sh/uv/issues/8247)

[https://github.com/astral-sh/uv/issues/5609](https://github.com/astral-sh/uv/issues/5609)
