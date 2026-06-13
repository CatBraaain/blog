import { Glob } from "bun";

import { metaPatterns } from "../src/lib/meta-rules.ts";

const glob = new Glob("content/**/*.md");
for await (const file of glob.scan(".")) {
  const text = await Bun.file(file).text();
  const matchedMetaRules = [
    ...new Set(
      metaPatterns.filter((metaPattern) => {
        const langMatch = metaPattern.langPattern ? metaPattern.langPattern.test(text) : false;
        const titleMatch = metaPattern.titlePattern ? metaPattern.titlePattern.test(text) : false;
        const bodyMatch = metaPattern.bodyPattern ? metaPattern.bodyPattern.test(text) : false;
        return langMatch || titleMatch || bodyMatch;
      }),
    ),
  ];
  const tags = matchedMetaRules
    .filter((metaMetaRule) => metaMetaRule.tag)
    .map((metaMetaRule) => metaMetaRule.tag)
    .filter((tagName, _, tagNames) => !(tagName === "windows" && tagNames.includes("autohotkey")))
    .sort();
  const tagsString = `tags: [${tags.map((t) => `"${t}"`).join(", ")}]`;
  const category = `category: ${matchedMetaRules.find((metaRule) => metaRule.category)?.category ?? "Life"}`;

  await Bun.write(file, text.replace(/^tags:.*$/m, tagsString).replace(/^category:.*$/m, category));
}
