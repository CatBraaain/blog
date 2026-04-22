---
title: Electron + MUI CardMedia で mp4を再生する
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-19 15:36:04
updatedAt: 2024-10-19 15:36:04
noteLink: https://note.com/optim/n/n910e216a8720
---

## ローカルmp4

```ts title="electron-main.ts"
// これをやらないとNot allowed to load local resource:のエラーになる
    webPreferences: {
      webSecurity: false,
    },
```

```jsx
<CardMedia component="video" src="file:///D:/Videos/myvideo.mp4" controls />
```

## Youtube

```jsx
<CardMedia component="iframe" src="https://www.youtube.com/embed/hfzSveFy-Go" />
```
