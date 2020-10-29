/* eslint-disable @typescript-eslint/no-explicit-any */
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import * as fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import RemovePlugin from "remove-files-webpack-plugin";
import * as webpack from "webpack";
import merge from "webpack-merge";
import nodeExternals from "webpack-node-externals";

const pSrc = path.resolve("src");
const pStats = path.resolve("stats");
const pDist = path.resolve("dist");
export const pBuild = path.resolve("build");
const pCss = path.resolve("src/assets/styles");
const pImg = path.resolve("src/assets/images");
const p1 = path.resolve("./node_modules/@momentum-ui");
const p2 = path.resolve("../node_modules/@momentum-ui");
const pMomentum = fs.existsSync(p1) ? p1 : fs.existsSync(p2) ? p2 : null;
if (!pMomentum) {
  throw new Error("Can't find Momentum UI");
}

const common: webpack.Configuration = {
  output: {
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".js", ".scss"],
    alias: {
      "@": pSrc,
      "@css": pCss,
      "@img": pImg
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "images/[name].[hash:8].[ext]",
            esModule: false
          }
        },
        include: pSrc
      }
    ]
  }
};

function ruleTS({ isDev }: { isDev: boolean }) {
  return {
    test: /\.ts$/,
    loader: "ts-loader",
    include: pSrc,
    options: {
      compilerOptions: {
        declarationMap: isDev,
        sourceMap: isDev
      }
    }
  };
}

function ruleCSS({ isDev }: { isDev: boolean }) {
  return {
    test: /\.scss$/,
    use: [
      { loader: "lit-scss-loader", options: { minify: !isDev } },
      { loader: "string-replace-loader", options: { search: /\\/g, replace: "\\\\" } },
      { loader: "extract-loader" },
      { loader: "css-loader", options: { sourceMap: isDev, importLoaders: 2 } },
      { loader: path.resolve("./stats/stats-loader.js") },
      {
        loader: "sass-loader",
        options: {
          sourceMap: isDev,
          sassOptions: {
            outputStyle: "compressed"
          }
        }
      },
      {
        loader: "alias-resolve-loader",
        options: {
          alias: {
            "@css": pCss,
            "@img": pImg
          }
        }
      }
    ],
    include: pSrc
  };
}

// DEV
// ----------

export const commonDev = merge(common, {
  name: "dev",
  mode: "development",
  devtool: "source-map",
  entry: "./src/[sandbox]/sandbox.ts",
  output: {
    path: pBuild
  },
  module: {
    rules: [ruleTS({ isDev: true }), ruleCSS({ isDev: true })]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/[sandbox]/index.html",
      favicon: "./src/[sandbox]/favicon.ico"
    }),
    new CopyWebpackPlugin([
      { from: `${pMomentum}/core/fonts`, to: "fonts" },
      { from: `${pMomentum}/core/images`, to: "images" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css`, to: "css" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css.map`, to: "css" },
      { from: `${pMomentum}/icons/css/momentum-ui-icons.min.css`, to: "css" },
      { from: `${pCss}/*.css`, to: "css", flatten: true },
      { from: `${pStats}/**/*.json`, to: "stats", flatten: true },
      { from: `${pMomentum}/icons/fonts`, to: "icons/fonts" },
      // if you want 'momentum-ui.min.css' to work we must copy to second location
      { from: `${pMomentum}/icons/fonts`, to: "fonts" }
    ])
  ]
});

const dev = merge(commonDev, {
  plugins: [new CleanWebpackPlugin()]
});

// DIST
// ----------

const commonDist = merge(common, {
  entry: {
    index: "./src/index.ts"
  },
  output: {
    path: pDist,
    filename: "[name].js",
    libraryTarget: "umd"
  },
  externals: [nodeExternals({ modulesFromFile: true })],
  plugins: [
    new CopyWebpackPlugin([
      { from: `${pMomentum}/core/fonts`, to: "assets/fonts" },
      { from: `${pMomentum}/core/images`, to: "assets/images" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css`, to: "assets/styles" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css.map`, to: "assets/styles" },
      { from: `${pMomentum}/icons/css/momentum-ui-icons.min.css`, to: "assets/styles" },
      { from: `${pMomentum}/icons/fonts`, to: "assets/icons/fonts" },
      { from: `${pCss}/*.css`, to: "assets/styles", flatten: true },
      { from: `${pSrc}/**/*.json`, to: "css", flatten: true }
      // if you want 'momentum-ui.min.css' to work we must copy to second location
    ]),
    new CleanWebpackPlugin(),
    new RemovePlugin({
      after: {
        log: false,
        include: ["./dist/types/[sandbox]"],
        test: [
          {
            folder: "./dist/types",
            method: p => new RegExp(/\.test\.d\.ts(\.map)*$/).test(p),
            recursive: true
          },
          {
            folder: "./dist/types",
            method: p => new RegExp(/\.stories\.d\.ts(\.map)*$/).test(p),
            recursive: true
          }
        ]
      }
    }) as any
  ]
});

const distDev = merge(commonDist, {
  name: "distDev",
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [ruleTS({ isDev: true }), ruleCSS({ isDev: true })]
  }
});

const distDevWatch = merge(distDev, {
  name: "distDevWatch",
  watch: true
});

const distProd = merge(commonDist, {
  name: "distProd",
  mode: "production",
  module: {
    rules: [ruleTS({ isDev: false }), ruleCSS({ isDev: false })]
  }
});

export default [dev, distDev, distDevWatch, distProd];
