---
title: prettier v3 の導入意思決定
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-04 18:27:32
updatedAt: 2024-10-04 18:27:32
noteLink: https://note.com/optim/n/ne90c614cb949
---

## 状況

prettierはvscode拡張機能でしか使ったことがない
prettierのプラグインに興味を持つ

## prettier v3 の発見

何かの時にprettier-vscodeのREADMEを見ていると

> Prettierのversion3は、version9.12.0以降でサポートされています。
> デフォルトでは拡張機能には含まれていませんが、
> プロジェクトにローカルでインストールすることで使用可能です。
> version10.0.0の拡張機能には、プレビューバージョンの3.0.0が正式に含まれる予定です。

[https://github.com/prettier/prettier-vscode?tab=readme-ov-file#prettier-version-3](https://github.com/prettier/prettier-vscode?tab=readme-ov-file#prettier-version-3)

という文章を発見
どうやら今まで使っていたのはv2で、v3はもう発表されてるけどvscode拡張機能の方にv3が導入されるのはまだ先になる

ということみたい

## v3の導入方法

今までは拡張機能に同封されているprettierを使っていたので、
v3を使おうと思うとローカルに用意しないといけないので2つ選択肢がある

1.プロジェクトごとにprettierをインストール

```console
npm i -D prettier
```

```json title="setings.json"
"prettier.prettierPath": "./node_modules/prettier",
```

プロジェクトごとにいちいちprettierのインストールをしないといけないので
いままでと使い勝手がだいぶ変わる

2.グローバルインストール

```console
npm i -g prettier
```

```json title="setings.json"
"prettier.resolveGlobalModules": true,
```

グローバルにインストールしてしまえば
いままでと同じ使い勝手でいけるはず

## いますぐv3を導入する？ yes/no

release noteを見るとすごいいろんな改善がされてるみたい

[https://prettier.io/blog/2023/07/05/3.0.0](https://prettier.io/blog/2023/07/05/3.0.0)

だけど、こういうのって結局、多くの人と同じやり方をする方が、情報も多くなって検索も楽だし、それが一番だと思ってる
一番使われてるエディタは間違いなくvscodeで
vscodeの人気拡張機能はprettierなので
prettierユーザーの中ではvscode拡張機能で使ってる人が多いんじゃないかと思う
ということで、一番メジャーな使い方は拡張機能に同封されているv2を使い続ける
ということかもしれない

## プラグインの可能性

[sort-package-json](https://github.com/keithamus/sort-package-json)というのを使いたくて調べていたら

[prettier-plugin-packagejson](https://github.com/matzkoh/prettier-plugin-packagejson)というものを見つけた
どうやらprettierにはplugin機能があるらしい！

## prettier-vscodeでpluginsを使う

> この拡張機能は、ローカルまたはグローバルに解決されたPrettierのバージョンを使用している場合に、Prettierプラグインをサポートします。もし、package.jsonにPrettierとプラグインが登録されている場合、この拡張機能は言語を登録し、組み込み言語およびプラグイン言語の自動コードフォーマットを提供しようとします。

[https://github.com/prettier/prettier-vscode?tab=readme-ov-file#plugins](https://github.com/prettier/prettier-vscode?tab=readme-ov-file#plugins)

つまりは、同封のprettierじゃなくてプロジェクト配下かglobalにインストールしたprettierを使っていればプラグインを使える
ということみたい

ということは、再検討しなければならない

## いますぐv3を導入する？ yes/no

判断基準は2つ

人口の多い使い方がいい => should be v2
プラグインを使いたい => must be v3

割れたけど、should,must で対立したらmustが勝つよね

## 結論

v3導入する
