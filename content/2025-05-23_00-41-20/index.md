---
title: cuelangを試してみて、やめた
category: Tech
tags: []
createdAt: 2025-05-23 00:41:20
updatedAt: 2025-05-23 00:41:20
noteLink: https://note.com/optim/n/n59804b905442
---

## 目的

gmailフィルター用のファイル(json or yaml)を動的に作りたい

## cueの選定理由

タイプセーフに書ける
オブジェクトの中で関数や変数の定義や利用ができる
リスト内包表記が強い
オブジェクト内包表記も使える

## 耐えられなかった理由

ifは使えるがelseが使えない。三項演算子も存在しない。
vscode拡張機能にライブプレビュー機能がない。
公式版vscode拡張機能のsyntax highlightがバグだらけ。
2021年から開発計画が進んでない印象。将来に期待できない。
公式CLIのフォーマッター機能でインデントにスペースではなくタブが強制される。
タイプセーフのはずなのに、複雑な構造体ではエラーメッセージが安定しておらず、バグの発見が困難。リンターも活躍しない。
関数の再帰実行の制限が厳しすぎる。

## Array.reduce()的な関数を作った

[https://gist.github.com/CatBraaain/c2378702e0bf81b4009a1c0c6d499669](https://gist.github.com/CatBraaain/c2378702e0bf81b4009a1c0c6d499669)

これを作るも結局ネスティングができず。

## リンクメモ

公式ドキュメント：[https://cuelang.org/docs/](https://cuelang.org/docs/)
有能な第三者ドキュメント：[https://cuetorials.com/](https://cuetorials.com/)
関数的構造体：[https://cuetorials.com/patterns/functions/](https://cuetorials.com/patterns/functions/)
再帰関数の制限と実現方法：[https://cuetorials.com/deep-dives/recursion/](https://cuetorials.com/deep-dives/recursion/)

## 総評

テンプレート言語にしては学習コストが高かった気がする。
今回15時間くらいかけた末の断念なので、損失は大きい。

やっぱり結局typescriptでtypesafeにjsデータオブジェクトを生成して、それをjsonやyamlなどに変換するのが一番いい
今回の苦労を忘れた頃に、またテンプレート言語の可能性を探りたくなるであろう未来が見えるが、その時はこの記事を見て断念されたい
