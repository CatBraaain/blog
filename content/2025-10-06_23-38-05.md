---
title: mcr.microsoft.com/windows vs dockur/windows in docker
category: Tech
tags: ["Docker", "Windows"]
createdAt: 2025-10-06 23:38:05
updatedAt: 2025-10-06 23:38:05
noteLink: https://note.com/optim/n/ndd02f94c6dd7
---

## 目的

windowsの環境設定スクリプトのテストに使う環境調べ

## mcr.microsoft.com/windows(公式イメージ)

- **ホスト依存**: Windows ホスト上でしか動かせない。Linux ホストでは動かない。
- **機能**: GUI サポートなし。

## dockurr/windows(非公式)

- **ホスト依存**: Linux/macOS ホスト上でも動作可能。
- **機能**: 完全な Windows デスクトップ環境を提供。GUI サポートあり。

## GithubAction

github actionはどちらも利用できる(公式イメージの方は、windows runner上で)
ただし、dockeur/windowsの方は、起動時にブートから始まるので数分から数十分かかることが予想される。ボリュームを利用すれば二回目以降はすぐに立ち上がるだろうが、初回のみにしても数十分かかるとなると採用しにくい。

## dockurr/windowsは、windowsホストでは微妙かも

win11ホストでkvmを有効のまま起動する方法が分からない
issueを見る感じでは、メンテナーはwin11ではkvm対応していると言っているが、実際にはユーザーはkvmを無効にして起動できたという報告しか見当たらなかった。kvm無効では10倍遅くなるとのことで使い物にならない。

## 私の結論

CIに組み込みたいので環境テストには、公式イメージの方を使おうかな
dockur/windowsのほうは、環境テストには向いておらず、linux上でwindowsを遊ぶGUIアプリとして利用できる。という印象

## 参考

[https://github.com/dockur/windows/issues/857](https://github.com/dockur/windows/issues/857)
[https://github.com/dockur/windows/issues/871](https://github.com/dockur/windows/issues/871)
