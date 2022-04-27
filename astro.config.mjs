// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Comment out "renderers: []" to enable Astro's default component support.
  site: "https://simonwiles.su.domains/",
  base: "/trials/",
  trailingSlash: "always",
  integrations: [],
  vite: {
    ssr: { external: ["neat-csv"] },
    optimizeDeps: { exclude: ["neat-csv"] },
  },
});
