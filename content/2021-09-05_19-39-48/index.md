---
title: cv2でURLから直接画像を読み込み 1行でOK
category: Tech
tags: ["Python"]
createdAt: 2021-09-05 19:39:48
updatedAt: 2021-09-05 19:39:48
noteLink: https://note.com/optim/n/n87fddebc739b
---

```python
import requests
import numpy as np
import cv2
from google.colab.patches import cv2_imshow
src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Thomas_Edison2.jpg/250px-Thomas_Edison2.jpg"
image = cv2.imdecode(np.array(bytearray(requests.get(src).content), dtype=np.uint8), -1)
cv2_imshow(image)
```

上はgoogle colabのサンプルコード
