import { FilteringDataTable } from "../lib/filterable-datatable.js";

const trialsTable = document.getElementById("trials");
trialsTable.style.opacity = "0";
trialsTable.style.display = "table";

const dataTable = new FilteringDataTable("#trials", {
  prevText: "⮜",
  nextText: "⮞",
});

dataTable.setFilter((row) => {
  console.log(row);
  return row.ID > 4;
});

dataTable.on("datatable.init", () => {
  /* Row onClick event handlers are set up in vanilla JS here when
     the table is initialized and when the page changed.

     The cursor style is also set here since this is a progressive
     enhancement when Javascript is available (otherwise the row's
     not clickable).
  */
  dataTable.pages.forEach((page) => {
    page.forEach((row) => {
      row.style.cursor = "pointer";
      row.addEventListener(
        "click",
        () => (window.location.href = `${row.dataset.rowId}/`),
      );
    });
  });
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
  });
});
