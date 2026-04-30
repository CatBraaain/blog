---
title: Cloudflareで`Unknown file extension ".ts"`のエラーが出る
category: Tech
tags: ["js/ts"]
createdAt: 2026-04-30 12:53:48
updatedAt: 2026-04-30 12:53:48
isDraft: false
---

## 状況

Cloudflare Pages Buildsでのみビルドコマンドが失敗する

## 環境

フロントエンドフレームワーク: SvelteKit
バンドラー: Vite
ランタイム: Bun

## 試したこと

ローカルでは、ビルドコマンドがエラーなく成功する

Cloudflare Pages Builds では 下記のようにエラーになる
`TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /opt/buildhome/repo/svelte.config.ts`

TypeScriptのファイルを実行できないという内容に見える

## 調べたこと

### そもそもsvelte.configはtsに対応しているのか

下記によるとbunは対応してそう

> This PR enables loading svelte.config.ts in runtimes that support importing TypeScript files.
> In deno and bun this should work ootb, in nodejs >=22.6 you can use the --experimental-strip-types flag to allow it.
> https://github.com/sveltejs/kit/pull/13935

下記によるとbunでも内部でnodeを使っている可能性がありそう？

> if I remember correctly, SvelteKit uses node:vm and/or Rollup on top of Bun which means that it doesn't go through Bun's module loader. So even though Bun supports importing .ts files, SvelteKit is opting out of leveraging Bun's builtin support for that.
> https://github.com/sveltejs/kit/issues/2576#issuecomment-2119476245

しかし内部でnodeを使っていたとしても、少なくともローカルではエラーは発生しない理由の説明がつかないことになる

## 結論

ローカルとCloudflareのNodeのバージョン差が原因だった
そして、古いNodeでは、tsファイルを実行できないが、最新のNodeでは、tsファイルを実行できるようになっているということ

ローカルで使った板バージョンは、v24.14.0
Cloudflareは、Node.js 22.16.0
参考:https://developers.cloudflare.com/pages/configuration/build-image/

Node<22.18.0 は、デフォルトでは、tsファイルを実行できない
Node>=22.18.0 は、デフォルトで、tsファイルを実行できる
参考: https://nodejs.org/learn/typescript/run-natively

だからローカルでは、.tsをnodeから読めて
クラウドでは.tsをnodeから読めなくてエラーになっている

Cloudflareでenvvar
NODE_VERSION=22.18
を設定したらなおった

## ちなみに

```plain
16:31:12.702 Detected the following tools from environment: nodejs@22.18.0, bun@1.2.15
16:31:12.702 Installing nodejs 22.18.0
16:31:17.010 Installing project dependencies: bun install --frozen-lockfile
```

ちなみにnodeの特定バージョンのインストールだから4秒くらい余計に時間はかかっているんだけど
cloudflare pages のビルド制限は1月に500回までという回数で定められていて、1回ごとの時間は20分以内という上限しかないので
ビルド時間の1分1秒の削減をこだわる必要は特にはないと判断した
参考: https://developers.cloudflare.com/pages/platform/limits/#builds
