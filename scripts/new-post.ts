import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import dayjs from "dayjs";

const folderName = dayjs().format("YYYY-MM-DD_HH-mm-ss");
const folderPath = path.join("content", folderName);
const filePath = path.join(folderPath, "index.md");

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
