# Momentum Web Components Maintenance Manual

Please follow these guidelines to help decide appropriate  scenarios for publishing a new verison.

### xx.xx.Patch Release when
* 1 or more bug fixes are merged

### xx.Minor.xx Release when
* A new Component is added
* A feature is added to existing components
* Documentation is added
* Optimization is added

### Major.xx.xx Release when
* Breaking, non-backwards compatible changes made

### xx.xx.xx-dev.x Release when
* Needing sustained testing of new features without `yarn link`
* When dependant projects need bug or feature updates ahead of normal release timeline

## To publish a new release
1. Merge changes that share the same version semantic (i.e. two bug fix PRs)
2. Increment the related version numeral from within the momentum-ui/web-components dir (best practice use `npm version [patch|minor|major]` unless making a `dev` release, then you can directly edit the package.json `version` property.)
3. Run `npm login` to ensure you are connected to NPMjs. NOTE: you must be logged in to your NPMjs account that has the rights of a maintainer on @momentum-ui packages in order for it to publish. Do not use you Cisco credentials. 
4. If not already authorized, run `yarn npm:auth` (This will allow publish internally on Artifactory as well as on npmjs)
5. `yarn npm:publish` (This command will publish on Artifactory as well as on npmjs)

If a combination of semantic scenarios are ready for merge at the same time, merge and release all Patch change PRs first, then Minor change PRs.
