---
title: "[redis] dockerでrdbの設定がデフォルトで有効になっている件"
category: Tech
tags: ["Docker"]
createdAt: 2025-08-14 13:33:19
updatedAt: 2025-08-14 13:33:19
noteLink: https://note.com/optim/n/n97ce41c90f75
---

## 目的

docker redisでの永続化設定を理解する

## 状況

docker composeを使ってredisを立ち上げて
適当な値をsetしてからコンテナの再起動をして確認すると
値が残っている

```yaml title="compose.yaml"
services:
  redis:
    image: redis
    ports:
      - "6379:6379"
    volumes:
      - ./data:/data
```

## 調べてみる

公式ドキュメントを見る限りは、永続化には設定が必要のように見える

> **Start with persistent storage**
> $ docker run --name some-redis -d redis redis-server --save 60 1 --loglevel warning

[https://hub.docker.com/\_/redis#start-with-persistent-storage](https://hub.docker.com/_/redis#start-with-persistent-storage)

> 設定は不要です。永続ストレージはデフォルトで動作するようです。

[https://stackoverflow.com/questions/63906856/keep-redis-data-alive-between-docker-compose-down-and-up-in-docker-container#comment113019722_63907289](https://stackoverflow.com/questions/63906856/keep-redis-data-alive-between-docker-compose-down-and-up-in-docker-container#comment113019722_63907289)

> Redis を利用したアプリはデフォルト設定のまま実行できます
> redis.confファイルは[GitHub](https://github.com/redis/redis/blob/unstable/redis.conf)で確認できます

[https://www.docker.com/blog/how-to-use-the-redis-docker-official-image/#set-up-redis-persistent-storage](https://www.docker.com/blog/how-to-use-the-redis-docker-official-image/#set-up-redis-persistent-storage)

## これがデフォルト設定ぽい？

[https://github.com/redis/redis/blob/unstable/redis.conf](https://github.com/redis/redis/blob/unstable/redis.conf)

コメント行が多いのでそれらを削除したものは下記の通り

```text
bind 127.0.0.1 -::1
protected-mode yes
port 6379
tcp-backlog 511
timeout 0
tcp-keepalive 300
daemonize no
pidfile /var/run/redis_6379.pid
loglevel notice
logfile ""
databases 16
always-show-logo no
set-proc-title yes
proc-title-template "{title} {listen-addr} {server-mode}"
locale-collate ""
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
rdb-del-sync-files no
dir ./
replica-serve-stale-data yes
replica-read-only yes
repl-diskless-sync yes
repl-diskless-sync-delay 5
repl-diskless-sync-max-replicas 0
repl-diskless-load disabled
repl-disable-tcp-nodelay no
replica-priority 100
acllog-max-len 128
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no
lazyfree-lazy-user-del no
lazyfree-lazy-user-flush no
oom-score-adj no
oom-score-adj-values 0 200 800
disable-thp yes
appendonly no
appendfilename "appendonly.aof"
appenddirname "appendonlydir"
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
aof-load-truncated yes
aof-load-broken no
aof-load-broken-max-size 4096
aof-use-rdb-preamble yes
aof-timestamp-enabled no
slowlog-log-slower-than 10000
slowlog-max-len 128
latency-monitor-threshold 0
notify-keyspace-events ""
hash-max-listpack-entries 512
hash-max-listpack-value 64
list-max-listpack-size -2
list-compress-depth 0
set-max-intset-entries 512
set-max-listpack-entries 128
set-max-listpack-value 64
zset-max-listpack-entries 128
zset-max-listpack-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100
activerehashing yes
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60
hz 10
dynamic-hz yes
aof-rewrite-incremental-fsync yes
rdb-save-incremental-fsync yes
jemalloc-bg-thread yes
```

appendonly no → デフォルトでは AOF は無効
rdbfilename dump.rdb → RDB（スナップショット）は有効で、デフォルトのファイル名は dump.rdb

ということなので、この設定と挙動が一致していることがわかる

ちなみに、デフォルトの設定ファイルは、コンテナ内で見つからなかったのでおそらくバイナリ内にあるのかも

```console
docker exec -it redis-1 /bin/sh
# find / -name "redis.conf" 2>/dev/null
```

## ちなみに

docker composeでredisを使う場合は、カスタム設定には設定ファイルを用意する必要があるが、bitnami/redisなら環境変数だけで永続化設定などができる

[https://hub.docker.com/r/bitnami/redis](https://hub.docker.com/r/bitnami/redis)
