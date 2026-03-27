---
title: Python 自動背景透過スクリプト
category: Tech
tags: ["Python"]
createdAt: 2021-09-07 20:13:57
updatedAt: 2021-09-07 20:13:57
noteLink: https://note.com/optim/n/n50fdc7b19782
---

```python
import cv2
import numpy as np
from PIL import Image
import scipy.stats

path = r"D:\Downloads\(1).jpg"

img = cv2.imread(path)
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

single_array = np.resize(img,[1,int(img.size/img.shape[2]),img.shape[2]])
most_pixel = scipy.stats.mode(single_array, axis=1)[0].astype('int32') #最頻出ピクセル読み込み
color_range = np.array((10,10,10))

mask = cv2.inRange(img, most_pixel-color_range, most_pixel+color_range)
img = np.dstack((img,~mask))

img = Image.fromarray(img)
img.show()
#img.save(savepath)
```

背景がほぼ一色のきれいめの写真に限るけど
そういう画像は背景が最頻出色になるので、その色を自動検出して
それにほぼ近い色を全て透過させるスクリプト

```python
img = cv2.imread(path)
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
```

cv2で読み込む
cv2は色情報のnumpyがBGRになっているのでRGBになおす
なおさないと人肌が妙に青くなって怖い

```python
single_array = np.resize(img,[1,int(img.size/img.shape[2]),img.shape[2]])
most_pixel = scipy.stats.mode(single_array, axis=1)[0].astype('int32') #最頻出ピクセル読み込み
color_range = np.array((10,10,10))
```

画像の配列を1次元配列にしてsingle_arrayに格納
scipy.stat.modeを使って1次元配列から最頻出色を特定し、most_pixelに格納
most_pixelは必ずastype(’int’)に変えておかないと大変なことになる
あとで最頻出色に近い色を全て透過させるけどcolor_rangeはその近い色と判断する範囲

```python
mask = cv2.inRange(img, most_pixel-color_range, most_pixel+color_range)
img = np.dstack((img,~mask))
```

cv2.inrangeは画像のnumpy配列のimgの中から
most_pixel-color_range<範囲<most_pixel+color_range
この範囲にある色を特定して255の値を入れてくれる
それ以外には0の値を入れてくれる

のちにそれを透明度にしたいわけだけど
透明度は0が透明で255が不透明なので、全く逆
最頻出に近い色を全て透過、つまり０にしたいので
チルダ（~）をmaskの前につけることでnotみたいに反転させる

そしてそれをnp.dstackを使ってimg配列の4次元目（アルファチャンネル）に挿入

```python
img = Image.fromarray(img)
img.show()
#img.save(savepath)
```

Image.fromarrayでnp配列から画像に変換
show()で画像をディスプレイに表示
save()で画像を保存

参考URL
[https://watlab-blog.com/2020/03/08/rgba-png/](https://watlab-blog.com/2020/03/08/rgba-png/)

こちらでは、np.dstackの部分でcv2.bitwise_notを使ってたけど
引数のmaskが理解できなかったのでdstackに変更した

速度も速いみたい
bitwise版：0.02995839999999994s
dstack版 ：0.026092800000000027s

Before

![画像1](./n50fdc7b19782_picture_pc_fa9b6912146ec832a0dc6ddae55d2b54.jpg)

After

![画像2](./n50fdc7b19782_picture_pc_8bf5b9d2c90bf09305a8171e9da78dfa.png)

Afterをビューワーが開いたとき

![画像3](./n50fdc7b19782_picture_pc_deb5766242bd26456ad976d4bf9288e9.jpg)

ワーワーワー⤴
