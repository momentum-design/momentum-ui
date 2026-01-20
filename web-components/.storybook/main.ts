import type { StorybookConfig } from "@storybook/web-components-vite";
import path from "path";
import { fileURLToPath } from "url";
import dynamicImport from "vite-plugin-dynamic-import";
import litCss from "vite-plugin-lit-css";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pSrc = path.resolve(__dirname, "../src");
const pCss = path.resolve(__dirname, "../src/assets/styles");
const pImg = path.resolve(__dirname, "../src/assets/images");

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.ts",
    "../src/components/**/*.mdx",
    "../src/internal-components/color-table/ColorTable.stories.ts"
  ],

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
    { from: "../node_modules/@momentum-design/brand-visuals/dist/svg", to: "/assets/icons/svg" },
    { from: "../node_modules/@momentum-design/brand-visuals/dist", to: "/images/brand-visuals" },
    { from: "../src/assets/styles", to: "/css" }
  ],

  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": pSrc,
      "@css": pCss,
      "@img": pImg,
      timers: "timers-browserify"
    };

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
    config.plugins.push(dynamicImport());
    config.plugins.push(litCss({ include: /\.scss$/ }));
    return config;
  }
};

export default config;
