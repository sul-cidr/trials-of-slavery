import * as L from "leaflet/dist/leaflet-src.esm.js";

export const icon = L.divIcon({
  className: "marker",
  html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
        <path class="shadow" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
        <path class="pin" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>
    `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -45],
});

const tileLayer = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
