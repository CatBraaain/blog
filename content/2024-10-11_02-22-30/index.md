---
title: available placeholder in python rich progress
category: Tech
tags: ["Python"]
createdAt: 2024-10-11 02:22:30
updatedAt: 2024-10-11 02:22:30
noteLink: https://note.com/optim/n/na4f8c747ad67
---

## プレースホルダー一覧

```python
progress = Progress(
    TextColumn("{task.id}"),
    TextColumn("{task.description}"),
    TextColumn("{task.total}"),
    TextColumn("{task.completed}"),
    TextColumn("{task.finished_time}"),
    TextColumn("{task.visible}"),
    TextColumn("{task.fields}"),
    # TextColumn("{task.fields['fieldkey']}"), # this not working
    TextColumn("{task.fields[fieldkey]}"), # this does work
    TextColumn("{task.start_time}"),
    TextColumn("{task.stop_time}"),
    TextColumn("{task.finished_speed}"),
    BarColumn(),
    TaskProgressColumn(),
    TimeRemainingColumn(),
)
```

## スタイル一覧

`TextColumn("[bold blue]Starting work!")`
とかがsampleに乗っているから直感で書けそうではあるが、基準ルールが何なのかよくわからず

[https://rich.readthedocs.io/en/stable/progress.html#columns](https://rich.readthedocs.io/en/stable/progress.html#columns)

[https://rich.readthedocs.io/en/stable/reference/progress.html#rich.progress.Task](https://rich.readthedocs.io/en/stable/reference/progress.html#rich.progress.Task)
