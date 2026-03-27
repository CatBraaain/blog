---
title: schtasksのXML InteractiveTokenセキュリティオプションが反映されない対策
category: Tech
tags: ["Windows"]
createdAt: 2023-01-04 23:05:37
updatedAt: 2023-01-04 23:05:37
noteLink: https://note.com/optim/n/ned6d259d1d81
---

XML上では、「ユーザーがログインしているときのみ実行する」のデータになっているはずなのにschtasksを使ってタスク作成すると
「ユーザーがログインしているかどうかにかかわらず実行する」
にチェックが入ってしまう
schtasksでXMLを使ってタスク作成するときのみ発生する

手動でインポートボタン押して作成すると想定通りになる

調べてもなかなか出てこなかったがようやく一個だけ情報見つけた

[https://superuser.com/questions/1590661/task-scheduler-xml-interactivetoken-always-ignored-no-matter-what](https://superuser.com/questions/1590661/task-scheduler-xml-interactivetoken-always-ignored-no-matter-what)

最後の/RU の引数を空欄にしてコマンド一度打ってから
逆向きのリダイレクトでファイルからパスワード文字列持ってくればいいよねってことを言ってると思うけど
それできない

> schtasks /create /XML "asdf.xml" /TN "asdf" /S localhost /RU "user" /RP < password.txt
> #error

リダイレクトできないならパイプライン使えばいいじゃん
と思ってやってみたらできた

> "mypassword" | schtasks /create /XML "asdf.xml" /TN "asdf" /S localhost /RU "user" /RP
> #success
