---
title: powershell タスクスケジューラの一括エクスポートでエクスプローラーとディレクトリ構成を同期させる
category: Tech
tags: ["PowerShell"]
createdAt: 2021-11-16 20:41:34
updatedAt: 2021-11-16 20:41:34
noteLink: https://note.com/optim/n/n2ac801a0352a
---

## 目的

タスクスケジューラを覚えてからコツコツタスクを作ったが
登録数も増えてきたこの頃、そろそろ管理が必要になってきた。

**・タスク名を簡単に変更
・ディレクトリ構成をドラッグアンドドロップで変更**

上記2つをしたいが、標準GUIでやろうとすると一度タスクを消して作り直さないといけない面倒な仕様、さらにGUI操作がもっさりしててイライラするので、スクリプトで一括管理したい

検索すると特定フォルダごとの一括エクスポート方法はあったが、サブフォルダ内の含めた階層指定なしの本当の一括エクスポートがなかったので作った

タスクスケジューラはローカルの下のMyTasksフォルダ以下
エクスプローラーは、ドキュメント/TaskScheduler/MyTasksフォルダ以下
をそれぞれ参照している

## タスクの一括エクスポート

```powershell
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

$sch = New-Object -ComObject("Schedule.Service")
$sch.Connect("localhost")

$folders = @($sch.GetFolder("\MyTasks"))
$root = "C:\Users\USERNAME\Documents\TaskScheduler"

$i = 0
while ($i -lt $folders.Length) {
   [System.IO.Directory]::CreateDirectory("$root$($folders[$i].Path)")

   $folders[$i].GetFolders(0) | %{
       $folders += $_
   }
   $folders[$i].GetTasks(0) | %{
       $Xml = $_.Xml
       $out_path = "$root$($folders[$i].Path)\$($_.Name).xml"
       $Xml | Out-File $out_path
   }
   $i += 1
}
```

## タスクの一括インポート

```powershell
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

$sch = New-Object -ComObject("Schedule.Service")
$sch.Connect("localhost")

$base_dir = "C:\Users\USERNAME\Documents\TaskScheduler\MyTasks\"
$rel_paths = Get-ChildItem $base_dir -Recurse -Filter *.xml -Name

foreach ($rel_path in $rel_paths){
   $task_name = "MyTasks\$($rel_path.Replace('.xml',''))"
   schtasks /create /XML $base_dir$rel_path /TN $task_name /S localhost /RU "username" /RP "password"
}
```

## タスクの一括デリート

```powershell
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

$sch = New-Object -ComObject("Schedule.Service")
$sch.Connect("localhost")

$folders = @($sch.GetFolder("\MyTasks"))
$root = @("C:\Users\USERNAME\Documents\TaskScheduler")

$i = 0
while ($i -lt $folders.Length) {
   $folders[$i].GetFolders(0) | %{
       $folders += $_
   }
   $folders[$i].GetTasks(0) | %{
       $folders[$i].DeleteTask($_.Name,$null)
   }
   $i += 1
}
for ($i=$folders.length-1; $i -ge 0; $i--){
   $folders[$i].GetFolders(0) | % {
       $folders[$i].DeleteFolder($(Split-Path $_.Path -Leaf),$null)
   }
}
```

## さらにインポート・エクスポートにそれぞれデリート機能も加えることで、同期機能をもたせる

単なるエクスポートではなく完全に同じ構成にしてしまう

## タスクスケジューラと同期

```powershell
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

Remove-Item "C:\Users\USERNAME\Documents\TaskScheduler\MyTasks" -Recurse

$sch = New-Object -ComObject("Schedule.Service")
$sch.Connect("localhost")

$folders = @($sch.GetFolder("\MyTasks"))
$root = "C:\Users\USERNAME\Documents\TaskScheduler"

$i = 0
while ($i -lt $folders.Length) {
   [System.IO.Directory]::CreateDirectory("$root$($folders[$i].Path)")

   $folders[$i].GetFolders(0) | %{
       $folders += $_
   }
   $folders[$i].GetTasks(0) | %{
       $Xml = $_.Xml
       $out_path = "$root$($folders[$i].Path)\$($_.Name).xml"
       $Xml | Out-File $out_path
   }
   $i += 1
}
```

## エクスプローラーと同期

```powershell
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

$sch = New-Object -ComObject("Schedule.Service")
$sch.Connect("localhost")

$folders = @($sch.GetFolder("\MyTasks"))

$i = 0
while ($i -lt $folders.Length) {
   $folders[$i].GetFolders(0) | %{
       $folders += $_
   }
   $folders[$i].GetTasks(0) | %{
       $folders[$i].DeleteTask($_.Name,$null)
   }
   $i += 1
}
for ($i=$folders.length-1; $i -ge 0; $i--){
   $folders[$i].GetFolders(0) | % {
       $folders[$i].DeleteFolder($(Split-Path $_.Path -Leaf),$null)
   }
}

$base_dir = "C:\Users\USERNAME\Documents\TaskScheduler\MyTasks\"
$rel_paths = Get-ChildItem $base_dir -Recurse -Filter *.xml -Name

foreach ($rel_path in $rel_paths){
   $task_name = "MyTasks\$($rel_path.Replace('.xml',''))"
   schtasks /create /XML $base_dir$rel_path /TN $task_name /S localhost /RU "username" /RP "password"
}
```

## 成果

エクスプローラー側で、通常ファイル同様にファイル名をいじったりディレクトリ構成を変えてから、エクスプローラーと同期を実行すれば、反映されるので、当初の目的は達成された

## メモ

・文法も十分に理解しないままコピペでつなぎ合わせたので、また余裕のある時に見直したい

・さすがにエクスプローラーのファイルを削除するのはなんか恐ろしいので、ただコピーを増やしていくだけの方法にするか、悩みどころ

## 1年後ようやく改良（2023/1/18追記）

### 改良した点

・エクスプローラーのXMLは削除ではなくArchiveフォルダに移動させた
・タスク登録時にセキュリティオプションが反映されないバグがあったので、それ対策でパスワードをリダイレクト入力に変えた

## タスクスケジューラと同期

```powershell
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

#Archiveへ移動
Move-Item "C:\Users\USERNAME\Documents\TaskScheduler\MyTasks" -Destination "C:\Users\USERNAME\Documents\TaskScheduler\Archive\MyTasks - $(Get-Date -Format "yyyyMMddHHmmss")" -Force -ErrorAction SilentlyContinue

$sch = New-Object -ComObject("Schedule.Service")
$sch.Connect("localhost")

$root = "C:\Users\USERNAME\Documents\TaskScheduler"
$folders = @($sch.GetFolder("\MyTasks"))

for ($i = 0; $i -lt $folders.Length; $i++){
    #taskschedulerのフォルダをExplorerでも作成
    [System.IO.Directory]::CreateDirectory("$root$($folders[$i].Path)")

    #taskschedulerのフォルダを再帰的にフォルダを追加
    $folders[$i].GetFolders(0) | %{
        $folders += $_
    }
    $folders[$i].GetTasks(0) | %{
        #$Xml = $_.Xml
        $Xml = $_.Definition.XmlText
        $out_path = "$root$($folders[$i].Path)\$($_.Name).xml"
        $Xml | Out-File $out_path
    }
}

#memo: GetFolders(0) "このパラメーターは将来使用するために予約されており、0 に設定する必要があります。"
exit
```

## エクスプローラーと同期

```powershell
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

#delete
$sch = New-Object -ComObject("Schedule.Service")
$sch.Connect("localhost")
$folders = @($sch.GetFolder("\MyTasks"))

for ($i = 0; $i -lt $folders.Length; $i++){
    #再帰的にフォルダを追加
    $folders[$i].GetFolders(0) | %{
        $folders += $_
    }
    #各フォルダのタスクを削除
    $folders[$i].GetTasks(0) | %{
        $folders[$i].DeleteTask($_.Name,$null)
    }
}

for ($i = $folders.length-1; $i -ge 0; $i--){
    #各フォルダを削除
    $folders[$i].GetFolders(0) | % {
        $folders[$i].DeleteFolder($(Split-Path $_.Path -Leaf),$null)
    }
}

#create
$base_dir = "C:\Users\USERNAME\Documents\TaskScheduler\MyTasks\"
$rel_paths = Get-ChildItem $base_dir -Recurse -Filter *.xml -Name

foreach ($rel_path in $rel_paths){
    $task_name = "MyTasks\$($rel_path.Replace('.xml',''))"
    Get-Content "C:\Users\USERNAME\Documents\TaskScheduler\タスク操作\PW.txt" | schtasks /create /XML $base_dir$rel_path /TN $task_name /S localhost /RU "USERNAME" /RP
}

#memo: GetFolders(0) "このパラメーターは将来使用するために予約されており、0 に設定する必要があります。"
exit
```
