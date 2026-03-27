---
title: json-schema 特定プロパティを禁止する方法
category: Tech
tags: []
createdAt: 2024-10-03 02:04:16
updatedAt: 2024-10-03 02:04:16
noteLink: https://note.com/optim/n/ndedf76ffbf89
---

```json
{
  "$schema": "https://json-schema.org/draft-07/schema",
  "type": "object",
  "properties": {
    "commands": {
      "not": {}
    },
    "keybindings": {
      "not": {}
    }
  }
}
```

他にもnot anyOf requiredを使うやり方もあるが、
否定のor構文が分かりにくくて可読性が低いのと
コード量が長くなるのと
プロパティの親オブジェクト全体がエラー箇所として表示されてしまうので
上記のやり方がよい

[https://groups.google.com/g/json-schema/c/upaYd1Sq_ds?pli=1](https://groups.google.com/g/json-schema/c/upaYd1Sq_ds?pli=1)
