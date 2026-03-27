---
title: json-schema $refを上書きマージする方法
category: Tech
tags: []
createdAt: 2024-10-03 02:00:41
updatedAt: 2024-10-03 02:00:41
noteLink: https://note.com/optim/n/nad3e2f0e63b8
---

```json
{
  "allOf": [
    {
      "$schema": "https://json-schema.org/draft-07/schema",
      "type": "object",
      "properties": {
        "newproperty": {
          "type": "string"
        }
      }
    },
    {
      "$ref": "https://json.schemastore.org/package"
    }
  ]
}
```

[https://groups.google.com/g/json-schema/c/86GSgHSQ0VI](https://groups.google.com/g/json-schema/c/86GSgHSQ0VI)
