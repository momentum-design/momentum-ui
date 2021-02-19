## Usage With React

##### The following walk-through uses create-react-app to quick start a simple usage scenario. Please read through, and adapt for your project's specific needs.

### create-react-app
##### First, follow the instructions in the link below in order to get the create-react-app running locally.
https://github.com/facebook/create-react-app


### Add Web Component to Project
##### In App.js (`create-react-app/my-app/src/App.js`)
Add the following import
```
  import '@momentum-ui/web-components';
```
NOTE: You only need to import the web-components module at the top level of your application in order to use web components anywhere throughout.

Test that Web Components work by including one in App.js. Use this test:

```html
<md-theme>
  <md-button variant="green"><md-icon slot="icon" name="play_16"></md-icon><span slot="text">Code On!</span></md-button>
</md-theme>
```
And you should see:

![Screen Shot 2021-02-19 at 10 55 55 AM](https://user-images.githubusercontent.com/17099707/108549087-8c0e9880-72a1-11eb-9c71-7d6c6162f9cb.png)

You must wrap your application with `<md-theme>` element, it provides a set of core style resets and CSS custom variables that provide Theme color tokens, among other things. You can test these by toggling attributes `lumos` and/or `darkTheme` on the `<md-theme>` element.

We recommend `<md-phone-input></md-phone-input>` as an example that has unique styles and colors and Icon usage to test. 

### Include required Dependencies in package.json
##### In package.json (`create-react-app/my-app/package.json`)
Add resolutions & devDependencies, then modify the scripts section to match the following:
  ```
  "resolutions": {
    "lit-element": "2.3.1",
    "lit-html": "1.2.1"
  },
  "devDependencies": {
    "@momentum-ui/core": "^19.9.12",
    "@momentum-ui/icons": "^7.54.0",
    "@momentum-ui/tokens": "^1.5.0",
    "@momentum-ui/utils": "^6.2.7",
    "@momentum-ui/web-components": "2.1.2",
    "copy-webpack-plugin": "^6.3.2",
    "lit-element": "2.3.1",
    "lit-html": "1.2.1",
    "react-app-rewired": "^2.1.8"
  },
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
  ```
NOTE: The changes to scripts commands enable the following WebPack modifications to be run within the Create React App environment.
  
### Copy Static Assets
Momentum Web Components use Cisco fonts and Icon fonts that must be served within the project. This WebPack ammendment copies those resources from the related module packages.
##### Create config-overrides.js (`create-react-app/my-app/config-overrides.js`)
Copy the following code below:
```
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const hoistedModules = path.resolve("node_modules");
const pPublic = path.resolve('public');

module.exports = function override(config, env) {
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
        from: `${hoistedModules}/@momentum-ui/icons/css/momentum-ui-icons.min.css`,
        to: `${pPublic}/css`,
      },
    ],
  });

    config.plugins.push(copyWebpackPlugin);
    return config;
  }
```

##### In index.html (`create-react-app/my-app/public/index.html`)
This `%PUBLIC_URL%` references the public directory that contains all required static assets (fonts, icons).
https://create-react-app.dev/docs/using-the-public-folder/
Add the following line:
```
  <link rel="stylesheet" type="text/css" href="%PUBLIC_URL%/css/momentum-ui-icons.min.css">
```

#### Once changes have been made, follow the steps below:

(within `create-react-app/my-app` directory)

1. `yarn` installs all dependencies.
2. `yarn build` copies the required static assets for fonts and icons.
3. `yarn start` launches project locally.
 
