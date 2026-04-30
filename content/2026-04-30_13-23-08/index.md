---
title: "[vscode] commit message に`Co-authored-by: Copilot`が勝手に追加される"
category: Tech
tags: ["VSCode"]
createdAt: 2026-04-30 13:23:08
updatedAt: 2026-04-30 13:23:08
isDraft: false
---

## 状況

vscodeのGUIでgit commitをすると
copilotを使っていないのにも関わらず
commit message bodyのところに`Co-authored-by: Copilot`と勝手に書かれてしまうので、これをやめさせたい

## 解決方法

```json settings.json
{
  "git.addAICoAuthor": "off"
}
```

参考: https://www.reddit.com/r/GithubCopilot/comments/1suf8li/copilot_is_listing_itself_as_a_coauthor_on/
