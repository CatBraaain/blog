---
title: electron unable to load preload のエラー回避
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-25 14:27:36
updatedAt: 2024-10-25 14:27:36
noteLink: https://note.com/optim/n/n1489fab93180
---

## 状況

mysql2を使用するためにpreloadでipc通信の定義？をしたい
electron+react+typescript+viteのため、構成が複雑
package.jsonでは"type": "module",を設定している

## エラー内容

import export まわりでエラーが発生している模様

## 解決方法

### 拡張子：preload.ts => preload.mts

> ESM のプリロードスクリプトは拡張子が .mjs でなければなりません[​](https://www.electronjs.org/ja/docs/latest/tutorial/esm#esm-%E3%81%AE%E3%83%97%E3%83%AA%E3%83%AD%E3%83%BC%E3%83%89%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%81%AF%E6%8B%A1%E5%BC%B5%E5%AD%90%E3%81%8C-mjs-%E3%81%A7%E3%81%AA%E3%81%91%E3%82%8C%E3%81%B0%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93)
>
> プリロードスクリプトは "type": "module" フィールドを無視するため、ESM のプリロード スクリプトでは .mjs ファイル拡張子を使用 しなければなりません。

[ESM のプリロードスクリプトは拡張子が .mjs でなければなりません](https://www.electronjs.org/ja/docs/latest/tutorial/esm#esm-%E3%81%AE%E3%83%97%E3%83%AA%E3%83%AD%E3%83%BC%E3%83%89%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%81%AF%E6%8B%A1%E5%BC%B5%E5%AD%90%E3%81%8C-mjs-%E3%81%A7%E3%81%AA%E3%81%91%E3%82%8C%E3%81%B0%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93)

esmoduleとして使うには、preload.mjsとしなきゃならない
mainスクリプトは、.jsでいいのにね

### サンドボックスを無効化

```ts
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";

...

    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: true,
    },
```

> nodeIntegration: trueの場合はサンドボックスも無効になります

[nodeIntegration: trueの場合はサンドボックスも無効になります](https://www.electronjs.org/docs/latest/tutorial/sandbox#disabling-the-sandbox-for-a-single-process)

> サンドボックス化されたプリロードスクリプトは、ESM のコンテキストがないプレーンな JavaScript として実行されます。 外部モジュールを使用する必要がある場合は、プリロードのコードにバンドラを使用することをお勧めします。 electron API の読み込みは、引き続き require('electron') を介して行われます。

[サンドボックス化されたプリロードスクリプトは ESM インポートを使用できません](https://www.electronjs.org/ja/docs/latest/tutorial/esm#%E3%82%B5%E3%83%B3%E3%83%89%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9%E5%8C%96%E3%81%95%E3%82%8C%E3%81%9F%E3%83%97%E3%83%AA%E3%83%AD%E3%83%BC%E3%83%89%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%81%AF-esm-%E3%82%A4%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%9B%E3%82%93)

\*サンドボックス有効でもバンドラーを使えば、モジュールを使うことはできそう

Q.なぜサンドボックス無効化にsandbox: falseを使わないのか
A.nodeIntegration: trueを使っている人が多いのでそれにならったが理由は分からず。
