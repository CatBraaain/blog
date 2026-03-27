---
title: Firecrawl .search() の内部処理
category: Tech
tags: ["js/ts"]
createdAt: 2025-03-03 22:37:08
updatedAt: 2025-03-03 22:37:08
noteLink: https://note.com/optim/n/nd56f8a22fb36
---

## 目的

`.search()`がなぜ無料で無制限なのか知り、それに依存していいのか判断する

## Search

> Firecrawl は検索結果を自動的に処理し、スクレイピング機能を利用して各結果ページからデータを抽出します。

[https://docs.firecrawl.dev/features/search](https://docs.firecrawl.dev/features/search)

とは書かれてるけど、まさか検索結果のhtmlを解析してるなんてことあるのかな

## 確認結果

下記一部引用

```ts
async function _req(...) {

    ...

    const resp = await axios.get("https://www.google.com/search", {
      headers: {
        "User-Agent": agent,
          "Accept": "*/*"
      },
      params: params,
      proxy: proxies,
      timeout: timeout,
      httpsAgent: new https.Agent({
        rejectUnauthorized: true
      }),
      withCredentials: true
    });
    return resp;
```

```ts
const resp = await _req(
  term,
  num_results - start,
  lang,
  country,
  start,
  proxies,
  timeout,
  tbs,
  filter,
);
const dom = new JSDOM(resp.data);
const document = dom.window.document;
const result_block = document.querySelectorAll("div.ezO2md");
```

google検索のURLにリクエストを送って結果を`document.querySelectorAll("div.ezO2md")`で抽出してた

[https://github.com/mendableai/firecrawl/blob/9eb25786dce09fd6aa9b021191534d120dc949f0/apps/api/src/search/googlesearch.ts#L67](https://github.com/mendableai/firecrawl/blob/9eb25786dce09fd6aa9b021191534d120dc949f0/apps/api/src/search/googlesearch.ts#L67)

## 結論

まさか検索結果のhtmlを解析してるわけない
と思ったけど、そういうやり方だった

CSSセレクタ―が貧弱だったので、あまりこれに依存したくない
document.querySelectorAll("div.ezO2md");
このクラス名絶対定期的に変わっちゃうやつでしょ

## 追記

検索結果ページのHTMLを解析するのは、ごく一般的なやり方ぽい
SearXNGでもwhoogle-searchでもそうやってるぽい

[https://github.com/searxng/searxng/blob/8984d7ae022e4e28a9ecb6032c5c535d6ebee520/searx/engines/google.py#L355](https://github.com/searxng/searxng/blob/8984d7ae022e4e28a9ecb6032c5c535d6ebee520/searx/engines/google.py#L355)
