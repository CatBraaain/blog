---
title: docker level=warning を非表示にする
category: Tech
tags: ["Docker"]
createdAt: 2025-02-21 14:47:00
updatedAt: 2025-02-21 14:47:00
noteLink: https://note.com/optim/n/n026fcef2115f
---

## 目的

Firecrawl self-hosted で docker compose start をするたびに

```console
time="2025-02-21T14:36:52+09:00" level=warning msg="The \"POSTHOG_HOST\" variable is not set. Defaulting to a blank string."
```

が数十行表示されてうるさいので非表示にしたい

## 結論

```console
docker --log-level error compose up
```

## 参考

```console
> docker help

Global Options:
      --config string      Location of client config files (default
                           "C:\Users\PRO\.docker")
  -c, --context string     Name of the context to use to connect to the
                           daemon (overrides DOCKER_HOST env var and
                           default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket to connect to
  -l, --log-level string   Set the logging level ("debug", "info",
                           "warn", "error", "fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default
                           "C:\Users\PRO\.docker\ca.pem")
      --tlscert string     Path to TLS certificate file (default
                           "C:\Users\PRO\.docker\cert.pem")
      --tlskey string      Path to TLS key file (default
                           "C:\Users\PRO\.docker\key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit
```
