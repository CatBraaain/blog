---
title: excel 2013 が開かなくなった対処法 コマンドで一発だった 2023/9/20
category: Tech
tags: ["Windows"]
createdAt: 2023-09-21 20:29:04
updatedAt: 2023-09-21 20:29:04
noteLink: https://note.com/optim/n/nab11dfc53070
---

## 現象

下記の通りExcelがまともに使えない

### excel.exeが開かない

![](./nab11dfc53070_1695294281499-7KsKz41gXJ.png)

「オペレーティング システムは現在このアプリケーションを実行するように構成されていません。」
というメッセージが表示されてしまう

### xlsx(xlsm)ファイルを開くとグレーアウト

![](./nab11dfc53070_1695294424107-q8pg51hkL2.png)

## 応急処置方法

### 最近使ったブックから開くとちゃんと開ける

改善前にスクショとり忘れたので下記は例

![](./nab11dfc53070_1695294509344-Yun5JMqjSR.png)

![](./nab11dfc53070_1695294561491-GyeoCspZXM.png)

## 不具合をなおす方法

コマンドプロンプトで下記コマンドをうつ
（Excelのバージョンを下げる）

```cmd
"C:\Program Files\Microsoft Office 15\ClientX64\officec2rclient.exe" /update user updatetoversion=15.0.5571.1000
```

![](./nab11dfc53070_1695294623251-VumBnj3XE6.png)

![](./nab11dfc53070_1695294852653-7htWwwOOno.png)

![](./nab11dfc53070_1695294858058-qB0MdD37K7.png)

![](./nab11dfc53070_1695294886782-OuvSxjUw11.png)

無事に開けるようになった

再発防止のために自動更新オフにすることも必要

コマンドプロンプトの開き方と
Excel自動更新オフのやり方は下記のツイッター参照

## 参考

[https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q13286268758](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q13286268758)

[https://twitter.com/nissinplastics/status/1704665273813643748?s=20](https://twitter.com/nissinplastics/status/1704665273813643748?s=20)

[https://learn.microsoft.com/ja-jp/officeupdates/update-history-office-2013](https://learn.microsoft.com/ja-jp/officeupdates/update-history-office-2013)

## 調べ方メモ

最近起きた不具合なので、最近の記事のみ探したくて
googleの期間指定検索が役立った
[https://www.google.com/search?q=office+2013+%E9%96%8B%E3%81%8B%E3%81%AA%E3%81%84&tbs=cdr%3A1%2Ccd_min%3A9%2F19%2F2023%2Ccd_max%3A9%2F21%2F2023](https://www.google.com/search?q=office+2013+%E9%96%8B%E3%81%8B%E3%81%AA%E3%81%84&tbs=cdr%3A1%2Ccd_min%3A9%2F19%2F2023%2Ccd_max%3A9%2F21%2F2023)
