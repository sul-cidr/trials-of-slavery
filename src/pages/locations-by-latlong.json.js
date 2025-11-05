import { records } from "@dataset";

const locations = records.map((record) => record["trial_locations"]).flat();

// create an object where keys are lat,long pairs and values are arrays of locations
const locationsByLatlong = locations
  .filter((location) => !(!location.Latitude || !location.Longitude))
  .reduce(
    (result, location) => ({
      ...result,
      [`${location.Latitude},${location.Longitude}`]: [
        ...(result[`${location.Latitude},${location.Longitude}`] || []),
        (() => {
          // iife to pick only needed properties
          const { "Case ID": caseId, Location: name, ...rest } = location;
          return { caseId, name };
        })(),
      ],
    }),
    {},
  );

export async function get() {
  return {
    body: JSON.stringify(locationsByLatlong),
  };
}
