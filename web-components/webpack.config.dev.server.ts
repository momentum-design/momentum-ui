import merge from "webpack-merge";
import { commonDev, pBuild } from "./webpack.config";

export default merge(commonDev, {
  devServer: {
    contentBase: pBuild,
    historyApiFallback: true,
    open: true,
    hot: true,
    port: 8888
  }
});
