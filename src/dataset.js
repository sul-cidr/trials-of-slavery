import neatCsv from "neat-csv";

const sheetUrl =
  "https://docs.google.com/spreadsheets/d/1CPoMh-fUaKcKFmzMUxQWNsFpriO-WIRG/export?format=csv#gid=998295052";

const response = await fetch(sheetUrl);
const records = await neatCsv(await response.text(), {
  mapValues: ({ header, index, value }) => (value === "--" ? null : value),
});

export { records };
