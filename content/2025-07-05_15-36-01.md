---
title: "[openapi-generator-cli] ソースコードのみ出力したい"
category: Tech
tags: []
createdAt: 2025-07-05 15:36:01
updatedAt: 2025-07-05 15:36:01
noteLink: https://note.com/optim/n/neca4c0736dfc
---

## openapi-generator-cliの出力ファイル群の規模が大きい

```console
openapi-generator-cli generate -i http://localhost:8000/openapi.json -g python -o ./fastapi_client
```

```text
└── fastapi_client
    └── .github
    └── .openapi-generator
    └── docs
    └── openapi_client
    └── test

    ├── .gitignore
    ├── .gitlab-ci.yml
    ├── .openapi-generator-ignore
    ├── .travis.yml
    ├── git_push.sh
    ├── pyproject.toml
    ├── README.md
    ├── requirements.txt
    ├── setup.cfg
    ├── setup.py
    ├── test-requirements.txt
    └── tox.ini
```

.githubフォルダまで用意して、リポジトリレベルでの出力をしてくれる
こいつはすごい高機能に恐れ入るが、サブフォルダに展開することを想定していたので、調整の必要がある

## 小さく出力

generateSourceCodeOnlyオプションを追加する

```console
openapi-generator-cli generate -i http://localhost:8000/openapi.json -g python -o ./fastapi_client -p=generateSourceCodeOnly=true
```

```text
└── fastapi_client
    └── .openapi-generator
    └── openapi_client
    ├── .openapi-generator-ignore
    └── openapi_client_README.md
```

## 所感

CLIのadditional parametersの指定方法がなかなか見つからなくてちょっと詰まった
