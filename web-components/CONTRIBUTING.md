
# Contributing

We'd love for you to contribute to our source code and to make Momentum UI even better than it is today! Below are the guidelines to follow.

## Adding new components

If you wand to add new component to `src/components`:  

* Use unique name with `md-` prefix
* To register it use `@customElementWithCheck("md-my-comp")` instead of `@customElement("md-my-comp")` from "lit-elements" framework
* `customElementWithCheck` will not throw error if "custom element" name is already registered by another component, so please check `"md-my-comp"` by searching it and rename if needed
  

We are using webpack chunk split functionality to minimize footprint of our library importing.  
So you must register your component as a new chunk.  
<br/>
Please add entry and path to component source:
```js
"comp/md-my-comp-entry": "./src/components/my-comp/MyComp",
```
to `commonDist.entry` of `webpack.config.ts`


 

