---
title: js 配列 slice 1個とばし
category: Tech
tags: ["js/ts"]
createdAt: 2021-11-15 21:09:27
updatedAt: 2021-11-15 21:09:27
noteLink: https://note.com/optim/n/n35dafe45c021
---

PythonみたいにSliceでは1個飛ばしできないので

```js
arr.filter((value, index) => index % 2 == 0);
```

filter関数使う
