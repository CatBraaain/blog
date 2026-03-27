---
title: mongo-express 認証なしのmongodbにアクセスする
category: Tech
tags: ["DB"]
createdAt: 2025-03-23 16:51:01
updatedAt: 2025-03-23 16:51:01
noteLink: https://note.com/optim/n/nf557a6cd27f2
---

## 認証なしなのにログイン必須！？

![](./nf557a6cd27f2_1742716201-DOmEN7YxlIpjAMvVezyn3XuB.png)

認証なしのmongodbにアクセスしたいのにログイン画面が出てきた

## デフォルトは、admin:pass らしい

> basicAuth のデフォルトの資格情報は admin:pass ですが、`config.default.js`を`config.js`にコピーして関連する行を調整することで、これらを変更することを強くお勧めします。

[https://github.com/mongo-express/mongo-express/issues/149](https://github.com/mongo-express/mongo-express/issues/149)

## ログインしてみる

![](./nf557a6cd27f2_1742716030-X4CFWeDKxRHT0nN628psyJwh.png)

入力したら

![](./nf557a6cd27f2_1742716155-ckLQlHCq1gdw3GrXfxEsmjKt.png)

ログインできた
