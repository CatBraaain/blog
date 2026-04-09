import { codes, constants, types } from "micromark-util-symbol";
import type { State, Token, TokenizeContext, Code, Effects } from "micromark-util-types";
import type { Processor } from "unified";
import type { Parent, BlockContent, DefinitionContent } from "mdast";

declare module "micromark-util-types" {
  export interface TokenTypeMap {
    [fencedScope]: typeof fencedScope;
  }
}

declare module "mdast" {
  interface RootContentMap {
    [fencedScope]: Fenced;
  }
}

interface Fenced extends Parent {
  type: typeof fencedScope;
  children: Array<BlockContent | DefinitionContent>;
  data?: any;
}

const fencedSequenceMinLength = 3;
const fencedFence = codes.colon;
const fencedScope = "fenced" as const;

export function remarkFenced(this: Processor) {
  const data = this.data();

  const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);

  micromarkExtensions.push(fenced());
  fromMarkdownExtensions.push({
    canContainEols: [fencedScope],
    enter: {
      [fencedScope]: function (token) {
        // @ts-ignore
        this.enter({ type: fencedScope, name: "", attributes: {}, children: [] }, token);
      },
    },
    exit: {
      [fencedScope]: function exit(token) {
        this.exit(token);
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
  let isCounting = true;
  let openSize = 0;
  let previous: Token | undefined = undefined;

  return start;

  function start(code: Code): State {
    effects.enter(fencedScope);
    return openFence(code);
  }

  function openFence(code: Code): State {
    if (isCounting && code === fencedFence) {
      effects.consume(code);
      openSize++;
      return openFence;
    }
    if (isCounting && openSize < fencedSequenceMinLength) {
      return nok(code)!;
    }

    isCounting = false;

    if (isEol(code)) {
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return lineStart!;
    }

    if (isEof(code)) {
      return nok(code)!;
    }

    effects.consume(code);
    return openFence;
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
    return _closeSequence;

    function _closeSequence(code: Code): State {
      if (code === fencedFence) {
        effects.consume(code);
        closeSize++;
        return _closeSequence;
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
