---
title: typescript `void is not valid as a constituent in a union type` の修正方法
category: Tech
tags: ["js/ts"]
createdAt: 2024-11-06 16:16:58
updatedAt: 2024-11-06 16:16:58
noteLink: https://note.com/optim/n/n7db85ca7d57f
---

## 状況

```ts
function get(): string {
  // get something
}
function set(): void {
  // set something
}
```

この2つの関数を1つにまとめたいが

```ts
function manage(mode: "get" | "set"): string | void {
  switch (mode) {
    case "get":
      // get something
      break;
    case "set":
      // set something
      break;
    default:
      // error
      break;
  }
}
```

```console
void is not valid as a constituent in a union type
```

となってしまう

## 解決方法

undefinedを使う

```ts
function manage(mode: "get" | "set"): string | undefined {
  switch (mode) {
    case "get":
      // get something
      break;
    case "set":
      // set something
      break;
    default:
      // error
      break;
  }
}
```

## 理由

void typeは関数の呼び出し側で戻り値を全く利用しないことを想定している
それに対してmanage()関数は、mode="get"の際には、戻り値のstringを利用するので、voidをunionするのはおかしな話になるため、undefinedを使う
