---
title: "SQL: タプルマッチングが見やすい！"
category: Tech
tags: ["DB"]
createdAt: 2024-09-12 16:21:36
updatedAt: 2024-09-12 16:21:36
noteLink: https://note.com/optim/n/na65be38729f6
---

## 目的

見やすいSQLを書くこと

## 書き方比較

お題：グループごとに最新のレコードを抽出する

```sql
CREATE TABLE records (
    id INT PRIMARY KEY,
    group_id INT,
    record_date DATE,
    data VARCHAR(255)
);

INSERT INTO records (id, group_id, record_date, data) VALUES
(1, 1, '2024-01-01', 'Data A'),
(2, 1, '2024-02-01', 'Data B'),
(3, 2, '2024-01-15', 'Data C'),
(4, 2, '2024-02-15', 'Data D'),
(5, 3, '2024-03-01', 'Data E');
```

### JOIN

```sql
SELECT r1.*
FROM records r1
JOIN (
    SELECT group_id, MAX(record_date) AS max_date
    FROM records
    GROUP BY group_id
) r2
ON r1.group_id = r2.group_id AND r1.record_date = r2.max_date;
```

### EXISTS

```sql
SELECT r1.*
FROM records r1
WHERE EXISTS (
    SELECT 1
    FROM records r2
    WHERE r1.group_id = r2.group_id
    AND r1.record_date = (
        SELECT MAX(r3.record_date)
        FROM records r3
        WHERE r3.group_id = r2.group_id
    )
);
```

### TUPLE MATCHING

```sql
SELECT *
FROM records r
WHERE (r.group_id, r.record_date) IN (
    SELECT group_id, MAX(record_date)
    FROM records
    GROUP BY group_id
);
```

## 比較検討

JOIN は、最もメジャーなやり方だし誰にでも理解しやすいが、フィルターかけるためだけにJOINするゆえにselect結果には1つのテーブルしか使わないというのがどうも気になる

EXISTS は、かっこ内にスコープができているはずなのに、スコープ外のテーブルを持ってきてwhere句に利用するのが非常に気に入らない

TUPLE MATCHING は、最高に分かりやすい
圧倒的！

## 参考

[https://stackoverflow.com/questions/10445162/sql-show-most-recent-record-in-group-by](https://stackoverflow.com/questions/10445162/sql-show-most-recent-record-in-group-by)

[https://www.anicehumble.com/2012/05/tuple-matching-is-neat-how-to-simulate.html](https://www.anicehumble.com/2012/05/tuple-matching-is-neat-how-to-simulate.html)

## あとがき

`タプルマッチング`と検索すると`タップル(tapple) - 恋活・婚活マッチングアプリ`しかヒットしないので、日本語名だと他に言い方があるのかも

SQLは、特に可読性の高いコードを書くことに苦手意識があるので、度々調べて向上に努めたい
