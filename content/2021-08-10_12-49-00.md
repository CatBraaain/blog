---
title: python youtube-dl ダウンロードファイルの保存場所指定方法
category: Tech
tags: ["Python"]
createdAt: 2021-08-10 12:49:00
updatedAt: 2021-08-10 12:49:00
noteLink: https://note.com/optim/n/nbdfb01c2fc40
---

```python
import youtube_dl
url = ['https://www.youtube.com/watch?v=sr--GVIoluU']
with youtube_dl.YoutubeDL({"outtmpl":r"D:\Downloads\%(title)s%(ext)s"}) as ydl: #,"quiet":True,"no_warnings":True
   ydl.download(url)
```

YoutubeDLのオプションのouttmplにフルパスを入力

以上
