---
title: google colab 仮想環境のアクティベートができない件の対策
category: Tech
tags: ["Python"]
createdAt: 2024-07-27 12:37:25
updatedAt: 2024-07-27 12:37:25
noteLink: https://note.com/optim/n/n23b5b4eeb935
---

## アクティベートできない

```sh
!source /content/.venv/bin/activate
!which pip
/usr/local/bin/pip
```

activateしたはずなのにシステムのpipが出力されているのでアクティベートできてないことが分かる

## 原因

コマンドをわけているから

## 対策

```sh
!source /content/.venv/bin/activate; which pip
/content/.venv/bin/pip
```

コマンドを1行でつなげることでうまくできた

## 参考

[https://stackoverflow.com/questions/48512569/is-it-possible-to-activate-virtualenv-in-google-colab-bin-sh-1-source-not](https://stackoverflow.com/questions/48512569/is-it-possible-to-activate-virtualenv-in-google-colab-bin-sh-1-source-not)
