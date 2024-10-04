import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import { commonDev, pBuild } from "./webpack.config";

interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}

export default merge<Configuration>(commonDev, {
  devServer: {
    static: {
      directory: pBuild
    },
    historyApiFallback: true,
    open: true,
    hot: true,
    port: 8888,
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false
      }
    }
  }
});
