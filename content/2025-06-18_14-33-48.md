---
title: dockerが使えず、wslがハングしたけど、レジストリリセットでなおった
category: Tech
tags: ["Docker", "Windows"]
createdAt: 2025-06-18 14:33:48
updatedAt: 2025-06-18 14:33:48
noteLink: https://note.com/optim/n/na38fe69b8cb2
---

## Docker Desktopが動かない

2025/06/18 下記エラーのポップアップが出る

```console
An error occurred while updating WSL.

You can manually update using wsl --update.

Alternatively, you can install the MSI from https://github.com/microsoft/WSL/releases/latest ⁠.

If the issue persists, collect diagnostics and submit an issue ⁠.

wsl update failed: updating wsl: elevated update failed: the operating system denied access to the specified file
Read our policy for uploaded diagnostic data⁠
```

ポップアップを閉じると
Docker Engine stopped と表示される

## wslコマンドがハング

下記のようなwslコマンドを実行してもすべてハングする

```console
wsl
wsl --update
wsl --status
wsl --shutdown
```

## wsl再インストールもできず

https://github.com/microsoft/WSL/releases/latest
このURLからwslを.msiから再インストールしようとするも
下記エラーが表示される

```console
Could not write value to key \SOFTWARE\Classes\Directory\shell\WSL
verify that you have sufficient access to that key,
or contact your support personnel
```

## レジストリの変更

[https://github.com/microsoft/WSL/issues/11697#issuecomment-2168104220](https://github.com/microsoft/WSL/issues/11697#issuecomment-2168104220)
この情報に沿って
regeditでレジストリキーエントリー名を変更

変更前
`HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Drive\shell\WSL`
`HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\shell\WSL`

変更後
`HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Drive\shell\WSL_back`
`HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\shell\WSL_bak`

`HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\background\shell\WSL`
↑こいつだけは、変更できず
`レジストリエディターはWSLの名前を変更できません。キーの名前変更中にエラーが発生しました`
と出てしまう

## 再インストール成功

https://github.com/microsoft/WSL/releases/latest
再度.msiでインストールしたら成功した

## 無事修復完了

docker desktopの起動ができた

## 推測

おそらくは下記のうちいずれかのレジストリに誤った値が入ってしまったことが原因なので、レジストリのリセットによって、再インストール可能にするみたいなことだろうか

## 所感

なぜエラーになったのか、なぜ解決したのかが、まったくもって意味が分からない
そして検索しても中国語の情報しか出てこないのも分からない

最近、wingetによるアプリ管理をはじめてみて
毎日スタートアップで`winget upgrade --all --uninstall-previous` をしているのだが、それが原因なのかもしれない
