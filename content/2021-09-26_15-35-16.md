---
title: CV2で画像の余白削除トリミングする方法
category: Tech
tags: ["Python"]
createdAt: 2021-09-26 15:35:16
updatedAt: 2021-09-26 15:35:16
noteLink: https://note.com/optim/n/n2bb4d704182a
---

①二値化
②拡大縮小でノイズ除去
③cv2.findnonzeroで色付きピクセルの座標を取得
④cv2.boundingRectで外接矩形(がいせつくけい)を取得
⑤cropして終わり

## 参考URL

[https://www.webdevqa.jp.net/ja/python/%25e7%2594%25bb%25e5%2583%258f%25e3%2581%258b%25e3%2582%2589%25e7%2599%25bd%25e3%2581%2584%25e8%2583%258c%25e6%2599%25af%25e3%2582%2592%25e3%2583%2588%25e3%2583%25aa%25e3%2583%259f%25e3%2583%25b3%25e3%2582%25b0%25e3%2581%25be%25e3%2581%259f%25e3%2581%25af%25e5%2589%258a%25e9%2599%25a4%25e3%2581%2599%25e3%2582%258b%25e6%2596%25b9%25e6%25b3%2595/836187586/](https://www.webdevqa.jp.net/ja/python/%25e7%2594%25bb%25e5%2583%258f%25e3%2581%258b%25e3%2582%2589%25e7%2599%25bd%25e3%2581%2584%25e8%2583%258c%25e6%2599%25af%25e3%2582%2592%25e3%2583%2588%25e3%2583%25aa%25e3%2583%259f%25e3%2583%25b3%25e3%2582%25b0%25e3%2581%25be%25e3%2581%259f%25e3%2581%25af%25e5%2589%258a%25e9%2599%25a4%25e3%2581%2599%25e3%2582%258b%25e6%2596%25b9%25e6%25b3%2595/836187586/)

[https://www.semicolonworld.com/question/60108/how-to-remove-extra-whitespace-from-image-in-opencv](https://www.semicolonworld.com/question/60108/how-to-remove-extra-whitespace-from-image-in-opencv)

[https://stackoverflow.com/questions/49907382/how-to-remove-whitespace-from-an-image-in-opencv](https://stackoverflow.com/questions/49907382/how-to-remove-whitespace-from-an-image-in-opencv)
