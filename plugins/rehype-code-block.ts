import fs from "node:fs";
import { join } from "node:path";
import { getIconData, iconToHTML, iconToSVG, replaceIDs } from "@iconify/utils";
import { icons as vscodeIcons } from "@iconify-json/vscode-icons";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { load } from "js-yaml";
import { bundledLanguages, bundledLanguagesInfo, bundledThemes, createHighlighter } from "shiki";
import type { Processor } from "unified";
import { parseMeta } from "./parse-meta";

const iconNameMap = await getIconNameMap();
const langAliasMap = Object.fromEntries(
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

          const resolvedLangId = langAliasMap[langId] ?? langId;
          const meta = Object.fromEntries(parseMeta(this.options.meta?.__raw ?? ""));
          const iconName: string =
            meta.icon ??
            (iconNameMap.has(resolvedLangId) ? `file-type-${iconNameMap.get(resolvedLangId)}` : "");
          this.root.children = [
            {
              type: "element",
              tagName: "CodeBlock",
              properties: {
                ...meta,
                style: this.pre.properties.style,
                lang: resolvedLangId,
                source: this.source,
                icon: getIconSvg(iconName),
              },
              children: [this.pre],
            },
          ];
        },
      },
    ],
  });
}

function getIconSvg(iconName: string) {
  const iconData = getIconData(vscodeIcons, iconName);
  if (iconData) {
    const renderData = iconToSVG(iconData, { height: "auto" });
    const iconSvg = iconToHTML(replaceIDs(renderData.body), {
      ...renderData.attributes,
      height: "1em",
      width: "1em",
    });
    return iconSvg;
  } else {
    return undefined;
  }
}

async function getIconNameMap() {
  const iconMap = new Map<string, string>();
  for (const { icon, languages } of await getVscodeLangIcons()) {
    const words = [icon, ...languages];
    for (const word of words) {
      if (!iconMap.has(word)) {
        iconMap.set(word, icon);
      }
    }
  }
  for (const { id, ids, knownExtensions } of await getVscodeLangs()) {
    const words = [id, ...ids, ...knownExtensions];
    if (iconMap.has(id)) {
      for (const word of words) {
        iconMap.set(word, iconMap.get(id)!);
      }
    }
  }
  for (const { id, aliases } of bundledLanguagesInfo) {
    const words = [id, ...(aliases ?? [])];
    for (const word of words) {
      if (iconMap.has(word)) {
        for (const word2 of words) {
          if (!iconMap.has(word2)) {
            iconMap.set(word2, iconMap.get(word)!);
          }
        }
        break;
      }
    }
  }
  return iconMap;
}

async function getVscodeLangIcons() {
  const url =
    "https://raw.githubusercontent.com/vscode-icons/vscode-icons/refs/heads/master/src/iconsManifest/supportedExtensions.ts";
  const res = await fetch(url);
  const text = await res.text();
  const trimmed = `{\n${text
    .split("\n")
    .slice(4, -2)
    .join("\n")
    .replaceAll(/\/\/.*$/gm, "")}\n}`;
  const iconManifest = load(trimmed) as {
    supported: {
      icon: string;
      languages?: string[];
      disabled?: boolean;
    }[];
  };
  const icons = iconManifest.supported
    .filter((e) => e.languages && e.disabled !== true)
    .map(({ icon, languages }) => ({
      icon,
      languages: (languages ?? []).map((lang) => lang.replace("languages.", "")),
    }));
  return icons;
}

async function getVscodeLangs() {
  const url =
    "https://raw.githubusercontent.com/vscode-icons/vscode-icons/refs/heads/master/src/iconsManifest/languages.ts";
  const res = await fetch(url);
  const text = await res.text();
  const trimmed = `{\n${text.split("\n").slice(3, -2).join("\n")}\n}`;
  const languageManifests = load(trimmed) as {
    [id: string]: { ids: string | string[]; knownExtensions?: string[] };
  };
  const languages = Object.entries(languageManifests).map(([id, { ids, knownExtensions }]) => ({
    id,
    ids: Array.isArray(ids) ? ids : [ids],
    knownExtensions: knownExtensions ?? [],
  }));
  return languages;
}
