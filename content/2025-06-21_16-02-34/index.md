---
title: '[vscode] git scm "View as Tree" をデフォルトで有効にする'
category: Tech
tags: ["Git", "VSCode"]
createdAt: 2025-06-21 16:02:34
updatedAt: 2025-06-21 16:02:34
noteLink: https://note.com/optim/n/na239b79d1a74
---

## 状況

vscodeにおいてgitの未適用ファイルの表示を常に"View as Tree"にしたいが
新しいプロジェクトでは、デフォルト"View as List"に設定されていて、毎度変更するのが面倒

### デフォルトのフラット表示

デフォルトでは下図の通りの表示になっていて、カーソルをおいてるボタンをクリックすると表示が切り替わる

![](./na239b79d1a74_1750489029-tp3TnB6lfbh7oZsGDHKPW2vF.png)

### 変更後のツリー構造表示

ボタンクリック後

![](./na239b79d1a74_1750489150-p27PDMOnCJZ83EdStavKVrhF.png)

## 設定方法

下記の通り設定できる

```json title="settings.json"
{
  "scm.defaultViewMode": "tree"
}
```

![](./na239b79d1a74_1750489261-YTCxP98BbnD1uzJqeoh5Wg0c.png)

## 参考

[https://www.reddit.com/r/vscode/comments/1guqniy/how_to_make_the_vcsgit_panel_always_default_to/](https://www.reddit.com/r/vscode/comments/1guqniy/how_to_make_the_vcsgit_panel_always_default_to/)
