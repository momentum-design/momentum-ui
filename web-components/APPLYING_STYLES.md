# Contributing to Momentum UI Web Components

Thank you for contributing to this library! This is a guide to properly connect your new component's modularized styles to utilize the efficiency and Shadow DOM support of Constructable Stylesheets.

## IMPORTING EXISTING STYLES TO WEB COMPONENT

Most components have existing style modules that were carried over from the Momentum Core SMACSS library. While they can be used directly with minimal setup, as we work on setting up Lumos and Web Component specific style changes, these steps will lead to a successful migration and refactor of styles in to our own SCSS library.

1. Create a `scss` folder in the component's directory.
2. If available, copy over the `module.scss`, `component-name.scss`, `mixins.scss` and `settings.scss` found in `src/momentum_scss/components/component-name/`, and paste them to `src/components/component-name/scss`. 
3. Inside your `ComponentName.ts` file, import the scss file: `import styles from "./scss/module.scss";`
4. Check the `@import` paths in `module.scss` to ensure successful compilation of styles.
5. Webpack will compile the CSS for you, but in order to adopt the styles into your component, place this LitElement function before `render()` :

```javascript
static get styles():
  return [styles]
}
```

### USING COMMON RESETS TO SOLVE SHADOW DOM ISSUES

In many cases, particularly within components whose child elements need box-position and typography styles, it is necessary to also adopt the basic normalize and reset styles provided by Momentum. Because styles cannot cross into new Shadow Roots, this needs to be done on most components. 

1. Import the reset styles from `src/assets/styles/reset.scss`
2. Add it to the start of the `CSSResultArray` in `getStyles()`, adopting them before others. 

```javascript
static get styles():
  return [reset, styles]
}
```

### EDITING AND ADDING NEW STYLES TO COMPONENTS

By linking to the `momentum_scss` library we are referring to the legacy rulesets that render the older Momentum design look and is optomized for React applications. 

New Lumos style updates will take place in the styles made local to the component files themselves, moving away from the convention of keeping component style markup inside the SMACSS library, and only keeping global settings and shared styles there.

1. Begin edits within `component-name.scss`, and do not write any styles to `module.scss`. Find and replace selectors that rely upon old Momentum scss variables, for example `%#{button-class}` should become `.md-button`, making the code easier to read. Check existing style definitions and styles that do not exist in Lumos. For any new style you write, find existing selectors and style decorations to edit, and avoid writing overrides. 
2. If any mixins associated with the component are never used, delete them from the local `mixins.scss` file. If a `settings.scss` file is present, remove unused and legacy variables that are not applicable to Lumos.
3. Once component-specific modules are edited, remove the `@import`s of global scss modules from `momentum_scss` and replace with imports from `wc_scss`. Best practice is to have `yarn start` running and following the compile errors that appear in the console to identify the modules that have the right dependencies.
4. If a scss module is not yet present in the `wc_scss` directory, copy it over from the `momentum_scss` following the familiar file structure, taking a moment to inspect it for irellevant legacy code, repition, or other bloat you can confidently delete.
5. Once the `module.scss` file compiles successfully with the minimal imports needed, your component should render correctly with you new styles, and no longer depend on legacy style from the momentum_scss library!
