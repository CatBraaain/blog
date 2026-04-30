---
title: act と Docker Compose のマウントパス問題メモ
category: Tech
tags: ["Docker"]
createdAt: 2025-09-16 16:05:17
updatedAt: 2025-09-16 16:05:17
noteLink: https://note.com/optim/n/n3aa35f0c1b87
---

## キーワード

- `dood` vs `dind`
- `act` は `dood` で動作
- `docker inspect -f "{{json .Mounts}}"` でマウント状況を確認

## 現象

Windows 上で Docker Compose を実行するときと、`act` コンテナ内で同じ Compose ファイルを実行するときで、マウントパスが異なっていた。
これは `act` が **dood (Docker-outside-of-Docker)** で動作しているためで、コンテナからは **物理ホストのパス** が参照される仕様になっている。

## 原因

- Windows と WSL ではパス表現が異なる
- dood なので、相対パスを使うとホスト側のパス解決とコンテナ内のパス解決がズレる

## 困った点

- 他者に公開するコードなので絶対パスを使えない
- 結果として、Windows 環境下での Compose + act は相対パスの運用が困難

## 結論メモ

- Windows では dood の挙動のため、相対パスは避けたほうが無難
- 実質的に Linux / WSL 環境でしか安定して動かせない
