import * as L from "leaflet/dist/leaflet-src.esm.js";

const locationData =
  document.querySelector("[data-locations]")?.dataset.locations;

if (locationData) {
  const locations = JSON.parse(locationData);

  const map = L.map("map").fitBounds(
    [
      locations.map((location) => [
        location["Latitude"],
        location["Longitude"],
      ]),
    ],
    { maxZoom: 8 },
  );

  L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",
    {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  locations.forEach((location) => {
    L.marker([location["Latitude"], location["Longitude"]]).addTo(map)
      .bindPopup(`<header>${location["Location"]}</header>
            <p>${location["Relation to case"]}</p>`);
  });
}
