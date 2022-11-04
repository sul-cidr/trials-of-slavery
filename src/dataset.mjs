import fs from "fs";
import path from "path";

import neatCsv from "neat-csv";

import { documentsBasePath } from "@/site-config.json";
import { getFrontmatter } from "@lib/markdown-parsing.mjs";

const sheetIds = {
  trials: "998295052",
  locations: "1922392383",
};

const sheetUrlBase =
  "https://docs.google.com/spreadsheets/d/1CPoMh-fUaKcKFmzMUxQWNsFpriO-WIRG/export?format=csv&gid=";

// Given a caseId, fetch and parse all the files from `documentsBasePath`
//  for that case.  Returns an object of the form:
// {
//   "summary": <path/to/summary/file.md>,
//   "documents": {
//     <doc_no_#1>: {
//       "citation": <citation>,
//       "DU": <path/to/dutch/file.md>,
//       "EN": <path/to/english/translation/file.md>
//     },
//     <doc_no_#2>: {
//       "citation": <citation>,
//       "DU": <path/to/dutch/file.md>,
//       "EN": <path/to/english/translation/file.md>
//     },
//    ...
//   }
// }
const getFiles = (caseId) => {
  const paths = fs.readdirSync(documentsBasePath).filter((f) => {
    const fullPath = path.join(documentsBasePath, f);
    return fs.lstatSync(fullPath).isDirectory() && f.startsWith(caseId);
  });

  if (paths.length !== 1) {
    throw new Error(`No directory found for case ${caseId}`);
  }

  const filePaths = Array.from(
    fs.readdirSync(path.join(documentsBasePath, paths[0])),
  );

  const summaryPath = filePaths.find((filename) => filename.match(/\sSUM.md$/));
  const docPaths = filePaths.filter((filename) => filename !== summaryPath);

  const docFrontmatters = docPaths.map((filename) => ({
    ...getFrontmatter(path.join(documentsBasePath, paths[0], filename)),
    path: filename,
  }));

  // convert list of frontmatter objects to an object grouped by citation
  const documents = docFrontmatters.reduce(
    (hash, obj) => ({
      ...hash,
      [obj.citation]: {
        ...hash[obj.citation],
        [obj.path.match(/[^_]+\s(EN|DU)/)[1]]: path.join(
          documentsBasePath,
          paths[0],
          obj.path,
        ),
      },
    }),
    {},
  );

  return {
    summary: path.join(documentsBasePath, paths[0], summaryPath),
    documents,
  };
};

const fetchSheet = async (sheetId) => {
  const response = await fetch(sheetUrlBase + sheetId);
  return await neatCsv(await response.text(), {
    mapValues: ({ header, index, value }) => (value === "--" ? null : value),
  });
};

const trials = await fetchSheet(sheetIds.trials);
const locations = await fetchSheet(sheetIds.locations);

const records = trials.map((trial) => {
  const trial_locations = locations
    .filter((location) => location["Case ID"] === trial["ID"])
    .map((location) =>
      Object.fromEntries(
        Object.entries(location).map(([key, value]) => [
          key,
          value.trim().replace(/°$/g, ""),
        ]),
      ),
    );
  const files = getFiles(trial["ID"]);
  return {
    ...trial,
    trial_locations,
    files,
  };
});

export { records };

// If called as a node script, print records to stdout.
// See `yarn print-dataset`  (requires node >= v17.5.0)
import { fileURLToPath } from "url";
const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url));
if (nodePath === modulePath) console.log(JSON.stringify(records, null, 2));
