export function parseMeta(meta: string) {
  const attributePattern = /(?<=[\s]|^)(?:[^\s"']+|"[^"]*"|'[^']*')+(?=[\s]|$)/g;
  const attributeTokens = [...meta.matchAll(attributePattern)].map((m) => m[0]);

  const attributes = attributeTokens.map((m) => {
    const index = m.indexOf("=");
    const [key, quotedableValue] = (() => {
      if (index === -1) {
        return [m, "true"];
      } else {
        return [m.slice(0, index), m.slice(index + 1)];
      }
    })();
    const isQuoted =
      (quotedableValue.startsWith('"') && quotedableValue.endsWith('"')) ||
      (quotedableValue.startsWith("'") && quotedableValue.endsWith("'"));
    const value = isQuoted ? quotedableValue.slice(1, -1) : quotedableValue;
    return [key, value === "true" ? true : value];
  });
  return attributes;
}
