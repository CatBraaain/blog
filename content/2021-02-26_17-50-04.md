---
title: Outlook 自動返信マクロを作る
category: Tech
tags: ["VisualBasic"]
createdAt: 2021-02-26 17:50:04
updatedAt: 2021-02-26 17:50:04
noteLink: https://note.com/optim/n/n60d07dd052b7
---

Outlookで受信メールに対して自動返信マクロを作りたいと思う。

```vb
Private Sub Application_NewMailEx(ByVal EntryIDCollection As String)

Dim item, reitem As Object
Set item = Session.GetItemFromID(EntryIDCollection)

Set reitem = item.Reply
reitem.subject = "件名"
reitem.body = "本文"
reitem.Display
'reitem.Send

End Sub
```

NewMailExイベントと言われるものをVBAのThisOutlookSession内に書き込むことで、メール受信時に、マクロを自動実行させることができる。

```vb
Set item = Session.GetItemFromID(EntryIDCollection)
```

受信したメールを特定し、変数itemに格納。

```vb
Set reitem = item.Reply
reitem.subject = "件名"
reitem.body = "本文"
reitem.Display
'reitem.Send
```

1行目から順に
今回受信したメールに対しての返信メールを作成
件名を設定
本文を設定
返信メールを表示
返信メールを送信

一応これで完成だけど

## 複数メール受信時に問題あり

一気にメールを2つ以上、受信した場合、1つ目のメールにしか返信メールが作成されない問題。

Outlookメールの送受信が行われる間隔は、初期状態では30分ごとに設定されている。
時間がきて送受信が行われたとき、複数メール受信時は、連続で1通ずつメールを受信するため、メール受信のたびにイベントが発生する。しかし、一度目のイベントに対する処理が終わらない内に二度目のイベントが発生すると、二度目のイベント処理は開始されない。
つまり二通目以降のメールに対しての受信時処理ができないのだ。

これを回避するためにNewMailイベントというものが用意されていると思うんだけど、それもうまくいかない。
NewMailイベントも複数メール受信時に複数回イベント発生してしまって二回目以降は機能しない。

## 解決法

メール処理を非同期プログラムに投げる。

```vb
Private Sub Application_NewMailEx(ByVal EntryIDCollection As String)

Shell Environ("USERPROFILE") & "\Documents\新着メール処理.exe " & EntryIDCollection, 0

End Sub
```

今回はPythonのwin32comでOutlookを操作し、返信メール作成するプログラムをPyinstallerでexe化してドキュメントフォルダ内に「新着メール処理.exe」として保存しておいた。
メール受信イベントの度に、EntryIDCollectionを引数にして非同期プログラムを実行させておけばOK。
