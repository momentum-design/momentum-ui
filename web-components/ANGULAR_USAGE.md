# Usage With Angular (11)

The following walk-through uses angular-cli my-app to quick start a simple usage scenario. Please read through, and adapt for your project's specific needs.

### Create-react-app
First and foremost, follow the instructions in order to get the angular my-app running locally.
<https://angular.io/guide/setup-local>
1. `npm install -g @angular/cli`
2. `ng new my-app`
3. `cd my-app`
4. `ng serve --open`

### Include Required Dependencies in package.json
##### In package.json (`create-react-app/my-app/package.json`)
Add peerDependencies & devDependencies to match the following: <br>
<sub>*Note: at this point, only version `2.1.5-dev` works for "@momentum-ui/web-components" within an angular application.*</sub>
  ```json
  "peerDependencies": {
    "@momentum-ui/core": "^19.9.12",
    "@momentum-ui/icons": "^7.54.0",
    "@momentum-ui/tokens": "^1.5.0",
    "@momentum-ui/utils": "^6.2.7",
    "@momentum-ui/web-components": "2.1.5-dev",
    "lit":"^3.0.0"
  },
  ```
  
  and add these to the `devDependencies`:

  ```json
    "@momentum-ui/core": "^19.9.12",
    "@momentum-ui/icons": "^7.54.0",
    "@momentum-ui/tokens": "^1.5.0",
    "@momentum-ui/utils": "^6.2.7",
    "@momentum-ui/web-components": "2.1.5-dev",
    "lit":"^3.0.0"
  ```
  <sub>*The changes to scripts commands enable the following Webpack modifications to be run within the Create React App environment. <br> The addition of `jest` as a resolution is important for tests to run*</sub>
  
### Add CUSTOM_ELEMENTS_SCHEMA
##### In app.module.ts (`my-app/src/app/app.module.ts`)
Update the file to match the following (line 1 and line 15 changed):
```javascript=
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

### Modify tsconfig.json
##### In tsconfig.json (`my-app/tsconfig.json`)
Set esModuleInterop to true under compilerOptions
```json
  "compilerOptions": {
    "esModuleInterop": true,
```

### Add a Web Components to your Project
1. Add the following import:
##### In app.component.ts (`my-app/src/app/app.component.ts`)
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
##### In app.component.html (`my-app/src/app/app.component.html`)
```html
<md-theme>
  <md-button variant="green"><md-icon slot="icon" name="play_16"></md-icon><span slot="text">Code On!</span></md-button>
</md-theme>
```
<sub>*NOTE: You must wrap your application with the `<md-theme>` element. It provides a set of core style resets and CSS custom variables that provide Theme color tokens, among other things. You can test these by toggling attributes `lumos` and/or `darkTheme` on the `<md-theme>` element.*
</sub>

##### Now it is time to get your app running locally! <br>
(within `my-app` directory)

1. `yarn` installs all dependencies.
2. `yarn build` copies the required static assets for fonts and icons.
3. `yarn start` launches project locally.
