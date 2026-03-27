---
title: vscode pythonのTODOコメントが勝手にハイライトされる
category: Tech
tags: ["Python", "VSCode"]
createdAt: 2024-09-21 18:26:30
updatedAt: 2024-09-21 18:26:30
noteLink: https://note.com/optim/n/n6caba7058db5
---

## vscodeでTODOコメントがハイライトされている

pythonでTODOコメントを入れたところハイライトされていることを確認

![](./n6caba7058db5_1726909596-OGhCYEUn7RQ2mpao9kbXSJHc.png)

## 拡張機能ではないんだが

下記のような拡張機能でハイライトできることは知っていたが
それらをインストールしていないことを確認した

[https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)

## 調査

![](./n6caba7058db5_1726909683-LyDfOX6pnIVQG8Z0hjuwEYbU.png)

コマンドパレットで`inspect editor tokens and scopes` を起動した

![](./n6caba7058db5_1726909849-NkIl2Qm8iJvxoOLHStjPGgXs.png)

TODOコメントのところにカーソルを合わせてtextmate scopesを確認すると
`keyword.codetag.notation.python`というスコープになっているのが分かった

keyword.codetag.notationのキーワードでgoogle検索すると

![](./n6caba7058db5_1726909941-trlgns2om0yua9TUOWVwJb7M.png)

MagicPythonの文法ファイルが出てきた！

中身をよく確認してみる

![](./n6caba7058db5_1726909993-mJrbhMHojVZl8tQdkP0UuGBO.png)

NOTE,XXX,HACK,FIXME,BUG,TODOの6つのキーワードがハイライトされる設定になっていることを確認

## 前からそうだったっけ？

![](./n6caba7058db5_1726910548-RiFo4unUIA2zcjQ8mgYtwNVb.png)

MagicPythonでは2017年8月からTODOハイライトを導入
vscodeがMagicPythonを統合したのもそれより前っぽいので

つまり
ずーっと前からそういう仕様だったのか
シラナカッタ！

## 結論

vscodeでpythonにおいてTODOコメントがハイライトされるのは、vscodeの標準機能であるMagicPythonによるもの
