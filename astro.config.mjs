import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import yaml from "@rollup/plugin-yaml";

export default {
  site: "https://sul-cidr.github.io/",
  base: "/trials-of-slavery/",
  trailingSlash: "always",
  integrations: [svelte(), mdx()],
  vite: {
    plugins: [yaml()],
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
