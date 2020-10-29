# SASS STATS - Compiler and Component

For added visibility into ongoing style efficiency improvements, the Dev build of this repository also compiles JSON data about several CSS metrics, including total file size, number of selectors, etc.

## TO USE

Simply wrap the component you are working on in the `<sass-stats>` component in the sandbox environment, like so:

````html
<div class="container" aria-label="md-avatar">
  <sass-stats component="avatar">
    ${avatarTemplate}
  </sass-stats>
</div>
```
````

There are no additional steps or scripts needed, Webpack compiles fresh statistics at build time.


## COLOR CONTRAST RATIOS [EXPERIMENTAL]

The `<sass-stats>` component also calculates some QA about the colors used, and provides a pass/fail Accessibility score on the contrast ratio. This feature is experimental, and may be inaccurate on complex, multi-part components, or following Theme color toggles. 

To see the score, inspect the element and view the attributes added for `data-contrastScore`, `data-bgcolor`, and `data-textcolor`.
