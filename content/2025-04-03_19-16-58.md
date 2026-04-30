---
title: python sync/async 両方サポートするためのtips
category: Tech
tags: ["Python"]
createdAt: 2025-04-03 19:16:58
updatedAt: 2025-04-03 19:16:58
noteLink: https://note.com/optim/n/n5613f8630eeb
---

## sync/async 両方サポートするのが大変

> メソッドの先頭に文字「a」を付けて、いたるところに「async」キーワードを散りばめるためだけに、すべてのメソッドを複製したくはありません。

[https://github.com/grantjenks/python-diskcache/issues/282#issuecomment-1625526087](https://github.com/grantjenks/python-diskcache/issues/282#issuecomment-1625526087)

## sync/asyncサポートをDRYに実現している例

### [httpcore](https://github.com/encode/httpcore/tree/master)

`_async`コードをスクリプトで変換して`_sync`コードを自動生成している

```python
# https://github.com/encode/httpcore/blob/master/scripts/unasync.py

def main():
    check_only = '--check' in sys.argv
    unasync_dir("httpcore/_async", "httpcore/_sync", check_only=check_only)
    unasync_dir("tests/_async", "tests/_sync", check_only=check_only)

    if len(USED_SUBS) != len(SUBS):
        unused_subs = [SUBS[i] for i in range(len(SUBS)) if i not in USED_SUBS]

        print("These patterns were not used:")
        pprint(unused_subs)
        exit(1)


if __name__ == '__main__':
    main()
```

## 使えそうなライブラリ

[https://github.com/alex-sherman/unsync](https://github.com/alex-sherman/unsync)

[https://github.com/bitcart/universalasync](https://github.com/bitcart/universalasync)

## 参考

> 常に async を最初に記述してください。
> 非同期実装が完了したら、スクリプトを使用してそれを同期実装に変換できます。

[https://dev.to/spwoodcock/how-to-write-a-dry-combined-sync-async-python-package-4kj8](https://dev.to/spwoodcock/how-to-write-a-dry-combined-sync-async-python-package-4kj8)
