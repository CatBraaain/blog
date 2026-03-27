---
title: "[C#] AssemblyNameと依存パッケージ名が同じで循環サイクルエラーになる解決方法"
category: Tech
tags: ["C#"]
createdAt: 2025-06-25 10:12:29
updatedAt: 2025-06-25 10:12:29
noteLink: https://note.com/optim/n/n52d9ae493d77
---

## 状況

C#プロジェクトで、CLIアプリを作る
その際に、生成したいexeの名前が依存パッケージと重複する

## エラー再現

TaskScheduler.exeというexeを生成したいので、それをAssemblyNameに指定するが、PackageReferenceにもTaskSchedulerというパッケージ名が記載されている

\*AssemblyNameは、省略するとプロジェクト名になるが、分かりやすさのために本例では明示的に指定している

```xml
<!-- MyProject.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <AssemblyName>TaskScheduler</AssemblyName>
    <OutputType>Exe</OutputType>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="TaskScheduler" Version="2.12.1" />
  </ItemGroup>
</Project>
```

この設定でビルドするとエラーになる
`Cycles detected (サイクルが検出されました)`

```console
> dotnet publish
    C:\Projects\MyProject\MyProject.csproj : error NU1108:
      サイクルが検出されました。
        TaskScheduler -> TaskScheduler (>= 2.12.1).

1.2 秒後に 1 件のエラーで失敗しました を復元する
```

## 解決方法

AssemblyNameは、重複しない一意の名前を与えて
MSBuild Taskを利用して、ビルド後に自動でrenameをする

```xml
<!-- MyProject.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <AssemblyName>AnythingUniqueName</AssemblyName>
    <OutputType>Exe</OutputType>
  </PropertyGroup>
  <Target Name="RenameBin" AfterTargets="Publish">
    <Move
      SourceFiles="$(PublishDir)$(AssemblyName).exe"
      DestinationFiles="$(PublishDir)taskscheduler.exe"
    />
  </Target>
  <ItemGroup>
    <PackageReference Include="TaskScheduler" Version="2.12.1" />
  </ItemGroup>
</Project>
```

## 参考

名前重複によるサイクル検出
[https://stackoverflow.com/a/76505582/17199470](https://stackoverflow.com/a/76505582/17199470￼￼exeのrenameの使用例￼https://stackoverflow.com/a/43934475/17199470￼￼MSBuild)
exeのrenameの使用例
[https://stackoverflow.com/a/43934475/17199470](https://stackoverflow.com/a/76505582/17199470￼￼exeのrenameの使用例￼https://stackoverflow.com/a/43934475/17199470￼￼MSBuild)
MSBuild Target要素
[https://learn.microsoft.com/ja-jp/visualstudio/msbuild/target-element-msbuild?view=vs-2022](https://learn.microsoft.com/ja-jp/visualstudio/msbuild/target-element-msbuild?view=vs-2022￼￼MSBuild)
MSBuild Task系 Move要素
[https://learn.microsoft.com/ja-jp/visualstudio/msbuild/move-task?view=vs-2022](https://learn.microsoft.com/ja-jp/visualstudio/msbuild/move-task?view=vs-2022)
