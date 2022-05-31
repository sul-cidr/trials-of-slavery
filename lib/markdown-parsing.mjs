import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import supersub from "remark-supersub";
import remarkRehype from "remark-rehype";
import { toHast } from "mdast-util-to-hast";

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

export { getMarkdownAsHast };
