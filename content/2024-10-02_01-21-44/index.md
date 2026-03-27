---
title: eslint flat config 導入 with alloy
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-02 01:21:44
updatedAt: 2024-10-02 01:21:44
noteLink: https://note.com/optim/n/n41d8d21c4832
---

## 状況

eslint config は alloy を使っている

eslintrc => eslint.config に変更したい

## スクリプト

```js
// .eslintrc.js
module.exports = {
  extends: ["alloy", "alloy/typescript"],
};
```

eslint.configにはextendsプロパティがなく
importして使う必要がある

こんな感じか？

```ts
import alloy from "eslint-config-alloy/base.js";
import alloyts from "eslint-config-alloy/typescript.js";

export default tseslint.config(alloy.rules, alloyts.rules);
```

なんかうまくいかない
色々調べたけどよくわからなくて方針変更
別のconfigに乗り換える

今一番勢いがあるantfuを使うことにする

## antfu

```ts
import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "lib",
    typescript: {
      tsconfigPath: "tsconfig.json",
    },
    stylistic: {
      indent: 2,
      quotes: "double",
    },
    jsonc: false,
    yaml: false,
    ignores: ["dist/*", "build/*"],
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      "style/semi": ["off"],
    },
  },
);
```

できたんだけど、気に入らない点が多い
prettierをやめて、eslintだけでフォーマットしようという方針らしいが

今までのprettierのデフォルト動作とあまりに違う動作なので見慣れないし、そんな簡単にprettier手放そうと思えないので、併用できるように試行錯誤していたが

> Parsing error: was not found by the project service

という謎のエラーが出てきた
ビルドスクリプトが、メインスクリプトから参照を受けてないのが原因と思われるが
ついに解決方法が分からなかったので、再度方針変更
がんばってalloyでflat configify する

## 結果

内部のデータ構造なども見てやっとわかった
どうやらalloyは、flat config 対応していないので
flat configでは存在しないプロパティを所有していて、それが原因でエラーになっていたので
解決方法は下記の通り

```js
import alloy from "eslint-config-alloy/base.js";
import alloyts from "eslint-config-alloy/typescript.js";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  { rules: alloy.rules },
  ...tseslint.configs.recommended,
  { rules: alloyts.rules },
);
```

reactの場合

```js
import alloy from "eslint-config-alloy/base.js";
import alloyts from "eslint-config-alloy/typescript.js";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config(
  eslint.configs.recommended,
  { rules: alloy.rules },
  {
    plugins: {
      react,
    },
    rules: alloyreact.rules,
  },
  ...tseslint.configs.recommended,
  { rules: alloyts.rules },
);
```
