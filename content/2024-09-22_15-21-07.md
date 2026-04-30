---
title: "python: subprocess-exited-with-error の解決方法"
category: Tech
tags: ["Python"]
createdAt: 2024-09-22 15:21:07
updatedAt: 2024-09-22 15:21:07
noteLink: https://note.com/optim/n/n1b3100e0919a
---

## 状況

pip install -e src/utils
の実行をすると表題の通りエラーになった

## 経緯

別フォルダからutilsをimportをしたかった
sys.path.append()は使いたくなかった
PYTHONPTAHも使いたくなかった
下記を参考にpip editable install をしてみたかった

[https://stackoverflow.com/questions/68033795/avoiding-sys-path-append-for-imports](https://stackoverflow.com/questions/68033795/avoiding-sys-path-append-for-imports)

## 解決方法

utilsのディレクトリ構成を

```text
└── 📁utils
    └── __init__.py
    └── xxx.py
    └── yyy.py
    └── pyproject.toml
```

から

```text
└── 📁utils
    └── 📁src
        └── 📁utils
            └── __init__.py
            └── xxx.py
            └── yyy.py
    └── pyproject.toml
```

に変更したらできた

なるほどね
pip install なんだからutilsディレクトリをトップレベルとみて通常のパッケージと同じディレクトリ構成にしないといけないわけだ

十分に説明はできないけど、わかった

## あとがき

### pip install -e が便利

無事importできたんだけど
stubがないってmypyに怒られて
py.typedファイルを追加したときもすぐに反映された
いちいち手動ビルドしなおさなくてよくて素晴らしいよ
