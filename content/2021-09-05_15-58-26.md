---
title: darknet detectionの中身が空
category: Tech
tags: ["Python"]
createdAt: 2021-09-05 15:58:26
updatedAt: 2021-09-05 15:58:26
noteLink: https://note.com/optim/n/na6b172b25471
---

./darknet detect cfg/yolov4.cfg yolov3.weights data/dog.jpg

detectionの戻り値が空だった原因は
weightsに対してコンフィグファイルの指定が間違ってた

正しくは

./darknet detect cfg/yolov3.cfg yolov3.weights data/dog.jpg

weightがv3ならconfigもv3にしなきゃならないみたい
