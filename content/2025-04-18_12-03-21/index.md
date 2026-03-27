---
title: MongoDB Insert Many vs Bulk Insert パフォーマンス
category: Tech
tags: ["DB"]
createdAt: 2025-04-18 12:03:21
updatedAt: 2025-04-18 12:03:21
noteLink: https://note.com/optim/n/n1b2bb0bfb019
---

> パフォーマンス的には大きな違いはなく、どちらの方法でもクライアントとデータベース間のラウンドトリップが少なくなります。

[https://www.mongodb.com/community/forums/t/whats-the-difference-between-insertmany-and-bulk-insert/8003](https://www.mongodb.com/community/forums/t/whats-the-difference-between-insertmany-and-bulk-insert/8003)

> 内部的にはInsertManyがBulkWriteを使用するため、違いはなく、単に便宜上のものです。

[https://stackoverflow.com/questions/35758690/mongodb-insertmany-vs-bulkwrite](https://stackoverflow.com/questions/35758690/mongodb-insertmany-vs-bulkwrite)

Insertだけするならパフォーマンスの差はないとのこと
