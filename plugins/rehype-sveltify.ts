import type { Element, ElementContent, Parents, Root, RootContent, Text } from "hast";
import { stringifyEntities } from "stringify-entities";
import type { Processor } from "unified";
import type { Node } from "unist";

type ValidValue = string | number | boolean | Array<string | number>;

const textEscapeSubset = "<&{}".split("");
const attributeKeyEscapeSubset = "\0\t\n\f\r \"&'/<=>".split("");
const attributeValueEscapeSubset = '\0"&{}'.split("");
const htmlVoidElements = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

export function rehypeSveltify(this: Processor): void {
  this.compiler = (tree: Node) => compileChildren(tree as Parents);
}

function compileChildren(parent: Parents): string {
  return ((parent.children ?? []) as (RootContent | ElementContent | Root)[])
    .map((node) => {
      switch (node.type) {
        case "raw": {
          return node.value;
        }
        case "text": {
          return compileText(node, parent);
        }
        case "element": {
          return compileElement(node, parent);
        }
        case "root": {
          return compileChildren(node);
        }
        default: {
          throw new Error(`Unsupported node type: ${node.type}`);
        }
      }
    })
    .filter(Boolean)
    .join("");
}

function compileText(node: Text, parent: Parents): string {
  const shouldEscape = !(
    parent.type === "element" &&
    (parent.tagName === "script" || parent.tagName === "style")
  );
  return shouldEscape
    ? stringifyEntities(node.value, {
        useNamedReferences: true,
        subset: textEscapeSubset,
      })
    : node.value;
}

function compileElement(node: Element, parent: Parents): string {
  const attributes = Object.entries(node.properties)
    .filter(([key, value]) => value !== null && value !== undefined)
    .map(([key, value]) => serializeAttribute(key, value as ValidValue))
    .filter(Boolean)
    .map((s) => ` ${s}`)
    .join("");

  const isVoidElement = htmlVoidElements.includes(node.tagName);
  if (isVoidElement) return `<${node.tagName}${attributes} />`;

  const openTag = `<${node.tagName}${attributes}>`;
  const content = compileChildren(node);
  const closeTag = `</${node.tagName}>`;

  return openTag + content + closeTag;
}

function serializeAttribute(key: string, value: ValidValue): string {
  if (
    value === null ||
    value === undefined ||
    value === false ||
    (typeof value === "number" && Number.isNaN(value))
  ) {
    return "";
  }

  const _safeKey = stringifyEntities(key, {
    useNamedReferences: true,
    subset: attributeKeyEscapeSubset,
  });
  const safeKey = _safeKey.toLowerCase() === "classname" ? "class" : _safeKey;

  if (value === true) {
    return safeKey;
  }

  const quote = '"';

  const stringValue = Array.isArray(value) ? value.join(" ") : String(value);
  const safeValue = stringifyEntities(stringValue, {
    useNamedReferences: true,
    subset: quote ? attributeValueEscapeSubset : [],
    attribute: true,
  });
  return safeKey + (safeValue ? `=${quote}${safeValue}${quote}` : safeValue);
}
