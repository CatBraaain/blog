import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import dayjs from "dayjs";

const folderPath = "content";
const filePath = path.join(folderPath, `${dayjs().format("YYYY-MM-DD_HH-mm-ss")}.md`);

mkdirSync(folderPath, { recursive: true });

const dtString = dayjs().format("YYYY-MM-DD HH:mm:ss");
const template = `
---
title:
category:
tags: []
createdAt: ${dtString}
updatedAt: ${dtString}
isDraft: false
---
`.trimStart();

writeFileSync(filePath, template);
