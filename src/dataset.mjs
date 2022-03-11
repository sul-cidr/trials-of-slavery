import neatCsv from "neat-csv";

const sheetUrl =
  "https://docs.google.com/spreadsheets/d/1CPoMh-fUaKcKFmzMUxQWNsFpriO-WIRG/export?format=csv#gid=998295052";

const response = await fetch(sheetUrl);
const records = await neatCsv(await response.text(), {
  mapValues: ({ header, index, value }) => (value === "--" ? null : value),
});

import path from "path";
import { fileURLToPath } from "url";

export { records };

// If called as a node script, print records to stdout.
// See `yarn print-dataset`  (requires node >= v17.5.0)
const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url));
if (nodePath === modulePath) console.log(records);
