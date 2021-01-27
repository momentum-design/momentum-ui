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
  entry: "./src/[sandbox]/test.ts",
  // entry: "./src/[sandbox]/sandbox.ts",
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
    index: "./src/index.ts",
    // "comp/md-accordion": "./src/components/accordion/Accordion",
    // "comp/md-accordion-item": "./src/components/accordion/AccordionItem",
    // "comp/md-activity-button": "./src/components/activity-button/ActivityButton",
    // "comp/md-alert": "./src/components/alert/Alert",
    // "comp/md-alert-banner": "./src/components/alert-banner/AlertBanner",
    // "comp/md-avatar": "./src/components/avatar/Avatar",
    // "comp/md-composite-avatar": "./src/components/avatar/CompositeAvatar",
    // "comp/md-badge": "./src/components/badge/Badge",
    // "comp/md-breadcrumb": "./src/components/breadcrumb/Breadcrumb",
    "comp/md-button": "./src/components/button/Button",
    // "comp/md-card": "./src/components/card/Card",
    // "comp/md-chat-message": "./src/components/chat-message/ChatMessage",
    // "comp/md-checkbox": "./src/components/checkbox/Checkbox",
    // "comp/md-checkboxgroup": "./src/components/checkbox/CheckboxGroup",
    // "comp/md-chip": "./src/components/chip/Chip",
    // "comp/md-coachmark": "./src/components/coachmark/Coachmark",
    // "comp/md-combobox": "./src/components/combobox/ComboBox",
    // "comp/md-date-time-picker": "./src/components/date-time-picker/DateTimePicker",
    // "comp/md-datepicker": "./src/components/datepicker/DatePicker",
    // "comp/md-datepicker-calendar": "./src/components/datepicker/datepicker-calendar/DatePickerCalendar",
    // "comp/md-datepicker-day": "./src/components/datepicker/datepicker-day/DatePickerDay",
    // "comp/md-datepicker-month": "./src/components/datepicker/datepicker-month/DatePickerMonth",
    // "comp/md-datepicker-week": "./src/components/datepicker/datepicker-week/DatePickerWeek",
    // "comp/md-editable-field": "./src/components/editable-textfield/EditableTextfield",
    // "comp/md-floating-modal": "./src/components/floating-modal/FloatingModal",
    // "comp/md-help-text": "./src/components/help-text/HelpText",
    "comp/md-icon": "./src/components/icon/Icon",
    // "comp/md-input": "./src/components/input/Input",
    // "comp/md-label": "./src/components/label/Label",
    // "comp/md-link": "./src/components/link/Link",
    // "comp/md-list": "./src/components/list/List",
    // "comp/md-list-item": "./src/components/list/ListItem",
    "comp/md-loading": "./src/components/loading/Loading",
    // "comp/md-meeting-alert": "./src/components/meeting-alert/MeetingAlert",
    // "comp/md-menu": "./src/components/menu/Menu",
    // "comp/md-menu-item": "./src/components/menu/MenuItem",
    // "comp/md-menu-overlay": "./src/components/menu-overlay/MenuOverlay",
    // "comp/md-modal": "./src/components/modal/Modal",
    // "comp/md-pagination": "./src/components/pagination/Pagination",
    // "comp/md-phone-input": "./src/components/phone-input/PhoneInput",
    // "comp/md-progress-bar": "./src/components/progress-bar/ProgressBar",
    // "comp/md-radio": "./src/components/radio/Radio",
    // "comp/md-radiogroup": "./src/components/radio/RadioGroup",
    // "comp/md-slider": "./src/components/slider/Slider",
    "comp/md-spinner": "./src/components/spinner/Spinner"
    // "comp/md-table": "./src/components/table/Table",
    // "comp/md-tab": "./src/components/tabs/Tab",
    // "comp/md-tab-panel": "./src/components/tabs/TabPanel",
    // "comp/md-tabs": "./src/components/tabs/Tabs",
    // "comp/md-task-item": "./src/components/taskitem/TaskItem",
    // "comp/md-theme": "./src/components/theme/Theme",
    // "comp/md-timepicker": "./src/components/timepicker/TimePicker",
    // "comp/md-toggle-switch": "./src/components/toggle-switch/ToggleSwitch",
    // "comp/md-tooltip": "./src/components/tooltip/Tooltip"
  },
  output: {
    path: pDist,
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "chunks/[id].js",
    libraryTarget: "umd"
  },
  optimization: {
    // runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0
    }
  },
  externals: [nodeExternals({ modulesFromFile: true, importType: "umd" })],
  plugins: [
    new CleanWebpackPlugin(),
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
    }) as any,
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
