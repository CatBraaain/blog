---
title: win10ファイル履歴をgoogle driveに直接保存する方法（バッドノウハウ）
category: Tech
tags: ["Windows"]
createdAt: 2021-09-18 22:43:42
updatedAt: 2021-09-18 22:43:42
noteLink: https://note.com/optim/n/n483560d571ca
---

google driveをファイル履歴でローカルに保存する方法はヒットしたが
ローカルファイルをファイル履歴でgoogle driveに保存する方法は見当たらなかったので手探りでやってみた

## 流れ

①パソコン版Googleドライブを入れる
②エクスプローラーのGドライブにGoogleDriveが割り当てられる
③Gドライブのマイドライブフォルダのプロパティの共有タブから共有設定をし、ネットワークパスをメモする
④コンパネ→コントロール パネル\\システムとセキュリティ\\ファイル履歴\\ドライブの選択→ネットワークの場所の追加→メモしたネットワークパスを入力
⑤ファイル履歴をオンにする
⑥終わり

３～４は下記URL参照

## 参考URL

2つ目のURLによると共有設定するのは、あまりよろしくない方法（バッドノウハウ）らしい

[https://www.ubackup.com/windows-10/file-history-backup-to-onedrive-4348.html](https://www.ubackup.com/windows-10/file-history-backup-to-onedrive-4348.html)

[https://jyn.jp/windows-filehistory-badtricks/](https://jyn.jp/windows-filehistory-badtricks/)

[https://answers.microsoft.com/ja-jp/windows/forum/all/windows/31bae198-bcc4-43a0-8603-d036ce2faab0](https://answers.microsoft.com/ja-jp/windows/forum/all/windows/31bae198-bcc4-43a0-8603-d036ce2faab0)

## 続き

再起動すると共有設定が初期化されてて、ファイル履歴がフォルダに接続できなくなってしまった
起動の度にフォルダ共有化の作業が必要になってしまうことが発覚したので、バッチファイルとタスクスケジューラでそれを自動化した

```bat
for /l %%n in (1,1,6) do (
 if not exist G: (
   timeout /t 10 > nul
 )
)
net share ファイル履歴=G:\マイドライブ\ファイル履歴 /grant:youremailaddress,full
```

## 前提

パソコン版Googleドライブアプリはスタートアップに自動登録されてるが、立ち上がるまでGドライブは存在せず、アプリが立ち上がってからやっとGドライブが作成される

## バッチファイル内容

timeoutのループでGドライブが設立されるまで待つ
net shareでファイル履歴の保存先フォルダを共有化する
/grantでユーザーにアクセス権を与える（アクセス権がないとファイル履歴は動かない）

## 引数の謎

`/grant:\PCNAME\USRENAME` とか
`/grant:administrators` とか
って他サイトには書いてあったけどなぜかそれで動かず
Microsoftアカウントのメアドにしたら動いた
なぜネット情報と違うのか分からない

## タスクスケジューラの注意点

タスクスケジューラの登録時は
最上位の特権で実行する：チェック
トリガー：ログオン時
この２つだけ注意

登録したら再起動して、ちゃんとできてるか確認して、完成

## 作業の流れまとめ

①パソコン版Googleドライブを入れる
②エクスプローラーのGドライブにGoogleDriveが割り当てられる
③ファイル履歴を設定する
④バッチファイルを作る
⑤タスクスケジューラ登録する
⑥実行する
⑦終わり

## 気持ち

とてつもなく難しかったけど、ファイル履歴クラウド化のためだけにGoogleOneに課金してしまったが故に、後に戻れない状況だった
12時間もかけて解決に取り組んだ執念の勝利

・フォルダ共有化でファイル履歴に対応させることでどんな問題が発生するのか
・もっとシンプルでスマートなやり方でやりたい

という2点もやもやが残る
けど、まあ当日中に終わったから良かった
