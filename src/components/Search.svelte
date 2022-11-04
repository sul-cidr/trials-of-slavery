<script>
  import SearchResult from "@components/SearchResult.svelte";
  import { idxDir } from "@/site-config.json";
  import loader from "@img/loading.gif";

  const baseUrl = import.meta.env.BASE_URL;

  let initializing = false;
  let pagefind;

  let searchResults = [];
  let loading = false;
  let searched = false;
  let search_id = 0;
  let searchTerm = "";
  let show = 5;

  const init = async () => {
    if (initializing) return;
    initializing = true;
    if (!pagefind) {
      const { Pagefind } = await import("@local/pagefind/pagefind.js");
      pagefind = new Pagefind({
        baseUrl: "/", // so that urls returned by the api aren't prefixed
        basePath: `${baseUrl}${idxDir}/_pagefind/`,
      });
    }
  };

  const search = async () => {
    const filters = {};
    if (!searchTerm) {
      searched = false;
      return;
    }
    loading = true;
    searched = true;
    while (!pagefind) {
      init();
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    const local_search_id = ++search_id;
    const results = await pagefind.search(searchTerm, { filters });
    if (search_id === local_search_id) {
      if (results.filters && Object.keys(results.filters)?.length) {
        available_filters = results.filters;
      }
      searchResults = results;
      loading = false;
      show = 5;
    }
  };

  const showMore = async () => (show += 5);

  $: search(searchTerm);
</script>

<form>
  <input
    on:focus={init}
    bind:value={searchTerm}
    type="text"
    placeholder="Search"
  />
</form>

{#if initializing && !pagefind}
  <p>
    Preparing search <img src={loader} alt="waiting..." />
  </p>
{:else if searched}
  <div>
    {#if loading}
      <p>
        Searching for {searchTerm} <img src={loader} alt="waiting..." />
      </p>
    {:else}
      <p>
        {#if searchResults.results.length === 0}
          No results for {searchTerm}
        {:else if searchResults.results.length === 1}
          1 results for {searchTerm}
        {:else}
          {searchResults.results.length} results for {searchTerm}
        {/if}
      </p>
      <ol>
        {#each searchResults.results.slice(0, show) as result, i (i)}
          {#await result.data()}
            <li>
              Fetching result <img src={loader} alt="waiting..." />
            </li>
          {:then result}
            <li><SearchResult {result} /></li>
          {:catch error}
            <li>Something went wrong: {error.message}</li>
          {/await}
        {/each}
      </ol>
      {#if searchResults.results.length}
        <p>
          Showing {Math.min(show, searchResults.results.length)} of {searchResults
            .results.length} results
        </p>
      {/if}
      {#if searchResults.results.length > show}
        <button type="button" on:click|preventDefault={showMore}
          >Load more results</button
        >
      {/if}
    {/if}
  </div>
{/if}

<style>
  div {
    margin: 0 var(--size-fluid-2);
  }

  p {
    color: var(--palette-7);
    text-align: right;
    font-size: 1em;
    font-weight: 400;
  }

  img {
    display: inline-block;
    margin-left: 1em;
  }

  ol {
    padding: 0;
    margin-left: 1em;
    margin-top: 1em;
  }

  li {
    padding: 0;
    position: relative;

    &::marker {
      font-size: 22px;
    }

    & + li::before {
      content: " ";
      display: block;
      width: 80%;
      position: relative;
      background: var(--palette-1);
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      margin: 0.5em 0;
    }
  }

  form {
    position: relative;

    &::before {
      background-color: currentColor;
      width: 16px;
      height: 16px;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
      content: "";
      position: absolute;
      display: block;
      opacity: 0.7;
      mask-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.7549 11.255H11.9649L11.6849 10.985C12.6649 9.845 13.2549 8.365 13.2549 6.755C13.2549 3.165 10.3449 0.255005 6.75488 0.255005C3.16488 0.255005 0.254883 3.165 0.254883 6.755C0.254883 10.345 3.16488 13.255 6.75488 13.255C8.36488 13.255 9.84488 12.665 10.9849 11.685L11.2549 11.965V12.755L16.2549 17.745L17.7449 16.255L12.7549 11.255ZM6.75488 11.255C4.26488 11.255 2.25488 9.245 2.25488 6.755C2.25488 4.26501 4.26488 2.255 6.75488 2.255C9.24488 2.255 11.2549 4.26501 11.2549 6.755C11.2549 9.245 9.24488 11.255 6.75488 11.255Z' fill='%23000000'/%3E%3C/svg%3E%0A");
      mask-size: 100%;
      z-index: 9;
      pointer-events: none;
    }
  }

  input {
    height: 50px;
    padding: 0 0 0 42px;
    width: 100%;
  }

  button {
    font-size: 14px;
    font-weight: bold;
    line-height: 2.5;
    margin-top: 35px;
    text-align: center;
    width: 100%;
  }
</style>
