---
title: 管理者権限付きのpowershellから管理者権限なしのプログラムを実行する方法（降格させる方法）
category: Tech
tags: ["PowerShell"]
createdAt: 2023-01-16 18:34:11
updatedAt: 2023-01-16 18:34:11
noteLink: https://note.com/optim/n/nf5d1f6135fef
---

## 目的

Powershellで
管理者権限が必要なアクションと
管理者権限が邪魔なアクションを
1つのファイルで両立させるため

## スクリプト

```powershell
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

Start-Process -FilePath "C:\Users\PRO\AppData\Local\Programs\Microsoft VS Code\Code.exe"
Start-Process -FilePath "Explorer.exe" -ArgumentList "C:\Users\PRO\AppData\Local\Programs\Microsoft VS Code\Code.exe"
```

## スクリプト解説

Explorer.exeの引数にVSCodeの実行ファイルを与えると
管理者権限なしでVSCodeを実行してくれる

通常の実行方法と比べるために2行書いてる

Start-Processの引数でVerbを使う方法もあったが

- Verb Openを使っても管理者権限は解けなかった
- Verb RunAsUserを使ったらUACが表示されたので選択肢から外した

## 参考

[https://stackoverflow.com/questions/29266622/how-to-run-exe-with-without-elevated-privileges-from-powershell#:~:text=The%20one%20that%20seems%20most%20elegant%20to%20me%2C%20is%20exploiting%20a%20%E2%80%9Cbug%E2%80%9D%20in%20explorer.exe.](https://stackoverflow.com/questions/29266622/how-to-run-exe-with-without-elevated-privileges-from-powershell#:~:text=The%20one%20that%20seems%20most%20elegant%20to%20me%2C%20is%20exploiting%20a%20%E2%80%9Cbug%E2%80%9D%20in%20explorer.exe.)

## あとがき

そこそこ調べたけど、上記のページにしかこのやり方書いてなかった
この回答者はなんでこれ知ってたんだろう
検索ワードからpowershell外したらもっと情報出るのかもしれないけど
うまく検索ワードを組み立てられなかった
