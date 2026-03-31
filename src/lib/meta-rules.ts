interface MetaRule {
  tag?: string;
  category?: string;
  langPattern?: string;
  titlePatterns?: string[];
  bodyPatterns?: string[];
}

export const metaRules: MetaRule[] = [
  {
    tag: "AutoHotkey",
    category: "Tech",
    langPattern: "ahk",
    titlePatterns: ["autohotkey", "ahk"],
  },
  // {
  //   tag: "bash",
  //   category: "Tech",
  //   titlePatterns: ["(?<!git )bash"],
  // },
  {
    tag: "C#",
    category: "Tech",
    langPattern: "csharp",
    titlePatterns: ["c#"],
  },
  {
    tag: "DB",
    category: "Tech",
    langPattern: "sql",
    titlePatterns: [
      "sql",
      "(postgres|postgresql|postgrest)",
      "mongodb",
      "hasura",
      "supabase",
    ],
  },
  {
    tag: "Docker",
    category: "Tech",
    langPattern: "docker",
    titlePatterns: ["docker", "SearXNG"],
  },
  {
    tag: "Git",
    category: "Tech",
    titlePatterns: ["git(?! bash)", "github.*"],
  },
  {
    tag: "js/ts",
    category: "Tech",
    langPattern: "(ts|js)",
    titlePatterns: [
      "javascript",
      "typescript",
      "js",
      "ts",
      "Chrome拡張機能",
      "nvm",
      "prettier",
      "eslint.*",
      "gulp",
      "vite.*",
      "react",
      "electron",
      "npm",
      "playwright",
    ],
  },
  {
    tag: "justfile",
    category: "Tech",
    langPattern: "(just|justfile)",
    titlePatterns: ["justfile"],
  },
  {
    tag: "PowerShell",
    category: "Tech",
    langPattern: "powershell",
    titlePatterns: ["powershell"],
  },
  {
    tag: "Python",
    category: "Tech",
    langPattern: "python",
    titlePatterns: [
      ".*python.*",
      "selenium",
      "uv",
      "Pycharm",
      "numpy",
      "darknet",
      "google colab",
      "blackformat",
      "CV2",
      "ruff",
      "flake8",
      "mypy",
      "typeshed",
      "pymysql",
    ],
  },
  {
    tag: "Rust",
    category: "Tech",
    langPattern: "rust",
    titlePatterns: ["rust"],
  },
  {
    tag: "VisualBasic",
    category: "Tech",
    langPattern: "(vb|vba|vbs)",
    titlePatterns: ["vba", "vbs"],
  },
  {
    tag: "VSCode",
    category: "Tech",
    titlePatterns: ["vscode", "VS Code", "Roo Code"],
  },
  {
    tag: "Windows",
    category: "Tech",
    titlePatterns: [
      "(?<!nvm-)windows",
      "schtasks",
      "excel",
      "プログラムと機能",
      "HEVCビデオ拡張機能",
      "Program Default Editor",
      "win(10|11)",
      "IME",
      "レジストリ",
    ],
    bodyPatterns: ["WindowsAPI"],
  },
  {
    category: "Tech",
    langPattern: "css",
    titlePatterns: [
      "css",
      ".*API.*",
      "技術選定",
      "json-schema",
      "UUID",
      "フォント",
      "スクレイピング",
      "sudo",
      "Renovate",
      "cuelang",
    ],
  },
  { category: "Life" },
];

export const metaPatterns = metaRules.map((metaRule) => ({
  tag: metaRule.tag,
  category: metaRule.category,
  langPattern: metaRule.langPattern
    ? new RegExp(`^\`\`\`(${metaRule.langPattern})(\\b|\\s)`, "im")
    : null,
  titlePattern: metaRule.titlePatterns?.length
    ? new RegExp(
        `^title: .*(?<![A-Za-z0-9_])(${metaRule.titlePatterns.join("|")})(?![A-Za-z0-9_])`,
        "im",
      )
    : null,
  bodyPattern: metaRule.bodyPatterns?.length
    ? new RegExp(`(${metaRule.bodyPatterns.join("|")})`, "im")
    : null,
}));

export const metaCategories = [
  ...new Set(
    metaRules
      .map((metaRule) => metaRule.category)
      .filter((category) => category !== undefined)
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
  ),
];
export const metaTags = [
  ...new Set(
    metaRules
      .map((metaRule) => metaRule.tag)
      .filter((tag) => tag !== undefined)
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
  ),
];
