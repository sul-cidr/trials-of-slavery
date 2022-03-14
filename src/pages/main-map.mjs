import * as L from "leaflet/dist/leaflet-src.esm.js";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";

// Work-around for a long-standing and well-known bundling bug in Leaflet
//  (see https://github.com/Leaflet/Leaflet/issues/4968)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, shadowUrl, iconRetinaUrl });

const response = await fetch(`${document.baseURI}locations-by-latlong.json`);
const locationsByLatlong = await response.json();

// eyeballed to fit South Africa in the screen
const map = L.map("map").setView([-28, 24.5], 6);

L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",
  // "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
  // "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
  // "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
  // "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

Object.entries(locationsByLatlong).forEach(([latlong, locations]) => {
  const locationsByName = locations.reduce(
    (result, location) => ({
      ...result,
      [location.Location]: [...(result[location.Location] || []), location],
    }),
    {},
  );

  L.marker(latlong.split(","))
    .addTo(map)
    .bindPopup(
      Object.entries(locationsByName)
        .map(
          ([name, locations]) =>
            `<p>${name} - ${locations
              .map(
                (l) =>
                  `<a href="${document.baseURI}trials/${l["Case ID"]}">#${l["Case ID"]}</a>`,
              )
              .join(", ")}</p>`,
        )
        .join(""),
    );
});
