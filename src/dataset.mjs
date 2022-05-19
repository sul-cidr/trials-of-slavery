import neatCsv from "neat-csv";

const sheetIds = {
  trials: "998295052",
  locations: "1922392383",
};

const sheetUrlBase =
  "https://docs.google.com/spreadsheets/d/1CPoMh-fUaKcKFmzMUxQWNsFpriO-WIRG/export?format=csv&gid=";

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
  return {
    ...trial,
    trial_locations,
  };
});

export { records };

// If called as a node script, print records to stdout.
// See `yarn print-dataset`  (requires node >= v17.5.0)
import path from "path";
import { fileURLToPath } from "url";
const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url));
if (nodePath === modulePath) console.log(JSON.stringify(records, null, 2));
