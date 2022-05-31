import fs from "node:fs";

const allFileContents = fs.readFileSync(
  "src/documents/TrialsGlossary.md",
  "utf-8",
);

const glossary = {};
let currentKey = [];

allFileContents.split(/\r?\n/).forEach((line) => {
  if (line === "") return;

  if (line.startsWith("-")) {
    currentKey.push(line.replace(/^-\s+/, ""));
  } else {
    glossary[currentKey] = line;
    currentKey = [];
  }
});

export { glossary };
