## Usage

### Within the Create-react-app
##### First, follow the instructions in the link below in order to get the create-react-app running locally.
https://github.com/facebook/create-react-app

##### In App.js (`create-react-app/my-app/src/App.js`)
Add the following import
```
  import '@momentum-ui/web-components';
```

##### In index.html (`create-react-app/my-app/public/index.html`)
Add the following two lines:
```
  <link rel="stylesheet" type="text/css" href="%PUBLIC_URL%/css/momentum-ui-icons.min.css">
```

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

#### Once changes have been made, follow the steps below:

(within `create-react-app/my-app` directory)

1. `yarn`
2. `yarn build`
3. `yarn start`
 
