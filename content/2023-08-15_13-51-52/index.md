---
title: vscode $variableやVerb-Noun関数をダブルクリックで選択できるようにする方法
category: Tech
tags: ["VSCode"]
createdAt: 2023-08-15 13:51:52
updatedAt: 2023-08-15 13:51:52
noteLink: https://note.com/optim/n/n29c4dc5a4e7c
---

```json
    "[powershell]": {
        "editor.wordSeparators": "`~!@#%^&*()=+[{]}\\|;:'\",.<>/?"
    },
```

これをsettings.jsonに追加する

wordSeparatorsからドルマークとハイフンを除いている
