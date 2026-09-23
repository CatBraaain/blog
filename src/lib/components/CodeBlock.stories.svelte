<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import CodeBlock from "./CodeBlock.svelte";

  const { Story } = defineMeta({
    title: "Parts/CodeBlock",
    component: CodeBlock,
    tags: ["autodocs"],
    argTypes: {
      lang: {
        control: { type: "select" },
        options: ["svelte", "ts", "shellsession", "text"],
      },
    },
  });

  // Stand-in for the icon HTML normally injected by ~icons at build time.
  const terminalIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></svg>`;
</script>

<Story
  name="Default"
  args={{
    title: "src/lib/utils.ts",
    lang: "ts",
    icon: terminalIcon,
    source:
      'export const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");',
  }}
>
  <pre><code class="block bg-black p-4 text-sm text-white"
      >export const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");</code
    ></pre>
</Story>

<Story
  name="ShellSession"
  args={{
    title: "install dependencies",
    lang: "shellsession",
    source: "$ bun install\n$ bun run build",
  }}
>
  <pre><code class="block bg-black p-4 text-sm text-white"
      >$ bun install
$ bun run build</code
    ></pre>
</Story>

<Story
  name="PlainText"
  args={{
    lang: "text",
    source: "Plain text does not render the title bar.",
  }}
>
  <pre><code class="block bg-black p-4 text-sm text-white"
      >Plain text does not render the title bar.</code
    ></pre>
</Story>
