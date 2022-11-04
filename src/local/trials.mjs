import { FilteringDataTable } from "@local/filterable-datatable.js";

const trialsTable = document.getElementById("trials");
trialsTable.style.opacity = "0";
trialsTable.style.display = "table";

const dataTable = new FilteringDataTable("#trials", {
  prevText: document.getElementById("prev").innerHTML,
  nextText: document.getElementById("next").innerHTML,
  labels: { placeholder: "Filter…" },
});

const goToTrial = (event) =>
  (window.location.href = `${event.currentTarget.dataset.rowId}/`);

const addEventsToRows = () => {
  /* Row onClick event handlers are set up in vanilla JS here when
     the table is initialized or filtered.

     The cursor style is also set here since this is a progressive
     enhancement when Javascript is available (otherwise the row's
     not clickable).
  */
  dataTable.pages.forEach((page) => {
    page.forEach((row) => {
      row.style.cursor = "pointer";
      /* named function to ensure that event handlers aren't multiplied */
      row.addEventListener("click", goToTrial);
    });
  });
};

dataTable.on("datatable.init", () => {
  addEventsToRows();
  setTimeout(() => (trialsTable.style.opacity = 1), 100);
});

const pills = document.querySelectorAll(".pill");
pills.forEach((pill) => {
  pill.addEventListener("click", () => {
    if (pill.classList.contains("active")) {
      pill.classList.remove("active");
      dataTable.setFilter((row) => true);
    } else {
      pills.forEach((_pill) => _pill.classList.remove("active"));
      pill.classList.add("active");
      dataTable.setFilter((row) =>
        pill.dataset.records.split(",").includes(row.dataset.rowId),
      );
    }
    dataTable.search();
    addEventsToRows();
  });
});

const QueryString = window.location.search;
const urlParams = new URLSearchParams(QueryString);
if (urlParams.has("tag")) {
  const tag = urlParams.get("tag");
  const pill = document.querySelector(`[data-tag="${tag}"]`);
  dataTable.setFilter((row) => row.dataset.tags.split("|").includes(tag));
  dataTable.search();
  pill?.classList.add("active");
}
