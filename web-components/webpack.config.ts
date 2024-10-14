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
import WebpackLoadChunksPlugin from "./webpack.plugin.LoadChunks";

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
      },
      {
        test: /\.svg$/,
        use: {
          loader: "url-loader",
          options: {
            name: "icons/[name].[hash:8].[ext]",
            limit: Infinity,
            esModule: false
          }
        },
        include: [
          path.resolve("node_modules/@momentum-design/icons/dist/svg"),
          path.resolve("node_modules/@momentum-design/brand-visuals/dist/svg")
        ]
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
      { from: `${pMomentum}/icons/fonts`, to: "icons/fonts" },
      { from: `${pMomentum}/icons/fonts`, to: "fonts" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css`, to: "css" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css.map`, to: "css" },
      { from: `${pMomentum}/icons/css/momentum-ui-icons.min.css`, to: "css" },
      { from: `${pCss}/*.css`, to: "css", flatten: true },
      { from: `${pStats}/**/*.json`, to: "stats", flatten: true }
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
    "index-entry": "./src/index.ts",
    "comp/md-accordion-entry": "./src/components/accordion/Accordion",
    "comp/md-accordion-item-entry": "./src/components/accordion/AccordionItem",
    "comp/md-activity-button-entry": "./src/components/activity-button/ActivityButton",
    "comp/md-advance-list-entry": "./src/components/advance-list/AdvanceList",
    "comp/md-alert-entry": "./src/components/alert/Alert",
    "comp/md-alert-banner-entry": "./src/components/alert-banner/AlertBanner",
    "comp/md-audio-player-entry": "./src/components/audio-player/AudioPlayer",
    "comp/md-avatar-entry": "./src/components/avatar/Avatar",
    "comp/md-composite-avatar-entry": "./src/components/avatar/CompositeAvatar",
    "comp/md-badge-entry": "./src/components/badge/Badge",
    "comp/md-breadcrumb-entry": "./src/components/breadcrumb/Breadcrumb",
    "comp/md-button-entry": "./src/components/button/Button",
    "comp/md-button-group-entry": "./src/components/button-group/ButtonGroup",
    "comp/md-card-entry": "./src/components/card/Card",
    "comp/md-card-ai-entry": "./src/components/card-ai/CardAi",
    "comp/md-chat-message-entry": "./src/components/chat-message/ChatMessage",
    "comp/md-checkbox-entry": "./src/components/checkbox/Checkbox",
    "comp/md-checkboxgroup-entry": "./src/components/checkbox/CheckboxGroup",
    "comp/md-chip-entry": "./src/components/chip/Chip",
    "comp/md-coachmark-entry": "./src/components/coachmark/Coachmark",
    "comp/md-combobox-entry": "./src/components/combobox/ComboBox",
    "comp/md-date-range-picker-entry": "./src/components/date-range-picker/DateRangePicker",
    "comp/md-date-time-picker-entry": "./src/components/date-time-picker/DateTimePicker",
    "comp/md-datepicker-entry": "./src/components/datepicker/DatePicker",
    "comp/md-datepicker-calendar-entry": "./src/components/datepicker/datepicker-calendar/DatePickerCalendar",
    "comp/md-datepicker-day-entry": "./src/components/datepicker/datepicker-day/DatePickerDay",
    "comp/md-datepicker-month-entry": "./src/components/datepicker/datepicker-month/DatePickerMonth",
    "comp/md-datepicker-week-entry": "./src/components/datepicker/datepicker-week/DatePickerWeek",
    "comp/md-dropdown-entry": "./src/components/dropdown/Dropdown",
    "comp/md-draggable-entry": "./src/components/draggable/Draggable",
    "comp/md-draggable-item-entry": "./src/components/draggable/DraggableItem",
    "comp/md-editable-field-entry": "./src/components/editable-textfield/EditableTextfield",
    "comp/md-favorite-entry": "./src/components/favorite/Favorite",
    "comp/md-floating-modal-entry": "./src/components/floating-modal/FloatingModal",
    "comp/md-floating-minimize-entry": "./src/components/floating-modal/FloatingMinimizedModal",
    "comp/md-grabber-entry": "./src/components/grabber/Grabber",
    "comp/md-help-text-entry": "./src/components/help-text/HelpText",
    "comp/md-icon-entry": "./src/components/icon/Icon",
    "comp/md-input-entry": "./src/components/input/Input",
    "comp/md-input-file": "./src/components/input-file/InputFile",
    "comp/md-label-entry": "./src/components/label/Label",
    "comp/md-link-entry": "./src/components/link/Link",
    "comp/md-list-entry": "./src/components/list/List",
    "comp/md-list-item-entry": "./src/components/list/ListItem",
    "comp/md-loading-entry": "./src/components/loading/Loading",
    "comp/md-meeting-alert-entry": "./src/components/meeting-alert/MeetingAlert",
    "comp/md-menu-entry": "./src/components/menu/Menu",
    "comp/md-menu-item-entry": "./src/components/menu/MenuItem",
    "comp/md-menu-overlay-entry": "./src/components/menu-overlay/MenuOverlay",
    "comp/md-modal-entry": "./src/components/modal/Modal",
    "comp/md-pagination-entry": "./src/components/pagination/Pagination",
    "comp/md-phone-input-entry": "./src/components/phone-input/PhoneInput",
    "comp/md-progress-bar-entry": "./src/components/progress-bar/ProgressBar",
    "comp/md-radio-entry": "./src/components/radio/Radio",
    "comp/md-radiogroup-entry": "./src/components/radio/RadioGroup",
    "comp/md-slider-entry": "./src/components/slider/Slider",
    "comp/md-spinner-entry": "./src/components/spinner/Spinner",
    "comp/md-table-entry": "./src/components/table/Table",
    "comp/md-table-advanced-entry": "./src/components/table-advanced/TableAdvanced",
    "comp/md-tab-entry": "./src/components/tabs/Tab",
    "comp/md-tab-panel-entry": "./src/components/tabs/TabPanel",
    "comp/md-tabs-entry": "./src/components/tabs/Tabs",
    "comp/md-task-item-entry": "./src/components/taskitem/TaskItem",
    "comp/md-theme-entry": "./src/components/theme/Theme",
    "comp/md-timepicker-entry": "./src/components/timepicker/TimePicker",
    "comp/md-toggle-switch-entry": "./src/components/toggle-switch/ToggleSwitch",
    "comp/md-tooltip-entry": "./src/components/tooltip/Tooltip",
    "comp/md-form-entry": "./src/components/form/Form"
  },
  output: {
    path: pDist,
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "chunks/md-[id].js",
    libraryTarget: "umd",
    jsonpFunction: "momentum-web-components-[id]"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0
    }
  },
  externals: [
    nodeExternals({
      modulesFromFile: true,
      importType: "umd"
    })
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackLoadChunksPlugin({
      trimNameEnd: 6
    }),
    new CopyWebpackPlugin([
      { from: `${pMomentum}/core/fonts`, to: "assets/fonts" },
      { from: `${pMomentum}/core/images`, to: "assets/images" },
      { from: `${pMomentum}/icons/fonts`, to: "assets/fonts" },
      { from: `${pMomentum}/icons/fonts`, to: "assets/icons/fonts" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css`, to: "assets/styles" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css.map`, to: "assets/styles" },
      { from: `${pMomentum}/icons/css/momentum-ui-icons.min.css`, to: "assets/styles" },
      { from: `${pCss}/*.css`, to: "assets/styles", flatten: true }
    ]),
    new RemovePlugin({
      after: {
        log: false,
        include: ["./dist/types/[sandbox]"],
        test: [
          {
            folder: "./dist/types",
            method: (p) => new RegExp(/\.test\.d\.ts(\.map)*$/).test(p),
            recursive: true
          },
          {
            folder: "./dist/types",
            method: (p) => new RegExp(/\.stories\.d\.ts(\.map)*$/).test(p),
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
