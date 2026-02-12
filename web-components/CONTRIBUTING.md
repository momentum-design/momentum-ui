
# Contributing

We'd love for you to contribute to our source code and to make Momentum UI Web Component library even better than it is today! Below are the guidelines to follow.

## Keep in touch with the team

Either you are internal to Cisco or not, feel free to reach out to the repository admins to be added to the `Momentum UI Web Components Q&A` Webex Teams space. You will be able to ask questions, follow discussions and make sure more folks get to take a look at your PR by posting a link.

## Adding new components

If you wand to add new component to `src/components`:  

1. Use unique html tag with `md-` prefix
2. To register custom element, use `@customElementWithCheck("md-my-comp")` decorator instead of `@customElement("md-my-comp")` from "lit" framework

    **Note**: `customElementWithCheck` will not throw error if "custom element" name is already registered by another component, so please make sure your new component name, e.g. `"md-my-comp"`, is not already being used by another component in this library.

3. Wrap your component in a unique namespace, e.g.:
    ```ts
    export namespace Avatar {
    export type Type = typeof AvatarType[number];

    export type Size = typeof AvatarSize[number];

    @customElementWithCheck("md-avatar")
    export class ELEMENT extends LitElement {
        ...
    }

    declare global {
        interface HTMLElementTagNameMap {
            "md-avatar": Avatar.ELEMENT;
        }
    }
    ```
    Make sure all component related types are defined withing the namespace scope. This way, they will be accessible to the library consumer when used in TypeScript environment.

4. Keep in mind that we are supporting multiple themes that build on top of default Momentum CSS. This is manifested through the use of **Style Tokens** - you can find reference material in [Applying Styles](./APPLYING_STYLES.md).
5. Last, but not least, make sure to:
    * Add Unit Test coverage to new and existing components to maintain at least 80% coverage (We strive for at least 90%);
    * Add Storybook component representation for each new component, as well as make sure to add any new feature to the existing component's Storybook `*.stories.ts` file.
---
### New component only
We are using webpack chunk split functionality to minimize footprint of our library importing.  
So you must register your component as a new chunk.  
<br/>
Please add entry and path to component source in `webpack.config.ts`:
```js
"comp/md-my-comp-entry": "./src/components/my-comp/MyComp",
```
to `commonDist.entry` section. 


 

