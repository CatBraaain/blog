import type { BlockContent, DefinitionContent, Parent } from "mdast";
import { codes, constants, types } from "micromark-util-symbol";
import type { Code, Effects, State, Token, TokenizeContext } from "micromark-util-types";
import type { Processor } from "unified";
import { parseMeta } from "./parse-meta";

declare module "micromark-util-types" {
  export interface TokenTypeMap {
    [fencedScope]: typeof fencedScope;
    [fencedMetaScope]: typeof fencedMetaScope;
  }
}

declare module "mdast" {
  interface RootContentMap {
    [fencedScope]: Fenced;
  }
}

interface Fenced extends Parent {
  type: typeof fencedScope;
  meta: string;
  children: Array<BlockContent | DefinitionContent>;
  data?: any;
}

const fencedSequenceMinLength = 3;
const fencedFence = codes.colon;
const fencedScope = "fenced" as const;
const fencedMetaScope = "fencedMeta" as const;

export function remarkFenced(this: Processor) {
  const data = this.data();

  data.micromarkExtensions ||= [];
  data.fromMarkdownExtensions ||= [];

  data.micromarkExtensions.push(fenced());
  data.fromMarkdownExtensions.push({
    canContainEols: [fencedScope],
    enter: {
      [fencedScope]: function (token) {
        this.enter({ type: fencedScope, meta: "", children: [] }, token);
      },
    },
    exit: {
      [fencedScope]: function (token) {
        this.exit(token);
      },
      [fencedMetaScope]: function (token) {
        const node = this.stack[this.stack.length - 1] as Fenced;
        const meta = this.sliceSerialize(token);
        const [[name, _], ...attributes] = parseMeta(meta);

        node.meta = meta;
        node.data ||= {};
        node.data.hName = name;
        node.data.hProperties = Object.fromEntries(attributes);
      },
    },
  });
}

const fenced = () => ({
  flow: {
    [fencedFence]: [
      {
        name: fencedScope,
        tokenize: tokenizeFenced,
      },
    ],
  },
});

function tokenizeFenced(this: TokenizeContext, effects: Effects, ok: State, nok: State): State {
  let openSize = 0;
  let previous: Token | undefined;

  return start;

  function start(code: Code): State {
    effects.enter(fencedScope);
    return openFence(code);
  }

  function openFence(code: Code): State {
    if (code === fencedFence) {
      effects.consume(code);
      openSize++;
      return openFence;
    }
    if (openSize < fencedSequenceMinLength) {
      return nok(code)!;
    }

    effects.enter(fencedMetaScope);
    return fenceMeta(code);
  }

  function fenceMeta(code: Code) {
    if (isEol(code)) {
      effects.exit(fencedMetaScope);
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return lineStart!;
    }

    if (isEof(code)) {
      return nok(code)!;
    }

    effects.consume(code);
    return fenceMeta;
  }

  function lineStart(code: Code) {
    return effects.attempt(
      { tokenize: closeFence },
      (code) => {
        effects.exit(fencedScope);
        return ok(code);
      },
      (code) => {
        chunkStart();
        return content(code);
      },
    )(code);
  }

  function chunkStart() {
    const token = effects.enter(types.chunkDocument, {
      contentType: constants.contentTypeDocument,
      previous,
    });
    if (previous) {
      previous.next = token;
    }
    previous = token;
  }

  function content(code: Code): State {
    if (isEol(code)) {
      effects.consume(code);
      effects.exit(types.chunkDocument);
      return lineStart;
    }

    if (isEof(code)) {
      return nok(code)!;
    }

    effects.consume(code);
    return content;
  }

  function closeFence(effects: Effects, ok: State, nok: State): State {
    let closeSize = 0;
    return _closeFence;

    function _closeFence(code: Code): State {
      if (code === fencedFence) {
        effects.consume(code);
        closeSize++;
        return _closeFence;
      }

      if (closeSize === openSize && (isEol(code) || isEof(code))) {
        return ok(code)!;
      }

      return nok(code)!;
    }
  }

  function isEol(code: Code) {
    return (
      code === codes.carriageReturn ||
      code === codes.lineFeed ||
      code === codes.carriageReturnLineFeed
    );
  }

  function isEof(code: Code) {
    return code === codes.eof;
  }
}
