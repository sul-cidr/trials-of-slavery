<script>
  export let result;
  const baseUrl = import.meta.env.BASE_URL;
  let url;
  if (/^\/\d{2}/.test(result.url)) {
    // construct a URL for a trials page
    url = `${baseUrl}trials${result.url.slice(0, 3)}/`;
    if (result.meta.citation) url += `#${result.meta.citation}`;
  } else {
    // non-trials pages (lowercase and strip file extension)
    url = `${baseUrl}${result.url.slice(1).toLowerCase().split(".")[0]}/`;
  }
</script>

<a href={url}>
  <section>
    <header>
      {result.meta.title}
      {#if result.meta.citation}
        <p>{result.meta.citation}</p>
      {/if}
    </header>
    <div>{@html result.excerpt}</div>
  </section>
</a>

<style>
  a {
    text-decoration: none;
    display: block;
  }

  section {
    border-radius: 8px;
    padding: 0.5em;
    transition: background-color 0.2s ease;
  }

  section:hover {
    background-color: var(--palette-0);

    & :global(mark) {
      background-color: var(--palette-1);
    }
  }

  header {
    border-bottom: 4px double var(--palette-4);
  }

  div {
    padding: 0.5em 1em;

    &::before,
    &::after {
      content: "…";
    }

    :global(mark) {
      background-color: var(--palette-0);
      color: inherit;
      transition: background-color 0.2s ease;
    }
  }
</style>
