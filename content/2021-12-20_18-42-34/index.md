---
title: ahk settimerとsleepの違い
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-12-20 18:42:34
updatedAt: 2021-12-20 18:42:34
noteLink: https://note.com/optim/n/nb39ac60a18a4
---

## 目的

時間差で何かを実行させたいときにどっちを使えばいいのか理解する

## 初学者のメモ：長時間ならSetTimerを使った方がよいのかも？

Sleepは、待っている間、他のスクリプトがとまる
Hotkeyは動くとのこと

SetTimerは、待っている間も他のスクリプトが動くので
さまたげにならない

わざとスクリプトの動きを妨げるためにSleepを使う状況は思いつかないので、長時間ならSetTimerを使えばいいかと思った

## 参考

[https://www.autohotkey.com/board/topic/7014-settimer-vs-sleep/](https://www.autohotkey.com/board/topic/7014-settimer-vs-sleep/)

## あとがき

SetTimerはラベルを用意しなきゃならないのが面倒…
