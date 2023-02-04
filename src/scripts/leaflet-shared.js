import * as L from "leaflet/dist/leaflet-src.esm.js";

export const icon = L.divIcon({
  className: "marker",
  html: document.querySelector("svg.marker").outerHTML,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -45],
});

const tileLayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
    maxZoom: 16,
  },
);

const resetButtonControl = L.Control.extend({
  options: { position: "topleft" },
  onAdd: function (map) {
    const resetButton = L.DomUtil.create("button");
    resetButton.title = "Reset Map";
    resetButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="5 12 3 12 12 3 21 12 19 12" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
      </svg>
    `;
    return resetButton;
  },
});

export const initMap = (mapId, setInitialView) => {
  const map = L.map(mapId, { minZoom: 5, maxZoom: 12 });
  let resetButton;

  tileLayer.addTo(map);

  setInitialView(map);

  const rb = new resetButtonControl();

  map.addControl(rb);

  resetButton = rb._container;
  resetButton.classList.add("reset-map", "hidden");
  resetButton.addEventListener("click", () => {
    setInitialView(map);
    setTimeout(() => resetButton?.classList.add("hidden"), 400);
  });

  map.on("moveend", () => resetButton.classList.remove("hidden"));

  return map;
};
