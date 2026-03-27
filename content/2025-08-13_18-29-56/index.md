---
title: "[openapi] license項目の目的"
category: Tech
tags: []
createdAt: 2025-08-13 18:29:56
updatedAt: 2025-08-13 18:29:56
noteLink: https://note.com/optim/n/n0be47cc4920b
---

## info.license

[OpenAPI](https://swagger.io/specification/)にinfo.licenseという項目がある

通常MITなどのライセンスは、再利用、変更、配布するための法的枠組みを明確にすることを目的としているが、
apiは、サービスでありソースコードなどの著作物ではないため、再利用や配布などに関するルールを設定するのは、完全に的外れである

一体何のライセンスを設定するのか
info.licenseの目的は何か

## 調べてみた

openapi公式リポジトリのissueで同じ疑問を投げている人がいるので見ていく
[https://github.com/OAI/OpenAPI-Specification/issues/726](https://github.com/OAI/OpenAPI-Specification/issues/726)

\*難しいテーマなのでかなりの意訳

> 下記のうちどれを目的としているのか
>
> - APIの使用
> - APIから取得したデータ
> - APIの仕様
> - openapi-codegenでopenapi.jsonを読み込んで自動生成されたクライアントコード

> コード自体は公開されず、openapi.jsonファイルが読み込まれるだけで、それだけです。
> ライセンスとは何の関係があるのでしょうか？

> 多くの商用APIには、info.licenseが含まれていないようです
> 少なくとも私はそのようなAPIを見つけたことがありません。

> APIは定義上、インターフェースであり、実装(著作物)ではありません。

> API仕様の再利用や再公開に関するライセンスであると位置づけられます

> 上に同意します

> 同意します

> apiの利用方法についてusage policyという別の項目を設けるべきです

## 結論

api仕様を記述・公開しているopenapi.jsonの再利用などに関するライセンスであり
api利用方法に関するものではない

会社に関連するものならともかく、個人開発であり、しかもapi仕様だけなので、ライセンスを定める利点が１つも思いつかない
MITどころかWTFPLでいいと思う
