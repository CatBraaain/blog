---
title: nvm-windowsでグローバルインストールがエラーになる対策
category: Tech
tags: ["js/ts"]
createdAt: 2025-04-10 18:22:21
updatedAt: 2025-04-10 18:22:21
noteLink: https://note.com/optim/n/n32f26220b6da
---

## エラー内容

```console
> npm i -g tsx

npm error code EPERM
npm error syscall mkdir
npm error path C:\Program Files\nvm\v23.10.0\node_modules\tsx
npm error errno -4048
npm error Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nvm\v23.10.0\node_modules\tsx'
npm error     at async mkdir (node:internal/fs/promises:853:10)
npm error     at async C:\Program Files\nvm\v23.10.0\node_modules\npm\node_modules\@npmcli\arborist\lib\arborist\reify.js:624:20
npm error     at async Promise.allSettled (index 0)
npm error     at async [reifyPackages] (C:\Program Files\nvm\v23.10.0\node_modules\npm\node_modules\@npmcli\arborist\lib\arborist\reify.js:325:11)
npm error     at async Arborist.reify (C:\Program Files\nvm\v23.10.0\node_modules\npm\node_modules\@npmcli\arborist\lib\arborist\reify.js:142:5)
npm error     at async Install.exec (C:\Program Files\nvm\v23.10.0\node_modules\npm\lib\commands\install.js:150:5)
npm error     at async Npm.exec (C:\Program Files\nvm\v23.10.0\node_modules\npm\lib\npm.js:207:9)
npm error     at async module.exports (C:\Program Files\nvm\v23.10.0\node_modules\npm\lib\cli\entry.js:74:5) {
npm error   errno: -4048,
npm error   code: 'EPERM',
npm error   syscall: 'mkdir',
npm error   path: 'C:\Program Files\nvm\v23.10.0\node_modules\tsx'
npm error }
npm error
npm error The operation was rejected by your operating system.
npm error It's possible that the file was already in use (by a text editor or antivirus),
npm error or that you lack permissions to access it.
npm error
npm error If you believe this might be a permissions issue, please double-check the
npm error permissions of the file and its containing directories, or try running
npm error the command again as root/Administrator.
npm error A complete log of this run can be found in: C:\Users\PRO\AppData\Local\npm-cache\_logs\2025-04-10T09_15_59_689Z-debug-0.log
```

## 原因

nvmのインストール先のデフォルトは、`C:\Users\username\AppData\Local\nvm`なのだが
これをわざわざ`Program Files`にしていた

そのためグローバルパッケージは、`Program Files`フォルダの配下に保存される
そして、`Program Files`の配下は管理者権限がないとファイル操作はできない

## 解決方法

コマンドプロンプトを管理者権限で実行する
もしくは、インストール先をデフォルトに戻す
