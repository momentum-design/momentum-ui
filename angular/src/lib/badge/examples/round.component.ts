import { Component } from '@angular/core';

@Component({
  selector: 'example-badge-round',
  template: `
    <cui-badge rounded=true>Default</cui-badge><br />
    <cui-badge rounded=true color="blue">Blue</cui-badge><br />
    <cui-badge rounded=true color="red">Read</cui-badge><br />
    <cui-badge rounded=true color="yellow">Yellow</cui-badge><br />
    <cui-badge rounded=true color="green">Green</cui-badge><br />
    <cui-badge rounded=true color="mint">Mint</cui-badge><br />
    <cui-badge rounded=true color="pastel">Default Pastel</cui-badge><br />
    <cui-badge rounded=true color="blue-pastel">Blue Pastel</cui-badge><br />
    <cui-badge rounded=true color="red-pastel">Red Pastel</cui-badge><br />
    <cui-badge rounded=true color="yellow-pastel">Yellow Pastel</cui-badge><br />
    <cui-badge rounded=true color="green-pastel">Green Pastel</cui-badge><br />
    <cui-badge rounded=true color="mint-pastel">Mint Pastel</cui-badge>
  `,
})
export class ExampleBadgeRoundComponent {}
