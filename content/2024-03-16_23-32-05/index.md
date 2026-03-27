---
title: python load_dotenvが最初の行だけ読み込まない原因
category: Tech
tags: ["Python"]
createdAt: 2024-03-16 23:32:05
updatedAt: 2024-03-16 23:32:05
noteLink: https://note.com/optim/n/n3d28e8e89c2b
---

## 現象

load_dotenv()をしても、.envファイルの最初の行だけ読み込まない

## 原因

文字コードがUTF-8 with BOM

## 解決法

文字コードをUTF-8にする
