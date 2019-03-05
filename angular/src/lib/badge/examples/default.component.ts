import { Component } from '@angular/core';

@Component({
  selector: 'example-badge-default',
  template: `
    <cui-badge>Default</cui-badge><br />
    <cui-badge color="blue">Blue</cui-badge><br />
    <cui-badge color="red">Read</cui-badge><br />
    <cui-badge color="yellow">Yellow</cui-badge><br />
    <cui-badge color="green">Green</cui-badge><br />
    <cui-badge color="mint">Mint</cui-badge><br />
    <cui-badge color="pastel">Default Pastel</cui-badge><br />
    <cui-badge color="blue-pastel">Blue Pastel</cui-badge><br />
    <cui-badge color="red-pastel">Red Pastel</cui-badge><br />
    <cui-badge color="yellow-pastel">Yellow Pastel</cui-badge><br />
    <cui-badge color="green-pastel">Green Pastel</cui-badge><br />
    <cui-badge color="mint-pastel">Mint Pastel</cui-badge>
  `,
})
export class ExampleBadgeDefaultComponent {}
