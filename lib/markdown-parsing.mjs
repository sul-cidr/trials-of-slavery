import fs from "node:fs";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import supersub from "remark-supersub";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { toHast } from "mdast-util-to-hast";

import rehypeTrialsFootnotes from "./rehype-trials-footnotes.mjs";
import rehypeTrialsGlossary from "./rehype-trials-glossary.mjs";

const markNodesRecursive = (node) => {
  if (Array.isArray(node)) node.forEach(markNodesRecursive);
  else if (node && typeof node === "object") {
    node.marked = true;
    markNodesRecursive(node.children);
  }
};

const getMarkdownAsHast = (markdown, markNodes = true) => {
  const mdast = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(supersub)
    .use(remarkRehype)
    .parse(markdown);

  const hast = toHast(mdast.children[0]);
  const nodes = hast.children;

  if (markNodes) markNodesRecursive(nodes);
  return nodes;
};

const documentMdToHtml = async (markdownFile, idPrefix) => {
  const allFileContents = fs.readFileSync(markdownFile, "utf-8");

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(supersub)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeTrialsGlossary)
    .use(rehypeTrialsFootnotes, { idPrefix })
    .process(allFileContents);

  return String(file);
};

export { getMarkdownAsHast, documentMdToHtml };
