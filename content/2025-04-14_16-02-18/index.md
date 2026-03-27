---
title: "[Chrome拡張機能] popup.html を DevToolsでデバッグする２つの方法"
category: Tech
tags: ["js/ts"]
createdAt: 2025-04-14 16:02:18
updatedAt: 2025-04-14 16:02:18
noteLink: https://note.com/optim/n/n50a99cf84de9
---

## 目的

Chrome拡張機能のpopup.htmlのデバッグをしたい
html内の要素をDevToolsで確認したい

## 状況

下図の拡張機能のpopupでパズルマークの画像のURLを確認したい
DevToolsでInspectModeにしてるのに、popup.htmlで要素選択ができない

![](./n50a99cf84de9_1744612990-H6av4bsMzmAhrDg0YRt8pNqe.png)

## やり方１

popupを開いて、popupページエリア内で右クリック→検証

![](./n50a99cf84de9_1744613987-604Ehn5FAuIVglyri1Pbpkov.png)

すると別ウィンドウでDevToolsが開く

![](./n50a99cf84de9_1744614046-RXEuMSTJ0P2mfznc7FN9vkro.png)

## やり方２

chrome://extensions/ にアクセス

対象の拡張機能の詳細ボタンをクリック

![](./n50a99cf84de9_1744613446-OtxJCrgABoy6nTaeEi4c1hV2.png)

URLからExtensionIDを取得

![](./n50a99cf84de9_1744613707-PyML6xJSXU5Gkabp0cWIKosY.png)

chrome-extension://${ExtensionID}/popup.html にアクセス

![](./n50a99cf84de9_1744613748-OLcE69GBjeSU2KNTAd05yo1V.png)

すると、メインエリア？にpopup.htmlが展開される

![](./n50a99cf84de9_1744613835-NzBmLMduxqneytUCDSARQ2aH.png)

## 参考

[https://qiita.com/nosniklim/items/c7d074f13e81d4aca851](https://qiita.com/nosniklim/items/c7d074f13e81d4aca851)

[https://stackoverflow.com/questions/29178827/debugging-chrome-extension-default-popup-using-dev-tools](https://stackoverflow.com/questions/29178827/debugging-chrome-extension-default-popup-using-dev-tools)
