// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

import rehypeTrialsGlossary from "./lib/rehype-trials-glossary.mjs";

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Comment out "renderers: []" to enable Astro's default component support.
  site: "https://sul-cidr.github.io/",
  base: "/trials-of-slavery/",
  trailingSlash: "always",
  integrations: [],
  markdown: {
    remarkPlugins: ["remark-gfm", "remark-supersub"],
    rehypePlugins: [rehypeTrialsGlossary],
  },
  vite: {
    ssr: { external: ["neat-csv"] },
    optimizeDeps: { exclude: ["neat-csv"] },
  },
});
