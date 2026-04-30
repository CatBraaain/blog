---
title: Roo Codeでccrを使う方法
category: Tech
tags: ["VSCode"]
createdAt: 2025-09-18 01:51:38
updatedAt: 2025-09-18 01:51:38
noteLink: https://note.com/optim/n/nee230d6846dc
---

Roo CodeはClaude Codeをサポートしているが、Claude Code Routerはサポートしていない

Roo Code内部では、shell aliasなどは影響されないので、
alias claude = ccr code
ではうまくいかない

## やり方

ccr側の設定は終わっているものとする

claudeの設定で通信をccrのプロキシサーバーに投げさせる

```json title="~/.claude/settings.json"
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "ANTHROPIC_API_KEY": "xxx",
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:3456",
    "NO_PROXY": "127.0.0.1",
    "DISABLE_TELEMETRY": "true",
    "DISABLE_COST_WARNINGS": "true"
  }
}
// https://github.com/musistudio/claude-code-router/blob/5cd21c570fb87cc131e0c4254b40d5ffd127b176/src/utils/codeCommand.ts#L19
```

ccrのサーバーをたてる

```console
ccr start
```

以上
