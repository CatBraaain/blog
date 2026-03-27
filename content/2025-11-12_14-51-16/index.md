---
title: Renovate 自動マージ・承認 メモ
category: Tech
tags: []
createdAt: 2025-11-12 14:51:16
updatedAt: 2025-11-12 14:51:16
noteLink: https://note.com/optim/n/n5fe0331c08be
---

## 実現したいこと

self-hosted renovateで依存更新PRを出したい
PRは手動承認を挟みたい
PRはCIテストを必須としたい

## キー種別による挙動

- **PAT**
  動作: PATに紐づくgithubアカウントでPRを作成することとなる
  問題: 同一githubアカウントで手動承認はできないので、手動承認の要件を満たせない
  解決方法: renovatebot用にgithubアカウントをもう1つ作成するか、後述のGitHub-Appを利用する \*メモ: Renovateの手動承認不要だけど、ブランチ保護は残したい場合のやり方
  - 組織配下のリポジトリでのみ利用できる設定の`Allow bypassing required pull requests`で管理者ロールは、PRの承認をbypassする。
  - on.workflow_run.completedでCI終了トリガーで、承認ボットrenovate-approve-botを走らせて即時承認する。
    cronトリガーでもできるがタイミングの安定性に欠けるのでNG

- **GitHub App**
  動作: GitHub-AppがPRを作成することとなるため、自分のgithubアカウントでそれを承認できる

## GitHub App の種類

- キーだけ利用
  [https://github.com/marketplace/actions/renovate-bot-github-action#example-with-github-app](https://github.com/marketplace/actions/renovate-bot-github-action#example-with-github-app)
  [https://docs.renovatebot.com/modules/platform/github/#running-as-a-github-app](https://docs.renovatebot.com/modules/platform/github/#running-as-a-github-app)
  の通りにキーだけ利用するとself-hosted-renovateでもGitHub-AppとしてPRを作成してくれる
- Mend Renovate
  これは、RenovateCloudを利用するものでありセルフホストではない
  [https://github.com/apps/renovate](https://github.com/apps/renovate)

## 自動マージ設定

- **Renovate側 (`automerge: true`)**
  Renovate cloudの場合は、直感通りに動くはずだが
  Self-hosted Renovateの場合は、CIなしの場合は即時マージされるが、CIアリの場合はRenovate側でマージはできず、GitHub側のauto-mergeに依存
- **GitHub 側 (`Allow auto-merge`)**
  動作: 後述のブランチ保護設定を正しくすることで、GitHub側でCI確認後にマージされる

## ブランチ保護・ステータスチェック

- **Require status checks**
  `true`: CIが通らないとマージ不可（GitHub auto-merge使用時は必須）
  `false`: CIに関係なくマージ可能（安全性低下）
- **Require pull request before merging**
  `true`: 承認必須でPR経由でのマージ（ブランチ保護と合わせて安全性確保）
  `false`: 直接push可能（承認設定不可）

## 最終構成

- **Renovate 実行環境**
  - Self-hosted Renovate を GitHub Actions 上で実行
  - 使用する認証は自作GitHub-Appの鍵とApp-ID

- **GitHub 設定**
  - Require status checks = true（CI 必須）
  - Require pull request before merging = true（承認必須）
  - GitHub auto-merge を有効にして、CI 通過後にマージ

- **PR 承認フロー**
  - PR 作成者は GitHub App（botアカウント）
  - 自分の個人アカウントで手動承認可能
  - CIと承認が通ったら GitHub auto-merge によりマージ
