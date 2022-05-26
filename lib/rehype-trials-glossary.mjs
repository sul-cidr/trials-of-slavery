import { visit } from "unist-util-visit";

const glossary = {
  heemraden:
    "In the Netherlands, and also in Cape Colony until the 19th century, a member of a council to assist a local magistrate in the government of rural districts.",
  baas: "An employer, a boss. Frequently as a form of address.",
};

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
        if (node.value in glossary) {
          parent.children = glossNodes(node.value, glossary[node.value]);
        }
      }
    });
  };
};

export default RehypeTrialsGlossary;
