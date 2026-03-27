---
title: vscode json schema is untrusted
category: Tech
tags: ["VSCode"]
createdAt: 2026-02-07 01:06:38
updatedAt: 2026-02-07 01:06:38
noteLink: https://note.com/optim/n/n8d00e8fcc095
---

biome.jsonでremoteのschemaを利用する

```json title="biome.json"
{
  "$schema": "https://biomejs.dev/schemas/2.3.14/schema.json"
}
```

すると下記のように警告が出る

```console title="VSCode Problems Panel"
Unable to load schema from 'https://biomejs.dev/schemas/2.3.14/schema.json':
Location https://biomejs.dev/schemas/2.3.14/schema.json is untrusted.
```

vscodeのsettings.jsonに下記の設定を加えると警告が消えた

```json title="settings.json"
{
  "json.schemaDownload.trustedDomains": {
    "https://biomejs.dev/": true
  }
}
```

さらに下記のようにすると、すべてのドメインを許可して今後一切の警告が出なくなった

```json title="settings.json"
{
  "json.schemaDownload.trustedDomains": {
    "*": true
  }
}
```
