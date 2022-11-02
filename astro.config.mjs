import svelte from "@astrojs/svelte";

export default {
  site: "https://sul-cidr.github.io/",
  base: "/trials-of-slavery/",
  trailingSlash: "always",
  integrations: [svelte()],
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
};
