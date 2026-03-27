---
title: クッキーの通知バナーを非表示にする
category: Life
tags: []
createdAt: 2024-12-13 11:25:56
updatedAt: 2024-12-13 11:25:56
noteLink: https://note.com/optim/n/n66fe162721a7
---

## 目的

ウェブサイトを閲覧すると右下に
クッキーの使用を許可しますか
みたいに聞いてくるやつ
Yesを押すわけがないし、そもそもその選択に尊重されてないでしょ
っていつも思うのが無駄なのでそもそも最初から見えないようにしたい

## 調査

cookies banner blocker
みたいなワードで調べてみたけどどうもしっくりこない
そもそも要素を非表示にするだけなんだから広告ブロック系ツールの拡張フィルターで対応できるんじゃないかと思って調べてみたら
私が使ってるublock originの拡張フィルターに用意されてた

## ublock originでの設定方法

まずはchrome系ブラウザでこれをインストール

[https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=ja](https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=ja)

拡張機能の設定画面へアクセス

![](./n66fe162721a7_1734056276-BrzKCon5ldR2bPj67GHhE4mF.png)

フィルターリスト=>EasyList/uBO – Cookie Noticesにチェックを入れて

![](./n66fe162721a7_1734056412-jNpU23R8ow0uGrTW7XhOkgzc.png)

変更を適用ボタンを押下したら終わり

![](./n66fe162721a7_1734056509-KPEuFzJtygBp8aLi5SjM0C2q.png)

## 所感

広告ブロック系ツール最高だな
拡張フィルターはあまり調べたこともなかったけど
思い返してみれば自作してる非表示系拡張機能とかフィルター作成で代用できそうなので時間があるときに試してみたい
