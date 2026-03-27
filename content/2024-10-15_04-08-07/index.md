---
title: electron+react の技術選定がとても難しかった
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-15 04:08:07
updatedAt: 2024-10-15 04:08:07
noteLink: https://note.com/optim/n/n8e28f0a9d72e
---

## 目的

作業用の拡張動画プレイヤーを作る

## 技術選定

### video player: mpv vs electron

**mpv**: 圧倒的パフォーマンス。luaで拡張
**electron**: jsで作れてUIが作りやすい。圧倒的なエコシステムnpmを使えるので楽すぎる

\=> **electronを採用**

### web: ejs vs pug vs other template vs other

**ejs**: htmlをそのままに拡張した感じ。すぐに慣れそう
**pug**:  jsonに対するyamlみたいな感じ。キータイプ数が減ってよさそう
**other**: [ejs, pugやめてtsxでhtml書かね？](https://qiita.com/ment_RE/items/f9464b78e925e1db1d9b) という記事がとても興味深かった
**react**: typescriptでhtmlを書ける。auto completeなども効く

\=> **reactを採用**

### react: with framework vs without framework

公式はframeworkを推奨している

> React をフレームワークなしで使うことも確かに可能です。[既存のページに React を追加する](https://ja.react.dev/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page)場合はそのようにします。**しかし、新しいアプリやサイトをフルで React を使って構築する場合は、フレームワークを使用することをお勧めします。**

[react公式サイトのチュートリアル](https://ja.react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework)

redditでは、frameworkを非推奨

next.jsとelectronの組み合わせについてぼろくそに書かれているreddit

> なぜnextが必要なのか？Reactを使うだけ

[Should I use Next.js for my electron application? : r/reactjs](https://www.reddit.com/r/reactjs/comments/1dyl78q/should_i_use_nextjs_for_my_electron_application/)

> ここに Electron を使用した公式の例がありますが、現時点では理想的な出発点ではありません。また、Electron では Next.js を使用する必要はなく、React を使用するだけで済みます。

[Should I use Next.js for my electron application? : r/reactjs](https://www.reddit.com/r/reactjs/comments/1dyl78q/should_i_use_nextjs_for_my_electron_application/)

> 動作するために nextjs を必要とせず、単純な react で十分機能します。

[Should I use Next.js for my electron application? : r/reactjs](https://www.reddit.com/r/reactjs/comments/1dyl78q/should_i_use_nextjs_for_my_electron_application/)

> nextの要点は、強力な SSR、SSG、およびクライアントでのレンダリングを最初から回避するその他の方法です。ただし、デスクトップ アプリでは必要ありません。

[Should I use Next.js for my electron application? : r/reactjs](https://www.reddit.com/r/reactjs/comments/1dyl78q/should_i_use_nextjs_for_my_electron_application/)

> next は必要ありません。 react で十分です。 next を捨てて react で十分

[Should I use Next.js for my electron application? : r/reactjs](https://www.reddit.com/r/reactjs/comments/1dyl78q/should_i_use_nextjs_for_my_electron_application/)

> 魅力的ではありませんでした。

[How often do you use Electron? : r/nextjs](https://www.reddit.com/r/nextjs/comments/15xpaeo/how_often_do_you_use_electron/)

> Electron を使用した純粋なフロントエンド フレームワークを使用する方が良いでしょう。

[How often do you use Electron? : r/nextjs](https://www.reddit.com/r/nextjs/comments/15xpaeo/how_often_do_you_use_electron/)

> Electron の動作方法を考えると、Next は最適な選択肢ではありません。

[How often do you use Electron? : r/nextjs](https://www.reddit.com/r/nextjs/comments/15xpaeo/how_often_do_you_use_electron/)

> Next ではなく React を使用してください。

[How often do you use Electron? : r/nextjs](https://www.reddit.com/r/nextjs/comments/15xpaeo/how_often_do_you_use_electron/)

redditでこんなに意見がそろうってことは、そうとう組み合わせが悪いんだろうね
react公式はframeworkすすめてたけどelectronと組み合わせる場合は例外なのかもしれない

\=> framework使わないことに決定

### electron: boilerplateの検討

**electron-forge
electron-builder
electron-react-boilerplate
electron-react-ts
electron-typescript**
などなどいろいろ使ってみたんだけど
どれもよくわからなかった

\=> テンプレートは使わない

### ts + react + electron に必要だった知識

electronはjsランタイムで動く
reactはフレームワークではなく文法みたいなイメージ
tsx fileをコンパイルするとhtml,css,jsのセットが出力される
依存関係のない独立したウェブソースである
コンパイルは、バンドラーを使う必要がある

### bundler: webpack vs vite vs other

**webpack**: 古くからある一番人気だが、開発終了してturbopackに移行中
**turbopack**: まだ発展途上らしい
**vite**: 設定が少なくて済むし、tsの標準対応あるし、速いらしい
**other**: 上記以外にもあるけど興味がわかず
\=> 速さに勝る要素などないのでviteを採用

### typescript: tsc vs vite

typescriptのコンパイルにtscを使うか否か

**tsc**を使う場合は、**tsx => jsx => js** の二段階のコンパイル
**vite**のみの場合は、**tsx => js** の1回で済む

> Vite は [**esbuild**](https://github.com/evanw/esbuild) を用いて TypeScript を JavaScript に変換します。これは、vanilla の tsc よりも約 20〜30 倍速く、HMR の更新は 50 ミリ秒未満でブラウザーに反映されます

[vite公式](https://ja.vite.dev/guide/features.html)

\=>シンプルでかつ速いのでviteのみでコンパイル

### 途中経過 ここまで決まった

**ts + react + electron + vite**

### project-structure: 

こういうのは人気のあるツールに合わせるのが王道の決め方だが

### electron + react の project structure

ツールによってバラバラばらばらだったので調査結果を下記にまとめる

electron公式パターン

```text
├ src
|  ├ electron-main.ts
|  ├ App.tsx
|  └ index.tsx
└ index.html
```

electron-viteなどのボイラープレートパターン

```text
├ electron
|  └ main.ts
├ react
|  ├ App.tsx
|  └ index.tsx
└ index.html
```

その他のボイラープレートパターン

```text
├ src
| ├ electron
| | └ main.ts
| └ react
|   ├ App.tsx
|   └ index.tsx
└ index.html
```

src-rootパターン

```text
└ src
  ├ electron-main.ts
  ├ App.tsx
  ├ index.tsx
  └ index.html
```

**electron**: バックエンド
**react**: フロントエンド
みたいに役割が分かれていて、かつバンドルもそれぞれ行う必要がるので
モノレポのような構造が正解だと思う
上記のはどれも気に入らないので独自のを採用

こいつを採用

```text
└ src
  ├ electron
  | └ main.ts
  └ react
    ├ App.tsx
    ├ index.html
    └ index.tsx
```

### bundling: モノレポバンドリング

index.htmlはviteでバンドルするが
electron/main.tsもjsにコンパイルする必要がある
どうやってコンパイルするか

**vite multiple entry point**: **vite.config.ts**の**bulid.rollupOptions.input**でindex.htmlとelectro-main.jsを取り込めるがoutput先を別フォルダにするのが難しい
**vite multiple config**: **vite.config.ts** と **vite.electron.config.ts** と2つ用意して二回viteを実行するというもの。ファイルを増やしたくない
**vite multiple mode**: 1つのconfigファイルでモードを定義して、モードごとにviteを実行する

\=> **vite multiple modeを採用**

### モノレポのtsconfigの置き場所

**rootに置く**: tsconfig.electron.json + tsconfig.react.json
**subに置く**: src/electron/tsconfig.electron.json + src/react/tsconfig.react.json

[これ](https://stackoverflow.com/questions/37579969/how-to-use-multiple-tsconfig-files-in-vs-code)によるとsubに置く方が新しくてイケてるやり方っぽい

\=> **subに置く**

```text
├ dist
| ├ electron
| | ├ main.js
| ├ react
| | ├ index.js
| | ├ index.css
| | └ index.html
├ src
| ├ electron
| | ├ main.ts
| | └ tsconfig.electron.json
| ├ react
| | ├ App.tsx
| | ├ index.tsx
| | ├ index.html
| | └ tsconfig.react.json
└ tsconfig.json(references:{electron,react})
```

## 最終的に決まったこと

```text
├ dist
| ├ electron
| | └ main.js
| └ renderer
|   ├ assets
|   | └ index.js
|   └ index.html
├ src
| ├ electron
| | ├ main.ts
| | └ tsconfig.electron.json
| └ react
|   ├ App.tsx
|   ├ index.tsx
|   ├ index.html
|   └ tsconfig.react.json
├ eslint.config.mjs
├ package.json
├ tsconfig.json
└ vite.config.ts
```

electron, react, vite が初めてであり
モノレポのような構成も初めてだったので
難しかった
