---
title: softalk コマンド 無効なスイッチです とエラーが出る場合
category: Tech
tags: ["Python"]
createdAt: 2021-08-15 14:09:29
updatedAt: 2021-08-15 14:09:29
noteLink: https://note.com/optim/n/nc4f0a0e37e1e
---

[https://qiita.com/Mechanetai/items/78b04ed553cce01fa081](https://qiita.com/Mechanetai/items/78b04ed553cce01fa081)
こちらを参考にコマンドを作ってみた

```cmd
start C:\Program Files\softalk\SofTalk.exe /W:おはようございます
```

すると
Exeファイルが見つかりませんのエラーが出る
ファイルパスの中に空白が含まれているから別々の引数として認識されてしまうのが原因
なので改善

```cmd
start "C:\Program Files\softalk\SofTalk.exe" /W:おはようございます
```

すると今度は、
無効なスイッチです - "/W:おはようございます"
とエラーメッセージが出てくる

いろいろやってみてstartを消したら出来た
最終コード

```cmd
"C:\Program Files\softalk\SofTalk.exe" /W:おはようございます
```

startの必要性を理解してないので、なくて大丈夫なのかも不明
だけど、まあ動けばOK
Done is better than perfect.
だからね

下記Pythonの実行スクリプト

```python
import subprocess
command ='"C:\Program Files\softalk\SofTalk.exe" /W:おはようございます'
subprocess.run(command,shell=True)
```

メモ：コマンドの引数一覧見る方法
[https://talkstone.web.fc2.com/faq/016.html](https://talkstone.web.fc2.com/faq/016.html)
