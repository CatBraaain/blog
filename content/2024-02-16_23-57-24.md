---
title: node.jsでpowershellコマンドを実行する方法
category: Tech
tags: ["PowerShell", "js/ts"]
createdAt: 2024-02-16 23:57:24
updatedAt: 2024-02-16 23:57:24
noteLink: https://note.com/optim/n/na55eaa94f914
---

## 目的

vscode拡張機能でbackgroundでpowershellコマンド実行させる

## 回答

### child_process の exec/execSync を使う

```js
require("child_process");
```

## 詳細

### 古いやり方

```js
var spawn = require("child_process").spawn,
  child;
child = spawn("powershell.exe", ["c:\\temp\\helloworld.ps1"]);
child.stdout.on("data", function (data) {
  console.log("Powershell Data: " + data);
});
child.stderr.on("data", function (data) {
  console.log("Powershell Errors: " + data);
});
child.on("exit", function () {
  console.log("Powershell Script finished");
});
child.stdin.end(); //end input
```

spawnでターミナルを生成している
何やってるかよくわからない

### 新しいやり方

```js
const { exec } = require("child_process");
const ret = execSync("command here", { shell: "powershell.exe" }).toString();
```

第二引数でシェルを指定できる
素晴らしい

戻り値は、バッファーというコンピュータ語で返ってくるのでtoStringで人間語になおす

## 参考

[https://stackoverflow.com/questions/10179114/execute-powershell-script-from-node-js](https://stackoverflow.com/questions/10179114/execute-powershell-script-from-node-js)

## あとがき

node.jsの黒い画面でctrl+vでペーストができない。マウスの右クリックでペーストができる。不便なので変更したいんだけど、情報が見つからない。また今度検索してそれでも見つからなかったらahkで変えてしまおうかな。ugly hack だが
