// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Comment out "renderers: []" to enable Astro's default component support.
  site: "https://sul-cidr.github.io/",
  base: "/trials-of-slavery/",
  trailingSlash: "always",
  integrations: [],
  vite: {
    ssr: {
      external: [
        "neat-csv",
        "unified",
        "remark-parse",
        "remark-gfm",
        "remark-supersub",
        "remark-rehype",
        "rehype-stringify",
        "mdast-util-to-hast",
      ],
    },
    optimizeDeps: { exclude: ["neat-csv"] },
  },
});
