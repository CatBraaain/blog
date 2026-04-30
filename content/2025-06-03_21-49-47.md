---
title: "[Files]ファイラーのFilesを使ってみてすぐやめた"
category: Life
tags: []
createdAt: 2025-06-03 21:49:47
updatedAt: 2025-06-03 21:49:47
noteLink: https://note.com/optim/n/n5ba8c1859583
---

## Win10のFile Explorerに足りないもの

マルチタブ(Win11で改善してるらしい）
gitアイコン

## 補う方法

QTTabBar
TortoiseGit

## Files

Windowsにおけるファイラーとして最も人気のあるフリーソフト

[https://github.com/files-community/Files](https://github.com/files-community/Files)

### 使ってみた感想

動作が重い
アイコンの読み取りも重い
タブの切り替えさえ重い
何度もタブを切り替えてると途中で描画がとまったりする
Gitのアイコンは出せない

設定のエクスポートしてインポートしなおしたらkeybindがリセットされた
jsonの設定ファイルが上書きされてしまう([https://github.com/files-community/Files/issues/10935](https://github.com/files-community/Files/issues/10935))

## 結論

FileExplorer + QTTabBar + TortoiseGit
の方が軽快でいい

(QTTabBarは、OS設定やコンパネを開くときに干渉？するのが気になる)
