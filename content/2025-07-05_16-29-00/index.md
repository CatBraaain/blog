---
title: "[fastapi] openapiのクライアントのメソッド名を読みやすくする"
category: Tech
tags: ["Python"]
createdAt: 2025-07-05 16:29:00
updatedAt: 2025-07-05 16:29:00
noteLink: https://note.com/optim/n/n32137483c476
---

[https://fastapi.tiangolo.com/advanced/path-operation-advanced-configuration/](https://fastapi.tiangolo.com/advanced/path-operation-advanced-configuration/)

## 関数名をそのまま利用する

```python
def simplify_client_method_names(app: FastAPI) -> None:
    for route in app.routes:
        if isinstance(route, APIRoute):
            print(route.name, route.methods)
            route.operation_id = route.name


simplify_client_method_names(app)
```

## パス名とメソッド名の組み合わせを利用する

```python
def simplify_client_method_names(app: FastAPI) -> None:
    for route in app.routes:
        if isinstance(route, APIRoute):
            path = re.sub(r"\W", "_", route.path_format[1:])
            path_and_method = f"{path}_{list(route.methods)[0].lower()}"
            route.operation_id = path_and_method


simplify_client_method_names(app)
```
