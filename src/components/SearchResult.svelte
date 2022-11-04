<script>
  export let result;
  const baseUrl = import.meta.env.BASE_URL;
  let url = `${baseUrl}trials${result.url.slice(0, 3)}/`;
  if (result.meta.citation) url += `#${result.meta.citation}`;
</script>

<section>
  <header>
    <a href={url}>{result.meta.title}</a>
    {#if result.meta.citation}
      <p>{result.meta.citation}</p>
    {/if}
  </header>
  <div>{@html result.excerpt}</div>
</section>

<style>
  section {
    margin: 2em 0;
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
    }
  }
</style>
