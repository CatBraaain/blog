---
title: "Python: タイプヒントでつまずいたこと"
category: Tech
tags: ["Python"]
createdAt: 2024-09-26 09:26:02
updatedAt: 2024-09-26 09:26:02
noteLink: https://note.com/optim/n/nc1ff98a09d11
---

## 状況

typescriptを経験してからPythonに戻ってきてタイプヒント導入を決意Python 3.12 で PEP 695 の新タイプヒントを使う

[https://peps.python.org/pep-0695/](https://peps.python.org/pep-0695/)

## ParamSpecを含めるとCallableの形が変わる

```python
# 通常
Callable[[引数の型],戻り値の型]

# ParamSpecを含める場合は、最初の角かっこを消す
Callable[ParamSpec,戻り値の型]
```

## ParamSpecの一部のみを利用したい

```python
# 使いたい型 = P[1:]
# 使わない方 = P[0]
# みたいにやりたいとき

Concatenate[Self, P]
```

## 型エイリアスにSelfが使えない

```python
type FnType[T] = Callable[[T], Self]
# NG [Self type cannot be used in type alias target]

type FnType[T] = Callable[[T], "ClassName"]
# OK
```

以上

## あとがき

```python
class Foo:
    ...

    type FuncType[**P, R] = Callable[Concatenate["Foo", P], Awaitable[R]]

    @staticmethod
    def decorator[**P, R](func: FuncType) -> FuncType:  # type: ignore  # decorator function
        async def wrapper(self: Self, *args: P.args, **kwargs: P.kwargs) -> R:

    ...
```

インスタンスメソッドに適用させるためのデコレーターをクラス内に定義して
Genericsなタイプヒントを加える
ということをやるのがとても難しかった
