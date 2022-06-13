/**
 * Rehype plugin to add a prefix to update identifiers according to the
 *  passed option.
 *
 * Without this, all parsed markdown documents have footnote ids that
 *  begin `user-content-fn-`, which is causes collisions when there is
 *  more than one such document on a page.
 *
 */

import { visit } from "unist-util-visit";

const RehypeTrialsFootnotes = (options) => {
  const { idPrefix } = options;

  const updateIdentifier = (identifier) =>
    identifier.replace("user-content-", `${idPrefix}-`);

  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      // Footnote Link
      if (node.tagName === "a" && node.properties.dataFootnoteRef) {
        node.properties.href = updateIdentifier(node.properties.href);
        node.properties.id = updateIdentifier(node.properties.id);
      }

      // Footnote Backref Link
      if (node.tagName === "a" && node.properties.dataFootnoteBackref) {
        node.properties.href = updateIdentifier(node.properties.href);
      }

      // Footnote Marker
      if (
        node.tagName === "li" &&
        node.properties.id?.startsWith("user-content-")
      ) {
        node.properties.id = updateIdentifier(node.properties.id);
      }
    });
  };
};

export default RehypeTrialsFootnotes;
