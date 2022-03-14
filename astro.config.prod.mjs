import config from "./astro.config.mjs";

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  ...config,
  buildOptions: {
    site: "https://localhost:8080/dist/",
  },
});
