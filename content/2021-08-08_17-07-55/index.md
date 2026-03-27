---
title: MPC-BE ジャンプ間隔が設定した通りにならない原因
category: Life
tags: []
createdAt: 2021-08-08 17:07:55
updatedAt: 2021-08-08 17:07:55
noteLink: https://note.com/optim/n/nbf5ad4d4ab27
---

高速シークのチェックを外す
オプション→その他→高速シーク

![画像1](./nbf5ad4d4ab27_picture_pc_429b70ce8f377c8276280b7ec6f84fd6.jpg)

これだけで設定した分だけ正確にジャンプしてくれるようになった。
仕組みはよくわからなかった。

高速シークのチェックをつけたままだと
3000（3秒）に設定しても動画ファイルによって6秒や10秒ジャンプしてしまう現象が起こる。バグじゃなくてちゃんとした理由があるようだけど、英語情報しか見当たらなかったので、よくわからない。

下記参考URL
[https://forum.videohelp.com/threads/396392-MPC-BE-how-to-adjust-jump-forward#post2577000](https://forum.videohelp.com/threads/396392-MPC-BE-how-to-adjust-jump-forward)
[https://sourceforge.net/p/mpcbe/tickets/376/](https://sourceforge.net/p/mpcbe/tickets/376/)
