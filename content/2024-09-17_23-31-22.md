---
title: vscode settings.jsonでeslintignore
category: Tech
tags: ["VSCode", "js/ts"]
createdAt: 2024-09-17 23:31:22
updatedAt: 2024-09-17 23:31:22
noteLink: https://note.com/optim/n/na44b078f307d
---

## .eslintignoreが非推奨になっている

というかもう廃止されたのか、vscode-eslintは.eslintignoreを認識しない

[https://eslint.org/docs/latest/use/configure/ignore-deprecated](https://eslint.org/docs/latest/use/configure/ignore-deprecated)

## eslint.config.jsでやれとのこと

[https://eslint.org/docs/latest/use/configure/ignore](https://eslint.org/docs/latest/use/configure/ignore)

## 面倒だからsettings.jsonで一括設定する

・毎回設定書くのもなんだか面倒だ
・ignore以外設定する予定ない
・プロジェクトルートが設定ファイルになるのが気に入らない
・settings.jsonで一括設定してしまおう

```json
    "eslint.options": {
        "ignorePatterns": [
            "dist"
        ]
    }
```

[https://eslint.org/docs/latest/integrate/nodejs-api#-eslintispathignoredfilepath](https://eslint.org/docs/latest/integrate/nodejs-api#-eslintispathignoredfilepath)

できた。

## 追記

こっちかも

```json
"eslint.lintTask.options": ". --ignore-pattern \"dist\"",
```

そしてなんか.eslintignoreが認識されるようになってることを後日確認
よくわからん
