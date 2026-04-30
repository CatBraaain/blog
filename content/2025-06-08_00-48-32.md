---
title: supabase self hostingの.envファイルを理解する
category: Tech
tags: ["DB"]
createdAt: 2025-06-08 00:48:32
updatedAt: 2025-06-08 00:48:32
noteLink: https://note.com/optim/n/n243c8f913f70
---

## 状況

ウェブベースのアプリからAPIアクセスできるDBサーバーを作るために勉強もかねてsupabase self hostingを入門したが
.envファイルの変更項目が理解できない

## 変更必須な環境変数たち

```text
POSTGRES_PASSWORD
JWT_SECRET
ANON_KEY
SERVICE_ROLE_KEY
DASHBOARD_USERNAME
DASHBOARD_PASSWORD
SECRET_KEY_BASE
VAULT_ENC_KEY
```

## 理解

### POSTGRES_PASSWORD

こいつはもっとも簡単
postgresqlのDBユーザーのパスワードである
.envを変えたら、postgresqlのDB側もalter userで変更する必要がある

### JWT_SECRET

こいつが難しかった
JWT（JSON Web Token）という、クライアントとサーバー間で情報を安全に共有するために使用される標準規格があるのだが
サーバー側でJWT_SECRETを使って暗号化したものを本人確認証としてクライアントに渡し
クライアント側からAPI叩くなど、何かリクエストを送る際は本人確認証を添える
サーバー側では、リクエストを受け取ったら本人確認証をJWT_SECRETを復号化して検証を行い、それを本人確認とする
と理解できた
(!ここ殴り書きだが、図式化必須)

### ANON_KEY, SERVICE_ROLE_KEY

supabaseのDB？では、ロールという概念をベースにしている
ロールごとに権限を制限してセキュリティを管理する戦略
そして、ロールの証明はキーをもって行う
ANON_KEYを添えたリクエストがあればANON_ROLEの権限を持ち
SERVICE_ROLE_KEYを添えたリクエストがあればSERVICE_ROLEの権限を持つ

### DASHBOARD_USERNAME, DASHBOARD_PASSWORD

supabase studioのログインIDパスワードである

### SECRET_KEY_BASE

これはリアルタイム機能で使われるクッキーの暗号化に使われる

参考
[https://supabase.com/docs/guides/realtime](https://supabase.com/docs/guides/realtime)
[https://github.com/supabase/supabase/issues/11520](https://github.com/supabase/supabase/issues/11520)
[https://github.com/supabase/realtime#:~:text=via%20HTTP%20requests.-,SECRET_KEY_BASE,-string](https://github.com/supabase/realtime#:~:text=via%20HTTP%20requests.-,SECRET_KEY_BASE,-string)

### VAULT_ENC_KEY

supabase vaultというsecret manager があって、そこでの暗号化に使われ
