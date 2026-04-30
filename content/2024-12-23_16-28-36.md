---
title: mongodb $projectで空オブジェクトを与えたい
category: Tech
tags: ["DB"]
createdAt: 2024-12-23 16:28:36
updatedAt: 2024-12-23 16:28:36
noteLink: https://note.com/optim/n/n4fe412ad8d74
---

## aggregationsの$projectでフィールドに空オブジェクトを渡すとエラーになる

```mongodb
[
  {
    $project: {
      myField: {}
    }
  }
]

// Invalid $project :: caused by :: Invalid empty sub-projection: myField
```

## $literalを使えばエラーにならない

```mongodb
[
  {
    $project: {
      myField: {$literal: {}}
    }
  }
]
```
