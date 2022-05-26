import { visit } from "unist-util-visit";
import { glossary } from "./glossary-md-parser.mjs";

const glossNodes = (term, gloss) => {
  return [
    {
      type: "element",
      tagName: "span",
      properties: { className: "glossary" },
      children: [
        {
          type: "text",
          value: term,
          marked: true,
        },
      ],
    },
    {
      type: "element",
      tagName: "span",
      properties: { className: "gloss", role: "tooltip" },
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: "header" },
          children: [
            {
              type: "text",
              value: term,
              marked: true,
            },
          ],
        },
        {
          type: "text",
          value: gloss,
          marked: true,
        },
      ],
    },
  ];
};

const RehypeTrialsGlossary = (options) => {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (parent.type == "element" && parent.tagName == "em" && !node.marked) {
        Object.entries(glossary).forEach(([terms, gloss]) => {
          terms.split(",").forEach((term) => {
            if (node.value === term) {
              parent.children = glossNodes(node.value, gloss);
            }
          });
        });
      }
    });
  };
};

export default RehypeTrialsGlossary;
