import { Compiler } from "webpack";
import path = require("path");

const webpack = require("webpack");
const { RawSource } = webpack.sources || require("webpack-sources");

type Options = {
  trimNameEnd: number;
};

export default class WebpackLoadChunksPlugin {
  readonly options: Options;

  fs!: any;
  compilation: any;

  constructor(options: Options) {
    this.options = options;
  }

  apply(compiler: Compiler): void {
    const isWebpack4 = webpack.version.startsWith("4.");
    compiler.hooks[isWebpack4 ? "emit" : "thisCompilation"].tap(
      "WebpackLoadChunksPlugin",
      this.hookCallback.bind(this)
    );
  }

  hookCallback(compilation: object): void {
    this.compilation = compilation;
    this.fs = this.compilation.compiler.outputFileSystem;

    const isWebpack4 = webpack.version.startsWith("4.");
    if (isWebpack4) {
      this.addAssets();
    } else {
      this.compilation.hooks.processAssets.tap(
        {
          name: "WebpackLoadChunksPlugin",
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
        },
        this.addAssets.bind(this)
      );
    }
  }

  addAssets() {
    const entrypoints = Array.from(this.compilation.entrypoints.keys()) as string[];

    for (const entry of entrypoints) {
      const files = this.compilation.entrypoints.get(entry).getFiles() as string[];

      if (files.length == 0) continue;

      const sub = entry.split("/").length - 1;
      const filePath = sub == 0 ? "./" : "../".repeat(sub);

      const fileChunks = files
        .filter(file => path.extname(file).substr(1) === "js")
        .map(file => `require("${filePath}${file.substring(0, file.length - 3)}");`);

      const fileName = entry.substring(0, entry.length - this.options.trimNameEnd) + ".js";
      const fileSource = new RawSource(fileChunks.join("\n"), false);
      this.compilation.emitAsset(fileName, fileSource);
    }
  }
}
