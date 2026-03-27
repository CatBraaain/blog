---
title: "[docker] コンテナがhealthyになってもhealthcheckが止まらない"
category: Tech
tags: ["Docker"]
createdAt: 2025-07-03 13:39:08
updatedAt: 2025-07-03 13:39:08
noteLink: https://note.com/optim/n/ncb3668425a5f
---

## 状況

docker composeでhealthcheckコマンドを定義して、healthyになってから次のコマンドを実行したい

## コマンドを実行してみたら

```console
docker compose up --build --wait
curl http://localhost:8000/search/general?q=ping  # warm-up request
```

## こうなった

```console
> docker logs xxx

      ...

      INFO   127.0.0.1:38492 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:41226 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:41242 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:41248 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:41254 - "GET /healthz HTTP/1.1" 200
      INFO   172.21.0.1:34084 - "GET /search/general?q=ping HTTP/1.1" 200
      INFO   127.0.0.1:41260 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:41266 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:41276 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:41278 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:41282 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:39636 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:39640 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:39650 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:39658 - "GET /healthz HTTP/1.1" 200
      INFO   127.0.0.1:39660 - "GET /healthz HTTP/1.1" 200
```

healthyになったから、searchリクエストが実行されているはずなのに
まだヘルスチェックが続いている
どういうこと

## healthcheckは起動確認だけじゃない

公式に書いてあるように、起動完了のためだけに使うのではなく、常時監視（途中でエラーで落ちないか）などにも使われるため、healthyになったから終わりにするみたいな仕様ではないので、先のログは正常

[https://docs.docker.com/reference/dockerfile/#healthcheck](https://docs.docker.com/reference/dockerfile/#healthcheck)
