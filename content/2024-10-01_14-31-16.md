---
title: ts-node で esmodule が動かない件 tsx を使え
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-01 14:31:16
updatedAt: 2024-10-01 14:31:16
noteLink: https://note.com/optim/n/n0c08bb9a0c8d
---

## 状況

ts-nodeでbuild.tsを実行しようとしたら
TypeError `[ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"`
のエラーが出る

## 原因

package.jsonで

```json
"type": "module",
```

を記述しており
ts-nodeはデフォルトではcommonjsサポートのためエラー発生

## 解決方法

### "type": "module"の削除

動くけどこれは、一番愚かな解決方法

### ts-nodeの設定値の変更

> Use any of:
> ts-node --esm
> ts-node-esm
> Set "esm": true in tsconfig.json
> node --loader ts-node/esm
> NODE_OPTIONS="--loader ts-node/esm" node

[https://github.com/TypeStrong/ts-node?tab=readme-ov-file#commonjs-vs-native-ecmascript-modules](https://github.com/TypeStrong/ts-node?tab=readme-ov-file#commonjs-vs-native-ecmascript-modules)

ts-node --esm build/build.ts
で通常はうまくいくはずなんだけど

特定バージョンでのみ謎のバグあり
なんだそりゃ

> この問題は、ts-node バージョン 10 を Node バージョン 20 で使用すると発生するようです。

[https://github.com/TypeStrong/ts-node/issues/2086#issuecomment-1823358051](https://github.com/TypeStrong/ts-node/issues/2086#issuecomment-1823358051)

### tsxに乗り換える

> また、[tsxを](https://www.npmjs.com/package/tsx)試しましたか?

[https://github.com/TypeStrong/ts-node/issues/2086#issuecomment-1823543150](https://github.com/TypeStrong/ts-node/issues/2086#issuecomment-1823543150)

> `esm` を使う場合は `tsx` の方が良いです

[https://www.reddit.com/r/node/comments/16qnlhy/comment/lfy0v3w/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button](https://www.reddit.com/r/node/comments/16qnlhy/comment/lfy0v3w/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

tsx alternatives 比較参考

[https://github.com/privatenumber/ts-runtime-comparison](https://github.com/privatenumber/ts-runtime-comparison)
