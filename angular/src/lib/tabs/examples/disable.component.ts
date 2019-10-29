import { Component } from '@angular/core';

@Component({
  selector: 'example-tabs-disable',
  template: `
    <md-tabs
      [focus]="1"
      className="MyClass"
      (whenSelect)="onClick($event)"
    >
      <md-tab-header heading="test"></md-tab-header>
      <md-tab-list>
        <md-tab>B</md-tab>
        <md-tab>A1</md-tab>
        <md-tab [disabled]="true">A2</md-tab>
        <md-tab>A3</md-tab>
      </md-tab-list>
      <md-tab-content>
        <md-tab-pane>Pane B</md-tab-pane>
        <md-tab-pane>Pane A1</md-tab-pane>
        <md-tab-pane>Pane A2</md-tab-pane>
        <md-tab-pane>Pane A3</md-tab-pane>
      </md-tab-content>
    </md-tabs>
  `,
})
export class ExampleTabsDisableComponent {

  onClick = e => {
    console.info(e);
  }
}
