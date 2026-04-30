---
title: AIスクレイピングの技術選定
category: Tech
tags: []
createdAt: 2025-02-07 14:17:03
updatedAt: 2025-02-07 14:17:03
noteLink: https://note.com/optim/n/n80b02924df89
---

## 目的

不特定多数のウェブサイトをスクレイピングして情報を抽出する

### 想定フロー

1.  検索ワードに沿って検索する
2.  検索ヒットしたウェブサイトを複数アクセス（ブラウザで表示）
3.  htmlを取得し、AIに読み込ませる
4.  AIに質問を投げて必要情報を抽出or要約させる

## 前提知識

- AIのことをLLMをいう

## 必要な技術選定

- **LLM**
  - 可能ならば無料範囲内
  - 精度に関しては、高精度を求めるわけではなく、基本的なテキスト解析ができれば十分

- **LLM Serving Framework**
  - Local LLM 用の実行環境ツール

- **LLM Framework**
  - 現在のLLM戦国時代を考慮し、価格や性能が変動しやすいため、モデルの切り替えが容易であること

- **Crawler**
  - JavaScriptで動的にコンテンツが生成されるウェブサイトにも対応するため、HTTPリクエストではなく、ブラウザを自動化してウェブページにアクセスする

## LLMの選定

メジャーなクラウドAIの中で無料枠があるのは gemini のみ
ローカルLLMだと llama.cpp, Llama, LocalAI, DeepSeek
が見つかった

採用：Llama
理由：よく名前を見かけたから
（後から簡単に変更できるはずなのでここに時間かけたくない）

参考：[github #LLM](https://github.com/search?q=llm), [Hugging Face #text-generation](https://huggingface.co/models?pipeline_tag=text-generation&sort=trending)

## LLM Serving Framework

Local LLM をホストするツール
ollama, gpt4all が見つかった
defyは、GUIでGUIツールを作るためのものっぽいので対象外

ollama: 121k star
gpt4all: 72.3k star

採用：ollama
理由：github star が圧倒的だったし、情報量も多そうだったので機能も特に見ずに決定

参考：[github #LLM](https://github.com/search?q=llm)

## LLM Framework

うまい検索ワードは見つからず

LangChain, AutoGPT が見つかった

AutoGPTはChatGPTしか対応してないみたい

採用：LangChain
理由：これしかなかった？
