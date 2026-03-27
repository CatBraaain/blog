---
title: gulpでtypescriptコンパイル
category: Tech
tags: ["js/ts"]
createdAt: 2024-09-30 22:26:32
updatedAt: 2024-09-30 22:26:32
noteLink: https://note.com/optim/n/ncb87d17ce571
---

## 状況

yaml=>json, hbs=>json, ts=>js の3種のファイル変換をカスタムスクリプトでやっていたが、可読性の問題もあり1つのツールに統合させたい
バンドルを一通り調べたが、やりたいことと一致しない
調べた中ではgulpが適切と判断するも、tsのコンパイルがなんか微妙

## やり方1

gulp-typescriptプラグインを利用する

```js
const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");

const tsProject = ts.createProject("tsconfig.json");
function ts2js() {
  return tsProject
    .src()
    .pipe(sourcemaps.init()) // prepare for creating .js.map
    .pipe(tsProject()) // compile to .js
    .pipe(sourcemaps.write(".", { includeContent: false })) // create .js.map
    .pipe(gulp.dest("out")); // create .js
}
exports.default = gulp.parallel(ts2js);
```

こんなに書かなきゃいけないのかって感じ
これに加えてさらにwatchも書かなきゃいけない

## やり方2

tscコマンドを実行

```js
const gulp = require("gulp");
const run = require("gulp-run");

function ts2js() {
  return run("tsc -w").exec();
}
exports.default = gulp.parallel(ts2js);
```

うん、短くて分かりやすくていいじゃん
あとはエラーとかをキャッチできるかってところだけどそれは後日

## tscコマンドの方が速いらしい

> 1つのファイルのコンパイルでもインポートされた依存関係の分析が行われるため、tsc --watchよりも高速になることはありません。

[https://stackoverflow.com/questions/54716548/how-does-gulp-typescript-incremental-compilation-work](https://stackoverflow.com/questions/54716548/how-does-gulp-typescript-incremental-compilation-work)
