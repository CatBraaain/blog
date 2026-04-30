---
title: PostgRESTが最強なんじゃないか
category: Tech
tags: ["DB"]
createdAt: 2025-08-20 15:17:11
updatedAt: 2025-08-20 15:17:11
noteLink: https://note.com/optim/n/n21523221b635
---

DBツールの技術選定は悩みの連続だったが、ついに最適解を見つけたかもしれない

PostgRESTが最強であるという確信を得るまでの道のりを、DBの技術選定遍歴からたどっていく

## 1. MySQL（初めてのDB）

**特徴・利用方法**

- Pythonコード内に生SQLを埋め込み、直接クエリ
- 当時の人気DBで習得コストが低い

**課題**

- スキーマ変更が面倒
- SQLがコード内に散在 → 型安全ではなくバグ発生リスクが高い

---

## 2. MongoDB + Beanie（型安全・スキーマレス）

**特徴・利用方法**

- スキーマレスDBで柔軟
- Beanie ODMとPydanticで型安全に扱える
- 宣言的にドキュメント定義 → スキーマ移行管理不要

**課題**

- 人気が低くツール・ODMの選択肢が少ない
- Beanie自体は便利だが開発停滞（PRレビュー進まず）
- フロントから直接操作は困難（ODMはサーバー側専用）

**評価**

- 型安全・柔軟性は大きな利点

---

## 3. GraphQL + Hasura（フロントエンドから自由操作）

**特徴・利用方法**

- フロントからJSON形式でデータ操作可能
- HasuraはCRUDを事前定義したGraphQL APIを提供
- フロントから比較的自由にデータ操作できる

**課題**

- MongoDB対応だとクエリのみで、Insert/Update/Deleteが不可
- GraphQL自体、RESTに比べ開発コストが高い
- 他のCRUD事前定義済みGraphQLツールは少ない → 将来性に不安

**評価**

- フロントから直接操作可能という点は魅力
- 運用・開発コスト面で制約が大きく、条件を満たすツールは少ない

---

## 4. PostgREST + OpenAPI（型安全・多言語対応）

**特徴・利用方法**

- PostgreSQL専用のCRUD WebAPIを自動提供
- OpenAPI対応 → `openapi-generator-cli`で型安全なクライアント生成可能
- フロント・バックエンドの言語を問わず同じAPIを利用できる
- ORMなしで型安全にget/set可能

**課題**

- PostgreSQL専用 → DB選択の自由度が制限されるが、現在ではPostgreSQLが一番人気DBなので大きな問題ではない

**評価**

- 型安全性、多言語対応、ORM学習コスト分散の問題を解決
- エコシステム成熟度も高く、安定して運用可能
- フロント自由操作・型安全・低学習コストを満たす最適解

---

## 結論

**PostgREST + openapi-generator** が現在の条件（型安全、フロント自由操作、運用・開発効率）を最も満たす技術スタック。
今後のDB/API戦略の中心として最適解。

スキーマ管理についてはまだ答えは出ていないが、ORMは使わないのでSQLベースで管理するとして最新supabaseでも採用された[pg-schema-diff](https://github.com/stripe/pg-schema-diff)などがいいのではないかと思っている

[https://github.com/stripe/pg-schema-diff](https://github.com/stripe/pg-schema-diff)
