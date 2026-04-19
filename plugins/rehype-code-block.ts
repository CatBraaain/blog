import fs from "node:fs";
import { join } from "node:path";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { bundledLanguages, bundledLanguagesInfo, bundledThemes, createHighlighter } from "shiki";
import type { Processor } from "unified";
import { parseMeta } from "./parse-meta";

const languageAliasMap = Object.fromEntries(
  bundledLanguagesInfo.flatMap(({ id, aliases }) => (aliases ?? []).map((alias) => [alias, id])),
);
const highlighter = await createHighlighter({
  themes: Object.keys(bundledThemes),
  langs: [
    ...Object.keys(bundledLanguages),
    ...["./shiki/shellsession.tm.json", "./shiki/ahk.tm.json", "./shiki/ahk2.tm.json"].map(
      (grammer) => JSON.parse(fs.readFileSync(join(import.meta.dirname, grammer), "utf8")),
    ),
  ],
});

export function rehypeCodeBlock(this: Processor) {
  return rehypeShikiFromHighlighter.call(this, highlighter, {
    theme: "github-dark-default",
    transformers: [
      {
        name: "custom-html-postprocessor",
        root(node) {
          delete this.pre.properties.tabindex;

          const langId = this.options.lang;
          const resolvedLangId = languageAliasMap[langId] ?? langId;
          const meta = this.options.meta?.__raw ?? "";
          this.root.children = [
            {
              type: "element",
              tagName: "CodeBlock",
              properties: {
                lang: resolvedLangId,
                style: this.pre.properties.style,
                ...Object.fromEntries(parseMeta(meta)),
              },
              children: [this.pre],
            },
          ];
        },
      },
    ],
  });
}
