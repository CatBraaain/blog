---
title: '[supabase] password authentication failed for user "supabase_auth_admin'
category: Tech
tags: ["DB"]
createdAt: 2025-06-06 14:14:28
updatedAt: 2025-06-06 14:14:28
noteLink: https://note.com/optim/n/n7df5e0ba1840
---

## 状況

[https://supabase.com/docs/guides/self-hosting/docker](https://supabase.com/docs/guides/self-hosting/docker)

supabase self-hosted で手順通り.envのPOSTGRES_PASSWORDを変更したら、supabase studioのdatabaseタブで表題の通りのエラーになる

## エラー

databaseのエラー

```console
password authentication failed for user "supabase_auth_admin"
```

storageのエラー

```console
Failed to create bucket: API error happened while trying to communicate with the server.
```

## 解決方法

.envのPOSTGRES_PASSWORDをもとに戻してから

```console
docker compose
downdocker compose up -d
```

してから
supabase studioに入りなおして
SQL Editorのところで

```sql
-- docker-compose.ymlで${POSTGRES_PASSWORD}を利用しているユーザーのパスワードをすべて変更

ALTER USER supabase_admin WITH PASSWORD 'new password';
ALTER USER postgres WITH PASSWORD 'new password';
ALTER USER supabase_auth_admin WITH PASSWORD 'new password';
ALTER USER authenticator WITH PASSWORD 'new password';
ALTER USER supabase_storage_admin WITH PASSWORD 'new password';
```

でDB側のパスワードを変更してから
また再起動

```console
docker compose
downdocker compose up -d
```

終わり

## 所感

supabaseという複雑で巨大なサービスだからこそ、思考停止してしまっていたけど
よく考えたら、.envはあくまで環境変数なのであって、DB側のパスワードを勝手に変更してくれるものではないよね

## 参考

\*多くの人が同じところでつまづいてる様子

[https://github.com/supabase/supabase/issues/11957#issuecomment-2708248284](https://github.com/supabase/supabase/issues/11957#issuecomment-2708248284)
