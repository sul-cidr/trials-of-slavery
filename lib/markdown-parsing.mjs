import fs from "node:fs";

import { unified } from "unified";
import { toHast } from "mdast-util-to-hast";
import rehypeStringify from "rehype-stringify";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import remarkSupersub from "remark-supersub";

import pkg from "yaml";
const { parse: yaml } = pkg;

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
    .use(remarkSupersub)
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
    .use(remarkSupersub)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeTrialsGlossary)
    .use(rehypeTrialsFootnotes, { idPrefix })
    .process(allFileContents);

  return String(file);
};

const getFrontmatter = (markdownFile) => {
  const allFileContents = fs.readFileSync(markdownFile, "utf-8");

  const file = unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkExtractFrontmatter, { yaml: yaml })
    .processSync(allFileContents);

  return file.data;
};

export { getMarkdownAsHast, documentMdToHtml, getFrontmatter };
