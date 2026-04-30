---
title: ahk zipファイルを展開後、zip削除の自動化ショートカット
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-12-17 13:28:05
updatedAt: 2021-12-17 13:28:05
noteLink: https://note.com/optim/n/nd15f07cccf86
---

## 目的

展開の手間、zipファイルの削除の手間を省く

## スクリプト

```ahk
!z:: GoSub ExtractAllZips

ExtractAllZips:
	gosub GetActiveExplorerPath
	Loop, %curdir%\*.zip
		ZipDir := A_LoopFileFullPath
		SplitPath, ZipDir,,,, name_no_ext
		UnzDir := curdir . "\" . name_no_ext
		FileCreateDir, %UnzDir%
		psh  := ComObjCreate("Shell.Application")
		psh.Namespace(UnzDir).CopyHere( psh.Namespace(ZipDir).items, 4|16 )
		FileDelete % ZipDir
		return
	return

GetActiveExplorerPath:
	explorerHwnd := WinActive("ahk_class CabinetWClass")
	if (explorerHwnd){
		for window in ComObjCreate("Shell.Application").Windows{
			if (window.hwnd==explorerHwnd){
				curdir := window.Document.Folder.Self.Path
			}
		}
	}
	return
```

## スクリプト解説

```ahk
GetActiveExplorerPath:
	explorerHwnd := WinActive("ahk_class CabinetWClass")
	if (explorerHwnd){
		for window in ComObjCreate("Shell.Application").Windows{
			if (window.hwnd==explorerHwnd){
				curdir := window.Document.Folder.Self.Path
			}
		}
	}
	return
```

アクティブウィンドウがエクスプローラーなら
カレントディレクトリを取得
（コード内容は理解しきれてない。詳細はリンクにあり）

```ahk
	Loop, %curdir%\*.zip
		ZipDir := A_LoopFileFullPath
		SplitPath, ZipDir,,,, name_no_ext
		UnzDir := curdir . "\" . name_no_ext
		FileCreateDir, %UnzDir%
		psh  := ComObjCreate("Shell.Application")
		psh.Namespace(UnzDir).CopyHere( psh.Namespace(ZipDir).items, 4|16 )
		FileDelete % ZipDir
		return
	return
```

全てのzipファイルをループ
SplitPathで拡張子を除いたファイル名をno_name_extに格納
展開先ファイルパスをUnzDirに格納
あとはpowershellのcopyhereで移動させると展開できるみたい
最後にfiledeleteで不要になったzipファイルを削除

## 参考

[https://www.autohotkey.com/boards/viewtopic.php?t=69925](https://www.autohotkey.com/boards/viewtopic.php?t=69925)

[https://github.com/shajul/Autohotkey/blob/master/COM/Zip%20Unzip%20Natively%20(1%20file%20or%20folder).ahk](<https://github.com/shajul/Autohotkey/blob/master/COM/Zip%20Unzip%20Natively%20(1%20file%20or%20folder).ahk>)

[https://www.autohotkey.com/boards/viewtopic.php?t=28758](https://www.autohotkey.com/boards/viewtopic.php?t=28758)

## あとがき

展開については不具合ないのか心配だけど
こいつは便利だね
