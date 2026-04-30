---
title: WSLで拡張機能をつけずにファイルを実行する
category: Life
tags: []
createdAt: 2025-04-13 23:25:33
updatedAt: 2025-04-13 23:25:33
noteLink: https://note.com/optim/n/n5f2b3988eda7
---

## 目的

WSLのコマンドラインからWindowsのファイル操作を行う際に、拡張子を省略したい
例えば、メモ帳を起動させる際に、CMDなら`notepad`と入力すれば起動できるが、WSLからは`notepad.exe`と入力しないと起動できない
拡張子がない場合は自動で解決してくれるのはWindows固有の仕様らしい

## 前提

Windows以外に触れるのがすべて初めて
WSLでzshをデフォルトコマンドラインとしている

## スクリプト

```bash title=".zshrc"
# (.bashrcの場合は後述のgithub link先を参照)

# コマンドが見つからなかった際のイベントハンドラーをオーバーライド
command_not_found_handler() {
  cmd=$1      # 最初の引数
  shift       # 2番目以降の引数を取得するための前準備
  args=("$@") # 2番目以降の引数

  res=$(cmd.exe /c "$cmd ${args[@]} 2>&1" 2>null) # `UNC paths are not supported.` を抑制
  echo "$res" | iconv -f CP932 -t UTF-8  # 上の行でエラーストリームを破棄するとなぜか文字化けが発生するのでここで対処
}
```

## 参考

[https://github.com/microsoft/WSL/issues/2003](https://github.com/microsoft/WSL/issues/2003)

[https://www.reddit.com/r/Batch/comments/92nkck/suppressing_the_unc_paths_are_not_supported_error/](https://www.reddit.com/r/Batch/comments/92nkck/suppressing_the_unc_paths_are_not_supported_error/)

## 所感

コピペでうまくいかなくて、最低限のbashの勉強を強いられた

はじめてのshellカスタマイズだが、その高機能さに驚いた
成功体験としても悪くないのでWSLのデビューをしてよかったと思ってる
