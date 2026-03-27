---
title: "[playwright] firefoxに拡張機能インストールする方法メモ"
category: Tech
tags: ["js/ts"]
createdAt: 2025-10-29 00:24:19
updatedAt: 2025-10-29 00:24:19
noteLink: https://note.com/optim/n/n7238f7260eaf
---

## 参考

[https://github.com/microsoft/playwright/issues/7297#issuecomment-1201240331](https://github.com/microsoft/playwright/issues/7297#issuecomment-1201240331)
[https://github.com/ueokande/playwright-webextext](https://github.com/ueokande/playwright-webextext)
[https://github.com/microsoft/playwright/issues/7297#issuecomment-3333317209](https://github.com/microsoft/playwright/issues/7297#issuecomment-3333317209)
[https://gist.github.com/mpetrunic/1bc80c08d080a30e306479ce0330935b](https://gist.github.com/mpetrunic/1bc80c08d080a30e306479ce0330935b)

ここら辺が有力そうだが、
firefoxでは、署名なしの拡張機能は通常はインストールできず、設定を行うことで、できるようになるのだが、nightlyやdeveloper-editionなど特殊なfirefoxを使う必要がある

上記のはすべて試したけど、難しくてうまくできなかったので、拡張機能のテストはchromiumのみで行うこととした
