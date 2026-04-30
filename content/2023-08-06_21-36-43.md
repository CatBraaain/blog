---
title: PowerShellでbool値を返す関数の命名規則
category: Tech
tags: ["PowerShell"]
createdAt: 2023-08-06 21:36:43
updatedAt: 2023-08-06 21:36:43
noteLink: https://note.com/optim/n/n4b425c52a19d
---

## 目的

今日が勤務日か確認する関数名をisWorkdayをつけたかったが
PowerShellは動詞ハイフン名詞の形にしなきゃいけなくて
その上、動詞は、承認済みリストの中から選ばなきゃいけなくて
isBruhbruhみたいなやつはどうしたらいいのか知りたい

## 承認済み動詞リストにisやcanはない

[リスト](https://learn.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7.3)に使えそうなのはこれくらい

[Get](https://learn.microsoft.com/en-us/dotnet/api/System.Management.Automation.VerbsCommon.Get) (g)リソースを取得するアクションを指定します。この動詞はSetと対になっています。
[Test](https://learn.microsoft.com/ja-jp/dotnet/api/System.Management.Automation.VerbsDiagnostic.Test) (t)リソースの操作または整合性を検証します。
[Assert](https://learn.microsoft.com/ja-jp/dotnet/api/System.Management.Automation.VerbsLifecycle.Assert) (as)リソースの状態を表明します。
[Confirm](https://learn.microsoft.com/ja-jp/dotnet/api/System.Management.Automation.VerbsLifecycle.Confirm) (cn)リソースまたはプロセスの状態を承認、検証、または確認します。

## 各単語のイメージ

Getは取得

Testだと、実験的してみた結果を返すみたいなイメージがある
アルコールのパッチテストみたいな、やってみた結果を見てみようね的な

Assertは、結果を取得というよりも"出力する"とか外に表現するみたいなイメージがある
戻り値を使うようなイメージがない

Confirmは、APIkeyの確認のような、なんだか重たい感じがする

## Get-IsWorkday か Test-IsWorkday かな

Get-IsWorkday 一択

## 参考

[https://stackoverflow.com/questions/39913481/powershell-naming-convention-for-bool-functions](https://stackoverflow.com/questions/39913481/powershell-naming-convention-for-bool-functions)

## あとがき

初学者には、PowerShellの関数命名がむずかしい
慣れたら便利に感じるんだろうか・・・
