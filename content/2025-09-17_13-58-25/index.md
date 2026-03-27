---
title: Claude Code for VS Codeでccrを使う
category: Tech
tags: ["VSCode"]
createdAt: 2025-09-17 13:58:25
updatedAt: 2025-09-17 13:58:25
noteLink: https://note.com/optim/n/na2d78f0ec980
---

## cc for vscode を無料(ccr)で使いたい

Claude Code = cc
Claude Code Router = ccr

ccrを使うとgemini apiなどの無料モデルでccを使える
ペアコーディングツールとして最も評価されているのがcc

ccrを使うと、ターミナル上ではネイティブ対応しているが
肝心のvscode-ccが使えず、gui差分適用などができないので、vscode-ccでccrを使えるようハックする

## unix系

> alias claude="ccr code"

[https://github.com/musistudio/claude-code-router/issues/33#issuecomment-2992476827](https://github.com/musistudio/claude-code-router/issues/33#issuecomment-2992476827)

## 全ターミナル対応

> ctrl+c を二回押して、`ccr code`と手動入力する

[https://github.com/musistudio/claude-code-router/issues/33#issuecomment-3108639664](https://github.com/musistudio/claude-code-router/issues/33#issuecomment-3108639664)
