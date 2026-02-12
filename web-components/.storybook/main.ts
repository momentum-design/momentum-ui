import type { StorybookConfig } from "@storybook/web-components-vite";
import path from "path";
import { fileURLToPath } from "url";
import litCss from "vite-plugin-lit-css";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pSrc = path.resolve(__dirname, "../src");
const pCss = path.resolve(__dirname, "../src/assets/styles");
const pImg = path.resolve(__dirname, "../src/assets/images");

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.ts", "../src/internal-components/color-table/ColorTable.stories.ts"],

  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "storybook-addon-rtl"],

  framework: "@storybook/web-components-vite",

  staticDirs: [
    { from: "../node_modules/@momentum-ui/core/css", to: "/css" },
    { from: "../node_modules/@momentum-ui/core/fonts", to: "/css/fonts" },
    { from: "../node_modules/@momentum-ui/core/fonts", to: "/fonts" },
    { from: "../node_modules/@momentum-ui/core/images", to: "/images" },
    { from: "../node_modules/@momentum-ui/icons/css", to: "/css" },
    { from: "../node_modules/@momentum-ui/icons/fonts", to: "/css/fonts" },
    { from: "../node_modules/@momentum-ui/icons/fonts", to: "/fonts" },
    { from: "../node_modules/@momentum-ui/icons/fonts", to: "/icons/fonts" },
    { from: "../node_modules/@momentum-design/brand-visuals/dist/svg", to: "/icons/svg" },
    { from: "./assets/backgrounds", to: "/images/backgrounds" },
    { from: "../node_modules/@momentum-design/icons/dist/svg", to: "/icons/svg" },
    { from: "../src/assets/styles", to: "/css" }
  ],

  viteFinal: async (config) => {
    // Set base URL for GitHub Pages deployment (when STORYBOOK_BASE env var is set)
    if (process.env.STORYBOOK_BASE) {
      config.base = process.env.STORYBOOK_BASE;
    }

    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": pSrc,
      "@css": pCss,
      "@img": pImg,
      timers: "timers-browserify"
    };

    // Force dedupe for lit packages
    config.resolve.dedupe = ["lit", "lit-html", "lit-element", "@lit/reactive-element"];

    // Prevent duplicate module instances from symlinks
    config.resolve.preserveSymlinks = true;

    // Pre-bundle Lit packages together to avoid duplicates
    config.optimizeDeps = config.optimizeDeps ?? {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include ?? []),
      "lit",
      "lit/decorators.js",
      "lit/directives/class-map.js",
      "lit/directives/if-defined.js",
      "lit/directives/repeat.js",
      "lit/directives/style-map.js",
      "lit/directive.js",
      "lit/directive-helpers.js",
      "lit-html",
      "lit-element",
      "@lit/reactive-element"
    ];

    // Configure SCSS preprocessor with proper import paths
    config.css = config.css ?? {};
    config.css.preprocessorOptions = config.css.preprocessorOptions ?? {};
    config.css.preprocessorOptions.scss = {
      api: "modern-compiler",
      loadPaths: [path.resolve(__dirname, "../src"), path.resolve(__dirname, "../node_modules")],
      silenceDeprecations: ["import", "global-builtin"],
      // Handle ~ and @/ prefixes for imports
      importers: [
        {
          findFileUrl(url: string) {
            if (url.startsWith("~")) {
              return new URL(`file://${path.resolve(__dirname, "../node_modules", url.slice(1))}`);
            }
            if (url.startsWith("@/")) {
              return new URL(`file://${path.resolve(pSrc, url.slice(2))}`);
            }
            return null;
          }
        }
      ]
    };

    config.plugins = config.plugins ?? [];
    config.plugins.push(litCss({ include: /\.scss$/ }));
    return config;
  }
};

export default config;
