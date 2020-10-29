import { commonDev } from "../webpack.config";

/**
 * merge two arrays into one and remove the duplicates
 * 
 * @param merger 
 * @param mergee 
 * @returns {Array<any>} merged unique array
 */
const mergeUnique = (merger: Array<any>, mergee?: Array<any>) =>
  mergee ?
    merger.concat(mergee.filter((item: any) => merger.indexOf(item) === -1)) :
    merger;

module.exports = {
  stories: ["../src/components/**/*.stories.ts"],

  addons: ["@storybook/addon-knobs/register", "@storybook/addon-a11y/register", "@storybook/addon-docs"],

  webpackFinal: async (config: any) => {

    config.resolve.extensions = mergeUnique(config.resolve.extensions, commonDev.resolve?.extensions);
    config.resolve.alias = commonDev.resolve?.alias;
    config.module.rules = mergeUnique(config.module.rules, commonDev.module?.rules);
    config.plugins = mergeUnique(config.plugins, commonDev.plugins)

    return config;
  }
}
