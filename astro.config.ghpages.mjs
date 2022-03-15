import config from "./astro.config.mjs";

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  ...config,
  buildOptions: {
    site: "https://simonwiles.github.io/trials-of-slavery/",
  },
});
