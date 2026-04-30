---
title: ahk フォルダ内のすべてのファイルを自動include
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-15 00:11:07
updatedAt: 2021-11-15 00:11:07
noteLink: https://note.com/optim/n/nc474bb352003
---

## 目的

includeファイルをいちいち指定せずに
指定フォルダ内の全てのahkファイルを動的includeしたい

## スクリプト

```ahk
UpdatePluginList() {
	Loop, %A_ScriptDir%\Plugins\*.ahk {
		include_list .= "#Include *i " . A_ScriptDir . "\Plugins\" . A_LoopFileName . "`n"
	}

	file := FileOpen(A_ScriptDir . "\PluginList.ahk", "r", "utf-8")
	include_list_old := file.Read(file.Length)

	If (include_list_old != include_list) {
		file := FileOpen(A_ScriptDir . "\PluginList.ahk", "w", "utf-8")
		file.Write(include_list)
		file.close
		Reload
	}
}

UpdatePluginList()
Exit ;Exit Auto-Execute

#Include, %A_ScriptDir%\PluginList.ahk
```

## スクリプト解説

```ahk
UpdatePluginList() {
```

自作関数UpdatePluginListを作成

```ahk
	Loop, %A_ScriptDir%\Plugins\*.ahk {
		include_list .= "#Include *i " . A_ScriptDir . "\Plugins\" . A_LoopFileName . "`n"
	}
```

Pluginsフォルダ内のahkファイルをすべてループでまわして
``#Include *i filepath `n``を変数`include_list`に追加していく
`*i` オプションは、include失敗のエラーメッセージを無視するやつ
`` `n`` は改行

```ahk
	file := FileOpen(A_ScriptDir . "\PluginList.ahk", "r", "utf-8")
	include_list_old := file.Read(file.Length)
```

読み取り専用オプションでfileopen
中身をinclude_list_oldに格納

```ahk
	If (include_list_old != include_list) {
		file := FileOpen(A_ScriptDir . "\PluginList.ahk", "w", "utf-8")
		file.Write(include_list)
		file.close
		Reload
	}
```

include_list_oldとinclude_listを比較
全く同じじゃないなら
pluginlist.ahkを書き直す
書き込み専用オプションでfileopenすると中身は空になる
空になったやつにwriteで書き込む
closeで閉じてから

Reloadでスクリプトをリロードする
これをしないとWriteの内容が反映されない

```ahk
UpdatePluginList()
Exit ;Exit Auto-Execute
```

ここまで終わったら
exitでAuto-Executeを終わらせる
これをしないとその後のincludeの中身の最初のホットキーが誤作動してしまう

```ahk
#Include, %A_ScriptDir%\PluginList.ahk
```

Pluginlist.ahkの中にinclude内容を書き込んであるので、これをincludeして全て自動取り込み完成

## 参考

[https://qiita.com/ryoheiszk/items/092cc5d76838cb5a13f1](https://qiita.com/ryoheiszk/items/092cc5d76838cb5a13f1)
