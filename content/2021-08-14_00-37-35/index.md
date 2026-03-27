---
title: 毎日0時にコマンドプロンプトの黒い画面が一瞬出てくる問題
category: Life
tags: []
createdAt: 2021-08-14 00:37:35
updatedAt: 2021-08-14 00:37:35
noteLink: https://note.com/optim/n/ncc05b14d1f62
---

毎日0時にMySQL～という文字が書かれたコマンドプロンプトが一瞬表示される問題について

・MySQLをインストールすると勝手にタスクスケジューラに登録される
・タスクスケジューラに登録されてるタスクを無効か削除すれば解決
・しかし、２～３か月ごとに更新があるので無効化するのもデメリットがある

タスクスケジューラの操作方法など参考URL
[http://nobotta.dazoo.ne.jp/blog/?p=1519](http://nobotta.dazoo.ne.jp/blog/?p=1519)
[https://qiita.com/Yana_023\_/items/a9d734d31331368e804b](https://qiita.com/Yana_023_/items/a9d734d31331368e804b)
[https://teratail.com/questions/5808](https://teratail.com/questions/5808)

Installerが本体更新をするため、Installer更新も必要 参考URL
[https://dev.mysql.com/doc/refman/8.0/en/windows-upgrading.html](https://dev.mysql.com/doc/refman/8.0/en/windows-upgrading.html)

InstallerのアーカイブURL（平均２～３か月ごとに更新されている）

[https://downloads.mysql.com/archives/installer/](https://downloads.mysql.com/archives/installer/)

更新チェックするために毎日黒い画面出てくるのはストレスなので、サイレントに行ってくれるのが一番助かるんだけど、その方法がわからないので
とりあえずとめて、いつか必要になったら（もしくは思い出したら）手動で更新しにいくことにする

[https://dba.stackexchange.com/questions/138589/how-to-disable-annoying-mysql-update-console/224133#224133](https://dba.stackexchange.com/questions/138589/how-to-disable-annoying-mysql-update-console/224133#224133)

一応ここにサイレント実行の方法書いてあるけど
更新ありの場合 y enter押さないといけないからそれも非表示じゃ
更新チェックしたところで結局更新できないから意味ない気がするので
おとなしく無効化した
