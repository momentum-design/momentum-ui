#Momentum Web Components Maintenance Manual

Please follow these guidelines to help decide appropriate  scenarios for publishing a new verison.

###xx.xx.Patch Release when
* 1 or more bug fixes are merged

###xx.Minor.xx Release when
* A new Component is added
* A feature is added to existing components
* Documentation is added
* Optimization is added

###Major.xx.xx Release when
* Breaking, non-backwards compatible changes made

###xx.xx.xx-dev-x Release when
* Needing sustained testing of new features without `yarn link`
* When dependant projects need bug or feature updates ahead of normal release timeline

##To publish a new release
1. Merge changes that share the same version semantic (i.e. two bug fix PRs)
2. Increment the related version numeral (best practice use `npm version [patch|minor|major]`
3. If not already authorized, run `yarn npm:auth`
4. `yarn npm:publish`

If a combination of semantic scenarios are ready for merge at the same time, merge and release all Patch change PRs first, then Minor change PRs.