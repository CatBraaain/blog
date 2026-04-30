---
title: powershell クラスメソッド内でechoが使えない件
category: Tech
tags: ["PowerShell"]
createdAt: 2023-08-15 22:21:07
updatedAt: 2023-08-15 22:21:07
noteLink: https://note.com/optim/n/ne09177d697b3
---

## 目的

クラスメソッド内でechoを使ってデバッグ用出力を利用したい

## これで出力されない

```ps1
class TestClass{
    TestClass(){
        echo "aaa"
    }
}
[TestClass]::New()
```

## 解決方法

```ps1
class TestClass{
    TestClass(){
        Write-Host "aaa"
    }
}
[TestClass]::New()
```

echoをWrite-Hostに書き換える

## 参考

[https://stackoverflow.com/questions/52757670/why-does-write-output-not-work-inside-a-powershell-class-method](https://stackoverflow.com/questions/52757670/why-does-write-output-not-work-inside-a-powershell-class-method)

## あとがき

関数内でechoを使うと、echo出力結果も関数の戻り値に追加されてしまう仕様になっているので、その関連かなと思う
そんなら、これからクラスメソッド以外でもechoを使うのやめてWrite-Hostに統一してみよう
