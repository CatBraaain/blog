---
title: colabでseleniumモジュールとchromedriverをdriveに保存する
category: Tech
tags: ["Python"]
createdAt: 2021-09-02 23:06:19
updatedAt: 2021-09-02 23:06:19
noteLink: https://note.com/optim/n/n0df374c57443
---

```python
from google.colab import drive
drive.mount('/content/drive')
!pip install selenium --target '/content/drive/MyDrive/Colab Notebooks/MyModules'
!apt-get update
!apt install chromium-chromedriver
!mv '/usr/lib/chromium-browser/chromedriver' '/content/drive/MyDrive/Colab Notebooks/MyModules/chromedriver'
```

マウントしてからdriveの中にpip installする
4行目のapt install でchromedriverをインストールするが場所指定方法がよく分からないので
いったんインストールしてから5行目でdriveに移動させる
この5行は1回やればそののちセッション切れ起こしても、やり直す必要なし

```python
import sys
sys.path.append('/content/drive/MyDrive/Colab Notebooks/MyModules')

from selenium import webdriver

options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
!chmod +x '/content/drive/MyDrive/Colab Notebooks/MyModules/chromedriver'
driver = webdriver.Chrome('/content/drive/MyDrive/Colab Notebooks/MyModules/chromedriver',options=options)
```

seleniumを立ち上げるときは
モジュール検索パスにdriveのパスを追加する
optionはChromeOptions()を使うとimport文が一行省略できる
option.addの3行も必須らしい
webdriver.chrome()では、絶対パスでdrive上のchromedriverを指定するが、PermissionErrorが出るので1行前のchmodで許可を出しておく

これでセッション切れてもすぐ再開できる
マウントの認証も一回で済むように、ColabのファイルはDriveの方から新規作成すれば、完璧

追記
これで出来たと思ったけど翌日から新環境で同じように実行してもなんかエラー出てできなくなった。
