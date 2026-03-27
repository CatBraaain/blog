---
title: gulp.watch() vs gulp-watch
category: Tech
tags: ["js/ts"]
createdAt: 2024-09-30 18:39:07
updatedAt: 2024-09-30 18:39:07
noteLink: https://note.com/optim/n/n5f699f102569
---

gulp.watch()では、新ファイルの追加時にトリガーされないなどの問題が過去にはあったらしいが現在は、新ファイル追加トリガーも対応している

ぱっとみ、あまり違いがなかったのでgulp.watch()で進めてたら、大きな違いを発見

gulp.watch()では、エラーが起きたときに、watchが終了してしまう
それを回避するために数行余計に書かないといけなくて非常に面倒

gulp-watchでは、エラーが起きてもwatchは継続されるので、gulp-watch一択だな

参考：これは古い情報

[https://github.com/floatdrop/gulp-watch/issues/245](https://github.com/floatdrop/gulp-watch/issues/245)
