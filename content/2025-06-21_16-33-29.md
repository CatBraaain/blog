---
title: "[justfile] デフォルトレシピの命名を検討する"
category: Tech
tags: ["justfile"]
createdAt: 2025-06-21 16:33:29
updatedAt: 2025-06-21 16:33:29
noteLink: https://note.com/optim/n/n61861927159a
---

## 状況

タスクランナーにおいて、mise, go-taskfile, justfile を比較して
人口の多さからjustfileに入門を決意。

## デフォルトでレシピリストを表示してほしい

justでは`just`コマンドを実行すると、先頭のレシピが実行されるが
個人的には、レシピのリスト表示をしてほしい。

となるとデフォルトレシピで`just --list`を呼び出すことになる。

```just title="justfile"
default:
  just --list

hello:
  echo "hello"

say:
  echo "how are you"
```

```console
> just
just --list
Available recipes:
    default
    hello
    say
```

**次は、レシピリストの中に、`default`が表示されるのが気に入らない**

## レシピリストからデフォルトレシピを非表示

`[private]`属性をつけると非表示になる

```just title="justfile"
[private]
default:
  just --list

hello:
  echo "hello"

say:
  echo "how are you"
```

けど、これだと下3つのレシピのタイトル？みたいに見えるのが気に入らないので
先頭にアンダーをつけて非表示属性付与する

```just title="justfile"
_default:
  just --list

hello:
  echo "hello"

say:
  echo "how are you"
```

```console
> just
just --list
Available recipes:
    hello
    say
```

**次は、コマンド内容が表示されるのが気に入らない**

## コマンド内容を非表示にする

レシピ名の先頭にアットマークをつけてコマンド内容を非表示にする

```just title="justfile"
@_default:
  just --list

hello:
  echo "hello"

say:
  echo "how are you"
```

```console
> just
Available recipes:
    hello
    say
```

**次はレシピ名が気に入らない**

## デフォルトレシピ名の検討

機能性でつけるなら
下2つが候補だけどどうも気に入らない

```just title="justfile"
@_list:
  just --list
```

```just title="justfile"
@_help:
  just --list
```

いっそ名前を消して属性のみにしてみる

```just title="justfile"
@_:
  just --list
```

悪くないけど、アットマークが気に入らないので、レシピ名じゃなくてコマンド側に@をつける

```just title="justfile"
_:
  @just --list
```

とてもいいね。
レシピ名がアンダーだけなので、特殊レシピであることが一目でわかる。

## 最適解

```just title="justfile"
export JUST_UNSORTED := "true"

_:
  @just --list

hello:
  echo "hello"

say:
  echo "how are you"
```

```console
> just
Available recipes:
    hello
    say
```
