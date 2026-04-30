---
title: pillow-simd は python3.9では使えない
category: Tech
tags: ["Python"]
createdAt: 2021-08-19 11:50:52
updatedAt: 2021-08-19 11:50:52
noteLink: https://note.com/optim/n/n8f6aca59f2dd
---

高速化のためにpillow-simd導入を試みた。

[https://qiita.com/koshian2/items/c26656a565e42093069d](https://qiita.com/koshian2/items/c26656a565e42093069d)
ここに書いてある通り

```console
pip uninstall -y pillow
pip install pillow-simd
```

このコマンドをうったがエラー

次はこちらに沿って

```console
pip uninstall pillow
pip install --upgrade pillow-simd --global-option="build_ext" --global-option="--disable-jpeg" --global-option="--disable-zlib"
```

コマンド成功

さっそくスクリプトの実行テストをしてみると

```text
warnings.warn(str(v), RuntimeWarning)
ImportError: The _imaging extension was built for another version of Pillow or PIL:
Core version: "7.0.0.post3"
Pillow version: 7.0.0.post3
```

というエラーが出てきた。

ソースコードを見てみると

```python
if sys.platform == "win32" and sys.version_info >= (3, 9):
   warnings.warn(
       "Pillow {} does not support Python {}.{} and does not provide prebuilt "
       "Windows binaries. We do not recommend building from source on Windows.".format(
           PILLOW_VERSION, sys.version_info.major, sys.version_info.minor
       ),
       RuntimeWarning,
   )
```

プラットフォームがwin32でかつpythonのバージョンが3.9以上だとランタイムエラーが出るようになってた。
このパソコン64bitなんだけどなあと思ったけど

「基盤となるWindowsシステムのビット数に関係なくsys.platformはwin32になります」
[https://try2explore.com/questions/jp/10330796](https://try2explore.com/questions/jp/10330796)

とのこと。

結論
Python3.9では、pillow-simdは使えない
