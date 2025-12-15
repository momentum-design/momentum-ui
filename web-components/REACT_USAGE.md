# Usage With React

The following walk-through uses create-react-app to quick start a simple usage scenario. Please read through, and adapt for your project's specific needs.

### Create-react-app
First and foremost, follow the instructions in order to get the create-react-app running locally.
<https://github.com/facebook/create-react-app>
1. `git clone https://github.com/facebook/create-react-app.git`
2. `cd create-react-app`
3. `yarn create react-app my-app`
4. `cd my-app`
5. `yarn start`

### Include Required Dependencies in package.json
##### In package.json (`create-react-app/my-app/package.json`)
Add resolutions & devDependencies, then modify the scripts section to match the following: <br>
  ```json
  "resolutions": {
    "lit":"^3.0.0",
    "jest": "26.6.0"
  },
  "devDependencies": {
    "@momentum-ui/core": "^19.9.12",
    "@momentum-ui/icons": "^7.54.0",
    "@momentum-ui/tokens": "^1.5.0",
    "@momentum-ui/utils": "^6.2.7",
    "@momentum-ui/web-components": "2.1.2",
    "copy-webpack-plugin": "^6.3.2",
    "lit":"^3.0.0",
    "react-app-rewired": "^2.1.8"
  },
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
  ```
  <sub>*The changes to scripts commands enable the following Webpack modifications to be run within the Create React App environment. <br> The addition of `jest` as a resolution is important for tests to run*</sub>
  
### Copy Static Assets & Configure Jest for Testing
Momentum Web Components use Cisco fonts and Icon fonts that must be served within the project. This Webpack ammendment copies those resources from the installed dependencies (`node_modules`) to the `public` directory. In addition, the jest config override ensures tests run successfully with the addition of web components.
##### Create config-overrides.js (`create-react-app/my-app/config-overrides.js`)
Copy the following code below:
```js
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const hoistedModules = path.resolve("node_modules");
const pPublic = path.resolve('public');

module.exports = {
  webpack: (config, env) => {
    if (!config.plugins) {
      config.plugins = [];
    }

    const copyWebpackPlugin = new CopyWebpackPlugin({
    patterns: [
      {
        from: `${hoistedModules}/@momentum-ui/core/fonts`,
        to: `${pPublic}/fonts`,
      },

      {
        from: `${hoistedModules}/@momentum-ui/icons/fonts`,
        to: `${pPublic}/fonts`,
      },
      
      {
        from: `${hoistedModules}/@momentum-ui/web-components/dist/assets/styles`,
        to: `${pPublic}/css`,
      },

      {
        from: `${hoistedModules}/@momentum-ui/icons/css/momentum-ui-icons.min.css`,
        to: `${pPublic}/css`,
      },
    ],
  });

    config.plugins.push(copyWebpackPlugin);
    return config;
  },

  jest: (config) => {
    config.transformIgnorePatterns = [
        "[/\\\\]node_modules/\\\\.+\\.(js|jsx|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$"
    ];
    return config;
  }
}
```
<sub>*After you run `yarn build`, this webpack modification will have generated two directories within the `Public` directory: `css` & `fonts`*
</sub>

### Link Bundled CSS Files in index.html
##### In index.html (`create-react-app/my-app/public/index.html`)
Add the following lines:
```html
  <link rel="stylesheet" type="text/css" href="%PUBLIC_URL%/css/momentum-ui.min.css">
  <link rel="stylesheet" type="text/css" href="%PUBLIC_URL%/css/momentum-ui-icons.min.css">
```
<sub>*This `%PUBLIC_URL%` references the public directory that now contains all required static assets (fonts, icons).*</sub> <br>
<sub><https://create-react-app.dev/docs/using-the-public-folder/></sub>

### Add a Web Components to your Project
##### In App.js (`create-react-app/my-app/src/App.js`)
1. Add the following import:
```js
  import '@momentum-ui/web-components';
```
OR import each individual web component
```js
  import '@momentum-ui/web-components/dist/comp/md-button';
  import '@momentum-ui/web-components/dist/comp/md-icon';
```
<sub>*NOTE: You only need to import the web-components module at the top level of your application in order to use web components anywhere throughout.*
</sub>

2. Insert the following sample web component for testing purposes:
```html
<md-theme>
  <md-button variant="green"><md-icon slot="icon" name="play_16"></md-icon><span slot="text">Code On!</span></md-button>
</md-theme>
```
<sub>*NOTE: You must wrap your application with the `<md-theme>` element. It provides a set of core style resets and CSS custom variables that provide Theme color tokens, among other things. You can test these by toggling attributes `lumos` and/or `darkTheme` on the `<md-theme>` element.*
</sub>

##### Now it is time to get your app running locally! <br>
(within `create-react-app/my-app` directory)

1. `yarn` installs all dependencies.
2. `yarn build` copies the required static assets for fonts and icons.
3. `yarn start` launches project locally.

ps: `yarn test` runs all tests files that have this file name structure: `<file>.test.ts` <br>
<sub>*Feel free to run that and ensure that runs successfully with the existing sample test.*<sub>

And you should see:

![Screen Shot 2021-02-19 at 10 55 55 AM](https://user-images.githubusercontent.com/17099707/108549087-8c0e9880-72a1-11eb-9c71-7d6c6162f9cb.png)
