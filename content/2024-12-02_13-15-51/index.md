---
title: "python: Google Translationを無料で使う"
category: Tech
tags: ["Python"]
createdAt: 2024-12-02 13:15:51
updatedAt: 2024-12-02 13:15:51
noteLink: https://note.com/optim/n/n6ecf9dbc996d
---

Google Cloud Translationは毎月50万文字無料だが、完全無料で無制限で使う方法がある

## py-googletrans

[Google翻訳](https://translate.google.com/)のprivate api を勝手に利用するライブラリ

[https://github.com/ssut/py-googletrans](https://github.com/ssut/py-googletrans)

## やり方

安定版の3.0.0には不具合があるため
バージョン指定してインストール

```console
pip install googletrans==4.0.0rc1
```

```python
# test.py

from googletrans import Translator

str = "Hoy hace muy buen tiempo."

translator = Translator()
print(translator.translate(str, dest="en"))
# Translated(src=es, dest=en, text=Today it has been very good time., pronunciation=None, extra_data="{'confiden...")
print(translator.translate(str, dest="ja"))
# Translated(src=es, dest=ja, text=今日はとても楽しい時間でした。, pronunciation=None, extra_data="{'confiden...")
```

## httpxの依存関係でエラーになったら

```console
pip install googletrans-py
```

こっちをつかう

## その他の翻訳ツール

LibreTranslate: 無料 セルフホスト: [デモ版](https://ja.libretranslate.com/)で試せるが、精度がいまいち
Google Cloud Translation: [毎月50万文字無料](https://cloud.google.com/translate/pricing?hl=ja)
Azure AI Translator API: [毎月200万文字無料](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/translator/)
Amazon Translate: [初年のみ毎月200万文字無料](https://aws.amazon.com/jp/translate/pricing/)
