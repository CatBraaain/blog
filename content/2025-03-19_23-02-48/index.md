---
title: Crawl4AIでLiteLLMのfallbacksを設定する
category: Tech
tags: ["Python"]
createdAt: 2025-03-19 23:02:48
updatedAt: 2025-03-19 23:02:48
noteLink: https://note.com/optim/n/n53c85a1dd181
---

## 目的

Crawl4AIのextractオプションでLiteLLMのfallbacks機能を利用したい
fallbacks機能: LLMの呼び出しが失敗したときに、次の予備のモデルを呼んだりできて、複数の無料LLMを制限いっぱいまで呼び出し続けることができる

## スクリプト

```python title="test.py"
await crawler.arun(
    url,
    config=CrawlerRunConfig(
        override_navigator=True,
        magic=True,
        extraction_strategy=LLMExtractionStrategy(
            llm_config=LlmConfig(
                provider="openai/gpt-4o-mini",
            ),
            extra_args={
                "fallbacks": [
                    "openrouter/deepseek/deepseek-r1:free",
                    "openrouter/google/gemini-2.0-pro-exp-02-05:free",
                    "openrouter/meta-llama/llama-3.3-70b-instruct:free",
                    "openrouter/nvidia/llama-3.1-nemotron-70b-instruct:free",
                    "openrouter/qwen/qwen2.5-vl-72b-instruct:free",
                    "openrouter/sophosympatheia/rogue-rose-103b-v0.2:free",
                ]
            },
        ),
    ),
)
```

AsyncWebCrawlerのconfig引数にCrawlerRunConfigを持たせられる
CrawlerRunConfigのextraction_strategy引数にLLMExtractionStrategyを持たせられる

LLMExtractionStrategyの`**kwargs`引数にextra_argsというキーで追加の辞書を持たせる

```python
# https://github.com/unclecode/crawl4ai/blob/e1b3bfe6fb844297abf89e90824ab9a7725071f7/crawl4ai/extraction_strategy.py#L552class LLMExtractionStrategy(ExtractionStrategy):
class LLMExtractionStrategy(ExtractionStrategy):
    def __init__(...):
        ...,
        self.extra_args = kwargs.get("extra_args", {})
```

すると、このextra_argsの値がperform_completion_with_backoff関数に渡されて

```python
# https://github.com/unclecode/crawl4ai/blob/e1b3bfe6fb844297abf89e90824ab9a7725071f7/crawl4ai/extraction_strategy.py#L621
class LLMExtractionStrategy(ExtractionStrategy):
    def extract(...):
        ....
        response = perform_completion_with_backoff(
            ...,
            extra_args=self.extra_args,
        )
```

無事にLiteLLMのcompletion関数に渡される

```python
# https://github.com/unclecode/crawl4ai/blob/e1b3bfe6fb844297abf89e90824ab9a7725071f7/crawl4ai/utils.py#L1630
def perform_completion_with_backoff(
    ...,
    **kwargs,
):
    ...
    if kwargs.get("extra_args"):
        extra_args.update(kwargs["extra_args"])

    ...

    ...
        ...
            response = completion(
                model=provider,
                messages=[{"role": "user", "content": prompt_with_variables}],
                **extra_args,
            )
```
