---
title: ZOOMやDiscordの通話をするとYoutubeの音声が聞こえなくなる問題の解決方法 win10
category: Tech
tags: ["Windows"]
createdAt: 2021-11-28 11:01:03
updatedAt: 2021-11-28 11:01:03
noteLink: https://note.com/optim/n/ncfb5d95ae0ec
---

![](./ncfb5d95ae0ec_f976bf39939e3c7428ffbff51bdcb014.png)

## 困っていること

ZOOMやDiscordで通話を開始すると
Chromeで再生してるYoutubeの音が聞こえなくなる

## 原因

AirPods Proを使っていること

## 原因解説

AirPods Proは、2つのモードがある
Stereoモード：高音質。音を聞くことはできるがマイクは使えない
Hands-Freeモード：低音質。聞くこともマイクで話すこともできる

普段Youtubeを再生しているときはStereoモードで聞いているのに、
通話を始めるとマイクをオンにする必要があるのでHands-Freeモードで通話が始まる。
しかし、Youtubeの音声出力は引き続きStereoモードが選択されているため、Hands-FreeモードとなっているAirPods Proには音声が届かないという仕組み

## 解決方法

Youtubeの音声出力先をHands-Freeモードに変更する

## 解決方法詳細

右下のサウンドアイコンをクリック

![](./ncfb5d95ae0ec_1638064477511-vGk1WmvxwF.png)

デバイス名の書かれている行をクリック

![](./ncfb5d95ae0ec_1638064483490-fraSbUcE9O.png)

Stereoが選択されているので
Hands-Freeをクリック選択

![](./ncfb5d95ae0ec_1638064483428-3VEdemE3yK.png)

Hands-Freeが選択された

![](./ncfb5d95ae0ec_1638064483511-VokWCG5IUT.png)

## 結果

通話を続けながらYoutubeを聞けるようになったが
低音質のため、音がガビガビになる
音声入力のみHands-Free、出力はStereoというふうにできればいいのだがそれはできないようなので
音ガビガビ問題についての解決方法は、マイクを別で用意するしかないみたい

## 参考

[https://support.discord.com/hc/en-us/community/posts/360058634351-Discord-mutes-all-other-sounds](https://support.discord.com/hc/en-us/community/posts/360058634351-Discord-mutes-all-other-sounds)

[https://www.reddit.com/r/Zoom/comments/isz3rq/computer_audio_not_working_while_in_zoom_call_can/](https://www.reddit.com/r/Zoom/comments/isz3rq/computer_audio_not_working_while_in_zoom_call_can/)

## あとがき

こんな2つのモードがあるなんて知らなかった！
