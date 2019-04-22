# Collab UI Schematics

These schematics provide built in integrations with the Angular CLI features in order to make it easier for users to install and update Collab UI.

## `ng add @momentum-ui/angular`

This schematic wires up with the Angular CLI to support automatically adding Collab UI to an Angular CLI project.

##### How it works

In the `npm/@momentum-ui/angular/package.json` file, we have declared a line in the package, `"schematics": "./schematics/collection.json",`. This denotes to the Angular CLI that this package has a set of schematics.

Then when the schematics are parsed, there is a special schematic by the name of `ng-add` in our `src/schematics/src/collection.json` file. Running `ng add` will look for this entry script.
