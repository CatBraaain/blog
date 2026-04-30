---
title: "[Cloudflare] Build時に勝手にパッケージインストールされるのを回避する"
category: Life
tags: []
createdAt: 2026-04-30 13:51:33
updatedAt: 2026-04-30 13:51:33
isDraft: false
---

勝手にインストールしてほしくない
もしくは、一部のみインストールさせたい場合は、

EnvVarのところで`SKIP_DEPENDENCY_INSTALL=1`にして
Build commandのところで、明示的に`bun i && bun run build`などにする

参考:https://developers.cloudflare.com/workers/ci-cd/builds/build-image/#skip-dependency-install
