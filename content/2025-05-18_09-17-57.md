---
title: "[OBS]前回のセッション中にOBSが正しくシャットダウンされませんでした。の解決方法"
category: Life
tags: []
createdAt: 2025-05-18 09:17:57
updatedAt: 2025-05-18 09:17:57
noteLink: https://note.com/optim/n/n757f3f8c2cce
---

## 状況

パソコン起動中は常にリプレイバッファ―録画状態でOBSを起動している
シャットダウンするときもOBSは起動したまま
OBS v30.0.0から、上記のやり方だと次回起動時に不要なプロンプトが表示されてしまう

## 解決方法1

スタートアップコマンドに--disable-shutdown-check引数をつける

### 変更前

```console
"C:\Program Files\obs-studio\bin\64bit\obs64.exe" --startreplaybuffer --minimize-to-tray
```

### 変更後

```console
"C:\Program Files\obs-studio\bin\64bit\obs64.exe" --startreplaybuffer --minimize-to-tray --disable-shutdown-check
```

## 解決方法2

不正シャットダウンのマーカーファイルを毎回削除する

```bat
del %APPDATA%\obs-studio\safe_mode /y
cd "C:\Program Files\obs-studio\bin\64bit\"
start "" "C:\Program Files\obs-studio\bin\64bit\obs64.exe"
```

## 参考

[https://obsproject.com/forum/threads/error-obs-did-not-shut-down-properly.171003/post-629892](https://obsproject.com/forum/threads/error-obs-did-not-shut-down-properly.171003/post-629892)

[https://obsproject.com/forum/threads/error-obs-did-not-shut-down-properly.171003/post-629675](https://obsproject.com/forum/threads/error-obs-did-not-shut-down-properly.171003/post-629675)
