---
title: LiteLLMが心の平穏をもたらした
category: Tech
tags: ["Python"]
createdAt: 2025-03-03 18:05:15
updatedAt: 2025-03-03 18:05:15
noteLink: https://note.com/optim/n/n8631a2931e3f
---

LiteLLMは、LLMのAPI呼び出しを統一し、簡単にプロバイダーやモデルの切り替えを行えるようできるライブラリ。\*Local LLM も対応

## 今までのLLMのAPI呼び出しの課題

モデルやプロバイダーごとに呼び出し方法が違うため、コードが複雑になりがち。また、異なるプロバイダーのAPIを使う際には、それぞれのAPIに合わせたコードを書く必要がある。

下記はLangChainを使った例

```python
import os

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_ollama import ChatOllama
from langchain_openai import ChatOpenAI
from pydantic import SecretStr

load_dotenv()

llm_openai = ChatOpenAI(
    model="gpt-3.5-turbo",
    api_key=SecretStr(os.getenv("OPENAI_API_KEY") or ""),
)

llm_gemini = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-exp",
    api_key=SecretStr(os.getenv("GEMINI_API_KEY") or ""),
)

llm_openrouter = ChatOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=SecretStr(os.getenv("OPENROUTER_API_KEY") or ""),
    model="deepseek/deepseek-r1:free",
)

llm_ollama = ChatOllama(
    model="llama3.1",
)
```

## LiteLLMならこう書ける

```python
from langchain_community.chat_models import ChatLiteLLM

llm_openai = ChatLiteLLM(model="openai/gpt-3.5-turbo")
llm_gemini = ChatLiteLLM(model="gemini/gemini-2.0-flash-exp")
llm_openrouter = ChatLiteLLM(model="openrouter/deepseek/deepseek-r1:free")
llm_ollama = ChatLiteLLM(model="ollama/llama3.1")
```

全く同じ関数で定義ができて、モデル名のところでプロバイダーを指定できるし
.envファイルにAPIキーを書いておけば、それを[自動で読み込んでくれる](https://github.com/BerriAI/litellm/blob/main/litellm/__init__.py#L73)ので
簡単に切り替えられるし、コードも簡潔になる。

## fallback機能が便利

あるモデルが失敗した際には、他のモデルでリクエストを行うフォールバック処理を簡単に実装できる。
API制限に引っかかった際には、他のプロバイダーにフォールバックすることで、安定性を向上できる。

```python
from litellm import completion

response = completion(
    model="gemini/gemini-2.0-flash-exp",
    fallbacks=[
        "openrouter/deepseek/deepseek-r1:free",
        "openrouter/google/gemini-2.0-pro-exp-02-05:free",
        "openrouter/meta-llama/llama-3.3-70b-instruct:free",
        "openrouter/nvidia/llama-3.1-nemotron-70b-instruct:free",
        "openrouter/qwen/qwen2.5-vl-72b-instruct:free",
        "openrouter/sophosympatheia/rogue-rose-103b-v0.2:free",
    ],
    messages=[{"role": "user", "content": "hello world"}],
)
print(response)
```

上記のコードでは、最初にgeminiを呼び出し失敗したらopenrouterの無料モデルを成功するまで順番に呼び出す。
フリーライダーが無料モデルを自動で巡回できるというわけだ。

モデルだけじゃなくてAPIキーの切り替えフォールバックもできるので、
Googleの複数アカウントを用意して無料枠でgeminiを使い倒すこともできると思う。

参考: [https://docs.litellm.ai/docs/completion/reliable_completions](https://docs.litellm.ai/docs/completion/reliable_completions)
参考: [https://docs.litellm.ai/docs/routing](https://docs.litellm.ai/docs/routing)

## LiteLLMはPythonのみ対応

LiteLLMは、[pythonパッケージ](https://github.com/BerriAI/litellm)
[js implementation](https://github.com/zya/litellmjs)も見つけたけど、2年間更新されてない

LangChainは[LiteLLM対応済み](https://python.langchain.com/docs/integrations/chat/litellm/)
LangChain.jsは、もちろん未対応

## まとめ

LLMは、もはやOpenAIの一強ではなくなり、毎月のように各プロバイダーから新しいモデルがリリースされている。
性能、価格、推論速度、コンプライアンス要件などがプロバイダーごとに異なり、その時々に応じて最適なモデルを選択することが重要になってきた。

LiteLLM は、複数のプロバイダーやモデルのAPIを統一的に扱えるため、柔軟に切り替えながら利用できる点が大きな強みである。
これにより、開発者は特定のプロバイダーに依存せず、コストや性能要件に応じた最適な選択が可能になる。
まさに、LLM戦国時代を生き抜くための必須ツールと言えるだろう。
