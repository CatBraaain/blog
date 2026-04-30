---
title: "[docker compose] remote include機能が、安定版になってる"
category: Tech
tags: ["Docker"]
createdAt: 2025-06-30 00:06:46
updatedAt: 2025-06-30 00:06:46
noteLink: https://note.com/optim/n/nccff5138e9b1
---

## remote include機能とは

docker composeを利用するプロジェクトをリモートからURL指定で利用できるもの

```yaml title="compose.yaml"
include:
  - https://github.com/example/example.git
```

このように書くことで、リモートから直接参照することができる
そしてこれは、ただのyamlのimportではなく、裏で実際に一時フォルダを作ってgit cloneされるため、リモートプロジェクト内のbind volumesも利用することができる
今までは、composeプロジェクトを利用するには、git cloneするか、設定ファイルを用意するかなどして、プロジェクト内に設定ファイルを管理しないといけなかったが、この機能では、裏でgit cloneをやってくれるので、特に編集する必要のない設定ファイルの場合は、管理責任を負わずに再利用することができる。

なぜか下記のブログ記事にしか公式情報がないが、とても優秀な機能

[https://www.docker.com/blog/scaling-docker-compose-up/](https://www.docker.com/blog/scaling-docker-compose-up/)

## v2.34.0で安定版機能になった？

ブログ記事にある通り、COMPOSE_EXPERIMENTAL_GIT_REMOTEを環境変数に指定しないと本機能は使えないはずなのだが、2025/06/29にふと試してみるとエラーにならなかった

調べてみると、[このコミット](https://github.com/docker/compose/pull/12606)で、この機能がデフォルトで有効になるように変更されていた。
これに関するドキュメントなどは見つからなかったものの
下記のようにエラーメッセージも変更されていることからミスではなさそう

```diff
-		return "", fmt.Errorf("experimental git remote resource is disabled. %q must be set", GIT_REMOTE_ENABLED)
+		return "", fmt.Errorf("git remote resource is disabled by %q", GIT_REMOTE_ENABLED)
```

## SSH認証に注意

ブログ記事の通り下記のようにパスを指定すると、`exit status 128`とエラーになる。

```yaml
include:
  - path: git@github.com:myorg/frontend.git

# error: exit status 128.
```

この場合は、[SSHキーの登録](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)をするか、https接続のURLを使うとエラーにならない

```yaml
include:
  - https://github.com/myorg/frontend.git

# success
```

## メモ

include directiveのサポートは、>=v2.20.0
[https://docs.docker.com/compose/releases/release-notes/#2200](https://docs.docker.com/compose/releases/release-notes/#2200)

remote includeの実験的サポートは、>=v2.21.0
[https://docs.docker.com/compose/releases/release-notes/#2210](https://docs.docker.com/compose/releases/release-notes/#2210)

remote includeの安定サポートは、>=v2.34.0

includeのdocuments
[https://docs.docker.com/compose/how-tos/multiple-compose-files/include/](https://docs.docker.com/compose/how-tos/multiple-compose-files/include/)
[https://github.com/compose-spec/compose-spec/blob/main/14-include.md](https://github.com/compose-spec/compose-spec/blob/main/14-include.md)
