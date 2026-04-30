---
title: softalk 録音時の読み上げを省略の設定でハマった
category: Life
tags: []
createdAt: 2021-08-15 15:15:36
updatedAt: 2021-08-15 15:15:36
noteLink: https://note.com/optim/n/n039dd80a9cf9
---

①録音するのにうるさいので読み上げ省略設定をしたが
設定が保存されず、一度閉じてから開いたら設定が初期化されてしまう

②設定ファイルのSofTalk.iniを直接いじることにした
エクスプローラーを管理者権限で開いてそこからファイルをエディターで開いて、22行目の「chkPAS False」を「chkPAS True」に変更

下記参考URL

[https://sosakubiyori.com/softalk-setting/#toc14](https://sosakubiyori.com/softalk-setting/#toc14)
