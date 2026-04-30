---
title: "eslint Parsing error: was not found by the project service の修正方法"
category: Tech
tags: ["js/ts"]
createdAt: 2024-10-02 02:56:47
updatedAt: 2024-10-02 02:56:47
noteLink: https://note.com/optim/n/ncbcc99378dcd
---

## 状況

eslint で flat config を使って recommended-type-checked や strict-type-checked を利用したら、srcフォルダの外にある.tsファイルが表題のエラーに引っかかる

[https://typescript-eslint.io/users/configs/#recommended-type-checked](https://typescript-eslint.io/users/configs/#recommended-type-checked)

## 解決方法

ignoreに入れてしまえば、回避はできるが、それだとまったくlintされなくなってしまう
やるべきは、type-check の対象から外すこと
disable-type-checkedを利用すればできる

[https://typescript-eslint.io/users/configs/#disable-type-checked](https://typescript-eslint.io/users/configs/#disable-type-checked)

```js
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*", "!src/**/*"],
    ...tseslint.configs.disableTypeChecked,
  },
);
```

うーん、完璧！

[https://typescript-eslint.io/troubleshooting/typed-linting/#i-get-errors-telling-me--was-not-found-by-the-project-service-consider-either-including-it-in-the-tsconfigjson-or-including-it-in-allowdefaultproject](https://typescript-eslint.io/troubleshooting/typed-linting/#i-get-errors-telling-me--was-not-found-by-the-project-service-consider-either-including-it-in-the-tsconfigjson-or-including-it-in-allowdefaultproject)
