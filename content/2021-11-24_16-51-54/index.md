---
title: ahk 矢印キーでマウスを1pxずつ動かす
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-24 16:51:54
updatedAt: 2021-11-24 16:51:54
noteLink: https://note.com/optim/n/nc8b7dd798b3c
---

## 目的

・スクリーンショットのエリア決めや
・エクセルのセルの大きさの変更
・Youtubeの音量変更
などなど、マウスで細かい微調整をしたいときに矢印キーで確実に1pxずつマウスを動かしたい

## スクリプト

```ahk
~LButton & Up:: MouseMove, 0, -1, 0, R
~LButton & Down:: MouseMove, 0, 1, 0, R
~LButton & Left:: MouseMove, -1, 0, 0, R
~LButton & Right:: MouseMove, 1, 0, 0, R
```

## スクリプト解説

```ahk
~LButton & Up:: MouseMove, 0, -1, 0, R
```

クリックしながら矢印キーでその方向に動く

チルダは、つけないと左クリックが効かなくなった

引数のRをつけると相対座標
省略で絶対座標となる

## 参考

[http://ahkwiki.net/MouseMove](http://ahkwiki.net/MouseMove)

## あとがき

左クリックと矢印を2キー入れて斜め方向に動かそうと思ったら、片方しか動かなかった
同時押し対応させる方法が分からない・・・。
