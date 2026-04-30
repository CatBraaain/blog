---
title: 2023年1月20日GCP CloudSchedulerの異常請求についてメモ
category: Life
tags: []
createdAt: 2023-02-03 20:44:55
updatedAt: 2023-02-03 20:44:55
noteLink: https://note.com/optim/n/n63300d352c33
---

2023年2月3日現在解決済みなので下記メモ

## 今回の異常請求についての唯一の情報

[https://www.reddit.com/r/googlecloud/comments/10k4v2t/why_suddenly_much_higher_costs_in_google_cloud/](https://www.reddit.com/r/googlecloud/comments/10k4v2t/why_suddenly_much_higher_costs_in_google_cloud/)

## まとめ

24時間あたりでカウントされるジョブ数が
誤って1時間あたりで計算されていたため
24倍で請求がかかっていた
2月3日現在は、異常請求は修正されていて解決済み
