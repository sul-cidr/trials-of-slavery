import fs from "fs";
import path from "path";
import glob from "glob";

import { documentMdToHtml, getFrontmatter } from "../lib/markdown-parsing.mjs";
import siteConfig from "../site-config.json" with { type: "json" };

const { documentsBasePath, idxDir } = siteConfig;

const filePaths = glob.sync(`${documentsBasePath}/**/*.md`);

fs.mkdirSync(idxDir, { recursive: true });

for (let filePath of filePaths) {
  let title;
  let citation;

  const filename = path.parse(filePath).name;
  if (/^\d+\s/.test(filename)) {
    // trials files
    title = path.basename(path.dirname(filePath)).slice(3);
    const frontmatter = getFrontmatter(filePath);
    citation = frontmatter.citation || "summary";
  } else {
    // apparatus (glossary, bibliography...)
    title = filename;
  }

  const htmlContent = await documentMdToHtml(filePath);

  let html = `<html lang="en"><h1>${title}</h1>`;
  if (citation) {
    html += `<span data-pagefind-meta="citation:${citation}"></span>`;
  }
  html += `${htmlContent}</html>`;

  fs.writeFileSync(`${idxDir}/${filename}.html`, html);
}


// yarn node bin/build-index.mjs && npx -y pagefind@0.9.1 --source _idx
