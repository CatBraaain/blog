---
title: powershell クラスメソッド内の変数名がクラスメンバーと干渉して使えない対策
category: Tech
tags: ["PowerShell"]
createdAt: 2023-08-15 22:07:09
updatedAt: 2023-08-15 22:07:09
noteLink: https://note.com/optim/n/n3e78b98d7711
---

## エラー原因

クラスメンバー名と同じ名前の変数をクラスメソッド内で宣言するとエラーになる。

## 回避方法

```ps1
$local:var
```

変数名の先頭に"local:"をつけるとローカル変数として扱えるので干渉回避できる

## テストコード

下記リンク先にあり

## 参考

[https://stackoverflow.com/questions/63745490/powershell-cannot-have-local-variables-scoped-inside-a-class-method](https://stackoverflow.com/questions/63745490/powershell-cannot-have-local-variables-scoped-inside-a-class-method)
