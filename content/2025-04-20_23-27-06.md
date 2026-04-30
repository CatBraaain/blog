---
title: "[pydantic] computed field をコンストラクタで値セットする"
category: Tech
tags: ["Python"]
createdAt: 2025-04-20 23:27:06
updatedAt: 2025-04-20 23:27:06
noteLink: https://note.com/optim/n/nbe5191e26c41
---

## 目的

pydantic v2 computed field をモデルからの出力だけじゃなくて
モデル作成時にも利用したい

## 問題

propertyのsetterを設けてあるフィールドは、コンストラクタの引数に渡せば、モデルインスタンスを作れるかと思ったら…

```python
from pydantic import computed_field, BaseModel, ConfigDict

class TestModel(BaseModel):
    _x: int
    model_config = ConfigDict(extra='forbid')

    @computed_field
    @property
    def x(self) -> int:
        return self._x

    @x.setter
    def x(self, value):
        print("Setter is called")
        self._x = value


m = TestModel(x=1)
# pydantic_core._pydantic_core.ValidationError: 1 validation error for TestModel
# x
#   Extra inputs are not permitted [type=extra_forbidden, input_value=1, input_type=int]
#     For further information visit https://errors.pydantic.dev/2.1.2/v/extra_forbidden
```

エラーになる

[https://github.com/pydantic/pydantic/issues/6696](https://github.com/pydantic/pydantic/issues/6696)
で機能リクエストされるも

> パフォーマンス上の理由から、dictを構築して`.__dict__`にセットするため、init で setter を呼び出すことはありません。

[https://github.com/pydantic/pydantic/issues/6696#issuecomment-1681824613](https://github.com/pydantic/pydantic/issues/6696#issuecomment-1681824613)

と却下されてしまう

## 解決方法

`__init__()`をオーバーライドする

```python
from pydantic import BaseModel


class ModelWithComputedInit(BaseModel, validate_assignment=True):
    def __init__(self, **data: Any) -> None:
        super().__init__(**data)
        self.__set_computed_fields(data)

    def __set_computed_fields(self, data: dict[str, Any]) -> None:
        for incoming_computed_field in self.model_computed_fields.keys() & data.keys():
            if not getattr(self.__class__, incoming_computed_field).fset:
                raise TypeError(
                    f"Can't initialize {incoming_computed_field}. It is read only."
                )
            setattr(self, incoming_computed_field, data[incoming_computed_field])

# 参考: https://github.com/pydantic/pydantic/issues/6696#issuecomment-2088692327
```

## 余談

`__dict__`に直接セットできるの？と
気になってしまったのでテスト

```python
class Sample:
    def __init__(self):
        self.a = 1
        self.b = 2


obj = Sample()
print("before:", obj.a, obj.b)
# before: 1 2

obj.__dict__ = {"a": 100, "b": 200}
print("after:", obj.a, obj.b)
# after: 100 200
```

はえー
こんなことできたんだ
