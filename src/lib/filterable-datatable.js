/**
 * Customized version of DataTable class from Simple-Datatables that allows
 * filtering of rows with a function.
 *
 * See https://github.com/fiduswriter/Simple-DataTables/blob/master/src/datatable.js
 */

import { DataTable } from "simple-datatables";

class FilteringDataTable extends DataTable {
  /**
   * Set the function that will be used to filter rows when searching
   *
   * The filtering function needs to be persisted on the class so that calling
   * search() will also use the filter.
   *
   * @param {function} filter Function that takes a row as the argument and returns a boolean
   */
  setFilter(filter) {
    this.filter = filter;
  }

  /**
   *
   * @param {string} query Search query
   * @param {function} filterFn Function that takes a row as the argument and returns a boolean
   * @returns {void}
   */
  filteredSearch(query = "", filterFn = null) {
    if (!this.hasRows) return false;

    query = query.toLowerCase();

    this.currentPage = 1;
    this.searching = true;
    this.searchData = [];

    if (!query.length && !filterFn) {
      this.searching = false;
      this.update();
      this.emit("datatable.search", query, this.searchData);
      this.wrapper.classList.remove("search-results");
      return false;
    }

    this.clear();

    this.data.forEach((row, idx) => {
      const inArray = this.searchData.includes(row);

      const doesFilterMatch = filterFn ? filterFn(row) : true;

      // https://github.com/Mobius1/Vanilla-DataTables/issues/12
      const doesQueryMatch =
        query.length && doesFilterMatch
          ? query.split(" ").reduce((bool, word) => {
              let includes = false;
              let cell = null;
              let content = null;

              for (let x = 0; x < row.cells.length; x++) {
                cell = row.cells[x];
                content = cell.hasAttribute("data-content")
                  ? cell.getAttribute("data-content")
                  : cell.textContent;

                if (
                  content.toLowerCase().includes(word) &&
                  this.columns(cell.cellIndex).visible()
                ) {
                  includes = true;
                  break;
                }
              }

              return bool && includes;
            }, true)
          : doesFilterMatch;

      if (doesQueryMatch && !inArray) {
        row.searchIndex = idx;
        this.searchData.push(idx);
      } else {
        row.searchIndex = null;
      }
    });

    this.wrapper.classList.add("search-results");

    if (!this.searchData.length) {
      this.wrapper.classList.remove("search-results");

      this.setMessage(this.options.labels.noRows);
    } else {
      this.update();
    }

    this.emit("datatable.search", query, this.searchData);
  }

  /**
   * Perform a search of the data set
   * @param  {string} query
   * @return {void}
   */
  search(query) {
    return this.filteredSearch(query, this.filter);
  }
}

export { FilteringDataTable };
