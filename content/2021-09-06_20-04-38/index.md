---
title: google colabの絶対パスがスラッシュから始まる理由
category: Tech
tags: ["Python"]
createdAt: 2021-09-06 20:04:38
updatedAt: 2021-09-06 20:04:38
noteLink: https://note.com/optim/n/n3a3b61407de0
---

google colab の マウントしたドライブのパスが"/content/drive/MyDrive/"
Windowsだと`C:\~~~`

スラッシュから始まるのかドライブ名から始まるのか大きく違う

これはOSが違うから、ファイルシステムというものも違うらしい

[http://www.ohshiro.tuis.ac.jp/~ohshiro/gaironenshu/02/filesystem.html](http://www.ohshiro.tuis.ac.jp/~ohshiro/gaironenshu/02/filesystem.html)

> ルートディレクトリと呼ばれるものから始まる。
> ルートディレクトリの名前は単なるスラッシュ/である。
> なお，ルートディレクトリの名称が / ならば，上記の絶対パス名は
> //home/teacher/ohshiro/public_html/index.html
> という具合に，２重のスラッシュで始まりそうだが，絶対パスを各場合には，先頭のルートディレクトリ名/は省略する
> ことになっているのでこういう表記
> /home/teacher/ohshiro/public_html/index.html
