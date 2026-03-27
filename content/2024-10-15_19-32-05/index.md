---
title: concurrentlyでnpm-scriptsを一括実行
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-15 19:32:05
updatedAt: 2024-10-15 19:32:05
noteLink: https://note.com/optim/n/n6498921fe6ff
---

## 状況

npm-run-all + vite + nodemon + electron の組み合わせがなぜかelectronの再起動が二回目以降できなくなる
という謎現象が発生してどうしても解決できないので、移行検討のためconcurrentlyを調べる

## package.jsonがこんな感じだとして

```json
  "scripts": {
    "watch": "npm run watch:typescript && npm run watch:vite",
    "watch:typescript": "tsc -b -w",
    "watch:vite": "vite build -w"
  },
```

## npm-run-allの場合

```json
  "scripts": {
    "watch": "npm-run-all --parallel watch:*",
    "watch:typescript": "tsc -b -w",
    "watch:vite": "vite build -w"
  },
```

npm-run-allは、順次実行と並列実行とサポートしており
package.json scriptsに定義したタスクは自由自在に実行できる

## concurrentlyの場合

```json
  "scripts": {
    "watch": "concurrently npm:watch:*",
    "watch:typescript": "tsc -b -w",
    "watch:vite": "vite build -w"
  },
```

## concurrentlyのtips

### wildcard support

ワイルドカードを用いてnpm scriptを複数実行できるのはnpm-run-allだけだと思っていたんだけど、concurrentlyでもワイルドカードをサポートしている
READMEにも載ってない見つけにくいところに[ドキュメント](https://github.com/open-cli-tools/concurrently/blob/main/docs/cli/shortcuts.md)あった

### sequential support

並列実行用のモジュールだけど、`--max-processes 1`を使えば順次実行もできる（[参照](https://github.com/open-cli-tools/concurrently/issues/257#issuecomment-855227008)）

### quotes not neccessary

> 個別のコマンドは必ず引用符で囲んでください。
> `concurrently "command1 arg" "command2 arg"`
>
> package.json では引用符をエスケープします。
> `"start": "concurrently \"command1 arg\" \"command2 arg\""`

[https://github.com/mysticatea/npm-run-all?tab=readme-ov-file](https://github.com/mysticatea/npm-run-all?tab=readme-ov-file)

READMEで引用符必須と書いているから勘違いしていたけど
各コマンドにスペースが含まれる場合はquotes必須だけど
npm scripts のwildcard指定の場合は不要

```json
// コマンドにスペースがないので引用符不要
"watch": "concurrently npm:watch:*",

// コマンドにスペースがあると引用符必須
"watch": "concurrently \"npm run watch:*\"",
```

### shorthand alias support

> **注** このconcurrentlyコマンドは、短縮エイリアスでも使用できますconc。

```console
conc npm:watch:*
```

みたいに使える

## 結果

こういうのができた
連番振ってるのは、sort-package-json対策

```json
  "scripts": {
    "dev": "conc npm:dev:*",
    "dev:1:vite": "vite",
    "dev:2:electron": "nodemon -w dist/electron/main.js -x \"electron .\"",
    "watch": "conc npm:watch:*",
    "watch:1:typescript": "tsc -b -w",
    "watch:2:vite": "vite build -w"
  },
```

## concurrently vs npm-run-all

| ---         | concurrently | npm-run-all |
| ----------- | ------------ | ----------- |
| readability | ok           | good        |
| flexibility | not good     | good        |
| stability   | good         | not good    |
| output      | perfect      | not good    |

### readability

`concurrently npm:watch:*`
`npm-run-all -p watch:*`

### flexibility

concurrently first-script second-script "concurrently third-script-p1 third-script-p2 --max-processes 1"
npm-run-all first-script second-script --parallel third-script-p1 third-script-p2

### stability

concurrentlyでうまくいかなかったことない
npm-run-allはvite + nodemon でelectronの再起動できなかった

### output

concurrentlyは出力にprefixが付くのが見やすい

```console
[1:vite] > project@0.0.1 dev:1:vite
[1:vite] > vite
[2:electron] > project@0.0.1 dev:2:electron
[2:electron] > nodemon -w dist/electron/main.js -x "electron ."
```

## 所感

concurrentlyはワイルドカード使えなかったりクォートのエスケープのせいで可読性が落ちたり
みたいなのが理由でnpm-run-allに移行してきたんだけど、またUターンしてきたら、concurrentlyの便利さを知れた。

個人的にはいまだにこの統合構想に期待したい
まあ難しいんだろうけどさ
夢のスターたちがチームを組むみたいな展開が実現したらアツいよね

[https://github.com/mysticatea/npm-run-all/issues/10](https://github.com/mysticatea/npm-run-all/issues/10)
