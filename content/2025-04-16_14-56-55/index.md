---
title: typeshedにPRを送る際のメモ
category: Tech
tags: ["Python"]
createdAt: 2025-04-16 14:56:55
updatedAt: 2025-04-16 14:56:55
noteLink: https://note.com/optim/n/ne238a9d49987
---

## CONTRIBUTING.mdが長すぎる

[https://github.com/python/typeshed/blob/main/CONTRIBUTING.md](https://github.com/python/typeshed/blob/main/CONTRIBUTING.md?plain=1)

カウントしたら2万文字あった。非ネイティブかつ初心者には簡単ではなかった。
今回PR送るまでのやった流れをメモしておく

## 前提

stubs/tqdm/tqdm/asyncio.pyi
というファイルを編集したので、コマンド内のパスはそれに沿ったものになってる

## PR送るまでの流れ

1 フォーク

2 ブランチ作成

3 なんかインストール

```console
uv venv
uv pip install -r requirements-tests.txt
uv pip install -U pytype
```

4 変更箇所のコミット

5 特定ファイルのみフォーマット(通常は自動で行われる)

```console
pre-commit run --files stubs/tqdm/tqdm/asyncio.pyi
```

6 特定フォルダのみテスト

```console
python tests/runtests.py stubs/tqdm
```

7 PR送信
