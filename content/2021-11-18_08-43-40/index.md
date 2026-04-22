---
title: ahkでGASエディターのショートカットを作る
category: Tech
tags: ["AutoHotkey"]
createdAt: 2021-11-18 08:43:40
updatedAt: 2021-11-18 08:43:40
noteLink: https://note.com/optim/n/nd853d5b21dbb
---

```ahk title="GAS.ahk"
#IfWinActive Apps Script - Google Chrome
    ^e::Send {End}+{Home}+{Home}+{Left}^c^v^v ;duplicate line
    ^d::Send {End}+{Home}+{Home}+{Left}{BS} ;delete line
```

Ctrl+Eでカーソル行を次行に複製
Ctrl+Dでカーソル行を削除

Shift+Homeを2回打ってるのはインデント対策

カーソル行が1行目でかつ1行目が空行だともともとクリップボードに入ってた内容がただペーストされてしまうけど
そんな状況で行複製しようとも思わないだろうし、そんなことのためにif分岐でコードをややこしくしたくないので様子見

## 他のエディタでも共通ショートカットにしてみた

```ahk title="CommonEditor.ahk"
#If not(WinActive("- Google Chrome")) or (WinActive("Apps Script - Google Chrome"))
	^e::Send {End}+{Home}+{Left}^c^v{Enter}^v
	^d::Send {End}+{Home}+{Left}{BackSpace}
```

ChromeではCtrl+Dはブックマーク追加で使うので

Chromeがアクティブじゃないとき、もしくはGASがアクティブなときだけ共通ショートカット発動！
