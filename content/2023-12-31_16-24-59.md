---
title: プログラムと機能からanacondaが消えなかった件
category: Tech
tags: ["Windows"]
createdAt: 2023-12-31 16:24:59
updatedAt: 2023-12-31 16:24:59
noteLink: https://note.com/optim/n/neeaa0bac860c
---

## アンインストール済みなのに残り続けた

ずっと前にアンインストール済みなのに、なぜかあった

## レジストリの確認

```ps1
$keys = Get-ChildItem -Path HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall
$keys | % {$ | Get-ItemProperty} | % {$.DisplayName} | ? {$ -like "conda"}
```

これで確認してもanacondaが見つからなかった

## anaconda最新版をインストール→アンインストールをしてみる

プログラムと機能には、まだ残っていたが、anacondaのアイコンは消えた

## もう一度、インストール→アンインストール

ちゃんと消えた

## まとめ

インストールとアンインストールを2往復したら解決した
