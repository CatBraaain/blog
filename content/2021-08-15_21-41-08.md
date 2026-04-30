---
title: selenium 既存の接続はリモート ホストに強制的に切断されました とエラーメッセージが出た
category: Tech
tags: ["Python"]
createdAt: 2021-08-15 21:41:08
updatedAt: 2021-08-15 21:41:08
noteLink: https://note.com/optim/n/n8f7d5e90ef43
---

途中でタスクキルしてた・・・

os.kill(driver.service.process.pid,signal.SIGTERM) #タスクキル

デバッグに使いたくて書いたのを消すの忘れてたのが原因だった
