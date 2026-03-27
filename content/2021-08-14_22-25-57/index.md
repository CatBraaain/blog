---
title: youtube-dl 再生リストをダウンロードしようとするとエラーが出る
category: Life
tags: []
createdAt: 2021-08-14 22:25:57
updatedAt: 2021-08-14 22:25:57
noteLink: https://note.com/optim/n/n96ccf268ac9e
---

```console
'list' は、内部コマンドまたは外部コマンド、
操作可能なプログラムまたはバッチ ファイルとして認識されていません。
'index' は、内部コマンドまたは外部コマンド、
操作可能なプログラムまたはバッチ ファイルとして認識されていません。
```

というエラーメッセージが出たときの解決方法

[https://www.youtube.com/watch?v=2KzkWWkPSpU&list=PUq15_9MvmxT1r2-LLjtkokg&index=1](https://www.youtube.com/watch?v=2KzkWWkPSpU&list=PUq15_9MvmxT1r2-LLjtkokg&index=1)
このURLをダウンロードしようとしたところ上記のエラーメッセージが出た
これは、コマンドプロンプトが「&」の文字に反応したのが原因
よって反応させないためにURLを文字列として認識させるため、ダブルクオーテーションで囲む

NGコマンド

```console
youtube-dl https://www.youtube.com/watch?v=2KzkWWkPSpU&list=PUq15_9MvmxT1r2-LLjtkokg&index=1 --extract-audio --audio-format mp3 --audio-quality 3 -o "D:\\Downloads\\%(title)s.%(ext)s" --quiet
```

改善後コマンド

```console
youtube-dl "https://www.youtube.com/watch?v=2KzkWWkPSpU&list=PUq15_9MvmxT1r2-LLjtkokg&index=1" --extract-audio --audio-format mp3 --audio-quality 3 -o "D:\\Downloads\\%(title)s.%(ext)s" --quiet
```

参考URL
[https://stackoverflow.com/questions/48422377/youtube-downloading-a-playlist-youtube-dl](https://stackoverflow.com/questions/48422377/youtube-downloading-a-playlist-youtube-dl)
