---
title: javascript リンククリック時にフォーカスを移さずに新規タブで開く方法
category: Tech
tags: ["js/ts"]
createdAt: 2021-11-05 01:48:07
updatedAt: 2021-11-05 01:48:07
noteLink: https://note.com/optim/n/n2256c8cb045d
---

通常、リンクを新規タブで開かせると、同時に新規タブの方がアクティブになってしまうが、古いタブをアクティブにさせたまま、勝手に新規タブで開かせておきたかった

[JavaScript - Open a new tab while focusing on an old tab](JavaScript - Open a new tab while focusing on an old tab)

この検索でいくつか見てみたけど、さっぱり分からない

dispatchEventでCtrl+Clickのイベントを作成する方向に切り替えた
（リンクをCtrl+Clickすると新規タブをバックグランドで開ける）

```js
function openLinkInBackground() {
  document.querySelector("p.detail a").dispatchEvent(new MouseEvent("click", { ctrlKey: true }));
}
```

できたっ！

## 参考

[https://stackoverflow.com/questions/34255506/simulate-ctrl-click-with-javascript-or-jquery-to-open-a-new-tab-without-focus/51858053#51858053](https://stackoverflow.com/questions/34255506/simulate-ctrl-click-with-javascript-or-jquery-to-open-a-new-tab-without-focus/51858053#51858053)
