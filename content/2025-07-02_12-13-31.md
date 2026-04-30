---
title: "[uv] dockerイメージ選び方"
category: Tech
tags: ["Docker", "Python"]
createdAt: 2025-07-02 12:13:31
updatedAt: 2025-07-02 12:13:31
noteLink: https://note.com/optim/n/n09821266a20c
---

## 状況

uvプロジェクトをdockerコンテナ化したいが、イメージの選び方が分からない

## [Available images](https://docs.astral.sh/uv/guides/integration/docker/#available-images)

イメージがたくさんある・・・

```console
The following distroless images are available:
  ghcr.io/astral-sh/uv:latest

And the following derived images are available:
  Based on alpine:3.21:
  Based on debian:bookworm-slim:
  Based on buildpack-deps:bookworm:
  Based on python3.x-alpine:
  Based on python3.x-bookworm:
  Based on python3.x-slim-bookworm:
```

おそらく、derived imagesを使えば、OSもuvも含まれていて、余計なインストールコマンドが不要になるんだろう

derivedの中でpythonが含まれてないイメージはどういうことなんだろうか

### debian:bookworm-slim vs python3.x-slim-bookworm:

下記の通り、uv管理下のpythonが既にインストール済みか否かが違いだった

```console
> docker run --rm ghcr.io/astral-sh/uv:bookworm-slim uv python list
Unable to find image 'ghcr.io/astral-sh/uv:bookworm-slim' locally
bookworm-slim: Pulling from astral-sh/uv
b1251ec95f05: Pull complete
3da95a905ed5: Pull complete
Digest: sha256:b9826c44328bd99836bb453dc0fe743d8411ac76e67b8f1fa3ea8e24605f6472
Status: Downloaded newer image for ghcr.io/astral-sh/uv:bookworm-slim
cpython-3.14.0b3-linux-x86_64-gnu                 <download available>
cpython-3.14.0b3+freethreaded-linux-x86_64-gnu    <download available>
cpython-3.13.5-linux-x86_64-gnu                   <download available>
cpython-3.13.5+freethreaded-linux-x86_64-gnu      <download available>
cpython-3.12.11-linux-x86_64-gnu                  <download available>
cpython-3.11.13-linux-x86_64-gnu                  <download available>
cpython-3.10.18-linux-x86_64-gnu                  <download available>
cpython-3.9.23-linux-x86_64-gnu                   <download available>
cpython-3.8.20-linux-x86_64-gnu                   <download available>
pypy-3.11.11-linux-x86_64-gnu                     <download available>
pypy-3.10.16-linux-x86_64-gnu                     <download available>
pypy-3.9.19-linux-x86_64-gnu                      <download available>
pypy-3.8.16-linux-x86_64-gnu                      <download available>
graalpy-3.11.0-linux-x86_64-gnu                   <download available>
graalpy-3.10.0-linux-x86_64-gnu                   <download available>
graalpy-3.8.5-linux-x86_64-gnu                    <download available>

> docker run --rm ghcr.io/astral-sh/uv:python3.13-bookworm-slim uv python list
Unable to find image 'ghcr.io/astral-sh/uv:python3.13-bookworm-slim' locally
python3.13-bookworm-slim: Pulling from astral-sh/uv
0c57e9e5b593: Pull complete
e76888448fef: Pull complete
29fc64be7341: Pull complete
0fe95cb712c4: Pull complete
Digest: sha256:f2a2c6c1aafce2146e68285b4cdfdb61149ddeb40b47fa54f59173ca08baea8a
Status: Downloaded newer image for ghcr.io/astral-sh/uv:python3.13-bookworm-slim
cpython-3.14.0b3-linux-x86_64-gnu                 <download available>
cpython-3.14.0b3+freethreaded-linux-x86_64-gnu    <download available>
cpython-3.13.5-linux-x86_64-gnu                   /usr/local/bin/python3.13
cpython-3.13.5-linux-x86_64-gnu                   /usr/local/bin/python3 -> python3.13
cpython-3.13.5-linux-x86_64-gnu                   /usr/local/bin/python -> python3
cpython-3.13.5-linux-x86_64-gnu                   <download available>
cpython-3.13.5+freethreaded-linux-x86_64-gnu      <download available>
cpython-3.12.11-linux-x86_64-gnu                  <download available>
cpython-3.11.13-linux-x86_64-gnu                  <download available>
cpython-3.10.18-linux-x86_64-gnu                  <download available>
cpython-3.9.23-linux-x86_64-gnu                   <download available>
cpython-3.8.20-linux-x86_64-gnu                   <download available>
pypy-3.11.11-linux-x86_64-gnu                     <download available>
pypy-3.10.16-linux-x86_64-gnu                     <download available>
pypy-3.9.19-linux-x86_64-gnu                      <download available>
pypy-3.8.16-linux-x86_64-gnu                      <download available>
graalpy-3.11.0-linux-x86_64-gnu                   <download available>
graalpy-3.10.0-linux-x86_64-gnu                   <download available>
graalpy-3.8.5-linux-x86_64-gnu                    <download available>
```

## すぐ使えるやつ

python 3.13なら、下記3つ

`ghcr.io/astral-sh/uv:python3.13-alpine`
`ghcr.io/astral-sh/uv:python3.13-bookworm`
`ghcr.io/astral-sh/uv:python3.13-bookworm-slim`
