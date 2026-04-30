---
title: colab darknet CUDA status Errorの原因
category: Tech
tags: ["Python"]
createdAt: 2021-09-02 16:49:28
updatedAt: 2021-09-02 16:49:28
noteLink: https://note.com/optim/n/n663541898a21
---

CUDA status Error: file: ./src/dark_cuda.c : () : line: 39 : build time: Sep 2 2021 - 07:39:00
CUDA Error: no CUDA-capable device is detected
Darknet error location: ./src/dark_cuda.c, check_error, line #70
CUDA Error: no CUDA-capable device is detected: Bad file descriptor

このエラーメッセージの原因
darknetがGPU使う設定になっているのに
ランタイムタイプの変更でGPUにするの忘れてた
