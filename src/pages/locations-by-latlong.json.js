import { records } from "../dataset.mjs";

const locations = records.map((record) => record["trial_locations"]).flat();

// create an object where keys are lat,long pairs and values are arrays of locations
const locationsByLatlong = locations.reduce(
  (result, location) => ({
    ...result,
    [`${location.Latitude},${location.Longitude}`]: [
      ...(result[`${location.Latitude},${location.Longitude}`] || []),
      (() => {
        // iife to remove Latitude and Longitude properties
        // (further properties could be removed here too)
        const { Latitude, Longitude, ...rest } = location;
        return { ...rest };
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
