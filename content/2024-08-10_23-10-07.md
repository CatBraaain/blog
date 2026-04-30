---
title: vscode project root に設定ファイルが多すぎるのでスッキリさせる
category: Tech
tags: ["VSCode"]
createdAt: 2024-08-10 23:10:07
updatedAt: 2024-08-10 23:10:07
noteLink: https://note.com/optim/n/nc422f0bf0bf4
---

## 目的

tsconfig.json, .gigignore, .eslintignore, .eslintrc.js, .vscodeignore などなど
設定ファイルが多すぎて、スマートじゃないのできれいに見せたい

## 前提条件

vscode

## 方針2通り

### 案1. 設定ファイルを利用するアプリ側の設定を変更する

```console
tsc --project ./config/tsconfig.json
```

など一部対応できるが、
当然全てのアプリでの対応は無理

### 案2. vscodeの設定で特定ファイルを非表示にする

```json
"files.exclude": {
    "**/tsconfig.json": true
}
```

表示させたい場合は
・毎回設定で切り替えるか
・configフォルダ配下にシンボリックリンク(ショートカット)を1つずつ作成するか

どちらも面倒

### 案3. 拡張機能で手軽に非表示にする

非表示というより、別の場所に隔離されて見える
手動操作で細かくやりたいならこれ一択

[https://marketplace.visualstudio.com/items?itemName=devine-davies.make-hidden#review-details](https://marketplace.visualstudio.com/items?itemName=devine-davies.make-hidden#review-details)

### 案4. explorer.fileNestingの設定を使う 

```json
    "explorer.fileNesting.patterns": {
        ".gitignore": ".gitattributes, .gitmodules, .gitmessage, .mailmap, .git-blame*",
        "app.config.*": "*.env, tsconfig.*"
    }
```

ファイルごとにグルーピングしてフォルダみたいにネストされる
フォルダみたいな見え方になって最初はなれないかもしれないけど
整理はされる

先人たちが極めた定形コードがある

[https://github.com/antfu/vscode-file-nesting-config/tree/main](https://github.com/antfu/vscode-file-nesting-config/tree/main)

そして、常にそれの最新版を自動適用してくれる拡張機能もある

[https://marketplace.visualstudio.com/items?itemName=antfu.file-nesting](https://marketplace.visualstudio.com/items?itemName=antfu.file-nesting)

## 結論

案4のnestingが非常に興味深い
自分用の設定を煮詰めるのにも時間がかかるので拡張機能で自動取り込みしてしばらく使ってみる
まだストレス感じるようなら案3を試してみる
それでもいまいちなら、現段階ではあきらめてvscodeのさらなるアップデートを期待するしかないかな

## 参考

[https://www.reddit.com/r/webdev/comments/196no7t/can_we_please_normalize_putting_config_files_and/](https://www.reddit.com/r/webdev/comments/196no7t/can_we_please_normalize_putting_config_files_and/)

[https://stackoverflow.com/questions/30140112/how-to-hide-specified-files-directories-e-g-git-in-the-sidebar-vscode](https://stackoverflow.com/questions/30140112/how-to-hide-specified-files-directories-e-g-git-in-the-sidebar-vscode)
