---
title: 特定ファイルでのみblackformatが動かなった原因
category: Tech
tags: ["Python"]
createdAt: 2024-08-01 20:16:32
updatedAt: 2024-08-01 20:16:32
noteLink: https://note.com/optim/n/n019827a32eba
---

## 目的

vscodeで特定ファイルでblackformatが動かなかったのでその解決

## 原因

文字列テンプレート内でクォーテーションを利用したこと

## 原因スクリプト

```py
f"--user-data-dir={os.path.join(os.getcwd(),"ChromeUserData")}"
```

文字列の外側にダブルクォーテーション
そして内部にもダブルクォーテーションを利用しているのが問題

## 解決方法

```py
f"--user-data-dir={os.path.join(os.getcwd(),'ChromeUserData')}"
```

シングルクォーテーションに変更する

## 誰のバグか

どう見てもフォーマッターのバグなんだけど、少なくともblack 24.4.2ではなおってるらしい
vscode black formatter でも black 24.4.2 を使っているはずなので
よくわからない

blackなのかvscode extensionの方なのか、どっちが悪いのか不明
調べても分からなかったのでシングルクォーテーションに変更して先に進める

## 参考

[https://github.com/microsoft/vscode-black-formatter/issues/517](https://github.com/microsoft/vscode-black-formatter/issues/517)

[https://github.com/psf/black/issues/4408](https://github.com/psf/black/issues/4408)
