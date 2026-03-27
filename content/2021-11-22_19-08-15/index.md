---
title: 'Program Default Editorで右クリックの"編集"のデフォルトソフトを変更する'
category: Tech
tags: ["Windows"]
createdAt: 2021-11-22 19:08:15
updatedAt: 2021-11-22 19:08:15
noteLink: https://note.com/optim/n/n3d127b8f2abf
---

![](./n3d127b8f2abf_6ae9b4f93a17f075509f185ac9d7370d.jpg)

## 目的

テキストファイルをメモ帳ではなく、他のエディタで開くときに、右クリック＋Eで一発で開きたい

複数拡張子の設定を変更したいので、レジストリエディタは使わずフリーソフトでポチポチ簡単に変更したい

## 使用ソフト

Default Program Editor
拡張子ごとの右クリックのコンテキストメニューを簡単に変えられる
拡張子ごとのファイルのアイコンも変えられる

## 編集ボタンのデフォルトソフト変更のやり方

[https://forest.watch.impress.co.jp/library/software/defprogedit/](https://forest.watch.impress.co.jp/library/software/defprogedit/)

ここからダウンロードして解凍して
Default Programs Editor.exeを開く

![画像1](./n3d127b8f2abf_picture_pc_e2ee066cdda95363a19c4088f97f6af3.jpg)

File Type Settingをクリック

![画像2](./n3d127b8f2abf_picture_pc_093965855c3bac86bd617c5262ebed9d.jpg)

Context Menuをクリック

![画像3](./n3d127b8f2abf_picture_pc_c270a1f1bf222b64356484a6a34f7252.jpg)

こういう画面になるのでここから任意の拡張子を探す

![画像4](./n3d127b8f2abf_picture_pc_d22c5921965354b9267f1d0309ae9d88.jpg)

.txt拡張子を選択して、右下のNextをクリック

![画像5](./n3d127b8f2abf_picture_pc_79424a809d398fec9f3344487089dfc4.jpg)

Editという列をダブルクリック

![画像6](./n3d127b8f2abf_picture_pc_4be793536edaeda498aff2e2530454ae.jpg)

Program Pathのところがメモ帳へのパスになっているので

![画像7](./n3d127b8f2abf_picture_pc_5e56f9544e212f02741ce1fbe75918f9.jpg)

任意のソフトのEXEパスを入力してNextクリック

![画像8](./n3d127b8f2abf_picture_pc_8c66f9f2b9eaa547aaff0ac87f2b70fe.jpg)

Save Context Menuをクリック

![画像9](./n3d127b8f2abf_picture_pc_3312fbe7ddabe19e7847b1fbeaa30ace.jpg)

OKをクリック

終わり

便利すぎ

## 感想

終わってから気づいたけど

テキストファイルのエディタをすべてかえるなら

編集ボタンの中身をいじるよりも
編集ボタンを消してから
`コンピューター\HKEY_CLASSES_ROOT\*\shell`
ここに共通のボタン作った方がのちのち管理が楽だ
