import fs from "fs";
import path from "path";
import glob from "glob";

import { documentMdToHtml } from "../lib/markdown-parsing.mjs";
import siteConfig from "../site-config.json" assert { type: "json" };

const { documentsBasePath, idxDir } = siteConfig;

const filePaths = glob.sync(`${documentsBasePath}/**/*.md`);

fs.mkdirSync(idxDir, { recursive: true });

for (let filePath of filePaths) {
  const filename = path.parse(filePath).name;
  const title = /^\d+\s/.test(filename)
    ? path.basename(path.dirname(filePath)).slice(3)
    : filename;
  const html = await documentMdToHtml(filePath);
  fs.writeFileSync(
    `${idxDir}/${filename}.html`,
    `<html><h1>${title}</h1>${html}</html`,
  );
}
